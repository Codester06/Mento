import React, { useState } from 'react';
import './demo.css'; // Your styling
import axios from 'axios';
import { Buffer } from 'buffer'; // Browser-compatible base64 encoder

const MID = process.env.REACT_APP_MID; // Replace with your PhonePe Merchant ID
const PAY_API = process.env.REACT_APP_PHONE_PAY_API;
const API_KEY = process.env.REACT_APP_PHONE_PAY_API_KEY; // Salt key
const INDEX = process.env.REACT_APP_PHONE_PAY_SALT_INDEX; // Salt index

// Web crypto SHA-256
const sha256Hash = async (message) => {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Signature generator for PhonePe
const GenerateSignature = async (payload, saltKey) => {
  const payloadString = JSON.stringify(payload);
  const base64Payload = Buffer.from(payloadString).toString('base64');
  const stringToHash = base64Payload + "/pg/v1/pay" + saltKey;
  const signature = await sha256Hash(stringToHash);
  return { base64Payload, signature };
};

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    amount: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Basic validation
      const { name, mobile, amount } = formData;
      if (!name || !mobile || !amount) throw new Error("Please fill all fields.");
      if (!/^\d{10}$/.test(mobile)) throw new Error("Enter a valid 10-digit mobile number.");
      if (isNaN(amount) || Number(amount) <= 0) throw new Error("Enter a valid amount.");

      const transactionId = `txn_${Date.now()}`;
      const payload = {
        merchantId: MID,
        merchantTransactionId: transactionId,
        merchantUserId: mobile.substring(0, 4) + Date.now().toString().substring(7),
        amount: parseInt(amount) * 100, // in paise
        redirectUrl: `${process.env.REACT_APP_FRONTEND_URL}/payment-status?txnId=${transactionId}`,
        redirectMode: "REDIRECT",
        callbackUrl: `${process.env.REACT_APP_API_GATEWAY_URL}/payment-callback`,
        mobileNumber: mobile,
        paymentInstrument: { type: "PAY_PAGE" }
      };

      const { base64Payload, signature } = await GenerateSignature(payload, API_KEY);

      const headers = {
        'Content-Type': 'application/json',
        'X-VERIFY': signature + "###" + INDEX,
        'X-MERCHANT-ID': MID,
        'User-Agent': 'PhonePeIntegrationReact/1.0'
      };

      const response = await axios.post(PAY_API, { request: base64Payload }, { headers });
      const data = response.data;

      if (data.success && data.data?.instrumentResponse?.redirectUrl) {
        window.location.href = data.data.instrumentResponse.redirectUrl;
      } else {
        throw new Error(data.message || 'Payment failed, no redirect URL found.');
      }

    } catch (err) {
      setError(err.message || "Something went wrong");
      console.error("Payment Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>PhonePe Payment</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text" name="name" value={formData.name}
            onChange={handleChange} placeholder="Your name" disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="tel" name="mobile" value={formData.mobile}
            onChange={handleChange} placeholder="10-digit mobile" maxLength="10" disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number" name="amount" value={formData.amount}
            onChange={handleChange} placeholder="Enter amount" min="1" disabled={loading}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
