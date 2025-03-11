import React, { useState } from 'react';
import '../FAQ/FaqSection.css';
import { Link } from 'react-router-dom';

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

const FAQSectionWN = () => {
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
  ];

  return (
    <div className='faqMainContainerWN'>
    <div className="containerFAQ">
      <div className="faq-container">
        {faqData.map((item, index) => (
          <FAQItem 
            key={index} 
            question={item.question} 
            answer={item.answer}
          />
        ))}
      </div>
<<<<<<< HEAD
      <Link to="/faqs">
=======
      <Link to="/faq">
>>>>>>> db7b726a0ceef9a32f6ca64782afcd3793c13cae
        <button className="more-faq-btn">More FAQ</button>
      </Link>
    </div>
    </div>
  );
};

export default FAQSectionWN;