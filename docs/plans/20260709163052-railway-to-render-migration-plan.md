---
title: "Railway → Render Migration"
type: enhancement
status: active
date: 2026-07-09
phased: true
---

# Railway → Render Migration Plan

## Overview

**Problem:** Railway free trial expired, backend is unavailable. The frontend (Vercel) still tries to reach the old Railway URL and fails.

**Solution:** Migrate the Python/FastAPI backend to Render's free tier. No feature changes, no API contract changes, no frontend hosting changes. The frontend stays on Vercel — only `NEXT_PUBLIC_API_URL` changes.

**Who it's for:** Developer (one-time migration) and end users (zero-visible-change result).

---

## Scope / Work Breakdown

### Group A — Pre-deploy config changes (repo-only, no Render access needed)
- Create `render.yaml`
- Remove hardcoded Railway URLs from `layout.tsx`
- Update `.env.example` with Render URLs
- Update `AGENTS.md` deploy section

### Group B — Render service setup (requires Render account)
- Create Render Web Service from GitHub repo
- Set environment variables on Render dashboard
- Verify `/health` endpoint

### Group C — Frontend & cutover (requires Render backend verified live)
- Update `NEXT_PUBLIC_API_URL` on Vercel
- Rebuild + redeploy frontend
- Update GitHub secret `BACKEND_URL` for keepalive
- Disable Railway

---

## Proposed Solution

### Architecture (unchanged)
```
User → Vercel (Next.js static) → Render (FastAPI + spaCy + SQLite)
```

### Key design decisions (from brainstorm)
- **`render.yaml` created at repo root** — declarative IaC blueprint
- **`harmonizai.db` stays tracked in git** — ships with deploys, no build-time rebuild
- **Frontend stays on Vercel** — only `NEXT_PUBLIC_API_URL` env var changes, then rebuild
- **Render `.onrender.com` domain** — no custom domain for v1
- **Railway kept alive** during cutover for rollback, then disabled

### `render.yaml` structure
```yaml
services:
  - type: web
    name: harmonizai-api
    runtime: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn src.api.app:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: FRONTEND_URL
        value: https://harmonizai.vercel.app
```
The `repo:` field is omitted — it's optional when syncing via the Render Dashboard Blueprint flow (Render detects the repo automatically).

### Files that change

| File | Change |
|------|--------|
| `render.yaml` | **Create** — Render blueprint |
| `web/app/layout.tsx:64-68` | Remove 3 `<link>` tags with hardcoded Railway URLs |
| `.env.example` | Update placeholder URLs (Railway → Render) |
| `AGENTS.md` | Deploy section: Railway → Render |
| Vercel env vars | `NEXT_PUBLIC_API_URL` → Render URL |
| GitHub secret `BACKEND_URL` | → Render URL |

### Files that stay unchanged (verified compatible)
- `Procfile` — Render supports the same format
- `runtime.txt` — Render supports `python-3.11.x`
- `requirements.txt` — pip install works identically
- `src/api/app.py` — CORS reads `FRONTEND_URL` from env, no code change needed
- `web/app/lib/wines.ts` — `NEXT_PUBLIC_API_URL` is already env-driven

### Python version note
- `runtime.txt` specifies `python-3.11.0`
- `.python-version` specifies `3.11.4`
- Render reads `runtime.txt`. Both are 3.11.x — no compatibility issue.

---

## Technical Considerations

### Render Blueprint format
- `render.yaml` must live at repo root
- `runtime: python` (not `env: python` — newer syntax)
- `buildCommand` runs during deploy: `pip install -r requirements.txt`
- `startCommand` uses `$PORT` (Render sets this env var automatically)
- Environment variables can be defined inline with `value` or as `sync: false` secrets

### CORS behavior on Render
- `FRONTEND_URL` must be explicitly set to the Vercel frontend URL
- With `allow_credentials=True` in FastAPI's CORSMiddleware, wildcard `*` is NOT valid per CORS spec. Explicit origin avoids this issue.
- If `FRONTEND_URL` is not set, it defaults to `"*"`. With `allow_credentials=True`, this causes CORS errors in browsers. **Always set this env var.**

### SQLite persistence
- `harmonizai.db` is tracked in git (10 MB) — ships with every deploy
- Metrics data (`harmonization_requests` table) written at runtime is ephemeral — lost on each deploy/restart
- This matches existing Railway behavior — no regression

### Cold starts
- Render free tier spins down after 15 min of inactivity
- Cold start: ~5-15s (spaCy model load)
- Mitigated by the existing GitHub Actions keepalive (pings every 10 min) — `BACKEND_URL` secret must be updated

