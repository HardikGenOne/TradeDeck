from pydantic import BaseModel
from backend.AngleSmartAPI import AngleOne_Smart_API
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"msg": "FastAPI working!"}

@app.get("/data")
def postData():
    global current_stock,interval,start_date

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
class StockRequest(BaseModel):
    symbol: str
    interval: str
    start_date: str

@app.post("/stock_symbol")
async def get_stock_symbol(req: StockRequest):
    global current_stock,interval,start_date,processed_data
    
    current_stock = req.symbol
    interval = req.interval
    start_date = req.start_date
    
    return {"message": f"Received: {req.symbol}, interval: {interval}, start_date: {start_date}"}


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
        return {"error": str(e)}
        
    
    
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
        return {"error": str(e)}