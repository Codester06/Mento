import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getData } from '../../../utils/awsService';
import './ConsultationDetails.css';

const ContactFormDetails = () => {
  const { id } = useParams();
  const [contactForm, setContactForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactFormDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const responseData = await getData('/contact_form');

        // Find the specific contact form by ID
        const contactFormData = responseData.data['data'].find(
          contact => contact.id === id
        );

        if (contactFormData) {
          setContactForm(contactFormData);
        } else {
          setError('Contact form submission not found');
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch contact form details');
      } finally {
        setLoading(false);
      }
    };

    fetchContactFormDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/admin/responses/contact-form-responses');
  };

  if (loading) {
    return <div className="loading-container">Loading contact form details...</div>;
  }

  if (!contactForm) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Contact Form Submission Not Found</h2>
          <p>The submission you're looking for doesn't exist or has been deleted.</p>
          <button onClick={handleBack} className="back-btn">Back to List</button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleBack} className="back-btn">Back to List</button>
        </div>
      </div>
    );
  }

  // Format the submission date if timestamp is available
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={handleBack} className="back-btn">← Back to List</button>
        <h1 className="details-title">Contact Form Submission Details</h1>
      </div>

      <div className="details-card">
        <div className="details-section">
          <h2 className="section-title">Submission Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">{contactForm.fullName}</div>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <div className="info-value">{contactForm.email}</div>
            </div>
            <div className="info-item">
              <label>Subject</label>
              <div className="info-value">{contactForm.subject}</div>
            </div>
            {contactForm.submissionDate && (
              <div className="info-item">
                <label>Submission Date</label>
                <div className="info-value">{formatDate(contactForm.submissionDate)}</div>
              </div>
            )}
          </div>
        </div>

        <div className="details-section">
          <h2 className="section-title">Message Details</h2>
          <div className="info-item full-width">
            <label>Message Content</label>
            <div className="info-value message-content">
              {contactForm.message}
            </div>
          </div>
        </div>

        <div className="details-footer">
          <div className="submission-id">Submission ID: {contactForm.id}</div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormDetails;