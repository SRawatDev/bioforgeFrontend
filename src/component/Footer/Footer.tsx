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
              <Link to="/">Templates</Link>
              <Link to="/">Features</Link>
              <Link to="/">Pricing</Link>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <Link to="/">About</Link>
              <Link to="/">Contact</Link>
              <Link to="/">Blog</Link>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <Link to="/">Help Center</Link>
              <Link to="/">Privacy</Link>
              <Link to="/">Terms</Link>
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
