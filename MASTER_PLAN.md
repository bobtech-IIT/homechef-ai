# 🍛 HomeChef AI v2 — Master Bullet-Proof Plan
**Document Version:** 1.0  
**Authored by:** Agent B (Master Strategist)  
**Date:** 2026-05-30  
**Status:** AWAITING CREATOR APPROVAL — No code to be written until approved

---

> [!IMPORTANT]
> This is a READ-ONLY planning document. Zero application code is written until the Creator signs off on Section 7: Approval Checklist. Every agent must treat this document as the single source of truth.

---

## SECTION 1: VISION STATEMENT

### What HomeChef AI v2 Is

HomeChef AI v2 is a **premium, AI-powered Indian home cooking companion PWA** — the digital embodiment of the wise grandmother who knows every family's taste, every region's tradition, and every ingredient in the pantry. It moves beyond a simple meal planner into a **personalized culinary intelligence platform** that learns, adapts, remembers, and delights.

> *"Khana sirf pet bhrne ke liye nahi hota — yeh ek emotion hai."*  
> (Food isn't just for hunger — it's an emotion.)

### Who It's For

| Segment | Description | Size (India) |
|---|---|---|
| **Primary** | Indian homemakers (25–55), responsible for daily family meals | ~180M households |
| **Secondary** | Working professionals seeking structured weekly meal plans | ~40M urban users |
| **Tertiary** | NRI (Non-Resident Indians) missing desi home food | ~35M global diaspora |
| **Emerging** | Health-conscious Gen Z learning to cook independently | ~25M |

**Total Addressable Market:** 300M+ Indian households globally. Even 0.1% penetration = 300,000 DAU.

### Why HomeChef AI v2 Will Win

1. **Hyper-personalization at zero cost** — Puter.js serverless AI means no API bills, no rate limit anxiety. Competitors pay $0.002/call; we pay $0.
2. **Cultural authenticity** — The only app in market with region-specific, diet-specific, occasion-specific meal intelligence built natively (Jain lock, Gujarati Veg lock, Ramadan mode already exist in v1).
3. **Offline-first PWA** — Works in low-connectivity areas (tier 2/3 cities), installs like a native app, deployable to Play Store via TWA.
4. **Grandmother's Recipe Vault** — Heirloom recipes that cannot be Googled. Authentic, tested, deeply emotional content moat.
5. **Reinforcement Learning** — The app gets smarter with every interaction, creating a loyalty flywheel no static app can replicate.
6. **Zero vendor lock-in** — React + Vite + Puter.js = portable, deployable anywhere, forking-resistant.

---

## SECTION 2: AGENT RESPONSIBILITY MATRIX

> [!IMPORTANT]
> These boundaries are absolute. If two agents' tasks could touch the same file, Agent B arbitrates. No agent modifies another agent's designated files.

### Agent A — UI/UX Designer (Frontend Visual Layer)

**Owns:** All `.css` files, visual design tokens, component layout, animation/transition code, typography, color system, icon choices.

| Task | Deliverable | Priority |
|---|---|---|
| Audit v1 UI pain points | Written UX audit report | P0 |
| Design v2 Design System | `DESIGN.md` with tokens, palette, fonts, spacing | P0 |
| Redesign Splash + Onboarding | Premium, investor-pitch animated screens | P0 |
| Redesign SetupWizard | 5-step wizard (add Cuisine Browser + Occasion expansion) | P0 |
| Redesign HomeDashboard | Card-based, glassmorphism-ready, Recipe of the Day hero | P0 |
| Redesign WeeklyPlanner | Horizontal scroll calendar, drag-hint affordances | P1 |
| Redesign AIChatPlanner | Chat bubbles with typing indicators, streaming text | P1 |
| Design Food Category Browser | Grid of cuisine cards with flag + illustration | P1 |
| Design Grandmother's Recipe Modal | Warm, parchment-style recipe detail view | P1 |
| Design Notification banners | In-app toast + push notification templates | P2 |
| Design InventoryManager | Categorized pantry with expiry warning badges | P2 |
| Design SettingsPanel | Preference management, language toggle | P2 |
| PWA Install prompt UI | Custom install banner (replaces browser default) | P2 |

**Does NOT touch:** App logic, AI calls, data structures, routing, state management, Puter.js integration.

---

### Agent B — Master Strategist & Gatekeeper (This Agent)

