import axios from "axios";

export const submitToAWS = async (name, amount, number) => {
  const data = { name, amount, number };

  try {
    const response = await axios.post(
      "https://your-api-id.execute-api.region.amazonaws.com/stage-name/your-endpoint",
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.success) {
      console.log("AWS API success:", response.data);
      // 🔁 Redirect to success page
      const redirecturl = response.data.redirectUrl || "/success";
      window.location.href = redirecturl;
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.error("AWS API Error:", error.message);
    alert("API call failed. Please try again.");
  }
};
