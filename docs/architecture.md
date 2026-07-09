# Architecture

## System Overview

```
User → Vercel (Next.js static) → Render (FastAPI + spaCy + SQLite)
```

Text query → NLP (FoodMatcher) → dish match → RecommendationEngine (scorer) → top-N wines with score breakdown.

## Technology Stack

| Layer | Technology |
|-------|------------|
| NLP | spaCy `pt_core_news_sm` + rapidfuzz + unidecode |
| Data | pandas, pyarrow, SQLite (with FTS5) |
| API | FastAPI + Uvicorn + Pydantic |
| Frontend | Next.js 16, React 19, Tailwind 4, TypeScript |

## Module and Service Boundaries

- `src/nlp/pipeline.py` — `FoodMatcher`: dish identification via PhraseMatcher + fuzzy fallback
- `src/engine/scorer.py` — `calculate_total_score()`: weighted formula (food 0.40, flavor 0.15, structure 0.45, rating 0.01)
- `src/engine/recommender.py` — `RecommendationEngine`: SQLite query + score + ranking
- `src/engine/metrics.py` — `HarmonizationMetrics`: request logging to SQLite
- `src/api/app.py` — FastAPI app: `GET /health`, `POST /api/recommend`
- `src/data/merge_raw.py` + `normalize.py` — build pipeline for SQLite DB from raw JSON

## Data and Request Flows

1. User submits text → `POST /api/recommend { query }`
2. `FoodMatcher.match()` → normalizes, runs exact PhraseMatcher, falls back to rapidfuzz fuzzy match
3. Best dish match → dish data from `data/dishes.yaml`
4. `RecommendationEngine.recommend()` → filters wines by type, computes score for each, returns top 5
5. Response: dish metadata + price intent + 5 wine recommendations with score breakdown

## Architecture Invariants

- **No LLM calls** — classic NLP only, project principle
- **No external API dependencies** — fully self-contained
- **SQLite is data, not state** — DB file tracks in git, runtime mutations (metrics) are ephemeral
- **Frontend is statically exported** — no SSR, API URL baked at build time
