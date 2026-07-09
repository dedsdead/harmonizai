# Infrastructure

## Infrastructure Overview

Two independent deployments:

```
harmonizai/
├── Backend: Python 3.11 / FastAPI / spaCy / SQLite  →  Render (free tier)
└── Frontend: Next.js 16 / React 19 / Tailwind 4 / TS → Vercel (free tier)
```

## Environments

| Environment | Backend | Frontend | Notes |
|-------------|---------|----------|-------|
| Production | Render (`harmonizai-api.onrender.com`) | Vercel (`harmonizai.vercel.app`) | — |
| Local dev | `localhost:8000` (uvicorn) | `localhost:3000` (next dev) | Backend required for frontend |

## Core Services and Dependencies

- **No external API services** — all NLP/spaCy + scoring is local
- **Vivino URLs** generated programmatically (`https://www.vivino.com/w/{wine_id}`)
- **Google Shopping URLs** generated programmatically
- **No database-as-a-service** — SQLite file shipped with repo

## Deployment and Operations

- Backend: Render Web Service, auto-deploy from GitHub, `render.yaml` blueprint
- Frontend: Vercel auto-deploy from GitHub, static export (`output: "export"`)
- Keepalive: GitHub Actions workflow pings `/health` every 10 min to prevent cold start
- No custom domains — `.onrender.com` and `.vercel.app` domains

## Known Constraints and Risks

- Render free tier spins down after 15 min idle → cold start ~5-15s
- SQLite metrics data (`harmonization_requests` table) is ephemeral — lost on restart/deploy
- No rate limiting, no auth layer on the API
