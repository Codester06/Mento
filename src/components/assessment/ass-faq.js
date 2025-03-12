import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ass-faq.module.css';

const FAQtool = () => {
    const navigate = useNavigate();
  const faqData = [
    
      {
        "id": 2,
        "question": "How accurate are self-assessments for mental health conditions?",
        "answer": "Self-assessments are useful for identifying symptoms, but they are not a replacement for professional diagnosis. If you score high on an assessment, it is recommended to consult a mental health professional."
      },
      {
        "id": 3,
        "question": "What should I do if my self-assessment indicates a high level of anxiety or depression?",
        "answer": "If your assessment suggests significant symptoms, consider reaching out us .We will provide you with help."
      },
      {
        "id": 4,
        "question": "Can I take the self-assessment multiple times?",
        "answer": "Yes, you can take the assessment as often as you like. It can help track changes in your mental health over time"
      },
      {
        "id": 5,
        "question": "Is my self-assessment data kept private?",
        "answer": "Yes, we prioritize your privacy. All responses are confidential and securely stored, following strict data protection guidelines."
      },
      {
        "id": 8,
        "question": "How long does a self-assessment take?",
        "answer": "Most self-assessments take about 5 to complete. It’s important to answer honestly to get the most accurate results."
      }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>


    <div className={styles.faqMainContainer}>
    <h1 className={styles.faqTitle}>
        Frequently Asked Questions</h1>
      <div className={styles.container}>
        <div className={styles.faqContainer}>
          {faqData.map((faq, index) => (
              <div key={faq.id} className={styles.faqItem}>
              <div 
                className={styles.faqQuestion} 
                onClick={() => toggleFAQ(index)}
                >
                {faq.question}
                <div className={activeIndex === index ? `${styles.chevron} ${styles.chevronActive}` : styles.chevron}>
                  ▼
                </div>
              </div>
              <div className={activeIndex === index ? `${styles.faqAnswer} ${styles.faqAnswerActive}` : styles.faqAnswer}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    <button className={styles.faqButton}onClick={()=>navigate('/faq')}>
        <div >
            Check out more FAQs</div>
    </button>
    </div>

          </>
  );
};

export default FAQtool;