import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../utils/firebaseConfig';
import './ConsultationDetails.css';

const IndividualDetails = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const consultationRef = ref(database, `mental_wellness_consultations/${id}`);
    
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
    navigate('/admin/responses/individual-responses');
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
        <h1 className="details-title">Consultation Details</h1>
      </div>

      <div className="details-card">
        <div className="details-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">{consultation.name}</div>
            </div>
            <div className="info-item">
              <label>Email</label>
              <div className="info-value">{consultation.email}</div>
            </div>
            {consultation.phone && (
              <div className="info-item">
                <label>Phone</label>
                <div className="info-value">{consultation.phone}</div>
              </div>
            )}
          </div>
        </div>

        {(consultation.subject || consultation.preferredDate || consultation.preferredTime) && (
          <div className="details-section">
            <h2 className="section-title">Consultation Details</h2>
            <div className="info-grid">
              {consultation.subject && (
                <div className="info-item">
                  <label>Subject</label>
                  <div className="info-value">{consultation.subject}</div>
                </div>
              )}
              {consultation.preferredDate && (
                <div className="info-item">
                  <label>Preferred Date</label>
                  <div className="info-value">{formatDate(consultation.preferredDate)}</div>
                </div>
              )}
              {consultation.preferredTime && (
                <div className="info-item">
                  <label>Preferred Time</label>
                  <div className="info-value">{consultation.preferredTime}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {consultation.message && (
          <div className="details-section">
            <h2 className="section-title">Message</h2>
            <div className="message-box">{consultation.message}</div>
          </div>
        )}

        <div className="details-section">
          <h2 className="section-title">Additional Information</h2>
          <div className="info-grid">
            {Object.entries(consultation).map(([key, value]) => {
              // Skip already displayed fields and id
              if (['id', 'fullName', 'email', 'phone', 'subject', 'message', 'preferredDate', 'preferredTime'].includes(key)) {
                return null;
              }
              return (
                <div key={key} className="info-item">
                  <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                  <div className="info-value">{typeof value === 'string' ? value : JSON.stringify(value)}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="details-footer">
          <div className="submission-id">Submission ID: {consultation.id}</div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDetails;