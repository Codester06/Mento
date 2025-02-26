import React from 'react';
import './number.css';
import { Rocket, Calendar, Users, Briefcase } from 'lucide-react';

const Number = () => {
  const statsData = [
    {
      icon: Rocket,
      number: '6m+',
      description: 'users who have changed their lives and worked on their mental health with the Amaha app'
    },
    {
      icon: Calendar,
      number: '140k+',
      description: 'sessions taken by our clients with our therapists and psychiatrists'
    },
    {
      icon: Users,
      number: '50,000+',
      description: 'members in the Amaha Community receiving peer support'
    },
    {
      icon: Briefcase,
      number: '120+',
      description: 'partnerships with leading organisations'
    }
  ];

  return (
    <div className="stats-container">
      <h1 className="stats-heading">We've made your mental health our priority</h1>
      
      <p className="stats-subheading">
        At Amaha, we have <span className="highlight">200+ experts</span> from different backgrounds - therapy, psychiatry, technology, and business - who are all committed to your care.
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
  );
};

export default Number;