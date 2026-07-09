# Integrations

## Integration Catalog

| Integration | Direction | Protocol | Auth | Purpose |
|-------------|-----------|----------|------|---------|
| Vivino | Outbound (link) | HTTPS URL generation | None | Links to wine product page: `https://www.vivino.com/w/{id}` |
| Google Shopping | Outbound (link) | HTTPS URL generation | None | Search URL for wine purchase: `?q={name}+{winery}+vinho&tbm=shop` |
| spaCy model | Build-time | pip install | None | `pt_core_news_sm` — downloaded from GitHub releases |

## Authentication and Access

- No API keys, no OAuth, no tokens
- The API is fully public (no auth layer)
- CORS is the only access control: `FRONTEND_URL` env var

## Contracts and Data Flows

- Frontend → Backend: `POST /api/recommend` with `{ query: string }` → `ApiResponse`
- Frontend health check: `GET /health` → `{ status: "ok" }`
- Backend → SQLite: local file read/write via sqlite3
- Backend → YAML: local file read for `data/dishes.yaml`

## Failure Modes and Retries

- No runtime remote calls — no network failure modes at the application level
- Build failure: spaCy download fail → app crash on startup (auto-retries via `requirements.txt` URL)
- DB missing: any SQLite query fails if `harmonizai.db` not present in deploy artifact

## Ownership

- All code in this single repository
- No third-party API accounts needed
- Deployment platforms: Render (backend), Vercel (frontend)
