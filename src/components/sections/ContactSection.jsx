import React, { useState } from 'react';
import { useAudio } from '../../context/AudioContext';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import './ContactSection.css';

const PRESETS = [
  { label: "💼 Full-Time Enterprise Role", text: "We are interested in discussing a Full-Time AI Architect / Engineering Lead opportunity." },
  { label: "🤝 AI Advisory / Consulting", text: "We would like to consult with you on our Agentic AI & Time-Series architecture." },
  { label: "🎙️ Speaking / Keynote", text: "We would like to invite you as a speaker/panelist to discuss LLMs & Agentic AI." }
];

const ContactSection = () => {
  const videoRef = useVideoAutoplay({ threshold: 0.5 });
  const { isMuted } = useAudio();
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [message, setMessage] = useState(PRESETS[0].text);

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="section-header-center">
          <span className="section-tag-badge">DIRECT COMMUNICATION PROTOCOL</span>
          <h2 className="section-title">Initiate Collaboration</h2>
          <p className="section-subtitle">Reach out for enterprise AI architecture consultation, advisory roles, or speaking engagements.</p>
        </div>

        {/* 1-Click Recruiter Intent Selector */}
        <div className="recruiter-intent-pills">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              className={`intent-pill ${selectedPreset === idx ? 'active' : ''}`}
              onClick={() => {
                setSelectedPreset(idx);
                setMessage(preset.text);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>
        
        <div className="contact-layout">
          <div className="contact-form-container terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">bash - initiate_collaboration_protocol.sh</div>
              <span className="terminal-ready-pill">READY</span>
            </div>
            
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              const name = document.getElementById('name').value;
              const email = document.getElementById('email').value;
              
              const subject = encodeURIComponent(`Inquiry from ${name || 'a recruiter / partner'}`);
              const body = encodeURIComponent(`Hi Rishav,\n\n${message}\n\nBest,\n${name}\n${email}`);
              
              window.location.href = `mailto:rishavsaigal@gmail.com?subject=${subject}&body=${body}`;
            }}>
              <div className="form-group terminal-group">
                <label htmlFor="name">
                  <span className="prompt-path">root@rishav-ai:~/collaborate#</span> <span className="prompt-cmd">export SENDER_NAME=</span>
                </label>
                <input type="text" id="name" placeholder='"John Doe"' autoComplete="off" />
              </div>
              
              <div className="form-group terminal-group">
                <label htmlFor="email">
                  <span className="prompt-path">root@rishav-ai:~/collaborate#</span> <span className="prompt-cmd">export SENDER_EMAIL=</span>
                </label>
                <input type="email" id="email" placeholder='"john@example.com"' autoComplete="off" />
              </div>
              
              <div className="form-group terminal-group">
                <label htmlFor="message">
                  <span className="prompt-path">root@rishav-ai:~/collaborate#</span> <span className="prompt-cmd">export MISSION_BRIEF=</span>
                </label>
                <textarea 
                  id="message" 
                  rows="3" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='"How can we collaborate on Agentic AI / Architecture?"'
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn terminal-btn">
                <span>[ ./TRANSMIT_PAYLOAD_TO_RISHAV ]</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </form>
          </div>

          <div className="contact-video-wrapper">
            <video 
              ref={videoRef}
              playsInline
              muted={isMuted}
              className="contact-video"
              poster={`${import.meta.env.BASE_URL}assets/contact-poster.webp`}
            >
              {/* Serve 1080p for screens >= 768px */}
              <source src={`${import.meta.env.BASE_URL}assets/videos/Section 9 - Contact - 1080p.mp4`} media="(min-width: 768px)" type="video/mp4" />
              {/* Serve standard 720p for smaller screens */}
              <source src={`${import.meta.env.BASE_URL}assets/videos/Section 9 - Contact.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
