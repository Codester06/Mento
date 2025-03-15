import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utils/firebaseConfig' // Adjust path as needed
import BlogCard from './blogCard';
import './blogList.css';

const BlogList = () => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reference to the blog_posts node in Firebase Realtime Database
    const blogPostsRef = ref(database, 'blog_posts');
    
    // Set up a listener for changes to the blog posts
    const unsubscribe = onValue(blogPostsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          // Convert the object to an array and sort by date (newest first)
          const postsArray = Object.entries(data).map(([id, post]) => ({
            id,
            ...post,
            // Format the data to match the BlogCard component's expected props
            altText: post.title,
            highlightedWord: post.title.split(' ').pop(), // Highlight the last word in the title
            tags: [
              // Convert category to a tag
              { text: post.category || 'Uncategorized', color: getCategoryColor(post.category) },
              // Add a date-based tag
              { text: getMonthName(new Date(post.createdAt)), color: 'light-blue' }
            ],
            intro: post.content.substring(0, 150) + '...',  // Create a short intro from content
            date: new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            image: post.featuredImage || 'https://via.placeholder.com/800x400?text=No+Image+Available'
          })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          setBlogPosts(postsArray);
        } else {
          setBlogPosts([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error processing blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    }, (err) => {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
      setLoading(false);
    });
    
    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  // Helper function to get a color based on category
  const getCategoryColor = (category) => {
    if (!category) return 'blue';
    
    const categoryColors = {
      'Technology': 'blue',
      'Business': 'light-blue',
      'Healthcare': 'green',
      'Security': 'red',
      'AI': 'purple',
      'Article': 'pink'
    };
    
    // Default to blue if no matching category
    return categoryColors[category] || 'blue';
  };
  
  // Helper function to get month name
  const getMonthName = (date) => {
    return date.toLocaleString('en-US', { month: 'short' });
  };

  // Handle click on a blog post - now redirects to blog detail page
  const handleArticleClick = (id) => {
    navigate(`/blog/${id}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="blog-list-container">
        <div className="blog-loading">
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="blog-list-container">
        <div className="blog-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (blogPosts.length === 0) {
    return (
      <div className="blog-list-container">
        <div className="blog-empty">
          <p>No blog posts available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      <div className="blog-list">
        {blogPosts.map(post => (
          <div className="blog-item" key={post.id}>
            <BlogCard 
              image={post.image}
              altText={post.altText}
              title={post.title.toUpperCase()} // Match the uppercase style from the example
              subtitle={post.category ? post.category.toUpperCase() : ""}
              highlightedWord={post.highlightedWord}
              tags={post.tags}
              intro={post.intro}
              date={post.date}
              onClick={() => handleArticleClick(post.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;