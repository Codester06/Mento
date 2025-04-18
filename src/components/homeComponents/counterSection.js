import React, { useState, useEffect } from 'react';
import "./counterSection.css"
import satisfiedIcon from "../../assets/images/counterIcons/satisfied.png"
import psychologyIcon from "../../assets/images/counterIcons/psychology.png"
import expertsIcon from "../../assets/images/counterIcons/experts.png"



const CounterSection = () => {
  const [satisfiedCustomers, setSatisfiedCustomers] = useState(250);
  const [sessionsScheduled, setSessionsScheduled] = useState(1700);
  const expertsAvailable = 30;

  useEffect(() => {
    const updateStats = () => {
      setSatisfiedCustomers(prev => prev + 1);
      if ((satisfiedCustomers + 1) % 3 === 0) {
        setSessionsScheduled(prev => prev + 1);
      }
    };

    const interval = setInterval(updateStats, 20000);
    return () => clearInterval(interval);
  }, [satisfiedCustomers]);

  const counterData = [
    {
      icon: satisfiedIcon,
      count: satisfiedCustomers,
      title: "Satisfied Customers"
    },
    {
      icon: psychologyIcon,
      count: sessionsScheduled,
      title: "Sessions Scheduled"
    },
    {
      icon: expertsIcon,
      count: expertsAvailable,
      title: "Experts Available"
    }
  ];

  return (
    <>
      <section className="counter-wrapper">
        <div className="counter-inner">
          <div className="containerCounter">
            <h1 className='counterTitle'>India's Most Trusted Online Service</h1>
            <div className="row">
              {counterData.map((item, index) => (
                <div key={index} className="col-6" style={index === 2 ? {borderBottom: '0px'} : {}}>
                  <div className="py-5">
                    <i className="bi bi-building count-icon">
                      <img src={item.icon} alt="" />
                    </i>
                    <div className="count">{item.count}+</div>
                    <div className="count-title">{item.title}</div>
                    <div className="count phone-visit">{item.count}+</div>
                  </div>
                  <div className="iconPhone">
                    <h1 className="bi bi-trophy phone-count">
                      <img src={item.icon} alt="" />
                    </h1>
                  </div>
                </div>
              ))}
              <div className="col-6 none"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CounterSection;