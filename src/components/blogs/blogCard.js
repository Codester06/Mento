import React from 'react';
import './blogCard.css';

const BlogCard = ({ 
  image, 
  altText = "Article illustration",
  title,
  subtitle,
  highlightedWord = "",
  tags = [],
  intro,
  date,
  onClick
}) => {
  return (
    <div className="article-card" onClick={onClick}>
      <div className="article-content">
        <div className="article-image">
          <img src={image || "/api/placeholder/600/400"} alt={altText} />
        </div>
        
        <div className="article-details">
          {tags.length > 0 && (
            <div className="article-tags">
              {tags.map((tag, index) => (
                <span key={index} className={`tag tag-${tag.color || 'blue'}`}>
                  {tag.text}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="article-title">{title}</h1>
          
          {intro && <p className="article-intro">{intro}</p>}
          
          {date && (
            <div className="article-date">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#4A5568" strokeWidth="2"/>
                <path d="M16 2V6" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 2V6" stroke="#4A5568" strokeWidth="2" strokeLinecap="round"/>
                <path d="M3 10H21" stroke="#4A5568" strokeWidth="2"/>
              </svg>
              <span>{date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;