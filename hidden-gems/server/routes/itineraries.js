import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const itinerariesPath = path.join(__dirname, '..', 'data', 'itineraries.json');

function loadItineraries() {
  return JSON.parse(fs.readFileSync(itinerariesPath, 'utf-8'));
}

// GET /api/itineraries
router.get('/', (req, res) => {
  res.json(loadItineraries());
});

// POST /api/itinerary/match
router.post('/match', (req, res) => {
  const { hours, budget, interests } = req.body || {};
  const userHours = Number(hours) || 0;
  const noLimit =
    budget === undefined ||
    budget === null ||
    budget === 'unlimited' ||
    budget === 'No limit' ||
    Number(budget) >= 99999;
  const userBudget = noLimit ? Infinity : Number(budget);
  const userInterests = Array.isArray(interests)
    ? interests.map((i) => String(i).toLowerCase())
    : [];

  const itineraries = loadItineraries();

  // 1. Hard filter: drop itineraries over budget unless user picked No limit
  const withinBudget = itineraries.filter((it) => {
    if (noLimit) return true;
    if (it.budget === null || it.budget === undefined) return false;
    return it.budget <= userBudget;
  });

  // 2. Score each remaining itinerary
  const scoreItinerary = (it) => {
    let score = 0;
    const itInterests = (it.interests || []).map((i) => String(i).toLowerCase());
    for (const interest of userInterests) {
      if (itInterests.includes(interest)) score += 10;
    }
    if (userHours > 0 && Math.abs(Number(it.durationHours) - userHours) <= 1) score += 5;
    if (!noLimit && it.budget !== null && it.budget !== undefined && it.budget <= userBudget) score += 5;
    return score;
  };

  const scored = withinBudget
    .map((it) => ({ it, score: scoreItinerary(it) }))
    .sort((a, b) => b.score - a.score);

  if (scored.length > 0 && scored[0].score > 0) {
    return res.json(scored[0].it);
  }

  // 3. Fallback: closest by score across ALL itineraries
  const closest = itineraries
    .map((it) => ({ it, score: scoreItinerary(it) }))
    .sort((a, b) => b.score - a.score);

  if (closest.length === 0) {
    return res.status(404).json({ error: 'No itineraries available' });
  }
  res.json(closest[0].it);
});

export default router;
