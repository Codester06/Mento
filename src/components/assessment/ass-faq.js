import React, { useState } from 'react';
import styles from './ass-faq.module.css';
import { Link } from 'react-router-dom';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={styles.faqItem}>
      <div
        className={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <svg
          className={`${styles.chevron} ${isOpen ? styles.active : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 9L12 15L18 9" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={`${styles.faqAnswer} ${isOpen ? styles.active : ''}`}>
        {answer}
      </div>
    </div>
  );
};

const FAQtool = () => {
  const faqData = [
    {
      id: 2,
      question: "How accurate are self-assessments for mental health conditions?",
      answer: "Self-assessments are useful for identifying symptoms, but they are not a replacement for professional diagnosis. If you score high on an assessment, it is recommended to consult a mental health professional."
    },
    {
      id: 3,
      question: "What should I do if my self-assessment indicates a high level of anxiety or depression?",
      answer: "If your assessment suggests significant symptoms, consider reaching out us. We will provide you with help."
    },
    {
      id: 4,
      question: "Can I take the self-assessment multiple times?",
      answer: "Yes, you can take the assessment as often as you like. It can help track changes in your mental health over time"
    },
    {
      id: 5,
      question: "Is my self-assessment data kept private?",
      answer: "Yes, we prioritize your privacy. All responses are confidential and securely stored, following strict data protection guidelines."
    },
    {
      id: 8,
      question: "How long does a self-assessment take?",
      answer: "Most self-assessments take about 5 to complete. It's important to answer honestly to get the most accurate results."
    }
  ];
  
  return (
    <div className={styles.faqMainContainerWN}>
      <div className={styles.containerFAQ}>
        <div className={styles.faqContainer}>
          <center><h3>Frequently Asked Questions</h3></center>
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
        <Link to="/faqs">
          <button className={styles.moreFaqBtn}>More FAQ</button>
        </Link>
      </div>
    </div>
  );
};

export default FAQtool;