# Environments

## Environment Matrix

| Variable | Local Dev | Production (Render/Vercel) | Purpose |
|----------|-----------|---------------------------|---------|
| `FRONTEND_URL` | unset (defaults to `*`) | `https://harmonizai.vercel.app` | CORS allowed origin |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` (default) | `https://harmonizai-api.onrender.com` | Frontend's backend URL |
| `PORT` | `8000` (default) | Render auto-assigns | Server listen port |
| `GITHUB_PAGES` | unset | `true` when deploying to GH Pages | Base path for static export |

## Configuration and Secrets Boundaries

- No secrets in the codebase
- `BACKEND_URL` stored as GitHub Actions secret for the keepalive workflow
- `.env.example` contains placeholder values only (no real URLs)

## Deployment Differences

| Aspect | Local Dev | Production |
|--------|-----------|------------|
| Backend start | `python -m uvicorn src.api.app:app --reload` | `uvicorn src.api.app:app --host 0.0.0.0 --port $PORT` (Render) |
| Frontend start | `npm run dev` (hot reload) | Static export served by Vercel |
| SQLite DB | Local file, mutable | Git-tracked copy, rebuilt on deploy |
| spaCy model | Downloaded once | Downloaded each deploy (cached by Render) |

## Operational Access

- Render Dashboard: render.com (GitHub OAuth)
- Vercel Dashboard: vercel.com (GitHub OAuth)
- GitHub Secrets: repo Settings → Secrets and variables → Actions
