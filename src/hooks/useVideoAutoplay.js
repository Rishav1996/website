import { useEffect, useRef } from 'react';

export const useVideoAutoplay = (options = { threshold: 0.5 }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Attempt to play unmuted
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              // Browser blocked unmuted autoplay. 
              // Fallback to muted autoplay so the video still plays on scroll.
              video.muted = true;
              video.play().catch(e => console.log("Autoplay entirely blocked:", e));
            });
          }
        } else {
          // Pause when out of view
          video.pause();
        }
      });
    }, options);

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold]);

  return videoRef;
};
