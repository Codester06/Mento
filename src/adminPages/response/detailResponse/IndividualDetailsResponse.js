import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../../../utils/awsService";
import "./ConsultationDetails.css";

const IndividualDetails = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConsultationDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const responseData = await getData("/individual");
        // console.log('Full Raw Response:', responseData);

        // Find the specific consultation by ID
        const consultationData = responseData.data["data"].find(
          (consultation) => consultation.id === id
        );

        // console.log('Specific Consultation Data:', consultationData);

        if (consultationData) {
          setConsultation(consultationData);
        } else {
          setError("Consultation not found");
        }
      } catch (error) {
        console.error("Error in fetching consultation details:", error);
        setError(error.message || "Failed to fetch consultation details");
      } finally {
        setLoading(false);
      }
    };

    fetchConsultationDetails();
  }, [id]);

  const handleBack = () => {
    navigate("/admin/responses/individual-responses");
  };

  // Helper function to format array data
  const formatArrayData = (array) => {
    if (!array) return "";
    if (typeof array === "string") return array;
    return array.join(", ");
  };

  if (loading) {
    return (
      <div className="loading-container">
        Loading individual consultation details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleBack} className="back-btn">
            Back to List
          </button>
        </div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Individual Consultation Not Found</h2>
          <p>
            The consultation you're looking for doesn't exist or has been
            deleted.
          </p>
          <button onClick={handleBack} className="back-btn">
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={handleBack} className="back-btn">
          ← Back to Individual Consultations
        </button>
        <h1 className="details-title">Individual Consultation Details</h1>
      </div>

      <div className="details-card">
        <div className="details-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>Full Name</label>
              <div className="info-value">{consultation.name}</div>
            </div>
            <div className="info-item">
              <label>Email</label>
              <div className="info-value">{consultation.email}</div>
            </div>
            {consultation.phone && (
              <div className="info-item">
                <label>Phone</label>
                <div className="info-value">{consultation.phone}</div>
              </div>
            )}
            {consultation.age && (
              <div className="info-item">
                <label>Age</label>
                <div className="info-value">{consultation.age}</div>
              </div>
            )}
            {consultation.gender && (
              <div className="info-item">
                <label>Gender</label>
                <div className="info-value">{consultation.gender}</div>
              </div>
            )}
            {consultation.city && (
              <div className="info-item">
                <label>City</label>
                <div className="info-value">{consultation.city}</div>
              </div>
            )}
          </div>
        </div>

        {consultation.supportReason && (
          <div className="details-section">
            <h2 className="section-title">Support Details</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Support Reason</label>
                <div className="info-value">{consultation.supportReason}</div>
              </div>
            </div>
          </div>
        )}

        <div className="details-section">
          <h2 className="section-title">Additional Information</h2>
          <div className="info-grid">
            {Object.entries(consultation).map(([key, value]) => {
              // Skip already displayed fields and id
              if (
                [
                  "id",
                  "name",
                  "email",
                  "phone",
                  "age",
                  "gender",
                  "city",
                  "supportReason",
                ].includes(key)
              ) {
                return null;
              }

              // Skip empty values
              if (value === null || value === undefined || value === "") {
                return null;
              }

              // Format the display value based on type
              let displayValue = value;
              if (typeof value === "boolean") {
                displayValue = value ? "Yes" : "No";
              } else if (Array.isArray(value)) {
                displayValue = formatArrayData(value);
              } else if (typeof value === "object") {
                displayValue = JSON.stringify(value);
              }

              return (
                <div key={key} className="info-item">
                  <label>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <div className="info-value">{displayValue}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="details-footer">
          <div className="submission-info">
            <div className="submission-id">
              Submission ID: {consultation.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDetails;
