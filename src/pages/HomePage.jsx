import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import ResearchSection from '../components/sections/ResearchSection'
import CapabilitiesSection from '../components/sections/CapabilitiesSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import ExperienceSection from '../components/sections/ExperienceSection'
import PublicationsSection from '../components/sections/PublicationsSection'
import CertificationsSection from '../components/sections/CertificationsSection'
import ContactSection from '../components/sections/ContactSection'

const HomePage = () => {
  return (
    <>
      <div className="mobile-warning-banner">
        ⚠️ For the full interactive experience, please view this portfolio on a desktop or switch to "Desktop site" mode.
      </div>
      <div className="desktop-content">
        <Navbar />
        <main>
          <HeroSection />
          <ResearchSection />
          <ExperienceSection />
          <ProjectsSection />
          <PublicationsSection />
          <CapabilitiesSection />
          <CertificationsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default HomePage
