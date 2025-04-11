import React from 'react';
import styled from 'styled-components';
import { PieChart, TrendingUp, Activity } from 'lucide-react';

const Section = styled.div`
  padding: 3rem 1rem;
  background-color: #121212;
  color: white;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #1a202c;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardText = styled.p`
  color: #cbd5e0;
`;

export default function FeaturesSection() {
  return (
    <Section>
      <SectionTitle>Powerful Tools for Smart Investors</SectionTitle>
      <GridContainer>
        <Card>
          <IconContainer>
            <PieChart size={48} />
          </IconContainer>
          <CardTitle>Portfolio Analysis</CardTitle>
          <CardText>
            Track your investments with advanced metrics and get personalized recommendations.
          </CardText>
        </Card>

        <Card>
          <IconContainer>
            <TrendingUp size={48} />
          </IconContainer>
          <CardTitle>Technical Analysis</CardTitle>
          <CardText>
            Advanced charts and indicators to identify potential market trends and entry points.
          </CardText>
        </Card>

        <Card>
          <IconContainer>
            <Activity size={48} />
          </IconContainer>
          <CardTitle>Market Screener</CardTitle>
          <CardText>
            Find stocks that match your criteria with our customizable screening tools.
          </CardText>
        </Card>
      </GridContainer>
    </Section>
  );
}
