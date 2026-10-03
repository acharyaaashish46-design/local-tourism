import { useState, useEffect } from 'react';
import PlaceCard from './PlaceCard';
import '../styles/longform.css';

export default function FeaturedPlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/places/search?limit=3')
      .then(res => res.json())
      .then(data => {
        setPlaces(data.items || (Array.isArray(data) ? data.slice(0, 3) : []));
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching places:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="featured-loading">Finding local favorites...</div>;
  if (!places.length) return null;

  return (
    <section className="featured-places-section">
      <div className="page-shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Local Favorites</p>
            <h2>Where to <em>begin.</em></h2>
          </div>
          <p>A few spots to start your journey.<br/>Hand-picked by locals.</p>
        </div>
        
        <div className="featured-grid">
          {places.map((place, index) => (
            <PlaceCard key={place.id} place={place} index={index} compact={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
