export default function PlaceCard({ place, index = 0, compact = false }) {
  return <article className={`place-card${compact ? ' place-card-compact' : ''}`} style={{ '--card-index': index }}>
    {place.image ? <img className="place-image" src={place.image} alt={place.name} /> : <div className="place-card-top"><span className="place-emoji">{place.emoji}</span><span className="place-category">{place.category}</span></div>}
    {place.image && <div className="place-card-top"><span className="place-category">{place.category}</span></div>}
    <h3>{place.name}</h3><p className="place-location">⌖ &nbsp;{place.location}</p>
    <p className="place-price">{place.price}</p>
    <div className="place-favorite"><span>★</span><p>{place.whyLocalsLoveIt}</p></div>
    <div className="place-detail"><span>◷</span><p><b>Best time</b>{place.bestTime}</p></div>
    <div className="place-detail tip"><span>↳</span><p><b>A local tip</b>{place.localTip}</p></div>
    <div className="story-divider"><span>WHY VISIT?</span></div>
    <p className="place-story">{place.whyVisitStory}</p>
    <a className="place-map" href={place.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name} ${place.location}`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${place.name} in Google Maps`}>{'\u{1f4cd}'} View on Google Maps</a>
  </article>;
}
