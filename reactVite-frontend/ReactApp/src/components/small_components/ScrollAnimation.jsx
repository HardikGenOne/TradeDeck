import React from 'react'
import styled, { keyframes } from "styled-components"
import { useState, useEffect } from 'react';

function ScrollAnimation() {
    const [stockData, setStockData] = useState([]);
    const stocks = ["RELIANCE", "TATAMOTORS", "SBIN", "HSCL", "BHEL","GRASIM",
    "ADANIENT",
    "ADANIPORTS",
    "BHARTIARTL",
    "BAJAJ-AUTO",
    "CIPLA",];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(
                    stocks.map(stock =>
                        fetch(`http://127.0.0.1:8000/stock/${stock}/info`).then(res => res.json())
                    )
                );
                const formatted = results.map((data, index) => ({
                    name: stocks[index],
                    ltp: data.ltp,
                    percentChange: data.day.percent,
                    priceChange: data.day.change
                }));
                console.log(formatted)
                setStockData(formatted);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <AppContainer>
            <Wrapper>
                <Marquee>
                    {Array(5).fill().map((_, i) => (
                        <MarqueeGroup key={i}>
                            {stockData.map((stock, index) => (
                                <StockBox key={index}>
                                    {`${stock.name}: ₹${stock.ltp} (`}
                                    <span style={{ color: stock.percentChange > 0 ? '#00c853' : '#d50000' }}>
                                        {`${stock.percentChange > 0 ? '🟢' : '🔴'} ${stock.percentChange}%`}
                                    </span>
                                    {`, ₹${stock.priceChange})`}
                                </StockBox>
                            ))}
                        </MarqueeGroup>
                    ))}
                </Marquee>
            </Wrapper>
        </AppContainer>
    )
}

export default ScrollAnimation;

const AppContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 10px 0;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const scroll = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
`;

const Marquee = styled.div`
  overflow: hidden;
  width: 100vw;
  white-space: nowrap;
`;

const MarqueeGroup = styled.div`
  display: inline-flex;
  animation: ${scroll} 30s linear infinite;
  padding: 0 20px;
`;

const StockBox = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-right: 40px;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.5px;
`;