import React, { useEffect, useRef } from 'react';

const Loading = ({ messages }) => {
  const logBoxRef = useRef(null);

  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={overlay}>
      <div style={box}>
        <div style={spinner} />
        <div style={logBox} ref={logBoxRef}>
          {messages.length === 0 ? (
            <p style={noMsg}>Waiting for logs...</p>
          ) : (
            messages.map((msg, i) => (
              <p key={i} style={logLine}>{msg}</p>
            ))
          )}
        </div>
      </div>
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
};

export default Loading;

const overlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  zIndex: 9999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'auto'
};

const box = {
  width: '320px',
  maxHeight: '70vh',
  backgroundColor: '#222',
  borderRadius: '8px',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white',
  fontFamily: 'Segoe UI, sans-serif',
};

const spinner = {
  width: '48px',
  height: '48px',
  border: '6px solid #444',
  borderTopColor: '#1e90ff',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '20px'
};

const logBox = {
  width: '100%',
  height: '200px',
  backgroundColor: '#111',
  borderRadius: '4px',
  padding: '10px',
  overflowY: 'auto',
  fontSize: '14px',
  lineHeight: '1.4',
};

const logLine = {
  margin: 0,
  padding: '2px 0',
  whiteSpace: 'pre-wrap',
};

const noMsg = {
  color: '#777',
  fontStyle: 'italic'
};