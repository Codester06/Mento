import {useState} from "react";
import './contactFrom.css'
const ContactForm = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      subject: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      
      // Reset form after submission
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      
      alert('Message sent successfully!');
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
            <img className="ContactLogo" src="https://mento.in/wp-content/uploads/2025/01/mentoLogoIcon.png" height="350px" alt=""/>
          </div>
          
          <div className="contact-email">
            <div className="email-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name*"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address*"
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject*"
                required
              />
            </div>
            
            <div className="form-group">
              <p>Tell us more..</p>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message*"
                rows="6"
                required
              ></textarea>
            </div>
            
            <button type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
      </div>
    );
  };
  
  export default ContactForm;