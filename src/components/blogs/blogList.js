import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDataBS } from '../../utils/awsService';
import BlogCard from './blogCard';
import './blogList.css';

const BlogList = ({ refreshPosts }) => {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setPostsLoading(true);
  
        const responseData = await getDataBS('/blog');
  
        // Extract blog posts data
        let blogPostsData = responseData.data['data'];
  
        // Transform data to extract and normalize specific fields
        const processedBlogPosts = blogPostsData.map(post => ({
          id: post.id || null,
          title: post.title || 'Untitled',
          content: post.content || '',
          author: post.author || 'Unknown',
          createdAt: post.createdAt || new Date().toISOString(),
          category: post.category || 'Uncategorized',
          featuredImage: post.featuredImage || ''
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
        // Enhance blog posts with additional formatting for BlogCard
        const formattedBlogPosts = processedBlogPosts.map(post => ({
          ...post,
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
        }));
  
        setBlogPosts(formattedBlogPosts);
        setError(null);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts([]);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setPostsLoading(false);
      }
    };
  
    fetchBlogPosts();
  }, [refreshPosts]);

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
  if (postsLoading) {
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
              title={post.title.toUpperCase()} 
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