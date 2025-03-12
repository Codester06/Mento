import React, { useState, useRef } from 'react';
import './FormStyles.css';

const IndividualForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [errors, setErrors] = useState({});

  // Form refs
  const formRefs = {
    name: useRef(''),
    email: useRef(''),
    city: useRef(''),
    contactNo: useRef(''),
    guardianContactNo: useRef(''),
    profession: useRef(''),
    age: useRef(''),
    supportReason: useRef(''),
    otherSupportReason: useRef(''),
    feelingsReason: useRef(''),
    previousConsultation: useRef(''),
    preferredLanguage: useRef(''),
    otherLanguage: useRef(''),
    sessionDate: useRef(''),
    sessionTime: useRef(''),
    counselorGenderPreference: useRef(''),
    medicalConditions: useRef(''),
    referralSource: useRef(''),
    paymentMethod: useRef('')
  };

  // State to manage form display
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    contactNo: '',
    guardianContactNo: '',
    profession: '',
    age: '',
    supportReason: '',
    otherSupportReason: '',
    feelingsReason: '',
    previousConsultation: '',
    preferredLanguage: '',
    otherLanguage: '',
    sessionDate: '',
    sessionTime: '',
    counselorGenderPreference: '',
    medicalConditions: '',
    referralSource: '',
    paymentMethod: ''
  });

  // Profession options
  const professionOptions = [
    'Student',
    'Professional',
    'Self-employed',
    'Homemaker',
    'Retired',
    'Unemployed',
    'Other'
  ];

  // Feelings reason options
  const feelingsReasonOptions = [
    'Work-related stress',
    'Family issues',
    'Academic pressure',
    'Financial concerns',
    'Health issues',
    'Personal loss',
    'Relationship difficulties',
    'Identity/self-esteem issues',
    'Past trauma',
    'Other'
  ];

  // Social media platforms for referral
  const referralOptions = [
    'Instagram',
    'Facebook',
    'Twitter',
    'LinkedIn',
    'YouTube',
    'Friend/Family',
    'Healthcare provider',
    'Search engine',
    'Advertisement',
    'Other'
  ];

  // Handle form field changes - still using state for UI updates
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update the ref value
    if (formRefs[name]) {
      formRefs[name].current = value;
    }
    
    // Also update state for UI reactivity
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle dropdown selection changes
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    
    // Update the ref value
    if (formRefs[name]) {
      formRefs[name].current = value;
    }
    
    // Also update state for UI reactivity
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Handle radio selection changes
  const handleRadioChange = (name, value) => {
    // Update the ref value
    if (formRefs[name]) {
      formRefs[name].current = value;
    }
    
    // Also update state for UI reactivity
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.contactNo.trim()) newErrors.contactNo = "Contact number is required";
      if (!formData.age) newErrors.age = "Age is required";
      if (!formData.profession) newErrors.profession = "Profession is required";
    }
    
    // Step 2 validation
    else if (currentStep === 2) {
      if (!formData.supportReason) {
        newErrors.supportReason = "Please select a reason";
      } else if (formData.supportReason === 'Other' && !formData.otherSupportReason.trim()) {
        newErrors.otherSupportReason = "Please specify your reason";
      }
    }
    
    // Step 3 validation
    else if (currentStep === 3) {
      if (!formData.feelingsReason) newErrors.feelingsReason = "Please select a reason";
      if (!formData.previousConsultation) newErrors.previousConsultation = "Please select an option";
    }
    
    // Step 4 validation
    else if (currentStep === 4) {
      if (!formData.preferredLanguage) {
        newErrors.preferredLanguage = "Please select a language";
      } else if (formData.preferredLanguage === 'Other' && !formData.otherLanguage.trim()) {
        newErrors.otherLanguage = "Please specify your language";
      }
    }
    
    // Step 5 validation
    else if (currentStep === 5) {
      if (!formData.sessionDate) newErrors.sessionDate = "Please select a date";
      if (!formData.sessionTime) newErrors.sessionTime = "Please select a time";
    }
    
    // Step 6 validation
    else if (currentStep === 6) {
      if (!formData.counselorGenderPreference) newErrors.counselorGenderPreference = "Please select an option";
      if (!formData.medicalConditions) newErrors.medicalConditions = "Please select an option";
      if (!formData.referralSource) newErrors.referralSource = "Please select an option";
    }
    
    // Step 7 validation
    else if (currentStep === 7) {
      if (!formData.paymentMethod) newErrors.paymentMethod = "Please select a payment method";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to next step
  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        // Scroll to top of form when changing steps
        document.querySelector('.form-container-MN').scrollTop = 0;
      }
    } else {
      // Scroll to the first error field
      const firstErrorField = document.querySelector('.error-message-MN');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of form when changing steps
      document.querySelector('.form-container-MN').scrollTop = 0;
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Extract all data from refs
      const formRefData = Object.keys(formRefs).reduce((acc, key) => {
        acc[key] = formRefs[key].current;
        return acc;
      }, {});
      
      // Log the form data to the console
      console.log("Form data submitted:", formRefData);
      
      // Show success alert
      alert('Form submitted successfully! Your mental wellness consultation has been scheduled.');
    }
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

  // Render error message
  const renderError = (fieldName) => {
    if (errors[fieldName]) {
      return <p className="error-message-MN">{errors[fieldName]}</p>;
    }
    return null;
  };

  // Render different form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step-MN form-step-1-MN">
            <h2 className="form-title-MN">Personal Information</h2>
            <p className="form-subtitle-MN">Please provide your personal details for the consultation.</p>
            
            <div className='oneLineDetail'>
              <div className="form-field-MN fieldWidthName">
                <label>Full Name <span className="required-field">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.name.current = e.target.value; }}
                  placeholder="e.g. John Smith"
                  className={errors.name ? 'error-input' : ''}
                />
                {renderError('name')}
              </div>
              
              <div className="form-field-MN fieldWidthEmail">
                <label>Email Address <span className="required-field">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.email.current = e.target.value; }}
                  placeholder="e.g. johnsmith@example.com"
                  className={errors.email ? 'error-input' : ''}
                />
                {renderError('email')}
              </div>
            </div>
            
            <div className='oneLineDetail'>
              <div className="form-field-MN fieldWidthCity">
                <label>City <span className="required-field">*</span></label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.city.current = e.target.value; }}
                  placeholder="e.g. Bangalore"
                  className={errors.city ? 'error-input' : ''}
                />
                {renderError('city')}
              </div>

              <div className="form-field-MN fieldWidthAge">
                <label>Age <span className="required-field">*</span></label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.age.current = e.target.value; }}
                  placeholder="e.g. 30"
                  min="1"
                  max="120"
                  className={errors.age ? 'error-input' : ''}
                />
                {renderError('age')}
              </div>
            </div> 

            <div className='oneLineDetail'>
              <div className="form-field-MN fieldWidthNo"> 
                <label>Contact Number <span className="required-field">*</span></label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.contactNo.current = e.target.value; }}
                  placeholder="e.g. +91 9876543210"
                  className={errors.contactNo ? 'error-input' : ''}
                />
                {renderError('contactNo')}
              </div>
              
              <div className="form-field-MN fieldWidthNo">
                <label>Guardian's Contact Number <span className="required-field">*</span></label>
                <input
                  type="tel"
                  name="guardianContactNo"
                  value={formData.guardianContactNo}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.guardianContactNo.current = e.target.value; }}
                  placeholder="e.g. +91 9876543210"
                  className={errors.contactNo ? 'error-input' : ''}
                />
              </div>
            </div>
            
            <div className="form-field-MN fieldWidthPro">
              <label>Profession <span className="required-field">*</span></label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleDropdownChange}
                onBlur={(e) => { formRefs.profession.current = e.target.value; }}
                className={errors.profession ? 'error-input' : ''}
              >
                <option value="" disabled>Select your profession</option>
                {professionOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {renderError('profession')}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step-MN form-step-2-MN">
            <h2 className="form-title-MN">Support Reason</h2>
            <p className="form-subtitle-MN">What is the main reason you're seeking mental wellness support? <span className="required-field">*</span></p>
            
            <div className="form-field-MN">
              <div className={`radio-group-MNI ${errors.supportReason ? 'error-border' : ''}`}>
                {[
                  'Stress and anxiety',
                  'Depression',
                  'Relationship issues',
                  'Work-life balance',
                  'Grief and loss',
                  'Trauma/PTSD',
                  'Other'
                ].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.supportReason === option ? 'selected' : ''}`}
                    onClick={() => {
                      handleRadioChange('supportReason', option);
                      formRefs.supportReason.current = option;
                    }}
                  >
                    <div className="radio-circle-MN">
                      {formData.supportReason === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError('supportReason')}
            </div>
            
            {formData.supportReason === 'Other' && (
              <div className="form-field-MN">
                <label>Please specify your reason <span className="required-field">*</span></label>
                <textarea
                  name="otherSupportReason"
                  value={formData.otherSupportReason}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.otherSupportReason.current = e.target.value; }}
                  placeholder="Please describe your reason for seeking support..."
                  rows="4"
                  className={errors.otherSupportReason ? 'error-input' : ''}
                ></textarea>
                {renderError('otherSupportReason')}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="form-step-MN form-step-3-MN">
            <h2 className="form-title-MN">Additional Information</h2>
            <p className="form-subtitle-MN">Please provide more details about your situation.</p>
            
            <div className="form-field-MN">
              <label>What is the reason behind your feelings (if identified)? <span className="required-field">*</span></label>
              <select
                name="feelingsReason"
                value={formData.feelingsReason}
                onChange={handleDropdownChange}
                onBlur={(e) => { formRefs.feelingsReason.current = e.target.value; }}
                className={errors.feelingsReason ? 'error-input' : ''}
              >
                <option value="" disabled>Select a reason</option>
                {feelingsReasonOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {renderError('feelingsReason')}
            </div>
            
            <div className="form-field-MN">
              <p className="form-label-MN">Have you previously consulted with a mental health professional? <span className="required-field">*</span></p>
              <div className={`radio-group-MNI ${errors.previousConsultation ? 'error-border' : ''}`}>
                {['Yes', 'No'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.previousConsultation === option ? 'selected' : ''}`}
                    onClick={() => {
                      handleRadioChange('previousConsultation', option);
                      formRefs.previousConsultation.current = option;
                    }}
                  >
                    <div className="radio-circle-MN">
                      {formData.previousConsultation === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError('previousConsultation')}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step-MN form-step-4-MN">
            <h2 className="form-title-MN">Language Preference</h2>
            <p className="form-subtitle-MN">Select your preferred language for the session. <span className="required-field">*</span></p>
            
            <div className="form-field-MN">
              <div className={`radio-group-MNI ${errors.preferredLanguage ? 'error-border' : ''}`}>
                {['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Other'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.preferredLanguage === option ? 'selected' : ''}`}
                    onClick={() => {
                      handleRadioChange('preferredLanguage', option);
                      formRefs.preferredLanguage.current = option;
                    }}
                  >
                    <div className="radio-circle-MN">
                      {formData.preferredLanguage === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError('preferredLanguage')}
            </div>
            
            {formData.preferredLanguage === 'Other' && (
              <div className="form-field-MN">
                <label>Please specify your preferred language <span className="required-field">*</span></label>
                <input
                  type="text"
                  name="otherLanguage"
                  value={formData.otherLanguage}
                  onChange={handleChange}
                  onBlur={(e) => { formRefs.otherLanguage.current = e.target.value; }}
                  placeholder="e.g. Punjabi"
                  className={errors.otherLanguage ? 'error-input' : ''}
                />
                {renderError('otherLanguage')}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="form-step-MN form-step-5-MN">
            <h2 className="form-title-MN">Session Scheduling</h2>
            <p className="form-subtitle-MN">Select your preferred date and time for the session.</p>
            
            <div className="form-field-MN">
              <label>When are you planning to have the session? <span className="required-field">*</span></label>
              <input
                type="date"
                name="sessionDate"
                value={formData.sessionDate}
                onChange={handleChange}
                onBlur={(e) => { formRefs.sessionDate.current = e.target.value; }}
                className={errors.sessionDate ? 'error-input' : ''}
              />
              {renderError('sessionDate')}
            </div>
            
            <div className="form-field-MN">
              <p className="form-label-MN">Timings for session: <span className="required-field">*</span></p>
              <div className={`radio-group-MNI ${errors.sessionTime ? 'error-border' : ''}`}>
                {[
                  '9 AM to 12 PM',
                  '12 PM to 3 PM',
                  '3 PM to 6 PM',
                  '6 PM to 9 PM',
                  '9 PM to 12 AM'
                ].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.sessionTime === option ? 'selected' : ''}`}
                    onClick={() => {
                      handleRadioChange('sessionTime', option);
                      formRefs.sessionTime.current = option;
                    }}
                  >
                    <div className="radio-circle-MN">
                      {formData.sessionTime === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError('sessionTime')}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-step-MN form-step-6-MN">
            <h2 className="form-title-MN">Additional Preferences</h2>
            <p className="form-subtitle-MN">Tell us more about your preferences for the consultation.</p>
            
            <div className="form-field-MN">
              <p className="form-label-MN">Do you have a preference for the gender of the counselor? <span className="required-field">*</span></p>
              <div className={`radio-group-MNIM ${errors.counselorGenderPreference ? 'error-border' : ''}`}>
                {['Male', 'Female', 'No preference'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN OneLineOptions ${formData.counselorGenderPreference === option ? 'selected' : ''}`}
                    onClick={() => {
                      handleRadioChange('counselorGenderPreference', option);
                      formRefs.counselorGenderPreference.current = option;
                    }}
                  >
                    <div className="radio-circle-MN">
                      {formData.counselorGenderPreference === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError('counselorGenderPreference')}
            </div>
            
            <div className="form-field-MN">
              <p className="form-label-MN">Are you currently experiencing any medical conditions or taking medications for mental health? <span className="required-field">*</span></p>
              <div className={`radio-group-MNIM  ${errors.medicalConditions ? 'error-border' : ''}`}>
                {['Yes', 'No', 'Prefer not to say'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.medicalConditions === option ? 'selected' : ''}`}
                    onClick={() => {
                      handleRadioChange('medicalConditions', option);
                      formRefs.medicalConditions.current = option;
                    }}
                  >
                    <div className="radio-circle-MN">
                      {formData.medicalConditions === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError('medicalConditions')}
            </div>
            
            <div className="form-field-MN fieldWidthHear">
              <label>How did you hear about our platform? <span className="required-field">*</span></label>
              <select
                name="referralSource"
                value={formData.referralSource}
                onChange={handleDropdownChange}
                onBlur={(e) => { formRefs.referralSource.current = e.target.value; }}
                className={errors.referralSource ? 'error-input' : ''}
              >
                <option value="" disabled>Select an option</option>
                {referralOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {renderError('referralSource')}
            </div>
          </div>
        );
      case 7:
        return (
          <div className="form-step-MN form-step-7-MN">
            <h2 className="form-title-MN">Payment Information</h2>
            <p className="form-subtitle-MN">Select your preferred payment method.</p>
            
            <div className="form-field-MN">
              <p className="form-label-MN">Choose a payment method: <span className="required-field">*</span></p>
              <div className={`radio-group-MNI ${errors.paymentMethod ? 'error-border' : ''}`}>
                {['Credit/Debit Card', 'UPI', 'Net Banking', 'Mobile Wallet', 'Insurance'].map(option => (
                  <div 
                    key={option}
                    className={`radio-option-MN ${formData.paymentMethod === option ? 'selected' : ''}`}
                    onClick={() => {
                      handleRadioChange('paymentMethod', option);
                      formRefs.paymentMethod.current = option;
                    }}
                  >
                    <div className="radio-circle-MN">
                      {formData.paymentMethod === option && <div className="radio-dot-MN"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError('paymentMethod')}
            </div>
            
            <div className="pricing-info-MN">
              <h3>Consultation Fee</h3>
              <p className="fee-MN">₹999.00</p>
              <p className="fee-description-MN">One-hour online consultation session</p>
              <p className="note-MN">* Additional sessions may be recommended based on initial consultation</p>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="form-step-MN form-step-8-MN">
            <div className="thank-you-MN">
              <div className="check-icon-MN">✓</div>
              <h2 className="form-title-MN">Thank You!</h2>
              <p className="form-subtitle-MN">Your mental wellness consultation has been scheduled successfully.</p>
              
              <div className="confirmation-details-MN">
                <p>We've sent a confirmation email to: <strong>{formData.email}</strong></p>
                <p>Your session is scheduled for: <strong>{formData.sessionDate}</strong> at <strong>{formData.sessionTime}</strong></p>
                <p>One of our counselors will contact you 24 hours before your scheduled session to confirm.</p>
              </div>
              
              <div className="next-steps-MN">
                <h3>Next Steps</h3>
                <ul>
                  <li>Check your email for confirmation details</li>
                  <li>Complete the pre-consultation questionnaire (if applicable)</li>
                  <li>Ensure you have a quiet, private space for your session</li>
                  <li>Test your device's camera and microphone before the session</li>
                </ul>
              </div>
              
              <div className="contact-info-MN">
                <p>If you need to reschedule or have any questions, please contact us at:</p>
                <p><strong>support@mentalwellness.com</strong> or call <strong>+91 800-123-4567</strong></p>
              </div>
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
            title="PERSONAL INFO"
            active={currentStep === 1}
          />
          <StepIndicator
            number="2"
            subtitle="Step 2"
            title="SUPPORT REASON"
            active={currentStep === 2}
          />
          <StepIndicator
            number="3"
            subtitle="Step 3"
            title="ADDITIONAL INFO"
            active={currentStep === 3}
          />
          <StepIndicator
            number="4"
            subtitle="Step 4"
            title="LANGUAGE"
            active={currentStep === 4}
          />
          <StepIndicator
            number="5"
            subtitle="Step 5"
            title="SCHEDULING"
            active={currentStep === 5}
          />
          <StepIndicator
            number="6"
            subtitle="Step 6"
            title="PREFERENCES"
            active={currentStep === 6}
          />
          <StepIndicator
            number="7"
            subtitle="Step 7"
            title="PAYMENT"
            active={currentStep === 7}
          />
          <StepIndicator
            number="8"
            subtitle="Step 8"
            title="CONFIRMATION"
            active={currentStep === 8}
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
            {currentStep > 1 && currentStep < 8 && (
              <button
                type="button"
                onClick={prevStep}
                className="back-button-MN"
              >
                Go Back
              </button>
            )}
            {currentStep < 7 ? (
              <button
                type="button"
                onClick={nextStep}
                className="next-button-MN"
              >
                Next Step
              </button>
            ) : currentStep === 7 ? (
                <button
                  type="button"
                  onClick={(e) => {
                    handleSubmit(e);  // Call handleSubmit first
                    if (Object.keys(errors).length === 0) {
                      nextStep();     // Only proceed to next step if validation passes
                    }
                  }}
                  className="confirm-button-MN"
                >
                  Confirm & Pay
                </button>
            ) : (
              <button
                type="button"
                onClick={() => window.location.href = '/dashboard'}
                className="dashboard-button-MN"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualForm;