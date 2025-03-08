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
              <li><a href="/counseling">Home</a></li>
              <li><a href="/therapy">About us</a></li>
              <li><a href="/contact">Connect to us</a></li>
              <li><a href="/mental-wellness">Get a Therapy</a></li>
            </ul>
          </div>
          <div className="nav-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/tools">Self-Help Tools</a></li>
              <li><a href="/faqs">FAQs</a></li>
            </ul>
          </div>
          <div className="nav-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>contact@mento.com</p>
            </div>
          </div>
          <div className="nav-section">
            <h3>Others</h3>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="#experts">Our Team</a></li>
            </ul>
          </div>
        </div>

        <div className="bottom-section">
          <div className="copyright">
            Copyright © 2025 Mento. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="/Cookies-Privacy-Policy">Privacy Policy</a>
            <a href="/terms-conditions">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
