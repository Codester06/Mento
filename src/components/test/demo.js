import React, { useState } from 'react';
import { postDataBS } from '../../utils/awsService';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to send to the backend
    const formData = {
      name,
      email,
      message,
    };

    try {
      // Call the sendEmail function
      const response = await postDataBS('/expert_table',formData);
//    const response = await  sendEmailAPI('send_mail', 'baddeep106@gmail.com', 'Test Subject', '<h1>Hello, this is a test email!</h1>');

      if (response.success) {
        setStatus('Email sent successfully!');
        console.log(response)
      } else {
        setStatus(`Error: ${response.message}`);
        console.log(response.message)

      }
    } catch (error) {
      setStatus('An error occurred while sending the email.');
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Form