import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../utils/firebaseConfig'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css'; // We'll create this CSS file next

const AdminPanel = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Reference to the consultations in Firebase
    const consultationsRef = ref(database, 'mental_wellness_consultations');
    
    // Set up the listener for data changes
    const unsubscribe = onValue(consultationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object of objects to an array with IDs
        const consultationsList = Object.entries(data).map(([id, values]) => ({
          id,
          ...values
        }));
        setConsultations(consultationsList);
      } else {
        setConsultations([]);
      }
      setLoading(false);
    });
    
    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleView = (id) => {
    navigate(`/admin/responses/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      try {
        const consultationRef = ref(database, `mental_wellness_consultations/${id}`);
        await remove(consultationRef);
        // No need to update state manually as the onValue listener will handle it
      } catch (error) {
        console.error('Error deleting consultation:', error);
        alert('Failed to delete consultation.');
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Loading consultations...</div>;
  }

  return (
    <div className="admin-container">
      <h1 className="admin-title">Mental Wellness Consultations Admin Panel</h1>
      
      {consultations.length === 0 ? (
        <p className="no-data">No consultations found.</p>
      ) : (
        <div className="consultations-grid">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="consultation-card">
              <div className="card-header">
                <h3 className="client-name">{consultation.fullName}</h3>
                <p className="client-email">{consultation.email}</p>
              </div>
              <div className="card-actions">
                <button 
                  onClick={() => handleView(consultation.id)}
                  className="view-btn"
                >
                  View
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

export default AdminPanel;