### Security
- No hardcoded secrets in the codebase
- `FRONTEND_URL` env var controls CORS — must be set to the actual frontend origin
- GitHub secret `BACKEND_URL` holds the backend URL for the keepalive workflow

---

## Acceptance Criteria

#### AC-1: Backend deploys and responds to health check
**Given** the Render service is configured with the correct build and start commands
**When** Git push triggers a deploy to Render
**Then** `GET https://harmonizai-api.onrender.com/health` returns `{"status": "ok"}` with HTTP 200
**Priority:** Must-have

#### AC-2: CORS allows requests from the frontend
**Given** `FRONTEND_URL` is set to the Vercel frontend origin on Render
**When** the frontend sends a `POST /api/recommend` request
**Then** the response includes `Access-Control-Allow-Origin` matching the frontend origin
**Priority:** Must-have

#### AC-3: Recommendation API returns correct data
**Given** the backend is running on Render
**When** a user submits a food query through the frontend
**Then** the response includes wine recommendations with score breakdown (identical shape to previous API)
**Priority:** Must-have

#### AC-4: Frontend connects to the new backend
**Given** `NEXT_PUBLIC_API_URL` is updated on Vercel and the frontend is rebuilt
**When** a user loads the site and submits a query
**Then** the request reaches the Render backend (not Railway), and recommendations are displayed
**Priority:** Must-have

#### AC-5: Old frontend (not yet rebuilt) shows graceful error
**Given** the frontend has NOT yet been rebuilt with the new `NEXT_PUBLIC_API_URL`
**When** a user submits a query
**Then** the UI shows a clear error state (not a blank page or broken layout)
**Priority:** Should-have

#### AC-6: Railway can be decommissioned after cutover
**Given** the Render backend is verified working and the frontend is rebuilt
**When** the Railway service is stopped or deleted
**Then** the app continues to function normally
**Priority:** Must-have

---

## Implementation Plan

| Phase | Name | Depends On | Status |
|-------|------|------------|--------|
| 1 | Local config changes | None | ✅ Completed |
| 2 | Deploy backend to Render | Phase 1 | ⬜ Pending |
| 3 | Frontend cutover and verification | Phase 2 | ⬜ Pending |
| 4 | Decommission Railway | Phase 3 | ⬜ Pending |

---

### Phase 1: Local config changes

**Status:** ✅ Completed
**Objective:** Prepare the repository with `render.yaml`, cleaned frontend URLs, and updated docs. No Render access required.
**Dependencies:** None

**Tasks:**

- [x] T101 Create `render.yaml` at repo root (`render.yaml`)
  - Write the blueprint file with exact content:
    ```yaml
    services:
      - type: web
        name: harmonizai-api
        runtime: python
        plan: free
        buildCommand: pip install -r requirements.txt
        startCommand: uvicorn src.api.app:app --host 0.0.0.0 --port $PORT
        envVars:
          - key: FRONTEND_URL
            value: https://harmonizai.vercel.app
    ```
  - `repo:` is intentionally omitted — Render Dashboard auto-detects it during Blueprint sync

- [x] T102 [P] Validate `render.yaml` syntax
  - Run: `python -c "import yaml; yaml.safe_load(open('render.yaml'))"`
  - Expected: no exceptions. If YAML library is unavailable, use any available YAML validator
  - Confirm `runtime: python` (not `env: python` — newer Render format)
  - Confirm `startCommand` uses `$PORT` (not hardcoded port)

- [x] T103 Remove hardcoded Railway URLs from `web/app/layout.tsx`
  - In file `web/app/layout.tsx`, remove lines 64-68 (the 3 `<link>` tags):
    - `<link rel="preconnect" href="https://harmonizai-api.up.railway.app" />`
    - `<link rel="dns-prefetch" href="https://harmonizai-api.up.railway.app" />`
    - `<link rel="prefetch" href="https://harmonizai-api.up.railway.app/health" as="fetch" crossOrigin="anonymous" />`
    - Keep the surrounding comment blocks (`{/* Preconnect para APIs... */}` and `{/* Prefetch para warm-up... */}`) — they can stay or be updated later

- [x] T104 [P] Verify Railway URLs are fully removed from `web/app/layout.tsx`
  - Run: `Select-String -Path "web/app/layout.tsx" -Pattern "railway" -CaseSensitive:$false` (PowerShell) or `grep -i railway web/app/layout.tsx` (Unix)
  - Expected: no matches. If matches remain, remove them.

