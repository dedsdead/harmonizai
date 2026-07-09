# Observability Requirements Quality Checklist — Railway → Render Migration

- [x] CHK001 Is the `/health` endpoint response the ONLY health check, or are there additional probes (readiness, liveness) that Render requires? [Completeness]
- [ ] CHK002 Is the keepalive monitoring (GitHub Actions every 10 min) specified with its exact success criteria and failure alerting? [Clarity]
- [ ] CHK003 Is there any logging aggregation specified for Render (e.g., Render dashboard logs vs. external log sink)? [Completeness]
- [ ] CHK004 Is there a documented procedure to detect a silent failure (backend process running but returning errors) during the 24-hour verification period? [Gap]
- [ ] CHK005 Is it specified how to distinguish between a Render cold start (slow but normal) and a degraded/broken deployment (needs rollback)? [Measurability]
- [ ] CHK006 Is the GitHub Actions keepalive workflow's failure notification channel specified (email, Slack, none)? [Coverage]
- [ ] CHK007 Is there a rollback trigger documented — what metric or event triggers reactivation of Railway? [Completeness]
- [ ] CHK008 Is the Render build log retention period documented, especially for debugging deploy failures after the fact? [Clarity]
- [ ] CHK009 Is there any specification for monitoring the Vercel frontend deploy (not just the backend) — verifying the rebuild picked up the new `NEXT_PUBLIC_API_URL`? [Coverage]
- [ ] CHK010 Is the decommissioning of Railway documented with a verification step that confirms no dangling resources remain (DNS, billing, GitHub integration)? [Completeness]
