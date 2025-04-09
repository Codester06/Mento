import React from "react";
import styles from "./cards_tool.module.css";
import image1 from "../../assets/images/Ilustração com uma pessoa sorrindo na multidão _ Vetor Grátis.jpg";
import image2 from "../../assets/images/Premium Photo _ Minimalist flat vector style beautiful illustration of a woman reading a book novel story.jpg";
import image3 from "../../assets/images/e02a9279-3e29-4d8b-a762-21501e475260.jpg";

import { useNavigate } from "react-router-dom";

const ToolBanner = () => {
  const navigate = useNavigate();

  const chipsData = [
    {
      id: 1,
      Name: "Depression Test",
      image: image1,
      description:
        "Gain insight into your emotions—take our Depression Test and start your journey to clarity.",
      isAvailable: true, 
      linkTest: "/Depression-Tool"
    },
    {
      id: 2,
      Name: "General Health Test",
      image: image2,
      description:
        "Understand how your mental well-being affects your daily life—take a valuable insights",
      isAvailable: true,
      linkTest: "/General-Health-Tool"
    },
    {
      id: 3,
      Name: "Anxiety Disorder",
      image: image3,
      description:
        "Unravel the worries within—take our Anxiety Test and understand your stress better.",
      isAvailable: true,
      linkTest: "/Anxiety-Disorder-Tool"
    },
  ];

  return (
    <>
      <div className={styles.toolBannerContainer}>
        <div className={styles.toolBanner}>
          <h1 className={styles.paragraph18}>Self Assessment Tools</h1>
        </div>

        <div className={styles.chipsContainer}>
          {chipsData.map((chip) => (
            <div key={chip.id} className={`${styles.chipCard}`}>
              <button className={styles.toolcard}>
                <div>
                  <div className={styles.chipImageContainer}>
                    <img
                      src={chip.image}
                      alt={`${chip.Name} illustration`}
                      className={styles.chipImage}
                    />
                    {!chip.isAvailable && (
                      <div className={styles.comingSoonOverlay}>
                        <span>Coming Soon</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.chipInfo}>
                    <div className={styles.chipName}>{chip.Name}</div>
                    
                    <p className={styles.chipDescription}>{chip.description}</p>
                    {chip.isAvailable ? (
                      <button
                        className={styles.shopButton}
                        onClick={() => navigate(chip.linkTest)}
                      >
                        Give Test
                      </button>
                    ) : (
                      <button
                        className={`${styles.shopButton} ${styles.disabledButton}`}
                        disabled
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ToolBanner;