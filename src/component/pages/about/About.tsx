import React from 'react'
import Navbar from '../../navbar/Navbar'
import './About.css'
const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='about-page'>
        <section className='about-hero'>
          <div className='container'>
            <div className='about-hero-content'>
              <h1 className='about-title'>
                About <span className='gradient-text'>BioForge</span>
              </h1>
              <p className='about-subtitle'>
                Empowering creators to build beautiful, personalized bio pages
                that showcase their digital identity.
              </p>
            </div>
          </div>
        </section>

        <section className='about-content'>
          <div className='container'>
            <div className='about-grid'>
              <div className='about-text'>
                <h2>Our Mission</h2>
                <p>
                  At BioForge, we believe everyone deserves a beautiful digital
                  presence. Our platform makes it easy for creators,
                  professionals, and brands to design stunning bio pages that
                  truly represent who they are.
                </p>

                <h3>What We Offer</h3>
                <ul className='feature-list'>
                  <li>🎨 Beautiful, customizable templates</li>
                  <li>📱 Mobile-first responsive design</li>
                  <li>🔗 Easy link management</li>
                  <li>📊 Analytics and insights</li>
                  <li>⚡ Fast loading and SEO optimized</li>
                </ul>
              </div>

              <div className='about-image'>
                <img
                  src='/assets/about-illustration.png'
                  alt='About BioForge'
                />
              </div>
            </div>
          </div>
        </section>

        <section className='team-section'>
          <div className='container'>
            <h2 className='section-title'>Our Team</h2>
            <div className='team-grid'>
              <div className='team-member'>
                <div className='member-image'>
                  <img src='/assets/team-member-1.jpg' alt='Team Member' />
                </div>
                <h3>John Doe</h3>
                <p>Founder & CEO</p>
              </div>

              <div className='team-member'>
                <div className='member-image'>
                  <img src='/assets/team-member-2.jpg' alt='Team Member' />
                </div>
                <h3>Jane Smith</h3>
                <p>Lead Designer</p>
              </div>

              <div className='team-member'>
                <div className='member-image'>
                  <img src='/assets/team-member-3.jpg' alt='Team Member' />
                </div>
                <h3>Mike Johnson</h3>
                <p>Lead Developer</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
