import React from "react";
import "./layout.css"; // Import the CSS file
import BlogList from "./blogList";
import BlogSidebar from "./sidePanel/sefltest";
import RecentBlogLayout from "./sidePanel/recentBlogs";
import SocialMediaLayout from "./sidePanel/socialHandles";
const BlogLayout = () => {
  return (
    <div className="Blog_container">
      {/* Main Content */}
      <div className="content">
        <main className="main">
          <BlogList />
        </main>

        {/* Sidebar */}
        <aside className="sidebar">
          <div className="side-box recentBlogs"><RecentBlogLayout/></div>
          <div className="side-box selfTool"><BlogSidebar/></div>
          <div className="side-box socialHandles"><SocialMediaLayout/></div>
        </aside>
      </div>
    </div>
  );
};

export default BlogLayout;
