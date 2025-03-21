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
    },
    {
      id: 2,
      Name: "Anixety Test",
      image: image2,
      description:
        "Discover how focus and energy impact your daily life—take our ADHD Test for deeper insight",
    },
    {
      id: 3,
      Name: "ADHD Test",
      image: image3,
      description:
        "Unravel the worries within—take our Anxiety Test and understand your stress better.",
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
                      alt={`LAY'S® Kettle Cooked ${chip.flavor}`}
                      className={styles.chipImage}
                    />
                  </div>
                  <div className={styles.chipInfo}>
                    <div className={styles.chipName}>{chip.Name}</div>

                    <p className={styles.chipDescription}>{chip.description}</p>
                    <button
                      className={styles.shopButton}
                      onClick={() => navigate("/Depression-Tool")}
                    >
                      Give Test
                    </button>
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
