import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiStar, 
  FiUsers, 
  FiZap, 
  FiSmartphone, 
  FiPlay
} from 'react-icons/fi';
import './NewHome.css';
import { Footer } from '../../Footer/Footer';

const NewHome: React.FC = () => {
  const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("_id");
const scrollToSection = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};



  const features = [
    {
      icon: <FiZap />,
      title: "Lightning Fast",
      description: "Create your bio page in minutes with our intuitive drag-and-drop builder"
    },
    {
      icon: <FiSmartphone />,
      title: "Mobile First",
      description: "All templates are optimized for mobile devices and look perfect on any screen"
    },
  
    {
      icon: <FiUsers />,
      title: "Social Integration",
      description: "Connect all your social media accounts and showcase them beautifully"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      image: "/assets/girlimage.jpg",
      text: "BioForge transformed my online presence. The templates are stunning and so easy to customize!"
    },
    {
      name: "Mike Chen",
      role: "Entrepreneur",
      image: "/assets/closeup-young-hispanic-man-casuals-studio.jpg",
      text: "Perfect for showcasing my business links. The analytics feature helps me understand my audience better."
    },
    {
      name: "Emma Davis",
      role: "Artist",
      image: "/assets/handsome-young-guy-with-glasses-posing.jpg",
      text: "As an artist, I needed something beautiful and unique. BioForge delivered exactly what I was looking for."
    }
  ];

  const navigateUser=()=>{
    if(isLoggedIn){
      navigate(`/dashboard/index/${userId}`)
    }else{
      navigate("/register")
    }
  }


  return (
    <>


      <div className="new-home">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background">
            {/* <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div> */}
          </div>
          
          <div className="container d-flex" >
            <div className="hero-content">
              <div className="hero-badge">
                <FiStar className="badge-icon" />
                <span>Trusted by 10,000+ creators</span>
              </div>
              
              <h1 className="hero-title">
                Create Your Perfect
                <span className="gradient-text"> Digital Identity</span>
              </h1>
              
              <p className="hero-subtitle">
                Build stunning bio pages that showcase your personality, connect your audience 
                to your content, and grow your online presence. No coding required.
              </p>
              
              <div className="hero-actions">
                <button 
                  className="btn btn-primary btn-large"
                     onClick={navigateUser}
                >
                  Get Started Free
                  <FiArrowRight className="btn-icon" />
                </button>
                
                <button 
                  className="btn newbtn-secondary btn-large"
                  onClick={() => navigate('/landingPage')}
                >
                  <FiPlay className="btn-icon" />
                  View Templates
                </button>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Templates</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="phone-mockup">
                <div className="phone-screen">
                  <div className="mockup-content">
                    <div className="mockup-avatar"></div>
                    <div className="mockup-name"></div>
                    <div className="mockup-bio"></div>
                    <div className="mockup-links">
                      <div className="mockup-link"></div>
                      <div className="mockup-link"></div>
                      <div className="mockup-link"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="scroll-indicator" onClick={() => scrollToSection('.features-section')}>
            <div className="scroll-arrow"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Why Choose BioForge?</h2>
              <p className="section-subtitle">
                Everything you need to create a professional online presence
              </p>
            </div>
            
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">How It Works</h2>
              <p className="section-subtitle">
                Get your bio page live in just 3 simple steps
              </p>
            </div>
            
            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Choose a Template</h3>
                  <p>Select from our collection of beautiful, professionally designed templates</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Customize Your Page</h3>
                  <p>Add your content, links, and personal branding with our easy-to-use editor</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Share Your Link</h3>
                  <p>Publish your bio page and share your unique link across all platforms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title newsection">What Our Users Say</h2>
              <p className="section-subtitle newsection">
                Join thousands of creators who trust BioForge
              </p>
            </div>
            
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <div className="testimonial-content">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} className="star-filled" />
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Build Your Digital Identity?</h2>
              <p className="cta-subtitle">
                Join thousands of creators who are already using BioForge to grow their online presence
              </p>
              <div className="cta-actions">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={navigateUser}
                >
                  Start Building Now
                  <FiArrowRight className="btn-icon" />
                </button>
                <button 
                style={{background:"#00000024",color:"black"}}
                  className="btn newbtn-secondary btn-large "
                  onClick={() => navigate('/landingPage')}
                >
                  Explore Templates
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer/>
      
      </div>
    </>
  );
};

export default NewHome;
