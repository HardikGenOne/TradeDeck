import React from 'react'
import { useEffect, useState } from 'react'
import StockCard from './small_components/stockCard'
export default function Heatmap() {
  let [change_data, setChangeData] = useState({})
  let [boolNifty,setNifty50] = useState(false)
  useEffect(() => {
    const handleHeatMap = async () => {
      let result = null;
      while (!result) {
        try {
          const temp = await fetch("http://127.0.0.1:8000/heatmap");
          const json = await temp.json();
          if (json && json.data && Object.keys(json.data).length > 0) {
            result = json.data;
            setChangeData(result);
            console.log("Fetched data:", result);
          } else {
            console.log("Empty result, retrying...");
          }
        } catch (e) {
          console.log("Fetch error:", e.message);
        }
        if (!result) {
          await new Promise(res => setTimeout(res, 1000)); // wait 1 second before retry
        }
      }
    };

    handleHeatMap();
  }, []); // empty dependency array to run only once
  return (
    <div>
      <button onClick={() => setNifty50(true)}>NIFTY 50</button>
      {boolNifty && Array.isArray(change_data) && change_data.map((stock, i) => (
        <StockCard
          key={i}
          symbol={stock.symbol}
          companyLogo={stock.companyLogo}
          price={stock.lastPrice}
          percentChange={stock.pChange}
        />
      ))}
    </div>
  )
}
