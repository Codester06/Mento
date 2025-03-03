import React, { useEffect, useRef } from 'react';
import image1 from '../../assets/images/11.png';
import image2 from '../../assets/images/12.png';
import image3 from '../../assets/images/expertesInfo.png';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      image: image1,
      heading: "Share Your Needs",
      description: "It all starts with a conversation—your conversation. Let us know what you're facing, whether it's managing stress, improving your mental health, or navigating tough relationships. This is your space to share, and we're here to listen. With the information you provide, we'll match you with an expert who truly understands your situation."
    },
    {
      id: 2,
      image: image2,
      heading: "Expert Match Made Easy",
      description: "It all starts with a conversation—your conversation. Let us know what you're facing, whether it's managing stress, improving your mental health, or navigating tough relationships. This is your space to share, and we're here to listen. With the information you provide, we'll match you with an expert who truly understands your situation."
    },
    {
      id: 3,
      image: image3,
      heading: "Confidential, Personalized Support",
      description: "When it's time for your session, you'll connect with your expert through a secure, confidential platform. Whether you prefer a video call or chat, your therapist will work with you one-on-one, offering tailored support based on your unique needs. Each session is designed to leave you feeling heard, empowered, and ready with practical strategies to navigate life's challenges"
    }
  ];

  // Add animation for elements when they come into view
  const textRefs = useRef([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Store current refs in a variable that will be captured in the closure
    const currentRefs = textRefs.current;
    
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Use the captured variable in the cleanup function
    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div>
      <div className="container-hiw">
        <h2 className="heading-xl">How it works</h2>
        
        {steps.map((step, index) => (
          <div key={index}>
            <div className="step-container">
              <div 
                className="text-container-hiw"
                ref={(el) => (textRefs.current[index] = el)}
              >
                <img className='img-hiw1' src={step.image} alt={`Step ${index + 1}`} />

                <div className="description-hiw">
                  <h2 className="heading-lg">{step.heading}</h2>
                  <p className="paragraph-piw">{step.description}</p>
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="hiw-arrow-container">
                <div className="hiw-arrow-wrapper">
                  <div className="hiw-arrow"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;