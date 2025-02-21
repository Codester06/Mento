import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="top-section">
          <div className="logo">
            <img className="footer_img" src="https://mento.in/wp-content/uploads/2024/11/text.png" alt="Mento Logo" />
          </div>
         
          {/* <div className="social-links">
            <a href="/" className="social-icon">
              <svg viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="/" className="social-icon">
              <svg viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="/" className="social-icon">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div> */}
        </div>

        <div className="nav-links">
          <div className="nav-section">
            <h3>Services</h3>
            <ul>
              <li><a href="/counseling">Online Counseling</a></li>
              <li><a href="/therapy">Therapy Sessions</a></li>
              <li><a href="/workshops">Connect to us</a></li>
              <li><a href="/gift">Gift a Therapy</a></li>
            </ul>
          </div>
          <div className="nav-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="/blog">Mental Health Blog</a></li>
              <li><a href="/articles">Wellness Articles</a></li>
              <li><a href="/tools">Self-Help Tools</a></li>
              <li><a href="/faq">FAQs</a></li>
            </ul>
          </div>
          <div className="nav-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>Email: contact@mento.com</p>
            </div>
          </div>
          <div className="nav-section">
            <h3>About Us</h3>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="/team">Our Team</a></li>
              <li><a href="/testimonials">Testimonials</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="bottom-section">
          <div className="copyright">
            Copyright © 2025 Mento. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
