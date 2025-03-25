import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, deleteData } from '../../utils/awsService';
import './AdminPanel.css';

const IndividualPanel = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        setError(null);

        const responseData = await getData('/individual');
        console.log('Full Raw Response:', responseData);

        // Robust data extraction logic
        let consultationData = [];

        // Check different possible response structures
        if (responseData) {
          if (Array.isArray(responseData)) {
            // If response is directly an array
            consultationData = responseData;
          } else if (responseData.data && Array.isArray(responseData.data)) {
            // If response has a 'data' property that is an array
            consultationData = responseData.data;
          } else if (responseData.results && Array.isArray(responseData.results)) {
            // If response has a 'results' property that is an array
            consultationData = responseData.results;
          } else if (typeof responseData === 'object') {
            // If response is an object, try to convert it to an array
            consultationData = Object.values(responseData).filter(Array.isArray)[0] || [];
          }
        }

        console.log('Processed Consultation Data:', consultationData);

        // Ensure consultationData is an array
        setConsultations(Array.isArray(consultationData) ? consultationData : []);
      } catch (error) {
        console.error('Error in fetching consultations:', error);
        setError(error.message || 'Failed to fetch consultations');
        setConsultations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
    
    const intervalId = setInterval(fetchConsultations, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="loading-container">Loading consultations...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  const handleView = (id) => {
    navigate(`/admin/responses/individual-responses/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      try {
        await deleteData('mental_wellness_consultations', id);
        
        setConsultations(prevConsultations => 
          prevConsultations.filter(consultation => consultation.id !== id)
        );
      } catch (error) {
        console.error('Error deleting consultation:', error);
        alert('Failed to delete consultation.');
      }
    }
  };

  const handleBack = () => {
    navigate('/admin/admin-dashboard');
  };

  return (
    <div className="admin-container">
      <button onClick={handleBack} className="back-btn">← Back to Dashboard</button>

      <h1 className="admin-title">Individual Consultations Admin Panel</h1>
      
      {consultations.length === 0 ? (
        <div className="no-data-container">
          <p className="no-data">No consultations found.</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Reload Data
          </button>
        </div>
      ) : (
        <div className="consultations-grid">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="consultation-card">
              <div className="card-header">
                <h3 className="client-name">{consultation.name || 'Unknown Name'}</h3>
                <p className="client-email">{consultation.email || 'No Email'}</p>
              </div>
              <div className="card-content">
                <p>Age: {consultation.age || 'N/A'}</p>
                <p>City: {consultation.city || 'N/A'}</p>
                <p>Support Reason: {consultation.supportReason || 'Not Specified'}</p>
              </div>
              <div className="card-actions">
                <button 
                  onClick={() => handleView(consultation.id)}
                  className="view-btn"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleDelete(consultation.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndividualPanel;