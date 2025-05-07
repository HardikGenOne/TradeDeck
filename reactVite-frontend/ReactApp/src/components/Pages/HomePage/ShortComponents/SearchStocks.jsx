import React, { useState } from 'react'
import { Search } from 'lucide-react'
import styled from "styled-components"
import StockPage from '../../StockPage/StockPage';
import { useNavigate } from 'react-router-dom';


const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    background-color: #1e293b;

    border-radius: 8px;
    padding: 0 10px;

    svg {
      color: #94a3b8;
    }

    input {
      background-color: transparent;
      border: none;
      outline: none;
      color: white;
      padding: 8px;
      font-size: 14px;
      width: 180px;

      &::placeholder {
        color: #cbd5e1;
      }
    }
  }

  .suggestions {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    width: 100%;
    z-index: 10;
    background: #1e293b;
    margin-top: 4px;
    padding: 0;
    list-style: none;
  
    border-radius: 8px;
    max-height: 150px;
    overflow-y: auto;

    li {
      padding: 8px 12px;
      cursor: pointer;
      color: white;

      &:hover {
        background-color: #2d3748;
      }
    }
  }
`;

const RelativeWrapper = styled.div`
  position: relative;
`;

function SearchStocks() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const dummyStocks = [
    "RELIANCE", "TATAMOTORS", "SBIN", "INFY", "HDFCBANK", "ICICIBANK", "ITC", "ONGC", "ADANIENT", "ADANIPORTS"
  ];

  const handleInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setQuery(value);
    setSuggestions(
      value ? dummyStocks.filter(stock => stock.includes(value)) : []
    );

  };
  function handleKeyDown(e){
    
      if (e.key === "Enter" && suggestions.length > 0) {
        setQuery(suggestions[0]);
        navigate("/stockPage", { state: { stock: suggestions[0] } });
        setSuggestions([]);
        e.target.blur();
      }
    

  }

  return (
    <SearchContainer>
      <RelativeWrapper>
        <div>
          <Search size={18} />
          <input type="text" placeholder="Search..." value={query} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
        </div>
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((stock, idx) => (
              <li key={idx} onClick={() => {
                setQuery(stock);
                setSuggestions([]);
                navigate("/stockPage",{state:stock})
                document.activeElement.blur();
              }}>{stock}</li>
            ))}
          </ul>
        )}
      </RelativeWrapper>
    </SearchContainer>
  )
}

export default SearchStocks