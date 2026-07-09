# HarmonizAI — AGENTS.md

## Two independent projects

| Layer | Dir | Stack | Start command |
|-------|-----|-------|---------------|
| Backend | `/` | Python 3.11, FastAPI, spaCy, SQLite | `python -m uvicorn src.api.app:app --reload` |
| Frontend | `web/` | Next.js 16, React 19, Tailwind 4, TS | `cd web; npm run dev` |

Backend (port 8000) must be running for frontend to work.

## Backend

- **No LLM calls** — classic NLP only (spaCy + rapidfuzz). Project principle.
- **Dataset** (`data/processed/harmonizai.db`) is gitignored. Build from `data/raw/*.json`:
  `python -m src.data.merge_raw; python -m src.data.normalize`
- **spaCy model**: `python -m spacy download pt_core_news_sm` (required).
- **CLI**: `python -m src.engine.cli` — interactive, logs to SQLite.
- **Score formula** (`src/engine/scorer.py:142-164`):
  `0.40×s_food + 0.15×s_flavor + 0.45×s_struct + 0.01×s_rating − style_penalty`. `s_rating` is tiebreak-only.
- **Dishes**: `data/dishes.yaml` — 101 curated entries, each with `vivino_food_tags`, `target_structure`, `flavor_keywords_match`, `flavor_keywords_exclude`, `suggested_wine_types`.
- **No `__init__.py` in `src/engine/`, `src/nlp/`, `src/data/`** — entrypoints use `sys.path.insert(0, root_dir)` to resolve imports. Always run commands from repo root.

## Tests

Plain Python scripts (not pytest). Run from repo root:
- `python tests/test_engine.py` — end-to-end: sushi → recommendations
- `python tests/test_pipeline.py` — 7 complex queries against NLP
- `python tests/test_coverage.py` — 50 synthetic queries, prints hit rate
- `python tests/test_api.py` — requires API running on `http://127.0.0.1:8000`

## Frontend (`web/`)

- **Next.js 16** — has breaking changes vs training data. Read `node_modules/next/dist/docs/` before writing code. See also `web/AGENTS.md` (referenced by `web/CLAUDE.md`).
- Static export (`output: "export"`), also supports GitHub Pages.
- PWA features (manifest, service worker) — `app/layout.tsx`.
- `NEXT_PUBLIC_API_URL` env var (default: Railway URL, override for local dev).
- Commands (run from `web/`): `npm run dev`, `npm run build`, `npm run lint`, `npm run analyze`.
- Bundle analyzer: `npm run analyze` — requires `@next/bundle-analyzer` (install manually if needed).
- Package manager: npm. pnpm lockfile is gitignored.

## Deploy

- Backend: Render (`Procfile` → `uvicorn src.api.app:app --host 0.0.0.0 --port ${PORT:-8000}`).
- Frontend: Vercel or GitHub Pages (`npm run deploy:gh`).
- `FRONTEND_URL` env on backend controls CORS. `NEXT_PUBLIC_API_URL` on frontend points to API.
- GitHub Pages: set `GITHUB_PAGES=true` env for correct base path.
