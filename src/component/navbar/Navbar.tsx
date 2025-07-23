import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { defaultConfig } from '../../config';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const profileImg = localStorage.getItem("profile_img")
    ? defaultConfig.imagePath + localStorage.getItem("profile_img")
    : "https://i.pravatar.cc/48";

  const userId = localStorage.getItem("_id");

  return (
    <nav className="navbar" style={{ backgroundColor: 'red', minHeight: '70px' }}>
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <span className="logo-text">BioForge</span>
          </div>
        </div>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          ☰
        </div>
        <div className={`navbar-links-container ${isMobileMenuOpen ? 'active' : ''}`}>
            <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/landingPage" className="navbar-link">Templates</Link>
            <Link to="/about" className="navbar-link">About</Link>
            </div>
          <div className="navbar-right">
            {
              !isLoggedIn ? (
                <><a href="/login" className="navbar-button">SignIn</a><a href="/register" className="navbar-button">Signup</a></>
              ) : (<div className="home-header-profile" onClick={() => navigate(`/dashboard/index/${userId}`)}>
                <img src={profileImg} alt="Profile" className="home-header-avatar" />
                <span className="home-header-name">Dashboard</span>
              </div>)
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
