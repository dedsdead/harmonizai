# Data Requirements Quality Checklist — Railway → Render Migration

- [x] CHK001 Is it clearly specified which data is persistent (git-tracked `harmonizai.db`) vs. ephemeral (runtime `harmonization_requests` table)? [Clarity]
- [ ] CHK002 Is there a mechanism to detect if `harmonizai.db` becomes corrupted or is missing from the deployed artifact on Render? [Completeness]
- [ ] CHK003 Is the exact size and composition of `harmonizai.db` documented to ensure it fits within Render's free tier storage limits? [Measurability]
- [ ] CHK004 Is it specified whether the `harmonizai.db` tracked in git could contain stale data (e.g., old wine ratings) and how to regenerate it? [Gap]
- [ ] CHK005 Is there any specification for how to handle the `.gitignore` + `*.db` pattern conflict (the DB is tracked despite being gitignored) without causing future confusion? [Clarity]
- [ ] CHK006 Is the risk of committing dirty metric data (from local development) into the tracked `harmonizai.db` assessed? [Edge Case]
- [ ] CHK007 Is it specified what happens to the `harmonization_requests` metrics table during the migration — is the data from Railway preserved or explicitly discarded? [Consistency]
- [ ] CHK008 Is the data flow diagram complete: does it show where `harmonizai.db` lives at each stage (local dev, git push, Render build, Render runtime)? [Completeness]
- [ ] CHK009 Are there any data format differences between the `wines.parquet` and `harmonizai.db` that could cause silent data corruption if only one is updated? [Edge Case]
- [ ] CHK010 Is the process for rebuilding the SQLite DB from source data documented, even if not used as part of this migration? [Coverage]
