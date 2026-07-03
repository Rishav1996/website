import { useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

export const useVideoAutoplay = (options = { threshold: 0.5 }) => {
  const videoRef = useRef(null);
  const { isMuted } = useAudio() || {};
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          isIntersectingRef.current = true;
          // Attempt to play unmuted
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((_error) => {
              // Browser blocked unmuted autoplay. 
              // Fallback to muted autoplay so the video still plays on scroll.
              video.muted = true;
              video.play().catch(e => console.log("Autoplay entirely blocked:", e));
            });
          }
        } else {
          isIntersectingRef.current = false;
          video.pause();
        }
      });
    }, options);

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.threshold]);

  // Handle first user interaction to unmute if isMuted is false (unmuted by default)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFirstInteraction = () => {
      if (!isMuted && video.muted && isIntersectingRef.current) {
        video.muted = false;
        video.play().catch(e => console.log("Failed to play unmuted after interaction:", e));
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    if (!isMuted) {
      window.addEventListener('click', handleFirstInteraction);
      window.addEventListener('touchstart', handleFirstInteraction);
      window.addEventListener('keydown', handleFirstInteraction);
    }

    return cleanup;
  }, [isMuted]);

  return videoRef;
};
