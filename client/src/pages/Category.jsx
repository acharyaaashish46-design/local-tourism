import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCategories, getPlaces } from '../api.js';
import PlaceCard from '../components/PlaceCard.jsx';

export default function Category() {
  const { slug } = useParams();
  const [places, setPlaces] = useState([]);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    let active = true;
    setStatus('loading');
    getCategories().then(async (categories) => {
      if (!active) return;
      const currentCategory = categories.find((item) => item.slug === slug) || null;
      const items = currentCategory ? await getPlaces(slug) : [];
      if (!active) return;
      setCategory(currentCategory);
      setPlaces(items);
      setStatus('ready');
    }).catch(() => { if (active) setStatus('error'); });
    return () => { active = false; };
  }, [slug]);
  return <section className="category-page page-shell">
    <Link className="back-link" to="/">← Back to home</Link>
    <div className="page-heading"><p className="eyebrow">Kathmandu, a little off the map</p><h1>{category ? <>{category.emoji} {category.name}</> : 'Find a local favorite'}</h1><p>Small places, good stories, and the details worth slowing down for.</p></div>
    {status === 'loading' && <p className="notice">Finding the neighborhood favorites…</p>}
    {status === 'error' && <p className="notice error">We couldn't reach the places list. Check that the server is running and try again.</p>}
    {status === 'ready' && (places.length ? <div className="place-grid">{places.map((place, index) => <PlaceCard key={place.id} place={place} index={index} />)}</div> : <div className="empty-state"><span>🧭</span><h2>No places in this corner yet</h2><p>Try another category to keep exploring.</p><Link className="button button-primary" to="/">Browse categories</Link></div>)}
  </section>;
}
