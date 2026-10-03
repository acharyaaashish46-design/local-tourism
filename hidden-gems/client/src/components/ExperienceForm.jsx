import React from 'react';

const TIME_OPTIONS = [
  { label: '2 hours', hours: 2 },
  { label: '4 hours', hours: 4 },
  { label: 'Half-day', hours: 5 },
  { label: 'Full-day', hours: 8 },
];

const BUDGET_OPTIONS = [
  { label: 'Rs. 500', value: 500 },
  { label: 'Rs. 1000', value: 1000 },
  { label: 'Rs. 2000', value: 2000 },
  { label: 'No limit', value: 'unlimited' },
];

const INTEREST_OPTIONS = [
  { label: 'Food', value: 'food' },
  { label: 'History', value: 'history' },
  { label: 'Culture', value: 'culture' },
  { label: 'Nature', value: 'nature' },
  { label: 'Photography', value: 'photography' },
  { label: 'Shops', value: 'shops' },
  { label: 'Experiences', value: 'experiences' },
];

export default function ExperienceForm({ onSubmit, loading }) {
  const [step, setStep] = React.useState(1);
  const [time, setTime] = React.useState(null);
  const [budget, setBudget] = React.useState(null);
  const [interests, setInterests] = React.useState([]);

  const toggleInterest = (value) => {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handleSubmit = () => {
    if (!time || !budget || interests.length === 0) return;
    onSubmit({
      hours: time.hours,
      budget: budget.value,
      interests,
    });
  };

  return (
    <form className="experience-form" onSubmit={(e) => e.preventDefault()}>
      <div className={`form-step ${step >= 1 ? 'visible' : ''}`}>
        <h3>Step 1 — 🕐 Time</h3>
        <div className="option-row">
          {TIME_OPTIONS.map((t) => (
            <button
              type="button"
              key={t.label}
              className={`option-chip ${time?.label === t.label ? 'selected' : ''}`}
              onClick={() => {
                setTime(t);
                setStep(Math.max(step, 2));
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`form-step ${step >= 2 ? 'visible' : ''}`}>
        <h3>Step 2 — 💰 Budget</h3>
        <div className="option-row">
          {BUDGET_OPTIONS.map((b) => (
            <button
              type="button"
              key={b.label}
              className={`option-chip ${budget?.label === b.label ? 'selected' : ''}`}
              onClick={() => {
                setBudget(b);
                setStep(Math.max(step, 3));
              }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`form-step ${step >= 3 ? 'visible' : ''}`}>
        <h3>Step 3 — ❤️ Interests</h3>
        <div className="checkbox-grid">
          {INTEREST_OPTIONS.map((i) => (
            <label key={i.value} className="checkbox-chip">
              <input
                type="checkbox"
                checked={interests.includes(i.value)}
                onChange={() => toggleInterest(i.value)}
              />
              <span>{i.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-big"
        disabled={loading || !time || !budget || interests.length === 0}
        onClick={handleSubmit}
      >
        {loading ? 'Finding your gems…' : 'Generate My Adventure'}
      </button>
    </form>
  );
}
