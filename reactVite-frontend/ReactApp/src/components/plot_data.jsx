import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const PlotData = ({ data, width = 600, height = 400 }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width,
      height,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#000',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    candleSeries.setData(data);

    return () => chart.remove();
  }, [data, width, height]);

  return <div ref={chartContainerRef} />;
};

export default PlotData;
