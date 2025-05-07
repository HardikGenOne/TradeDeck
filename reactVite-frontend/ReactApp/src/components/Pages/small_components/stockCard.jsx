import React from 'react';

// StockCard component with inline styles
const StockCard = ({ symbol, companyLogo, price, percentChange }) => {
  const isPositive = parseFloat(percentChange) >= 0;
  
  const styles = {
    stockCard: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isPositive ? '#2e8b3e': '#ff4d4d',
      borderRadius: '12px',
      padding: '16px 20px',
      color: 'white',
      maxWidth: '600px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    logoContainer: {
      backgroundColor: 'white',
      borderRadius: '50%',
      width: '64px',
      height: '64px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '16px',
      flexShrink: 0,
    },
    logoImage: {
      width: '40px',
      height: '40px',
      objectFit: 'contain',
    },
    stockInfo: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    stockSymbol: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '4px',
    },
    stockPrice: {
      fontSize: '20px',
      fontWeight: 500,
    },
    stockChange: {
      fontSize: '22px',
      fontWeight: 'bold',
      marginLeft: 'auto',
      paddingLeft: '12px',
      whiteSpace: 'nowrap',
      color: "white",
    },
  };
  
  return (
    // percentChange > 0 ?
    <div style={styles.stockCard}>
      <div style={styles.logoContainer}>
        <img src={companyLogo} alt={`${symbol} logo`} style={styles.logoImage} />
      </div>
      <div style={styles.stockInfo}>
        <div style={styles.stockSymbol}>{symbol}</div>
        <div style={styles.stockPrice}>₹ {price}</div>
      </div>
      <div style={styles.stockChange}>
        {isPositive ? '+' : ''}{percentChange}%
      </div>
    </div>
  );
};

export default StockCard;

// Usage example:
// <StockCard 
//   symbol="HINDALCO"
//   companyLogo="/path/to/hindalco-logo.png"
//   price="600.3"
//   percentChange="6.44"
// />