import React from 'react';
import PlaceCard from './PlaceCard.jsx';
import { getPlace } from '../api.js';

export default function ItineraryTimeline({ itinerary }) {
  const [places, setPlaces] = React.useState({});

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      const map = {};
      const ids = [...new Set(itinerary.steps.map((s) => s.placeId).filter(Boolean))];
      await Promise.all(
        ids.map(async (id) => {
          try {
            map[id] = await getPlace(id);
          } catch {
            map[id] = null;
          }
        })
      );
      if (!cancelled) setPlaces(map);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [itinerary]);

  return (
    <section className="itinerary">
      <h2 className="itinerary-title">{itinerary.title}</h2>
      <div className="timeline">
        {itinerary.steps.map((step, i) => (
          <div key={step.order} className="timeline-step" style={{ animationDelay: `${i * 160}ms` }}>
            <div className="timeline-marker">
              <span className="step-num">{String(step.order).padStart(2, '0')}</span>
            </div>
            <div className="timeline-body">
              <p className="step-time">{step.time}</p>
              <h4 className="step-title">
                {step.emoji} {step.title}
              </h4>
              {places[step.placeId] && (
                <PlaceCard place={places[step.placeId]} style={{ marginTop: '0.75rem' }} />
              )}
              {step.walkToNext && <p className="walk-link">↓ {step.walkToNext}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
