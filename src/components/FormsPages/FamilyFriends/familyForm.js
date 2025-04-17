import React, { useState, useEffect } from "react";
import "../FormStyles.css";
import ReactDOMServer from 'react-dom/server'
import { handle_service } from "../../test/service";
import { submitToAWS } from "../../../utils/payment_fetch.js";


const FamilyTherapyForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [errors, setErrors] = useState({});
  const [autoNextEnabled, setAutoNextEnabled] = useState(true);
  const [stepsAttempted, setStepsAttempted] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    participantsNames: "",
    email: "",
    city: "",
    contactNo: "",
    profession: "",
    relationshipType: "",
    otherRelationshipType: "",
    primaryConcern: "",
    otherPrimaryConcern: "",
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
    PaymentsAgreed: false,
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

  // Relationship type options
  const relationshipTypeOptions = [
    "Parent-Child",
    "Siblings",
    "Friends",
    "Extended Family",
    "Other",
  ];

  // Primary concern options
  const primaryConcernOptions = [
    "Communication Breakdown",
    "Long Standing Conflicts",
    "Emotional Distance",
    "Grief or Loss Within the Family",
    "Financial Disagreements",
    "Other",
  ];

  // Therapy goals options
  const therapyGoalsOptions = [
    "Rebuilding Trust",
    "Improving Communication",
    "Resolving Conflicts",
    "Navigating Life Transitions Together",
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
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.name || !formData.name.trim())
        newErrors.name = "Your name is required";
      if (!formData.participantsNames || !formData.participantsNames.trim())
        newErrors.participantsNames = "Other participants' names are required";
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
      if (!formData.relationshipType) {
        newErrors.relationshipType = "Relationship type is required";
      } else if (
        formData.relationshipType === "Other" &&
        (!formData.otherRelationshipType ||
          !formData.otherRelationshipType.trim())
      ) {
        newErrors.otherRelationshipType =
          "Please specify your relationship with the participants";
      }
    }

    // Step 2 validation
    else if (currentStep === 2) {
      if (!formData.primaryConcern)
        newErrors.primaryConcern = "Primary concern is required";
      if (
        formData.primaryConcern === "Other" &&
        (!formData.otherPrimaryConcern || !formData.otherPrimaryConcern.trim())
      ) {
        newErrors.otherPrimaryConcern = "Please specify your primary concern";
      }
      if (!formData.therapyGoals || formData.therapyGoals.length === 0) {
        newErrors.therapyGoals = "At least one therapy goal is required";
      } else if (
        formData.therapyGoals.includes("Other") &&
        (!formData.otherTherapyGoal || !formData.otherTherapyGoal.trim())
      ) {
        newErrors.otherTherapyGoal = "Please specify your therapy goal";
      }
      if (!formData.previousTherapy)
        newErrors.previousTherapy = "Please select an option";
    }

    // Step 3 validation
    else if (currentStep === 3) {
      if (!formData.preferredLanguage) {
        newErrors.preferredLanguage = "Preferred language is required";
      } else if (
        formData.preferredLanguage === "Other" &&
        (!formData.otherLanguage || !formData.otherLanguage.trim())
      ) {
        newErrors.otherLanguage = "Please specify your preferred language";
      }
      if (!formData.sessionDate) newErrors.sessionDate = "Please select a date";
      if (!formData.sessionTime)
        newErrors.sessionTime = "Session time is required";
      if (!formData.medicalConditions)
        newErrors.medicalConditions = "Please select an option";
      if (!formData.referralSource)
        newErrors.referralSource = "Referral source is required";
      if (!formData.termsAgreed)
        newErrors.termsAgreed = "You must agree to the terms and conditions";
      if (!formData.PaymentsAgreed)
        newErrors.PaymentsAgreed = "You must agree to the payment terms";
    }

    // Step 4 validation
    else if (currentStep === 4) {
      if (!formData.paymentMethod)
        newErrors.paymentMethod = "Payment method is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to check if step is complete
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.name.trim()) return false;
        if (!formData.participantsNames || !formData.participantsNames.trim())
          return false;
        if (!formData.email || !formData.email.trim()) return false;
        if (!/\S+@\S+\.\S+/.test(formData.email)) return false;
        if (!formData.city || !formData.city.trim()) return false;
        if (!formData.contactNo || !formData.contactNo.trim()) return false;
        if (!formData.profession) return false;
        if (!formData.relationshipType) return false;
        if (
          formData.relationshipType === "Other" &&
          (!formData.otherRelationshipType ||
            !formData.otherRelationshipType.trim())
        )
          return false;
        return true;

      case 2:
        if (!formData.primaryConcern) return false;
        if (
          formData.primaryConcern === "Other" &&
          (!formData.otherPrimaryConcern ||
            !formData.otherPrimaryConcern.trim())
        )
          return false;
        if (!formData.therapyGoals || formData.therapyGoals.length === 0)
          return false;
        if (
          formData.therapyGoals.includes("Other") &&
          (!formData.otherTherapyGoal || !formData.otherTherapyGoal.trim())
        )
          return false;
        if (!formData.previousTherapy) return false;
        return true;

      case 3:
        if (!formData.preferredLanguage) return false;
        if (
          formData.preferredLanguage === "Other" &&
          (!formData.otherLanguage || !formData.otherLanguage.trim())
        )
          return false;
        if (!formData.sessionDate) return false;
        if (!formData.sessionTime) return false;
        if (!formData.medicalConditions) return false;
        if (!formData.referralSource) return false;
        if (!formData.termsAgreed) return false;
        if (!formData.PaymentsAgreed) return false;
        return true;

      case 4:
        if (!formData.paymentMethod) return false;
        return true;

      default:
        return false;
    }
  };

  useEffect(() => {
    // Only trigger auto-next for steps 1 and 2 when fields are complete
    if (currentStep < 3 && autoNextEnabled && isStepComplete()) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 300); // Small delay for better UX

      return () => clearTimeout(timer); // Cleanup timer on unmount or when dependencies change
    }
  }, [formData, currentStep, autoNextEnabled]); // Trigger when formData, currentStep, or autoNextEnabled changes

  // Move to next step
  const nextStep = () => {
    // Mark current step as attempted
    setStepsAttempted((prev) => ({
      ...prev,
      [currentStep]: true,
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
  const handle_final_submit = async(e) => {
    e.preventDefault();
    try{
      // handle_payment(formData,'individual');
      submitToAWS(formData.name, 999,formData.contactNo).then(res => {
    });}
    catch(error){
      console.error("Error in payment:", error);
    }
  
  }

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep()) {
      try { 

        handle_service(formData, "family_friend");
      }
      catch (error) {
        console.error("Error submitting form:", error);
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
            <h2 className="form-title-MN">Participant Information</h2>
            <p className="form-subtitle-MN">
              Please provide details about you and other participants.
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
                  Name of Other Participant{" "}
                  <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  name="participantsNames"
                  value={formData.participantsNames}
                  onChange={handleChange}
                  placeholder="Enter Name of participant"
                  className={errors.participantsNames ? "error-input" : ""}
                />
                {renderError("participantsNames")}
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
              <div className="form-field-MN">
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

              <div className="form-field-MN ">
                <label>
                  What relationship do you share with the other participant?{" "}
                  <span className="required-field">*</span>
                </label>
                <select
                  name="relationshipType"
                  value={formData.relationshipType}
                  onChange={handleDropdownChange}
                  className={errors.relationshipType ? "error-input" : ""}
                >
                  <option value="" disabled>
                    Select relationship type
                  </option>
                  {relationshipTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {renderError("relationshipType")}
              </div>
            </div>
            <div className="oneLineDetail">
              {formData.profession === "Other" && (
                <div className="form-field-MN">
                  <label>
                    Please specify your Profession{" "}
                    <span className="required-field">*</span>
                  </label>
                  <textarea
                    name="otherRelationshipType"
                    value={formData.otherRelationshipType}
                    onChange={handleChange}
                    placeholder="Describe your Profession"
                    rows="1"
                    className={
                      errors.otherRelationshipType ? "error-input" : ""
                    }
                  ></textarea>
                  {renderError("otherRelationshipType")}
                </div>
              )}

              {formData.relationshipType === "Other" && (
                <div className="form-field-MN">
                  <label>
                    Please specify your relationship{" "}
                    <span className="required-field">*</span>
                  </label>
                  <textarea
                    name="otherRelationshipType"
                    value={formData.otherRelationshipType}
                    onChange={handleChange}
                    placeholder="Describe your Relationship"
                    rows="1"
                    className={
                      errors.otherRelationshipType ? "error-input" : ""
                    }
                  ></textarea>
                  {renderError("otherRelationshipType")}
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

            {formData.primaryConcern === "Other" && (
              <div className="form-field-MN">
                <label>
                  Please specify your primary concern{" "}
                  <span className="required-field">*</span>
                </label>
                <textarea
                  name="otherPrimaryConcern"
                  value={formData.otherPrimaryConcern}
                  onChange={handleChange}
                  placeholder="Describe your primary concern"
                  rows="1"
                  className={errors.otherPrimaryConcern ? "error-input" : ""}
                ></textarea>
                {renderError("otherPrimaryConcern")}
              </div>
            )}

            <div className="form-field-MN">
              <p className="form-label-MN">
                What are your goals for this therapy?{" "}
                <span className="required-field">*</span>
              </p>
              <select
                name="therapyGoals"
                value={formData.therapyGoals}
                onChange={(e) => {
                  const value = e.target.value;
                  const goals = value === "" ? [] : [value];
                  setFormData({
                    ...formData,
                    therapyGoals: goals,
                  });

                  if (errors.therapyGoals) {
                    setErrors((prev) => ({ ...prev, therapyGoals: null }));
                  }
                }}
                className={errors.therapyGoals ? "error-input" : ""}
              >
                <option value="" disabled>
                  Select your therapy goal
                </option>
                {therapyGoalsOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {renderError("therapyGoals")}
            </div>

            {formData.therapyGoals.includes("Other") && (
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

            <div className="form-field-MN">
              <p className="form-label-MN">
                Have you or other participants attended therapy before?{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNIM  ${
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
          </div>
        );

      case 3:
        return (
          <div className="form-step-MN form-step-3-MN">
            <h2 className="form-title-MN">SUBMISSION</h2>
            <p className="form-subtitle-MN">
              Please provide your preferences for the therapy session.
            </p>

            <div className="oneLineDetail">
              <div className="form-field-MN">
                <p className="form-label-MN">
                  Preferred language for the session{" "}
                  <span className="required-field">*</span>
                </p>
                <div
                  className={`radio-group-MNIM ${
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

            <div className="form-field-MN">
              <p className="form-label-MN">
                Preferred time for the session{" "}
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
              <p className="form-label-MN">
                Do any participants have medical or emotional concerns that may
                impact the session? <span className="required-field">*</span>
              </p>
              <div
                className={`oneLineDetail ${
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

            <div className="form-field-MN terms-container-MN">
              <label className="terms-label-MN">
                <span className="terms-text-Pay">
                  <input
                    type="checkbox"
                    name="PaymentsAgreed"
                    checked={formData.PaymentsAgreed}
                    onChange={handleChange}
                    className={errors.PaymentsAgreed ? "error-input" : ""}
                  />{" "}
                  I am ready to invest in my mental health (session starting
                  from ₹499/-)
                </span>
              </label>
              {renderError("PaymentsAgreed")}
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

      case 4:
        return (
          <div className="form-step-MN form-step-4-MN">
            <h2 className="form-title-MN">Payment Information</h2>
            <p className="form-subtitle-MN">
              Select your preferred payment method and agree to terms.
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
              <p className="fee-MN">₹1999.00</p>
              <p className="fee-description-MN">
                One-hour online family therapy session
              </p>
              <p className="note-MN">
                * Additional sessions may be recommended based on initial
                consultation
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-step-MN form-step-5-MN">
            <div className="thank-you-MN">
              <div className="check-icon-MN">✓</div>
              <h2 className="form-title-MN">Thank You!</h2>
              <p className="form-subtitle-MN">
                Your family therapy session has been scheduled successfully.
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
                  One of our therapists will contact you shortly to confirm the
                  exact date and time.
                </p>
              </div>

              <div className="next-steps-MN">
                <h3>Next Steps</h3>
                <ul>
                  <li>Check your email for confirmation details</li>
                  <li>Complete any pre-session questionnaires if sent</li>
                  <li>
                    Ensure all participants are informed about the session
                  </li>
                  <li>Prepare a quiet, private space for your session</li>
                  <li>
                    Test your device's camera and microphone before the session
                  </li>
                </ul>
              </div>

              <div className="contact-info-MN">
                <p>
                  If you need to reschedule or have any questions, please
                  contact us at:
                </p>
                <p>
                  <strong>family@therapysupport.com</strong> or call{" "}
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
            title="PARTICIPANT INFO"
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
            title="SUBMISSION"
            active={currentStep === 3}
          />
          <StepIndicator
            number="4"
            subtitle="Step 4"
            title="PAYMENT"
            active={currentStep === 4}
          />
          <StepIndicator
            number="5"
            subtitle="Step 5"
            title="CONFIRMATION"
            active={currentStep === 5}
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
            {currentStep > 1 && currentStep < 4 && (
              <button
                type="button"
                onClick={prevStep}
                className="back-button-MN"
              >
                Go Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="next-button-MN"
              >
                Next Step
              </button>
            ) : currentStep === 3 ? (
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
                Submit
              </button>
            ) : currentStep === 4 ? (
              <button
                type="button"
                onClick={(e) => {
                  handle_final_submit(e); // Call handleSubmit first
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

export default FamilyTherapyForm;
