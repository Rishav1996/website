import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ScrollCompanion.css';

const Robot = ({ scrollState }) => {
  const group = useRef();
  const { scene, animations } = useGLTF(`${import.meta.env.BASE_URL}assets/models/Xbot.glb`);
  const { actions } = useAnimations(animations, group);

  // Determine action and rotation based on scroll state
  let currentAction = 'idle';
  let targetRotation = [0, Math.PI / 6, 0]; // Default idle

  if (scrollState === 'ScrollingUp') {
    currentAction = 'run';
    // Rotate character to face "up" the screen (simulating climbing)
    targetRotation = [-Math.PI / 2.2, Math.PI, 0]; 
  } else if (scrollState === 'ScrollingDown') {
    currentAction = 'idle'; // Xbot doesn't have sit, idle while sliding works
    // Face the user while sliding down
    targetRotation = [0, 0, 0]; 
  }

  useEffect(() => {
    if (actions && currentAction && actions[currentAction]) {
      // Fade in the new action over 0.3s for a snappy transition
      actions[currentAction].reset().fadeIn(0.3).play();
      return () => {
        if (actions[currentAction]) {
          actions[currentAction].fadeOut(0.3);
        }
      };
    } else if (actions && actions['idle']) {
      actions['idle'].reset().fadeIn(0.3).play();
      return () => actions['idle'].fadeOut(0.3);
    }
  }, [currentAction, actions]);

  // Adjust model orientation to face slightly towards the user
  return (
    <group ref={group} dispose={null} position={[0, -1.2, 0]} scale={1.2} rotation={targetRotation}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the model to prevent lag when it mounts
useGLTF.preload(`${import.meta.env.BASE_URL}assets/models/Xbot.glb`);

const RobotCompanion = () => {
  const { scrollYProgress } = useScroll();
  const [scrollState, setScrollState] = useState('Idle');
  
  // Transform scroll progress from 0-1 to 0%-100% of the track height
  const yPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    let timeout;
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If we are at the very top, treat as idle
      if (currentScrollY < 10) {
        setScrollState('Idle');
        lastScrollY = currentScrollY;
        return;
      }
      
      const isScrollingDown = currentScrollY > lastScrollY;
      const newState = isScrollingDown ? 'ScrollingDown' : 'ScrollingUp';
      
      // Update state if changed
      setScrollState((prev) => (prev !== newState ? newState : prev));
      lastScrollY = currentScrollY;
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrollState('Idle');
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="scroll-companion-container" style={{ width: '80px', left: '1%' }}>
      <div className="scroll-track">
        <motion.div 
          className="scroll-orb"
          style={{ 
            top: yPosition, 
            width: '80px', 
            height: '80px',
            background: 'transparent',
            boxShadow: 'none'
          }}
        >
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <Robot scrollState={scrollState} />
          </Canvas>
        </motion.div>
      </div>
    </div>
  );
};

export default RobotCompanion;
