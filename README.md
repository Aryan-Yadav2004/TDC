# The Date Crew (TDC) – Matchmaker Algo & Dashboard MVP

> **India's #1 Matchmakers for Relationship-Ready Professionals**  
> Internal Matchmaker Studio, Gender-Specific Matching Algorithm, and AI Concierge Pitch Engine.

Built for **The Date Crew (TDC)** to empower matchmakers to manage vetted clients, track pipeline journeys, run multi-dimensional compatibility algorithms, and dispatch bespoke introductions.

---

## 💎 1. Visual Identity & Design System Alignment

In strict alignment with [thedatecrew.com](https://www.thedatecrew.com/), this platform avoids generic "AI template" aesthetics (e.g., standard bootstrap or neon gradients). Instead, it adopts a **bespoke, handcrafted, luxury editorial aesthetic**:

- **Heritage Deep Forest Green**: `#0a1f18`, `#142e24`, `#1b3a2f`, `#244c3c`, `#065f4e` with subtle `#386058` inner highlights.
- **Warm Champagne & Brass Gold**: `#c9913e`, `#b5892a`, `#e5c38c`, `#fbf6ec` with delicate gold border accents (`rgba(201, 145, 62, 0.3)`).
- **Alabaster & Warm Ivory Canvas**: `#faf8f4`, `#f5f0e8`, `#ffffff` providing a soft, high-trust reading environment.
- **Editorial Typography**: 
  - **Headings & Brand Statements**: `Lora` (Classic Editorial Serif).
  - **Matchmaker Data & Metrics**: `Inter Tight` / `Plus Jakarta Sans` (Crisp Modern Sans-Serif).
- **Micro-Interactions**: Custom pill buttons with dual-gradient shadows, subtle hover elevation, interactive stepper transitions, and celebration animations (`canvas-confetti`).

---

## 🏛️ 2. DBMS Architecture & Prime Query Optimization

The database architecture adheres to strict **relational DBMS principles** (1NF, 2NF, 3NF), entity integrity, and foreign key cascades.

```
┌─────────────────────────┐
│       matchmakers       │
│  (id, name, email, ...) │
└────────────┬────────────┘
             │ 1:N
             ▼
┌─────────────────────────┐       1:N       ┌────────────────────────┐
│         clients         ├────────────────►│    client_languages    │ (1NF)
│  (120+ Vetted Profiles) ├────────────────►│    client_interests    │ (1NF)
└────────────┬────────────┘       1:N       └────────────────────────┘
             │ 1:N
             ├─────────────────────────────►┌────────────────────────┐
             │                              │      client_notes      │ (Timeline)
             ▼                              └────────────────────────┘
┌─────────────────────────┐
│    match_assignments    │ (Unique Pairings & Computed Fit Scores)
└────────────┬────────────┘
             │ 1:1
             ▼
┌─────────────────────────┐
│      match_pitches      │ (Curated AI Intro Email Drafts)
└─────────────────────────┘
```

### Covering Indexes for Optimal Query Performance:
1. `idx_clients_gender_verified`: Indexed on `(gender, is_verified)` for millisecond lookups of the candidate pool.
2. `idx_clients_matchmaker`: Speeds up customer retrieval for the active matchmaker.
3. `idx_clients_journey_stage`: Accelerates pipeline filtering.
4. `idx_clients_city` & `idx_clients_income`: Instant range checks and geo-mobility lookups.
5. `idx_client_notes_client_date`: Indexed on `(client_id, created_at DESC)` for instant note timeline rendering.
6. `idx_match_assign_client`: Fast check for existing pairings and dispatch statuses.

---

## ⚙️ 3. Gender-Specific Matching Algorithm

The matching engine enforces the specific criteria detailed in the TDC specification:

### A. For Male Clients Looking for Female Partners
1. **Age Bracket**: Prioritizes women who are younger (1 to 5 years younger scores 100%; older candidates penalized proportionally).
2. **Income Alignment**: Prioritizes candidates who earn less or within a harmonious ratio ($\le$ client's income LPA).
3. **Height Dynamics**: Evaluates candidates who are shorter ($5\text{ cm}$ to $22\text{ cm}$ height differential scores 100%).
4. **Children & Family Vision**: Requires synchronized views on children (`Yes`, `No`, or `Maybe`).
5. **Relocation & Geography**: Rewards co-location in the same city or candidates open to relocating.
6. **Diet & Lifestyle Synergy**: Scores harmony in diet (Vegetarian, Non-Veg, Jain), drinking, smoking, and pet tolerance.

### B. For Female Clients Looking for Male Partners
1. **Career Synergy & Pedigree**: Evaluates professional momentum (Senior/Executive roles at top firms like Google, McKinsey, Goldman Sachs, CRED, Zerodha), Tier-1 academic background (IIT, IIM, BITS, SRCC, Stanford), and financial security.
2. **Shared Values & Lifestyle**: Evaluates compatibility in diet, smoking, drinking, Manglik status alignment, and pet love.
3. **Relocation & Geographic Mobility**: Checks location fit and willingness to relocate.
4. **Family & Kids Alignment**: Synchronizes long-term views on family and parenting timelines.
5. **Height & Maturity Dynamic**: Evaluates male candidates who are taller and in a mature peer/slightly older age bracket.

Each match generates a **0–100 Composite Fit Score**, a **Tier Tag** (*High Potential Match*, *Strong Synergy*, *Moderate Match*), radar sub-scores, key strengths, and potential watchouts.

---

## 🤖 4. AI Concierge Integration (Dual-Mode)

- **Mode 1 (Live OpenAI API)**: When `OPENAI_API_KEY` is provided in `.env`, the service prompts `gpt-4o-mini` / `gpt-4o` with structured system instructions to craft personalized introductions and analytical matchmaker reasoning.
- **Mode 2 (Heuristic Fallback Engine)**: If no API key is provided or during rate-limits/offline operation, the system automatically falls back to a deterministic natural language template engine. It drafts personalized intro emails with subject lines, profile highlights, shared passions, and concierge sign-offs with 100% reliability.

---

## 🚀 5. Getting Started & Running Locally

### Prerequisites
- Node.js v18+ (tested on Node v22.23.2)
- npm v9+

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Seed database with 120+ realistic profiles & matchmakers
npm run seed

# 3. Start fullstack application (Server on 5000 + Client on 3000)
npm run server
# in another terminal:
npm run client
```

Open **`http://localhost:3000/`** (or **`http://localhost:5000/`**) in your browser.

---

## 🔑 6. Sample Matchmaker Credentials

| Matchmaker Name | Email | Password | Role |
| :--- | :--- | :--- | :--- |
| **Priya Sharma** | `priya@thedatecrew.com` | `tdc123` | Senior Matchmaker |
| **Rohit Verma** | `rohit@thedatecrew.com` | `tdc123` | Lead Matchmaker |
| **Ananya Sen** | `ananya@thedatecrew.com` | `tdc123` | Relationship Coach |

*(One-click demo buttons are available on the login page for convenience.)*

---

## 📝 7. Comprehensive Assignment Write-Up

### Tech Choices
We selected **React 18 + Vite** on the frontend paired with an **Express.js + better-sqlite3** architecture on the backend. Rather than generic UI frameworks with cookie-cutter styles, we built a bespoke Vanilla CSS design system using design tokens extracted directly from [thedatecrew.com](https://www.thedatecrew.com/). SQLite in WAL mode was chosen because it delivers sub-millisecond query execution, strict 3NF foreign key enforcement, and zero external infrastructure complexity while remaining easily portable to PostgreSQL via identical SQL schemas.

### Matching Logic
The algorithm implements asymmetric gender logic to reflect both user preferences and traditional Indian matrimonial dynamics. For male clients, the algorithm targets younger candidates who earn within a complementary financial ratio, are shorter, and share identical views on children. For female clients, it prioritizes professional pedigree, educational prestige, career growth, value alignment (diet, pets, habits), and geographic flexibility. Scores are broken down into transparent sub-components (Age, Career, Height, Kids, Relocation, Lifestyle) to give matchmakers clear visibility into why a pairing was recommended.

### How AI is Used
AI acts as a force multiplier for matchmakers. First, it extracts multi-attribute profile synergies to produce conversational icebreakers and highlight nuances (e.g., diet compromises or demanding work schedules). Second, it powers the **Concierge Email Pitch Generator**, creating tailored, warm introduction emails that highlight candidate achievements, shared interests, and life visions in The Date Crew's signature brand voice. A resilient fallback architecture guarantees zero downtime even in offline environments.

### Assumptions Made
1. **Network Scale**: The candidate pool is pre-seeded with 120+ verified Indian and NRI professionals across Bangalore, Mumbai, Delhi-NCR, Hyderabad, Pune, London, Singapore, and NYC.
2. **Interactive Pipeline**: Matchmakers can manually transition clients through the journey pipeline (Onboarding → Verified → Actively Matching → First Date Arranged → Deep Talks → On Hold → Matched), with all state changes logged to the client's internal timeline.
3. **Dispatch Workflow**: Dispatched matches automatically persist the generated pitch, update the pairing status to `sent_to_client`, log a meeting note, and prevent duplicate dispatches while keeping the pitch history accessible.