**Owns:** Architecture decisions, inter-agent coordination, token management strategy, this MASTER_PLAN.md, quality review.

| Task | Deliverable | When |
|---|---|---|
| Produce MASTER_PLAN.md | This document | DONE |
| Token management module design | TOKEN_STRATEGY.md spec | Before Agent C starts AI calls |
| Review Agent A's DESIGN.md | Approve/reject design system before implementation | After Agent A delivers |
| Review Agent C's data schemas | Approve/reject DB schema before Agent C builds | After Agent C designs |
| Bridge conflict resolution | Written arbitration notes | As needed |
| Innovation features specification | Detailed spec for each Agent B innovation | Phase 1 |
| Quality gate: pre-launch checklist | Final sign-off before Vercel deployment | End of Phase 1 |

**Does NOT touch:** Any .jsx, .css, .js application files directly.

---

### Agent C — Backend Engineer (Logic, Data, AI)

**Owns:** All application logic in .jsx/.js, Puter.js integration, data layer, recommendation engine, API integrations.

| Task | Deliverable | Priority |
|---|---|---|
| Puter.js wrapper module | src/utils/puterAI.js — queuing, caching, retry | P0 |
| Port v1 data to v2 | Migrate CulinaryKnowledgeBase.js + RecipeIndex.js | P0 |
| Expand regional palates | Add "Rest of India" — Rajasthan, Odisha, Northeast, UP, Kerala | P0 |
| Grandmother's Recipe DB | src/data/GrandmotherRecipes.js — 50+ heirloom recipes | P0 |
| Recipe of the Day engine | Date-seeded deterministic picker with seasonal awareness | P0 |
| Food Category Browser data | International cuisines JSON (Italian, Mexican, Thai, etc.) | P1 |
| RL Recommendation engine | src/utils/rlEngine.js using TF.js lite | P1 |
| Supabase integration | Free tier — user profiles, feedback, heirloom submissions | P1 |
| App state management refactor | Context API + useReducer (replace prop drilling in v1) | P1 |
| Smarter AI prompts | Upgraded system prompts for GPT-4o with persona | P1 |
| Weekly planner logic | Retain v1 seeding engine, extend for new palates | P1 |
| Inventory logic | Expiry tracking + shopping list generation | P2 |
| Service Worker logic | Offline caching strategy, background sync | P2 |
| Push Notification backend | Web Push API integration | P2 |

**Does NOT touch:** CSS files, visual styling, color decisions, font choices, layout decisions.

---

### Shared Conventions (All Agents Must Follow)

- **File naming:** PascalCase for components, camelCase for utils, SCREAMING_SNAKE for constants.
- **New project path:** c:\Users\babuc\Downloads\Google AI Studio Files\HomeChef AI v2\
- **No inline styles in new components** — Agent A provides CSS classes/variables; Agent C uses them.
- **All AI calls go through** src/utils/puterAI.js — never call puter.ai.chat() directly in components.
- **Git commits:** Each agent commits with prefix [AgentA], [AgentB], [AgentC].

---

## SECTION 3: AGENT B INNOVATIONS

> These are 8 features the Creator has NOT mentioned. Each is investor-grade and creates defensible competitive moat.

### Innovation 1: Mood-to-Meal Engine (Emotional AI)

**What:** User taps a mood wheel (energetic / tired / celebratory / comforting / detox) and the AI suggests meals that match the emotional state AND the regional palate.

**Why investors love it:** First-of-its-kind emotional food intelligence in the Indian market. Ties neuroscience (emotional eating patterns) to AI.

**Implementation:** 
- Mood wheel UI component (Agent A)
- Puter.js prompt injection: "Family mood: [tired]. Regional palate: [Punjab]. Suggest 3 comfort dinner ideas that require <20 minutes and minimal ingredients." (Agent C)
- Store mood-to-meal click history in RL engine for personalization flywheel.

**Effort:** Medium. No external API needed.

---

### Innovation 2: Voice Rasoi Mode (Hands-Free Cooking)

**What:** While cooking, user can say "next step" / "repeat" / "how much salt?" and the app responds via Web Speech API (browser-native, no cost). The AI reads recipe steps aloud.

**Why investors love it:** Addresses a real pain point — hands are floury, phone screen can't be touched. Solves the "cook-while-reading" UX failure of every existing app.

