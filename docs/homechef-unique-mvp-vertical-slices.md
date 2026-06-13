# HomeChef AI Unique MVP — Vertical Slice Plans
**Repo:** bobtech-IIT/homechef-ai (cloned to Projects/homechef-ai-fix)  
**Date:** 2026-06-13  
**Process:** Follows Grok Mode v2 + precision-primitives-contracts + ultimate-orchestration-system (Grill complete via prior, Vertical Slices, Two-Stage Review, Handoff, Adherence Scorer).  
**Orchestrator:** This agent (Grok)  
**Reference:** Local `Downloads/07_Code_Dev/Google AI Studio Files/Build HomeChef AI/` for proven map + archetype + puter wrapper code. MASTER_PLAN.md for vision.

**Overall Goal (User Value):** Ship a working, unique, culturally authentic Indian home-cooking PWA MVP on Vercel where:
- App no longer loads directly into stale "Sharma Family" cached screen/data.
- Culinary Archetype selector is clean and visibly transforms recipes (standard / biohacker / cognitive).
- Great Indian Thali 36 States explorer shows real SVG + animations + interactive pins (not plain text).
- Nani (Rasoi Saathi) AI actually responds with useful step-by-step Hinglish recipes (Puter working or rich fallback; archetype-aware; "Bajre ki Khichdi" example succeeds).
- Process itself demonstrates multi-agent expert dispatch + Hermes engagement.

All slices are thin tracer bullets: end-to-end, independently demoable, sized for one focused cycle + verify + review.

---

## Slice 1: Add storage version + explicit fresh-start / reset gate so app no longer auto-loads old Sharma cached state on launch

