import React, { useState } from 'react';
import './mentalwellness.css';
import FAQSectionWN from './faqSection';

const MentalWellnessComponent = ({ children }) => {
  const [activeQuestions, setActiveQuestions] = useState({});

  const toggleQuestion = (questionKey) => {
    setActiveQuestions(prev => ({
      ...prev,
      [questionKey]: !prev[questionKey]
    }));
  };

  const faqItems = [
    { key: 'counseling', question: 'What is counseling?' },
    { key: 'confidential', question: 'Will my sessions be confidential?' },
    { key: 'sessions', question: 'How many sessions will I have to attend?' },
    { key: 'refund', question: 'Can I get a refund?' }
  ];

  return (
    <div className="mental-wellness-page">
      <div className="wellness-banner">
      "Thousands have taken the first step. Don’t wait! start your healing journey today"
      </div>

      <div className="form-section">
        <div className="form-container">
          {children}
        </div>
      </div>

      {/* <div className="faq-section">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqItems.map((item) => (
            <div key={item.key} className="faq-item">
              <div 
                onClick={() => toggleQuestion(item.key)}
                className="faq-question"
              >
                <span>{item.question}</span>
                <ChevronDown 
                  className={`faq-icon ${
                    activeQuestions[item.key] ? 'rotate' : ''
                  }`} 
                />
              </div>
              {activeQuestions[item.key] && (
                <div className="faq-answer">
                  Placeholder answer for {item.question}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="faq-button-container">
          <button className="faq-button">
            Check out more FAQs
          </button>
        </div>
      </div> */}
    <center><h3>Frequently asked questions</h3></center>
    <FAQSectionWN />
   
    </div>
  );
};

export default MentalWellnessComponent;