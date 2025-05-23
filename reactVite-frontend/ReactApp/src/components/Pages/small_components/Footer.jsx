import React from 'react';
import styled from 'styled-components';
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebookF } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: #1a202c;
  color: #e2e8f0;
  padding: 3rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-top: 1px solid #2d3748;
`;

const FooterColumn = styled.div`
  flex: 1 1 200px;
  margin: 1rem 0;
`;

const FooterTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #cbd5e0;
    text-decoration: none;

    &:hover {
      color: #63b3ed;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 1rem;

  a {
    color: #cbd5e0;
    font-size: 1.25rem;

    &:hover {
      color: #63b3ed;
    }
  }
`;

const NewsletterInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  border-radius: 4px;
  border: none;
  margin-bottom: 0.5rem;
`;

const NewsletterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #3182ce;
  }
`;

const FooterBottom = styled.div`
  width: 100%;
  border-top: 1px solid #2d3748;
  padding-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: #a0aec0;
`;

function Footer() {
  return (
    <>
      <FooterContainer>
        <FooterColumn>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>TradeDeck</h3>
          <p>Empowering Retail Traders with Pro Tools for smarter investing.</p>
          <SocialIcons>
            <a href="https://twitter.com/tradedeck" target="_blank"><FaTwitter /></a>
            <a href="https://linkedin.com/company/tradedeck" target="_blank"><FaLinkedin /></a>
            <a href="https://instagram.com/tradedeck" target="_blank"><FaInstagram /></a>
            <a href="https://facebook.com/tradedeck" target="_blank"><FaFacebookF /></a>
          </SocialIcons>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLinkList>
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </FooterLinkList>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Subscribe to our Newsletter</FooterTitle>
          <NewsletterInput type="email" placeholder="Enter your email" />
          <NewsletterButton>Subscribe</NewsletterButton>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Contact</FooterTitle>
          <p>Email: support@tradedeck.com</p>
          <p>Phone: +91-98765-43210</p>
          <p>Address: 2nd Floor, FinTech Tower, Bengaluru, India</p>
        </FooterColumn>
      </FooterContainer>

      <FooterBottom>
        &copy; {new Date().getFullYear()} TradeDeck. All rights reserved. | 
        <a href="/privacy" style={{ marginLeft: '10px', color: '#cbd5e0' }}>Privacy Policy</a> | 
        <a href="/terms" style={{ marginLeft: '10px', color: '#cbd5e0' }}>Terms of Service</a>
      </FooterBottom>
    </>
  );
}

export default Footer;