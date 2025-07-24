import React from 'react'
import Navbar from '../../navbar/Navbar'
import { 
  FaRocket, 
  FaPalette, 
  FaMobile, 
  FaLink, 
  FaChartLine, 
  FaBolt,
  FaQuoteLeft,
  FaArrowDown,
  FaUsers,
  FaAward,
  FaHeart
} from 'react-icons/fa'
import './About.css'

const About: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className='about-page'>
        {/* Hero Section */}
        <section className='hero-section'>
          <div className='hero-background'>
            <div className='hero-particles'></div>
            <div className='hero-gradient'></div>
          </div>
          
          <div className='hero-container'>
            <div className='hero-content'>
              <div className='hero-text'>
                <div className='hero-badge'>
                  <FaRocket className='badge-icon' />
                  <span>Welcome to BioForge</span>
                </div>
                
                <h1 className='hero-title'>
                  Craft Your Digital
                  <span className='gradient-text'> Identity</span>
                  <br />
                  Like Never Before
                </h1>
                
                <p className='hero-subtitle'>
                  Transform your online presence with stunning, customizable bio pages. 
                  Join thousands of creators, professionals, and brands who trust BioForge 
                  to showcase their unique story to the world.
                </p>
                
                <div className='hero-stats'>
                  <div className='stat-card'>
                    <div className='stat-number'>50K+</div>
                    <div className='stat-label'>Active Users</div>
                  </div>
                  <div className='stat-card'>
                    <div className='stat-number'>100+</div>
                    <div className='stat-label'>Templates</div>
                  </div>
                  <div className='stat-card'>
                    <div className='stat-number'>99.9%</div>
                    <div className='stat-label'>Uptime</div>
                  </div>
                </div>
                
                <div className='hero-actions'>
                  <button className='cta-primary'>
                    <span>Get Started Free</span>
                    <FaArrowDown className='button-icon' />
                  </button>
                  <button className='cta-secondary'>
                    <span>Watch Demo</span>
                  </button>
                </div>
              </div>
              
              <div className='hero-visual'>
                <div className='hero-image-container'>
                  {/* <div className='floating-elements'>
                    <div className='floating-card card-1'>
                      <FaPalette className='card-icon' />
                      <span>Design</span>
                    </div>
                    <div className='floating-card card-2'>
                      <FaUsers className='card-icon' />
                      <span>Connect</span>
                    </div>
                    <div className='floating-card card-3'>
                      <FaChartLine className='card-icon' />
                      <span>Analyze</span>
                    </div>
                  </div> */}
                  
                  <div className='main-hero-image'>
                    <img
                      src='../../../../public/assets/vansh.png'
                      alt='BioForge Platform Preview'
                      className='hero-img'
                    />
                    <div className='image-glow'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className='scroll-indicator'>
            <div className='scroll-mouse'>
              <div className='scroll-wheel'></div>
            </div>
            <span className='scroll-text'>Scroll to explore</span>
          </div>
        </section>

        {/* Mission Section */}
        <section className='mission-section'>
          <div className='container'>
            <div className='section-header'>
              <div className='section-badge'>
                <FaHeart className='badge-icon' />
                <span>Our Mission</span>
              </div>
              <h2 className='section-title'>
                Empowering Digital <span className='highlight'>Storytelling</span>
              </h2>
              <p className='section-subtitle'>
                We believe every individual and brand has a unique story worth sharing. 
                Our mission is to provide the tools and platform to tell that story beautifully.
              </p>
            </div>

            <div className='mission-grid'>
              <div className='mission-content'>
                <div className='quote-section'>
                  <FaQuoteLeft className='quote-icon' />
                  <blockquote>
                    "In a world where first impressions matter more than ever, 
                    your digital presence should reflect the best version of yourself. 
                    BioForge makes that vision a reality."
                  </blockquote>
                  <cite>- BioForge Team</cite>
                </div>

                <div className='mission-values'>
                  <div className='value-item'>
                    <div className='value-icon'>
                      <FaRocket />
                    </div>
                    <div className='value-content'>
                      <h4>Innovation First</h4>
                      <p>We constantly push boundaries to bring you cutting-edge features.</p>
                    </div>
                  </div>
                  
                  <div className='value-item'>
                    <div className='value-icon'>
                      <FaUsers />
                    </div>
                    <div className='value-content'>
                      <h4>Community Driven</h4>
                      <p>Your feedback shapes our platform and drives our development.</p>
                    </div>
                  </div>
                  
                  <div className='value-item'>
                    <div className='value-icon'>
                      <FaAward />
                    </div>
                    <div className='value-content'>
                      <h4>Quality Assured</h4>
                      <p>Every template and feature is crafted with attention to detail.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mission-image'>
                <div className='image-wrapper'>
                  <img
                    src='/assets/about-illustration.png'
                    alt='Our Mission Illustration'
                  />
                  <div className='image-decoration'></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='features-section'>
          <div className='container'>
            <div className='section-header'>
              <div className='section-badge'>
                <FaBolt className='badge-icon' />
                <span>What We Offer</span>
              </div>
              <h2 className='section-title'>
                Everything You Need to <span className='highlight'>Succeed</span>
              </h2>
            </div>

            <div className='features-grid'>
              <div className='feature-card'>
                <div className='feature-icon'>
                  <FaPalette />
                </div>
                <h3>Beautiful Templates</h3>
                <p>Choose from our curated collection of stunning, professionally designed templates that adapt to your style.</p>
                <div className='feature-highlight'>100+ Designs</div>
              </div>

              <div className='feature-card'>
                <div className='feature-icon'>
                  <FaMobile />
                </div>
                <h3>Mobile Optimized</h3>
                <p>Every template is built mobile-first, ensuring your bio page looks perfect on any device or screen size.</p>
                <div className='feature-highlight'>100% Responsive</div>
              </div>

              <div className='feature-card'>
                <div className='feature-icon'>
                  <FaLink />
                </div>
                <h3>Smart Link Management</h3>
                <p>Organize and customize all your important links in one place with our intuitive link management system.</p>
                <div className='feature-highlight'>Unlimited Links</div>
              </div>

              <div className='feature-card'>
                <div className='feature-icon'>
                  <FaChartLine />
                </div>
                <h3>Advanced Analytics</h3>
                <p>Track your page performance with detailed insights, visitor analytics, and engagement metrics.</p>
                <div className='feature-highlight'>Real-time Data</div>
              </div>

              <div className='feature-card'>
                <div className='feature-icon'>
                  <FaBolt />
                </div>
                <h3>Lightning Fast</h3>
                <p>Optimized for speed and performance with global CDN delivery and SEO-friendly architecture.</p>
                <div className='feature-highlight'> 2s Load Time</div>
              </div>

              <div className='feature-card'>
                <div className='feature-icon'>
                  <FaRocket />
                </div>
                <h3>Easy Customization</h3>
                <p>Personalize every aspect of your bio page with our drag-and-drop editor and custom CSS support.</p>
                <div className='feature-highlight'>No Code Required</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className='team-section'>
          <div className='container'>
            <div className='section-header'>
              <div className='section-badge'>
                <FaUsers className='badge-icon' />
                <span>Meet Our Team</span>
              </div>
              <h2 className='section-title'>
                The Minds Behind <span className='highlight'>BioForge</span>
              </h2>
              <p className='section-subtitle'>
                A passionate team of designers, developers, and dreamers working together 
                to revolutionize how you present yourself online.
              </p>
            </div>

            <div className='team-grid'>
              <div className='team-member'>
                <div className='member-image'>
                  <img src='/assets/team-member-1.jpg' alt='John Doe' />
                  <div className='member-overlay'>
                    <div className='social-links'>
                      <a href='#' className='social-link'>LinkedIn</a>
                      <a href='#' className='social-link'>Twitter</a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3>John Doe</h3>
                  <p className='member-role'>Founder & CEO</p>
                  <p className='member-bio'>
                    Visionary leader with 10+ years in digital product development. 
                    Passionate about democratizing design.
                  </p>
                </div>
              </div>

              <div className='team-member'>
                <div className='member-image'>
                  <img src='/assets/team-member-2.jpg' alt='Jane Smith' />
                  <div className='member-overlay'>
                    <div className='social-links'>
                      <a href='#' className='social-link'>LinkedIn</a>
                      <a href='#' className='social-link'>Dribbble</a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3>Jane Smith</h3>
                  <p className='member-role'>Lead Designer</p>
                  <p className='member-bio'>
                    Award-winning designer who believes beautiful design should be 
                    accessible to everyone, everywhere.
                  </p>
                </div>
              </div>

              <div className='team-member'>
                <div className='member-image'>
                  <img src='/assets/team-member-3.jpg' alt='Mike Johnson' />
                  <div className='member-overlay'>
                    <div className='social-links'>
                      <a href='#' className='social-link'>LinkedIn</a>
                      <a href='#' className='social-link'>GitHub</a>
                    </div>
                  </div>
                </div>
                <div className='member-info'>
                  <h3>Mike Johnson</h3>
                  <p className='member-role'>Lead Developer</p>
                  <p className='member-bio'>
                    Full-stack engineer focused on performance, scalability, 
                    and creating seamless user experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='cta-section'>
          <div className='container'>
            <div className='cta-content'>
              <h2>Ready to Create Your Perfect Bio Page?</h2>
              <p>Join thousands of creators who've already transformed their digital presence with BioForge.</p>
              <div className='cta-actions'>
                <button className='cta-primary large'>
                  <span>Start Building Now</span>
                  <FaRocket className='button-icon' />
                </button>
                <button className='cta-secondary large'>
                  <span>Explore Templates</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default About