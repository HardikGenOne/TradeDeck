import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  text-align: center;
  background: linear-gradient(to bottom, #2d3748, #1a202c);
  color: #ffffff;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #cbd5e0;
  max-width: 700px;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PrimaryButton = styled.button`
  background-color: #3182ce;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2c5282;
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: 1px solid #3182ce;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(49, 130, 206, 0.1);
  }
`;

function HeroSectionComponent() {
  return (
    <HeroSection>
      <HeroTitle>Intelligent Stock Analysis, Simplified</HeroTitle>
      <HeroSubtitle>
        GenOne provides AI-powered insights to help you make smarter investment decisions in the Indian stock market
      </HeroSubtitle>
      <ButtonContainer>
        <PrimaryButton onClick={()=>window.location.href="/login"}>Get Started</PrimaryButton>
        <SecondaryButton onClick={()=>window.location.href="/profile"}>View Demo</SecondaryButton>
      </ButtonContainer>
    </HeroSection>
  );
}

export default HeroSectionComponent;
