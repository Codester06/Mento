import ReactDOMServer from "react-dom/server";
import { initiatePayment } from "../../utils/payment_fetch.js";
import { sendemailapi } from "../../utils/mail_service.js";
import { postData } from "../../utils/awsService.js";
import { EmailFormat, GenerateEmailHTML } from "../mail/mailformat.js";

// Helper: Send email to user and admin
const sendFormEmail = async (emailData) => {
  const emailContent = ReactDOMServer.renderToStaticMarkup(
    <EmailFormat {...emailData} />
  );
  const emailBody = GenerateEmailHTML(emailContent);

  try {
    const userResponse = await sendemailapi(
      "send_mail",
      emailData.email,
      emailData.subject,
      emailBody
    );

    const adminResponse = await sendemailapi(
      "send_mail",
      "connect@mento.in",
      emailData.subject,
      emailBody
    );

    console.log(
      userResponse.success
        ? "User email sent!"
        : `User email failed: ${userResponse.error}`
    );
    console.log(
      adminResponse.success
        ? "Admin email sent!"
        : `Admin email failed: ${adminResponse.error}`
    );
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

// Helper: Handle payment
const handle_payment = async (formData, form) => {
  if (["individual", "couple", "family"].includes(form)) {
    try {
      const paymentResponse = await initiatePayment(formData);
      console.log("Payment Response:", paymentResponse);
      // You can add redirect logic here if needed
    } catch (err) {
      console.error("Payment Error:", err.message);
      alert("Payment initiation failed. Please try again.");
    }
  }
};

// Exported: Master form handler
export const handle_service = async (formData, form) => {
  try {
    const submitted_date = new Date().toISOString().split("T")[0];
    formData.submitted_date = submitted_date;

    const endpointMap = {
      individual: "/individual",
      couple: "/couple",
      family: "/family_friend",
      contact: "/contact_form",
    };

    const endpoint = endpointMap[form];
    if (!endpoint) throw new Error("Invalid form type");

    // 1. Save form data to DB
    const response = await postData(endpoint, formData);

    if (response?.success) {
      // 2. Send confirmation emails
      const emailData = {
        name: formData.name || "User",
        sessionDate: formData.sessionDate || "",
        sessionTime: formData.sessionTime || "",
        subject: "Form has been submitted",
        email: formData.email,
      };
      await sendFormEmail(emailData);

      // 3. Trigger payment
      await handle_payment(formData, form);
    }

    return response;
  } catch (error) {
    console.error("Service Handler Error:", error.message);
    return { success: false, error: error.message };
  }
};
