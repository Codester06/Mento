import React from "react";
import { useParams } from "react-router-dom";
import experts from "../components/experts/expert";
import "../components/experts/ExpertDetail.css"

function ExpertDetail() {
  const { id } = useParams();
  const expert = experts.find((exp) => exp.id === parseInt(id));
  
  if (!expert) {
    return <div className="expert-not-found">Expert not found</div>;
  }
  
  return (
    <div className="expert-detail-container">
        <div className="ex-detail-container">
      <div className="expert-header">
        <h1>{expert.name}</h1>
        <div className="expert-title">{expert.position}</div>
      </div>
      
      <div className="expert-content">
        <div className="expert-image-container">
          <img src={expert.imageSrc} alt={expert.name} className="expert-image" />
          <div className="expert-certifications">
            <h3>Certifications</h3>
            <p>{expert.certifications}</p>
          </div>
        </div>
        
        <div className="expert-info">
          <div className="expert-section">
            <h2>Expertise</h2>
            <p>{expert.expertise}</p>
          </div>
          
          <div className="expert-section">
            <h2>Experience</h2>
            <p>{expert.experience}</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ExpertDetail;