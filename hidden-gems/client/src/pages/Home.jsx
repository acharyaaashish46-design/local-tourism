import React from 'react';
import Hero from '../components/Hero.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <h2 className="section-title">Wander by mood</h2>
      <CategoryGrid />
    </div>
  );
}
