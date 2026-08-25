import React, { useRef, useEffect } from 'react';
import anime from '../../utils/anime';
import './AnimeMagnetic.css';

const AnimeMagnetic = ({ children, strength = 0.35, className = '' }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    let currentAnim = null;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * strength;
      const y = (clientY - (top + height / 2)) * strength;

      if (currentAnim) currentAnim.pause();

      currentAnim = anime({
        targets: el,
        translateX: x,
        translateY: y,
        duration: 400,
        easing: 'easeOutQuad',
      });
    };

    const handleMouseLeave = () => {
      if (currentAnim) currentAnim.pause();

      currentAnim = anime({
        targets: el,
        translateX: 0,
        translateY: 0,
        duration: 800,
        easing: 'easeOutElastic(1, .5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (currentAnim) currentAnim.pause();
    };
  }, [strength]);

  return (
    <div ref={elementRef} className={`anime-magnetic-wrapper ${className}`}>
      {children}
    </div>
  );
};

export default AnimeMagnetic;
