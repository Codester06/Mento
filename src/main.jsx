import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navigation/navbar";
import Contact from "./pages/contact";
import Other from "./pages/other";
import Home from "./pages/home";
function main() {

  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/others" element={<Other />} />
        </Routes>
      </Router>
    );
  };


export default main;
