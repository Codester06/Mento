import React from 'react';
import "./helpYouSection.css"

import { Link } from 'react-router-dom';

const MentalHealthServices = () => {
  const services = [
    { id: 1, name: 'Anxiety & Stress' },
    { id: 2, name: 'Depression' },
    { id: 3, name: 'Relationship Issues' },
    { id: 4, name: 'OCD' },
    { id: 5, name: 'Bipolar Disorder' },
    { id: 6, name: 'Psychosis' },
    { id: 7, name: 'Grief & Loss' },
    { id: 8, name: 'Trauma' },
    { id: 9, name: 'Couple Therapy' },
    { id: 10, name: 'LGBTQIA+' },
    { id: 11, name: 'ADHD & Teenage Issues' },
    { id: 12, name: 'Sexual Issues' }
  ];


  return (


    <div className="containerMain">

    <div className="HelpContainer">
      <h1 className="helpYouTitle">Expert Care for Your Mental Well-Being</h1>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-tag">
            {service.name}
          </div>
        ))}
      </div>

      <Link to="/get-started" className="get-started-btn">
          Get Started !
        </Link>
        
     
     
    </div>
    </div>
  );
};

export default MentalHealthServices;