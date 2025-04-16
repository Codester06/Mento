// utils.js
const crypto = require('crypto');

function generatePhonePeSignature(payload, saltKey) {
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
  const stringToSign = base64Payload + "/pg/v1/pay" + saltKey;
  const sha256 = crypto.createHash("sha256").update(stringToSign).digest("hex");
  return { base64Payload, signature: sha256 };
}

module.exports = { generatePhonePeSignature };
