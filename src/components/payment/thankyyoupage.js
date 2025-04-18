import React from "react";
import "../FormsPages/FormStyles.css"

const ThankYouStep = ({formData}) => {
   // Destructure to get formData from propsconst

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
            <strong>{"demo@gmail.com"}</strong>
          </p>
          <p>
            Your session is scheduled for:{" "}
            <strong>{"demoTime"}</strong> at{" "}
            <strong>{"demodate"}</strong>
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
};

export default ThankYouStep;
