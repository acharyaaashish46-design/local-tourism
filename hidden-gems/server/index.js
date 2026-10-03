import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import placesRouter from './routes/places.js';
import categoriesRouter from './routes/categories.js';
import itinerariesRouter from './routes/itineraries.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/places', placesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/itineraries', itinerariesRouter);
app.use('/api/itinerary', itinerariesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Hidden Gems API is running' });
});

app.listen(PORT, () => {
  console.log(`Hidden Gems server running on http://localhost:${PORT}`);
});
