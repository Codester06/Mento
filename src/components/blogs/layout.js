import React from "react";
import "./layout.css"; // Import the CSS file

const BlogLayout=()=> {
  return (
    <div className="container">

      {/* Main Content */}
      <div className="content">
        <main className="main">
       
        <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="side-box"></div>
          <div className="side-box"></div>
          <div className="side-box small"></div>
        </aside>
      </div>
    </div>
  );
}

export default BlogLayout;