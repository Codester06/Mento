import { Fragment } from "react";
import ImageGallery from "./imageGallery";
import "./heroBanner.css";

const HeroBanner = () => {
  return (
    <>
    <div className="BannerHeading">
    <h1> A safe space to talk, heal, and grow because you deserve it!</h1>
    <h2> What kind of support do you need today?</h2>
    </div>
    <ImageGallery />
    </>
  );
};

export default HeroBanner;
