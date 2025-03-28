import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [allowedRoutes, setAllowedRoutes] = useState([]);
  const navigate = useNavigate();

  // Function to update user state from localStorage
  const updateUserState = () => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("userRole");
    const storedUsername = localStorage.getItem("username");
    const storedRoutes = localStorage.getItem("allowedRoutes");
    
    setIsLoggedIn(loginStatus === "true");
    setUserRole(storedRole || "");
    setUsername(storedUsername || "");
    setAllowedRoutes(storedRoutes ? JSON.parse(storedRoutes) : []);
  };

  useEffect(() => {
    // Initial check for login status
    updateUserState();

    // Add custom event listener for login state changes
    window.addEventListener("loginStateChange", updateUserState);
    
    // Add storage event listener to catch changes from other tabs/windows
    window.addEventListener("storage", (event) => {
      if (event.key === "isLoggedIn" || event.key === "userRole" || 
          event.key === "username" || event.key === "allowedRoutes") {
        updateUserState();
      }
    });

    // Cleanup event listeners
    return () => {
      window.removeEventListener("loginStateChange", updateUserState);
      window.removeEventListener("storage", updateUserState);
    };
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    // Clear login status and user info
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("allowedRoutes");
    
    setIsLoggedIn(false);
    setUserRole("");
    setUsername("");
    setAllowedRoutes([]);
    
    // Dispatch custom event for other components to react
    window.dispatchEvent(new Event("loginStateChange"));
    
    // Redirect to home page
    navigate("/");
  };

  // Check if a route is allowed for the current user
  // const isRouteAllowed = (route) => {
  //   return allowedRoutes.some(allowedRoute => {
  //     // Handle route parameters like :id
  //     if (allowedRoute.includes(':')) {
  //       const baseAllowedRoute = allowedRoute.split('/:')[0];
  //       return route.startsWith(baseAllowedRoute);
  //     }
  //     return allowedRoute === route;
  //   });
  // };

  return (
    <footer className="footer">
      <div className="containerFooter">
        <div className="top-section">
          <div className="logo">
            <img className="footer_img" src="https://mento.in/wp-content/uploads/2024/11/text.png" alt="Mento Logo" />
          </div>
        </div>

        <div className="nav-links">
          <div className="nav-section">
            <h3>Services</h3>
            <ul>
              <li><a href="/counseling">Home</a></li>
              <li><a href="/therapy">About us</a></li>
              <li><a href="/contact">Connect to us</a></li>
              <li><a href="/mental-wellness">Get a Therapy</a></li>
            </ul>
          </div>
          <div className="nav-section">
            <h3>Resources</h3>
            <ul>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/tools">Self-Help Tools</a></li>
              <li><a href="/faqs">FAQs</a></li>
            </ul>
          </div>
          <div className="nav-section">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <p>contact@mento.com</p>
            </div>
          </div>
          <div className="nav-section">
            <h3>Others</h3>
            <ul>
              <li><a href="/about">Our Story</a></li>
              <li><a href="#experts">Our Team</a></li>
              
              {/* Admin links based on user role and permissions */}
              {isLoggedIn && (
                <>
                  {/* {isRouteAllowed("/admin/admin-dashboard") && (
                    <li><a href="/admin/admin-dashboard">Admin Dashboard</a></li>
                  )}
                  {isRouteAllowed("/admin/blog-management") && (
                    <li><a href="/admin/blog-management">Manage Blogs</a></li>
                  )} */}
                   <li><a href="/admin/admin-dashboard">Admin Dashboard</a></li>
                  <li className="user-info">
                    <span>Logged in as: {username} ({userRole})</span>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="logout-button"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="bottom-section">
          <div className="copyright">
            Copyright © 2025 Mento. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="/Cookies-Privacy-Policy">Privacy Policy</a>
            <a href="/terms-conditions">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;