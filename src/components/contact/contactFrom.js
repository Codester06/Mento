import { useRef,useState } from "react";
import "./contactFrom.css";
import { postData } from "../../utils/awsService";

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
    };

    try {
      // Save data to Firebase
      // await push(ref(database, "contact_forms"), formData);
      await postData('/contact_form', formData);

      alert("Message sent successfully!");

      // Reset form fields
      formRef.current.reset();
    } catch (error) {

      alert("Failed to save message!");
    } finally {
      setLoading(false);
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
            <img
              className="ContactLogo"
              src="https://mento.in/wp-content/uploads/2025/01/mentoLogoIcon.png"
              height="350px"
              alt=""
            />
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
              <a href="mailto:contact@tailgrids.com">connectmento@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="contact-form">
          <h2>Send us a message</h2>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="text" name="fullName" placeholder="Full Name*" required />
            </div>

            <div className="form-group">
              <input type="email" name="email" placeholder="Email Address*" required />
            </div>

            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject*" required />
            </div>

            <div className="form-group">
              <p>Tell us more..</p>
              <textarea name="message" placeholder="Type your message*" rows="6" required></textarea>
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
