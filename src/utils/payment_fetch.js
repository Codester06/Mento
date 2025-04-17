// paymentService.js
import axios from "axios";
export const initiatePayment = async (formData) => {
   const name = formData.name;
   const mobile = formData.contactNo;
    const amount = 1;
  
  
    const response = await fetch("https://mento.in/wp-json/custom/v1/initiate-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mobile, amount }),
    });
    console.log("Request body:",name, mobile, amount);
  
    const data = await response.json();
   
   window.location.href = data.redirectUrl;
    if (!response.ok || !data.redirectUrl) {
      throw new Error(data.message || "Failed to initiate payment.");
    }
  
    return data.redirectUrl;
  };





export const submitToAWS = async (name, amount, number) => {
  const data = { name, amount, number };

  try {
    const response = await axios.post(
      "https://qv8ma5t1gk.execute-api.ap-south-1.amazonaws.com/dev/pay",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.success) {
      console.log("AWS API success:", response.data);
    const  redirecturl = response.data.phonepe_redirectUrl || "/success";
      window.location.href = redirecturl;
      console.log("Redirecting to:", redirecturl);
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.error("AWS API Error:", error.message);
    alert("API call failed. Please try again.");
  }
};
