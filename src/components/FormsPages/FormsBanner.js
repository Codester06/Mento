import React from 'react';
import './FormBanner.css';

const FormsBanner = (props) => {
  return (
    <div className="Forms-banner-container">
      <div className="Forms-curve-top"></div>
      <div className="Forms-content">
        <h1 className="Forms-heading">{props.FormTitle}</h1>
        <div className="Forms-divider"></div>
        <div className="form-banner-quote">
        <p>
          ✨ Thousands have taken the first step. Don’t wait! Start your healing
          journey today. ✨
        </p>
      </div>
      </div>
    </div>
  );
};

export default FormsBanner;