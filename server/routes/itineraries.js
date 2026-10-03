import { Router } from 'express';
import { readFileSync } from 'node:fs';

const itineraries = JSON.parse(readFileSync(new URL('../data/itineraries.json', import.meta.url), 'utf8'));

const router = Router();
router.get('/itineraries', (_req, res) => res.json(itineraries));
router.get('/itineraries/:id', (req, res) => {
  const itinerary = itineraries.find((item) => item.id === req.params.id);
  if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
  return res.json(itinerary);
});

router.post('/itinerary/match', (req, res) => {
  const hours = req.body?.hours === '' || req.body?.hours == null ? NaN : Number(req.body.hours);
  const noLimit = req.body?.budget === null || req.body?.budget === 'unlimited' || req.body?.budget === 'No limit';
  const budget = noLimit ? Infinity : (req.body?.budget === '' || req.body?.budget == null ? NaN : Number(req.body.budget));
  const interests = req.body?.interests ?? [];
  const supportedInterests = new Set(itineraries.flatMap((item) => item.interests));
  if (!Number.isFinite(hours) || hours < 1 || hours > 24) {
    return res.status(400).json({ error: 'hours must be a number between 1 and 24.' });
  }
  if (!Number.isFinite(budget) && !noLimit || budget < 0) {
    return res.status(400).json({ error: 'budget must be a non-negative number or unlimited.' });
  }
  if (!Array.isArray(interests) || interests.length > supportedInterests.size || interests.some((interest) => typeof interest !== 'string' || !supportedInterests.has(interest))) {
    return res.status(400).json({ error: `interests must be an array of supported values: ${[...supportedInterests].join(', ')}.` });
  }
  const eligible = itineraries.filter((item) => item.budget <= budget);
  if (!eligible.length) return res.status(404).json({ error: 'No itinerary fits that budget. Try a higher budget or choose no limit.' });
  const ranked = eligible.map((item) => {
    const matchingInterests = item.interests.filter((interest) => interests.includes(interest)).length;
    const interestCoverage = interests.length ? matchingInterests / interests.length : 0;
    const durationDistance = Math.abs(item.durationHours - hours);
    return { item, matchingInterests, interestCoverage, durationDistance };
  }).sort((a, b) => b.interestCoverage - a.interestCoverage
    || b.matchingInterests - a.matchingInterests
    || a.durationDistance - b.durationDistance
    || a.item.budget - b.item.budget);
  const best = ranked[0];
  return res.json({ ...best.item, matchScore: Math.round(best.interestCoverage * 70 + Math.max(0, 30 - best.durationDistance * 6)), matchDetails: { matchedInterests: best.matchingInterests, requestedInterests: interests.length, durationDifferenceHours: best.durationDistance, withinBudget: true } });
});

export default router;
