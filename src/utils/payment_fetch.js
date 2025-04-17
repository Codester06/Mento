// paymentService.js

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