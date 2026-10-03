import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const placesPath = path.join(__dirname, '..', 'data', 'places.json');

function loadPlaces() {
  return JSON.parse(fs.readFileSync(placesPath, 'utf-8'));
}

// GET /api/places?category=food
router.get('/', (req, res) => {
  const places = loadPlaces();
  const { category } = req.query;
  if (category) {
    return res.json(places.filter((p) => p.category === category));
  }
  res.json(places);
});

// GET /api/places/:id
router.get('/:id', (req, res) => {
  const places = loadPlaces();
  const place = places.find((p) => p.id === req.params.id);
  if (!place) {
    return res.status(404).json({ error: 'Place not found' });
  }
  res.json(place);
});

export default router;
