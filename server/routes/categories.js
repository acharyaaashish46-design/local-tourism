import { Router } from 'express';
import { readFileSync } from 'node:fs';

const places = JSON.parse(readFileSync(new URL('../data/places.json', import.meta.url), 'utf8'));

const router = Router();
const definitions = [
  { slug: 'food', name: 'Local Food', emoji: '🥟' },
  { slug: 'history', name: 'Best Places', emoji: '🏛️' },
  { slug: 'art', name: 'Art & Culture', emoji: '🎨' },
  { slug: 'nature', name: 'Nature', emoji: '🌿' },
  { slug: 'photography', name: 'Photography', emoji: '📷' },
  { slug: 'shops', name: 'Local Shops', emoji: '🧺' },
  { slug: 'cafes', name: 'Coffee & Tea', emoji: '\u{2615}' },
  { slug: 'markets', name: 'Markets & Bazaars', emoji: '\u{1f9fa}' }
];
router.get('/', (_req, res) => res.json(definitions.map((category) => ({
  ...category,
  count: places.filter((place) => place.category === category.slug).length
}))));
export default router;

