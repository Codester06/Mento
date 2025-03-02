import ContactForm from "../components/contact/contactFrom";
import ContactSection from "../components/contact/heading_contact";
import BannerCu from "../components/contact/bannercu";
import '../components/contact/contact.css'

const Contact = () => {
    return(<>
    <div className="banner-container">
      <BannerCu/>
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