- [x] T105 Update `.env.example` with Render URLs (`.env.example`)
  - Change the `FRONTEND_URL` header comment from `# Backend (Railway)` to `# Backend (Render)`
  - Update `NEXT_PUBLIC_API_URL` example value from `https://sua-api.up.railway.app` to `https://harmonizai-api.onrender.com` (or the actual Render subdomain)

- [x] T106 Update `AGENTS.md` deploy section (`AGENTS.md`)
  - Locate the Deploy section (lines 42-47)
  - Change line 44 from `- **Backend:** Railway...` to `- **Backend:** Render (\`Procfile\` → ...)`
  - Keep the rest of the section unchanged (Frontend, env vars, GitHub Pages lines are still accurate)

- [x] T107 [P] Verify `harmonizai.db` is tracked in git (pre-deploy safety check)
  - Run: `git ls-files "data/processed/harmonizai.db"`
  - Expected: path is returned. If not tracked, add it: `git add -f data/processed/harmonizai.db`
  - If the file doesn't exist locally, run: `python -m src.data.merge_raw; python -m src.data.normalize` to build it

- [x] T108 Commit and push all Phase 1 changes
  - Stage changed files: `git add render.yaml web/app/layout.tsx .env.example AGENTS.md`
  - If T107 required adding `harmonizai.db`, stage that too
  - Commit: `git commit -m "[HARMONIZAI] 🔧 chore(deploy): prepare Render migration config"`
  - Push: `git push`

**After completing this phase:**
1. Verify GitHub shows the render.yaml file — open the repo on GitHub and confirm
2. No build/typecheck needed — Phase 1 is config only (YAML, markdown, HTML edits)
3. Update this plan — mark Phase 1 as ✅ Completed in the table above

---

### Phase 2: Deploy backend to Render

**Status:** ⬜ Pending
**Objective:** Create Render Web Service, deploy the backend, verify it's live.
**Dependencies:** Phase 1 (files pushed to GitHub)

**Tasks:**

- [ ] T201 Create Render Web Service via Blueprint sync
  - Open Render Dashboard → New → Blueprint
  - Connect the GitHub repo, select the main branch
  - Verify Render detects and syncs `render.yaml`
  - **Alternative:** Create manually via New Web Service → pick repo → configure with these values:
    - Name: `harmonizai-api`
    - Runtime: Python
    - Build Command: `pip install -r requirements.txt`
    - Start Command: `uvicorn src.api.app:app --host 0.0.0.0 --port $PORT`
    - Plan: Free

- [ ] T202 Set environment variables in Render dashboard
  - `FRONTEND_URL`: exactly the Vercel frontend URL (e.g., `https://harmonizai.vercel.app`)
  - No trailing slash on the URL
  - Verify `PORT` is NOT manually set (Render provides it automatically)

- [ ] T203 Wait for first deploy to complete
  - Monitor Render build logs for:
    - `pip install` succeeds (dependencies install correctly)
    - spaCy model downloads (via `requirements.txt` URL)
    - Startup message: "Motor pronto!" from `app.py` lifespan
  - Expected build time: ~2-3 min (first deploy includes dependency downloads)

- [ ] T204 Verify backend health
  - Run: `curl -fsS https://harmonizai-api.onrender.com/health`
  - Expected: `{"status": "ok"}` with HTTP 200
  - Also verify CORS headers via: `curl -I -X OPTIONS -H "Origin: https://harmonizai.vercel.app" -H "Access-Control-Request-Method: POST" https://harmonizai-api.onrender.com/api/recommend`
  - Expected: `Access-Control-Allow-Origin: https://harmonizai.vercel.app`

- [ ] T205 Verify the backend works via manual API test
  - Test the `/api/recommend` endpoint on Render directly:
    `curl -X POST https://harmonizai-api.onrender.com/api/recommend -H "Content-Type: application/json" -d '{"query":"sushi variado"}'`
  - Verify the response includes `dish`, `wines` array with score breakdown
  - Confirm no CORS issues: `curl -I -X OPTIONS -H "Origin: https://harmonizai.vercel.app" -H "Access-Control-Request-Method: POST" https://harmonizai-api.onrender.com/api/recommend`
  - Run local tests separately (`python tests/test_engine.py`, `python tests/test_coverage.py`) — these use the local SQLite DB, not the deployed instance, and verify the code itself isn't broken

---

### Phase 3: Frontend cutover and verification

