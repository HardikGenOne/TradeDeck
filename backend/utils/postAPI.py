from pydantic import BaseModel
from backend.AngleSmartAPI import AngleOne_Smart_API
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import os 
app = FastAPI()


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
    # api_key = "vhAupRK9"
    # token  = "J4DWDXYMDAKVV6VFJW6RHMS3RI"
    # pwd = "7990"
    # username = "L52128673"

    # instance = AngleOne_Smart_API(api_key, username, pwd, token)
    # instance.connect()

    # exchange = "NSE"
    # symbol = "SBIN-EQ"
    # interval = "FIFTEEN_MINUTE"
    # start_date = "2020-01-01"

    # data = instance.get_FullData(exchange, symbol, interval, start_date)
    
    
    # __file__ gives you the path of the current file (postAPI.py)
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Go up one level (from utils to backend), then to data folder
    csv_path = os.path.join(current_dir, "..","..", "data", "SBIN-TimeData.csv")

    # Normalize full path
    csv_path = os.path.normpath(csv_path)
    data = pd.read_csv(csv_path)
    data['Date'] = pd.to_datetime(data['Date']).dt.strftime('%Y-%m-%d %H:%M')
    # data = pd.read_csv(csv_path)
    data = data.drop(columns=['Unnamed: 0'])
    data.rename(columns={'Date':'date','Open': 'open', 'High': 'high',"Low":"low","Close":'close','volume':'volume'}, inplace=True)
    return {"dataFrame": data.to_dict(orient="records")}  # if `data` is a pandas DataFrame
    
class StockRequest(BaseModel):
    symbol: str

@app.post("/stock_symbol")
async def get_stock_symbol(req: StockRequest):
    return {"message": f"Received: {req.symbol}"}
    
    
    
    