import React from 'react';

const style = {
  color: '#008bdb',
  fontSize: '20px',
  fontWeight: 'bold',
  backgroundColor: '#e8e8e8',
  border: '5px solid #008bdb',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
};

const Alert = ({ msg }) => {
  if (!msg) return null;

  return (
    <div style={style}>{msg}</div>
  );
};

export default Alert;