**Implementation:**
- SpeechRecognition Web API (no cost, browser-native)
- SpeechSynthesis Web API for text-to-speech readback
- "Rasoi Mode" button on recipe detail screen
- Works fully offline (no AI call needed during cooking)

**Effort:** Low-Medium. Pure browser APIs.

---

### Innovation 3: Ingredient Expiry Intelligence (Zero-Waste Kitchen)

**What:** User logs pantry items with purchase dates. App predicts expiry using a simple rule engine (coriander=3 days, onions=14 days, etc.) and proactively suggests "use before it spoils" recipes.

**Why investors love it:** Food waste is a Rs. 92,000 crore problem in India annually. This feature solves a real household economic pain point.

**Implementation:**
- Extend InventoryManager.jsx with purchaseDate + estimatedExpiry fields
- Expiry rule table in src/data/ingredientExpiry.js — 100 common Indian ingredients
- Dashboard widget: "Use soon: Coriander, Tomatoes"
- Smart prompt: "I have coriander expiring in 2 days. Suggest 2 quick recipes using it."

**Effort:** Medium. No AI needed for expiry prediction (rule-based).

---

### Innovation 4: Community Heirloom Recipe Vault (Content Moat)

**What:** Users can submit their family's secret/heirloom recipe. Submitted recipes go through AI-assisted quality check (Puter.js), get tagged by region/diet, and published to a public "Vault." Contributor gets "Dadi's Kitchen" badge.

**Why investors love it:** User-generated content (UGC) that is culturally irreplaceable. Recipes that cannot be found on Google. Creates a defensible content moat. Network effect — more users = more recipes = more users.

**Implementation:**
- Recipe submission form (Agent A designs, Agent C implements)
- Supabase free tier: heirloom_recipes table with status: pending/approved/featured
- AI quality check prompt: "Rate this recipe submission for authenticity and completeness 1-10."
- MVP: Manual creator curation. Phase 2: AI auto-approve above score 8.

**Effort:** Medium. Requires Supabase setup (free tier).

---

### Innovation 5: Nutrition Fingerprinting (Health Layer)

**What:** Every meal plan generated gets a visual "nutrition fingerprint" — a radar/spider chart showing Protein / Carbs / Fiber / Fat / Iron levels for the week. Not calorie-counting (too clinical), but a visual health story.

**Why investors love it:** Health-conscious segment is India's fastest growing demographic. Adds "wellness" positioning that attracts premium users and advertisers.

**Implementation:**
- src/data/nutritionIndex.js — macros for 200 common Indian dishes (estimated, not clinical)
- Radar chart using Canvas API (no chart library needed)
- Weekly summary: "This week: High in Protein, Low in Fiber. Suggestion: Add a sabzi on Thursday."

**Effort:** Medium. Canvas API chart + static nutrition data file.

---

### Innovation 6: Smart Shopping List — WhatsApp Forward

**What:** The weekly planner auto-generates a shopping list of missing ingredients. User taps "Share to WhatsApp" and it sends a perfectly formatted grocery list to the family's WhatsApp group.

**Why investors love it:** Viral growth loop. Every shared shopping list is a HomeChef AI brand impression to new potential users. WhatsApp is 99% penetration in India.

**Implementation:**
- whatsapp://send?text= deep link (zero cost, works instantly)
- Format: "HomeChef AI - Sharma Family Weekly Grocery List - Onions 1kg, Tomatoes 500g..."
- Agent C generates list from weekly planner's ingredientStatus data

**Effort:** Low. Just a formatted URL deep link.

---

### Innovation 7: Micro-Festival Calendar Engine (Cultural Intelligence)

**What:** The app is aware of the Indian festival calendar. On Navratri, it auto-switches fasting-mode recipes. On Eid, it suggests biryani and sewai. On Makar Sankranti, til-gur recipes. Completely automatic.

**Why investors love it:** Demonstrates genuine cultural intelligence. No competitor does this automatically. Makes the app feel alive and emotionally resonant.

**Implementation:**
- src/data/festivalCalendar.js — 40+ festivals with dates (recurring annual logic)
- getFestivalContext(today) utility returns active festival if any
- Inject festival context into: Recipe of Day picker, AI chat system prompt, Weekly planner seeder

**Effort:** Low. Pure data + date math, no API calls.

---

### Innovation 8: Dual-Mode Monetization Architecture (Future-Proof Revenue)

