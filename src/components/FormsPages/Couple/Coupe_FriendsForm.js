import React, { useState, useEffect } from "react";
import "../FormStyles.css";
// import { database } from "../../../utils/firebaseConfig";
// import { ref, push } from "firebase/database";
import { postData } from "../../../utils/awsService";

const CouplesTherapyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [errors, setErrors] = useState({});
  const [autoNextEnabled, setAutoNextEnabled] = useState(true);
  const [stepsAttempted, setStepsAttempted] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    partnerName: "",
    email: "",
    city: "",
    contactNo: "",
    profession: "",
    partnerProfession: "",
    relationshipStatus: "",
    otherRelationshipStatus: "",
    primaryConcern: "",
    therapyGoals: [],
    otherTherapyGoal: "",
    previousTherapy: "",
    preferredLanguage: "",
    otherLanguage: "",
    sessionDate: "",
    sessionTime: "",
    medicalConditions: "",
    referralSource: "",
    paymentMethod: "",
    termsAgreed: false,
  });

  // Profession options
  const professionOptions = [
    "Student",
    "Professional",
    "Self-employed",
    "Homemaker",
    "Retired",
    "Unemployed",
    "Other",
  ];

  // Relationship status options
  const relationshipStatusOptions = ["Married", "Engaged", "Dating", "Other"];

  // Primary concern options
  const primaryConcernOptions = [
    "Communication issues",
    "Trust issues",
    "Infidelity",
    "Parenting conflicts",
    "Financial conflicts",
    "Intimacy problems",
    "Different life goals",
    "Recurring arguments",
    "Other",
  ];

  // Therapy goals options
  const therapyGoalsOptions = [
    "Improve communication",
    "Rebuild trust",
    "Resolve conflicts effectively",
    "Strengthen emotional connection",
    "Other",
  ];

  // Referral source options
  const referralOptions = [
    "Referred by someone",
    "LinkedIn",
    "Instagram ad",
    "Facebook ad",
    "Instagram post/reel",
    "Facebook post",
    "Word of mouth",
    "Google search",
    "Other",
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle dropdown selection changes
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle radio selection changes
  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle checkbox selection changes
  const handleCheckboxChange = (name, value) => {
    const currentValues = [...formData[name]];
    const valueIndex = currentValues.indexOf(value);

    if (valueIndex === -1) {
      // Add value if not present
      currentValues.push(value);
    } else {
      // Remove value if already present
      currentValues.splice(valueIndex, 1);
    }

    setFormData({
      ...formData,
      [name]: currentValues,
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.name || !formData.name.trim())
        newErrors.name = "Your name is required";
      if (!formData.partnerName || !formData.partnerName.trim())
        newErrors.partnerName = "Partner's name is required";
      if (!formData.email || !formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.city || !formData.city.trim())
        newErrors.city = "City is required";
      if (!formData.contactNo || !formData.contactNo.trim())
        newErrors.contactNo = "Contact number is required";
      if (!formData.profession)
        newErrors.profession = "Your profession is required";
      if (!formData.partnerProfession)
        newErrors.partnerProfession = "Partner's profession is required";
      if (!formData.relationshipStatus) {
        newErrors.relationshipStatus = "Relationship status is required";
      } else if (
        formData.relationshipStatus === "Other" &&
        (!formData.otherRelationshipStatus ||
          !formData.otherRelationshipStatus.trim())
      ) {
        newErrors.otherRelationshipStatus =
          "Please specify your relationship status";
      }
    }

    // Step 2 validation
    else if (currentStep === 2) {
      if (!formData.primaryConcern)
        newErrors.primaryConcern = "Primary concern is required";
      if (formData.therapyGoals.length === 0) {
        newErrors.therapyGoals = "At least one therapy goal is required";
      } else if (
        formData.therapyGoals.includes("Other") &&
        (!formData.otherTherapyGoal || !formData.otherTherapyGoal.trim())
      ) {
        newErrors.otherTherapyGoal = "Please specify your therapy goal";
      }
    }

    // Step 3 validation
    else if (currentStep === 3) {
      if (!formData.previousTherapy)
        newErrors.previousTherapy = "Please select an option";
      if (!formData.preferredLanguage) {
        newErrors.preferredLanguage = "Preferred language is required";
      } else if (
        formData.preferredLanguage === "Other" &&
        (!formData.otherLanguage || !formData.otherLanguage.trim())
      ) {
        newErrors.otherLanguage = "Please specify your preferred language";
      }
    }

    // Step 4 validation
    else if (currentStep === 4) {
      if (!formData.sessionDate) newErrors.sessionDate = "Please select a date";
      if (!formData.sessionTime)
        newErrors.sessionTime = "Session time is required";
      if (!formData.medicalConditions)
        newErrors.medicalConditions = "Please select an option";
      if (!formData.referralSource)
        newErrors.referralSource = "Referral source is required";
    }

    // Step 5 validation
    else if (currentStep === 5) {
      if (!formData.termsAgreed)
        newErrors.termsAgreed = "You must agree to the terms and conditions";

      if (!formData.paymentMethod)
        newErrors.paymentMethod = "Payment method is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Auto-next functionality using useEffect
  // Auto-next functionality using useEffect
useEffect(() => {
  // Helper function to check if step is complete without showing errors
  const isStepComplete = () => {
    // Logic to check if all required fields for current step are filled
    // This is similar to validateStep but doesn't set any error messages
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.name.trim()) return false;
        if (!formData.partnerName || !formData.partnerName.trim()) return false;
        if (!formData.email || !formData.email.trim()) return false;
        if (!/\S+@\S+\.\S+/.test(formData.email)) return false;
        if (!formData.city || !formData.city.trim()) return false;
        if (!formData.contactNo || !formData.contactNo.trim()) return false;
        if (!formData.profession) return false;
        if (!formData.partnerProfession) return false;
        if (!formData.relationshipStatus) return false;
        if (
          formData.relationshipStatus === "Other" &&
          (!formData.otherRelationshipStatus || !formData.otherRelationshipStatus.trim())
        ) return false;
        return true;
        
      case 2:
        if (!formData.primaryConcern) return false;
        if (formData.therapyGoals.length === 0) return false;
        if (
          formData.therapyGoals.includes("Other") &&
          (!formData.otherTherapyGoal || !formData.otherTherapyGoal.trim())
        ) return false;
        return true;
        
      case 3:
        if (!formData.previousTherapy) return false;
        if (!formData.preferredLanguage) return false;
        if (
          formData.preferredLanguage === "Other" &&
          (!formData.otherLanguage || !formData.otherLanguage.trim())
        ) return false;
        return true;
        
      case 4:
        if (!formData.sessionDate) return false;
        if (!formData.sessionTime) return false;
        if (!formData.medicalConditions) return false;
        if (!formData.referralSource) return false;
        return true;
        
      case 5:
        if (!formData.paymentMethod) return false;
        if (!formData.termsAgreed) return false;
        return true;
        
      default:
        return false;
    }
  };
  
  // Only trigger auto-next for steps 1 to 5 when fields are complete
  // (step 6 is the confirmation page, so no need to auto-advance from there)
  if (currentStep < 6 && autoNextEnabled && isStepComplete()) {
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 300); // Small delay for better UX
    
    return () => clearTimeout(timer); // Cleanup timer on unmount or when dependencies change
  }
}, [formData, currentStep, autoNextEnabled]); // Trigger when formData, currentStep, or autoNextEnabled changes // Trigger when formData, currentStep, or autoNextEnabled changes

  // Move to next step
  const nextStep = () => {
    // Mark current step as attempted
    setStepsAttempted(prev => ({
      ...prev,
      [currentStep]: true
    }));
    
    // Always validate before moving to next step
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
        setAutoNextEnabled(true);
      }
    } else {
      // Scroll to the first error field
      const firstErrorField = document.querySelector(".error-message-MN");
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setAutoNextEnabled(false); // Disable auto-next when going back
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep()) {
      try {
        // await push(ref(database, "couples_therapy_sessions"), formData);

        console.log("Form data submitted:", formData);
        const response = await postData("/couple", formData);
        console.log("Form data submitted:", response);
        // Show success alert
        alert(
          "Form submitted successfully! Your couples therapy session has been scheduled."
        );
      } catch (error) {
        console.error("Error saving therapy session data:", error);
        alert("Failed to schedule your session. Please try again.");
      }
    }
  };

  // Step indicator component
  const StepIndicator = ({ number, title, subtitle, active }) => (
    <div className={`step-indicator-MN ${active ? "active" : ""}`}>
      <div className="step-number-MN">{number}</div>
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
            <h2 className="form-title-MN">Couple Information</h2>
            <p className="form-subtitle-MN">
              Please provide details about you and your partner.
            </p>

            <div className="oneLineDetail">
              <div className="form-field-MN fieldWidthName">
                <label>
                  Your Name <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={errors.name ? "error-input" : ""}
                />
                {renderError("name")}
              </div>

              <div className="form-field-MN fieldWidthName">
                <label>
                  Partner's Name <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  placeholder="Enter your partner's name"
                  className={errors.partnerName ? "error-input" : ""}
                />
                {renderError("partnerName")}
              </div>
            </div>

            <div className="form-field-MN fieldWidthEmail">
              <label>
                Email Address <span className="required-field">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className={errors.email ? "error-input" : ""}
              />
              {renderError("email")}
            </div>

            <div className="oneLineDetail">
              <div className="form-field-MN fieldWidthCity">
                <label>
                  City <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className={errors.city ? "error-input" : ""}
                />
                {renderError("city")}
              </div>

              <div className="form-field-MN fieldWidthNo">
                <label>
                  Contact Number <span className="required-field">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className={errors.contactNo ? "error-input" : ""}
                />
                {renderError("contactNo")}
              </div>
            </div>

            <div className="oneLineDetail">
              <div className="form-field-MN fieldWidthPro">
                <label>
                  Your Profession <span className="required-field">*</span>
                </label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleDropdownChange}
                  className={errors.profession ? "error-input" : ""}
                >
                  <option value="" disabled>
                    Select your profession
                  </option>
                  {professionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {renderError("profession")}
              </div>

              <div className="form-field-MN fieldWidthPro">
                <label>
                  Partner's Profession <span className="required-field">*</span>
                </label>
                <select
                  name="partnerProfession"
                  value={formData.partnerProfession}
                  onChange={handleDropdownChange}
                  className={errors.partnerProfession ? "error-input" : ""}
                >
                  <option value="" disabled>
                    Select partner's profession
                  </option>
                  {professionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {renderError("partnerProfession")}
              </div>
            </div>

            <div className="oneLineDetail">
              <div className="form-field-MN fieldWidthNo">
                <label>
                  Relationship Status <span className="required-field">*</span>
                </label>
                <select
                  name="relationshipStatus"
                  value={formData.relationshipStatus}
                  onChange={handleDropdownChange}
                  className={errors.relationshipStatus ? "error-input" : ""}
                >
                  <option value="" disabled>
                    Select your relationship status
                  </option>
                  {relationshipStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {renderError("relationshipStatus")}
              </div>

              {formData.relationshipStatus === "Other" && (
                <div className="form-field-MN">
                  <label>
                    Please specify your relationship status{" "}
                    <span className="required-field">*</span>
                  </label>
                  <textarea
                    name="otherRelationshipStatus"
                    value={formData.otherRelationshipStatus}
                    onChange={handleChange}
                    placeholder="Describe your relationship status"
                    rows="1"
                    className={
                      errors.otherRelationshipStatus ? "error-input" : ""
                    }
                  ></textarea>
                  {renderError("otherRelationshipStatus")}
                </div>
              )}
            </div>
          </div>
        );
      // Step 2: Therapy Goals
      case 2:
        return (
          <div className="form-step-MN form-step-2-MN">
            <h2 className="form-title-MN">Therapy Goals</h2>
            <p className="form-subtitle-MN">
              Tell us about your concerns and goals for therapy.
            </p>

            <div className="form-field-MN">
              <label>
                Primary Concern / Reason for Therapy{" "}
                <span className="required-field">*</span>
              </label>
              <select
                name="primaryConcern"
                value={formData.primaryConcern}
                onChange={handleDropdownChange}
                className={errors.primaryConcern ? "error-input" : ""}
              >
                <option value="" disabled>
                  Select your primary concern
                </option>
                {primaryConcernOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {renderError("primaryConcern")}
            </div>

            <div className="form-field-MN">
              <p className="form-label-MN">
                What are your therapy goals as a couple?{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNI ${
                  errors.therapyGoals ? "error-border" : ""
                }`}
              >
                {therapyGoalsOptions.map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN ${
                      formData.therapyGoals.includes(option) ? "selected" : ""
                    }`}
                    onClick={() => handleCheckboxChange("therapyGoals", option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.therapyGoals.includes(option) && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("therapyGoals")}
            </div>
            {formData.therapyGoals?.includes("Other") && (
              <div className="form-field-MN">
                <label>
                  Please specify your therapy goal{" "}
                  <span className="required-field">*</span>
                </label>
                <textarea
                  name="otherTherapyGoal"
                  value={formData.otherTherapyGoal}
                  onChange={handleChange}
                  placeholder="Describe your therapy goal"
                  rows="1"
                  className={errors.otherTherapyGoal ? "error-input" : ""}
                ></textarea>
                {renderError("otherTherapyGoal")}
              </div>
            )}
          </div>
        );

      // Step 3: Previous Therapy & Language Preference
      case 3:
        return (
          <div className="form-step-MN form-step-3-MN">
            <h2 className="form-title-MN">Additional Information</h2>
            <p className="form-subtitle-MN">
              Please provide more details about your therapy preferences.
            </p>

            <div className="form-field-MN">
              <p className="form-label-MN">
                Have you attended couple therapy before?{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNI ${
                  errors.previousTherapy ? "error-border" : ""
                }`}
              >
                {["Yes", "No"].map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN ${
                      formData.previousTherapy === option ? "selected" : ""
                    }`}
                    onClick={() => handleRadioChange("previousTherapy", option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.previousTherapy === option && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("previousTherapy")}
            </div>

            <div className="form-field-MN">
              <p className="form-label-MN">
                Preferred language for the session{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNI ${
                  errors.preferredLanguage ? "error-border" : ""
                }`}
              >
                {["English", "Hindi", "Other"].map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN ${
                      formData.preferredLanguage === option ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleRadioChange("preferredLanguage", option)
                    }
                  >
                    <div className="radio-circle-MN">
                      {formData.preferredLanguage === option && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("preferredLanguage")}
            </div>

            {formData.preferredLanguage === "Other" && (
              <div className="form-field-MN">
                <label>
                  Please specify your preferred language{" "}
                  <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  name="otherLanguage"
                  value={formData.otherLanguage}
                  onChange={handleChange}
                  placeholder="Enter your preferred language"
                  className={errors.otherLanguage ? "error-input" : ""}
                />
                {renderError("otherLanguage")}
              </div>
            )}
          </div>
        );

      // Step 4: Session Time & Additional Info
      case 4:
        return (
          <div className="form-step-MN form-step-4-MN">
            <h2 className="form-title-MN">Session Information</h2>
            <p className="form-subtitle-MN">
              Select your preferred date and time for the session.
            </p>

            <div className="form-field-MN">
              <label>
                When are you planning to have the session?{" "}
                <span className="required-field">*</span>
              </label>
              <input
                type="date"
                name="sessionDate"
                value={formData.sessionDate}
                onChange={handleChange}
                className={errors.sessionDate ? "error-input" : ""}
              />
              {renderError("sessionDate")}
            </div>

            <p className="form-subtitle-MN">
              Let us know about your availability and other details.
            </p>

            <div className="form-field-MN">
              <p className="form-label-MN">
                When are you both available for the session?{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`dropdown-container-MN ${
                  errors.sessionTime ? "error-border" : ""
                }`}
              >
                <select
                  className="dropdown-select-MN"
                  name="sessionTime"
                  value={formData.sessionTime || ""}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Select a time
                  </option>
                  <option value="9 AM to 12 PM">9 AM to 12 PM</option>
                  <option value="12 PM to 3 PM">12 PM to 3 PM</option>
                  <option value="3 PM to 6 PM">3 PM to 6 PM</option>
                  <option value="6 PM to 9 PM">6 PM to 9 PM</option>
                  <option value="9 PM to 12 AM">9 PM to 12 AM</option>
                </select>
              </div>
              {renderError("sessionTime")}
            </div>

            <div className="form-field-MN">
              <p className="form-label-MN ">
                Do either of you have any medical conditions that may affect the
                session? <span className="required-field">*</span>
              </p>
              <div
                className={` oneLineDetail ${
                  errors.medicalConditions ? "error-border" : ""
                }`}
              >
                {["Yes", "No"].map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN ${
                      formData.medicalConditions === option ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleRadioChange("medicalConditions", option)
                    }
                  >
                    <div className="radio-circle-MN">
                      {formData.medicalConditions === option && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("medicalConditions")}
            </div>

            <div className="form-field-MN fieldWidthPro">
              <label>
                How did you hear about us?{" "}
                <span className="required-field">*</span>
              </label>
              <select
                name="referralSource"
                value={formData.referralSource}
                onChange={handleDropdownChange}
                className={errors.referralSource ? "error-input" : ""}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {referralOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {renderError("referralSource")}
            </div>
          </div>
        );

      // Step 5: Payment Information
      case 5:
        return (
          <div className="form-step-MN form-step-5-MN">
            <h2 className="form-title-MN">Payment Information</h2>
            <p className="form-subtitle-MN">
              Select your preferred payment method.
            </p>

            <div className="form-field-MN">
              <label className="form-label-MN" htmlFor="paymentMethod">
                Choose a payment method:{" "}
                <span className="required-field">*</span>
              </label>

              <select
                id="paymentMethod"
                name="paymentMethod"
                className={`dropdown-select-MN ${
                  errors.paymentMethod ? "error-border" : ""
                }`}
                value={formData.paymentMethod}
                onChange={(e) =>
                  handleRadioChange("paymentMethod", e.target.value)
                }
              >
                <option value="" disabled>
                  Select payment method
                </option>
                <option value="Credit/Debit Card">Credit/Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Net Banking">Net Banking</option>
                <option value="Mobile Wallet">Mobile Wallet</option>
                <option value="Insurance">Insurance</option>
              </select>

              {renderError("paymentMethod")}
            </div>

            <div className="pricing-info-MN">
              <h3>Consultation Fee</h3>
              <p className="fee-MN">₹1499.00</p>
              <p className="fee-description-MN">
                One-hour online couples therapy session
              </p>
              <p className="note-MN">
                * Additional sessions may be recommended based on initial
                consultation
              </p>
            </div>
            <div className="form-field-MN terms-container-MN">
              <label className="terms-label-MN">
                <span className="terms-text-MN">
                  <input
                    type="checkbox"
                    name="termsAgreed"
                    checked={formData.termsAgreed}
                    onChange={handleChange}
                    className={errors.termsAgreed ? "error-input" : ""}
                  />{" "}
                  I hereby give my informed consent for the release of written
                  and/or verbal information related to my confidential file in
                  case of threat to myself, or others. I agree to accept and
                  follow the rules of time and regularity needed for the
                  counseling. It is my understanding that the Counselor will
                  maintain professional responsibility towards me.
                </span>
              </label>
              {renderError("termsAgreed")}
            </div>
          </div>
        );

      // Step 6: Thank You / Confirmation
      case 6:
        return (
          <div className="form-step-MN form-step-6-MN">
            <div className="thank-you-MN">
              <div className="check-icon-MN">✓</div>
              <h2 className="form-title-MN">Thank You!</h2>
              <p className="form-subtitle-MN">
                Your couples therapy session has been scheduled successfully.
              </p>

              <div className="confirmation-details-MN">
                <p>
                  We've sent a confirmation email to:{" "}
                  <strong>{formData.email}</strong>
                </p>
                <p>
                  Your session is scheduled for:{" "}
                  <strong>{formData.sessionDate}</strong> at{" "}
                  <strong>{formData.sessionTime}</strong>
                </p>
                <p>
                  One of our therapists will contact you 24 hours before your
                  scheduled session to confirm.
                </p>
              </div>

              <div className="next-steps-MN">
                <h3>Next Steps</h3>
                <ul>
                  <li>Check your email for confirmation details</li>
                  <li>
                    Complete the pre-session questionnaire (if applicable)
                  </li>
                  <li>
                    Ensure you have a quiet, private space for your session
                  </li>
                  <li>
                    Test your device's camera and microphone before the session
                  </li>
                  <li>
                    Have a short discussion with your partner before the session
                    about your shared goals
                  </li>
                </ul>
              </div>

              <div className="contact-info-MN">
                <p>
                  If you need to reschedule or have any questions, please
                  contact us at:
                </p>
                <p>
                  <strong>couples@therapysupport.com</strong> or call{" "}
                  <strong>+91 800-123-4567</strong>
                </p>
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
            title="COUPLE INFO"
            active={currentStep === 1}
          />
          <StepIndicator
            number="2"
            subtitle="Step 2"
            title="THERAPY GOALS"
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
            title="SESSION DETAILS"
            active={currentStep === 4}
          />
          <StepIndicator
            number="5"
            subtitle="Step 5"
            title="PAYMENT"
            active={currentStep === 5}
          />
          <StepIndicator
            number="6"
            subtitle="Step 6"
            title="CONFIRMATION"
            active={currentStep === 6}
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
          <div className="form-content-MN">{renderStep()}</div>
          <div className="form-buttons-MN">
            {currentStep > 1 && currentStep < 6 && (
              <button
                type="button"
                onClick={prevStep}
                className="back-button-MN"
              >
                Go Back
              </button>
            )}
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="next-button-MN"
              >
                Next Step
              </button>
            ) : currentStep === 5 ? (
              <button
                type="button"
                onClick={(e) => {
                  handleSubmit(e); // Call handleSubmit first
                  if (Object.keys(errors).length === 0) {
                    nextStep(); // Only proceed to next step if validation passes
                  }
                }}
                className="confirm-button-MN"
              >
                Confirm & Pay
              </button>
            ) : (
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="dashboard-button-MN"
              >
                Go to Home
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CouplesTherapyForm;
