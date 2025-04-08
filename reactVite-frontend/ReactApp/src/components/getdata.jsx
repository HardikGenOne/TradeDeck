import { useEffect, useState } from "react";

export async function FetchData() {
    const res = await fetch("http://127.0.0.1:8000/data");
    const data = await res.json();
    return data;
}

function FetchDataComponent() {
    const [data, setData] = useState(null);
    useEffect(() => {
      FetchData().then(fetchedData=>{

          setData(fetchedData); 
          data => console.log(data)
      }
    );
    }, []);
    return (
        <>
            <h2>Plot Data Page</h2>
            {data ? (
                <div>
                    {data.dataFrame.map((item, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <p><strong>Date:</strong> {item.date}</p>
                            <p><strong>Open:</strong> {item.open}</p>
                            <p><strong>High:</strong> {item.high}</p>
                            <p><strong>Low:</strong> {item.low}</p>
                            <p><strong>Close:</strong> {item.close}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading or no data passed...</p>
            )}
        </>
    );
}

export default FetchDataComponent;

// import React, { useEffect, useRef } from 'react';
// import { createChart } from 'lightweight-charts';

// const TradingViewChart = ({ data }) => {
//   const chartContainerRef = useRef();

//   useEffect(() => {
//     if (!chartContainerRef.current) return; // ✅ safety check
  
//     const chart = createChart(chartContainerRef.current, {
//       width: chartContainerRef.current.clientWidth || 600, // fallback width
//       height: 400,
//       layout: {
//         background: { color: '#ffffff' },
//         textColor: '#000',
//       },
//       grid: {
//         vertLines: { color: '#eee' },
//         horzLines: { color: '#eee' },
//       },
//       timeScale: {
//         timeVisible: true,
//         secondsVisible: false,
//       },
//     });
  
//     const candleSeries = chart.addCandlestickSeries();
//     candleSeries.setData(data);
  
//     const resizeObserver = new ResizeObserver(() => {
//       chart.applyOptions({
//         width: chartContainerRef.current?.clientWidth || 600,
//       });
//     });
  
//     resizeObserver.observe(chartContainerRef.current);
  
//     return () => {
//       resizeObserver.disconnect();
//       chart.remove();
//     };
//   }, [data]);

//   return (
//     <div className="p-4">
//       <div ref={chartContainerRef} className="w-full" />
//     </div>
//   );
// };

// export default TradingViewChart;