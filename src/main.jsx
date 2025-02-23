import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navigation/navbar";
import Contact from "./pages/contact";
import Other from "./pages/other";
import Home from "./pages/home";
import MentalWellness from "./pages/mentalWellness";
import Footer from "./components/Footer/footerSection";
import NotFound from "./pages/404"; // Importing the 404 Page Component

function Main() {
  return (
    <Router>
      <div id="root">
        <Navbar />
        <div className="main-content"> {/* Main content wrapper */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/other" element={<Other />} />
            <Route path="/mental-wellness" element={<MentalWellness />} />
            <Route path="*" element={<NotFound />} /> {/* 404 Route */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Main;
