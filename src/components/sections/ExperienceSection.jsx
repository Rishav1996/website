import React from 'react';
import { useVideoAutoplay } from '../../hooks/useVideoAutoplay';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const videoRef = useVideoAutoplay({ threshold: 0.5 });

  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        <h2 className="section-title">Enterprise Experience</h2>
        
        <div className="experience-layout">
          <div className="experience-video-wrapper">
            <video 
              ref={videoRef}
              controls 
              playsInline
              muted
              className="experience-video"
              poster="/assets/experience-poster.webp"
            >
              {/* Serve 1080p for screens >= 768px */}
              <source src="/assets/videos/Section 6 - Experience Timeline 1080p.mp4" media="(min-width: 768px)" type="video/mp4" />
              {/* Serve standard 720p for smaller screens */}
              <source src="/assets/videos/Section 6 - Experience Timeline.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>Cognizant</h3>
              <span className="role">Senior Associate (Senior Data Scientist / AI Architect) | Nov 2023 – Present</span>
              
              <div className="experience-details glass-card">
                <div className="detail-group">
                  <h4>Roles & Responsibilities</h4>
                  <ul>
                    <li><strong>Solution Architect & Agentic AI Lead:</strong> Spearheaded end-to-end architectural design of enterprise-grade Generative AI and Agentic AI systems on complex GCP infrastructure.</li>
                    <li><strong>Team Leadership & Architectural Direction:</strong> Led and mentored a cross-functional team of ML/GenAI engineers; defined architectural standards and drove Agile sprint planning.</li>
                    <li><strong>Client Deliverable Management:</strong> Owned end-to-end delivery from requirement workshops through production handoff and stakeholder-facing POC demonstrations.</li>
                  </ul>
                </div>
                <div className="detail-group">
                  <h4>Skills & Technologies Acquired</h4>
                  <div className="skills-tags">
                    <span>GCP Vertex AI</span><span>Gemini Enterprise</span><span>Google ADK</span>
                    <span>LangGraph</span><span>CrewAI</span><span>LangChain</span>
                    <span>FastAPI</span><span>Streamlit</span><span>Azure ML</span><span>MLflow</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>Genpact</h3>
              <span className="role">Assistant Manager | Jun 2022 – Nov 2023</span>
              
              <div className="experience-details glass-card">
                <div className="detail-group">
                  <h4>Roles & Responsibilities</h4>
                  <ul>
                    <li><strong>Team Leadership & ML Architecture:</strong> Managed a cross-functional team of 6 ML engineers; led Agile architecture reviews and end-to-end MLOps solution deployment.</li>
                    <li><strong>Stakeholder Delivery:</strong> Served as primary technical point-of-contact for executive stakeholder demos and quarterly business reviews.</li>
                    <li><strong>Responsible AI Governance:</strong> Translated complex business requirements into scalable ML specifications; upskilled client teams on model interpretability and proactive model monitoring.</li>
                  </ul>
                </div>
                <div className="detail-group">
                  <h4>Skills & Technologies Acquired</h4>
                  <div className="skills-tags">
                    <span>Scikit-Learn</span><span>DataRobot</span><span>Azure ML</span>
                    <span>Causal Inference</span><span>Customer Segmentation</span><span>SHAP (XAI)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <h3>Capgemini</h3>
              <span className="role">Consultant | Apr 2018 – Jun 2022</span>
              
              <div className="experience-details glass-card">
                <div className="detail-group">
                  <h4>Roles & Responsibilities</h4>
                  <ul>
                    <li><strong>Technical Lead & Full-Lifecycle Delivery:</strong> Led cross-functional teams of up to 15 members across supply chain, manufacturing, and service analytics.</li>
                    <li><strong>End-to-End ML Delivery:</strong> Owned the complete ML lifecycle—from Agile requirement gathering through CI/CD-driven production deployment on cloud infrastructure.</li>
                  </ul>
                </div>
                <div className="detail-group">
                  <h4>Skills & Technologies Acquired</h4>
                  <div className="skills-tags">
                    <span>PySpark</span><span>TensorFlow</span><span>Keras</span>
                    <span>AWS SageMaker</span><span>XGBoost</span><span>Cox Proportional Hazard</span>
                    <span>OpenCV</span><span>LSTM</span><span>MLP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
