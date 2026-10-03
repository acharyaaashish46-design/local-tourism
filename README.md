# Touriguide

Discover neighborhood food, small cultural spaces, quiet nature, and local favorites around Kathmandu. Touriguide pairs place stories with a rule-based mini-itinerary builder.

## Setup and run

1. `git clone <repository-url>` then `cd touriguide`
2. `npm run install:all`
3. `npm run dev`
4. Open http://localhost:5173

## Backend API

The Express API listens on port `5000` by default. Set `PORT` to change it and
`CORS_ORIGIN` to a comma-separated list of allowed browser origins (for example,
`http://localhost:5173`). When `CORS_ORIGIN` is unset, browser origins are allowed
for local development.

- `GET /api/health` — service status and API version.
- `GET /api/categories` — categories with place counts.
- `GET /api/places` — place list. Optional filters: `category`, `q`,
  `neighborhood`, `maxPrice`, `freeOnly=true`, and `sort=name|price`.
- `GET /api/places/search` — same filters, with `page` and `limit` pagination;
  returns `{ items, page, limit, total, totalPages }`.
- `GET /api/places/:id` — one place.
- `GET /api/itineraries` and `GET /api/itineraries/:id` — curated itineraries.
- `POST /api/itinerary/match` — match `{ "hours": 4, "budget": 1000,
  "interests": ["food", "history"] }`. Use `"unlimited"` for no budget cap.

JSON errors use a consistent `{ "error": "..." }` response. Search terms match
place names, neighborhoods, categories, and local story fields.
