import React from 'react';
import './number.css';
import { Rocket, Calendar, Users, Briefcase } from 'lucide-react';

const Number = () => {
  const statsData = [
    {
      icon: Rocket,
      number: '1200+',
      description: 'Inspiring Journeys of Mental Health and Transformation with Mento',

    },
    {
      icon: Calendar,
      number: '450+',
      description: 'One-on-One Sessions with Our Dedicated Therapists and Psychiatrists'
    },
    {
      icon: Users,
      number: '1000+',
      description: 'members in the mento Community receiving peer supportOne-on-One Sessions with Our Dedicated Therapists and Psychiatrists'
    },
   
  ];

  return (<>
  <div className='number-bg'>

    <div className="stats-container">
      <h1 className="stats-heading">Supporting You, One Thought at a Time</h1>
      
      <p className="stats-subheading">
        At Mento, we have <span className="highlight-number">50+ dedicated experts</span> from diverse fields—including therapy, psychiatry, technology, and business—united in their commitment to your well-being.
      </p>
      
      <div className="stats-grid">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div className="stat-card" key={index}>
              <IconComponent className="stat-icon" />
              <h2 className="stat-number">{stat.number}</h2>
              <p className="stat-description">{stat.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </div>
  </>
  );
};

export default Number;