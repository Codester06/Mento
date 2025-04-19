import React from 'react';
import './SocialMedia.css'; // Import your CSS file
import instaIcon from '../../../assets/images/socialIcons/instagram.png'
import LinkIcon from '../../../assets/images/socialIcons/linkedin.png'
import facebookIcon from '../../../assets/images/socialIcons/facebook.png'
import wpIcon from '../../../assets/images/socialIcons/wpLogo.png'


const SocialMediaLayout = () => {
  // Social media URLs
  const socialLinks = {
    instagram: "https://www.instagram.com/mento.in/",
    whatsapp: "https://wa.me/+919120719120",
    linkedin: "https://www.linkedin.com/company/connectmento/",
    facebook: "https://www.facebook.com/profile.php?id=61566015786803&rdid=oI04F87TMbtHmXL5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EjHzVoh32%2F#"
  };

  // Function to handle click and redirect
  const handleRedirect = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="social-container">
      <h1 className="social-title">Social Handels</h1>
      <div className="social-buttons">
        <div 
          className="social-button" 
          onClick={() => handleRedirect(socialLinks.instagram)}
          aria-label="Visit Instagram"
        >
          <img 
            src={instaIcon} 
            alt="Instagram" 
            className="social-icon"
          />
        </div>
        <div 
          className="social-button" 
          onClick={() => handleRedirect(socialLinks.whatsapp)}
          aria-label="Open WhatsApp"
        >
          <img 
            src={wpIcon} 
            alt="WhatsApp" 
            className="social-icon"
          />
        </div>
        <div 
          className="social-button" 
          onClick={() => handleRedirect(socialLinks.linkedin)}
          aria-label="Visit LinkedIn"
        >
          <img 
            src={LinkIcon} 
            alt="LinkedIn" 
            className="social-icon"
          />
        </div>
        <div 
          className="social-button" 
          onClick={() => handleRedirect(socialLinks.facebook)}
          aria-label="Visit Facebook"
        >
          <img 
            src={facebookIcon} 
            alt="Facebook" 
            className="social-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLayout;