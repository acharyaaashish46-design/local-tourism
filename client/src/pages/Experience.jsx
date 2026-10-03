import { useState } from 'react';
import ExperienceForm from '../components/ExperienceForm.jsx';
import ItineraryTimeline from '../components/ItineraryTimeline.jsx';
import { matchItinerary } from '../api.js';

const initial = { hours: '', budget: '', interests: [] };
export default function Experience() {
  const [answers, setAnswers] = useState(initial);
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const generate = async () => {
    setLoading(true); setError('');
    try {
      const result = await matchItinerary({ hours: Number(answers.hours), budget: answers.budget === 'unlimited' ? null : Number(answers.budget), interests: answers.interests });
      localStorage.setItem('touriguide-last-itinerary', JSON.stringify(result));
      setItinerary(result);
    } catch { setError('Your adventure could not be generated. Make sure the API is running, then try again.'); }
    finally { setLoading(false); }
  };
  const reset = () => { setAnswers(initial); setItinerary(null); setError(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return <section className="experience-page page-shell">
    <div className="page-heading experience-heading"><p className="eyebrow">A day that feels like yours</p><h1>Pick my <em>experience</em></h1><p>Tell us what you have in mind. We'll connect the dots between local places you'll love.</p></div>
    {!itinerary ? <ExperienceForm value={answers} onChange={setAnswers} onSubmit={generate} loading={loading} error={error} /> : <ItineraryTimeline itinerary={itinerary} onReset={reset} />}
  </section>;
}
