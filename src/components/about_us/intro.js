import './intro.css';
import React from "react";



const IntroBox = () =>{
    return (
        <div className="container_intro">
        <div className="layout">
          <div className="content-box">
            
            <h1>About Mento</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages, and more recently with desktop publishing
              software like Aldus PageMaker including versions of Lorem Ipsum.
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