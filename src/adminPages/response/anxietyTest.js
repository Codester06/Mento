import React, { useState, useEffect } from 'react';
import { getDataBS, deleteDataBS } from '../../utils/awsService';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AnxietyTestPanel = () => {
  const [anxietyTests, setAnxietyTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepressionTests = async () => {
      try {
        setLoading(true);
        setError(null);

        const responseData = await getDataBS('/depressiontest');

        // Extract anxiety test data
        let anxietyTestData = responseData.data['data'];

        // Transform data to extract specific fields
        const processedDepressionTests = anxietyTestData.map(test => ({
          id: test.id || null,
          fullName: test.fullName || 'Anonymous',
          email: test.email || '',
          submissionDate: test.submissionDate || new Date().toISOString(),
          score: test.score || 0,
          severity: getSeverityLabel(test.score || 0)
        }));

        // Sort based on submission date
        const sortedTests = processedDepressionTests.sort((a, b) => {
          const dateA = new Date(a.submissionDate);
          const dateB = new Date(b.submissionDate);
          return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setAnxietyTests(sortedTests);
      } catch (error) {
        setError(error.message || 'Failed to fetch anxiety tests');
        setAnxietyTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepressionTests();
    const intervalId = setInterval(fetchDepressionTests, 30000);
    
    return () => clearInterval(intervalId);
  }, [sortOrder]);

  // Helper function to determine severity label based on score
  const getSeverityLabel = (score) => {
    if (score <= 4) return 'Minimal';
    if (score <= 9) return 'Mild';
    if (score <= 14) return 'Moderate';
    if (score <= 19) return 'Moderately Severe';
    return 'Severe';
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'newest' ? 'oldest' : 'newest');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  if (loading) {
    return <div className="loading-container">Loading anxiety test submissions...</div>;
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
    navigate(`/admin/responses/anxiety-test/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this anxiety test submission?')) {
      try {
        await deleteDataBS('/anxietytest', id);
        
        setAnxietyTests(prevTests => 
          prevTests.filter(test => test.id !== id)
        );
      } catch (error) {
        console.error('Error deleting anxiety test:', error);
        alert('Failed to delete anxiety test.');
      }
    }
  };

  const handleBack = () => {
    navigate('/admin/admin-dashboard');
  };

  // Function to determine card color based on severity
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Minimal': return 'severity-minimal';
      case 'Mild': return 'severity-mild';
      case 'Moderate': return 'severity-moderate';
      case 'Moderately Severe': return 'severity-moderately-severe';
      case 'Severe': return 'severity-severe';
      default: return '';
    }
  };

  return (
    <div className="admin-container">
      <button onClick={handleBack} className="back-btn">← Back to Dashboard</button>

      <h1 className="admin-title">Depression Test Submissions Admin Panel</h1>
      
      <div className="controls-container">
        <button onClick={toggleSortOrder} className="sort-btn">
          {sortOrder === 'newest' ? 'Showing: Newest First' : 'Showing: Oldest First'}
        </button>
      </div>
      
      {anxietyTests.length === 0 ? (
        <div className="no-data-container">
          <p className="no-data">No anxiety test submissions found.</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Reload Data
          </button>
        </div>
      ) : (
        <div className="consultations-grid">
          {anxietyTests.map((test) => (
            <div key={test.id} className={`consultation-card ${getSeverityColor(test.severity)}`}>
              <div className="card-header">
                <h3 className="client-name">{test.fullName}</h3>
              </div>
              <div className="card-content">
                <p>Email: {test.email}</p>
                <p>Submission Date: {formatDate(test.submissionDate)}</p>
                <p>Score: {test.score} - <span className="severity-label">{test.severity}</span></p>
              </div>
              <div className="card-actions">
                <button 
                  onClick={() => handleView(test.id)}
                  className="view-btn"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleDelete(test.id)}
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

export default AnxietyTestPanel;