**What:** Build the revenue infrastructure from day 1, even if not activated in Phase 1.

**Mode A — HomeChef Pro (Rs. 99/month subscription):**
- Unlimited AI chat (free tier: 10 chats/day)
- Heirloom recipe submission priority review
- Nutrition fingerprinting detailed report
- Family meal history analytics (6 months)

**Mode B — Hyperlocal Grocery API (B2B):**
- Partner with Zepto/Blinkit/Swiggy Instamart APIs
- User taps "Order missing items" → redirects to grocery app with pre-filled cart
- Revenue: Affiliate commission per order (Rs. 5-20/order)

**Implementation (Phase 2):** Stripe/Razorpay integration, feature flags in src/utils/featureFlags.js

**Effort (Phase 2):** High. Architecture hooks built in Phase 1, activation in Phase 2.

---

## SECTION 4: TECHNICAL ARCHITECTURE

### 4.1 — React Component Hierarchy (v2)

```
App.jsx (Root State Orchestrator)
|-- SplashScreen           [Agent A redesign — animated logo reveal]
|-- TOSModal               [Agent A - retain, polish]
|-- OnboardingFlow         [Agent A redesign — swipeable stories format]
|   |-- SetupWizard        [5 steps: Family Size, Regional Palate, Diet, Occasions, Cuisine Interests]
|-- MainLayout             [Persistent shell]
|   |-- TopBar             [Logo, family name, notification bell]
|   |-- BottomNav          [5 tabs: Home, Planner, Chat, Pantry, Explore]
|   |-- PageRouter         [Active page renderer]
|       |-- HomeDashboard  [P0 — redesigned hero]
|       |   |-- RecipeOfDay          [New — hero card]
|       |   |-- MoodWheel            [Innovation 1]
|       |   |-- FestivalBanner       [Innovation 7]
|       |   |-- QuickMealCards       [3 personalized suggestions]
|       |   |-- NutritionWeekPreview [Innovation 5 — mini radar]
|       |-- WeeklyPlanner  [P1 — horizontal scroll calendar]
|       |   |-- DayColumn
|       |   |-- MealSlot
|       |   |-- ShoppingListDrawer   [Innovation 6]
|       |-- AIChatPlanner  [P1 — streaming responses]
|       |   |-- ChatBubble
|       |   |-- TypingIndicator
|       |   |-- VoiceRasoiButton     [Innovation 2]
|       |-- InventoryManager [P2 — pantry with expiry]
|       |   |-- PantryItem
|       |   |-- ExpiryBadge          [Innovation 3]
|       |   |-- UseBeforeBanner
|       |-- ExplorePage    [NEW — Food Category Browser]
|           |-- CuisineGrid          [Indian regions + International]
|           |-- GrandmotherVault     [Innovation 4]
|           |-- RecipeDetailModal    [Full recipe view + Voice Mode]
|-- SettingsPanel          [Profile, preferences, language]
```

---

### 4.2 — Puter.js Integration Strategy & Token Management

> [!WARNING]
> Puter.js is free but rate-limited per session. A blank screen from API exhaustion is unacceptable. The following strategy makes this bulletproof.

**The puterAI.js Wrapper Module (Agent C must build this FIRST):**

Conceptual design (not production code — Agent C implements):
```
REQUEST_QUEUE = []                    // Queue for pending requests
RESPONSE_CACHE = Map()               // In-memory cache (cleared on page reload)
PERSISTENT_CACHE_KEY = 'hcai_ai_cache'  // localStorage key (survives reload)
MAX_CACHE_AGE = 24 hours
MAX_RETRIES = 3
RETRY_DELAY = 2000ms with exponential backoff
```

**5-Layer Fallback Strategy:**

| Layer | Trigger | Action | User Experience |
|---|---|---|---|
| 1 | Cache hit (< 24h old) | Return cached response instantly | Instant |
| 2 | Puter available, no cache | Make API call normally | Normal |
| 3 | Puter rate limited | Wait 2s, retry (max 3x) | "Thinking..." |
| 4 | Puter unavailable | Queue request, notify user | "Will respond shortly" |
| 5 | All failed | Return from local KnowledgeBase | Offline fallback |

**Cache Key Design:**
```
cache_key = hash(prompt_text + user_palate + user_diet + date_YYYY-MM-DD)
```

