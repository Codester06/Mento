import React from 'react';

const EmailFormat = ({ recipientName, sessionDate, sessionTime, rescheduleLink="https://example.com/reschedule" }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f8f9fa', color: '#333', borderRadius: '10px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
     
        <h2 style={{ color: '#0056b3', marginTop: '20px' }}>Your Consultation is Confirmed! 🎉</h2>
      </div>

      <p style={{ fontSize: '16px' }}>Hello <strong>{recipientName}</strong>,</p>

      <p>We’re delighted to confirm your upcoming mental wellness consultation. Here are your appointment details:</p>

      <div style={{ backgroundColor: '#ffffff', padding: '15px', borderLeft: '5px solid #0056b3', boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', margin: '20px 0' }}>
        <h3 style={{ marginTop: '0', color: '#0056b3' }}>📅 Appointment Details:</h3>
        <p><strong>Date:</strong> {sessionDate}</p>
        <p><strong>Time:</strong> {sessionTime}</p>
      </div>

      <h3 style={{ color: '#0056b3' }}>🔹 What to Expect</h3>
      <ul style={{ lineHeight: '1.6' }}>
        <li>A counselor will contact you 24 hours before your session for confirmation.</li>
        <li>The session will last approximately 50 minutes.</li>
        <li>You will receive a secure video link before your session.</li>
        <li>Ensure you are in a quiet and private space.</li>
      </ul>

      <h3 style={{ color: '#d9534f' }}>🔄 Need to Reschedule?</h3>
      <p>If you need to make any changes, please contact us at least 24 hours in advance:</p>
      <p>📧 <a href="mailto:support@company.com" style={{ color: '#d9534f', textDecoration: 'none' }}>support@company.com</a></p>
      <p>📞 <a href="tel:+15551234567" style={{ color: '#d9534f', textDecoration: 'none' }}>(555) 123-4567</a></p>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a href={rescheduleLink} style={{ backgroundColor: '#0056b3', color: '#fff', padding: '12px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
          Reschedule My Appointment
        </a>
      </div>

      <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #ddd', textAlign: 'center', fontSize: '12px', color: '#777' }}>
        <p>We are committed to your well-being. 💙</p>
        <p>© 2025 <strong>Your Company Name</strong>. All rights reserved.</p>
        <p>
        <a href="https://example.com/cookies-policy" style={{ color: '#0056b3', textDecoration: 'none' }}>
    Privacy Policy
  </a> | 
  <a href="https://example.com/terms-of-usage" style={{ color: '#0056b3', textDecoration: 'none' }}>
    Terms of Service
  </a>
        </p>
      </div>
    </div>
  );
};



const GenerateEmailHTML = (email_content) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f8f9fa; color: #333; }
        </style>
    </head>
    <body>
        ${email_content}
    </body>
    </html>`;
};



 export { EmailFormat, GenerateEmailHTML };
