import { Router } from 'express';
import { readFileSync } from 'node:fs';

const places = JSON.parse(readFileSync(new URL('../data/places.json', import.meta.url), 'utf8'));

const router = Router();
const filterPlaces = (query) => {
  const term = String(query.q || '').trim().toLocaleLowerCase();
  const category = String(query.category || '').trim().toLocaleLowerCase();
  const neighborhood = String(query.neighborhood || '').trim().toLocaleLowerCase();
  const maxPrice = query.maxPrice === undefined ? null : Number(query.maxPrice);
  if (maxPrice !== null && (!Number.isFinite(maxPrice) || maxPrice < 0)) return { error: 'maxPrice must be a non-negative number.' };
  const results = places.filter((place) => {
    const searchable = [place.name, place.location, place.category, place.whyLocalsLoveIt, place.localTip, place.whyVisitStory].join(' ').toLocaleLowerCase();
    return (!term || searchable.includes(term))
      && (!category || place.category.toLocaleLowerCase() === category)
      && (!neighborhood || place.location.toLocaleLowerCase().includes(neighborhood))
      && (maxPrice === null || Number(place.priceValue) <= maxPrice)
      && (query.freeOnly !== 'true' || Number(place.priceValue) === 0);
  });
  if (query.sort === 'price') results.sort((a, b) => a.priceValue - b.priceValue || a.name.localeCompare(b.name));
  else if (query.sort === 'name') results.sort((a, b) => a.name.localeCompare(b.name));
  return { results };
};

// Familiar array response for the existing client.
router.get('/', (req, res) => {
  const filtered = filterPlaces(req.query);
  if (filtered.error) return res.status(400).json({ error: filtered.error });
  return res.json(filtered.results);
});

// Search endpoint with pagination metadata for clients that need it.
router.get('/search', (req, res) => {
  const filtered = filterPlaces(req.query);
  if (filtered.error) return res.status(400).json({ error: filtered.error });
  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 12);
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({ error: 'page must be positive and limit must be between 1 and 100.' });
  }
  const start = (page - 1) * limit;
  return res.json({ items: filtered.results.slice(start, start + limit), page, limit, total: filtered.results.length, totalPages: Math.ceil(filtered.results.length / limit) });
});
router.get('/:id', (req, res) => {
  const place = places.find((item) => item.id === req.params.id);
  if (!place) return res.status(404).json({ error: 'Place not found' });
  return res.json(place);
});
export default router;
