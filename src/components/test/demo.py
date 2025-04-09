import hashlib
import json
import requests

# Payload data
payload = {
    "merchantId": "MID123456789",
    "merchantTransactionId": "TXN123456789",
    "merchantUserId": "98762345678",
    "amount": 2,
    "redirectUrl": "https://example.com/payment-status?txnId=TXN123456789",
    "redirectMode": "REDIRECT",
    "callbackUrl": "https://api.example.com/payment-callback",
    "mobileNumber": "9876543210",
    "paymentInstrument": {
        "type": "PAY_PAGE"
    }
}

# Salt key and index
salt_key = "4ae4f46f-5e04-4e4e-9cb4-2881a4eb0c4c"
salt_index = "1"

# Convert payload to compact JSON string (no whitespace)
payload_str = json.dumps(payload, separators=(',', ':'))

# Create string to hash
string_to_hash = payload_str + "/pg/v1/pay" + salt_key

# Generate SHA-256 hash
hash_object = hashlib.sha256(string_to_hash.encode('utf-8'))
hashed_value = hash_object.hexdigest()

# Create X-VERIFY header
x_verify = f"{hashed_value}###${salt_index}"
print(x_verify)
# Print for reference
print("Payload String:", payload_str)
print("X-VERIFY:", x_verify)

# Headers
headers = {
    "Content-Type": "application/json",
    "X-VERIFY": x_verify,
    "X-MERCHANT-ID": payload["merchantId"]
}

# Endpoint URL

