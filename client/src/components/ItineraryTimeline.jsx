import { useEffect, useState } from 'react';
import { getPlace } from '../api.js';
import PlaceCard from './PlaceCard.jsx';

export default function ItineraryTimeline({ itinerary, onReset }) {
  const [places, setPlaces] = useState({});
  useEffect(() => {
    let active = true;
    Promise.all(itinerary.steps.map(async (step) => {
      try { return [step.placeId, await getPlace(step.placeId)]; }
      catch { return [step.placeId, null]; }
    })).then((entries) => { if (active) setPlaces(Object.fromEntries(entries)); });
    return () => { active = false; };
  }, [itinerary]);
  return <section className="itinerary-result"><div className="result-topline"><span>YOUR ROUTE, FOUND</span><span>{itinerary.durationHours} HOURS · {itinerary.budget === 5000 ? 'OPEN BUDGET' : `UP TO RS. ${itinerary.budget.toLocaleString()}`}</span></div><h2>{itinerary.title}</h2><p className="result-subtitle">A handful of local favorites, stitched together just for you.</p><div className="timeline">{itinerary.steps.map((step, index) => <div className="timeline-item" key={`${itinerary.id}-${step.order}`} style={{ '--step-index': index }}><div className="timeline-marker"><span>{String(step.order).padStart(2, '0')}</span></div><div className="timeline-content"><div className="timeline-meta"><span>{step.time}</span><span>{step.emoji}</span></div><h3>{step.title}</h3>{places[step.placeId] && <PlaceCard place={places[step.placeId]} compact index={index} />}{step.walkToNext && <p className="walk-note"><span>↓</span> {step.walkToNext}</p>}</div></div>)}</div><div className="result-actions"><button className="button button-primary" onClick={onReset}>Try Another Adventure <span>↻</span></button><p>Good journeys are better when you leave a little room for surprise.</p></div></section>;
}
