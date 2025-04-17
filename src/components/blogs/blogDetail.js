import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDataBS } from "../../utils/awsService";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPostAndRelated = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all blog posts
        const responseData = await getDataBS("/blog");
        const allPosts = responseData.data["data"];

        // Find the specific blog post by ID
        const blogPostData = allPosts.find((post) => post.id === id);

        if (blogPostData) {
          // Format the post data
          const formattedPost = {
            ...blogPostData,
            formattedDate: new Date(blogPostData.createdAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            ),
          };

          setPost(formattedPost);

          // Find related posts
          const relatedPostsArray = allPosts
            .filter(
              (post) =>
                post.id !== id && post.category === blogPostData.category
            )
            .map((post) => ({
              id: post.id,
              title: post.title,
              featuredImage: post.featuredImage,
              createdAt: post.createdAt,
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3);

          setRelatedPosts(relatedPostsArray);
        } else {
          setError("Blog post not found");
        }
      } catch (error) {
        console.error("Error fetching blog post details:", error);
        setError(error.message || "Failed to fetch blog post details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPostAndRelated();
  }, [id]);

  const handleBack = () => {
    navigate("/blogs");
  };

  const handleRelatedPostClick = (postId) => {
    navigate(`/blog/${postId}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return (
      <div className="details-container">
        <div className="loading-container">
          <p>Loading blog post details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={handleBack} className="back-btn">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="details-container">
        <div className="not-found">
          <h2>Blog Post Not Found</h2>
          <p>
            The blog post you're looking for doesn't exist or has been deleted.
          </p>
          <button onClick={handleBack} className="back-btn">
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="BlogMain-content">
      <div className="details-BlogContainer">
        <div className="details-header">
          <button onClick={handleBack} className="back-btn">
            ← Back to Blog
          </button>
          <h1 className="details-titleBlog">{post.title}</h1>
        </div>

        <div className="details-cardBlog">
          <div className="details-sectionBlog">
            <div className="blog-meta-info">
              <div className="info-grid">
                <div className="info-itemBlog ">
                  <label>Category</label>
                  <div className="info-valueBlog">
                    {post.category || "Uncategorized"}
                  </div>
                </div>
                <div className="info-itemBlog ">
                  <label>Date</label>
                  <div className="info-valueBlog">{post.formattedDate}</div>
                </div>
                <div className="info-itemBlog ">
                  <label>Author</label>
                  <div className="info-valueBlog">{post.author || "Admin"}</div>
                </div>
              </div>
            </div>

            {post.featuredImage && (
              <div className="featured-image">
                <img src={post.featuredImage} alt={post.title} />
              </div>
            )}

            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {relatedPosts.length > 0 && (
            <div className="details-section">
              <h2 className="section-title">Related Articles</h2>
              <div className="related-posts-grid">
                {relatedPosts.map((relatedPost) => (
                  <div
                    key={relatedPost.id}
                    className="related-post-card"
                    onClick={() => handleRelatedPostClick(relatedPost.id)}
                  >
                    {relatedPost.featuredImage && (
                      <div className="related-post-image">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                        />
                      </div>
                    )}
                    <h4 className="related-post-title">{relatedPost.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
