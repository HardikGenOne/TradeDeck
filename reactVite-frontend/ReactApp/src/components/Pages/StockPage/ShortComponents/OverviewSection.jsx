import React, { useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  color: white;
`;

const LeftSection = styled.div`
  flex: 2;
  background-color: #12131c;
  border-radius: 10px;
  padding: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  background-color: #12131c;
  border-radius: 10px;
  padding: 20px;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
`;

const DateInput = styled.input`
  background-color: #1e1f2b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
`;

const DatePickerGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ChartButtons = styled.div`
  display: flex;
  margin: 15px 0;
  gap: 10px;
`;

const ChartButton = styled.button`
  background-color: ${({ active }) => (active ? "#3d5afe" : "#1e1f2b")};
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
`;

const PlaceholderNews = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 16px;
  text-align: center;
`;

const dummyData = [
  { time: "09:00", price: 773.5 },
  { time: "09:15", price: 775.2 },
  { time: "09:30", price: 778.1 },
  { time: "09:45", price: 780.0 },
  { time: "10:00", price: 779.3 },
  { time: "10:15", price: 778.0 },
  { time: "10:30", price: 776.8 },
  { time: "10:45", price: 775.5 },
  { time: "11:00", price: 774.2 },
  { time: "11:15", price: 773.0 },
  { time: "11:30", price: 772.6 },
  { time: "11:45", price: 773.9 },
  { time: "12:00", price: 775.0 },
  { time: "12:15", price: 776.4 },
  { time: "12:30", price: 778.2 },
  { time: "12:45", price: 779.5 },
  { time: "01:00", price: 780.3 },
  { time: "01:15", price: 781.0 },
  { time: "01:30", price: 780.1 },
  { time: "01:45", price: 779.0 },
];


function OverviewSection({name}) {
  const [activeRange, setActiveRange] = useState("1D");
  const dummyNews = [
    {
      title: `${name} reports 15% rise in quarterly profits`,
      date: "May 6, 2025",
      summary:
        `{name}'s quarterly earnings beat market expectations, driven by strong retail loan growth.`,
      source: "Economic Times",
    },
    {
      title: `${name} launches new digital banking platform`,
      date: "May 5, 2025",
      summary:
        "The new platform aims to improve user experience and security for online transactions.",
      source: "LiveMint",
    },
    {
      title: `${name} to increase focus on green financing`,
      date: "May 3, 2025",
      summary:
        "Bank commits to financing more sustainable projects over the next 5 years.",
      source: "Business Standard",
    },
  ];

  return (
    <Container>
      <LeftSection>
        <TitleRow>
          <Title>Historical Prices</Title>
          <DatePickerGroup>
            <span>From:</span>
            <DateInput type="date" defaultValue="2025-05-07" />
            <DateInput type="date" defaultValue="2025-05-08" />
          </DatePickerGroup>
        </TitleRow>

        <ChartButtons>
          {["1D", "5D", "1M", "3M", "6M", "1Y"].map((range) => (
            <ChartButton
              key={range}
              active={activeRange === range}
              onClick={() => setActiveRange(range)}
            >
              {range}
            </ChartButton>
          ))}
        </ChartButtons>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dummyData}>
            <XAxis dataKey="time" stroke="#aaa" />
            <YAxis stroke="#aaa" domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3d5afe"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </LeftSection>

      <RightSection>
        <Title>Latest {name} News</Title>
        <PlaceholderNews>
          <ul>
            {dummyNews.map((item, index) => (
              <>
                <li key={index}>{item.title}</li>
                <p key={index}>{item.date}</p>
                <p key={index}>{item.source}</p>

              </>
            ))}
          </ul>
        </PlaceholderNews>
      </RightSection>
    </Container>
  );
}

export default OverviewSection;
