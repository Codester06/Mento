import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../utils/firebaseConfig';
import './ConsultationDetails.css';

const FamilyFriendsDetails = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const consultationRef = ref(database, `family_therapy_sessions/${id}`);
    
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
    navigate('/admin/responses/family-friends-responses');
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

  // Helper function to format array data
  const formatArrayData = (array) => {
    if (!array) return '';
    if (typeof array === 'string') return array;
    return array.join(', ');
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={handleBack} className="back-btn">← Back to List</button>
        <h1 className="details-title">Family Therapy Session Details</h1>
      </div>

      <div className="details-card">
        <div className="details-section">
          <h2 className="section-title">Participant Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">{consultation.name}</div>
            </div>
            <div className="info-item">
              <label>Other Participants</label>
              <div className="info-value">{consultation.participantsNames}</div>
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
              <label>Profession</label>
              <div className="info-value">{consultation.profession}</div>
            </div>
            <div className="info-item">
              <label>Relationship Type</label>
              <div className="info-value">{consultation.relationshipType}</div>
            </div>
            {consultation.otherRelationshipType && (
              <div className="info-item">
                <label>Other Relationship Type</label>
                <div className="info-value">{consultation.otherRelationshipType}</div>
              </div>
            )}
          </div>
        </div>

        <div className="details-section">
          <h2 className="section-title">Therapy Goals</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Primary Concern</label>
              <div className="info-value">{consultation.primaryConcern}</div>
            </div>
            {consultation.otherPrimaryConcern && (
              <div className="info-item">
                <label>Other Primary Concern</label>
                <div className="info-value">{consultation.otherPrimaryConcern}</div>
              </div>
            )}
            <div className="info-item">
              <label>Therapy Goals</label>
              <div className="info-value">{formatArrayData(consultation.therapyGoals)}</div>
            </div>
            {consultation.otherTherapyGoal && (
              <div className="info-item">
                <label>Other Therapy Goal</label>
                <div className="info-value">{consultation.otherTherapyGoal}</div>
              </div>
            )}
            <div className="info-item">
              <label>Previous Therapy Experience</label>
              <div className="info-value">{consultation.previousTherapy}</div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2 className="section-title">Session Preferences</h2>
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
              <label>Preferred Language</label>
              <div className="info-value">{consultation.preferredLanguage}</div>
            </div>
            {consultation.otherLanguage && (
              <div className="info-item">
                <label>Other Language</label>
                <div className="info-value">{consultation.otherLanguage}</div>
              </div>
            )}
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
          <h2 className="section-title">Payment Information</h2>
          <div className="info-grid">
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

export default FamilyFriendsDetails;