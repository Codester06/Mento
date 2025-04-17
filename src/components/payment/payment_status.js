import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './payment_status.css'; // External CSS

export default function PaymentStatusPage() {
  const location = useLocation();
  const [status, setStatus] = useState('loading');
  const [transactionDetails, setTransactionDetails] = useState({
    amount: '₹1,499.00',
    orderId: 'ORD123456789',
    paymentMethod: 'PhonePe Wallet',
    timestamp: new Date().toLocaleString(),
    transactionId: ''
  });

  useEffect(() => {
    const handlePostRequest = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const merchantTransactionId = urlParams.get('txnId') || localStorage.getItem('transactionId');
        
        if (!merchantTransactionId) {
          setStatus('error');
          return;
        }

        // Replace with your actual Lambda status endpoint
        const response = await fetch(`${process.env.REACT_APP_STATUS_API_ENDPOINT}/${merchantTransactionId}`);
        const data = await response.json();
        console.log("POST Response:", data);

        const statusParam = data?.status;
        const transactionIdParam = data?.transactionId;

        if (statusParam === 'failed') setStatus('failed');
        else if (statusParam === 'pending') setStatus('pending');
        else setStatus('success');

        setTransactionDetails(prev => ({
          ...prev,
          transactionId: transactionIdParam
        }));
      } catch (error) {
        console.error('Error handling POST request:', error);
        setStatus('failed');
      }
    };

    if (window.location.search) {
      handlePostRequest();
    } else {
      setStatus('failed');
    }
  }, [location.search]);

  const getStatusInfo = () => {
    switch (status) {
      case 'success':
        return {
          icon: '✅',
          title: 'Payment Successful!',
          description: 'Your transaction has been completed successfully.',
          colorClass: 'success'
        };
      case 'failed':
        return {
          icon: '❌',
          title: 'Payment Failed',
          description: 'We couldn\'t process your payment.',
          colorClass: 'failed'
        };
      case 'pending':
        return {
          icon: '⏳',
          title: 'Payment Pending',
          description: 'Your payment is being processed.',
          colorClass: 'pending'
        };
      default:
        return {
          icon: '🔄',
          title: 'Processing Payment...',
          description: 'Please wait while we confirm your payment status.',
          colorClass: 'processing'
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>Payment Status</h1>
      </div>

      <div className={`payment-status ${statusInfo.colorClass}`}>
        <div className="icon">{statusInfo.icon}</div>
        <h2>{statusInfo.title}</h2>
        <p>{statusInfo.description}</p>
      </div>

      <div className="payment-details">
        <div className="row"><span>Amount:</span><span>{transactionDetails.amount}</span></div>
        <div className="row"><span>Order ID:</span><span>{transactionDetails.orderId}</span></div>
        <div className="row"><span>Transaction ID:</span><span>{transactionDetails.transactionId}</span></div>
        <div className="row"><span>Payment Method:</span><span>{transactionDetails.paymentMethod}</span></div>
        <div className="row"><span>Date & Time:</span><span>{transactionDetails.timestamp}</span></div>
      </div>

      <button onClick={() => window.location.href = '/'}>
        {status === 'success' ? 'Back to Home' : status === 'failed' ? 'Try Again' : 'Check Status'}
      </button>
    </div>
  );
}