**Request Prioritization Queue:**
- Priority 1: Recipe of the Day (load at app start, critical path)
- Priority 2: Chat responses (user is actively waiting)
- Priority 3: Weekly planner suggestions (load async after render)
- Priority 4: Heirloom recipe quality check (background, non-blocking)

**AI Model Selection Strategy:**
- Quick chat / meal ideas: gpt-4o-mini (faster quota, lower latency)
- Complex analysis (nutrition, recipe generation): gpt-4o
- Image generation (Phase 2): puter.ai.txt2img

---

### 4.3 — Database Strategy: Supabase Free Tier

**Why Supabase (over Firebase / PocketBase):**
- 500MB storage free forever
- 50,000 monthly active users free
- PostgreSQL with Row Level Security
- Built-in Auth (enables Phase 2 Pro subscriptions without new infra)
- Real-time subscriptions for future multiplayer features

**Schema Design:**

```sql
-- User Profiles (supplements localStorage)
user_profiles (
  id UUID PRIMARY KEY,
  family_name TEXT,
  regional_palate TEXT,
  dietary_preference TEXT,
  family_size TEXT,
  special_occasions TEXT[],
  cuisine_interests TEXT[],
  created_at TIMESTAMPTZ,
  last_active TIMESTAMPTZ
)

-- Heirloom Recipe Submissions (Innovation 4)
heirloom_recipes (
  id UUID PRIMARY KEY,
  submitter_family TEXT,
  recipe_name TEXT,
  region TEXT,
  diet_type TEXT,
  ingredients JSONB,
  steps JSONB,
  story TEXT,
  ai_quality_score FLOAT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMPTZ
)

-- RL Feedback Signals (for recommendation engine)
user_interactions (
  id UUID PRIMARY KEY,
  session_id TEXT,
  recipe_id TEXT,
  action TEXT,    -- 'liked' | 'cooked' | 'skipped' | 'shared'
  mood_context TEXT,
  timestamp TIMESTAMPTZ
)

-- Recipe of the Day History (prevent repeats)
rotd_history (
  id UUID PRIMARY KEY,
  recipe_id TEXT,
  shown_date DATE,
  region TEXT,
  diet TEXT
)
```

**Local-first Strategy:** All user preferences and weekly meal plan stored in localStorage first. Supabase sync is non-blocking — app works 100% offline.

---

### 4.4 — Reinforcement Learning Recommendation Engine

**Library:** TensorFlow.js Lite (lazy-loaded, ~140KB gzipped)
**Algorithm:** Contextual Multi-Armed Bandit (simpler than full RL, perfect for browser)

**State (Context Vector):**
- user_palate: one-hot encoded (12 regions)
- user_diet: one-hot (3 types)
- time_of_day: one-hot (breakfast/lunch/snack/dinner)
- day_of_week: 0-6 normalized
- recent_mood: one-hot (5 moods)
- season: one-hot (4 seasons)

**Reward Signals:**
- +1.0: User taps "I Cooked This"
- +0.5: User opens recipe detail
- +0.3: User saves to favorites
- -0.5: User swipes away / skips
- -0.3: User replaces meal in planner

**Learning:**
- Epsilon-greedy exploration (epsilon=0.2 initially, decay to 0.05)
- Model weights stored in localStorage (JSON serialized)
- Online learning — updates after each reward signal
- No server needed — fully client-side

**Fallback:** If TF.js fails to load (offline/slow), fall back to deterministic seeding engine (v1 logic preserved).

---

### 4.5 — PWA Service Worker Strategy (Offline-First)

**Cache Strategy by Resource Type:**

| Resource Type | Strategy | Cache Duration |
|---|---|---|
| App Shell (HTML/CSS/JS) | Cache-First | Until new deploy |
| Google Fonts | Cache-First | 1 year |
| Recipe thumbnails | Stale-While-Revalidate | 7 days |
| AI responses | Cache-First (via puterAI.js) | 24 hours |
| Puter.js script | Network-First with cache fallback | 1 hour |
| Supabase API calls | Network-First | No cache |

**Offline Capabilities:**
- WORKS offline: View weekly meal plan, browse local recipe DB, view cached AI responses, update inventory, Voice Rasoi mode
- QUEUED offline: New AI chat requests (delivered when online via Background Sync)
- NOT available offline: Heirloom vault submissions, Supabase sync

