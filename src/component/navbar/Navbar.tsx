import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar" style={{ backgroundColor: 'red', minHeight: '70px' }}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-left">
          <div className="navbar-logo">
            <span className="logo-text">BioForge</span>
          </div>
        </div>

        {/* Hamburger Menu Button */}
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <div className={`navbar-links-container ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            <a href="/" className="navbar-link">Home</a>
            <a href="/landingPage" className="navbar-link">Templates</a>
            <a href="/about" className="navbar-link">About</a>
          </div>
          <div className="navbar-right">
            <a href="/login" className="navbar-button">SignIn</a>
            <a href="/register" className="navbar-button">Signup</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
