import React, { useState, useEffect } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.querySelector('.footer');
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${isVisible ? 'footer-visible' : ''}`}>
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Section */}
          <div className="footer-company footer-animate">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                ✌
              </div>
              <div className="footer-logo-text">
                bioforge
              </div>
            </div>
            <p className="footer-description">
              Discover and create stunning visual experiences with our curated collection 
              of premium images, graphics, and design resources. Join thousands of creators 
              who trust bioforge for their creative projects.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link facebook" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link instagram" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="social-link github" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section footer-animate">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#featured">Featured</a></li>
              <li><a href="#trending">Trending</a></li>
              <li><a href="#new">New Arrivals</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section footer-animate">
            <h3>Categories</h3>
            <ul>
              <li><a href="#nature">Nature</a></li>
              <li><a href="#technology">Technology</a></li>
              <li><a href="#abstract">Abstract</a></li>
              <li><a href="#architecture">Architecture</a></li>
              <li><a href="#portraits">Portraits</a></li>
              <li><a href="#landscapes">Landscapes</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section footer-animate">
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#tutorials">Tutorials</a></li>
              <li><a href="#community">Community</a></li>
              <li><a href="#feedback">Feedback</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter footer-animate">
            <h3>Stay Updated</h3>
            <p className="newsletter-description">
              Subscribe to our newsletter and never miss the latest collections, 
              exclusive content, and special offers.
            </p>
            <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe Now
                <span className="btn-icon">✨</span>
              </button>
            </form>
            {isSubscribed && (
              <div className="newsletter-success show">
                🎉 Successfully subscribed! Welcome to bioforge community.
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} bioforge. All rights reserved. Made with ❤️ for creators worldwide.
          </p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
            <a href="#licenses">Licenses</a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </footer>
  );
};

export default Footer;
