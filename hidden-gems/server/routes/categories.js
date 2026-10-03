import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const placesPath = path.join(__dirname, '..', 'data', 'places.json');

const CATEGORY_META = [
  { slug: 'food', name: 'Local Food', emoji: '🍜' },
  { slug: 'history', name: 'Hidden History', emoji: '🏛️' },
  { slug: 'art', name: 'Art & Culture', emoji: '🎨' },
  { slug: 'nature', name: 'Nature', emoji: '🌿' },
  { slug: 'photography', name: 'Photography', emoji: '📸' },
  { slug: 'shops', name: 'Local Shops', emoji: '🛍️' },
  { slug: 'experiences', name: 'Local Experiences', emoji: '🎭' },
];

// GET /api/categories
router.get('/', (req, res) => {
  const places = JSON.parse(fs.readFileSync(placesPath, 'utf-8'));
  const categories = CATEGORY_META.map((c) => ({
    ...c,
    count: places.filter((p) => p.category === c.slug).length,
  }));
  res.json(categories);
});

export default router;
