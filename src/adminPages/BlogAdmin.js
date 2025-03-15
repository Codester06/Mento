import React, { useState, useEffect, useRef } from 'react';
import { ref, push, set, onValue, remove } from 'firebase/database';
import { database } from '../utils/firebaseConfig'; // Adjust path as needed
import './AdminBlog.css';

const AdminBlog = () => {
  // State for blog post form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State for blog posts list
  const [blogPosts, setBlogPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  
  // Rich text editor ref
  const editorRef = useRef(null);

  // Load existing blog posts
  useEffect(() => {
    const blogPostsRef = ref(database, 'blog_posts');
    
    const unsubscribe = onValue(blogPostsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert the object to an array and sort by date (newest first)
        const postsArray = Object.entries(data).map(([id, post]) => ({
          id,
          ...post
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setBlogPosts(postsArray);
      } else {
        setBlogPosts([]);
      }
      setPostsLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Handle image URL change and preview
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    if (url.trim()) {
      setImagePreview(url);
    } else {
      setImagePreview('');
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setContent('');
    setImageUrl('');
    setImagePreview('');
    setCategory('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    
    try {
      // Create a new post reference
      const newPostRef = push(ref(database, 'blog_posts'));
      
      // Format the content with proper headings and paragraphs
      const formattedContent = formatContent(content);
      
      // Prepare post data
      const postData = {
        title,
        content: formattedContent,
        featuredImage: imageUrl,
        category: category || 'Uncategorized',
        createdAt: new Date().toISOString(),
        author: 'Admin' // Replace with actual author or get from auth context
      };
      
      // Save blog post
      await set(newPostRef, postData);
      alert('Blog post created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post.');
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to format content with headings and paragraphs
  const formatContent = (text) => {
    // Split the content by lines
    const lines = text.split('\n');
    const formattedLines = [];
    let currentParagraph = [];
    
    // Process each line
    lines.forEach(line => {
      const trimmedLine = line.trim();
      
      // Skip empty lines but use them as paragraph separators
      if (trimmedLine === '') {
        if (currentParagraph.length > 0) {
          formattedLines.push(currentParagraph.join(' '));
          currentParagraph = [];
        }
        return;
      }
      
      // Check if line is a heading (starts with # markdown style)
      if (trimmedLine.startsWith('#')) {
        // Push current paragraph if any
        if (currentParagraph.length > 0) {
          formattedLines.push(currentParagraph.join(' '));
          currentParagraph = [];
        }
        
        // Add heading with appropriate marker
        const headingLevel = trimmedLine.match(/^#+/)[0].length;
        if (headingLevel <= 6) {
          const headingText = trimmedLine.replace(/^#+\s*/, '').trim();
          formattedLines.push(`<h${headingLevel}>${headingText}</h${headingLevel}>`);
        } else {
          // If more than 6 #'s, treat as normal paragraph
          currentParagraph.push(trimmedLine);
        }
      } 
      // Handle alternative heading format (equals or dash underlining)
      else if (trimmedLine.match(/^[=]+$/) && currentParagraph.length === 1) {
        const headingText = currentParagraph[0];
        formattedLines.push(`<h1>${headingText}</h1>`);
        currentParagraph = [];
      }
      else if (trimmedLine.match(/^[-]+$/) && currentParagraph.length === 1) {
        const headingText = currentParagraph[0];
        formattedLines.push(`<h2>${headingText}</h2>`);
        currentParagraph = [];
      }
      // Normal line, add to current paragraph
      else {
        currentParagraph.push(trimmedLine);
      }
    });
    
    // Add any remaining paragraph
    if (currentParagraph.length > 0) {
      formattedLines.push(currentParagraph.join(' '));
    }
    
    // Join paragraphs with double newlines, but keep HTML headings separate
    return formattedLines
      .map(line => {
        // Wrap non-heading lines in paragraph tags
        if (!line.startsWith('<h') && !line.endsWith('>')) {
          return `<p>${line}</p>`;
        }
        return line;
      })
      .join('\n');
  };
  
  // Function to safely render HTML in preview
  const renderContentPreview = (htmlContent) => {
    return { __html: htmlContent };
  };
  
  // Delete blog post
  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      try {
        await remove(ref(database, `blog_posts/${id}`));
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete blog post.');
      }
    }
  };

  return (
    <div className="admin-blog-container">
      <h1 className="admin-blog-title">Blog Administration</h1>
      
      <div className="admin-blog-layout">
        <div className="blog-form-section">
          <h2 className="section-title">Create New Blog Post</h2>
          
          <form onSubmit={handleSubmit} className="blog-form">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog post title"
                required
                className="form-control"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category (optional)"
                className="form-control"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="imageUrl">Featured Image URL</label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={handleImageUrlChange}
                placeholder="Enter image URL (optional)"
                className="form-control"
                disabled={loading}
              />
              
              {imagePreview && (
                <div className="image-preview-container">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="image-preview"
                    onError={() => {
                      alert("Image URL is invalid or inaccessible");
                      setImagePreview('');
                    }}
                  />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={() => {
                      setImageUrl('');
                      setImagePreview('');
                    }}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Content *</label>
              <div className="content-help-text">
                <p>Use markdown-style headings:</p>
                <ul>
                  <li># Heading 1</li>
                  <li>## Heading 2</li>
                  <li>### Heading 3</li>
                </ul>
                <p>Separate paragraphs with blank lines.</p>
              </div>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content here... Use # for headings. Separate paragraphs with blank lines."
                required
                className="form-control content-textarea"
                rows="10"
                disabled={loading}
                ref={editorRef}
              />
            </div>
            
            {content && (
              <div className="form-group">
                <label>Content Preview</label>
                <div 
                  className="content-preview"
                  dangerouslySetInnerHTML={renderContentPreview(formatContent(content))}
                />
              </div>
            )}
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={resetForm}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Publishing...' : 'Publish Blog Post'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="blog-list-section">
          <h2 className="section-title">Published Blog Posts</h2>
          
          {postsLoading ? (
            <div className="loading-posts">Loading blog posts...</div>
          ) : blogPosts.length === 0 ? (
            <div className="no-posts">No blog posts found. Create your first post!</div>
          ) : (
            <div className="blog-posts-list">
              {blogPosts.map(post => (
                <div key={post.id} className="blog-post-item">
                  {post.featuredImage && (
                    <div className="post-thumbnail">
                      <img src={post.featuredImage} alt={post.title} />
                    </div>
                  )}
                  <div className="post-details">
                    <h3 className="post-title">{post.title}</h3>
                    <div className="post-meta">
                      <span className="post-category">{post.category}</span>
                      <span className="post-date">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="post-excerpt" 
                         dangerouslySetInnerHTML={renderContentPreview(
                           post.content.length > 200 
                             ? post.content.substring(0, 200) + '...' 
                             : post.content
                         )} 
                    />
                    <div className="post-actions">
                      <button 
                        className="edit-post-btn"
                        onClick={() => alert('Edit functionality would open this post in the editor')}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-post-btn"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;