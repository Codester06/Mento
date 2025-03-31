import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDataBS } from '../../../utils/awsService';
import './ConsultationDetails.css';

const DepressionTestDetails = () => {
  const { id } = useParams();
  const [depressionTest, setDepressionTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepressionTestDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const responseData = await getDataBS('/depressiontest');

        // Find the specific depression test by ID
        const depressionTestData = responseData.data['data'].find(
          test => test.id === id
        );

        if (depressionTestData) {
          // Process and normalize the data structure
          const processedTestData = {
            id: depressionTestData.id,
            fullName: depressionTestData.fullName || 'Anonymous', 
            email: depressionTestData.email || '',
            submissionDate: depressionTestData.submissionDate || new Date().toISOString(),
            score: typeof depressionTestData.score === 'number' ? depressionTestData.score : 
                  (depressionTestData.detailedAssessment?.totalScore || 0),
            // Ensure responses are in the expected format
            responses: Array.isArray(depressionTestData.responses) ? depressionTestData.responses : 
                      (depressionTestData.detailedAssessment?.detailedResponses?.map(response => ({
                        question: response.questionText,
                        answer: response.answerText || 'No response'
                      })) || []),
            comments: depressionTestData.comments || ''
          };
          
          setDepressionTest(processedTestData);
        } else {
          setError('Depression test submission not found');
        }
      } catch (error) {
        setError(error.message || 'Failed to fetch depression test details');
      } finally {
        setLoading(false);
      }
    };

    fetchDepressionTestDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/admin/responses/depression-test');
  };

  if (loading) {
    return <div className="loading-container">Loading depression test details...</div>;
  }

  if (!depressionTest) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Depression Test Submission Not Found</h2>
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

  // Format the submission date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleString();
  };

  // Helper function to determine severity label based on score
  const getSeverityLabel = (score) => {
    if (score <= 4) return 'Minimal';
    if (score <= 9) return 'Mild';
    if (score <= 14) return 'Moderate';
    if (score <= 19) return 'Moderately Severe';
    return 'Severe';
  };

  // Helper function to get severity class
  const getSeverityClass = (score) => {
    const severity = getSeverityLabel(score);
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
    <div className="details-container">
      <div className="details-header">
        <button onClick={handleBack} className="back-btn">← Back to List</button>
        <h1 className="details-title">Depression Test Submission Details</h1>
      </div>

      <div className={`details-card ${getSeverityClass(depressionTest.score)}`}>
        <div className="details-section">
          <h2 className="section-title">Submission Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">{depressionTest.fullName}</div>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <div className="info-value">{depressionTest.email}</div>
            </div>
            <div className="info-item">
              <label>Submission Date</label>
              <div className="info-value">{formatDate(depressionTest.submissionDate)}</div>
            </div>
            <div className="info-item">
              <label>Total Score</label>
              <div className="info-value score-value">
                {depressionTest.score} 
                <span className={`severity-badge ${getSeverityClass(depressionTest.score)}`}>
                  {getSeverityLabel(depressionTest.score)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2 className="section-title">Test Responses</h2>
          <div className="info-item full-width">
            <table className="response-table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Response</th>
                </tr>
              </thead>
              <tbody>
                {depressionTest.responses && depressionTest.responses.map((response, index) => (
                  <tr key={index}>
                    <td>{response.question || `Question ${index + 1}`}</td>
                    <td>{response.answer || 'No response'}</td>
                  </tr>
                ))}
                {!depressionTest.responses && (
                  <tr>
                    <td colSpan="2">No detailed responses available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {depressionTest.comments && (
          <div className="details-section">
            <h2 className="section-title">Additional Comments</h2>
            <div className="info-item full-width">
              <div className="info-value message-content">
                {depressionTest.comments}
              </div>
            </div>
          </div>
        )}

        <div className="details-footer">
          <div className="submission-id">Submission ID: {depressionTest.id}</div>
        </div>
      </div>
    </div>
  );
};

export default DepressionTestDetails;