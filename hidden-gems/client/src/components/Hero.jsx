import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const scrollToCategories = () => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <p className="hero-kicker">A field guide for curious travelers</p>
      <h1 className="hero-title">🔍 HIDDEN GEMS</h1>
      <p className="hero-tagline">Discover the places locals actually love.</p>
      <div className="hero-actions">
        <button className="btn btn-primary" onClick={() => navigate('/experience')}>
          🎯 Pick My Experience
        </button>
        <button className="btn btn-ghost" onClick={scrollToCategories}>
          🧭 Browse Categories
        </button>
      </div>
    </section>
  );
}