**Status:** ⬜ Pending
**Objective:** Point the frontend to the new Render backend, rebuild, verify end-to-end.
**Dependencies:** Phase 2 (Render backend verified live)

**Tasks:**

- [ ] T301 Update `NEXT_PUBLIC_API_URL` on Vercel
  - Go to Vercel Dashboard → Project Settings → Environment Variables
  - Set `NEXT_PUBLIC_API_URL` = `https://harmonizai-api.onrender.com`
  - Ensure it's set for Production environment
  - **Critical:** This env var is baked into the JS bundle at build time — requires a rebuild

- [ ] T302 Rebuild and redeploy the frontend on Vercel
  - Trigger a new deploy from Vercel Dashboard (or push a commit to trigger auto-deploy)
  - Verify build completes without errors
  - Check the built JS bundle for the new Render URL: inspect `Network` tab in DevTools or search the `out/` directory

- [ ] T303 Verify end-to-end via the live frontend
  - Open the Vercel frontend URL in a browser
  - Submit a food query (e.g., "sushi variado")
  - Verify:
    - No CORS errors in the browser console
    - Wine recommendations load and display correctly
    - Score breakdown matches expected format
  - **Alternative:** Run `python tests/test_api.py` against the live Render URL

- [ ] T304 Update GitHub secret `BACKEND_URL` for keepalive workflow
  - Go to GitHub repo → Settings → Secrets and variables → Actions
  - Update `BACKEND_URL` to `https://harmonizai-api.onrender.com`
  - Verify `.github/workflows/keepalive.yml` runs successfully on the next scheduled trigger (every 10 min)

---

### Phase 4: Decommission Railway

**Status:** ⬜ Pending
**Objective:** Clean up old infrastructure. Only proceed after Phase 3 is fully verified.
**Dependencies:** Phase 3

**Tasks:**

- [ ] T401 Stop Railway service
  - Log in to Railway dashboard
  - Stop or disable the backend service
  - **Do not delete yet** — keep for rollback until after verification period

- [ ] T402 Verification period
  - Wait 24 hours after cutover
  - Monitor:
    - Render keepalive pings succeed (GitHub Actions)
    - No error reports from users
    - Frontend continues to work

- [ ] T403 Delete Railway service (after verification)
  - Remove the Railway project entirely
  - Remove Railway as a deploy target in GitHub (if connected)

---

## ✅ Master Checklist

### Phase 1: Local config changes
- [x] T101 Create `render.yaml` at repo root
- [x] T102 [P] Validate `render.yaml` syntax
- [x] T103 Remove Railway URLs from `web/app/layout.tsx`
- [x] T104 [P] Verify Railway URLs fully removed via grep
- [x] T105 Update `.env.example` with Render URLs
- [x] T106 Update `AGENTS.md` deploy section
- [x] T107 [P] Verify `harmonizai.db` tracked in git
- [x] T108 Commit and push all Phase 1 changes

### Phase 2: Deploy backend to Render
- [ ] T201 Create Render Web Service (Blueprint or manual)
- [ ] T202 Set `FRONTEND_URL` env var in Render dashboard
- [ ] T203 Wait for first deploy (verify build logs)
- [ ] T204 Verify `/health` endpoint + CORS headers
- [ ] T205 Run backend tests against Render

### Phase 3: Frontend cutover and verification
- [ ] T301 Update `NEXT_PUBLIC_API_URL` on Vercel
- [ ] T302 Rebuild and redeploy frontend
- [ ] T303 Verify end-to-end via live frontend
- [ ] T304 Update GitHub secret `BACKEND_URL`

### Phase 4: Decommission Railway
- [ ] T401 Stop Railway service (keep for rollback)
- [ ] T402 24-hour verification period
- [ ] T403 Delete Railway service

---

## Clarifications

No clarifications file needed — all decisions were resolved during the brainstorm.

---

## Execution Log

### 2026-07-09 — Phase 1: Railway-to-Render migration prep (commit `b8ec688`)

Phase 1 executed 2026-07-09. All 8 tasks completed. Commit `b8ec688` pushed to `origin/main`.

**Tasks completed (fully):** T101, T102, T103, T104, T105, T106, T107, T108
**Tasks completed (partially):** None
**Tasks not executed in this run:** T201–T403 (Phases 2–4 pending)

**Unplanned changes:** None

**Implementation deviations:** None

**Files changed:**
- `render.yaml` — created
- `web/app/layout.tsx` — removed Railway `<link>` tags
- `.env.example` — updated Render URL and comment
- `AGENTS.md` — updated deploy section
