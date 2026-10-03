import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPlaces } from '../api.js';
import PlaceCard from '../components/PlaceCard.jsx';

const CATEGORY_NAMES = {
  food: 'Local Food',
  history: 'Hidden History',
  art: 'Art & Culture',
  nature: 'Nature',
  photography: 'Photography',
  shops: 'Local Shops',
  experiences: 'Local Experiences',
};

export default function Category() {
  const { slug } = useParams();
  const [places, setPlaces] = React.useState([]);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setError('');
    getPlaces(slug)
      .then(setPlaces)
      .catch(() => setError('Could not load places. Is the server running?'));
  }, [slug]);

  return (
    <div className="category-page">
      <Link to="/" className="back-link">← Back to home</Link>
      <h1 className="page-title">{CATEGORY_NAMES[slug] || slug}</h1>
      {error && <p className="error">{error}</p>}
      <div className="place-grid">
        {places.map((p, i) => (
          <PlaceCard key={p.id} place={p} style={{ animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
    </div>
  );
}
