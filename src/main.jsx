import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navigation/navbar";
import Contact from "./pages/contact";
import Other from "./pages/other";
import Home from "./pages/home";
import MentalWellness from "./pages/mentalWellness";
import Footer from "./components/Footer/footerSection";
function main() {

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/others" element={<Other />} />
          <Route path="/mental-wellness" element={<MentalWellness />} />
        </Routes>
        <Footer/>
      </Router>
    );
  };


export default main;
