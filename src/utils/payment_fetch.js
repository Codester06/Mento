// paymentService.js
import React, { createContext, useState, useContext, Children } from 'react';

import axios from "axios";
import { form } from 'framer-motion/client';

// A provider component that wraps your application


export const initiatePayment = async (formData) => {
  const name = formData.name;
  const mobile = formData.contactNo;
  // Use the sessionDuration value from the form
  const amount = parseFloat(formData.sessionDuration);
  
  const response = await fetch("https://mento.in/wp-json/custom/v1/initiate-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, mobile, amount }),
  });
  console.log("Request body:", name, mobile, amount);
  
  const data = await response.json();
  
  window.location.href = data.redirectUrl;
  if (!response.ok || !data.redirectUrl) {
    throw new Error(data.message || "Failed to initiate payment.");
  }
  
  return data.redirectUrl;
};





// ✅ Accept updateValue as a parameter
export const submitToAWS = async (formData) => {
  const send_data = {
    name: formData.name,
    email: formData.email,
    phone: formData.contactNo,
  };
  // Convert sessionDuration string to a number
  formData.amount = parseFloat(formData.sessionDuration);
  console.log("sessionDuration", formData);
 

  try {
    const response = await axios.post(
      "https://qv8ma5t1gk.execute-api.ap-south-1.amazonaws.com/dev/pay",
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.success) {
      console.log("success:", response.data);
      const redirecturl = response.data.phonepe_redirectUrl || "/success";
      // window.location.href = redirecturl;
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.error("AWS API Error:", error.message);
    alert("API call failed. Please try again.");
  }
};



// ✅ Accept updateValue as a parameter
export const prod_aws_payment = async (formData) => {
  const send_data = {
    name: formData.name,
    email: formData.email,
    phone: formData.contactNo,
  };
  // Convert sessionDuration string to a number
  formData.amount = parseFloat(formData.sessionDuration);
  console.log("sessionDuration", formData);
 

  try {
    const response = await axios.post(
      "https://9blcigs1f3.execute-api.ap-south-1.amazonaws.com/prod/pay",
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    

    if (response.data.success) {
      console.log("success:", response.data);
      const redirectUrlFromPhonePe = response.data.redirectUrl;
      console.log("Redirect URL from PhonePe:", redirectUrlFromPhonePe);
      
      window.location.href = redirectUrlFromPhonePe;
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.error("AWS API Error:", error.message);
    alert("API call failed. Please try again.");
  }
};
