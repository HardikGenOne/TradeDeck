from .Strategies import Strategy
import pandas as pd
from backend.AngleSmartAPI import AngleOne_Smart_API

API_KEY = "Vmv5lfbV"
CLIENT_ID = "L52128673"
PIN = "7990"
TOTP = "J4DWDXYMDAKVV6VFJW6RHMS3RI"

try:
    instance = AngleOne_Smart_API(api_key=API_KEY, username=CLIENT_ID, pwd=PIN, token=TOTP)
    instance.connect()
except Exception as e:
    print("Failed to initialize or connect API instance:", str(e))
    instance = None

start_date = "2024-01-01"
results = []

def get_inputs(checkLoad):
    print("i am in the get_inputs")
    strategy = checkLoad[0].replace(" ", ",").split(",")
    print("STRAT done")
    stocks_list = checkLoad[1].replace(" ", ",").split(",")
    print("stock_list done")
    period_length = checkLoad[2].replace(" ", ",").split(",")
    print("period length done",period_length)
    timeFrame = checkLoad[3] if isinstance(checkLoad[3], list) else checkLoad[3].split(",")
    
    print("returning the data from get_inputs")
    return (strategy, stocks_list, period_length, timeFrame) 

def process_inputs(checkLoad):
    global results
    results = []

    strategy, stocks_list, period_length, timeFrame = get_inputs(checkLoad)

    if not all([strategy, stocks_list, period_length, timeFrame]):
        raise ValueError("One or more input variables are empty.")

    if not instance:
        raise RuntimeError("API instance not initialized")

    for symbol in stocks_list:
        for interval in timeFrame:
            try:
                df = instance.get_FullData("NSE", symbol, interval, start_date)
                strat = Strategy(df)
                
                strategy_method = getattr(strat, strategy[0], None)
                if strategy_method:
                    results.append([symbol,interval])
                    results.append(strategy_method([9,10]))
                    
                else:
                    print(f"Method {strategy[0]} not found in Strategy.")
            except Exception as e:
                print(f"Failed for {symbol} - {interval}: {str(e)}")
    
    print(results) 
    return results

def showOutput():
    # if results:
    #     return results
    # else:
    #     return "results are empty"
    return "Hello i am from main.py"