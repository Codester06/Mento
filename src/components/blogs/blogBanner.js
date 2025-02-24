import React from "react";
import "./Banner.css"; // Import the CSS file

const Banner = () => {
  return (
    <div className="banner">
      <div className="decor left"></div>
      <div className="decor right"></div>

      {/* Heading */}
      <h1 className="banner-title">
        Driving Growth Through SaaS: The Ultimate Business Companion
      </h1>

      {/* Subheading */}
      <p className="banner-subtitle">
        Embark on a transformative freelance journey with our dedicated Careers Section
      </p>

    </div>
  );
};

export default Banner;
