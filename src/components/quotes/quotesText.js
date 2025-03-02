import React from 'react';
import './QuotesText.css';

const QuoteCards = () => {
  const quotes = [
    {
      id: 1,
      color: 'orange',
      text:"Healing starts with a single step, and that step is reaching out. No matter what you're going through, support is always within your reach. Start your journey toward a healthier mind today."
    },
    {
      id: 2,
      color: 'yellow',
     text:"Your mental well-being is just as important as your physical health. You deserve a safe space to express, heal, and grow. Let therapy be the bridge to a better, more fulfilled you."

     
    },
    {
      id: 3,
      color: 'teal',
      text:"You are not alone in this journey. Every challenge, every struggle, and every moment of self-doubt is a step toward growth. With the right support, you can find clarity, strength, and peace of mind."

     
    }
  ];

  return (
    <div className="quote-container">
      {quotes.map(quote => (
        <div key={quote.id} className={`quote-card ${quote.color}`}>
          <div className="quote-marks opening">"</div>
          
          <h2 className="quote-heading">QUOTE</h2>
          
          <p className="quote-text">
           {quote.text}
          </p>
          
         
          
          <div className="quote-marks closing">"</div>
        </div>
      ))}
    </div>
  );
};

export default QuoteCards;

