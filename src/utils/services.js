import { sendEmailAPI } from "./mail_service.js";
import { postData } from "./awsService.js";
import { EmailFormat, GenerateEmailHTML } from "../components/mail/mailformat.js";
import ReactDOMServer from "react-dom/server";
import { initiatePayment } from "./payment_fetch.js";
import { initiatePayment } from "../utils/payment_service";
import { sendEmailAPI } from "../utils/mail_service";
import { postData } from "../utils/awsService";
import { EmailFormat, GenerateEmailHTML } from "../components/mail/mailformat";

// Helper: send user & admin email
const sendFormEmail = async (emailData) => {
  const emailContent = ReactDOMServer.renderToStaticMarkup(
    <EmailFormat {...emailData} />
  );

  const emailBody = GenerateEmailHTML(emailContent);

  try {
    const userResponse = await sendEmailAPI(
      "send_mail",
      emailData.email,
      emailData.subject,
      emailBody
    );

    const adminResponse = await sendEmailAPI(
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

// Exported: payment logic
export const handle_payment = async (formData, form) => {
  if (["individual", "couple", "family"].includes(form)) {
    try {
      const paymentResponse = await initiatePayment(formData);
      console.log("Payment initiated:", paymentResponse);
      // No email sent here (as per your latest instruction)
    } catch (err) {
      console.error("Payment Error:", err.message);
    }
  }
};

// Main handler
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

    // Step 1: Save to database
    const response = await postData(endpoint, formData);

    // Step 2: Send email and initiate payment (only if DB success)
    if (response?.success) {
      const emailData = {
        name: formData.name || "User",
        sessionDate: formData.sessionDate || "",
        sessionTime: formData.sessionTime || "",
        subject: "Form has been submitted",
        email: formData.email,
      };

      await sendFormEmail(emailData);
      await handle_payment(formData, form);
    }

    return response;
  } catch (error) {
    console.error("Service Handler Error:", error.message);
    return { success: false, error: error.message };
  }
};
