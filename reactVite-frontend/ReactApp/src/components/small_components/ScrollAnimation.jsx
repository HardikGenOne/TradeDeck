import React from 'react'
import styled, { keyframes } from "styled-components"
// import { useEffect } from 'react';

function ScrollAnimation() {
    // const [stockData, setStockData] = useState([]);
    const stockData = [
        { name: "RELIANCE", ltp: 2500, percentChange: 1.2, priceChange: 30 },
        { name: "TATAMOTORS", ltp: 350, percentChange: -0.5, priceChange: -2 },
        { name: "SBIN", ltp: 480, percentChange: 0.8, priceChange: 4 },
        { name: "HSCL", ltp: 120, percentChange: -1.1, priceChange: -1.3 },
        { name: "BHEL", ltp: 65, percentChange: 0.3, priceChange: 0.2 }
    ];
    // const stocks = ["RELIANCE", "TATAMOTORS", "SBIN", "HSCL", "BHEL","GRASIM",
    // "ADANIENT",
    // "ADANIPORTS",
    // "BHARTIARTL",
    // "BAJAJ-AUTO",
    // "CIPLA",];

    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const results = await Promise.all(
                    stocks.map(stock =>
                        // fetch(`https://tradedeck.onrender.com/x/${stock}/info`).then(res => res.json())
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
    */

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
  border-top: 0.4px solid gray;
  border-bottom: 0.4px solid gray;
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