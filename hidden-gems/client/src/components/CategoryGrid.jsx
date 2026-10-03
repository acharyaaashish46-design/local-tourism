import React from 'react';
import { useNavigate } from 'react-router-dom';

const TILES = [
  { slug: 'food', name: 'Local Food', emoji: '🍜' },
  { slug: 'history', name: 'Hidden History', emoji: '🏛️' },
  { slug: 'art', name: 'Art & Culture', emoji: '🎨' },
  { slug: 'nature', name: 'Nature', emoji: '🌿' },
  { slug: 'photography', name: 'Photography', emoji: '📸' },
  { slug: 'shops', name: 'Local Shops', emoji: '🛍️' },
  { slug: 'experiences', name: 'Local Experiences', emoji: '🎭' },
];

export default function CategoryGrid() {
  const navigate = useNavigate();
  return (
    <section id="categories" className="category-grid">
      {TILES.map((t, i) => (
        <button
          key={t.slug}
          className="category-tile"
          style={{ animationDelay: `${i * 70}ms` }}
          onClick={() => navigate(`/category/${t.slug}`)}
        >
          <span className="tile-emoji">{t.emoji}</span>
          <span className="tile-name">{t.name}</span>
        </button>
      ))}
    </section>
  );
}
