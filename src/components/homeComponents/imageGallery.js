import "./imageGallery.css"

const ImageGallery = () => {
    const images = [
      {
        src: "https://mento.in/wp-content/uploads/2025/01/Individual-1.png",
        alt: "Individual",
        link: "https://mento.in/mental-wellness/"
      },
      {
        src: "https://mento.in/wp-content/uploads/2025/01/Couple-1.png",
        alt: "Couple",
        link: "https://mento.in/couple-form/"
      },
      {
        src: "https://mento.in/wp-content/uploads/2025/01/Family-or-Friend.png",
        alt: "Family or Friend",
        link: "https://mento.in/friends-and-family-form/"
      }
    ];
  
    return (
      <>
        <div className="image-row">
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <a href={image.link}>
                <img src={image.src} alt={image.alt} />
              </a>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default ImageGallery;