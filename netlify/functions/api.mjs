import places from '../../server/data/places.json' with { type: 'json' };
import itineraries from '../../server/data/itineraries.json' with { type: 'json' };

const categories = [
  { slug: 'food', name: 'Local Food', emoji: '🥟' },
  { slug: 'history', name: 'Best Places', emoji: '🏛️' },
  { slug: 'art', name: 'Art & Culture', emoji: '🎨' },
  { slug: 'nature', name: 'Nature', emoji: '🌿' },
  { slug: 'photography', name: 'Photography', emoji: '📷' },
  { slug: 'shops', name: 'Local Shops', emoji: '🧺' },
  { slug: 'cafes', name: 'Coffee & Tea', emoji: '☕' },
  { slug: 'markets', name: 'Markets & Bazaars', emoji: '🧺' }
];

const response = (body, statusCode = 200) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer'
  },
  body: JSON.stringify(body)
});

const error = (message, statusCode = 400) => response({ error: message }, statusCode);

function filterPlaces(query) {
  const term = String(query.q || '').trim().toLocaleLowerCase();
  const category = String(query.category || '').trim().toLocaleLowerCase();
  const neighborhood = String(query.neighborhood || '').trim().toLocaleLowerCase();
  const maxPrice = query.maxPrice === undefined ? null : Number(query.maxPrice);
  if (maxPrice !== null && (!Number.isFinite(maxPrice) || maxPrice < 0)) {
    return { error: 'maxPrice must be a non-negative number.' };
  }

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
}

function matchItinerary(body) {
  const hours = body?.hours === '' || body?.hours == null ? NaN : Number(body.hours);
  const noLimit = body?.budget === null || body?.budget === 'unlimited' || body?.budget === 'No limit';
  const budget = noLimit ? Infinity : (body?.budget === '' || body?.budget == null ? NaN : Number(body.budget));
  const interests = body?.interests ?? [];
  const supportedInterests = new Set(itineraries.flatMap((item) => item.interests));
  if (!Number.isFinite(hours) || hours < 1 || hours > 24) return error('hours must be a number between 1 and 24.');
  if ((!Number.isFinite(budget) && !noLimit) || budget < 0) return error('budget must be a non-negative number or unlimited.');
  if (!Array.isArray(interests) || interests.length > supportedInterests.size || interests.some((interest) => typeof interest !== 'string' || !supportedInterests.has(interest))) {
    return error(`interests must be an array of supported values: ${[...supportedInterests].join(', ')}.`);
  }

  const eligible = itineraries.filter((item) => item.budget <= budget);
  if (!eligible.length) return error('No itinerary fits that budget. Try a higher budget or choose no limit.', 404);
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
  return response({ ...best.item, matchScore: Math.round(best.interestCoverage * 70 + Math.max(0, 30 - best.durationDistance * 6)), matchDetails: { matchedInterests: best.matchingInterests, requestedInterests: interests.length, durationDifferenceHours: best.durationDistance, withinBudget: true } });
}

export default async (request) => {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/\.netlify\/functions\/api/, '').replace(/^\/api(?=\/|$)/, '') || '/';
  const method = request.httpMethod || request.method;
  const query = Object.fromEntries(url.searchParams.entries());

  if (method === 'GET' && path === '/health') return response({ status: 'ok', name: 'Touriguide API', version: '1.0.0' });
  if (method === 'GET' && path === '/categories') {
    return response(categories.map((category) => ({ ...category, count: places.filter((place) => place.category === category.slug).length })));
  }
  if (method === 'GET' && path === '/places') {
    const filtered = filterPlaces(query);
    return filtered.error ? error(filtered.error) : response(filtered.results);
  }
  if (method === 'GET' && path === '/places/search') {
    const filtered = filterPlaces(query);
    if (filtered.error) return error(filtered.error);
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 12);
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) return error('page must be positive and limit must be between 1 and 100.');
    const start = (page - 1) * limit;
    return response({ items: filtered.results.slice(start, start + limit), page, limit, total: filtered.results.length, totalPages: Math.ceil(filtered.results.length / limit) });
  }
  const placeMatch = path.match(/^\/places\/([^/]+)$/);
  if (method === 'GET' && placeMatch) {
    const place = places.find((item) => item.id === decodeURIComponent(placeMatch[1]));
    return place ? response(place) : error('Place not found', 404);
  }
  if (method === 'GET' && path === '/itineraries') return response(itineraries);
  const itineraryMatch = path.match(/^\/itineraries\/([^/]+)$/);
  if (method === 'GET' && itineraryMatch) {
    const itinerary = itineraries.find((item) => item.id === decodeURIComponent(itineraryMatch[1]));
    return itinerary ? response(itinerary) : error('Itinerary not found', 404);
  }
  if (method === 'POST' && path === '/itinerary/match') {
    try {
      return matchItinerary(await request.json());
    } catch {
      return error('Request body must be valid JSON.');
    }
  }
  return error(`No route for ${method} ${path}`, 404);
};
