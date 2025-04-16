import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDataBS } from "../utils/awsService";
import "../components/experts/ExpertDetail.css";

const ExpertDetail = () => {
  const { id } = useParams();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get all experts first
        const responseData = await getDataBS("/expert_table");
        
        // Extract experts array based on the response structure
        let expertsArray = [];
        if (responseData && responseData.data) {
          if (responseData.data.data && Array.isArray(responseData.data.data)) {
            expertsArray = responseData.data.data;
          } else if (Array.isArray(responseData.data)) {
            expertsArray = responseData.data;
          }
        }

        // Find the specific expert by ID
        const expertData = expertsArray.find(item => {
          // Check if expert data is nested under "expert" key or directly in the item
          const expert = item.expert || item;
          return expert.id === id;
        });

        if (expertData) {
          // Normalize the expert data
          const expert = expertData.expert || expertData;
          setExpert({
            id: expert.id || null,
            originalId: expert.originalId || null,
            name: expert.name || 'Unnamed',
            position: expert.position || 'Counselor',
            imageSrc: expert.imageSrc || 'https://via.placeholder.com/400x400?text=No+Image',
            certifications: expert.certifications || '',
            expertise: expert.expertise || 'General Counseling',
            experience: expert.experience || 'Not specified',
            uploadedAt: expert.uploadedAt || new Date().toISOString()
          });
        } else {
          setError("Expert not found");
        }
      } catch (error) {
        console.error("Error in fetching expert details:", error);
        setError(error.message || "Failed to fetch expert details");
      } finally {
        setLoading(false);
      }
    };

    fetchExpertDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/");  // Navigate to home or wherever the experts list is
  };

  if (loading) {
    return (
      <div className="loading-container">
        Loading expert details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleBack} className="back-btn">
            Back to Experts
          </button>
        </div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Expert Not Found</h2>
          <p>
            The expert you're looking for doesn't exist or has been deleted.
          </p>
          <button onClick={handleBack} className="back-btn">
            Back to Experts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="expert-detail-container">

       

      <div className="ex-detail-container">
        <div className="expert-header">
        <button onClick={handleBack} className="back-btn">
          ← Back to Experts
        </button>
          <div className="expert-title">{expert.position}</div>
        </div>
        
        <div className="expert-content">
          <div className="expert-image-container">
            <img src={expert.imageSrc} alt={expert.name} className="expert-image" />
            <div className="expert-certifications">
              <h1>{expert.name}</h1>
              <h3>Certifications</h3>
              <p>{expert.certifications || "No certifications listed"}</p>
            </div>
          </div>
          
          <div className="expert-info">
            <div className="expert-section">
              <h2>Expertise</h2>
              <p>{expert.expertise || "General counseling"}</p>
            </div>
            
            <div className="expert-section">
              <h2>Experience</h2>
              <p>{expert.experience || "Experience details not available"}</p>
            </div>
          </div>
        </div>

        <div className="details-footer">
          <div className="submission-info">
            <div className="expert-id">
              Expert ID: {expert.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetail;