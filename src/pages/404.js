import React from 'react';
import { Link } from 'react-router-dom';
import '../components/navigation/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        
        {/* Uncomment if you want to add an image */}
        {/* <img 
          src="/images/not-found.svg" 
          alt="Page not found illustration" 
          className="not-found-image" 
        /> */}
        
        <p className="not-found-message">
          Oops! The page you are looking for doesn't exist or has been moved.
          Please check the URL or navigate back to the homepage.
        </p>
        
        <Link to="/" className="not-found-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;