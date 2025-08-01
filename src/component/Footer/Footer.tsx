import React from 'react'
import { Link } from 'react-router-dom'
export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>BioForge</h3>
            <p>Create your perfect digital identity</p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <Link to="/landingPage">Templates</Link>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/blog">Blog</Link>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <Link to="/help">Help Center</Link>
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 BioForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
