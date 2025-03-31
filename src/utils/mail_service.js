
export async function gmail_sendEmail(resource,toEmail, subject, message) {
    const apiUrl = `${process.env.REACT_APP_EMAIL_AWS_API}/${resource}`; // Append resource to the URL
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ toEmail, subject, message }),
      });
  
      const data = await response.json();
      return data; // Returns success or error response
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error: error.message };
    }
  }
  