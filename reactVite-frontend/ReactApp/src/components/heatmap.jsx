import React from 'react'
import { useEffect, useState } from 'react'
import StockCard from './small_components/stockCard';
import styled from 'styled-components';

export default function Heatmap() {
  let [change_data, setChangeData] = useState({})
  let [boolNifty,setNifty50] = useState(false)
  useEffect(() => {
    const handleHeatMap = async () => {
      try {
        // const response = await fetch('https://tradedeck.onrender.com/heatmap');
        const response = await fetch('http://127.0.0.1:8000/heatmap');
        const result = await response.json();
        console.log("Fetched result:", result);
        if (Array.isArray(result)) {
          setChangeData(result);
        } else if (result.data && Array.isArray(result.data)) {
          setChangeData(result.data);
        } else {
          console.warn("Unexpected response format:", result);
        }
      } catch (error) {
        console.error("Error fetching heatmap:", error);
      }
    };

    handleHeatMap();
  }, []); // empty dependency array to run only once
  return (
    <HeatmapWrapper>
      <HeatmapTitle>Nifty 50 Heatmap</HeatmapTitle>
      <HeatmapDescription>
        Get a bird eye view of the performance of the Nifty 50 index through the Nifty 50 Heatmap. The Nifty 50 Heatmap gives a dynamic view of the gainers and losers in the Nifty 50 index.
      </HeatmapDescription>
      <IndexLabel>Select an Index</IndexLabel>
      <IndexSelect onChange={(e) => setNifty50(e.target.value === "nifty50")}>
        <option value="">-- Select Index --</option>
        <option value="nifty50">NIFTY 50</option>
      </IndexSelect>

      <StockCardGrid>
        {boolNifty && Array.isArray(change_data) && change_data.map((stock, i) => (
          <StockCard
            key={i}
            symbol={stock.symbol}
            companyLogo={"stock.companyLogo"}
            price={stock.lastPrice}
            percentChange={stock.pChange}
          />
        ))}
      </StockCardGrid>

      {boolNifty && !Array.isArray(change_data) && <p>No data available.</p>}
    </HeatmapWrapper>
  )
}

const HeatmapWrapper = styled.div`
  background-color: #1a202c;
  min-height: 100vh;
  color: white;
  padding: 40px 24px;
`;

const HeatmapTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const HeatmapDescription = styled.p`
  color: #d1d5db;
  margin-bottom: 1.5rem;
`;

const IndexLabel = styled.label`
  display: flex;
  
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
`;

const IndexSelect = styled.select`
  background-color: #2d3748;
  border: 1px solid #4a5568;
  color: white;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  display: block;
  width: 15rem;
  padding: 0.625rem;
  margin-bottom: 1.5rem;
`;

const StockCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;
