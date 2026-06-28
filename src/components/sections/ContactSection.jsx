import React from 'react';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import './ContactSection.css';

const ContactSection = () => {
  const videoRef = useVideoAutoplay({ threshold: 0.5 });

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="section-title">Initiate Collaboration</h2>
        <p className="section-subtitle">Let's build the future of AI together.</p>
        
        <div className="contact-layout">
          <div className="contact-form-container terminal-window">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">bash - initiate_protocol.sh</div>
            </div>
            
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              const name = document.getElementById('name').value;
              const email = document.getElementById('email').value;
              const message = document.getElementById('message').value;
              
              const subject = encodeURIComponent(`Collaboration Inquiry from ${name || 'a visitor'}`);
              const body = encodeURIComponent(`Hi Rishav,\n\n${message}\n\nBest,\n${name}\n${email}`);
              
              window.location.href = `mailto:rishavsaigal@gmail.com?subject=${subject}&body=${body}`;
            }}>
              <div className="form-group terminal-group">
                <label htmlFor="name">
                  <span className="prompt-path">root@rishav-ai:~/collaborate#</span> <span className="prompt-cmd">set_name=</span>
                </label>
                <input type="text" id="name" placeholder='"John Doe"' autoComplete="off" />
              </div>
              
              <div className="form-group terminal-group">
                <label htmlFor="email">
                  <span className="prompt-path">root@rishav-ai:~/collaborate#</span> <span className="prompt-cmd">set_email=</span>
                </label>
                <input type="email" id="email" placeholder='"john@example.com"' autoComplete="off" />
              </div>
              
              <div className="form-group terminal-group">
                <label htmlFor="message">
                  <span className="prompt-path">root@rishav-ai:~/collaborate#</span> <span className="prompt-cmd">define_mission=</span>
                </label>
                <textarea id="message" rows="3" placeholder='"How can we collaborate?"'></textarea>
              </div>
              
              <button type="submit" className="submit-btn terminal-btn">[ ./TRANSMIT_PAYLOAD ]</button>
            </form>
          </div>

          <div className="contact-video-wrapper">
            <video 
              ref={videoRef}
              controls 
              playsInline
              muted
              className="contact-video"
              poster="/assets/contact-poster.webp"
            >
              {/* Serve 1080p for screens >= 768px */}
              <source src="/assets/videos/Section 9 - Contact - 1080p.mp4" media="(min-width: 768px)" type="video/mp4" />
              {/* Serve standard 720p for smaller screens */}
              <source src="/assets/videos/Section 9 - Contact.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
