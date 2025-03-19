import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../../utils/firebaseConfig'; // Adjust path as needed
import './BlogDetail.css'; // You'll need to create this CSS file

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
  
    // Move fetchRelatedPosts to useCallback to memoize it
    const fetchRelatedPosts = useCallback((category) => {
      const blogPostsRef = ref(database, 'blog_posts');
      
      onValue(blogPostsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Get posts with the same category, excluding the current post
          const relatedPostsArray = Object.entries(data)
            .filter(([postId, post]) => postId !== id && post.category === category)
            .map(([postId, post]) => ({
              id: postId,
              title: post.title,
              featuredImage: post.featuredImage,
              createdAt: post.createdAt
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3); // Limit to 3 related posts
            
          setRelatedPosts(relatedPostsArray);
        }
      });
    }, [id]); // Include 'id' as a dependency since it's used inside
  
    useEffect(() => {
      // Reference to the specific blog post in Firebase
      const postRef = ref(database, `blog_posts/${id}`);
      
      const unsubscribe = onValue(postRef, (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            setPost({
              id,
              ...data,
              // Format date for display
              formattedDate: new Date(data.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              // No longer splitting content by paragraphs since we're using HTML
            });
            
            // After loading the main post, fetch related posts
            fetchRelatedPosts(data.category);
          } else {
            setError("Blog post not found");
          }
          setLoading(false);
        } catch (err) {
          console.error('Error fetching blog post:', err);
          setError('Failed to load blog post. Please try again later.');
          setLoading(false);
        }
      }, (err) => {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
        setLoading(false);
      });
      
      return () => unsubscribe();
    }, [id, fetchRelatedPosts]); // Include fetchRelatedPosts as a dependency
  
    // Function to safely render HTML content
    const renderContent = (htmlContent) => {
      return { __html: htmlContent };
    };

    // Navigate back to blog list
    const handleBackClick = () => {
      navigate('/blogs');
    };
  
    // Navigate to a related post
    const handleRelatedPostClick = (postId) => {
      navigate(`/blog/${postId}`);
      // Scroll to top when navigating to a new post
      window.scrollTo(0, 0);
    };
  
    // Loading state
    if (loading) {
      return (
        <div className="blog-detail-container">
          <div className="blog-detail-loading">
            <p>Loading blog post...</p>
          </div>
        </div>
      );
    }
  
    // Error state
    if (error) {
      return (
        <div className="blog-detail-container">
          <div className="blog-detail-error">
            <p>{error}</p>
            <button className="back-button" onClick={handleBackClick}>
              Back to Blog
            </button>
          </div>
        </div>
      );
    }
  
    return (
      <div className="blog-detail-container">
        {/* Back button */}
        <div className="blog-detail-navigation">
          <button className="back-button" onClick={handleBackClick}>
            ← Back to Blog
          </button>
        </div>
        
        {/* Blog post header */}
        <header className="blog-detail-header">
          <h1 className="blog-detail-title">{post.title}</h1>
          <div className="blog-detail-meta">
            <span className="blog-detail-category">{post.category || 'Uncategorized'}</span>
            <span className="blog-detail-date">{post.formattedDate}</span>
            <span className="blog-detail-author">By {post.author || 'Admin'}</span>
          </div>
        </header>
        
        {/* Featured image */}
        {post.featuredImage && (
          <div className="blog-detail-image">
            <img src={post.featuredImage} alt={post.title} />
          </div>
        )}
        
        {/* Blog content - Using dangerouslySetInnerHTML to render HTML content */}
        <article 
          className="blog-detail-content"
          dangerouslySetInnerHTML={renderContent(post.content)}
        />
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="related-posts-section">
            <h3 className="related-posts-title">Related Articles</h3>
            <div className="related-posts-grid">
              {relatedPosts.map(relatedPost => (
                <div 
                  key={relatedPost.id} 
                  className="related-post-card"
                  onClick={() => handleRelatedPostClick(relatedPost.id)}
                >
                  {relatedPost.featuredImage && (
                    <div className="related-post-image">
                      <img src={relatedPost.featuredImage} alt={relatedPost.title} />
                    </div>
                  )}
                  <h4 className="related-post-title">{relatedPost.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default BlogDetail;