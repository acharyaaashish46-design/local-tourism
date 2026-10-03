import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import placesRouter from './routes/places.js';
import categoriesRouter from './routes/categories.js';
import itinerariesRouter from './routes/itineraries.js';

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map((origin) => origin.trim()).filter(Boolean);
app.disable('x-powered-by');
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json({ limit: '32kb' }));
app.use((_req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'no-referrer');
  next();
});
app.get('/api/health', (_req, res) => res.json({ status: 'ok', name: 'Touriguide API', version: '1.0.0' }));
app.use('/api/places', placesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api', itinerariesRouter);
app.use((req, res) => res.status(404).json({ error: `No route for ${req.method} ${req.path}` }));
app.use((error, _req, res, _next) => {
  if (error?.type === 'entity.too.large') return res.status(413).json({ error: 'Request body is too large.' });
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }
  console.error(error);
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

const port = Number(process.env.PORT) || 5000;
app.listen(port, () => console.log(`Touriguide API listening on http://localhost:${port}`));
