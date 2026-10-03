import { Link } from 'react-router-dom';

const categories = [
  { slug: 'food', name: 'Local Food', emoji: '🥟', note: 'Follow the good smells', image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=85' },
  { slug: 'history', name: 'Old Kathmandu', emoji: '🏛️', note: 'Look a little closer', image: '/pashupatinath.jpg' },
  { slug: 'art', name: 'Art & Culture', emoji: '🎨', note: 'Meet the makers', image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=800&q=85' },
  { slug: 'nature', name: 'Green escapes', emoji: '🌿', note: 'Find a quieter path', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=85' },
  { slug: 'photography', name: 'Photo walks', emoji: '📷', note: 'Chase the soft light', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=800&q=85' },
  { slug: 'shops', name: 'Little shops', emoji: '🧺', note: 'Bring home a story', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85' },
  { slug: 'cafes', name: 'Coffee & tea', emoji: '\u{2615}', note: 'Take the slow seat', image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=800&q=85' },
  { slug: 'markets', name: 'Markets & bazaars', emoji: '\u{1f9fa}', note: 'Follow the colors', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=85' }
];
export default function CategoryGrid() {
  return <section className="categories-section" id="categories"><div className="section-heading"><div><p className="eyebrow">Find your little something</p><h2>Take the <em>local route.</em></h2></div><p>Eight ways into the city.<br/>Where will you wander?</p></div><div className="category-grid">{categories.map((category, index) => <Link key={category.slug} to={`/category/${category.slug}`} className="category-tile" style={{ '--tile-index': index, '--tile-image': `url("${category.image}")` }}><span className="tile-number">0{index + 1} <span>{category.emoji}</span></span><span className="tile-bottom"><span className="tile-name">{category.name}</span><span className="tile-note">{category.note}</span></span><span className="tile-arrow" aria-hidden="true">↗</span></Link>)}</div><div className="categories-foot"><span>Made for curious feet and unhurried afternoons.</span><Link to="/experience">Not sure? Let us pick for you <span>→</span></Link></div></section>;
}

