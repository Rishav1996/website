import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollCompanion.css';

const ScrollCompanion = () => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress from 0-1 to 0%-100% of the track height
  const yPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="scroll-companion-container">
      <div className="scroll-track">
        <motion.div 
          className="scroll-orb"
          style={{ top: yPosition }}
        >
          <div className="orb-glow"></div>
          <div className="orb-core"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollCompanion;
