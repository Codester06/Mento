import React, { useRef, useState } from "react";
import "./expertCarousel.css";

const Carousel = () => {
  const sliderTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const experts = [
    {
      id: 1,
      name: "Pratibha",
      position: "Counselor",
      imageSrc:
        "https://mento.in/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-09.40.10_0c45eba4.jpg",
      certifications:
        "One to one counseling, group counseling, couple counseling all dimensions of cases",
      expertise:
        "Depression, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "3-6 Years",
    },
    {
      id: 2,
      name: "Saniya",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/IMG_3241.jpg",
      certifications:
        "CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification, Choice theory and reality therapy",
      expertise:
        "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years",
    },
    {
      id: 3,
      name: "Pallavi Sengar",
      position: "Clinical Psychologist",
      imageSrc:
        "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.42.28_8251f87f.jpg",
      certifications:
        "RCI Registered, CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification, Child counseling",
      expertise:
        "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years",
    },
    {
      id: 4,
      name: "Chandan Raj",
      position: "Counselor",
      imageSrc:
        "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.44.20_21d439d0.jpg",
      certifications:
        "                                                                           ",
      expertise:
        "Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "3-6 Years",
    },
    {
      id: 5,
      name: "Sandali Saruparia",
      position: "Counselor",
      imageSrc:
        "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.42.55_ed161cba.jpg",
      certifications: "Mindfulness Therapy, Counseling and family therapy",
      expertise:
        "Depression, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years",
    },
    {
      id: 6,
      name: "Arjita Jain",
      position: "Counselor",
      imageSrc:
        "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.44.46_2d061c1e-1.jpg",
      certifications:
        "CBT Certification, ACT certification, Hypnotherapy certificate of level 1",
      expertise:
        "Anxiety Disorders, Depression, Stress Management, Relationship Counseling",
      experience: "1-3 Years",
    },
    {
      id: 7,
      name: "Aritri Ghosh",
      position: "Counselor",
      imageSrc:
        "https://mento.in/wp-content/uploads/2024/12/Screenshot_20241210-1431002.png",
      certifications:
        "CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification",
      expertise:
        "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years",
    },
  ];

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

  const duplicate_experts = [...experts, ...experts, ...experts, ...experts];

  return (
    <div className="expert-carousel">
      <center>
        <h1 className="experts-title">Meet Our Experts</h1>
      </center>
      <div className="ex-right">
        <svg
          className="svg-left-ex"
          xmlns="http://www.w3.org/2000/svg"
         fill="#020a17"
          height="800px"
          width="800px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 330 330"
        >
          <path
            id="XMLID_222_"
            d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"
          />
          
        </svg>
      </div>
      <div className="ex-left"><svg
          className="svg-right-ex"
          xmlns="http://www.w3.org/2000/svg"
          fill="#020a17"
          height="800px"
          width="800px"
          version="1.1"
          id="Layer_1"
          viewBox="0 0 330 330"
        >
          <path
            id="XMLID_222_"
            d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z"
          />
        </svg></div>
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

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
