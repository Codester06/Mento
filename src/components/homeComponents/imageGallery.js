import "./imageGallery.css";
import { Link } from "react-router-dom";
import imageFamily from "../../assets/images/formButton/FamilyOrFriend.png"
import imageCouple from "../../assets/images/formButton/Couple.png"
import imageIndividual from "../../assets/images/formButton/Individual.png"

const ImageGallery = () => {
  const images = [
    {
      src: imageIndividual,
      alt: "Individual",
      link: "/individual_therapy"
    },
    {
      src:imageCouple,
      alt: "Couple",
      link: "/couple_therapy"
    },
    {
      src: imageFamily,
      alt: "Family or Friend",
      link: "/familyFriends_therapy"
    }
  ];

  return (
    <>
      <div className="image-row">
        {images.map((image, index) => (
          <div key={index} className="image-container">
            {/* Use Link for internal routes and regular anchor for external URLs */}
            {image.link.startsWith("/") ? (
              <Link to={image.link}>
                <img src={image.src} alt={image.alt} />
              </Link>
            ) : (
              <a href={image.link}>
                <img src={image.src} alt={image.alt} />
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ImageGallery;