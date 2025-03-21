import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../utils/firebaseConfig';
import './ConsultationDetails.css';

const CoupleDetails = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const consultationRef = ref(database, `couples_therapy_sessions/${id}`);
    
    const unsubscribe = onValue(consultationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setConsultation({ id, ...data });
      } else {
        // Consultation not found
        setConsultation(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, [id]);

  const handleBack = () => {
    navigate('/admin/responses/couple-responses');
  };

  if (loading) {
    return <div className="loading-container">Loading consultation details...</div>;
  }

  if (!consultation) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Consultation Not Found</h2>
          <p>The consultation you're looking for doesn't exist or has been deleted.</p>
          <button onClick={handleBack} className="back-btn">Back to List</button>
        </div>
      </div>
    );
  }

  // Format the consultation data for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={handleBack} className="back-btn">← Back to List</button>
        <h1 className="details-title">Couples Therapy Consultation Details</h1>
      </div>

      <div className="details-card">
        <div className="details-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Your Name</label>
              <div className="info-value">{consultation.name}</div>
            </div>
            <div className="info-item">
              <label>Partner's Name</label>
              <div className="info-value">{consultation.partnerName}</div>
            </div>
            <div className="info-item">
              <label>Email</label>
              <div className="info-value">{consultation.email}</div>
            </div>
            <div className="info-item">
              <label>City</label>
              <div className="info-value">{consultation.city}</div>
            </div>
            <div className="info-item">
              <label>Contact Number</label>
              <div className="info-value">{consultation.contactNo}</div>
            </div>
            <div className="info-item">
              <label>Your Profession</label>
              <div className="info-value">{consultation.profession}</div>
            </div>
            <div className="info-item">
              <label>Partner's Profession</label>
              <div className="info-value">{consultation.partnerProfession}</div>
            </div>
            <div className="info-item">
              <label>Relationship Status</label>
              <div className="info-value">
                {consultation.relationshipStatus}
                {consultation.relationshipStatus === "Other" && consultation.otherRelationshipStatus && 
                  ` (${consultation.otherRelationshipStatus})`
                }
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2 className="section-title">Therapy Goals</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Primary Concern</label>
              <div className="info-value">{consultation.primaryConcern}</div>
            </div>
            <div className="info-item">
              <label>Therapy Goals</label>
              <div className="info-value">
                {Array.isArray(consultation.therapyGoals) 
                  ? consultation.therapyGoals.join(', ')
                  : consultation.therapyGoals}
                {consultation.therapyGoals?.includes("Other") && consultation.otherTherapyGoal && 
                  ` (Other: ${consultation.otherTherapyGoal})`
                }
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2 className="section-title">Additional Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Previous Couple Therapy</label>
              <div className="info-value">{consultation.previousTherapy}</div>
            </div>
            <div className="info-item">
              <label>Preferred Language</label>
              <div className="info-value">
                {consultation.preferredLanguage}
                {consultation.preferredLanguage === "Other" && consultation.otherLanguage && 
                  ` (${consultation.otherLanguage})`
                }
              </div>
            </div>
            <div className="info-item">
              <label>Medical Conditions</label>
              <div className="info-value">{consultation.medicalConditions}</div>
            </div>
            <div className="info-item">
              <label>Referral Source</label>
              <div className="info-value">{consultation.referralSource}</div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2 className="section-title">Session Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Session Date</label>
              <div className="info-value">{formatDate(consultation.sessionDate)}</div>
            </div>
            <div className="info-item">
              <label>Session Time</label>
              <div className="info-value">{consultation.sessionTime}</div>
            </div>
            <div className="info-item">
              <label>Payment Method</label>
              <div className="info-value">{consultation.paymentMethod}</div>
            </div>
            <div className="info-item">
              <label>Terms Agreed</label>
              <div className="info-value">{consultation.termsAgreed ? "Yes" : "No"}</div>
            </div>
          </div>
        </div>

        <div className="details-footer">
          <div className="submission-id">Submission ID: {consultation.id}</div>
        </div>
      </div>
    </div>
  );
};

export default CoupleDetails;