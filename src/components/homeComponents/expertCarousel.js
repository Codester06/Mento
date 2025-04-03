import React, { useRef, useState, useEffect } from 'react';
import './expertCarousel.css';
import { Link } from 'react-router-dom';
import "./expertCarousel.css";
import { getDataBS } from '../../utils/awsService';

const Carousel = () => {
  const sliderTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch experts from database
  useEffect(() => {
    const fetchExperts = async () => {
      try {
        setLoading(true);
        
        // Using the getDataBS method
        const responseData = await getDataBS('/expert_table'); // For debugging
        
        // Extract experts data - adjusting to match the expected structure
        // This checks for both possible data structures
        if (responseData && responseData.data) {
          let expertData;
          
          // Check if data is nested under "data" key (like in IndividualResponse.js)
          if (responseData.data.data && Array.isArray(responseData.data.data)) {
            expertData = responseData.data.data;
          } 
          // Check if data is directly under the "data" key
          else if (Array.isArray(responseData.data)) {
            expertData = responseData.data;
          }
          else {
            throw new Error('Unexpected data format');
          }
          
          // Transform and normalize data
          const processedExperts = expertData.map(item => {
            // Check if expert data is nested under "expert" key or directly in the item
            const expert = item.expert || item;
            
            return {
              id: expert.id || null,
              originalId: expert.originalId || null,
              name: expert.name || 'Unnamed',
              position: expert.position || 'Counselor',
              imageSrc: expert.imageSrc || 'https://via.placeholder.com/400x400?text=No+Image',
              certifications: expert.certifications || '',
              expertise: expert.expertise || 'General Counseling',
              experience: expert.experience || 'Not specified',
              uploadedAt: expert.uploadedAt || new Date().toISOString()
            };
          });
          
          setExperts(processedExperts);
        } else {
          throw new Error('Received invalid experts data format');
        }
      } catch (err) {
        console.error('Error fetching experts:', err);
        setError('Failed to load experts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []); // Removed getDataBS from dependency array as it's not changing

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

  // Create duplicate experts to create an infinite scrolling effect
  const duplicate_experts = experts.length > 0 ? [...experts, ...experts, ...experts, ...experts] : [];

  if (loading) {
    return (
      <div className="expert-carousel" id="experts">
        <center>
          <h1 className="experts-title">Meet Our Experts</h1>
          <div className="loading-spinner">Loading experts...</div>
        </center>
      </div>
    );
  }

  if (error) {
    return (
      <div className="expert-carousel" id="experts">
        <center>
          <h1 className="experts-title">Meet Our Experts</h1>
          <div className="error-message">{error}</div>
        </center>
      </div>
    );
  }

  if (experts.length === 0) {
    return (
      <div className="expert-carousel" id="experts">
        <center>
          <h1 className="experts-title">Meet Our Experts</h1>
          <p>No experts available at the moment. Please check back later.</p>
        </center>
      </div>
    );
  }

  return (
    <div className="expert-carousel" id='experts'>
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
          {duplicate_experts.map((expert, index) => (
            <div className="slide" key={`${expert.id}-${index}`}>
              <Link to={`/expert/${expert.id}`} className="card-link">
                <div className="card">
                  <div className="card-image">
                    <img src={expert.imageSrc} alt={`${expert.name}`} />
                  </div>
                  <div className="card-content">
                    <h2 className="card-title">{expert.name}</h2>
                    <p className="card-position">{expert.position}</p>

                    {expert.certifications && expert.certifications.trim() !== '' && (
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
      <div className="scroll-instruction">
        <div className="scroll-arrows">
          <span className="arrow-left"></span>
          <span className="arrow-left"></span>
        </div>
        Scroll
        <div className="scroll-arrows">
          <span className="arrow-right"></span>
          <span className="arrow-right"></span>
        </div>
      </div>
    </div>
  );
};

export default Carousel;