**Background Sync:** Use BackgroundSync API to flush pending AI requests when connection returns.

---

### 4.6 — Deployment Architecture

**New Vercel Project (SEPARATE from v1 live app):**
```
Project Name: homechef-ai-v2
Production URL: https://homechef-ai-v2.vercel.app
Branch strategy: main -> auto-deploy | feature/* -> preview URLs
```

**Environment Variables (Vercel Dashboard):**
```
VITE_SUPABASE_URL=https://[project-ref].supabase.co
VITE_SUPABASE_ANON_KEY=[public-anon-key]
VITE_APP_VERSION=2.0.0
VITE_ENABLE_RL_ENGINE=true
VITE_ENABLE_VOICE_MODE=true
VITE_ENABLE_HEIRLOOM_VAULT=true
```

**New npm Dependencies for v2:**
```json
{
  "@supabase/supabase-js": "^2.x",
  "@tensorflow/tfjs": "^4.x",
  "vite-plugin-pwa": "^0.x",
  "workbox-window": "^7.x"
}
```

---

## SECTION 5: FEATURE ROADMAP

### Phase 1: v2 Launch (Weeks 1–8)

**Goal:** Ship a production-ready, investor-demoable v2 with 10x better UX than v1.

| Week | Agent A | Agent C | Agent B |
|---|---|---|---|
| 1 | UX Audit + Design System (DESIGN.md) | puterAI.js wrapper + token strategy | Review DESIGN.md, approve |
| 2 | Redesign Splash + Onboarding | Port v1 data, expand regional palates | Review schemas |
| 3 | Redesign SetupWizard (5 steps) | Grandmother's Recipe DB (50 recipes) | Approve data structure |
| 4 | Redesign HomeDashboard | Recipe of the Day engine + Festival Calendar | Quality gate review |
| 5 | Redesign WeeklyPlanner | RL Engine foundation + Context API refactor | Mid-point audit |
| 6 | Redesign AIChatPlanner + Voice Mode UI | Smarter AI prompts + streaming | Integration testing |
| 7 | Food Category Browser + Explore tab | Supabase integration + Shopping list | Integration bridge |
| 8 | Polish, animations, PWA install UI | Service Worker + offline testing | Final QA + Vercel deploy |

**Phase 1 Launch KPIs:**
- App loads in < 2 seconds (Lighthouse Performance > 90)
- PWA installable (Lighthouse PWA score = 100)
- Works offline for all core features
- 5 regional palates (v1) → 11 regional palates (v2)
- 10 components (v1) → 22+ components (v2)
- Zero blank-screen AI failures

---

### Phase 2: Monetization (Weeks 9–20)

| Feature | Revenue Model | Effort |
|---|---|---|
| HomeChef Pro subscription (Rs. 99/mo) | Recurring subscription | High |
| Razorpay integration | Payment gateway | Medium |
| Grocery affiliate links (Zepto/Blinkit) | Rs. 5-20 per order commission | Medium |
| Heirloom Recipe Vault public SEO page | Organic traffic + ad revenue | Low |
| WhatsApp Business API notifications | User engagement + retention | Medium |
| Google Play Store listing (TWA via Bubblewrap) | App store distribution | Medium |

---

### Phase 3: Scale (Weeks 21+)

| Feature | Strategic Value |
|---|---|
| Regional language UI (Hindi, Gujarati, Bengali) | 10x TAM expansion |
| Smart Home device integration (Alexa, Google Home) | Premium positioning |
| Nutritionist AI persona (named "Pooja Di") | Trust, retention, media coverage |
| Video recipe library (YouTube API integration) | Content moat |
| HomeChef AI for Restaurants (B2B SaaS) | Enterprise revenue stream |
| White-label platform licensing | Investor exit potential |

---

