import React from 'react';
import ExperienceForm from '../components/ExperienceForm.jsx';
import ItineraryTimeline from '../components/ItineraryTimeline.jsx';
import { matchItinerary } from '../api.js';

export default function Experience() {
  const [itinerary, setItinerary] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [formKey, setFormKey] = React.useState(0);

  const handleSubmit = async (payload) => {
    setLoading(true);
    setError('');
    try {
      const result = await matchItinerary(payload);
      setItinerary(result);
    } catch {
      setError('Could not generate an itinerary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setItinerary(null);
    setError('');
    setFormKey((k) => k + 1);
  };

  return (
    <div className="experience-page">
      <h1 className="page-title">🎯 Pick My Experience</h1>
      {!itinerary && (
        <ExperienceForm key={formKey} onSubmit={handleSubmit} loading={loading} />
      )}
      {error && <p className="error">{error}</p>}
      {itinerary && (
        <>
          <ItineraryTimeline itinerary={itinerary} />
          <button className="btn btn-ghost" onClick={reset}>
            Try Another Adventure
          </button>
        </>
      )}
    </div>
  );
}
