// Function to send email via your Lambda API
async function sendEmailAPI(resource, to, subject, html) {
  const apiUrl = `${process.env.REACT_APP_EMAIL_AWS_API}/${resource}`;

  const requestBody = {
    to: to,
    subject: subject,
    html: html,
  };

  console.log("Sending request to:", apiUrl);
  console.log("Request body:", requestBody);

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("✅ Email sent successfully:", data);
    } else {
      console.error("❌ Failed to send email:", data);
    }
  } catch (error) {
    console.error("🚨 Error sending email:", error);
  }
}

export default sendEmailAPI;
