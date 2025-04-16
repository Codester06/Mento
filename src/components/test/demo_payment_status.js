import { useState, useEffect } from 'react';

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff'
  },
  header: {
    backgroundColor: '#5f259f',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
    marginBottom: '20px',
    borderRadius: '6px 6px 0 0',
    marginTop: '-20px',
    marginLeft: '-20px',
    marginRight: '-20px'
  },
  statusContainer: {
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  iconContainer: {
    marginBottom: '15px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0'
  },
  description: {
    color: '#666',
    marginBottom: '20px'
  },
  detailsContainer: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  },
  lastRow: {
    borderBottom: 'none'
  },
  label: {
    color: '#666',
    fontWeight: 'bold'
  },
  value: {
    fontWeight: 'normal'
  },
  button: {
    backgroundColor: '#5f259f',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
    width: '100%'
  }
};

export default function PaymentStatusPage() {
  const [status, setStatus] = useState('loading');
  const [transactionDetails, setTransactionDetails] = useState({
    amount: '₹1,499.00',
    orderId: 'ORD123456789',
    paymentMethod: 'PhonePe Wallet',
    timestamp: new Date().toLocaleString(),
    transactionId: ''
  });

  // Simulate fetching payment status (handle POST request)
  useEffect(() => {
    // Check if the request is a POST request
    const handlePostRequest = async () => {
      try {
        const response = await fetch(window.location.href, { method: 'POST' });
        const data = await response.json();
        console.log("POST Response:", data);

        const statusParam = data?.status; // Example of handling status
        const transactionIdParam = data?.transactionId; // Example of handling transactionId

        // Set state based on the received status
        if (statusParam === 'failed') {
          setStatus('failed');
        } else if (statusParam === 'pending') {
          setStatus('pending');
        } else {
          setStatus('success'); // Default for demo
        }

        // Update transaction details if available
        setTransactionDetails((prevDetails) => ({
          ...prevDetails,
          transactionId: transactionIdParam
        }));
      } catch (error) {
        console.error('Error handling POST request:', error);
        setStatus('failed'); // Fallback to failed status in case of error
      }
    };

    // Call handlePostRequest if it's a POST request (e.g., PhonePe redirection)
    if (window.location.search) {
      handlePostRequest();
    } else {
      setStatus('failed'); // Default to failed if no POST data
    }
  }, []);

  const getStatusInfo = () => {
    switch (status) {
      case 'success':
        return {
          icon: '✅',
          title: 'Payment Successful!',
          description: 'Your transaction has been completed successfully. A confirmation has been sent to your registered email address.',
          color: '#e6f7e6',
          borderColor: '#c3e6c3'
        };
      case 'failed':
        return {
          icon: '❌',
          title: 'Payment Failed',
          description: 'We couldn\'t process your payment. Please check your payment details and try again.',
          color: '#ffebeb',
          borderColor: '#f5c2c2'
        };
      case 'pending':
        return {
          icon: '⏳',
          title: 'Payment Pending',
          description: 'Your payment is being processed. Please do not close this window. This may take a few moments.',
          color: '#fff8e6',
          borderColor: '#ffe0b2'
        };
      default:
        return {
          icon: '🔄',
          title: 'Processing Payment...',
          description: 'Please wait while we confirm your payment status with PhonePe...',
          color: '#e6f0ff',
          borderColor: '#c2d6ff'
        };
    }
  };

  const statusInfo = getStatusInfo();
  
  const statusContainerStyle = {
    ...styles.statusContainer,
    backgroundColor: statusInfo.color,
    border: `1px solid ${statusInfo.borderColor}`
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>Payment Status</h1>
      </div>
      
      <div style={statusContainerStyle}>
        <div style={styles.iconContainer}>
          <span style={{ fontSize: '48px' }}>{statusInfo.icon}</span>
        </div>
        <h2 style={styles.title}>{statusInfo.title}</h2>
        <p style={styles.description}>{statusInfo.description}</p>
      </div>
      
      <div style={styles.detailsContainer}>
        <div style={styles.detailRow}>
          <span style={styles.label}>Amount:</span>
          <span style={styles.value}>{transactionDetails.amount}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Order ID:</span>
          <span style={styles.value}>{transactionDetails.orderId}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Transaction ID:</span>
          <span style={styles.value}>{transactionDetails.transactionId}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.label}>Payment Method:</span>
          <span style={styles.value}>{transactionDetails.paymentMethod}</span>
        </div>
        <div style={{...styles.detailRow, ...styles.lastRow}}>
          <span style={styles.label}>Date & Time:</span>
          <span style={styles.value}>{transactionDetails.timestamp}</span>
        </div>
      </div>
      
      <button style={styles.button} onClick={() => window.location.href = '/'}>
        {status === 'success' ? 'Back to Home' : status === 'failed' ? 'Try Again' : 'Check Status'}
      </button>
    </div>
  );
}
