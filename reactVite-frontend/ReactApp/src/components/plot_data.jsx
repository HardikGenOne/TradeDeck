// import React, { useEffect, useRef } from 'react';
// import { createChart, CrosshairMode } from 'lightweight-charts';


// const PlotData = ({ data, width = "100%", height = "100%" }) => {
//   const chartContainerRef = useRef();


//   useEffect(() => {
//     const chart = createChart(chartContainerRef.current, {
//       width,
//       height,
//       layout: {
//         background: { color: '#ffffff' },
//         textColor: '#000',
//       },
//       crosshair: {
//         mode: CrosshairMode.Normal,
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

//     return () => chart.remove();
//   }, [data, width, height]);

//   return <div ref={chartContainerRef} />;
// };

// export default PlotData;

import React, { useEffect, useRef } from 'react';
import customizeChart from './ChartManager';

const PlotData = ({ historicalData }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current && Array.isArray(historicalData) && historicalData.length > 0) {
      customizeChart(chartContainerRef.current, historicalData);
    } else {
      console.warn("No valid data passed to PlotData.");
    }
  }, [historicalData]);

  return (
    historicalData && historicalData.length > 0 ? (
      <div
        ref={chartContainerRef}
        style={{ width: '900px', height: '100%' }}
      />
    ) : (
      <p>No Data</p>
    )
  );
};

export default PlotData;