import './secondary_intro.css';
import React from "react";



const SecIntroBox = () =>{
    return (
        <div className="container_sec_intro">
        <div className="sec_layout">


            <div className="sec_shapes-column">
                <div className="sec_rectangle1"></div>
                <div className="sec_diamond"></div>
                <div className="sec_rectangle2"></div>
            </div>


            <div className="sec_content-box">
                
                <h1>Our Story</h1>
                <p>
                We aim to make mental wellness support accessible and affordable. By leveraging virtual mental health counseling, we ensure that you can connect with the best therapists in India from the comfort of your home.

                </p>
            </div>
        
        </div>
      </div>
    )

}
export default SecIntroBox;