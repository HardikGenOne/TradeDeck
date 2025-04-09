from pydantic import BaseModel
from backend.AngleSmartAPI import AngleOne_Smart_API
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import os 
app = FastAPI()

current_stock = ""
interval = ""
start_date = ""
processed_data = {}

# Allow requests from any frontend (you can restrict later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://127.0.0.1:5500"] for more security
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
    
    
    
    