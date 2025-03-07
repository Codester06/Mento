import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/navbar";

import Blogs from "./pages/blog";
import Home from "./pages/home";
import MentalWellness from "./pages/mentalWellness";
import Footer from "./components/Footer/footerSection";
import NotFound from "./pages/404"; // Importing the 404 Page Component
import About from "./pages/about";
import ContactForm from "./pages/contact";
import Faq from "./pages/faq";
import ExpertDetail from "./pages/ExpertDetail";
import TermsUsage from "./pages/terms-of-usage";
import CookiesPolicy from "./pages/cookies-policy";

function Main() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <div className="main-content"> {/* Main content wrapper */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/mental-wellness" element={<MentalWellness />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={< About/>} />
            <Route path="/faqs" element={<Faq/>} />
            <Route path="/expert/:id" element={<ExpertDetail />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Route */}
            <Route path="/terms-conditions" element={<TermsUsage/>}/>
            <Route path="/cookies-privacy-policy" element={<CookiesPolicy/>}/>

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Main;
