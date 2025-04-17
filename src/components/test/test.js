const crypto = require('crypto');

// Configuration values
const MID = "M22P636AI5XXJ";
const SALT_KEY = "4ae4f46f-5e04-4e4e-9cb4-2881a4eb0c4c";
const SALT_INDEX = "1";

// Expected X-Verify value
const expectedXVerify = "0402c97f9fea9dda484df97eeffd6162a3257019fbf375be2483056d04d79d7d###1";

// This is the input request body
const requestBody = {
"body": "{\"name\": \"John Doe\", \"amount\": 100, \"mobile\": \"9876543210\"}"
};

// Parse the JSON string in the body property
const parsedBody = JSON.parse(requestBody.body);
console.log("Parsed Body:", parsedBody);

// Extract values from the parsed body
const amount = parsedBody.amount.toString();
const mobile = parsedBody.mobile;
const name = parsedBody.name;

// Other parameters
const email = "shashankholkar@gmail.com";
const transactionId = "1234";
const redirectUrl = "https://67a0-49-43-0-103.ngrok-free.app/payment-status?txnId=${transactionId}";
const callbackUrl = 'https://qv8ma5t1gk.execute-api.ap-south-1.amazonaws.com/dev/callback_url';

// Create the payload using the parsed body values
const payload = {
  merchantId: MID,
  merchantTransactionId: transactionId,
  merchantUserId: email,
  amount: parseInt(amount) * 100, // Amount from parsed body, converted to paise
  redirectUrl: redirectUrl,
  redirectMode: "POST",
  callbackUrl: callbackUrl,
  mobileNumber: mobile, // Mobile from parsed body
  paymentInstrument: {
    type: "PAY_PAGE"
  }
};

console.log("Payload:", JSON.stringify(payload, null, 2));

// Encode payload to base64
const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
console.log("Base64 Payload:", base64Payload);
const exbase = "eyJtZXJjaGFudElkIjoiTTIyUDYzNkFJNVhYSiIsIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6IjEyMzQiLCJtZXJjaGFudFVzZXJJZCI6InNoYXNoYW5raG9sa2FyQGdtYWlsLmNvbSIsImFtb3VudCI6MTAwMDAsInJlZGlyZWN0VXJsIjoiaHR0cHM6Ly82N2EwLTQ5LTQzLTAtMTAzLm5ncm9rLWZyZWUuYXBwL3BheW1lbnQtc3RhdHVzP3R4bklkPSR7dHJhbnNhY3Rpb25JZH0iLCJyZWRpcmVjdE1vZGUiOiJQT1NUIiwiY2FsbGJhY2tVcmwiOiJodHRwczovL3F2OG1hNXQxZ2suZXhlY3V0ZS1hcGkuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL2Rldi9jYWxsYmFja191cmwiLCJtb2JpbGVOdW1iZXIiOiI5ODc2NTQzMjEwIiwicGF5bWVudEluc3RydW1lbnQiOnsidHlwZSI6IlBBWV9QQUdFIn19"
// Generate X-Verify header
const stringToHash = base64Payload + "/pg/v1/pay" + SALT_KEY;
const sha256 = crypto.createHash("sha256").update(stringToHash).digest("hex");
const xVerify = sha256 + "###" + SALT_INDEX;

console.log("Generated X-Verify:", xVerify);
console.log("Expected X-Verify:", expectedXVerify);
console.log("Do they match?", xVerify === expectedXVerify);
console.log("Do they match?", base64Payload === exbase);
// If they don't match, let's troubleshoot_
if (xVerify !== expectedXVerify) {
  console.log("\n---- Troubleshooting ----");
  console.log("Generated SHA-256:", sha256);
  console.log("Expected SHA-256:", expectedXVerify.split("###")[0]);
  console.log("String being hashed:", stringToHash);
}

// Final request object that you would send
const requestData = {
  request: base64Payload
};

console.log("\nFinal Request Object:", requestData);