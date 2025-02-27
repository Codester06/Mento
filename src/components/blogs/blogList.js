import React from 'react';
import BlogCard from './blogCard';
import './blogList.css';

const BlogList = () => {
  // Sample blog data - this could come from an API or props
  const blogPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1720734020504-8b5557750735?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Legal Tech Illustration with dollar sign",
      title: "ADOPTING LEGAL TECH FOR ENTERPRISES",
      subtitle: "A COMPREHENSIVE GUIDE",
      highlightedWord: "ENTERPRISES",
      tags: [
        { text: "Articles", color: "blue" },
        { text: "Enterprise", color: "light-blue" },
        { text: "Guides", color: "pink" }
      ],
      intro: "Introduction to Legal Technology In today's fast-paced business environment, enterprises face an increasing number of legal challenges that...",
      date: "September 13, 2024"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1720734020504-8b5557750735?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "AI in Healthcare illustration",
      title: "AI SOLUTIONS FOR HEALTHCARE",
      subtitle: "IMPROVING PATIENT OUTCOMES",
      highlightedWord: "HEALTHCARE",
      tags: [
        { text: "Technology", color: "blue" },
        { text: "Healthcare", color: "green" },
        { text: "AI", color: "purple" }
      ],
      intro: "Artificial Intelligence is revolutionizing the healthcare industry by enabling more accurate diagnoses, personalized treatments, and...",
      date: "September 10, 2024"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1720734020504-8b5557750735?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Cybersecurity illustration",
      title: "MODERN CYBERSECURITY PRACTICES",
      subtitle: "PROTECTING YOUR BUSINESS",
      highlightedWord: "CYBERSECURITY",
      tags: [
        { text: "Security", color: "red" },
        { text: "Business", color: "light-blue" },
        { text: "Technology", color: "blue" }
      ],
      intro: "In an age of increasing digital threats, businesses must adopt robust cybersecurity measures to protect sensitive data and maintain...",
      date: "September 5, 2024"
    }
  ];

  // Handle click on a blog post
  const handleArticleClick = (id) => {
    console.log(`Navigating to article ${id}`);
    // In a real app, you would use router navigation here
    // Example: navigate(`/blog/${id}`);
  };

  return (
    <div className="blog-list-container">
      <div className="blog-list">
        {blogPosts.map(post => (
          <div className="blog-item" key={post.id}>
            <BlogCard 
              image={post.image}
              altText={post.altText}
              title={post.title}
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