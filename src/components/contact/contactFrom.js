import { useRef, useState } from "react";
import "./contactFrom.css";
import { handle_service } from "../../utils/services";
import logoIcon from "../../assets/images/logos/mentoLogoIcon.png";
const ContactForm = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      fullName: formRef.current.fullName.value,
      email: formRef.current.email.value,
      subject: formRef.current.subject.value,
      message: formRef.current.message.value,
      submittedAt: new Date().toISOString(), // Add timestamp to the form data
    };

    try {
      handle_service(formData, "contact_form");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="ContainerMainFrom">
      <div className="contact-containerFrom">
        {/* Left Section */}
        <div className="contact-infoFrom">
          <div className="contact-header">
            <div className="Contact-header-title">
              <h2>Let's chat.</h2>
              <h3>Tell us about.</h3>
            </div>
            <img className="ContactLogo" src={logoIcon} height="350px" alt="" />
          </div>

          <div className="contact-email">
            <div className="email-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p>Call us at</p>
              <a href="tel:+919120719120" target="_blank" rel="noopener noreferrer">
              +91 9120719120
              </a>
            </div>
          </div>

          <div className="contact-email">
            <div className="email-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p>Mail us at</p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@mento.in"
                target="_blank"
                rel="noopener noreferrer"
              >
                connect@mento.in
              </a>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="contact-form">
          <h2>Send us a message</h2>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name*"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject*"
                required
              />
            </div>

            <div className="form-group">
              <p>Tell us more..</p>
              <textarea
                name="message"
                placeholder="Type your message*"
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
