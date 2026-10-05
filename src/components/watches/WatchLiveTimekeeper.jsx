import React, { useState, useEffect, useRef } from 'react';
import './WatchLiveTimekeeper.css';

/**
 * Live Mechanical Timekeeper Simulator (3 Hz / 21,600 vph)
 * Synchronizes the watch hands to real local time with an authentic
 * 6-micro-steps-per-second mechanical sweep, and optional synthesized escapement audio.
 */
const WatchLiveTimekeeper = ({ watch }) => {
  const [timeState, setTimeState] = useState({
    hours: 10,
    minutes: 10,
    seconds: 0,
    secStep: 0,
    timeString: ''
  });
  const [isAudioTicking, setIsAudioTicking] = useState(false);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    let animId;

    const updateClock = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hr = now.getHours() % 12;

      // 6 discrete micro-beats per second (3 Hz / 21,600 vph)
      const microStep = Math.floor(ms / (1000 / 6));
      const fractionalSeconds = sec + microStep / 6;

      const secAngle = fractionalSeconds * 6; // 360 deg / 60 sec
      const minAngle = min * 6 + sec * 0.1;
      const hrAngle = hr * 30 + min * 0.5;

      setTimeState({
        hours: hrAngle,
        minutes: minAngle,
        seconds: secAngle,
        secStep: microStep,
        timeString: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });

      animId = requestAnimationFrame(updateClock);
    };

    animId = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Synthesize realistic subtle mechanical escapement pallet click (6 Hz)
  useEffect(() => {
    if (!isAudioTicking) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const tickInterval = 1000 / 6; // 6 beats per second (21,600 vph)
    let isHighTick = true;

    const intervalId = setInterval(() => {
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Alternate slightly between "tic" and "toc" frequencies
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isHighTick ? 2800 : 2300, ctx.currentTime);
      isHighTick = !isHighTick;

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.012);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.014);
    }, tickInterval);

    return () => {
      clearInterval(intervalId);
      if (ctx.state !== 'closed') {
        ctx.close().catch(() => {});
      }
    };
  }, [isAudioTicking]);

  return (
    <div className="live-timekeeper-bar">
      <div className="timekeeper-left">
        <span className="live-clock-dot"></span>
        <span className="live-clock-label">SYNCHRONIZED LOCAL TIME:</span>
        <strong className="live-clock-digital">{timeState.timeString}</strong>
        <span className="live-clock-vph">// 21,600 VPH (6 TICKS/SEC)</span>
      </div>

      <div className="timekeeper-right">
        <button
          type="button"
          className={`btn-escapement-sound ${isAudioTicking ? 'active' : ''}`}
          onClick={() => setIsAudioTicking(!isAudioTicking)}
          title="Synthesize 3 Hz Escapement Mechanical Acoustics"
        >
          <span className="sound-icon">{isAudioTicking ? '🔊' : '🔇'}</span>
          <span>{isAudioTicking ? 'Escapement Audio: Active' : 'Listen to 3 Hz Escapement'}</span>
        </button>
      </div>
    </div>
  );
};

export default WatchLiveTimekeeper;
