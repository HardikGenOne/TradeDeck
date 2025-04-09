import { useEffect, useState } from "react";
import PlotData from "./plot_data";

export async function FetchData() {
  try {
    console.log("Loading Data");
    const res = await fetch("http://127.0.0.1:8000/data");
    const data = await res.json();
    fetch("http://127.0.0.1:8000/data")
      .then((res) => (res = res.json))
      .then((rel) => console.log(rel))
      .catch((e) => console.log(e.message));
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

function FetchDataComponent() {
  const [data, setData] = useState(null);
  // useEffect(() => {
  //   FetchData().then(fetchedData=>{

  //       setData(fetchedData);
  //       data => console.log(data)
  //   }
  // );
  // }, []);
  useEffect(() => {
    FetchData().then((fetchedData) => {
      // Convert 'date' to 'time' key expected by lightweight-charts
      const formattedData = fetchedData.dataFrame
        .map((item) => ({
          // time: item.date, // this is okay if your date format is 'YYYY-MM-DD'
          time: Math.floor(new Date(item.date).getTime() / 1000), // for UNIX timestamp
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }))
        .sort((a, b) => a.time - b.time);
      const deduplicatedData = formattedData.filter(
        (item, index, self) => index === 0 || item.time !== self[index - 1].time
      );

      // Limit to first 1000 entries
      //   const slicedData = deduplicatedData.slice(0, 2000);

      setData(deduplicatedData);
      console.log(deduplicatedData);
    });
  }, []);
  //   const readableSampleData = [
  //     { time: '2024-04-01', open: 100, high: 110, low: 95, close: 108 },
  //     { time: '2024-04-02', open: 108, high: 112, low: 102, close: 110 },
  //     { time: '2024-04-03', open: 110, high: 118, low: 109, close: 117 },
  //     { time: '2024-04-04', open: 117, high: 120, low: 111, close: 114 },
  //     { time: '2024-04-05', open: 114, high: 115, low: 107, close: 109 },
  //   ];
  return (
    <>
      <h2 className="plot-title">Plot Data Page</h2>

      {data ? (
        <div className="plot-wrapper">
          {/* <PlotData data={data} width={1200} height={700} /> */}
          <PlotData historicalData={data} width={1200} height={800} />

        </div>
      ) : (
        <p className="plot-loading">Loading or no data passed...</p>
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
