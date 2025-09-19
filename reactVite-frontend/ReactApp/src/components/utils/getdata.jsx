import { useEffect, useState } from "react";
import PlotData from "./plot_data";
import styled from 'styled-components';

export async function FetchData() {
  try {
    console.log("Loading Data");
    const res = await fetch("https://tradedeck-backend-new.onrender.com/data");
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

function FetchDataComponent() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    FetchData()
      .then((fetchedData) => {
        if (!fetchedData || !fetchedData.dataFrame) {
          setIsLoading(false);
          return;
        }

        // Convert 'date' to 'time' key expected by lightweight-charts
        const formattedData = fetchedData.dataFrame
          .map((item) => ({
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

        setData(deduplicatedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <FullScreenWrapper>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      ) : data ? (
        <FullScreenChartContainer>
          <PlotData 
            historicalData={data} 
            width={window.innerWidth} 
            height={window.innerHeight} 
          />
        </FullScreenChartContainer>
      ) : (
        <LoadingContainer>
          <RetryButton onClick={() => window.location.reload()}>
            Reload Data
          </RetryButton>
        </LoadingContainer>
      )}
    </FullScreenWrapper>
  );
}

export default FetchDataComponent;

const FullScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FullScreenChartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(65, 105, 225, 0.3);
  border-radius: 50%;
  border-top: 4px solid #4169e1;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  background-color: #4169e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #3658c5;
  }
`;