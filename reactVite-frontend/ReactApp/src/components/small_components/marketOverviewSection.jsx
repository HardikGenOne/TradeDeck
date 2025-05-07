import React from 'react';
import styled from 'styled-components';
import { TrendingUp, AlertTriangle } from 'lucide-react';
// import { useEffect,useState } from 'react';
const SectionDark = styled.div`
  background-color: #1a202c;
  padding: 2rem;
  border-radius: 1rem;
  color: white;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Card = styled.div`
  background-color: #2d3748;
  padding: 1.5rem;
  border-radius: 0.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Spacer = styled.div`
  height: 0.75rem;
`;

const TextGreen = styled.span`
  color: #68d391;
`;

const TextRed = styled.span`
  color: #fc8181;
`;

export default function MarketOverviewSection() {
    // const [data,setData]= useState({})
    //
    // useEffect(()=>{
    //     const fetch_majorIndices=async()=>{
    //         try{
    //             // const response = await fetch("https://tradedeck.onrender.com/major_indices")
    //             const response = await fetch(import.meta.env.VITE_API_KEY+"/major_indices")
    //
    //             const result = await response.json()
    //             setData(result)
    //             console.log(result)
    //         }
    //         catch(e){
    //             console.log(e.message)
    //         }
    //     }
    //     fetch_majorIndices()
    // },{})

    const dummyIndices = [
      { symbol: "NIFTY 50", ltp: 22600, day: { percent: 0.75, change: 170 } },
      { symbol: "BANKNIFTY", ltp: 48900, day: { percent: -0.4, change: -195 } },
      { symbol: "FINNIFTY", ltp: 21300, day: { percent: 0.6, change: 127 } }
    ];

  return (
    <SectionDark>
      <SectionTitle>Market Movers</SectionTitle>
      <GridContainer>
        <Card>
          <CardTitle>
            <TrendingUp size={20} />
            Indices
          </CardTitle>
          <div>
            {dummyIndices.map((ind, index) => (
              <React.Fragment key={index}>
                <FlexRow>
                  <span>{ind.symbol}</span>
                  {ind.day.change > 0 ? (
                    <TextGreen>₹{ind.ltp} (+{ind.day.percent}%)</TextGreen>
                  ) : (
                    <TextRed>₹{ind.ltp} ({ind.day.percent}%)</TextRed>
                  )}
                </FlexRow>
                <Spacer />
              </React.Fragment>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle>
            <TrendingUp size={20} />
            Top Gainers
          </CardTitle>
          <div>
            <FlexRow>
              <span>RELIANCE</span>
              <TextGreen>₹2,945.20 (+3.2%)</TextGreen>
            </FlexRow>
            <Spacer />
            <FlexRow>
              <span>TCS</span>
              <TextGreen>₹3,876.45 (+2.7%)</TextGreen>
            </FlexRow>
            <Spacer />
            <FlexRow>
              <span>INFY</span>
              <TextGreen>₹1,624.80 (+2.1%)</TextGreen>
            </FlexRow>
          </div>
        </Card>

        <Card>
          <CardTitle>
            <AlertTriangle size={20} />
            Top Losers
          </CardTitle>
          <div>
            <FlexRow>
              <span>SBIN</span>
              <TextRed>₹742.20 (-3.43%)</TextRed>
            </FlexRow>
            <Spacer />
            <FlexRow>
              <span>HSCL</span>
              <TextRed>₹408.65 (-1.04%)</TextRed>
            </FlexRow>
            <Spacer />
            <FlexRow>
              <span>TATAMOTORS</span>
              <TextRed>₹582.90 (-1.01%)</TextRed>
            </FlexRow>
          </div>
        </Card>
      </GridContainer>
    </SectionDark>
  );
}