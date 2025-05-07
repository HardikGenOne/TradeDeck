from pydantic import BaseModel
from backend.AngleSmartAPI import AngleOne_Smart_API
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import time
import httpx
import datetime
from datetime import datetime,timedelta
import yfinance as yf
from fastapi import FastAPI

import pandas as pd
import os 
import requests
app = FastAPI()

current_stock = ""
interval = ""
start_date = ""
processed_data = {}

# # Allow requests from any frontend (you can restrict later)
# app.add_middleware(
#     CORSMiddleware,
#     # allow_origins=["*"],  # or ["http://127.0.0.1:5500"] for more security
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def root():
    try:
        return {"message": "Hello from root"}
    except Exception as e:
        return {"error": str(e), "detail": "Unexpected error occurred in root"}

@app.get("/data")
def postData():
    global current_stock,interval,start_date
    try:
        if not current_stock or not interval or not start_date:
            return {"error": "No stock symbol set yet. or provide the required details correctly"}

        # use your API to fetch data
        api_key = "vhAupRK9"
        token  = "J4DWDXYMDAKVV6VFJW6RHMS3RI"
        pwd = "7990"
        username = "L52128673"

        instance = AngleOne_Smart_API(api_key, username, pwd, token)
        instance.connect()

        exchange = "NSE"
        # interval = "FIFTEEN_MINUTE"
        # start_date = "2024-01-01"

        data = instance.get_FullData(exchange, current_stock, interval, start_date)
        data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d %H:%M')
        data = data.drop(columns=['Unnamed: 0'], errors='ignore')
        data.rename(columns={'Date':'date','Open': 'open', 'High': 'high',"Low":"low","Close":'close','volume':'volume'}, inplace=True)

        return {"symbol": current_stock, "dataFrame": data.to_dict(orient="records")}
    except Exception as e:
        return {"error": "Data fetch failed", "detail": str(e)}

class StockRequest(BaseModel):
    symbol: str
    interval: str
    start_date: str

@app.post("/stock_symbol")
async def get_stock_symbol(req: StockRequest):
    global current_stock,interval,start_date,processed_data
    try:
        current_stock = req.symbol
        interval = req.interval
        start_date = req.start_date
        return {"message": f"Received: {req.symbol}, interval: {interval}, start_date: {start_date}"}
    except Exception as e:
        return {"error": str(e), "detail": "Unexpected error occurred in stock_symbol"}

@app.get("/ping")
def ping():
    try:
        return {"status":"alive"}
    except Exception as e:
        return {"error": str(e), "detail": "Unexpected error occurred in ping"}

@app.get("/stock/{symbol}/info")
def get_ltp_info(symbol: str):
    try:
        symbol = symbol.upper() + ".NS"
        ticker = yf.Ticker(symbol)

        today = datetime.now().date()
        one_day_ago = today - timedelta(days=1)
        one_week_ago = today - timedelta(days=7)
        one_month_ago = today - timedelta(days=30)

        hist = ticker.history(start=one_month_ago, interval="1d")

        if hist.empty:
            return {"error": "No data found for symbol"}

        hist = hist.dropna(subset=["Close"])

        latest_price = hist["Close"].iloc[-1]
        close_day = hist["Close"].iloc[-2] if len(hist) >= 2 else latest_price
        close_week = hist.loc[hist.index >= str(one_week_ago), "Close"].iloc[0] if len(hist.loc[hist.index >= str(one_week_ago)]) > 0 else latest_price
        close_month = hist["Close"].iloc[0]

        def calc_change(current, previous):
            change = current - previous
            percent = (change / previous) * 100 if previous != 0 else 0
            return round(change, 2), round(percent, 2)

        day_change, day_percent = calc_change(latest_price, close_day)
        week_change, week_percent = calc_change(latest_price, close_week)
        month_change, month_percent = calc_change(latest_price, close_month)

        return {
            "symbol": symbol.replace(".NS", ""),
            "ltp": round(latest_price, 2),
            "day": {"change": day_change, "percent": day_percent},
            "week": {"change": week_change, "percent": week_percent},
            "month": {"change": month_change, "percent": month_percent}
        }

    except Exception as e:
        return {"error": str(e), "detail": "Unexpected error occurred in stock_info"}
        
    
    
