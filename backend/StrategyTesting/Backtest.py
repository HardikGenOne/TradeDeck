import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


class Backtest():
    def __init__(self,df,signal_col='signal', price_col='Close'):
        self.df = df.copy()
        self.df.index = pd.to_datetime(self.df.index)  # Force datetime index
        self.df.sort_index(inplace=True)  # Sort ascending by date
        self.signal_col = signal_col
        assert self.signal_col in self.df.columns, f"'{self.signal_col}' not found in DataFrame columns"
        self.price_col = price_col
        self.df['strategy_returns'] = self.df[self.price_col].pct_change().shift(-1) * self.df[self.signal_col]
        self.freq = self._infer_freq()
        self.trades = self._extract_trades()
        
    
    def _infer_freq(self):
        if isinstance(self.df.index, pd.DatetimeIndex):
            df = self.df.copy()
            df['date'] = df.index.date
            unique_days = df['date'].nunique()
            avg_bars_per_day = len(df) / unique_days
            return avg_bars_per_day * 252
        return 252
    def _extract_trades(self):
        trades = []
        in_trade = False
        entry_price = None
        entry_date = None
        for date, row in self.df.iterrows():
            
            if row[self.signal_col] == 1 and not in_trade:
                entry_price = row[self.price_col]
                entry_date = date
                in_trade = True

            elif row[self.signal_col] == 0 and in_trade:
                exit_price = row[self.price_col]
                exit_date = date
                pct_change = (exit_price - entry_price) / entry_price
                
                trades.append({
                    'Entry Date': entry_date,
                    'Exit Date': exit_date,
                    'Entry Price': entry_price,
                    'Exit Price': exit_price,
                    'Return %': pct_change * 100,
                })
                in_trade = False

        # Always return DataFrame with expected columns
        return pd.DataFrame(trades) if trades else pd.DataFrame(columns=['Entry Date', 'Exit Date', 'Entry Price', 'Exit Price', 'Return %'])

    def total_trades(self):
        return len(self.trades)
    
    def win_rate(self):
        profitable_trades = (self.trades['Return %'] > 0).sum()
        total_trades = self.total_trades()  
        return (profitable_trades / total_trades) * 100 if total_trades > 0 else 0
    
    def average_profit(self):
        return self.trades[self.trades['Return %'] > 0]['Return %'].mean()

    def average_loss(self):
        return self.trades[self.trades['Return %'] < 0]['Return %'].mean()
    
    def max_profit(self):
        profits = self.trades[self.trades['Return %']>0]["Return %"]
        return profits.max()

    def max_loss(self):
        loss = self.trades[self.trades['Return %']<0]["Return %"]
        return loss.max()
    
    
    def profit_factor(self):
        wins = self.trades[self.trades['Return %'] > 0]['Return %'].sum()
        losses = abs(self.trades[self.trades['Return %'] < 0]['Return %'].sum())
        return wins / losses if losses != 0 else np.inf
    
    def sharpe_ratio(self):
        returns = self.df['strategy_returns'].dropna()
        return returns.mean() / returns.std() * np.sqrt(self.freq)
    
    def netPnl(self):
        return self.trades['Return %'].sum()
    
    def accumulative_returns(self):
        returns = self.df['strategy_returns'].dropna()
        return (1 + returns).prod() - 1
    
    def max_drawdown(self):
        cumulative = (1 + self.df['strategy_returns']).cumprod()
        rolling_max = cumulative.cummax()
        drawdown = (cumulative - rolling_max) / rolling_max
        return drawdown.min() * 100
    
    def consecutive_loss(self):
        losses = self.trades["Return %"]<0
        max_consecutive_loss = current_streak = 0
        
        for loss in losses:
            if loss:
                current_streak+=1
                max_consecutive_loss = max(current_streak,max_consecutive_loss)
            else:
                current_streak = 0
        return max_consecutive_loss
        
    def cagr(self, years):
        returns = self.df['strategy_returns'].dropna()
        cumulative_return = (1 + returns).prod()
        return (cumulative_return ** (1 / years)) - 1

    def cagr_date_based(self, years):
        """
        Calculate CAGR for the exact date range ending at the last date in the df,
        going back 'years' years.
        """
        if not isinstance(self.df.index, pd.DatetimeIndex):
            raise ValueError("DataFrame index must be a DatetimeIndex")

        end_date = self.df.index.max()
        start_date = end_date - pd.DateOffset(years=years)

        # Slice the dataframe for that date range
        df_slice = self.df.loc[start_date:end_date]
        
        if df_slice.empty:
            return np.nan  # No data in range

        returns = df_slice['strategy_returns'].dropna()
        cumulative_return = (1 + returns).prod()

        # Calculate CAGR based on actual time span in years
        actual_years = (end_date - df_slice.index.min()).days / 365.25
        if actual_years == 0:
            return np.nan

        return (cumulative_return ** (1 / actual_years)) - 1
    
    def summary(self):
        summary_data = {
            'Total Trades': int(self.total_trades()),
            'Win Rate': f"{round(self.win_rate(), 2)}%",
            'Average Profit': f"{round(self.average_profit(), 2)}%",
            'Average Loss': f"{round(self.average_loss(), 2)}%",
            'Max Profit': round(self.max_profit(), 2),
            'Max Loss': round(self.max_loss(), 2),
            'Net PnL': round(self.netPnl(),2),
            'Accumulative Returns': f"{round(self.accumulative_returns(),2)}%",
            'Profit Factor': round(self.profit_factor(), 2),
            'Sharpe': round(self.sharpe_ratio(), 2),
            'Max Drawdown': f"{round(self.max_drawdown(), 2)}%",
            'Max Consecutive Loss': self.consecutive_loss()
        }

        last_date = self.df.index.max()
        years_list = [1, 3, 5]

        for y in years_list:
            start_date = last_date - pd.DateOffset(years=y)
            if self.df.index.min() <= start_date:
                cagr_value = self.cagr_date_based(y) * 100
                summary_data[f'CAGR {y}Y'] = f"{round(cagr_value, 2)}%"

        # Convert all NumPy types to native Python types
        summary_data = {k: float(v) if isinstance(v, (np.floating, np.integer)) else v for k, v in summary_data.items()}

        return summary_data
        
    def export_trades(self, filename="trades.csv"):
        self.trades.to_csv(filename, index=False)

    def plot_equity_curve(self, benchmark_returns=None):
        returns = self.df['strategy_returns'].dropna()
        cumulative_returns = (1 + returns).cumprod()

        plt.figure(figsize=(10, 6))
        plt.plot(cumulative_returns, label='Strategy', linewidth=2)

        if benchmark_returns is not None:
            benchmark_returns = benchmark_returns.dropna()
            aligned_benchmark = benchmark_returns.loc[returns.index]
            benchmark_cum_returns = (1 + aligned_benchmark).cumprod()
            plt.plot(benchmark_cum_returns, label='Benchmark', linestyle='--', linewidth=2)

        plt.title('Equity Curve vs Benchmark')
        plt.xlabel('Date')
        plt.ylabel('Cumulative Returns')
        plt.legend()
        plt.grid(True)
        plt.tight_layout()
        plt.show()