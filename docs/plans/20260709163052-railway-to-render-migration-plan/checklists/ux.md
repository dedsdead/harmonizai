# UX Requirements Quality Checklist — Railway → Render Migration

- [ ] CHK001 Is the end-user experience during the cutover window specified (what happens if a user visits the site while backend is migrating)? [Completeness]
- [ ] CHK002 Is the cold-start delay (5-15s on free tier after inactivity) documented as a UX tradeoff that users will experience? [Clarity]
- [ ] CHK003 Is there any user-facing indication that the backend is warming up (e.g., loading state with message), or is the spinner the only feedback? [Coverage]
- [ ] CHK004 Is the error state for "backend unreachable" specified beyond "the UI shows a clear error state"? (e.g., exact message text, retry button, fallback content) [Clarity]
- [ ] CHK005 Is the UX during the window between Render deploy and frontend rebuild specified? (Old frontend → dead Railway URL = broken app for all users) [Gap]
- [ ] CHK006 Are there acceptance criteria for the post-migration first-load experience (cache, preconnect, performance)? [Completeness]
- [x] CHK007 Is the removal of Railway preconnect/dns-prefetch `<link>` tags assessed for any performance regression on the frontend? [Measurability]
- [ ] CHK008 Is there any specification for mobile vs. desktop UX differences during the migration? (e.g., timeout behavior on slow mobile connections) [Edge Case]
- [ ] CHK009 Is the rollback UX specified — what does the user see if Railway must be reactivated? [Coverage]
- [ ] CHK010 Is there a documented success criteria for "user notices no difference" — e.g., identical layout, identical load time within X%? [Measurability]
