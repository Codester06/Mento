import './intro.css';
import React from "react";



const IntroBox = () =>{
    return (
        <div className="container_intro">
        <div className="layout">
          <div className="content-box">
            
            <h1>About Mento</h1>
            <p>
            At Mento, we are dedicated to providing professional counseling and emotional support to individuals seeking to enhance their mental well-being. Our team comprises certified counselors and mental health professionals committed to offering personalized care through online mental health services.

            </p>
          </div>
          <div className="shapes-column">
            <div className="rectangle1"></div>
            <div className="diamond"></div>
            <div className="rectangle2"></div>
          </div>
        </div>
      </div>
    )

}
export default IntroBox;