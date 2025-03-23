import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
import Test from "./pages/DepressionTestPage";
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

// Protected route component
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

  if (!isAuthenticated) {
    return <Login />;
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

function Main() {
  return (
    <BrowserRouter>
      <div id="root">
        <Navbar />
        <div className="main-content">
          {" "}
          {/* Main content wrapper */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/mental-wellness" element={<MentalWellness />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/expert/:id" element={<ExpertDetail />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Route */}
            <Route path="/terms-conditions" element={<TermsUsage />} />
            <Route path="/cookies-privacy-policy" element={<CookiesPolicy />} />
            <Route path="/Self-Assessment-Tool" element={<AssessmentPage />} />
            <Route path="/Depression-Tool" element={<Test />} />
            <Route path="/login" element={<Login />} /> {/* Login route */}
            <Route path="/logout" element={<Logout />} /> {/* Logout route */}
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
              path="/admin/responses/family-friends-responses"
              element={<ProtectedRoute element={<FriendsFamilyPanel />} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Main;
