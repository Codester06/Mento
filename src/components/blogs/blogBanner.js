import React from "react";
import "./Banner.css"; // Import the CSS file

const Banner = () => {
  return (
    <div className="banner">
      <div className="decor left"></div>
      <div className="decor right"></div>

      {/* Heading */}
      <h1 className="banner-title">
      Wellness, Growth & Healing Insights.
      </h1>

      {/* Subheading */}
      <p className="banner-subtitle">
      MENTO BLOGS
      </p>

    </div>
  );
};

export default Banner;
