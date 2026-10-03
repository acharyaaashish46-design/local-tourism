import React from 'react';

export default function PlaceCard({ place, style }) {
  if (!place) return null;
  return (
    <article className="place-card" style={style}>
      {place.image ? (
        <img className="place-image" src={place.image} alt={place.name} />
      ) : (
        <div className="place-emoji">{place.emoji}</div>
      )}
      <h3 className="place-name">{place.name}</h3>
      <p className="place-line">📍 {place.location}</p>
      <p className="place-line">💰 {place.price}</p>
      <p className="place-line">⭐ {place.whyLocalsLoveIt}</p>
      <p className="place-line">🕐 {place.bestTime}</p>
      <p className="place-line">🗣️ {place.localTip}</p>
      <div className="why-visit">
        <p className="why-visit-label">—— WHY VISIT? ——</p>
        <p className="why-visit-story">{place.whyVisitStory}</p>
      </div>
    </article>
  );
}
