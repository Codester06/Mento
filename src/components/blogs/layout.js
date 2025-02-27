import React from "react";
import "./layout.css"; // Import the CSS file
import BlogList from "./blogList";

const BlogLayout=()=> {
  return (
    <div className="Blog_container">

      {/* Main Content */}
      <div className="content">
        <main className="main">
       <BlogList/>
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