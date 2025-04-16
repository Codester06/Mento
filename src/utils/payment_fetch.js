// paymentService.js

export const initiatePayment = async (formData) => {
    const { name, mobile, amount } = formData;
  
    if (!name.trim()) throw new Error("Please enter your name");
    if (!mobile.trim()) throw new Error("Please enter your mobile number");
    if (!/^\d{10}$/.test(mobile)) throw new Error("Enter a valid 10-digit mobile number");
    if (!amount.trim()) throw new Error("Please enter an amount");
    if (isNaN(amount) || Number(amount) <= 0) throw new Error("Enter a valid amount greater than 0");
  
    const response = await fetch(process.env.REACT_WORDPRESS_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mobile, amount }),
    });
  
    const data = await response.json();
  
    if (!response.ok || !data.redirectUrl) {
      throw new Error(data.message || "Failed to initiate payment.");
    }
  
    return data.redirectUrl;
  };
  