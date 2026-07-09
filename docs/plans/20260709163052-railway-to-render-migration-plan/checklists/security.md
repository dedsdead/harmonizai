# Security Requirements Quality Checklist — Railway → Render Migration

- [x] CHK001 Is it explicitly stated which environment variables are secrets vs. configuration (e.g., `FRONTEND_URL` is config, `BACKEND_URL` GitHub secret is a secret)? [Clarity]
- [ ] CHK002 Is there a procedure for rotating or updating the GitHub `BACKEND_URL` secret that prevents exposing it in logs or CI output? [Completeness]
- [ ] CHK003 Is the CORS `allow_credentials=True` + wildcard fallback risk fully documented, including the exact browser behavior when `FRONTEND_URL` is unset? [Gap]
- [ ] CHK004 Is there a verification step to confirm `FRONTEND_URL` is set on Render before the service becomes publicly accessible? [Completeness]
- [ ] CHK005 Is the Render dashboard's env var storage method documented (at rest encryption, access control) or assumed? [Clarity]
- [ ] CHK006 Is there any authentication on the `/health` endpoint that could change between Railway and Render? (It's currently public — is this intentional?) [Consistency]
- [ ] CHK007 Is the risk of the SQLite DB file being corrupted or exposed through Render's file system documented? [Edge Case]
- [ ] CHK008 Is there a specification for how Render's automatic HTTPS certificate provisioning affects existing frontend CSP or mixed-content policies? [Coverage]
- [ ] CHK009 Are the Render Dashboard credentials/access management requirements documented (who in the team can access the Render account)? [Completeness]
- [ ] CHK010 Is there any logging of deployment events (Render deploy, Railway decommission) that should be preserved for audit? [Gap]
