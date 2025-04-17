import React, { useState, useEffect } from "react";
import "../FormStyles.css";
import axios from "axios";

// import { database } from "../../../utils/firebaseConfig";
// import { ref, push } from "firebase/database";
import ReactDOMServer from "react-dom/server";
import { postData } from "../../../utils/awsService";

import { EmailFormat, GenerateEmailHTML } from "../../mail/mailformat";
import sendEmailAPI from "../../../utils/mail_service";

const IndividualForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8;
  const [errors, setErrors] = useState({});
  const [autoNextEnabled, setAutoNextEnabled] = useState(true);
  const [stepsAttempted, setStepsAttempted] = useState({});

  // Create useState for form data instead of useRef to trigger re-renders
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    contactNo: "",
    guardianContactNo: "",
    profession: "",
    age: "",
    supportReason: "",
    otherSupportReason: "",
    feelingsReason: "",
    previousConsultation: "",
    preferredLanguage: "",
    otherLanguage: "",
    sessionDate: "",
    sessionTime: "",
    counselorGenderPreference: "",
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

  // Feelings reason options
  const feelingsReasonOptions = [
    "Work-related stress",
    "Family issues",
    "Academic pressure",
    "Financial concerns",
    "Health issues",
    "Personal loss",
    "Relationship difficulties",
    "Identity/self-esteem issues",
    "Past trauma",
    "Other",
  ];

  // Social media platforms for referral
  const referralOptions = [
    "Instagram",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "YouTube",
    "Friend/Family",
    "Healthcare provider",
    "Search engine",
    "Advertisement",
    "Other",
  ];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update state for form data
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };
  // Handle dropdown selection changes
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;

    // Update state for form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle radio selection changes
  const handleRadioChange = (name, value) => {
    // Update state for form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validate current step
  // Modify the validateStep function to validate every time
  const validateStep = () => {
    // Remove the condition that skips validation on first attempt
    const newErrors = {};

    // Step 1 validation
    if (currentStep === 1) {
      if (!formData.name || !formData.name.trim())
        newErrors.name = "Name is required";
      if (!formData.email || !formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.city || !formData.city.trim())
        newErrors.city = "City is required";
      if (!formData.contactNo || !formData.contactNo.trim())
        newErrors.contactNo = "Contact number is required";
      if (!formData.age) newErrors.age = "Age is required";
      if (!formData.profession) newErrors.profession = "Profession is required";
    }

    // Rest of validation logic remains the same
    // Step 2 validation
    else if (currentStep === 2) {
      if (!formData.supportReason) {
        newErrors.supportReason = "Please select a reason";
      } else if (
        formData.supportReason === "Other" &&
        (!formData.otherSupportReason || !formData.otherSupportReason.trim())
      ) {
        newErrors.otherSupportReason = "Please specify your reason";
      }
    }

    // Step 3 validation
    else if (currentStep === 3) {
      if (!formData.feelingsReason)
        newErrors.feelingsReason = "Please select a reason";
      if (!formData.previousConsultation)
        newErrors.previousConsultation = "Please select an option";
    }

    // Step 4 validation
    else if (currentStep === 4) {
      if (!formData.preferredLanguage) {
        newErrors.preferredLanguage = "Please select a language";
      } else if (
        formData.preferredLanguage === "Other" &&
        (!formData.otherLanguage || !formData.otherLanguage.trim())
      ) {
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
      if (!formData.counselorGenderPreference)
        newErrors.counselorGenderPreference = "Please select an option";
      if (!formData.medicalConditions)
        newErrors.medicalConditions = "Please select an option";
      if (!formData.referralSource)
        newErrors.referralSource = "Please select an option";
      if (!formData.termsAgreed)
        newErrors.termsAgreed = "You must agree to the terms";
      if (!formData.PaymentsAgreed)
        newErrors.termsAgreed = "You must agree to the terms";
    }

    // Step 7 validation
    else if (currentStep === 7) {
      if (!formData.paymentMethod)
        newErrors.paymentMethod = "Payment method is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //Auto-next functionality using useEffect
  useEffect(() => {
    // Helper function to check if step is complete without showing errors
    const isStepComplete = () => {
      // Logic to check if all required fields for current step are filled
      // This is similar to validateStep but doesn't set any error messages
      switch (currentStep) {
        case 1:
          return (
            formData.name &&
            formData.email &&
            /\S+@\S+\.\S+/.test(formData.email) &&
            formData.city &&
            formData.contactNo &&
            formData.age &&
            formData.profession
          );
        case 2:
          if (!formData.supportReason) return false;
          if (
            formData.supportReason === "Other" &&
            !formData.otherSupportReason
          )
            return false;
          return true;
        case 3:
          return formData.feelingsReason && formData.previousConsultation;
        case 4:
          if (!formData.preferredLanguage) return false;
          if (formData.preferredLanguage === "Other" && !formData.otherLanguage)
            return false;
          return true;
        case 5:
          return formData.sessionDate && formData.sessionTime;
        case 6:
          return (
            formData.counselorGenderPreference &&
            formData.medicalConditions &&
            formData.referralSource &&
            formData.termsAgreed &&
            formData.PaymentsAgreed
          );
        case 7:
          return formData.paymentMethod && formData.termsAgreed;
        default:
          return false;
      }
    };

    // Only trigger auto-next for steps 1 to 6 when fields are complete
    if (currentStep < 6 && autoNextEnabled && isStepComplete()) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep()) {
      try {
        // Add timestamp to the form data
        const dataToSubmit = {
          ...formData,
          submittedAt: new Date().toISOString(),
        };

        // console.log("Submitting form data:", dataToSubmit);

        // Use postData to submit the form data
        const response = await postData("/individual", dataToSubmit);

        console.log("Form data submitted successfully:", response);

        // Show success alert

        const email_data = Object.assign(
          {},
          {
            name: dataToSubmit.name,
            sessionDate: dataToSubmit.sessionDate,
            sessionTime: dataToSubmit.sessionTime,
            subject: "Confirmation Mail For Your Session",
            email: dataToSubmit.email,
          }
        );

        const email_content = ReactDOMServer.renderToStaticMarkup(
          <EmailFormat {...email_data} />
        );

        const email_body = GenerateEmailHTML(email_content);

        try {
          // Send email using Gmail service
          const sendEmailResponse = await sendEmailAPI(
            "send_mail",
            email_data.email,
            email_data.subject,
            email_body
          );

          // Log success or error message based on response
          console.log(
            sendEmailResponse.success
              ? "✅ Email sent successfully!"
              : `❌ Error: ${sendEmailResponse.error}`
          );
        } catch (error) {
          // Catch and log any unexpected errors during the email sending process
          console.error("❌ Error sending email:", error.message);
        }

        // Move to confirmation step after successful submission
        nextStep();
      } catch (error) {
        console.error("Error saving consultation data:", error);

        // Show more detailed error message
        let errorMessage = "Failed to schedule your consultation. ";

        // Check different error response formats (axios vs custom error)
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          errorMessage += error.response.data.message;
        } else if (error.message) {
          errorMessage += error.message;
        } else {
          errorMessage += "Please try again later.";
        }

        alert(errorMessage);
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
            <p className="form-subtitle-MN">
              Please provide your personal details for the consultation.
            </p>

            <div className="oneLineDetail">
              <div className="form-field-MN fieldWidthName">
                <label>
                  Full Name <span className="required-field">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Smith"
                  className={errors.name ? "error-input" : ""}
                />
                {renderError("name")}
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
                  placeholder="e.g. johnsmith@example.com"
                  className={errors.email ? "error-input" : ""}
                />
                {renderError("email")}
              </div>
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
                  placeholder="e.g. Bangalore"
                  className={errors.city ? "error-input" : ""}
                />
                {renderError("city")}
              </div>

              <div className="form-field-MN fieldWidthAge">
                <label>
                  Age <span className="required-field">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  min="1"
                  max="120"
                  className={errors.age ? "error-input" : ""}
                />
                {renderError("age")}
              </div>
            </div>

            <div className="oneLineDetail">
              <div className="form-field-MN fieldWidthNo">
                <label>
                  Contact Number <span className="required-field">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210"
                  className={errors.contactNo ? "error-input" : ""}
                />
                {renderError("contactNo")}
              </div>

              <div className="form-field-MN fieldWidthNo">
                <label>
                  Guardian's Contact Number{" "}
                  <span className="required-field">*</span>
                </label>
                <input
                  type="tel"
                  name="guardianContactNo"
                  value={formData.guardianContactNo}
                  onChange={handleChange}
                  placeholder="e.g. +91 9876543210"
                  className={errors.contactNo ? "error-input" : ""}
                />
              </div>
            </div>

            <div className="form-field-MN fieldWidthPro">
              <label>
                Profession <span className="required-field">*</span>
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
          </div>
        );
      case 2:
        return (
          <div className="form-step-MN form-step-2-MN">
            <h2 className="form-title-MN">Support Reason</h2>
            <p className="form-subtitle-MN">
              What is the main reason you're seeking mental wellness support?{" "}
              <span className="required-field">*</span>
            </p>

            <div className="form-field-MN">
              <div
                className={`radio-group-MNI ${
                  errors.supportReason ? "error-border" : ""
                }`}
              >
                {[
                  "Stress and anxiety",
                  "Depression",
                  "Relationship issues",
                  "Work-life balance",
                  "Grief and loss",
                  "Trauma/PTSD",
                  "Other",
                ].map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN ${
                      formData.supportReason === option ? "selected" : ""
                    }`}
                    onClick={() => handleRadioChange("supportReason", option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.supportReason === option && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("supportReason")}
            </div>

            {formData.supportReason === "Other" && (
              <div className="form-field-MN">
                <label>
                  Please specify your reason{" "}
                  <span className="required-field">*</span>
                </label>
                <textarea
                  name="otherSupportReason"
                  value={formData.otherSupportReason}
                  onChange={handleChange}
                  placeholder="Please describe your reason for seeking support..."
                  rows="2"
                  className={errors.otherSupportReason ? "error-input" : ""}
                ></textarea>
                {renderError("otherSupportReason")}
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="form-step-MN form-step-3-MN">
            <h2 className="form-title-MN">Additional Information</h2>
            <p className="form-subtitle-MN">
              Please provide more details about your situation.
            </p>

            <div className="form-field-MN">
              <label>
                What is the reason behind your feelings (if identified)?{" "}
                <span className="required-field">*</span>
              </label>
              <select
                name="feelingsReason"
                value={formData.feelingsReason}
                onChange={handleDropdownChange}
                className={errors.feelingsReason ? "error-input" : ""}
              >
                <option value="" disabled>
                  Select a reason
                </option>
                {feelingsReasonOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {renderError("feelingsReason")}
            </div>

            <div className="form-field-MN">
              <p className="form-label-MN">
                Have you previously consulted with a mental health professional?{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNI ${
                  errors.previousConsultation ? "error-border" : ""
                }`}
              >
                {["Yes", "No"].map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN ${
                      formData.previousConsultation === option ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleRadioChange("previousConsultation", option)
                    }
                  >
                    <div className="radio-circle-MN">
                      {formData.previousConsultation === option && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("previousConsultation")}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="form-step-MN form-step-4-MN">
            <h2 className="form-title-MN">Language Preference</h2>
            <p className="form-subtitle-MN">
              Select your preferred language for the session.{" "}
              <span className="required-field">*</span>
            </p>

            <div className="form-field-MN">
              <div
                className={`radio-group-MNI ${
                  errors.preferredLanguage ? "error-border" : ""
                }`}
              >
                {[
                  "English",
                  "Hindi",
                  "Kannada",
                  "Tamil",
                  "Telugu",
                  "Bengali",
                  "Marathi",
                  "Other",
                ].map((option) => (
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
                  placeholder="e.g. Punjabi"
                  className={errors.otherLanguage ? "error-input" : ""}
                />
                {renderError("otherLanguage")}
              </div>
            )}
          </div>
        );
      case 5:
        return (
          <div className="form-step-MN form-step-5-MN">
            <h2 className="form-title-MN">Session Scheduling</h2>
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

            <div className="form-field-MN">
              <p className="form-label-MN">
                Timings for session: <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNI ${
                  errors.sessionTime ? "error-border" : ""
                }`}
              >
                {[
                  "9 AM to 12 PM",
                  "12 PM to 3 PM",
                  "3 PM to 6 PM",
                  "6 PM to 9 PM",
                  "9 PM to 12 AM",
                ].map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN ${
                      formData.sessionTime === option ? "selected" : ""
                    }`}
                    onClick={() => handleRadioChange("sessionTime", option)}
                  >
                    <div className="radio-circle-MN">
                      {formData.sessionTime === option && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("sessionTime")}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="form-step-MN form-step-6-MN">
            <h2 className="form-title-MN">SUBMISSION</h2>
            <p className="form-subtitle-MN">
              Tell us more about your preferences for the consultation.
            </p>

            <div className="form-field-MN">
              <p className="form-label-MN">
                Do you have a preference for the gender of the counselor?{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNIM radio-group-row ${
                  errors.counselorGenderPreference ? "error-border" : ""
                }`}
              >
                {["Male", "Female", "No preference"].map((option) => (
                  <div
                    key={option}
                    className={`radio-option-MN OneLineOptions ${
                      formData.counselorGenderPreference === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleRadioChange("counselorGenderPreference", option)
                    }
                  >
                    <div className="radio-circle-MN">
                      {formData.counselorGenderPreference === option && (
                        <div className="radio-dot-MN"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
              {renderError("counselorGenderPreference")}
            </div>

            <div className="form-field-MN">
              <p className="form-label-MN">
                Are you currently experiencing any medical conditions or taking
                medications for mental health?{" "}
                <span className="required-field">*</span>
              </p>
              <div
                className={`radio-group-MNIM  ${
                  errors.medicalConditions ? "error-border" : ""
                }`}
              >
                {["Yes", "No", "Prefer not to say"].map((option) => (
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

            <div className="form-field-MN fieldWidthHear">
              <label>
                How did you hear about our platform?{" "}
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
      case 7:
        return (
          <div className="form-step-MN form-step-7-MN">
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
              <p className="fee-MN">₹999.00</p>
              <p className="fee-description-MN">
                One-hour online consultation session
              </p>
              <p className="note-MN">
                * Additional sessions may be recommended based on initial
                consultation
              </p>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="form-step-MN form-step-8-MN">
            <div className="thank-you-MN">
              <div className="check-icon-MN">✓</div>
              <h2 className="form-title-MN">Thank You!</h2>
              <p className="form-subtitle-MN">
                Your mental wellness consultation has been scheduled
                successfully.
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
                  One of our counselors will contact you 24 hours before your
                  scheduled session to confirm.
                </p>
              </div>

              <div className="next-steps-MN">
                <h3>Next Steps</h3>
                <ul>
                  <li>Check your email for confirmation details</li>
                  <li>
                    Complete the pre-consultation questionnaire (if applicable)
                  </li>
                  <li>
                    Ensure you have a quiet, private space for your session
                  </li>
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
                  <strong>support@mentalwellness.com</strong> or call{" "}
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
            title="SUBMISSION"
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
            ) : currentStep === 6 ? (
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
            ) : currentStep === 7 ? (
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

export default IndividualForm;
