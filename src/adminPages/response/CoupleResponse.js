import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, deleteData } from "../../utils/awsService";
import "./AdminPanel.css";

const CouplePanel = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        setError(null);

        const responseData = await getData("/couple");
        // console.log('Full Raw Response:', responseData);

        // Extract consultation data
        let consultationData = responseData.data["data"];
        // console.log('Processed Consultation Data:', consultationData);

        // Transform data to extract specific fields
        const processedConsultations = consultationData.map((consultation) => ({
          // Separate extraction of key fields
          id: consultation.id || null,
          name: consultation.name || "Unknown",
          age: consultation.age || "N/A",
          timestamp: consultation.timestamp || consultation.createdAt || new Date().toISOString(),

          // Optional: Include other relevant fields if needed
          email: consultation.email || "",
          supportReason: consultation.supportReason || "",
          city: consultation.city || "",
        }));
        const sortedConsultations = processedConsultations.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        setConsultations(sortedConsultations);
      } catch (error) {
        console.error("Error in fetching consultations:", error);
        setError(error.message || "Failed to fetch consultations");
        setConsultations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
    const intervalId = setInterval(fetchConsultations, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleView = (id) => {
    navigate(`/admin/responses/couple-responses/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this consultation?")) {
      try {
        await deleteData("/couple", id);

        setConsultations((prevConsultations) =>
          prevConsultations.filter((consultation) => consultation.id !== id)
        );
      } catch (error) {
        console.error("Error deleting consultation:", error);
        alert("Failed to delete consultation.");
      }
    }
  };
 // Format date for display
 const formatDateTime = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch (error) {
    return "Unknown Date";
  }
};
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
  const handleBack = () => {
    navigate("/admin/admin-dashboard");
  };

  return (
    <div className="admin-container">
      <button onClick={handleBack} className="back-btn">
        ← Back to Dashboard
      </button>

      <h1 className="admin-title">Couples Consultations Admin Panel</h1>

      {consultations.length === 0 ? (
        <div className="no-data-container">
          <p className="no-data">No consultations found.</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            Reload Data
          </button>
        </div>
      ) : (
        <div className="consultations-grid">
          {consultations.map((consultation) => (
            <div key={consultation.id} className="consultation-card">
              <div className="card-header">
                <h3 className="client-name">{consultation.name}</h3>
                <div className="timestamp">{formatDateTime(consultation.timestamp)}</div>

              </div>
              <div className="card-content">
                <p>Email: {consultation.email}</p>
                <p>City: {consultation.city}</p>
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

export default CouplePanel;
