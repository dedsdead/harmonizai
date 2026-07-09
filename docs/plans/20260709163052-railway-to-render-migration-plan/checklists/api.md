# API Requirements Quality Checklist — Railway → Render Migration

- [x] CHK001 Is it explicitly stated which API endpoints must remain byte-identical after migration? [Completeness]
- [ ] CHK002 Is it clear whether the response shape for `POST /api/recommend` is specified anywhere or only implied by "no changes"? [Clarity]
- [ ] CHK003 Are HTTP error status codes and their response bodies defined for the migration verification (e.g., what `500` should look like if the DB is missing on Render)? [Coverage]
- [x] CHK004 Is there a specification for how CORS preflight (`OPTIONS`) responses should behave after migration? [Completeness]
- [ ] CHK005 Is the `/health` response contract documented beyond `{"status": "ok"}` — are there any additional fields the frontend's `pingBackend()` expects? [Completeness]
- [ ] CHK006 Is the API's request timeout behavior specified (what happens if Render cold start takes 15s and the browser times out at 10s)? [Edge Case]
- [ ] CHK007 Is it clear whether rate limiting or request throttling differs between Railway (none) and Render (none or default)? [Consistency]
- [ ] CHK008 Are the expected `Content-Type` and `Accept` headers for all API interactions documented? [Clarity]
- [ ] CHK009 Does the plan specify how to verify that the API contract is preserved versus the old Railway instance? [Measurability]
- [ ] CHK010 Is there a fallback API URL or failover mechanism specified if Render is unreachable (e.g., frontend shows error vs. retries)? [Gap]
