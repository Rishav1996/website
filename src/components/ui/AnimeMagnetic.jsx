import React from 'react';
import './AnimeMagnetic.css';

const AnimeMagnetic = ({ children, className = '' }) => {
  return (
    <div className={`anime-magnetic-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default AnimeMagnetic;
