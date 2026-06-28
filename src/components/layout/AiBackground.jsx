import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const AiBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    // loadSlim is lighter and faster than loadFull, it contains all the basic features
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // Push it behind everything
        },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // subtle grab effect
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.15,
              },
            },
          },
        },
        particles: {
          color: {
            value: "#58a6ff", // GitHub blue-ish tint to match your dark theme
          },
          links: {
            color: "#8b949e",
            distance: 150,
            enable: true,
            opacity: 0.1, // Very subtle lines
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8, // Very slow and soothing
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 40, // Low density so it's not distracting
          },
          opacity: {
            value: 0.2, // Subtle dots
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default AiBackground;
