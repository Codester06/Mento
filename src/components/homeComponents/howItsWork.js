import React, { useEffect } from "react";
import "./HowItWorks.css";

const steps = [
  {
    title: "Share Your Needs",
    description:
      "It all starts with a conversation—your conversation. Let us know what you're facing, whether it's managing stress, improving your mental health, or navigating tough relationships. This is your space to share, and we're here to listen. With the information you provide, we'll match you with an expert who truly understands your situation.",
    image: "https://mento.in/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-20-at-18.35.36_6946e4c9.jpg",
  },
  {
    title: "Expert Match Made Easy",
    description:
      "Next, we'll introduce you to one of our licensed mental health professionals. The best part? You pick the time that works for you—no waiting for weeks or trying to fit into rigid schedules. We make it easy to schedule a session whenever you're ready to take the next step toward healing.",
    image: "https://mento.in/wp-content/uploads/2025/01/expertesInfo.png",
  },
  {
    title: "Confidential, Personalized Support",
    description:
      "When it's time for your session, you'll connect with your expert through a secure, confidential platform. Whether you prefer a video call or chat, your therapist will work with you one-on-one, offering tailored support based on your unique needs. Each session is designed to leave you feeling heard, empowered, and ready with practical strategies to navigate life's challenges.",
    image: "https://mento.in/wp-content/uploads/2025/01/confi.png",
  },
];

const HowItWorks = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px",
      }
    );

    document.querySelectorAll(".hiw-step").forEach((step) => {
      observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    


    <div className="hiw-container">
      <div className="hiw-main-wrapper">
        <h1 className="hiw-title">How It Works</h1>
        {steps.map((step, index) => (
          <div key={index}>
            <div className="hiw-step">
              <div className="hiw-step-image">
                <img src={step.image} alt={step.title} />
              </div>
              <div className="hiw-step-content">
                <h2 className="hiw-step-title">{step.title}</h2>
                <p className="hiw-step-description">{step.description}</p>
              </div>
            </div>

            {index !== steps.length - 1 && (
              <div className="hiw-arrow-container">
                <div className="hiw-arrow-wrapper">
                  <div className="hiw-arrow"></div>
                  <div className="hiw-arrow-shadow"></div>
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
