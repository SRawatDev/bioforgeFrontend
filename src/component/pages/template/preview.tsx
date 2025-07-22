import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const layouts = [
    {
      id: 1,
      title: "Classic Elegance",
      description: "Timeless design with sophisticated typography and clean layouts",
      template: "/src/component/pages/dashboard/template1.html",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: 2,
      title: "Modern Minimalist",
      description: "Clean lines and minimal design for a professional look",
      template: "/src/component/pages/dashboard/template2.html",
      color: "from-gray-600 to-gray-800"
    },
    {
      id: 3,
      title: "Creative Burst",
      description: "Vibrant colors and dynamic layouts for creative professionals",
      template: "/src/component/pages/dashboard/template3.html",
      color: "from-pink-500 to-orange-500"
    },
    {
      id: 4,
      title: "Nature Inspired",
      description: "Organic shapes and earth tones for a natural feel",
      template: "/src/component/pages/dashboard/template4.html",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 5,
      title: "Premium Glass",
      description: "Glassmorphism design with frosted glass effects",
      template: "/src/component/pages/dashboard/template5.html",
      color: "from-indigo-500 to-blue-600"
    },
    {
      id: 6,
      title: "Cyberpunk Neon",
      description: "Futuristic design with neon colors and tech aesthetics",
      template: "/src/component/pages/dashboard/template6.html",
      color: "from-cyan-400 to-purple-600"
    },
    {
      id: 7,
      title: "Retro Wave",
      description: "80s synthwave aesthetic with vibrant neon colors",
      template: "/src/component/pages/dashboard/template7.html",
      color: "from-pink-500 to-yellow-500"
    },
    {
      id: 8,
      title: "Soft Glassmorphism",
      description: "Subtle glass effects with soft colors and clean design",
      template: "/src/component/pages/dashboard/template8.html",
      color: "from-slate-400 to-slate-600"
    },
    {
      id: 9,
      title: "Dark Mode Pro",
      description: "Professional dark theme with accent colors",
      template: "/src/component/pages/dashboard/template9.html",
      color: "from-gray-800 to-black"
    },
    {
      id: 10,
      title: "Gradient Paradise",
      description: "Beautiful gradients and smooth transitions",
      template: "/src/component/pages/dashboard/template10.html",
      color: "from-purple-400 to-pink-400"
    }
  ];

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handlePreviewLayout = (layout: any) => {
    // Store selected layout in localStorage for preview
    localStorage.setItem('selectedLayout', JSON.stringify(layout));
    // Navigate to preview page
    navigate(`/preview/layout${layout.id}`);
  };

  const handleUseTemplate = (layout: any) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('accessToken');
    
    if (!isLoggedIn) {
      // Redirect to login with template selection
      localStorage.setItem('selectedTemplate', JSON.stringify(layout));
      navigate('/login');
    } else {
      // Navigate to dashboard with selected template
      localStorage.setItem('selectedTemplate', JSON.stringify(layout));
      navigate(`/dashboard/profile/${localStorage.getItem('_id')}?template=${layout.id}`);
    }
  };

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/assets/logo.png" alt="BioForge" height={40} />
              <span className="logo-text">BioForge</span>
            </div>
            <nav className="nav-links">
              <a href="#features">Features</a>
              <a href="#layouts">Layouts</a>
              <a href="#pricing">Pricing</a>
              <button className="btn-login" onClick={() => navigate('/login')}>
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Create Your Perfect
              <span className="gradient-text"> Bio Page</span>
            </h1>
            <p className="hero-description">
              Choose from 10 stunning layouts to create a personalized bio page that represents you. 
              Mobile-ready, customizable, and shareable with a unique public link.
            </p>
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started Free
            </button>
          </div>

          {/* Layout Cards Grid */}
          <div className="layouts-grid" id="layouts">
            {layouts.map((layout) => (
              <div 
                key={layout.id} 
                className="layout-card"
              >
                <div className="card-image">
                  <div className={`placeholder-image bg-gradient-to-br ${layout.color}`}>
                    <div className="phone-mockup">
                      <div className="phone-screen">
                        <div className="screen-content">
                          <div className="profile-circle"></div>
                          <div className="content-lines">
                            <div className="line long"></div>
                            <div className="line medium"></div>
                            <div className="line short"></div>
                          </div>
                          <div className="social-buttons">
                            <div className="social-btn"></div>
                            <div className="social-btn"></div>
                            <div className="social-btn"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-content">
                  <h3 className="card-title">{layout.title}</h3>
                  <p className="card-description">{layout.description}</p>
                  <div className="card-actions">
                    <button 
                      className="btn-preview"
                      onClick={() => handlePreviewLayout(layout)}
                    >
                      Preview
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="btn-use-template"
                      onClick={() => handleUseTemplate(layout)}
                    >
                      Use Template
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <img src="/assets/logo.png" alt="BioForge" height={30} />
                <span className="logo-text">BioForge</span>
              </div>
              <p className="footer-description">
                Create beautiful bio pages that represent your digital identity.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#layouts">Layouts</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#templates">Templates</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#privacy">Privacy</a></li>
                <li><a href="#terms">Terms</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Connect</h4>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 BioForge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
