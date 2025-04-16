import React from 'react';
import './heading_contact.css';

const ContactSection = () => {
  return (
    
    <div className="contact-container">
        <div className='above-container-cu'>\
            
        </div>
      <div className="header-con">
        <h2 className="title-con">Have a question? <span className="highlight">Talk to us.</span></h2>
      </div>
      
      <div className="contact-grid">
        {/* Email Section */}
        <div className="contact-item">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="contact-heading">EMAIL US AT</h3>
          <p className="contact-primary"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@mento.in" target="_blank" rel="noopener noreferrer">
   connect@mento.in
    </a></p>
          <p className="contact-secondary">and we'll get back to you in 24 hours</p>
        </div>
        
        {/* Visit Section */}
        <div className="contact-item">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="contact-heading">VISIT US AT</h3>
          <p className="contact-primary">Mento, 502, GR Sankalpa, Kasavanahalli Road Bengaluru.</p>
          <p className="contact-primary">560035</p>
          <p className="contact-secondary">drop in between 10 AM - 8 PM on any weekday!</p>
        </div>
        
        {/* Call Section */}
        <div className="contact-item">
          <div className="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <h3 className="contact-heading">CALL US AT</h3>
          <p className="contact-primary"><a href="tel:+919120719120">
 +91 9120719120
  </a></p>
          <p className="contact-secondary">between 10 AM to 10 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;