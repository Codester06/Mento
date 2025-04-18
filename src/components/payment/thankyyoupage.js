import React from "react";
import "../FormsPages/FormStyles.css";
import { useLocation } from "react-router-dom";
import { details } from "framer-motion/client";
import sendFormEmail from "../../utils/services.js";
const ThankYouStep = () => {
  const location = useLocation();

  // Extract query params from URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email") 
  const merchantTransactionId = queryParams.get("transactionId")
  const status = queryParams.get("status") || true;
  const amount = queryParams.get("amount") || "demoAmount";
  const name = queryParams.get("name") || "demoTransactionId";
  const payment_date = queryParams.get("payment_date") || "demoPaymentDate";
  const sessionTime = queryParams.get("sessionTime") || "demoSessionTime";
  const sessionDate = queryParams.get("sessionDate") || "demoSessionDate";
  const data = {
    name: name || "demoName",
    email: email || "",
   
    status: status || "",
    amount: amount || "",
    transactionId: merchantTransactionId || "",
  };
  console.log("status", status);
  if (status === "success") {
    const email_response = sendFormEmail(data, 'payment');
    console.log("Email sent successfully!", email_response);
  }

  return (
    <div className="form-step-MN form-step-8-MN">
      <div className="thank-you-MN">
        <div className="check-icon-MN">✓</div>
        <h2 className="form-title-MN">Thank You!</h2>
        <p className="form-subtitle-MN">
          Your mental wellness consultation has been scheduled successfully.
        </p>

        <div className="confirmation-details-MN">
          <p>
            We've sent a confirmation email to:{" "}
            <strong>{email || "demo@gmail.com"}</strong>
          </p>
          <p>
            Your session is scheduled for:{" "}
            <strong>{sessionTime || "demoTime"}</strong> at{" "}
            <strong>{sessionDate || "demoDate"}</strong>
          </p>
          <p>
            One of our counselors will contact you 24 hours before your scheduled session to confirm.
          </p>
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
          <p>
            If you need to reschedule or have any questions, please contact us at:
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
