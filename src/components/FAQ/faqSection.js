import React, { useState } from 'react';
import './FaqSection.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="faq-item">
      <div 
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg 
          className={`chevron ${isOpen ? 'active' : ''}`}
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9L12 15L18 9" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={`faq-answer ${isOpen ? 'active' : ''}`}>
        {answer}
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqData = [
    {
      question: "What is Mento?",
      answer: "Mento is a mental wellness platform that connects you with certified psychologists to help manage stress, anxiety, relationship issues, and more. We provide a safe, confidential space to support your mental well-being."
    },
    {
      question: "How does Mento work?",
      answer: "It’s simple! Share your needs with us, get matched with a licensed expert, and schedule sessions at a time that works for you. Everything happens securely through our confidential platform."
    },
    {
      question: "Who are the experts at Mento?",
      answer: "All Mento professionals are licensed and certified psychologists with extensive experience in mental health. We carefully vet each expert to ensure you receive the highest quality care."
    },
    {
      question: "Is my information safe with Mento?",
      answer: "Yes, your privacy is our top priority. All your information and sessions are securely encrypted, and we never interfere in your conversations with your therapist."
    },
    {
      question: "Will anyone know I’m using Mento?",
      answer: "No, your sessions and personal details are completely confidential. Only you and your therapist have access to your sessions."
    },
    {
      question: "What issues can Mento help with?",
      answer: "Mento supports a wide range of mental wellness needs, including anxiety, stress, depression, burnout, and relationship challenges."
    },
    {
      question: "Is therapy only available online?",
      answer: "Yes, Mento offers online therapy sessions through secure video calls or chats, providing flexibility and convenience wherever you are."
    },
    {
      question: "Can I choose my therapist?",
      answer: "Yes! While we’ll recommend an expert based on your needs, you’re free to select the therapist you feel most comfortable with."
    },
    {
      question: "How do I book a session?",
      answer: "Simply fill out the form on our website, and we’ll guide you through the process of scheduling your first session with an expert."
    },
    {
      question: "What are your availability and timings?",
      answer: "Mento offers flexible scheduling, including early mornings, late evenings, and weekends, so you can book sessions at times that suit your routine."
    },
    {
      question: "Can I reschedule or cancel my session?",
      answer: "Yes, you can reschedule or cancel a session by contacting us in advance. Please refer to our cancellation policy for more details."
    },
    {
      question: "How much does a session cost?",
      answer: "Our session fees vary depending on the therapist and duration. Please check our pricing page or contact us for more details."
    },
    {
      question: "Are there any free consultations?",
      answer: "We occasionally offer introductory consultations or discounts. Keep an eye on our website or social media for updates!"
    },
    {
      question: "Do I need a diagnosis to use Mento?",
      answer: "No diagnosis is needed to begin. Whether you have a specific concern or just want to talk, we’re here for you."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy, just visit our website, share your concerns, and we’ll help you take the first step toward mental wellness."
    }
  ];

  return (
    <div className='faqMainContainer'>
    <div className="container">
      <div className="faq-container">
        {faqData.map((item, index) => (
          <FAQItem 
            key={index} 
            question={item.question} 
            answer={item.answer}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQSection;