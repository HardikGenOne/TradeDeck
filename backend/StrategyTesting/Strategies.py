import pandas as pd
import numpy as np
from .Backtest import Backtest
import pandas_ta as ta

class Strategy:
    def __init__(self,df):
        self.df = df
        
    def SMA_CROSSOVER_results(self,shortPeriod,longPeriod=None):
        sPeriod = str(shortPeriod['shortPeriod']).replace(","," ").split()
        lPeriod = str(shortPeriod['longPeriod']).replace(","," ").split()
        # sPeriod = str(sPeriod).replace(",", " ").split()
        # lPeriod = str(lPeriod).replace(",", " ").split()
        result_list = []
        for sMA in sPeriod:
            for lMA in lPeriod:
                if int(sMA) < int(lMA):
                    min_len = int(sMA)
                    max_len = int(lMA)

                    if len(self.df) < max_len:
                        print(f"Skipping combo {sMA}_{lMA} because data length {len(self.df)} < {max_len}")
              
                        continue  # avoid crash on short dataset

                    df_copy = self.df.copy()

                    df_copy["SMA_Min"] = df_copy["Close"].rolling(window=min_len).mean()
                    df_copy["SMA_Max"] = df_copy["Close"].rolling(window=max_len).mean()
                    df_copy.dropna(inplace=True)
                    df_copy.reset_index(drop=True, inplace=True)

                    df_copy["signal"] = np.where(df_copy["SMA_Min"] > df_copy["SMA_Max"], 1, 0)

                    bt = Backtest(df_copy, signal_col="signal", price_col="Close")
                    result = bt.summary()
                    result_list.append({f"{sMA}_{lMA}": result})
        # print("Results from Strategies.py :",result_list)
        print("result_list loaded" if result_list else "result list is empty") 
        if not result_list:
            return [{"message": "No valid period combinations for data length"}]
        return result_list
    
    def TURTLE_TRADING_results(self,EntryWindow,ExitWindow=None,ATR_LENGTH=None):

        HIGH_WINDOW = EntryWindow["EntryWindow"]
        LOW_WINDOW = EntryWindow["ExitWindow"]
        ATR_LENGTH =EntryWindow["ATR_LENGTH"]
        print(HIGH_WINDOW)
        print(LOW_WINDOW)
        print(ATR_LENGTH)
        HIGH_WINDOW = 20
        LOW_WINDOW = 10
        ATR_LENGTH =20
        
        result_list = []
        df = self.df.copy()
        df[f"Entry_{HIGH_WINDOW}"] = df["High"].rolling(window=HIGH_WINDOW).max().shift(1)
        df[f"Exit_{LOW_WINDOW}"] = df["High"].rolling(window=LOW_WINDOW).min().shift(1)

        in_trades = False
        entry_price = 0

        entry_date = ""

        trades = []

        for i in range(len(df)):
            row = df.iloc[i]
            if not in_trades:
                if row["Close"] > row[f"Entry_{HIGH_WINDOW}"]:
                    in_trades = True
                    entry_price = row["Close"]
                    entry_date = row["Date"]
            else:
                if row["Close"] <row[f"Exit_{LOW_WINDOW}"]:
                    exit_price = row["Close"]
                    # pnl = entry_price - exit_price
                    pnl = (exit_price-entry_price)/entry_price
                    pnl *= 100
                    exit_date = row["Date"]
                    trades.append({"entryDate":entry_date,"exit_date":exit_date,"entry_prices":entry_price,"exitPrice":exit_price,"pnl":pnl})
                    in_trades = False
                    
        trades_df = pd.DataFrame(trades)
        trades_df["Win"] = trades_df["pnl"]>0

        profitable_trades = trades_df[trades_df["pnl"]>0]["pnl"]
        avg_duration_days = np.where(trades_df["pnl"]>0,abs((pd.to_datetime(trades_df["entryDate"]) - pd.to_datetime(trades_df["exit_date"])).dt.days),0) 
        filtered_days = [x for x in avg_duration_days if x != 0]
        win_rate = trades_df["Win"].mean()

        result_list.append({
            ATR_LENGTH:{
                
            "Win Rate (%)": round(win_rate * 100, 2),
            "Total Trades": len(trades),
            "Profit Average (%)": round(profitable_trades.mean(), 2),
            "Average Profits Holding Days": int(sum(filtered_days) / len(filtered_days)) if filtered_days else 0
            }
        })
        # print("total Trades",len(trades))
        # print("Profit Average (%)",round(profitable_trades.mean(),2))
        # print("Average Profits Holding Days",int(sum(filtered_days)/len(filtered_days)))
        # # print(avg_duration_days)
        # print(trades_df)
        print("result_list loaded" if result_list else "result list is empty") 
        if not result_list:
            return [{"message": "No valid period combinations for data length"}]
        return result_list