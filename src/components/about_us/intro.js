import React from "react";
import styles from './intro.module.css';



const IntroBox = () =>{
  return (
    <>
      <div className={styles.overlayIntro}></div>
      <div className={styles.containerIntro}>
        <div className={styles.layout}>
          <div className={styles.contentBox}>
            <h1>About Mento</h1>
            <p>
              At Mento, we are dedicated to providing professional counseling and emotional support to individuals seeking to enhance their mental well-being. Our team comprises certified counselors and mental health professionals committed to offering personalized care through online mental health services.
            </p>
          </div>
          <div className={styles.shapesColumn}>
            <div className={styles.recBottomRight}></div>
            <div className={styles.squareUpperRight}></div>
            <div className={styles.recUpperLeft}></div>
            <div className={styles.squareBottomLeft}></div>
          </div>
        </div>
      </div>
    </>
  )

}
export default IntroBox;