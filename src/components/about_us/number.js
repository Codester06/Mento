import React from 'react';
import styles from './number.module.css';
import { Rocket, Calendar, Users } from 'lucide-react';

// Decorative Circles Component
const DecorativeCircles = () => (
  <div className={styles.decorativeCircles}>
    <div className={styles.circle1}></div>
    <div className={styles.circle2}></div>
    <div className={styles.circle3}></div>
  </div>
);

// Stat Card Component
const StatCard = ({ icon: IconComponent, number, description }) => (
  <div className={styles.statCard}>
    <IconComponent className={styles.statIcon} />
    <h2 className={styles.statNumber}>{number}</h2>
    <p className={styles.statDescription}>{description}</p>
  </div>
);

// Stats Grid Component
const StatsGrid = ({ stats }) => (
  <div className={styles.statsGrid}>
    {stats.map((stat, index) => (
      <StatCard 
        key={index} 
        icon={stat.icon} 
        number={stat.number} 
        description={stat.description} 
      />
    ))}
  </div>
);

// Header Section Component
const HeaderSection = () => (
  <>
    <h1 className={styles.statsHeading}>Supporting You, One Thought at a Time</h1>
    <p className={styles.statsSubheading}>
      At Mento, we have <span className={styles.highlightNumber}>50+ dedicated experts</span> from diverse fields—including therapy, psychiatry, technology, and business—united in their commitment to your well-being.
    </p>
  </>
);

// Main Number Component
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
      description: 'members in the mento Community receiving peer support'
    },
  ];

  return (
    <div className={styles.numberBg}>
      <DecorativeCircles />
      
      <div className={styles.statsContainer}>
        <HeaderSection />
        <StatsGrid stats={statsData} />
      </div>
    </div>
  );
};

export default Number;