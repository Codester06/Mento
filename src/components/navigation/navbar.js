import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navContainer">
      <div className="navLogo">
        <img src="https://mento.in/wp-content/uploads/2024/11/text.png" alt="mentologo" />
      </div>

      {/* Navigation Links */}
      <div className={`navLink ${isOpen ? "open" : ""}`}>
        <ul className="navLinks">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setIsOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/mental-wellness" className={location.pathname === "/mental-wellness" ? "active" : ""} onClick={() => setIsOpen(false)}>Mental Wellness</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""} onClick={() => setIsOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/blogs" className={location.pathname === "/blogs" ? "active" : ""} onClick={() => setIsOpen(false)}>Blog</Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""} onClick={() => setIsOpen(false)}>About</Link>
          </li>
        </ul>
      </div>

      <div className="navButtons">
        <Link to="/Self-Assessment-Tool" onClick={() => setIsOpen(false)}>
          <h1>Take a Free Assessment</h1>
        </Link>
      </div>

      <div className="navButtons Phone">
        <Link to="/Self-Assessment-Tool" onClick={() => setIsOpen(false)}>
          <h1>Take Assessment</h1>
        </Link>
      </div>

      {/* Animated Hamburger Icon for Mobile */}
      <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

    </nav>
  );
};

export default Navbar;