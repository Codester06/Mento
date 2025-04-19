import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css'; // Assuming you'll save the CSS in a separate file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Section 1: Email Responses */}
      <section className="dashboard-section">
        <h2 className="section-title">Email Responses</h2>
        <div className="cards-container">
          {/* Individual Responses Card */}
          <div className="cardDasboard">
            <div className="card-header">
              <div className="card-icon">📧</div>
              <h3 className="card-title">Individual Responses</h3>
            </div>
          
            <div className="card-footer">
              <Link 
                to="/admin/responses/individual-responses" 
                className="view-button"
              >
                View
              </Link>
            </div>
          </div>

          {/* Friends and Family Card */}
          <div className="cardDasboard">
            <div className="card-header">
              <div className="card-icon">👨‍👩‍👧‍👦</div>
              <h3 className="card-title">Friends & Family</h3>
            </div>
        
            <div className="card-footer">
              <Link 
                to="/admin/responses/family-friends-responses" 
                className="view-button"
              >
                View
              </Link>
            </div>
          </div>

          {/* Couple Responses Card */}
          <div className="cardDasboard">
            <div className="card-header">
              <div className="card-icon">❤️</div>
              <h3 className="card-title">Couple Responses</h3>
            </div>
      
            <div className="card-footer">
              <Link 
                to="/admin/responses/couple-responses" 
                className="view-button"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Manage Blogs */}
      <section className="dashboard-section">
        <h2 className="section-title">Manage Blogs</h2>
        <div className="cards-container">
      
            <div className="card-header">
              <div className="card-icon">📝</div>
              <h3 className="card-title">Blog Management</h3>
            </div>
            <div className="card-footer">
              <Link 
                to="/admin/blog-management" 
                className="view-button"
              >
                View
              </Link>
            </div>
         
        </div>
      </section>

      {/* Section 3: Self Assessment */}
      <section className="dashboard-section">
        <h2 className="section-title">Self Assessment</h2>
        <div className="cards-container">
          {/* Depression Test Card */}
          <div className="cardDasboard">
            <div className="card-header">
              <div className="card-icon">🧠</div>
              <h3 className="card-title">Depression Test</h3>
            </div>
          
            <div className="card-footer">
              <Link 
                to="/admin/responses/depression-test" 
                className="view-button"
              >
                View
              </Link>
            </div>
          </div>

          {/* Anxiety Test Card */}
          <div className="cardDasboard">
            <div className="card-header">
              <div className="card-icon">😰</div>
              <h3 className="card-title">Anxiety Test</h3>
            </div>
          
            <div className="card-footer">
              <Link 
                to="/admin/responses/AnxietyTest" 

                className="view-button"
              >
                View
              </Link>
            </div>
          </div>

          {/* General Test Card */}
          <div className="cardDasboard">
            <div className="card-header">
              <div className="card-icon">📊</div>
              <h3 className="card-title">General Health Test</h3>
            </div>
          
            <div className="card-footer">
              <Link 
                to="/admin/responses/GeneralHealthTest" 
                className="view-button"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2 className="section-title">Contact us </h2>
        <div className="cards-container">
       
            <div className="card-header">
              <div className="card-icon"></div>
              <h3 className="card-title">Contact Management</h3>
            </div>
            <div className="card-footer">
              <Link 
                to="/admin/responses/contact-form-responses" 
                className="view-button"
              >
                View
              </Link>
            </div>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;