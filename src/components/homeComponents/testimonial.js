import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./testimonial.css"

const testimonials = [
  {
    description: "I've never felt so comfortable sharing my struggles. Thank you, Mento, for making it safe.",
    author: "MEGHA VERMA"
  },
  {
    description: "It's a judgment-free space where I could open up and finally feel heard. Highly recommend!",
    author: "ROHAN MUNDARA"
  },
  {
    description: "After a bad breakup, I felt lost. Talking to the expert at Mento helped me heal and rebuild.",
    author: "Ravi Gupta"
  },
  {
    description: "I was scared to talk about my depression and anxiety. Mento made it safe and judgment-free",
    author: "Madhura Shah"
  },
  {
    description: "Managing my ADHD was challenging. The expert I spoke with on Mento gave me effective tools to stay focused.",
    author: "Karan Devade"
  }
];

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='mento-cardContainer'>
    <div className="mento-testimonials-card">
      <h2 className="mento-testimonials-title">Mento stories</h2>

      <div className="mento-testimonials-slidercontainer">
        <div 
          className="mento-testimonials-sliderwrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`mento-testimonials-sliderslide ${currentSlide === index ? 'active' : ''}`}
            >
              <p className="mento-testimonials-feature-description">
                {testimonial.description}
              </p>
              <h2 className="mento-testimonials-feature-title">
                {testimonial.author}
              </h2>
            </div>
          ))}
        </div>

        <button onClick={prevSlide} className="mento-testimonials-slider-nav prev">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="mento-testimonials-slider-nav next">
          <ChevronRight size={24} />
        </button>

        <div className="mento-testimonials-sliderdots">
          {testimonials.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`mento-testimonials-sliderdot ${currentSlide === index ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

    </div>
    </div>
  );
};

export default TestimonialSlider;