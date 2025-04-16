import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './demo_1.css'; // Import your CSS file for styling

const PaymentStatus = () => {
  const [status, setStatus] = useState('loading');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // API Gateway endpoint for status check
  const STATUS_API_ENDPOINT = 'https://9blcigs1f3.execute-api.ap-south-1.amazonaws.com/prod';

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        // Get transaction ID from URL parameters
        const urlParams = new URLSearchParams(location.search);
        const merchantTransactionId = urlParams.get('transactionId') || localStorage.getItem('transactionId');
        
        if (!merchantTransactionId) {
          setError('Transaction ID not found');
          setStatus('error');
          return;
        }
        
        // Call your Lambda function to check payment status
        const response = await fetch(`${STATUS_API_ENDPOINT}/${merchantTransactionId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch payment status');
        }
        
        setPaymentDetails(data);
        setStatus(data.status || 'unknown');
      } catch (err) {
        console.error('Error checking payment status:', err);
        setError(err.message || 'Something went wrong');
        setStatus('error');
      }
    };

    checkPaymentStatus();
  }, [location]);

  const getStatusDisplay = () => {
    switch (status) {
      case 'loading':
        return { icon: '⏳', title: 'Checking payment status...', className: 'loading' };
      case 'PAYMENT_SUCCESS':
        return { icon: '✅', title: 'Payment Successful!', className: 'success' };
      case 'PAYMENT_PENDING':
        return { icon: '⏳', title: 'Payment Pending', className: 'pending' };
      case 'PAYMENT_FAILED':
        return { icon: '❌', title: 'Payment Failed', className: 'failed' };
      case 'error':
        return { icon: '⚠️', title: 'Error', className: 'error' };
      default:
        return { icon: '❓', title: 'Unknown Status', className: 'unknown' };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="status-container">
      <div className={`status-card ${statusDisplay.className}`}>
        <div className="status-icon">{statusDisplay.icon}</div>
        <h2>{statusDisplay.title}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {paymentDetails && (
          <div className="payment-details">
            <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
            {paymentDetails.fullResponse && paymentDetails.fullResponse.amount && (
              <p><strong>Amount:</strong> ₹{(paymentDetails.fullResponse.amount / 100).toFixed(2)}</p>
            )}
            {paymentDetails.fullResponse && paymentDetails.fullResponse.responseCode && (
              <p><strong>Response Code:</strong> {paymentDetails.fullResponse.responseCode}</p>
            )}
          </div>
        )}
        
        <div className="action-buttons">
          <button 
            className="primary-button"
            onClick={() => navigate('/')}
          >
            Back to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus; 