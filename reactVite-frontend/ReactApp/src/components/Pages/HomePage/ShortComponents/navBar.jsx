import React, { useState } from 'react';
import logo from "../../../../assets/logo.jpg";
import styled from "styled-components";
import { Menu, X } from "lucide-react";
import SearchStocks from './SearchStocks';

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #0f172a;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

const LeftSection = styled.section`
  display: flex;
  align-items: center;
  gap: 40px;

  & > div:first-child {
    display: flex;
    align-items: center;

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

    p {
      font-size: 20px;
      font-weight: 600;
      margin: 0;
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #f8fafc;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #38bdf8;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Drawer = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #1e293b;
  width: 200px;
  border-left: 1px solid #334155;
  border-bottom: 1px solid #334155;
  border-radius: 0 0 0 10px;
  z-index: 1000;

  a, button {
    display: block;
    width: 100%;
    padding: 12px 16px;
    text-align: left;
    color: white;
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #334155;
    }
  }
`;

const RightSection = styled.section`
  display: flex;
  gap: 15px;

  .login, .signup {
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .login {
    border: 1px solid #38bdf8;
    background-color: transparent;
    color: #38bdf8;

    &:hover {
      background-color: #38bdf8;
      color: white;
    }
  }

  .signup {
    border: none;
    background-color: #38bdf8;
    color: white;

    &:hover {
      background-color: #0ea5e9;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  svg {
    color: white;
  }
`;

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <NavBarContainer>
        <LeftSection>
          <div onClick={() => window.location.href = "/home"}>
            <img src={logo} alt='Logo' />
            <p>GenOne Stock Analyser</p>
          </div>
          <NavLinks>
            <a href="#">Dashboard</a>
            <a href="#">Portfolio</a>
            <a onClick={() => window.location.href = "/heatmap"}>Heat Map</a>
          </NavLinks>
        </LeftSection>

        <SearchStocks />

        <RightSection>
          <button className='login' onClick={() => window.location.href = "/login"}>Log In</button>
          <button className='signup' onClick={() => window.location.href = "/signup"}>Sign Up</button>
        </RightSection>

        <Hamburger onClick={() => setDrawerOpen(!drawerOpen)}>
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </Hamburger>

        {drawerOpen && (
          <Drawer>
            <a href="#">Dashboard</a>
            <a href="#">Portfolio</a>
            <a onClick={() => window.location.href = "/heatmap"}>Heat Map</a>
            <button onClick={() => window.location.href = "/login"}>Log In</button>
            <button onClick={() => window.location.href = "/signup"}>Sign Up</button>
          </Drawer>
        )}
      </NavBarContainer>
    </>
  );
}
