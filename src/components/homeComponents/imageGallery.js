import "./imageGallery.css";
import { Link } from "react-router-dom";

const ImageGallery = () => {
  const images = [
    {
      src: "https://mento.in/wp-content/uploads/2025/01/Individual-1.png",
      alt: "Individual",
      link: "/individual_therapy"
    },
    {
      src: "https://mento.in/wp-content/uploads/2025/01/Couple-1.png",
      alt: "Couple",
      link: "/couple_therapy"
    },
    {
      src: "https://mento.in/wp-content/uploads/2025/01/Family-or-Friend.png",
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