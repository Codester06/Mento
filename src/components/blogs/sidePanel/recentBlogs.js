// BlogLayout.jsx
import React, { useState, useEffect } from 'react';
import './BlogRecent.css';
// Import your data fetching utility
import { getDataBS } from '../../../utils/awsService';
import { useNavigate } from 'react-router-dom';

const RecentBlogLayout = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshPosts, setRefreshPosts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setPostsLoading(true);

        const responseData = await getDataBS("/blog");

        // Extract blog posts data
        let blogPostsData = responseData.data["data"];

        // Transform data to extract and normalize specific fields
        const processedBlogPosts = blogPostsData
          .map((post) => ({
            id: post.id || null,
            title: post.title || "Untitled",
            createdAt: post.createdAt || new Date().toISOString(),
            featuredImage: post.featuredImage || "",
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        // Take only the top 2 most recent blogs
        const recentBlogs = processedBlogPosts.slice(0, 2).map(post => ({
          id: post.id,
          title: post.title,
          image: post.featuredImage || "https://via.placeholder.com/800x400?text=No+Image+Available",
          date: new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        }));

        setBlogPosts(recentBlogs);
        setError(null);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setPostsLoading(false);
      }
    };

    fetchBlogPosts();
  }, [refreshPosts]);

  if (postsLoading) {
    return <div className="RBS-loading">Loading blogs...</div>;
  }

  if (error) {
    return <div className="RBS-error">{error}</div>;
  }

  const recentBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };
    return (
        <div className="RBS-container">
          <div className="RBS-header">
            <h2 className='RBS-header-title'>Recent Blogs</h2>
          </div>
          
          {blogPosts.length > 0 ? (
            blogPosts.map(blog => (
              <div key={blog.id} className="RBS-blog-item" onClick={() => recentBlogClick(blog.id)}>
                <div className="RBS-blog-image">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="RBS-blog-content">
                  <h3>{blog.title}</h3>
                  <div className="RBS-blog-date">{blog.date}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="RBS-no-blogs">No recent blogs found</div>
          )}
        </div>
      );
};

export default RecentBlogLayout;