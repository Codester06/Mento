import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="containerFooter">
        <div className="top-section">
          <div className="logo">
            <img className="footer_img" src="https://mento.in/wp-content/uploads/2024/11/text.png" alt="Mento Logo" />
          </div>
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
