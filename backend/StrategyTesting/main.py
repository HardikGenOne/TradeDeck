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

start_date = "2020-07-01"
results = []

def get_inputs(checkLoad):
    print("i am in the get_inputs")
    data = checkLoad  # first (and only) dict in the list
    # print(type(checkLoad))
    # print(checkLoad)
    strategy = [data[0]]
    print("STRAT done",strategy)

    strategy_args = data[1]
    print("period length done", strategy_args)
    stocks_list = str(data[2]).split()
    print("stock_list done",stocks_list)

    # Flatten all strategy_args values into one list

    timeFrame = data[3] if isinstance(data[3], list) else data[3].split(",")
    print("timeFrame done",timeFrame)
    print("returning the data from get_inputs")
    startingDate = data[4]
    print("starting Date",startingDate)
    endingDate = data[5]
    print("Ending Date",endingDate)
    
    return (strategy, stocks_list, strategy_args, timeFrame,startingDate,endingDate)

def process_inputs(checkLoad):
    global results
    results = []

    strategy, stocks_list, strategy_args, timeFrame,startingDate,endingDate = get_inputs(checkLoad)

    if not all([strategy, stocks_list, strategy_args, timeFrame]):
        raise ValueError("One or more input variables are empty.")

    if not instance:
        raise RuntimeError("API instance not initialized")

    try:
        for symbol in stocks_list:
            for interval in timeFrame:
                try:
                    df = instance.get_FullData("NSE", symbol, interval, startingDate,endingDate)
                    strat = Strategy(df)
                    
                    strategy_method = getattr(strat, strategy[0], None)
                    if strategy_method:
                        # results.append([symbol,interval])
                        # results.append(strategy_method([9,10]))
                        results.append({symbol:{interval:strategy_method(strategy_args)}})
                        
                    else:
                        print(f"Method {strategy[0]} not found in Strategy.")
                except Exception as e:
                    print(f"Failed for {symbol} - {interval}: {str(e)}")
        # print("Final results length:", len(results))
        # print("Sample result:", results[0] if results else "No results")
        return results
    except Exception as e:
        print("Unexpected error in process_inputs:", str(e))
        raise
# def process_inputs(checkLoad):
#     global results
#     results = []

#     strategy, stocks_list, period_length, timeFrame = get_inputs(checkLoad)

#     if not all([strategy, stocks_list, period_length, timeFrame]):
#         raise ValueError("One or more input variables are empty.")

#     if not instance:
#         raise RuntimeError("API instance not initialized")

#     params = list(map(int, period_length))  # convert period_length strings to ints

#     for symbol in stocks_list:
#         symbol_result = {}
#         for interval in timeFrame:
#             try:
#                 df = instance.get_FullData("NSE", symbol, interval, start_date)
#                 strat = Strategy(df)

#                 strategy_method = getattr(strat, strategy[0], None)
#                 if strategy_method:
#                     temp = strategy_method(params)
#                     symbol_result[interval] = temp
#                 else:
#                     print(f"Method {strategy[0]} not found in Strategy.")
#             except Exception as e:
#                 print(f"Failed for {symbol} - {interval}: {str(e)}")
#         # After all intervals for one symbol, append each interval as separate dict in results
#         for interval_key, interval_val in symbol_result.items():
#             results.append({interval_key: interval_val})

#     final_output = {
#         "message": "Backtest run successfully",
#         "output": results
#     }

#     print(final_output)  
#     return final_output

def showOutput():
    # if results:
    #     return results
    # else:
    #     return "results are empty"
    return "Hello i am from main.py"