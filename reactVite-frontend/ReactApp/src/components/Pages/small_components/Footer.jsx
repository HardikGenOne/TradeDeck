import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-top: 1px solid #2d3748;
 

`;

const FooterColumn = styled.div`
  flex: 1 1 200px;
`;

const FooterTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin: 8px 0;
  }

  a {
    color: #cbd5e0;
    text-decoration: none;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterColumn>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>TradeDeck</h3>
        <p>Empowering Retail Traders with Pro Tools</p>
      </FooterColumn>
      <FooterColumn>
        <FooterTitle>Quick Links</FooterTitle>
        <FooterLinkList>
          <li><a href="/features">Features</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/about">About Us</a></li>
        </FooterLinkList>
      </FooterColumn>
      <FooterColumn>
        <FooterTitle>Contact</FooterTitle>
        <p>Email: support@tradedeck.com</p>
        <p>Twitter: @tradedeck</p>
      </FooterColumn>
    </FooterContainer>
  );
}

export default Footer;