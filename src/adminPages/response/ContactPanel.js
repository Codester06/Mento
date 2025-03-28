import React, { useState, useEffect } from 'react';
import { getData, deleteData } from '../../utils/awsService';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css'; 

const ContactFormPanel = () => {
  const [contactForms, setContactForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactForms = async () => {
      try {
        setLoading(true);
        setError(null);

        const responseData = await getData('/contact_form');

        // Extract contact form data
        let contactFormData = responseData.data['data'];

        // Transform data to extract specific fields
        const processedContactForms = contactFormData.map(contact => ({
          id: contact.id || null,
          fullName: contact.fullName || 'Unknown',
          email: contact.email || '',
          subject: contact.subject || '',
          message: contact.message || ''
        }));

        setContactForms(processedContactForms);
      } catch (error) {
        setError(error.message || 'Failed to fetch contact forms');
        setContactForms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContactForms();
    const intervalId = setInterval(fetchContactForms, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="loading-container">Loading contact forms...</div>;
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
    navigate(`/admin/responses/contact-form-responses/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact form submission?')) {
      try {
        await deleteData('contact_form', id);
        
        setContactForms(prevContactForms => 
          prevContactForms.filter(contact => contact.id !== id)
        );
      } catch (error) {
        console.error('Error deleting contact form:', error);
        alert('Failed to delete contact form.');
      }
    }
  };

  const handleBack = () => {
    navigate('/admin/admin-dashboard');
  };

  return (
    <div className="admin-container">
      <button onClick={handleBack} className="back-btn">← Back to Dashboard</button>

      <h1 className="admin-title">Contact Form Submissions Admin Panel</h1>
      
      {contactForms.length === 0 ? (
        <div className="no-data-container">
          <p className="no-data">No contact form submissions found.</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Reload Data
          </button>
        </div>
      ) : (
        <div className="consultations-grid">
          {contactForms.map((contact) => (
            <div key={contact.id} className="consultation-card">
              <div className="card-header">
                <h3 className="client-name">{contact.fullName}</h3>
              </div>
              <div className="card-content">
                <p>Email: {contact.email}</p>
                <p>Subject: {contact.subject}</p>
              </div>
              <div className="card-actions">
                <button 
                  onClick={() => handleView(contact.id)}
                  className="view-btn"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleDelete(contact.id)}
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

export default ContactFormPanel;