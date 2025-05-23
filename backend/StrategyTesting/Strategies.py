import pandas as pd
import numpy as np
from .Backtest import Backtest


class Strategy:
    def __init__(self,df):
        self.df = df
        
    def SMA_CROSSOVER_results(self,shortPeriod,longPeriod):
        shortPeriod = str(shortPeriod).replace(",", " ").split()
        longPeriod = str(longPeriod).replace(",", " ").split()
        result_list = []
        for sMA in shortPeriod:
            for lMA in longPeriod:
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