**Goal / User Value (one sentence, user's perspective):**  
When I open the app for the first time (or after clear), I am greeted by Splash then SetupWizard instead of being dumped straight into an old "Sharma Family KOLKATA Non-Veg" dashboard with stale plan/chat. I can always "Start Fresh" or reset without losing core preferences forever.

**Why this Slice now (context / prerequisite alignment):**  
Root cause of "directly takes to the old cached data and screen". AppContext loads 'homechef_v3_state' and preserves isSetupComplete=true + profile (including culinaryArchetype) with only a weak migration for missing archetype. Matches user-reported #1 dangerous issue. Prerequisite for all UX tests.

**Files Changed (exact paths + nature):**
- `src/context/AppContext.jsx` (modify — add STORAGE_VERSION, versioned key or migration that can force !isSetupComplete on mismatch or explicit reset; enhance RESET_ALL + new RESET_PROFILE action)
- `src/App.jsx` (modify — after splash, show a lightweight "Welcome back, Sharma Family?" banner + "Start Fresh Session" CTA that sets isSetupComplete=false while keeping some prefs, or force wizard on version bump)
- `src/components/SettingsPanel.jsx` (modify — add prominent "Start Fresh / Reset Household" button wired to new action)
- `docs/evidence/slice-1-stale-fix-*.md` (new — test logs + describe)

**Precise Behavior Being Added/Changed (Interface contract):**
- On load: if localStorage key missing or version mismatch (introduce 'homechef_state_v4' or bump), treat as fresh (isSetupComplete=false).
- RESET action (exposed): clears chat/weekly/inventory but optionally preserves familyName + archetype + regionalPalate (or full reset to INITIAL).
- UI: After splash, if profile.isSetupComplete but a "fresh requested" flag or first-seen-this-session, optionally show one-time "Continue as Sharma or start new?" modal (default continue for friendliness).
- Observable: Incognito or cleared storage → SetupWizard. "Reset" button → next reload or in-session goes to wizard or clean home.

**Verification Gate (required — makes the Slice valid):**
**Automated:**
- None (client state); manual is primary.

**Manual / Integration (if applicable):**
- Clear site data or new incognito → load → Splash → SetupWizard (not auto dashboard). Complete setup with Sharma/Kolkata/Non-Veg + archetype → Home shows correct badge. Reload → still on Home (no forced wizard).
- In Settings click "Start Fresh" → state resets appropriately; reload or in-memory shows wizard or clean prompt.
- Existing 'homechef_v3_state' with Sharma profile loads as "welcome back" but reset option is obvious and one-tap.
- Console: version log on load.

**Rollback / Safety:**  
- Old key still read for migration (backward compat 1 version).
- RESET_ALL already existed — we just expose + version it.

**Acceptance Criteria (from plan or issue):**
- [ ] Fresh incognito never auto-skips to old Sharma data/screen.
- [ ] "Sharma Family KOLKATA • Non-Vegetarian" + chosen archetype visible after setup.
- [ ] Easy visible reset that user can use to escape cached state.
- [ ] No data loss for preferences the user wants to keep across resets.

**Dependencies / Blocked By (other Slices or external):**  
- None (foundational; do early).

**Out of Scope for This Slice (focus enforcement):**  
- Full profile switcher UI, cloud sync, or multi-family.

**Risks & Open Questions (surface now):**  
- Users who *want* to keep history may be annoyed by aggressive reset — mitigate with "Continue" as default + obvious reset.
- localStorage quota (rare) — already handled with try/catch.

**Estimated Size:** Small (high confidence 80%). One focused session for impl + manual verify + review.

**Review Requirements:**  
- Two-Stage Review (plan compliance using REVIEW_RUBRIC + quality).
- Special focus: persistence invariants, no accidental data loss on existing users.
- HITL: Yes (user confirms the before/after load behavior on their machine).

**Suggested Primitives / Skills for Execution:**  
- TDD where possible (even if manual assertions).
- Use existing RESET_ALL pattern.
- Evidence artifacts: describe + (if possible) terminal screenshots of flows.

---

## Slice 2: Revive fully visible + interactive Great Indian Thali SVG map with zone/state pins, animations, search, and "Cook!" wiring (no plain-text regression)

**Goal / User Value (one sentence, user's perspective):**  
When I tap the Thali explorer I see a beautiful animated saffron-glow SVG India map with pulsing zone markers and tappable state pins (Haryana Bajre ki Khichdi etc.), zoom/detail cards, and "Feeling Hungry? Cook!" that actually opens Nani chat with the exact traditional recipe prompt. Not just header text + list.

**Why this Slice now (context / prerequisite alignment):**  
User explicitly: "No SVG - no map animation - nothing visible only plain text 'Great Indian Thali 36 STATES...' + Haryana example". The cloned code *contains* the full good IndianThaliMap.jsx (SVG polygon + CSS anims + relative pins + logic from local Build reference), but it is not rendering visibly (likely missing CSS vars like --hc-saffron, z-index, positioning on dark canvas, or a recent "fix" commit partially regressed styles/conditionals). Map is already wired in App.jsx + HomeDashboard + handleSelectThaliRecipe. High visual/unique value.

**Files Changed (exact paths + nature):**
- `src/components/IndianThaliMap.jsx` (modify — ensure all visual layers always render (SVG + pins + anim classes); add explicit fallback colors + !important or injected <style> for --hc-saffron/--hc-turmeric if missing; harden positioning for small screens; keep 36 states)
- `src/index.css` or `src/App.css` (modify — add/ensure the saffron palette custom properties + .pulse-effect / .bounce-pin / mapCanvas rules if not global)
- `src/components/HomeDashboard.jsx` (modify if launcher weak — make "Explore Great Indian Thali" card prominent with icon)
- `docs/evidence/slice-2-thali-map-*.png|log` (new — screenshots of zones expanded, Haryana selected, Cook flow)

**Precise Behavior Being Added/Changed (Interface contract):**
- Map modal always shows the SVG silhouette + grid lines + 6 pulsing zone markers on first open.
- Tap zone → shows state pins for that zone (pulsing, clickable) + "Zoom Out".
- Tap state (e.g. Haryana) → detail card with "HARYANA SPECIALTY Bajre ki Khichdi" + tags + desc + Back + "Feeling Hungry? Cook!".
- Cook! → closes map + switches to AI Chat + prefills exact user message from handleSelectThaliRecipe.
- Search filters the list view and clears zones appropriately.
- No path where only the header text + static list is visible.

**Verification Gate (required — makes the Slice valid):**
**Automated:** None (DOM/visual).

**Manual / Integration (if applicable):**
- From Home, open map → immediately see saffron India outline + pulsing zones + "36 STATES & UNION TERRITORIES EXPLORER" + hint text. No plain text only.
- Interact: North India zone → states incl Haryana pin visible and tappable → detail for Bajre ki Khichdi.
- "Cook!" triggers chat prefill + tab switch; Nani gets the prompt (may be offline or real per other slice).
- On mobile viewport: pins readable, no overflow, zoom-out button works.
- Evidence: multiple describes + (user or terminal) visual confirmation that SVG/pins/anims are present (not just the h3 text).

**Rollback / Safety:**  
- The component already had the full logic; we are restoring visibility + adding defensive styles. Can temporarily show a text list below the canvas as accessible fallback while keeping visual primary.

**Acceptance Criteria (from plan or issue):**
- [ ] SVG + animations + interactive pins visible and working (matches local Build reference behavior).
- [ ] Haryana Bajre ki Khichdi reachable and "Cook!" wires to Nani.
- [ ] 36 states/UTs covered (data already has them).
- [ ] No regression to plain text state.

**Dependencies / Blocked By (other Slices or external):**  
- Slice 1 helpful for clean state but not blocker. Can run in parallel with AI slice.

**Out of Scope for This Slice (focus enforcement):**  
- Adding real geo SVG paths (CSS relative is the design), 3D, or new dishes beyond fixing visibility/wiring.

**Risks & Open Questions (surface now):**  
- CSS var leakage across deploys (index.css may have been partially overwritten in prior fixes). Mitigate by in-component <style> injection for critical colors + explicit fallbacks.
- Performance of many absolutely positioned pins (small — already 36).

**Estimated Size:** Small-Medium (high confidence). Focused on the one visual component + minimal CSS.

**Review Requirements:**  
- Two-stage (spec compliance on "visible interactive map" + quality of animations/UX).
- Special: visual regression on different viewports + dark theme contrast.
- HITL: Strong — user must confirm "now I see the SVG and pins, not just text".

**Suggested Primitives / Skills for Execution:**  
- Reference the exact local `.../Build HomeChef AI/src/components/IndianThaliMap.jsx` + styles object.
- TDD the interaction (click handlers) if easy assertions possible.
- Evidence: before/after visual + console (no errors on open).

---

## Slice 3: Harden Puter REST AI + guarantee Nani always gives useful (archetype-aware) step-by-step or high-quality fallback; add status + clear-cache controls (fix "no AI connected")

**Goal / User Value (one sentence, user's perspective):**  
When I ask Nani "Bajre ki Khichdi" traditional recipe (or any dish via map or chat), she replies with warm Hinglish step-by-step (real Puter or excellent local KB). The response respects my chosen Culinary Archetype (biohacker low-GI version, cognitive high-protein, standard traditional). I see an AI status indicator and a "Force Reconnect / Clear AI Cache" button instead of always seeing the "Main abhi offline mode me..." message.

**Why this Slice now (context / prerequisite alignment):**  
The most dangerous reported issue. puterAI.js (REST) + queryAI is present and wired in AIChatPlanner (with good archetype injection + Nani persona + local DB context). But calls are failing → always KB fallback (the exact quoted offline text lives in getLocalFallbackChat). Prior "fixes" in commit history tried SDK bypass + direct REST. Need diagnostics, script load guard, visible status, richer KB (esp. the Haryana example + archetype variants), and error path that still produces useful output.

**Files Changed (exact paths + nature):**
- `src/utils/puterAI.js` (modify — add script-ready detection + init guard before fetch; export getAIStatus() or similar; expose clearCache(); more logging + timeout; graceful anonymous guest handling; perhaps try a tiny test ping)
- `src/utils/offlineKnowledgeBase.js` (modify — implement/enhance getLocalFallbackChat (and recipe) to return warm Hinglish, include exact Bajre ki Khichdi steps for Haryana, make archetype-aware where simple string transform or variant recipes possible; keep other regions)
- `src/components/AIChatPlanner.jsx` (modify — use status from puterAI; render small "AI: Puter guest ✓ | cached | offline KB (tap to reconnect)" badge + button that calls clear + retries; ensure archetype is passed/used on every message; improve error fallback to use the new rich KB)
- `src/components/SettingsPanel.jsx` or a new small AIStatus component (add the reconnect control + current family/archetype reminder)
- `docs/evidence/slice-3-ai-*.log` (new)

**Precise Behavior Being Added/Changed (Interface contract):**
- On chat send: queryAI is attempted; success → real response (cached or fresh from Puter REST). Failure after retries → rich KB fallback that is still useful, formatted, and (best-effort) archetype-transformed.
- UI always shows AI health (no silent always-offline).
- "Force Reconnect / Clear AI Cache" clears the 24h localStorage cache for AI + attempts a test query (or just next message) and updates status.
- The exact user prompt "Nani, mujhe "Bajre ki Khichdi" ..." produces step-by-step (real or KB) mentioning butter/lassi or appropriate archetype adaptation.
- Archetype from profile is injected on *every* Nani response (already mostly there — make robust).

**Verification Gate (required — makes the Slice valid):**
**Automated:** None.

**Manual / Integration (if applicable):**
- Load app (any profile/archetype) → open AI Chat → send the Bajre prompt (or trigger from map Haryana "Cook!").
- Observe: Either real Puter response or rich fallback with steps; not the short "offline mode" generic. Status badge visible.
- Toggle archetype in Settings → new or re-asked prompt shows transformed language (e.g. biohacker mentions low-GI/adaptogenic or ragi notes).
- Click "Clear AI Cache / Reconnect" → cache cleared (log), next call attempts fresh.
- In console: clear "PuterAI Cache Hit", "calling REST", success or "falling back", no uncaught errors.
- Offline simulation (if possible): still gets good KB answer.

**Rollback / Safety:**  
- All fallbacks are additive (richer KB); original queryAI path untouched except guards.

**Acceptance Criteria (from plan or issue):**
- [ ] Nani no longer *always* says the quoted offline paragraph.
- [ ] Bajre ki Khichdi (and at least one other) gets step-by-step reply.
- [ ] Archetype visibly affects at least one generated response.
- [ ] Status + manual reconnect control present and functional.
- [ ] Cache clear actually forces new attempt.

**Dependencies / Blocked By (other Slices or external):**  
- Benefits from Slice 2 (map trigger) and Slice 1 (clean profile), but can be independent.

**Out of Scope for This Slice (focus enforcement):**  
- Switching to a completely different LLM provider, adding Supabase, or voice.

**Risks & Open Questions (surface now):**  
- Puter anonymous/guest quota or endpoint may be unreliable in 2026 Vercel deploys (CORS, rate, policy). Mitigate with excellent KB + status + "Hermes Local" option (later slice or this if endpoint known) + docs "sign into Puter in another tab for better limits".
- Exact getLocalFallbackChat text must be located and upgraded (read showed recipes; function likely lower in file).

**Estimated Size:** Medium (the core dangerous bug). One or two focused sessions.

**Review Requirements:**  
- Two-stage + evidence of the exact user query succeeding.
- Special: archetype transformation + no silent failure.
- HITL: Yes (user tests the prompt on their setup + deployed later).

**Suggested Primitives / Skills for Execution:**  
- Reference local Build + v3 puterAI.js variants.
- Enrich KB from map THALI_DATA + known good recipes.
- Use contracts for handoff of the "AI health" interface.

---

(Additional slices abbreviated here for the initial document; expand in execution as needed per plan: Slice 4 Archetype UI polish + end-to-end transform evidence; Slice 5 Content/Kolkata/Haryana authenticity + Nani voice examples; Slice 6 Polish (badges, Home integration, PWA, full flows, CSS consistency); Slice 7 Deploy & Release (git, vercel, post-deploy verify of all 4 bugs + archetypes + map + Nani on prod URL). Each will follow the identical schema.)

**Overall Process Reminders (from approved plan):**
- Write/update slices before bulk edits.
- Dispatch specialists (Map, AI/Puter, State, Archetype, Content/Nani, Polish, Deploy) via subagents or structured parallel work using the orchestration contracts.
- Engage Hermes (launch .lnk, feed slices for review).
- Every slice: Evidence, two-stage review (rubric), handoff, contribute to final scorer.
- End with push + vercel --prod + live verification + README + artifacts.
- Use the 7 principles, evidence over claims, self-audit.

*This document is the living Vertical Slice contract. Update with actual file SHAs or new slices as work progresses. Reference full approved plan.md for context, risks, Hermes details, and verification list.*
