import './intro.css';
import React from "react";



const IntroBox = () =>{
    return (

        <>
        <div className='overlay-intro'></div>
        <div className="container_intro">
        <div className="layout">
          <div className="content-box">

            <h1>About Mento</h1>
            <p>
              At Mento, we are dedicated to providing professional counseling and emotional support to individuals seeking to enhance their mental well-being. Our team comprises certified counselors and mental health professionals committed to offering personalized care through online mental health services.

            </p>
          </div>
          <div className="shapes-column">
            <div className="rec-bottom-right"></div>
            <div className='square-upper-right'> </div>
            <div className="rec-upper-left"></div>
            <div className='square-bottom-left'></div>
          </div>
        </div>

      </div></>
     
     
    )

}
export default IntroBox;