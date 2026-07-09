# Glossary

## Domain Terms

| Term | Definition |
|------|------------|
| FoodMatcher | NLP component that matches user text to a dish from `dishes.yaml` |
| score breakdown | Transparent contribution of each signal (food, flavor, structure, rating) to the final score |
| style_penalty | Score penalty applied when a wine's style is in the dish's `avoid_styles` list |
| price_intent | User's budget intent detected from query keywords or price mention (budget/moderate/premium) |

## Technical Terms and Acronyms

| Term | Definition |
|------|------------|
| spaCy | NLP library with `pt_core_news_sm` Portuguese model |
| rapidfuzz | Fuzzy string matching library (used as PhraseMatcher fallback) |
| FTS5 | SQLite Full-Text Search extension (for wine food tag search) |
| PhraseMatcher | spaCy's exact phrase matching with `attr="LOWER"` |
| Vivino | Wine rating/review platform (data source for wine database) |
| Vercel | Frontend hosting platform (Next.js static export) |
| Render | Backend hosting platform (Python/FastAPI web service) |

## Naming Conventions

- `data/processed/harmonizai.db` — main SQLite database (tracked in git despite `*.db` gitignore)
- `data/dishes.yaml` — 101 curated dish entries with flavor/structure mappings
- `src/nlp/pipeline.py` — `FoodMatcher` class
- `src/engine/scorer.py` — scoring formula
- `src/engine/recommender.py` — ranking engine
- `src/api/app.py` — FastAPI application
