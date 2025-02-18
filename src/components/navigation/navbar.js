import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navContainer">
      <div className="navLogo">
        <img src="https://mento.in/wp-content/uploads/2024/11/text.png" alt="mentologo" />
      </div>

      <div className="navLink">
        <ul className="navLinks">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <Link to="/mental-wellness" className={location.pathname === "/mental-wellness" ? "active" : ""}>Mental Wellness</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
          </li>
          <li>
            <Link to="/others" className={location.pathname === "/others" ? "active" : ""}>Blog</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          </li>
        </ul>
      </div>

      <div className="navButtons">
        <Link to="/assessment">
          <h1>Take a Free Assessment</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