@app.get("/major_indices")
async def get_majorIndices_price():
    try:
        symbols = {
            "NIFTY50": "^NSEI",
            "BANKNIFTY": "^NSEBANK",
            "SENSEX": "^BSESN"
        }

        results = []

        for name, yf_symbol in symbols.items():
            ticker = yf.Ticker(yf_symbol)

            today = datetime.now().date()
            one_day_ago = today - timedelta(days=1)
            one_week_ago = today - timedelta(days=7)
            one_month_ago = today - timedelta(days=30)

            hist = ticker.history(start=one_month_ago, interval="1d")

            if hist.empty:
                results.append({"symbol": name, "error": "No data found"})
                continue

            hist = hist.dropna(subset=["Close"])

            latest_price = hist["Close"].iloc[-1]
            close_day = hist["Close"].iloc[-2] if len(hist) >= 2 else latest_price
            close_week = hist.loc[hist.index >= str(one_week_ago), "Close"].iloc[0] if len(hist.loc[hist.index >= str(one_week_ago)]) > 0 else latest_price
            close_month = hist["Close"].iloc[0]

            def calc_change(current, previous):
                change = current - previous
                percent = (change / previous) * 100 if previous != 0 else 0
                return round(change, 2), round(percent, 2)

            day_change, day_percent = calc_change(latest_price, close_day)
            week_change, week_percent = calc_change(latest_price, close_week)
            month_change, month_percent = calc_change(latest_price, close_month)

            results.append({
                "ticker": name,
                "symbol": yf_symbol,
                "ltp": round(latest_price, 2),
                "day": {"change": day_change, "percent": day_percent},
                "week": {"change": week_change, "percent": week_percent},
                "month": {"change": month_change, "percent": month_percent}
            })

        return {"data": results}

    except Exception as e:
        return {"error": str(e), "detail": "Unexpected error occurred in major_indices"}
    
VALID_INDICES = [
    "NIFTY 50",
    "NIFTY BANK",
    "NIFTY IT",
    "NIFTY FMCG",
    "NIFTY MIDCAP 50",
    "NIFTY MIDCAP 100",
    "NIFTY NEXT 50",
    "NIFTY 100",
    "NIFTY 200",
    "NIFTY 500"
]

@app.get("/heatmap/{index}")
async def getHeatMap(index: str):
    try:
        index = index.replace('_',"%20")
        url = f"https://www.nseindia.com/api/equity-stockIndices?index={index}"
        
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "application/json",
            "Referer": "https://www.nseindia.com/",
            "Connection": "keep-alive"
        }

        max_retries = 15
        retry_delay = 3  # seconds

        session = requests.Session()
        session.headers.update(headers)

        # Hit base page to set cookies properly
        session.get("https://www.nseindia.com", timeout=5)
        time.sleep(1.5)

        retries = 0
        while retries < max_retries:
            response = session.get(url, timeout=10)

            if response.status_code == 200:
                return response.json()
            else:
                retries += 1
                time.sleep(retry_delay)

        return {"error": "Failed after retries", "status_code": response.status_code, "text": response.text}

    except Exception as e:
        return {"error": str(e), "detail": "Unexpected error occurred in heatmap"}
    # for sym in VALID_INDICES:
    #     temp = sym.replace(' ', "%20")
    #     url = f"https://www.nseindia.com/api/equity-stockIndices?index={temp}"
    #     retries = 5
    #     success = False
    #     last_error = ""

    #     for attempt in range(retries):
    #         try:
    #             response = session.get(url)
    #             if response.status_code == 200:
    #                 data = response.json()
    #                 concat_data.append({"index": sym, "data": data})
    #                 success = True
    #                 break
    #             else:
    #                 last_error = f"Status Code: {response.status_code}"
    #         except Exception as e:
    #             last_error = str(e)
            
    #         time.sleep(1.5)  # polite retry wait

    #     if not success:
    #         concat_data.append({"index": sym, "error": last_error, "url": url})
# from fastapi import Query

# @app.get("/heatmap")
# async def getHeatMap(index_name: str = Query("NIFTY 100")):
#     try:
#         index_encoded = index_name.replace(" ", "%20")
#         url = f"https://www.nseindia.com/api/equity-stockIndices?index={index_encoded}"
        
#         headers = {
#             "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
#             "Accept-Language": "en-US,en;q=0.9",
#             "Accept": "application/json",
#             "Referer": "https://www.nseindia.com/"
#         }

#         session = requests.Session()
#         session.headers.update(headers)

#         session.get("https://www.nseindia.com")  # To set cookies
#         response = session.get(url)

#         return response.json()

#     except Exception as e:
#         return {"error": str(e)}
