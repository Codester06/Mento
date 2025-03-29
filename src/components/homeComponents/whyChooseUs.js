import React,{useState,useEffect,useCallback} from 'react';
import './whyChooseUs.css'; // Assuming you save the CSS in a separate file

const WhyChooseUs = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const features = [
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        ),
        title: "Complete Privacy",
        description: "Your conversations stay strictly confidential between you and your therapist, protected by our secure platform."
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        ),
        title: "Expert Care",
        description: "Our carefully selected licensed psychologists bring expertise and compassion to help with stress, anxiety, and relationships."
      },
      {
        icon: (
          <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        ),
        title: "Flexible Scheduling",
        description: "Access mental health support on your terms with sessions available early mornings, late nights, or weekends."
      }
    ];
  
    const nextSlide = useCallback(() => {
      setCurrentSlide((prev) => (prev + 1) % features.length);
    }, [features.length]);
    
    useEffect(() => {
      let interval = setInterval(nextSlide, 3000);
    
      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearInterval(interval);
        } else {
          // Clear any existing interval first
          clearInterval(interval);
          // Then create a new one
          interval = setInterval(nextSlide, 3000);
        }
      };
    
      document.addEventListener('visibilitychange', handleVisibilityChange);
    
      return () => {
        clearInterval(interval);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [nextSlide]);
    
    return (
      <>
        <div className="why_card">
          <h1 className="why_card-title">Why Choose Mento?</h1>
  
          {/* Desktop Grid */}
          <div className="why_features-grid">
            {features.map((feature, index) => (
              <div key={index} className="why_feature">
                <div className="why_feature-icon">
                  {feature.icon}
                </div>
                <h2 className="why_feature-title">{feature.title}</h2>
                <p className="why_feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
  
          {/* Mobile Slider */}
          <div className="why-slidercontainer">
            <div 
              className="why-sliderwrapper"
              style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="why-sliderslide">
                  <div className="why_feature">
                    <div className="why_feature-icon">
                      {feature.icon}
                    </div>
                    <h2 className="why_feature-title">{feature.title}</h2>
                    <p className="why_feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="why-sliderdots">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`why-sliderdot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
  
          <p className="summary desktop-summary">
            At Mento, privacy, expert care, and convenience come together to empower your mental health journey, ensuring you always feel supported, understood, and valued.
          </p>
  
          <p className="summary mobile-summary">
            Your mental health journey matters. We're here to support you with care, privacy, and convenience.
          </p>
        </div>
      </>
    );
}

export default WhyChooseUs;