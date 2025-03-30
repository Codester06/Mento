import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

// Helper function to record login/logout activity
const recordActivity = (username, role, action) => {
  // Get existing activities or initialize empty array
  const existingActivities = JSON.parse(localStorage.getItem("loginActivities") || "[]");
  
  // Add new activity
  const newActivity = {
    username,
    role,
    action, // 'login' or 'logout'
    timestamp: new Date().toISOString()
  };
  
  // Save updated activities
  localStorage.setItem("loginActivities", JSON.stringify([...existingActivities, newActivity]));
};

// Load user data from environment variables
const loadUsersFromEnv = () => {
  // Debug to check environment variables
  console.log("Admin username:", process.env.REACT_APP_ADMIN_USERNAME);
  
  const users = [
    {
      username: process.env.REACT_APP_ADMIN_USERNAME || "admin",
      password: process.env.REACT_APP_ADMIN_PASSWORD || "admin123",
      role: process.env.REACT_APP_ADMIN_ROLE || "admin",
      allowedRoutes: process.env.REACT_APP_ADMIN_ROUTES ? 
        process.env.REACT_APP_ADMIN_ROUTES.split(",") : 
        ["/admin/responses", "/admin/blog", "/admin/responses/:id", "/admin/login-activities","/admin/admin-dashboard"]
    },
    {
      username: process.env.REACT_APP_EDITOR_USERNAME || "editor",
      password: process.env.REACT_APP_EDITOR_PASSWORD || "editor123",
      role: process.env.REACT_APP_EDITOR_ROLE || "editor",
      allowedRoutes: process.env.REACT_APP_EDITOR_ROUTES ? 
        process.env.REACT_APP_EDITOR_ROUTES.split(",") : 
        ["/admin/blog-management"]
    }
  ];
  
  return users;
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load valid users from environment variables
  const validUsers = loadUsersFromEnv();
  
  // Check if user was logged in before and setup logout event listener
  useEffect(() => {
    const handleBeforeUnload = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("userRole");
        recordActivity(username, role, "logout");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Debug to check the valid users and submitted credentials
    console.log("Valid users:", validUsers);
    console.log("Submitted username:", username);
    console.log("Submitted password:", password);
    
    // Find matching user
    const user = validUsers.find(
      user => user.username === username && user.password === password
    );
    
    if (user) {
      // Record login activity
      recordActivity(user.username, user.role, "login");
      
      // Store user info in localStorage
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("username", user.username);
      localStorage.setItem("allowedRoutes", JSON.stringify(user.allowedRoutes));
      localStorage.setItem("loginTime", new Date().toISOString());
      
      window.dispatchEvent(new Event("loginStateChange"));

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/admin-dashboard");
      } else if (user.role === "editor") {
        navigate("/admin/blog");
      } else if (user.role === "support") {
        navigate("/admin/responses");
      }
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;