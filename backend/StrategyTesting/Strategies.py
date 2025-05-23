import pandas as pd
import numpy as np
from .Backtest import Backtest


class Strategy:
    def __init__(self,df):
        self.df = df
        
    def SMA_CROSSOVER_results(self,periods):
        min_len = periods[0]
        max_len = periods[1]
        df_copy = self.df.copy()
        
        df_copy["SMA_Min"] = df_copy["Close"].rolling(window=min_len).mean()
        df_copy["SMA_Max"] = df_copy["Close"].rolling(window=max_len).mean()
        df_copy.dropna(inplace=True)
        df_copy.reset_index(drop=True, inplace=True)

        df_copy["signal"] = np.where(df_copy["SMA_Min"] > df_copy["SMA_Max"],1,0)

        bt = Backtest(df_copy,signal_col="signal",price_col="Close")
        result = bt.summary()

        return result