import React, { useState } from 'react';
import './demo.css'; // Import your CSS file for styling

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    mobile: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API Gateway endpoint URL
  const API_ENDPOINT = 'https://9blcigs1f3.execute-api.ap-south-1.amazonaws.com/prod';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Validate form
      if (!formData.amount || !formData.mobile || !formData.name) {
        throw new Error('Please fill all fields');
      }
      
      if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
        throw new Error('Please enter a valid amount');
      }
      
      if (!/^\d{10}$/.test(formData.mobile)) {
        throw new Error('Please enter a valid 10-digit mobile number');
      }
      
      // Make API call to your Lambda function
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed');
      }
      
      // Redirect to PhonePe payment page
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('No redirect URL received');
      }
      
    } catch (err) {
      setError(err.message || 'Something went wrong');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>PhonePe Payment</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength="10"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="1"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;