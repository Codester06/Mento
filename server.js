// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { generatePhonePeSignature } = require('./utils');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const MID = 'PGTESTPAYUAT105';
const SALT_KEY = 'c45b52fe-f2c5-4ef6-a6b5-131aa89ed133';
const SALT_INDEX = 1;

const UAT_PAY_API = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

app.post('/pay', async (req, res) => {
  const { amount, mobile, name } = req.body;

  const transactionId = "T" + Date.now();

  const payload = {
    merchantId: MID,
    merchantTransactionId: transactionId,
    merchantUserId: "MUID123",
    amount: parseInt(amount) * 100, // convert to paise
    redirectUrl: `http://localhost:3000/payment-status`,
    redirectMode: "REDIRECT",
    callbackUrl: `http://localhost:3000/payment-callback`,
    mobileNumber: mobile,
    paymentInstrument: {
      type: "PAY_PAGE"
    }
  };

  const { base64Payload, signature } = generatePhonePeSignature(payload, SALT_KEY);

  const headers = {
    'Content-Type': 'application/json',
    'X-VERIFY': signature + "###" + SALT_INDEX,
    'X-MERCHANT-ID': MID
  };

  try {
    const response = await axios.post(UAT_PAY_API, {
      request: base64Payload
    }, { headers });

    if (response.data.success) {
      res.json({ redirectUrl: response.data.data.instrumentResponse.redirectInfo.url });
    } else {
      res.status(400).json({ error: "Failed to initiate payment" });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/payment-status/:transactionId', async (req, res) => {
  try {
    const txnId = req.params.transactionId;
    const path = `/pg/v1/status/${MID}/${txnId}`;
    const stringToSign = path + SALT_KEY;
    const sha256 = crypto.createHash('sha256').update(stringToSign).digest('hex');
    const signature = sha256;

    const response = await axios.get(`https://api-preprod.phonepe.com/apis/pg-sandbox${path}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-VERIFY': `${signature}###${SALT_INDEX}`,
      },
    });

    const status = response.data?.data?.state;
    res.json({ status });
  } catch (error) {
    console.error('Status Check Error:', error.response?.data || error.message);
    res.status(500).json({ status: 'error', message: 'Failed to fetch payment status' });
  }
});
