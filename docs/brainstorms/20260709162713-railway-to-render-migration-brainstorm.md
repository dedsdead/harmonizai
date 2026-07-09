# Railway → Render Migration — Brainstorm

**Date:** 2026-07-09
**Feature:** Migrate backend hosting from Railway (expired free tier) to Render

---

## 1. What We're Building

A hosting migration of the HarmonizAI backend (FastAPI + spaCy + SQLite) from Railway to Render. No feature changes, no API contract changes, no frontend hosting changes. The goal is to restore backend availability after Railway's free trial expired, using Render's free tier.

The frontend (Next.js 16, hosted on Vercel) is **not moving** — only the backend URL it calls changes via `NEXT_PUBLIC_API_URL`. End users should notice nothing except possibly a cold-start delay on the first request after inactivity (free tier behavior).

---

## 2. Current State

### Backend (stays in this repo, moves from Railway → Render)
- **Entrypoint:** `uvicorn src.api.app:app --host 0.0.0.0 --port ${PORT:-8000}` (via `Procfile`)
- **Python version:** 3.11.0 (via `runtime.txt`)
- **Data:** `data/processed/harmonizai.db` (10 MB SQLite, tracked in git), `data/dishes.yaml` (tracked in git)
- **spaCy model:** `pt_core_news_sm` (downloaded during pip install via `requirements.txt`)
- **Startup:** Initializes `FoodMatcher`, `RecommendationEngine`, `HarmonizationMetrics` in FastAPI's `lifespan`
- **CORS:** Reads `FRONTEND_URL` from env (defaults to `*`)
- **Health:** `GET /health` → `{"status": "ok"}`

### Frontend (stays on Vercel — no migration)
- **Next.js 16** static export (`output: "export"`)
- **API connection:** `NEXT_PUBLIC_API_URL` env var, baked into JS at build time
- **Current value:** old Railway URL (must be updated and frontend rebuilt)
- **Hardcoded Railway references:** 3 `<link>` tags in `web/app/layout.tsx:64-68` (preconnect, dns-prefetch, prefetch) — must be removed/updated

### CI/CD
- **Keepalive:** `.github/workflows/keepalive.yml` pings `${{ secrets.BACKEND_URL }}/health` every 10 min — secret must be updated to Render URL

### Deploy config
- `Procfile`, `runtime.txt`, `requirements.txt` — all compatible with Render as-is

---

## 3. Architecture & Infrastructure

### Where the logic lives
- **Backend service on Render** — single `web` process, same as current Railway setup. No change to architecture.
- Render's free tier: spins down after 15 min of inactivity, cold-starts in ~5-15s (spaCy load). Same behavior as Railway.

### Cloud services
- **Render** — new host for the Python backend. Free tier: 512 MB RAM, 0.1 CPU, single instance.
- **Vercel** — unchanged, hosts the frontend.
- No other services needed.

### Data model
- No changes. The SQLite schema (`wines`, `wine_foods`, `wine_flavors`, `wines_fts`, `harmonization_requests`) stays identical.
- `harmonizai.db` remains tracked in git and ships with deploys.
- Metrics (`harmonization_requests` table) continue to be ephemeral — lost on every restart/deploy. Same as Railway.

### Infrastructure changes
- **Create:** `render.yaml` at repo root — declarative blueprint for the Render service
- **Update:** Vercel env var `NEXT_PUBLIC_API_URL` → new Render URL
- **Update:** GitHub secret `BACKEND_URL` → new Render URL
- **Remove:** Hardcoded Railway URLs from `web/app/layout.tsx`
- **Update:** `.env.example` with Render URLs
- **Update:** `AGENTS.md` deploy section (Railway → Render)
- **Disable:** Railway service (stop or delete after cutover)

### Security approach
- Same as current: CORS via `FRONTEND_URL` env var, no authentication
- `allow_credentials=True` with wildcard `*` origin is problematic (CORS spec). Since `FRONTEND_URL` will be explicitly set on Render, this is fine.

---

## 4. Integration Impact

### Entity impact
- **None.** No database schema changes. The SQLite DB (`harmonizai.db`) is already tracked in git and ships unchanged.

### Lambda pipeline impact
- **None.** This project has no Lambda functions.

### Frontend feature impact
| File | Change | Reason |
|------|--------|--------|
| `web/app/layout.tsx:64-68` | Remove 3 `<link>` tags with hardcoded Railway URLs | Preconnect/dns-prefetch to dead domain wastes connection time; the real API URL comes from env var |
| Vercel env vars | Update `NEXT_PUBLIC_API_URL` to Render URL | Required for frontend to reach the new backend |
| Frontend deploy | Rebuild + redeploy after env var update | `NEXT_PUBLIC_*` is baked at build time in static export |

### API impact
- **None.** `POST /api/recommend` and `GET /health` are unchanged. Response shapes are byte-identical.

### Breaking changes
| Change | Who Affected | Severity | Mitigation |
|--------|-------------|----------|------------|
| Frontend still calls old Railway URL | All users during cutover | **High** | Deploy backend to Render first, verify `/health`, THEN update Vercel env + rebuild frontend. Keep Railway running until frontend is confirmed working. |
| Keepalive pings old URL | Monitoring | **Medium** | Update GitHub secret `BACKEND_URL` after cutover |
| Metrics data lost on restart | Developer | **Low** | Already the status quo (ephemeral SQLite on both Railway and Render) |

---

## 5. Key Decisions

- `✅ DECIDED:` **SQLite DB stays tracked in git.** No build-time rebuild step. The 10 MB DB ships with deploys. Simplest path.
- `✅ DECIDED:` **Frontend stays on Vercel.** Only `NEXT_PUBLIC_API_URL` env var changes, then rebuild.
- `✅ DECIDED:` **Create `render.yaml`** for reproducibility. Blueprint includes Python version, build command (`pip install -r requirements.txt`), start command, and env vars.
- `✅ DECIDED:` **Remove hardcoded Railway URLs from `layout.tsx`** during migration.
- `✅ DECIDED:` **Use Render's `.onrender.com` domain** (no custom domain for v1).
- `✅ DECIDED:` **Keep Railway service alive** during cutover for rollback, then disable after confirmation.

- `⚠️ OPEN:` **Cold-start mitigation.** Render free tier spins down after 15 min. The existing GitHub Actions keepalive (every 10 min) will prevent this once `BACKEND_URL` is updated. Confirm the secret update is in the plan.

---

## 6. Open Questions

All questions resolved during brainstorm.

---

## 7. Next Steps

1. **Run `/pwf-plan`** with this document to generate the implementation plan.
2. The plan should include these phases:
   - **Phase 1:** Create `render.yaml`, update `layout.tsx` (remove Railway URLs), update `.env.example`, update `AGENTS.md`
   - **Phase 2:** Deploy backend to Render, verify `/health` responds, set env vars in Render dashboard
   - **Phase 3:** Update `NEXT_PUBLIC_API_URL` on Vercel, rebuild + redeploy frontend
   - **Phase 4:** Verify end-to-end (run `tests/test_api.py` or manual test via frontend)
   - **Phase 5:** Update GitHub secret `BACKEND_URL`, disable/delete Railway service, final cleanup
3. **Prerequisites before Phase 1:**
   - A Render account (free tier)
   - GitHub repo access for auto-deploy from Render
4. **No third-party accounts or paid services needed.**
