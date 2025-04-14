import React from 'react'
import logo from "../../assets/logo.jpg"
import styled from "styled-components"

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #0f172a;
  color: white;
  font-family: 'Segoe UI', sans-serif;
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
    }
  }

  & > div:last-child {
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
  }
`;

const RightSection = styled.section`
  display: flex;
  gap: 15px;

  .login {
    padding: 8px 16px;
    border: 1px solid #38bdf8;
    border-radius: 8px;
    background-color: transparent;
    color: #38bdf8;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #38bdf8;
      color: white;
    }
  }

  .signup {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: #38bdf8;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #0ea5e9;
    }
  }
`;

export default function NavBar() {
  return (
    <>
      <NavBarContainer>
        <LeftSection>
          <div>
            <img src={logo} alt='Logo' />
            <p>GenOne Stock Analyser</p>
          </div>
          <div>
            <a href="#">Dashboard</a>
            <a href="#">Portfolio</a>
            <a onClick={()=>window.location.href = "/heatmap"}>Heat Map</a>
          </div>
        </LeftSection>
        <RightSection>
          <button className='login' onClick={() => window.location.href = "/login"}>Log In</button>
          <button className='signup' onClick={() => window.location.href = "/signup"}>Sign Up</button>
        </RightSection>
      </NavBarContainer>
    </>
  )
}