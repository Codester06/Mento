import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      
      if (isLoggedIn) {
        // Record logout activity
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("userRole");
        
        // Get existing activities
        const existingActivities = JSON.parse(localStorage.getItem("loginActivities") || "[]");
        
        // Add new logout activity
        const newActivity = {
          username,
          role,
          action: "logout",
          timestamp: new Date().toISOString()
        };
        
        // Save updated activities
        localStorage.setItem("loginActivities", JSON.stringify([...existingActivities, newActivity]));
        
        // Clear user session data
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userRole");
        localStorage.removeItem("username");
        localStorage.removeItem("allowedRoutes");
        localStorage.removeItem("loginTime");
      }
      
      // Redirect to login page
      navigate("/login");
    };
    
    handleLogout();
  }, [navigate]);

  return <div className="logout-message">Logging out...</div>;
};

export default Logout;