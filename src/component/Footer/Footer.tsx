import React from 'react'
import "./Footer.css"
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
              <a href="/landingPage">Templates</a>
              <a href="/features">Features</a>
              <a href="/pricing">Pricing</a>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/blog">Blog</a>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <a href="/help">Help Center</a>
              <a href="/privacy">Privacy</a>
              <a href="/terms">Terms</a>
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
