import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AssessmentPage from "./pages/tool";
import './index.css';
import Test from "./pages/test";
import AdminPanel from "./adminPages/Response";
import ConsultationDetails from "./adminPages/detailsResponse";

function Main() {
  return (
    <BrowserRouter>
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
            <Route path="/Self-Assessment-Tool" element={<AssessmentPage/>}/>
            <Route path="/Depression-Tool" element={<Test/>}/>
            <Route path="/admin/responses" element={<AdminPanel/>}/>
  
          <Route 
            path="/admin/responses/:id" 
            element={
                <ConsultationDetails />
            } 
          />
            
            </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Main;
