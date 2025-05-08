import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../HomePage/ShortComponents/navBar';
import Footer from '../small_components/Footer';
import styled from 'styled-components';
import OverviewSection from './ShortComponents/OverviewSection';
import ProfileSection from './ShortComponents/ProfileSection';

const Container = styled.div`
  background-color: #1e1f2b;
  color: white;
  font-family: Arial, sans-serif;
  padding: 20px;
  height:auto;
  display: flex;
  flex-direction: column;
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const Info = styled.div`
  margin-left: 20px;
`;

const BankName = styled.h1`
  margin: 0;
  font-size: 32px;
`;

const Tickers = styled.div`
  margin-top: 5px;
`;

const TickerButton = styled.button`
  background-color: #2c2d3a;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 5px;
  font-size: 14px;
`;
const Temp = styled.div`
    display:flex;
    
`
const PriceSection = styled.div`

  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  display:flex;
  flex-direction:column;
  margin-left:30px;
`;

const Price = styled.span`
  color: white;
`;

const Change = styled.span`
  color: #4caf50;
  font-size: 18px;
  margin-left: 10px;
`;

const Tabs = styled.div`
  display: flex;

  flex-wrap: wrap;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  color: ${({ active }) => (active ? "white" : "#aaa")};
  border-bottom: ${({ active }) => (active ? "3px solid white" : "none")};
`;
const BackgroundColor = styled.div`
  background-color: black;
  width: 100vw; 
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  margin-top:0px
`;




function StockPage() {
  const { state } = useLocation();
  const name = state?.stock || "Unknown Stock";

  const dummy = {
    ticker1: "DUMMY1",
    ticker2: "DUMMY2",
    price: "999.9",
    change: "+10.0 (1.01%)",
    logo: `https://images.financialmodelingprep.com/symbol/${name}.NS.png`
  };

  const tabList = [
    "Overview",
    "Profile",
    "Financial Statements",
    "Financial Ratios",
    "Chart",
    "Analysis",
    "News",
    "Corporate Actions",
    "DCF"
  ];

  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <>
      <NavBar />
      <Container>
        <Temp>
        <Header>
          <Logo src={dummy.logo} alt="Stock Logo" />
          <Info>
            <BankName>{name}</BankName>
            <Tickers>
              <TickerButton>{dummy.ticker1}</TickerButton>
              <TickerButton>{dummy.ticker2}</TickerButton>
            </Tickers>
          </Info>
        </Header>
        <PriceSection>
        
          <Price>{dummy.price} INR</Price>
          <Change>{dummy.change}</Change>
        </PriceSection>
        </Temp>
        <Tabs>
          {tabList.map((tab) => (
            <Tab
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Tab>
          ))}
        </Tabs>
      </Container>
      <BackgroundColor>

        {activeTab == "Overview" && <OverviewSection name = {name}/>}
        {activeTab == "Profile" && <ProfileSection name = {name}/>}
      </BackgroundColor>
      <Footer />
    </>
  );
}

export default StockPage;
