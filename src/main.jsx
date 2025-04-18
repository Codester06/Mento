import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
import AssessmentPage from "./pages/AssessmentToolPage";
import "./index.css";
import DepressionTestPage from "./pages/DepressionTestPage";
import AdminBlog from "./adminPages/BlogAdmin";
import BlogDetail from "./components/blogs/blogDetail";
import CouplePage from "./components/FormsPages/Couple/CouplePage";
import FamilyFriendsPage from "./components/FormsPages/FamilyFriends/FamilyFriendsPage";
import IndividualPage from "./components/FormsPages/Individual/IndividualPage";
import Login from "./components/Login/loginAdmin"; // Import the new Login component
import Logout from "./components/Login/Logout";
import Dashboard from "./adminPages/adminDashboard/dashboard";
import IndividualDetails from "./adminPages/response/detailResponse/IndividualDetailsResponse";
import CouplePanel from "./adminPages/response/CoupleResponse";
import IndividualPanel from "./adminPages/response/IndividualResponse";
import FriendsFamilyPanel from "./adminPages/response/FamilyFriends";
import CoupleDetails from "./adminPages/response/detailResponse/CoupleDetailsResponse";
import FamilyFriendsDetails from "./adminPages/response/detailResponse/FamilyFriendsDetailsResponse";
import ContactFormDetails from "./adminPages/response/detailResponse/contactPanelDetails"
import ContactFormPanel from "./adminPages/response/ContactPanel"
import DepressionTestPanel from "./adminPages/response/depressiontestPanel";
import DepressionTestDetails from "./adminPages/response/detailResponse/depressiondetail";
import GeneralHealthTestPage from "./pages/generalHealthTest";
import AnxietyTestPage from "./pages/AniextyTestPage";
import ThankYouStep from "./components/payment/thankyyoupage";
import GeneralHealthTestPanel from "./adminPages/response/generalHealthTest";
import AnxietyTestPanel from "./adminPages/response/anxietyTest";
import AnxietyTestDetails from "./adminPages/response/detailResponse/anxietyTestDetail";
import GeneralHealthTestDetails from "./adminPages/response/detailResponse/generalHealthdetail";


const RightClickDisabledWrapper = ({ children }) => {
  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return <>{children}</>;
};


// import PaymentForm from "./components/test/demo";

// import PhoneyPayStatusPage from "./components/test/demo_payment_status";

const ProtectedRoute = ({ element, requiredRole = null }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const userRole = localStorage.getItem("userRole");

      setIsAuthenticated(isLoggedIn);

      // Check if user has required role (if specified)
      if (requiredRole) {
        setHasAccess(isLoggedIn && userRole === requiredRole);
      } else {
        setHasAccess(isLoggedIn);
      }

      setLoading(false);
    };

    checkAuth();
  }, [requiredRole]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to 404 if not authenticated instead of showing login
  if (!isAuthenticated) {
    return <NotFound />;
  }

  if (!hasAccess) {
    return (
      <div className="access-denied">
        You don't have permission to access this page.
      </div>
    );
  }

  return element;
};
export const Context = React.createContext();
 
function Main() {
  const [data, setData] = useState(null);

  return (
    <BrowserRouter>
    {/* <RightClickDisabledWrapper> */}
      <div id="root">
        <Navbar />
        <div className="main-content">
          {" "}
          {/* Main content wrapper */}
          <Context.Provider value={{ data, setData }}>

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/mental-wellness" element={<MentalWellness />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/expert/:id" element={<ExpertDetail />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Route */}
            <Route path="/terms-conditions" element={<TermsUsage />} />
            <Route path="/cookies-privacy-policy" element={<CookiesPolicy />} />
            <Route path="/Self-Assessment-Tool" element={<AssessmentPage />} />
            <Route path="/Depression-Tool" element={<DepressionTestPage />} />
            <Route path="/General-Health-Tool" element={<GeneralHealthTestPage />} />
            <Route path="/Anxiety-Disorder-Tool" element={<AnxietyTestPage />} />
            <Route path="/login-mento" element={<Login />} /> {/* Login route */}
            <Route path="/logout" element={<Logout />} /> {/* Logout route */}

               
               <Route path="/payment-status" element={<ThankYouStep />} /> Logout route
            {/* <Route path="/payment-callback" element={<PaymentStatus />} /> Logout route */}
            
            {/* blogs */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            {/* Forms */}
            <Route path="/couple_therapy" element={<CouplePage />} />
            <Route path="/individual_therapy" element={<IndividualPage />} />
            <Route
              path="/familyFriends_therapy"
              element={<FamilyFriendsPage />}
            />
            {/* ------- */}
            {/* admin - protected routes */}
            <Route
              path="/admin/admin-dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/admin/blog-management"
              element={<ProtectedRoute element={<AdminBlog />} />}
            />
            <Route
              path="/admin/responses/individual-responses/:id"
              element={<ProtectedRoute element={<IndividualDetails />} />}
            />
            <Route
              path="/admin/responses/couple-responses/:id"
              element={<ProtectedRoute element={<CoupleDetails />} />}
            />
             <Route
              path="/admin/responses/depression-test/:id"
              element={<ProtectedRoute element={<DepressionTestDetails />} />}
            />
             <Route
              path="/admin/responses/anxiety-test/:id"
              element={<ProtectedRoute element={<AnxietyTestDetails />} />}
            />
             <Route
              path="/admin/responses/generalHealthTest/:id"
              element={<ProtectedRoute element={<GeneralHealthTestDetails />} />}
            />
            <Route
              path="/admin/responses/family-friends-responses/:id"
              element={<ProtectedRoute element={<FamilyFriendsDetails />} />}
            />
            <Route
              path="/admin/responses/individual-responses"
              element={<ProtectedRoute element={<IndividualPanel />} />}
            />
            <Route
              path="/admin/responses/couple-responses"
              element={<ProtectedRoute element={<CouplePanel />} />}
            />
              <Route
              path="/admin/responses/depression-test"
              element={<ProtectedRoute element={<DepressionTestPanel />} />}
            />
              <Route
              path="/admin/responses/GeneralHealthTest"
              element={<ProtectedRoute element={<GeneralHealthTestPanel />} />}
            />
              <Route
              path="/admin/responses/AnxietyTest"
              element={<ProtectedRoute element={<AnxietyTestPanel />} />}
            />
            <Route
              path="/admin/responses/family-friends-responses"
              element={<ProtectedRoute element={<FriendsFamilyPanel />} />}
            />
            <Route
              path="/admin/responses/contact-form-responses"
              element={<ProtectedRoute element={<ContactFormPanel />} />}
            />
            <Route
              path="/admin/responses/contact-form-responses/:id"
              element={<ProtectedRoute element={<ContactFormDetails />} />}
            />
          </Routes>
           </Context.Provider >
        </div>
        <Footer />
      </div>
      {/* </RightClickDisabledWrapper> */}
    </BrowserRouter>
  );
}

export default Main;