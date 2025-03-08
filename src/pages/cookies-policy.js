import React from "react";
import "../assets/css/TermsUsage.css";

const CookiesPolicy = () => {
  return (
    <div className="terms-container">
      {/* Banner */}
      <div className="bannerTerms">
        <h1>Cookies & Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="contentTerms">
        <p>Mento.in uses cookies to enhance your experience.</p>
        <p>
          This Cookies Policy explains what cookies are, how we use them, and how you can control them.
        </p>

        <h2>Effective Date</h2>
        <p>November 16, 2024</p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help the website
          function correctly and provide a better user experience.
        </p>

        <h2>How We Use Cookies</h2>
        <p>We use cookies to:</p>
        <ul>
          <li>Remember your preferences.</li>
          <li>Analyze website traffic and improve functionality.</li>
          <li>Provide personalized content and advertisements.</li>
        </ul>

        <h2>Types of Cookies We Use</h2>
        <ul>
          <li><strong>Essential Cookies:</strong> Necessary for the website to function.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how users interact with the website.</li>
          <li><strong>Advertising Cookies:</strong> Deliver targeted advertisements based on your interests.</li>
        </ul>

        <h2>Managing Cookies</h2>
        <p>
          You can control and delete cookies through your browser settings. However, disabling cookies
          may affect your user experience on our website.
        </p>

        <h2>Third-Party Cookies</h2>
        <p>
          Some cookies on our website are placed by third parties, such as analytics or advertising providers.
        </p>

        <h2>Contact Us</h2>
        <p>
          For questions about this Cookies Policy, please contact us at
          <a href="mailto:support@mento.in"> support@mento.in</a>.
        </p>
      </div>
    </div>
  );
};

export default CookiesPolicy;