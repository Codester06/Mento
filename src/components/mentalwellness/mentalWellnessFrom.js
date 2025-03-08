import React, { useState } from 'react';
import './MultiStepForm.css';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    billing: 'monthly',
    experience: '',
    ageGroup: '',
    preferredPlatform: '',
    preferredGenre: '',
    playFrequency: '',
    addOns: []
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle radio selection changes
  const handleRadioChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle checkbox changes for add-ons
  const handleAddOnChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevData => {
      if (checked) {
        return {
          ...prevData,
          addOns: [...prevData.addOns, value]
        };
      } else {
        return {
          ...prevData,
          addOns: prevData.addOns.filter(addon => addon !== value)
        };
      }
    });
  };

  // Move to next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Form submitted successfully!');
    console.log(formData);
  };

  // Step indicator component
  const StepIndicator = ({ number, title, subtitle, active }) => (
    <div className={`step-indicator-MN ${active ? 'active' : ''}`}>
      <div className="step-number-MN">
        {number}
      </div>
      <div className="step-text-MN">
        <p className="step-subtitle-MN">{subtitle}</p>
        <p className="step-title-MN">{title}</p>
      </div>
    </div>
  );

  // Render different form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step-MN form-step-1-MN">
            <h2 className="form-title-MN">Personal info</h2>
            <p className="form-subtitle-MN">Please provide your name, email address, and phone number.</p>
            
            <div className="form-field-MN">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Stephen King"
              />
            </div>
            
            <div className="form-field-MN">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. stephenking@lorem.com"
              />
            </div>
            
            <div className="form-field-MN">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +1 234 567 890"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step-MN form-step-2-MN">
            <h2 className="form-title-MN">Gaming Preferences</h2>
            <p className="form-subtitle-MN">Select your preferred gaming options.</p>
            
            <div className="form-field-MN">
              <p className="form-label-MN">What is your gaming experience level?</p>
              <div className="radio-group-MN">
                {['Beginner', 'Intermediate', 'Advanced', 'Professional'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.experience === option ? 'selected' : ''}`}
                    onClick={() => handleRadioChange('experience', option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.experience === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-field-MN">
              <p className="form-label-MN">Which age group do you belong to?</p>
              <div className="radio-group-MN">
                {['Under 18', '18-24', '25-34', '35-44', '45 or older'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.ageGroup === option ? 'selected' : ''}`}
                    onClick={() => handleRadioChange('ageGroup', option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.ageGroup === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step-MN form-step-3-MN">
            <h2 className="form-title-MN">Gaming Habits</h2>
            <p className="form-subtitle-MN">Tell us more about how you play games.</p>
            
            <div className="form-field-MN">
              <p className="form-label-MN">What's your preferred gaming platform?</p>
              <div className="radio-grid-MN">
                {['PC', 'Console', 'Mobile', 'VR'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.preferredPlatform === option ? 'selected' : ''}`}
                    onClick={() => handleRadioChange('preferredPlatform', option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.preferredPlatform === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-field-MN">
              <p className="form-label-MN">What's your favorite game genre?</p>
              <div className="radio-grid-MN">
                {['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Simulation', 'Puzzle', 'Other'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.preferredGenre === option ? 'selected' : ''}`}
                    onClick={() => handleRadioChange('preferredGenre', option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.preferredGenre === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-field-MN">
              <p className="form-label-MN">How often do you play games?</p>
              <div className="radio-group-MN">
                {['Daily', 'A few times a week', 'Once a week', 'A few times a month', 'Rarely'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.playFrequency === option ? 'selected' : ''}`}
                    onClick={() => handleRadioChange('playFrequency', option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.playFrequency === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step-MN form-step-4-MN">
            <h2 className="form-title-MN">Summary</h2>
            <p className="form-subtitle-MN">Review your information before submission.</p>
            
            <div className="summary-box-MN">
              <h3 className="summary-title-MN">Personal Information</h3>
              <div className="summary-section-MN">
                <p><strong>Name:</strong> {formData.name || 'Not provided'}</p>
                <p><strong>Email:</strong> {formData.email || 'Not provided'}</p>
                <p><strong>Phone:</strong> {formData.phone || 'Not provided'}</p>
              </div>
              
              <h3 className="summary-title-MN">Gaming Preferences</h3>
              <div className="summary-section-MN">
                <p><strong>Experience Level:</strong> {formData.experience || 'Not selected'}</p>
                <p><strong>Age Group:</strong> {formData.ageGroup || 'Not selected'}</p>
              </div>
              
              <h3 className="summary-title-MN">Gaming Habits</h3>
              <div className="summary-section-MN">
                <p><strong>Preferred Platform:</strong> {formData.preferredPlatform || 'Not selected'}</p>
                <p><strong>Favorite Genre:</strong> {formData.preferredGenre || 'Not selected'}</p>
                <p><strong>Play Frequency:</strong> {formData.playFrequency || 'Not selected'}</p>
              </div>
            </div>
            
            <div className="submit-text-MN">
              <p>Click "Confirm" to submit your responses.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form-MN">
      {/* Left sidebar with steps */}
      <div className="sidebar-MN">
        <div className="steps-container-MN">
          <StepIndicator
            number="1"
            subtitle="Step 1"
            title="YOUR INFO"
            active={currentStep === 1}
          />
          <StepIndicator
            number="2"
            subtitle="Step 2"
            title="PREFERENCES"
            active={currentStep === 2}
          />
          <StepIndicator
            number="3"
            subtitle="Step 3"
            title="HABITS"
            active={currentStep === 3}
          />
          <StepIndicator
            number="4"
            subtitle="Step 4"
            title="SUMMARY"
            active={currentStep === 4}
          />
        </div>
        
        {/* Decorative circles */}
        <div className="decorative-circles-MN">
          <div className="circle-1-MN"></div>
          <div className="circle-2-MN"></div>
        </div>
      </div>
      
      {/* Right content area */}
      <div className="form-container-MN">
        <form onSubmit={handleSubmit}>
          <div className="form-content-MN">
            {renderStep()}
          </div>
          
          <div className="form-buttons-MN">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="back-button-MN"
              >
                Go Back
              </button>
            )}
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="next-button-MN"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="confirm-button-MN"
              >
                Confirm
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;