## SECTION 6: RISK REGISTER

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Puter.js rate limiting causes blank AI responses | High | Critical | 5-layer fallback in puterAI.js. Local KB always available as last resort. |
| R2 | Puter.js API changes break integration | Medium | Critical | Abstract ALL Puter calls behind puterAI.js. One file to update if API changes. |
| R3 | TF.js bundle size (140KB) harms Lighthouse score | Medium | High | Lazy-load TF.js only after user has 5+ interactions. Never blocks initial render. |
| R4 | Supabase free tier quota exceeded (500MB) | Low | Medium | All critical features work offline via localStorage. Supabase is enhancement only. |
| R5 | Service Worker caching stale content post-deploy | Medium | Medium | Cache-bust on deploy using VITE_APP_VERSION injected at build time. |
| R6 | CulinaryKnowledgeBase.js (204KB) slow JS parse | Medium | High | Pre-parse and index at app init. Lazy-load by region. Web Worker for parsing. |
| R7 | Agent A and C conflict on component props/interfaces | Medium | High | Agent B defines shared TypeDefs/PropTypes spec before implementation. |
| R8 | Voice API not supported on all Android browsers | High | Low | Feature-detect: show Voice Mode only if SpeechRecognition in window. Graceful hide. |
| R9 | Play Store TWA digital asset link failure | Low | Medium | Phase 2 concern. Use v1 TWA learnings. Preserve .well-known/assetlinks.json in v2. |

---

## SECTION 7: APPROVAL CHECKLIST

> [!CAUTION]
> NO CODE MAY BE WRITTEN UNTIL THE CREATOR APPROVES ALL ITEMS BELOW.
> Agent A and Agent C are in standby until this checklist is signed off.

The Creator must explicitly mark each item APPROVED or REQUEST CHANGES:

**VISION**
- [ ] A1: Vision Statement — target audience and market size
- [ ] A2: "Grandmother's Kitchen AI" positioning

**AGENT ROLES**
- [ ] B1: Agent A owns ALL CSS/visual — Agent C touches zero styling
- [ ] B2: Agent B is quality gatekeeper at all milestones
- [ ] B3: Agent C builds puterAI.js wrapper FIRST before any AI feature

**INNOVATIONS (approve each to build)**
- [ ] C1: Innovation 1 — Mood-to-Meal Engine
- [ ] C2: Innovation 2 — Voice Rasoi Mode
- [ ] C3: Innovation 3 — Ingredient Expiry Intelligence
- [ ] C4: Innovation 4 — Community Heirloom Recipe Vault
- [ ] C5: Innovation 5 — Nutrition Fingerprinting
- [ ] C6: Innovation 6 — WhatsApp Shopping List Share
- [ ] C7: Innovation 7 — Micro-Festival Calendar Engine
- [ ] C8: Innovation 8 — Dual-Mode Monetization (Phase 2)

**TECH STACK**
- [ ] D1: Supabase free tier as database
- [ ] D2: TF.js Contextual Bandit for RL engine
- [ ] D3: New Vercel project (separate from v1 live app)
- [ ] D4: vite-plugin-pwa for Service Worker

**ROADMAP**
- [ ] E1: Phase 1 = 8 weeks scope (as listed above)
- [ ] E2: Phase 2 monetization (Pro Rs. 99/mo + grocery affiliate)

---

## APPENDIX: CODEBASE AUDIT SUMMARY (v1)

*What Agent B found during the READ phase — informing v2 architecture decisions.*

| Component | Size | Key Observations |
|---|---|---|
| App.jsx | 103KB / 1546 lines | Monolithic — meal seeder logic (lines 42-580) must be extracted to src/utils/mealSeeder.js in v2 |
| AIChatPlanner.jsx | 56KB | Largest component — likely has direct puter.ai.chat() calls needing wrapper |
| WeeklyPlanner.jsx | 48KB | Second largest — complex state, prime candidate for Context API |
| CulinaryKnowledgeBase.js | 204KB | Massive — needs lazy loading by region in v2 to avoid parse blocking |
| RecipeIndex.js | 86KB | Large — needs indexing/search optimization |
| SetupWizard.jsx | 16KB / 404 lines | Well-structured 4-step wizard. v2 expands to 5 steps. |
| **Total data layer** | **~290KB** | Will parse-block main thread. Must be chunked/web-worker-ized. |

**Critical v1 Issues Fixed in v2:**
1. App.jsx mega-component (1546 lines) → split into 22+ focused components
2. Meal seeding logic → extracted to src/utils/mealSeeder.js
3. Direct prop drilling → Context API + useReducer
4. No error boundaries → ErrorBoundary wrapper on all route components
5. Direct puter.ai calls → all go through src/utils/puterAI.js

---

*Document Version 1.0 — Prepared by Agent B*  
*Next Action: Creator reviews and approves/modifies Section 7 checklist*  
*Then: Agent A starts DESIGN.md | Agent C starts puterAI.js wrapper*
