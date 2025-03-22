// SecondaryIntro.jsx
import React from "react";
import styles from './secondary_intro.module.css';

const SecIntroBox = () => {
  return (
    <>
      <div className={styles.overlaysec}></div>
      <div className={styles.container_sec_intro}>
        <div className={styles.sec_layout}>
          <div className={styles.sec_shapes_column}>
            <div className={styles.sec_diamond_1}></div>
            <div className={styles.sec_diamond_2}></div>
            <div className={styles.sec_diamond_3}></div>
            <div className={styles.sec_diamond_4}></div>
          </div>
          <div className={styles.sec_content_box}>
            <h1>Our Story</h1>
            <p>
              We aim to make mental wellness support accessible and affordable. By leveraging virtual mental health counseling, we ensure that you can connect with the best therapists in India from the comfort of your home.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecIntroBox;