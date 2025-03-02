import ContactForm from "../components/contact/contactFrom";
import ContactSection from "../components/contact/heading_contact";
import Banner_cu from "../components/contact/bannercu";
import '../components/contact/contact.css'

const Contact = () => {
    return(<>
    <div className="banner-container">
      <Banner_cu />
      <div className="contact-section-container">
        <ContactSection />
      </div>
    </div>
    <div className="contact-form-container">
      <ContactForm /></div>
 </>
    )
}

export default Contact;