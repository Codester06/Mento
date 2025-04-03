import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { postDataBS } from '../../utils/awsService';

const ExpertsUploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [uploadedExperts, setUploadedExperts] = useState([]);
  
  // Original experts data
  const experts = [
    {
      id: 1,
      name: "Pratibha",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-09-at-09.40.10_0c45eba4.jpg",
      certifications: "One to one counseling, group counseling, couple counseling all dimensions of cases",
      expertise: "Depression, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "3-6 Years"
    },
    {
      id: 2,
      name: "Saniya",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/IMG_3241.jpg",
      certifications: "CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification, Choice theory and reality therapy",
      expertise: "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    },
    {
      id: 3,
      name: "Pallavi Sengar",
      position: "Clinical Psychologist",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.42.28_8251f87f.jpg",
      certifications: "RCI Registered, CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification, Child counseling",
      expertise: "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    },
    {
      id: 4,
      name: "Chandan Raj",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.44.20_21d439d0.jpg",
      certifications: " ",
      expertise: "Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "3-6 Years"
    },
    {
      id: 5,
      name: "Sandali Saruparia",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.42.55_ed161cba.jpg",
      certifications: "Mindfulness Therapy, Counseling and family therapy",
      expertise: "Depression, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    },
    {
      id: 6,
      name: "Arjita Jain",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/11/WhatsApp-Image-2024-11-10-at-21.44.46_2d061c1e-1.jpg",
      certifications: "CBT Certification, ACT certification, Hypnotherapy certificate of level 1",
      expertise: "Anxiety Disorders, Depression, Stress Management, Relationship Counseling",
      experience: "1-3 Years"
    },
    {
      id: 7,
      name: "Aritri Ghosh",
      position: "Counselor",
      imageSrc: "https://mento.in/wp-content/uploads/2024/12/Screenshot_20241210-1431002.png",
      certifications: "CBT Certification, Mindfulness Therapy, Trauma/PTSD Certification",
      expertise: "Anxiety Disorders, Depression, Trauma and PTSD, Stress Management, Relationship Counseling, Child and Adolescent Therapy (CBT)",
      experience: "1-3 Years"
    }
  ];

  // Filter out already uploaded experts
  const availableExperts = experts.filter(expert => 
    !uploadedExperts.some(uploaded => uploaded.originalId === expert.id)
  );

  const handleUploadExpert = async (expert) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setSelectedExpert(expert);
    
    try {
      // Create a copy of the expert with UUID-style ID and add timestamp
      const expertWithUUID = {
        ...expert,
        originalId: expert.id, // Keep original ID for reference
        id: uuidv4(), // Generate a UUID
        uploadedAt: new Date().toISOString() // Add timestamp
      };
      
      // Post the individual expert to your backend API
      const response = await postDataBS('/expert_table', { expert: expertWithUUID });
      console.log(response);
      
      // Add to uploaded experts tracking
      setUploadedExperts(prev => [...prev, expertWithUUID]);
      
      // Show success message
      setResult(`Expert "${expert.name}" successfully added to database!`);
    } catch (error) {
      console.error('Failed to add expert to database:', error);
      
      let errorMessage = `Failed to add expert "${expert.name}": `;
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage += error.response.data.message;
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += "Unknown error occurred. Please try again later.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setSelectedExpert(null);
    }
  };

  return (
    <div className="experts-uploader-container" style={{ padding: '20px' }}>
      <h2>Upload Individual Experts to Database</h2>
      <p>Click on an expert below to upload them individually to the database.</p>
      
      {availableExperts.length === 0 ? (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#d9edf7', color: '#31708f', borderRadius: '4px' }}>
          All experts have been uploaded to the database.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {availableExperts.map(expert => (
            <div 
              key={expert.id} 
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: selectedExpert && selectedExpert.id === expert.id ? '#f5f5f5' : 'white',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading && selectedExpert && selectedExpert.id === expert.id ? 0.7 : 1,
              }}
              onClick={() => !isLoading && handleUploadExpert(expert)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <img 
                  src={expert.imageSrc} 
                  alt={expert.name} 
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', marginRight: '15px' }}
                />
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{expert.name}</h3>
                  <p style={{ margin: '0', color: '#666' }}>{expert.position}</p>
                </div>
              </div>
              <p><strong>Experience:</strong> {expert.experience}</p>
              <p><strong>Expertise:</strong> {expert.expertise}</p>
              <div style={{ marginTop: '10px' }}>
                <button
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: isLoading && selectedExpert && selectedExpert.id === expert.id ? '#cccccc' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isLoading && selectedExpert && selectedExpert.id === expert.id ? 'Uploading...' : 'Upload Expert'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {uploadedExperts.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>Uploaded Experts</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {uploadedExperts.map(expert => (
              <li key={expert.id} style={{ 
                padding: '10px', 
                margin: '5px 0', 
                backgroundColor: '#dff0d8', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <img 
                  src={expert.imageSrc} 
                  alt={expert.name} 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '15px' }}
                />
                <div>
                  <strong>{expert.name}</strong> - {expert.position}
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    Uploaded at: {new Date(expert.uploadedAt).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#dff0d8', color: '#3c763d', borderRadius: '4px' }}>
          {result}
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f2dede', color: '#a94442', borderRadius: '4px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ExpertsUploader;