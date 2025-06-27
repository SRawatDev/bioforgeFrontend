import React from 'react'
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoYoutube,
  IoLogoFacebook
} from 'react-icons/io5';
export const HomeFooter: React.FC = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img
                src="https://i.postimg.cc/x87tV35B/logo.png"
                alt="Funel logo"
              />
            </a>
            <p className="footer-text">Follow us on</p>
            <ul className="social-list">
              <li>
                <a
                  href="https://github.com/codewithsadee"
                  className="social-link"
                >
                  <IoLogoGithub size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/codewithsadee"
                  className="social-link"
                >
                  <IoLogoInstagram size={24} />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/c/codewithsadee"
                  className="social-link"
                >
                  <IoLogoYoutube size={24} />
                </a>
              </li>
              <li>
                <a href="#" className="social-link">
                  <IoLogoFacebook size={24} />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link-box">
            <ul className="footer-link-list">
              <li>
                <h3 className="h4 link-title">Company</h3>
              </li>
              <li>
                <a href="#" className="footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Pricing
                </a>
              </li>
            </ul>
            <ul className="footer-link-list">
              <li>
                <h3 className="h4 link-title">Products</h3>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Contact
                </a>
              </li>
            </ul>
            <ul className="footer-link-list">
              <li>
                <h3 className="h4 link-title">Resources</h3>
              </li>
              <li>
                <a href="#" className="footer-link">
                  FAQ's
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Testimonial
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
            <ul className="footer-link-list">
              <li>
                <h3 className="h4 link-title">Relevant</h3>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Why
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Customers
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">© 2024 ULTRA CODE All rights reserved</p>
      </div>
    </footer>
  )
}
