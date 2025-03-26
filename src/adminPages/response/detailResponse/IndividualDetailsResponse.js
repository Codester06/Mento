import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../../utils/firebaseConfig';
import './ConsultationDetails.css';
import { getData } from '../../../utils/awsService';
const IndividualDetails = () => {
  const { id } = useParams();
  const [consultation, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchConsultations = async () => {
    //      try {
    //        setLoading(true);
    //        setError(null);
   
    //        const responseData = await getData('/individual');
    //        console.log('Full Raw Response:', responseData);
   
    //        // Extract consultation data
    //        let consultationData = responseData.data['0'];
    //        console.log('Processed Consultation Data:', consultationData);
   
    //        // Transform data to extract specific fields
    //        const processedConsultations = consultationData.map(consultation => ({
    //          // Separate extraction of key fields
    //          id: consultation.id || null,
    //          name: consultation.name || 'Unknown',
    //          age: consultation.age || 'N/A',
             
    //          // Optional: Include other relevant fields if needed
    //          email: consultation.email || '',
    //          supportReason: consultation.supportReason || '',
    //          city: consultation.city || ''
    //        }));
   
    //        setConsultations(processedConsultations);
    //      } catch (error) {
    //        console.error('Error in fetching consultations:', error);
    //        setError(error.message || 'Failed to fetch consultations');
    //        setConsultations([]);
    //      } finally {
    //        setLoading(false);
    //      }
    //    };
      //  fetchConsultations();
      const fetchConsultations = async () => {
        try {
          const responseData = await getData('/individual');
      
          // Check if data exists
          if (responseData && responseData.data && responseData.data['0']) {
            const consultation = responseData.data['0'];
      
            // Separate logging for each field
            console.log('ID:', consultation.id);
            console.log('Name:', consultation.name);
            console.log('Age:', consultation.age);
            console.log('Email:', consultation.email);
            console.log('Support Reason:', consultation.supportReason);
            console.log('City:', consultation.city);
      
            // Optional: If you want to see all fields dynamically
            Object.keys(consultation).forEach(key => {
              console.log(`${key}:`, consultation[key]);
            });
          } else {
            console.log('No consultation data found');
          }
        } catch (error) {
          console.error('Error in fetching consultations:', error);
        }
      };
    const intervalId = setInterval(fetchConsultations, 30000);
    
    return () => clearInterval(intervalId);
   
   
  }, []);
    


  const handleBack = () => {
    navigate('/admin/responses/individual-responses');
  };

  if (loading) {
    return <div className="loading-container">Loading individual consultation details...</div>;
  }

  if (!consultation) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Individual Consultation Not Found</h2>
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
        <button onClick={handleBack} className="back-btn">← Back to Individual Consultations</button>
        <h1 className="details-title">Individual Consultation Details</h1>
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
            {consultation.age && (
              <div className="info-item">
                <label>Age</label>
                <div className="info-value">{consultation.age}</div>
              </div>
            )}
            {consultation.gender && (
              <div className="info-item">
                <label>Gender</label>
                <div className="info-value">{consultation.gender}</div>
              </div>
            )}
            {consultation.city && (
              <div className="info-item">
                <label>City</label>
                <div className="info-value">{consultation.city}</div>
              </div>
            )}
            {consultation.profession && (
              <div className="info-item">
                <label>Profession</label>
                <div className="info-value">{consultation.profession}</div>
              </div>
            )}
          </div>
        </div>

        {consultation.therapyGoals && (
          <div className="details-section">
            <h2 className="section-title">Therapy Goals</h2>
            <div className="info-grid">
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
              {consultation.previousTherapy && (
                <div className="info-item">
                  <label>Previous Therapy Experience</label>
                  <div className="info-value">{consultation.previousTherapy}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {(consultation.preferredLanguage || consultation.medicalConditions) && (
          <div className="details-section">
            <h2 className="section-title">Session Preferences</h2>
            <div className="info-grid">
              {consultation.preferredLanguage && (
                <div className="info-item">
                  <label>Preferred Language</label>
                  <div className="info-value">{consultation.preferredLanguage}</div>
                </div>
              )}
              {consultation.otherLanguage && (
                <div className="info-item">
                  <label>Other Language</label>
                  <div className="info-value">{consultation.otherLanguage}</div>
                </div>
              )}
              {consultation.medicalConditions && (
                <div className="info-item">
                  <label>Medical Conditions</label>
                  <div className="info-value">{consultation.medicalConditions}</div>
                </div>
              )}
              {consultation.referralSource && (
                <div className="info-item">
                  <label>Referral Source</label>
                  <div className="info-value">{consultation.referralSource}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {(consultation.paymentMethod || consultation.termsAgreed) && (
          <div className="details-section">
            <h2 className="section-title">Payment Information</h2>
            <div className="info-grid">
              {consultation.paymentMethod && (
                <div className="info-item">
                  <label>Payment Method</label>
                  <div className="info-value">{consultation.paymentMethod}</div>
                </div>
              )}
              {consultation.termsAgreed !== undefined && (
                <div className="info-item">
                  <label>Terms Agreed</label>
                  <div className="info-value">{consultation.termsAgreed ? "Yes" : "No"}</div>
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
              if ([
                'id', 'name', 'email', 'phone', 'age', 'gender', 'city', 'profession',
                'subject', 'primaryConcern', 'otherPrimaryConcern', 'preferredDate', 'preferredTime', 
                'consultationType', 'urgency', 'therapyGoals', 'otherTherapyGoal', 'previousTherapy',
                'preferredLanguage', 'otherLanguage', 'medicalConditions', 'referralSource',
                'paymentMethod', 'termsAgreed', 'message'
              ].includes(key)) {
                return null;
              }
              
              // Skip empty values
              if (value === null || value === undefined || value === '') {
                return null;
              }
              
              // Format the display value based on type
              let displayValue = value;
              if (typeof value === 'boolean') {
                displayValue = value ? 'Yes' : 'No';
              } else if (Array.isArray(value)) {
                displayValue = formatArrayData(value);
              } else if (typeof value === 'object') {
                displayValue = JSON.stringify(value);
              }
              
              return (
                <div key={key} className="info-item">
                  <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                  <div className="info-value">{displayValue}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="details-footer">
          <div className="submission-info">
            <div className="submission-id">Submission ID: {consultation.id}</div>
            {consultation.submittedAt && (
              <div className="submission-date">
                Submitted: {formatDate(consultation.submittedAt)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDetails;