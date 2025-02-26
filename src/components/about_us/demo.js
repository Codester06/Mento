import React, { useRef, useEffect, useState } from 'react';
import './demo.css';

const Carousel = () => {
  const sliderTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicate expert list for infinite scrolling
  const experts = [
    {
      id: 1,
      name: "Pratibha",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-09.40.10_0c45eba4.jpg",
      certifications: "One to one counseling, group counseling, couple counseling all dimensions of cases",
      expertise: "Depression, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "3-6 Years"
    },
    {
      id: 2,
      name: "Saniya",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/IMG_3241.jpg",
      certifications: "CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification, Choice theory and reality therapy",
      expertise: "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    },
    {
      id: 3,
      name: "Pallavi Sengar",
      position: "Clinical Psychologist",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.42.28_8251f87f.jpg",
      certifications: "RCI Registered, CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification, Child counseling",
      expertise: "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    }
  ];

  // Duplicate the list to allow infinite scroll effect
  const infiniteExperts = [...experts, ...experts];

  useEffect(() => {
    const slider = sliderTrackRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const maxScrollLeft = slider.scrollWidth / 2; // Halfway point

      if (slider.scrollLeft <= -100) {
        // Instead of stopping, we allow it to go further negative
        slider.scrollLeft = -100;
      } else if (slider.scrollLeft >= maxScrollLeft) {
        slider.scrollLeft = 1;
      }
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  // Mouse event handlers for drag scrolling
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(sliderTrackRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const delta = x - startX;
    sliderTrackRef.current.scrollLeft = scrollLeft - delta;
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

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
      >
        <div className="slider-track">
          {infiniteExperts.map((expert, index) => (
            <div className="slide" key={index}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
