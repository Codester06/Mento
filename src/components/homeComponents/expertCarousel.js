import React, { useRef, } from 'react';
import './expertCarousel.css';

const ExpertCarousel = () => {

  const sliderTrackRef = useRef(null);


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
    },
    {
      id: 4,
      name: "Chandan Raj",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.44.20_21d439d0.jpg",
      certifications: "",
      expertise: "Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "3-6 Years"
    },
    {
      id: 5,
      name: "Sandali Saruparia",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.42.55_ed161cba.jpg",
      certifications: "Mindfulness Therapy, Counseling and family therapy",
      expertise: "Depression, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    },
    {
      id: 6,
      name: "Arjita Jain",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.44.46_2d061c1e-1.jpg",
      certifications: "CBT Certification, ACT certification, Hypnotherapy certificate of level 1",
      expertise: "Anxiety Disorders, Depression, Stress Management, Relationship Counseling",
      experience: "1-3 Years"
    },
    {
      id: 7,
      name: "Aritri Ghosh",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/12/Screenshot_20241210-1431002.png",
      certifications: "CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification",
      expertise: "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    }
  ];

  // Double the experts array to allow for endless loop
  const duplicatedExperts = [...experts, ...experts, ...experts];

  return (
    <div className="expert-carousel">
      <center>
        <h1 className="experts-title">Meet Our Experts</h1>
      </center>
      
    
      
      <div className="slider-container">
        <div className="slider-track" ref={sliderTrackRef}>
          {duplicatedExperts.map((expert, index) => (
            <div className="slide" key={`${expert.id}-${index}`}>
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

export default ExpertCarousel;