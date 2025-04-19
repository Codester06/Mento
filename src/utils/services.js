import { sendEmailAPI } from "./mail_service.js";
import { postData } from "./awsService.js";
import { EmailFormat, GenerateEmailHTML ,Email_mail_format} from "../components/mail/mailformat.js";
import ReactDOMServer from "react-dom/server";
import { initiatePayment } from "./payment_fetch.js";



// Helper: send user & admin email
export const sendFormEmail = async (emailData, mail ) => {
  if (!emailData || !emailData.email) {
    console.error("Invalid email data:", emailData);}

    const emailContent = ReactDOMServer.renderToStaticMarkup(
      mail === "payment" ? (
        <Email_mail_format {...emailData} />
      ) : mail === "form" ? (
        <EmailFormat {...emailData} />  
      ) : null
    );
    

  const emailBody = GenerateEmailHTML(emailContent);
  const responses ={}
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
    responses.userResponse = userResponse;
    responses.adminResponse = adminResponse;  
    return responses;

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

export let response_data = null;
export const handle_service = async (formData, form) => {
  // const [data , setData] = useContext(Context);
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
   const  response = await postData(endpoint, formData);
    console.log("Database response:", response.data.id);

    // setData(response.data)
    console.log("Data saved to DB:", response.data.id);
      console.log("Form data:", response.status);
      
    // Step 2: Send email and initiate payment (only if DB success)
    if (response.status === 200) {
      const emailData = {
        name: formData.name || "User",
        sessionDate: formData.sessionDate || "",
        sessionTime: formData.sessionTime || "",
        subject: "Thank You For Submitting the form",
        email: formData.email,
      };
      
      const mail_response = await sendFormEmail(emailData);
      console.log("Email response:", mail_response.success);
      console.log("Email sent successfully!");
      await handle_payment(formData, form);
    }

    return response;
  } catch (error) {
    console.error("Service Handler Error:", error.message);
    return { success: false, error: error.message };
  }
};


