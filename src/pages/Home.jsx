import React from "react";
import { Link } from "react-router-dom";
import '../styles/Home.css'

export default function Home() {
  const features = [
    {
      title: "Browse Books",
      desc: "Explore a wide variety of titles and discover new reads across all genres.",
      icon: "📚",
      link: "/books",
    },
    {
      title: "Smart Search",
      desc: "Quickly find books by title, author, or ISBN using the OpenLibrary API.",
      icon: "🔍",
      link: "/books",
    },
    {
      title: "Detailed Info",
      desc: "See complete details, from author bios to subjects, publishing years, and more.",
      icon: "📖",
      link: "/books",
    },
  ];

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Book</h1>
          <p>
            Welcome to the OpenLibrary demo — a minimal, elegant app for book
            discovery and exploration.
          </p>
          <Link to="/books" className="hero-btn">
            Explore Now →
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=900&auto=format&fit=crop"
            alt="Library"
          />
        </div>
      </div>

      <div className="home-cards">
        {features.map((f, i) => (
          <div className="feature-card" key={i}>
            <div className="icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <Link to={f.link} className="card-btn">
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
