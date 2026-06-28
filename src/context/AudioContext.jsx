import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};
