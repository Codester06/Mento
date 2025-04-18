import React, { useState, useEffect } from 'react';
import './selfSide.css';

import depressionIcon from '../../../assets/images/blogsIcons/depressionTest.png';
import anxietyIcon from '../../../assets/images/blogsIcons/anxiety.png';
import healthIcon from '../../../assets/images/blogsIcons/schizophrenia.png';
import { Link } from 'react-router-dom';


export default function BlogSidebar() {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  // Icons array with imported image files
  const icons = [
    { id: 'clock', src: depressionIcon, alt: 'depressionIcon' },
    { id: 'tasks', src: anxietyIcon, alt: 'anxietyIcon' },
    { id: 'archive', src: healthIcon, alt: 'Archive Icon' },
  ];

  // Effect for icon slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000); // Change icon every 2 seconds
    
    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <Link to="/Self-Assessment-Tool">
    <div className="sidebar-container">
      <div className="sidebar-inner">
        {/* Self Assignment Tools Section */}
        <div className="tool-section">
          <h3 className="description-title">SELF ASSIGNMENT TOOLS</h3>
        </div>
        
        {/* Icons Section */}
        <div className="icon-section">
          <div className="icon-slideshow">
            {icons.map((icon, index) => (
              <div 
                key={icon.id} 
                className={`iconSelf ${index === currentIconIndex ? 'active' : ''}`}
              >
                <img 
                  src={icon.src} 
                  alt={icon.alt} 
                  className="icon-img" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}