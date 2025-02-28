import React, { useRef, useState } from 'react';
import './expertCarousel.css';
import { Link } from 'react-router-dom';
import experts from '../experts/expert';

const Carousel = () => {
  const sliderTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse event handlers for drag scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(sliderTrackRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    
    // Calculate the distance moved
    const x = e.pageX;
    const delta = x - startX;
    
    // Apply the scroll - negative delta scrolls right, positive delta scrolls left
    sliderTrackRef.current.scrollLeft = scrollLeft - delta;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(sliderTrackRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    // Calculate the distance moved
    const x = e.touches[0].clientX;
    const delta = x - startX;
    
    // Apply the scroll
    sliderTrackRef.current.scrollLeft = scrollLeft - delta;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const duplicate_experts =[...experts ,...experts,...experts,...experts]

  return (
    <div className="expert-carousel">
      <center>
        <h1 className="experts-title">Meet Our Experts</h1>
      </center>
      
      <div 
        className="slider-container"
        ref={sliderTrackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="slider-track">
          {duplicate_experts.map((expert) => (
            <div className="slide" key={expert.id}>
              <Link to={`/expert/${expert.id}`} className="card-link">
             
              <div className="card">
                <div className="card-image">
                  <img src={expert.imageSrc} alt={`${expert.name}`} />
                </div>
                <div className="card-content">
                  <h2 className="card-title">{expert.name}</h2>
                  <p className="card-position">{expert.position}</p>
                  
                  {expert.certifications && (
                    <div className="card-certifications">
                      <span>Certifications:</span> {expert.certifications}
                    </div>
                  )}
                  
                  <div className="card-expertise">
                    <span>Areas of Expertise:</span> {expert.expertise}
                  </div>
                  
                  <div className="card-experience">
                    <span>Years of Experience:</span> {expert.experience}
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;