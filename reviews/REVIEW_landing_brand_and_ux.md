# REVIEW: 06_website landing page — brand image, trust, money-feel, UX

- Target: `src/app/page.tsx`, `src/app/layout.tsx`, `src/components/{hero,site-header,footer,trust-section,how-it-works,work-classes,state-machine-walkthrough,settlement-simulator,blog-teaser}.tsx`, `src/content/site.ts`, `src/app/globals.css`
- Reviewer: Claude
- Goal: Make the landing page read like fintech-grade, money-handling infrastructure (trust + capital + credibility), not generic crypto SaaS
- Status: Recommendations only. No code changed.

---

## 1. The single biggest brand problem

The page currently reads as a **technical pitch deck** (process flow, state map, simulator). It does not read as **money infrastructure**. Visitors who land here cannot answer in five seconds:

1. Is this real or a concept?
2. Is my money safe?
3. Who is behind it / who has reviewed it?
4. What stage is it at — testnet, audited, live, or gated?

Every other change in this review serves those four answers.

A second, smaller problem: the hero **overstates current readiness**. The badge says "Base Mainnet deployed · Block 45,167,721" which reads as "live and accepting funds." From memory we know user funds are still gated until audit/guard checks pass. **Honest pre-launch positioning builds more trust than vague "deployed" claims.** Fix this first — see §3.

---

## 2. Color, typography, and identity

### 2.1 Color palette — shift from "tech blue" to "money-and-trust"

Current accent is sky-cyan (`#0ea5e9 → #38bdf8 → #22d3ee`). It reads "developer SaaS." Money brands lean three directions, pick one:

- **Option A — Coinbase/Base aligned (recommended):** Deepen primary to royal blue `#0052FF` (Base brand blue). Keep cyan only as a hover/highlight. This signals "we live on Base" without saying it.
- **Option B — Stripe/Mercury aligned:** Keep dark navy bg, shift accent to a deep emerald `#0F9D58` or `#059669` for *money-flow* actions (release, settle, simulate). Reserve blue only for *information/links*.
- **Option C — Goldman/JPM aligned:** Deep navy `#0a1628` + warm gold `#c9a961` for money. Most "old-money" feel, riskiest because it's furthest from current code.

**Recommendation: Option A**, with one addition — split `--success` away from "small ✓" usage and promote it to a money-flow color. Money should be green, status should be blue. Right now the page uses blue for everything including dollar amounts.

Concrete CSS variable changes in `globals.css`:

```css
--accent: #0052FF;          /* Base blue, primary brand */
--accent-light: #3b82f6;    /* hover/highlight */
--accent-dim: rgba(0, 82, 255, 0.10);
--accent-glow: rgba(0, 82, 255, 0.22);

--money: #10b981;           /* USDC/release flows */
--money-dim: rgba(16, 185, 129, 0.10);

--gold: #d4af37;            /* reserved for "verified/audited" badges only */
```

### 2.2 Typography — pair a serif headline with the sans body

Inter alone reads "startup template." Money brands almost always pair a **serif display** for headlines with a **sans body**. Pick one:

- **IBM Plex Serif** (free, geometric, fintech-feeling)
- **Source Serif 4** (free, more editorial)
- **Tiempos Headline** (paid, what Stripe uses)

Apply serif to:
- `.hero-heading`
- `.section-title`
- `.cta-heading`

Keep Inter for body, nav, buttons. **Add tabular numerals everywhere a number appears** — stats, simulator amounts, deploy block, contract address, receipt amounts:

```css
.tabular-nums { font-variant-numeric: tabular-nums; font-feature-settings: "tnum"; }
```

Apply via class on every numeric span (stats values, amounts, block numbers, hashes). This single change makes the entire site feel like a financial product.

### 2.3 Logo — replace the generic hexagon

`site-header.tsx:11` and `footer.tsx:24` use a generic hexagon SVG. Hexagons are the most overused mark in crypto and convey nothing about "rail." Replace with one of:

- Two parallel rails (||) tapering into one — literal "rail" mark
- A bracketed bar `[ ━ ]` to suggest escrow/holding
- A lockup of "OR" with a tightened ligature

Either way, ship the actual mark as `public/logo.svg` and `public/logo-dark.svg`. Add a favicon set (`public/favicon.ico`, `public/icon-512.png`, `apple-touch-icon.png`) and wire `metadata.icons` in `layout.tsx`.

---

## 3. Hero — honest, denser proof, lighter copy

### 3.1 Heading — one strong line, not two

Current (`site.ts:13-14`):
> Autonomous agents trading with each other, **powered by trustless escrow.**

Issues: the gradient accent lands on the lower-energy half of the sentence; the sentence is long; "trustless" is jargon; the comma split fragments the rhythm.

Recommend one of:

- **"Settlement infrastructure for autonomous agents."**  Accent: `Settlement infrastructure`.
- **"The money rail for AI agents."** Accent: `money rail`. Short, brand-aligned, memorable.
- **"Verified escrow for agent-to-agent payments."** Accent: `Verified escrow`. Most concrete.

### 3.2 Subhead — one sentence, not five

Current is five fragments stitched together. Replace with:

> One agent pays another in USDC. Funds lock on Base. Verification releases payment — or returns it. On-chain, every time.

That is the entire pitch. Move all the rest ("No intermediaries. No friction. Trustless collaboration") into the section subtitles where they currently belong.

### 3.3 Honest status badge

Replace the current badge with a **truthful** two-piece status indicator that *builds* trust by being precise. Suggested copy in `site.ts`:

```ts
hero: {
  status: {
    label: "Phase 28 · Mainnet contract verified",
    sublabel: "User funds gated until audit + guard review complete",
    deploymentBlock: "45,167,721",
    contractAddress: "0x15E3…44d0",
    contractHref: "https://basescan.org/address/0x15E344d31761c62E22b7B7a5E8A52Bfe41F044d0"
  },
  ...
}
```

Render two stacked chips below the heading:
1. Small green pill: `● Contract verified on Basescan` → links to the address
2. Small amber pill: `● Not yet accepting live user funds` → links to a `/status` or `/trust` page

This is the single most credibility-positive change on the page. Investors and serious devs respect honest gating; they distrust vague "deployed" claims.

### 3.4 Hero visual — money flow, not orbs

Current orbs (`hero.tsx:7-8`) are decorative noise. Replace with a **diagram on the right of the hero** showing the actual money flow:

```
[Principal] ──USDC──▶ [Escrow contract] ──verified──▶ [Agent]
                              │
                              └─refund/slash──▶ [Principal]
```

- Use real Base + USDC logos (Circle and Coinbase publish brand kits — fetch and ship as SVG in `public/`).
- Animate USDC token glyph traveling along the line on a 4-second loop.
- Switch the layout to two-column at ≥900px: copy on the left, diagram on the right.

If a real diagram is too much for one pass, at minimum show three logo lockups beneath the CTA: **`Built on Base` · `Settles in USDC` · `Open source`** with logos.

### 3.5 CTA pair

Current: `See how it works` + `Try the simulator` — both internal anchors.

Make the primary CTA the *trust action* and the secondary the *exploration action*:

- Primary: `Inspect contract on Basescan` → external, opens the address. This is the most trust-positive click on the entire page.
- Secondary: `Try the simulator` → `#simulator`.
- Tertiary text-only link: `Read the spec →` to `/about`.

---

## 4. Stats bar — replace labels with numbers and milestones

Current `stats-bar` (`page.tsx:11-28`, fed from `site.ts:19-24`) is four label/label pairs with no numbers. The eye expects digits in a stats bar; without them it reads as decoration.

Two options depending on what's truthful today:

### Option A — Pre-launch milestone bar (recommended, honest)

Replace the four cells with a **launch-progress strip** showing four phases with checkmarks/spinners:

| Cell | Value |
|------|-------|
| Contract deployed | ✓ Block 45,167,721 |
| Source verified | ✓ Basescan |
| External audit | ◐ In progress |
| User funds | ⊘ Gated |

This *is* the trust statement. It tells the reader exactly where the project is, with no spin.

### Option B — Live numeric stats (only if/when real)

When user funds are live, replace with hard numbers and tabular nums:

| Cell | Value |
|------|-------|
| Total settled | $X.XM USDC |
| Settlements | XXX |
| Avg confirmation | 2.1s |
| Network | Base Mainnet |

Both options need the count-up animation on first scroll into view (use `framer-motion` `useInView` + `animate`).

---

## 5. Section order and visual rhythm

### 5.1 Move Trust above the technical content

Current order (`page.tsx:62-73`):
```
Hero → Stats → HowItWorks → Simulator → WorkClasses → StateMachine → Trust → Blog → CTA
```

Trust arrives in 7th position, after the reader has waded through a state-machine walkthrough. Reorder so trust signals land before the heaviest technical content:

```
Hero → Stats (milestones) → Trust (3-card summary) → HowItWorks → Simulator → WorkClasses → StateMachine (deep) → Blog → CTA
```

Split the current 6-card `TrustSection` into:
- A **3-card trust summary** placed right after stats (Verified · Operator-gated · Open source)
- A **deeper trust-and-fraud section** retaining the other 3 cards, kept where it is or merged into a new `/trust` page

### 5.2 Section background variation

Every section sits on the same `--bg`. The page reads as one long uniform slab. Alternate two surface tones to create rhythm:

- Hero: `--bg` with subtle radial
- Stats: `--surface` (slightly lighter)
- HowItWorks: `--bg`
- Simulator: `--surface`
- WorkClasses: `--bg`
- StateMachine: `--surface`
- Trust deep: `--bg`
- CTA: `--surface` with a thin top hairline

Only two values are needed; the contrast is what gives rhythm.

### 5.3 Sticky table-of-contents on long sections

The state-machine walkthrough and work-classes sections are tall. Add a sticky right-rail TOC at ≥1100px:

- "How it works"
- "Simulator"
- "Work classes"
- "Lifecycle states"
- "Trust model"

Highlights as the reader scrolls. Keeps the page navigable and signals depth.

---

## 6. Trust signals that are missing entirely

Add a new `TrustStrip` component below the hero and above stats. One row of muted logos with a heading line:

> **Built on, settled with, inspected by**
> [Base logo] [USDC/Circle logo] [Foundry logo] [GitHub logo] [Basescan logo]

Even five logos in a single row immediately tells visitors "this is real, this connects to real systems." Logos go in `public/logos/` as SVG.

Additional missing signals to add (priority order):

1. **`/security` or `/trust` page** with: contract address, deploy block, verification link, owner key custody status, bug bounty status (or "TBD"), audit status, security disclosure email (`security@…`), status page link. Linked from header nav and footer.
2. **GitHub link in nav** — open-source signaling. Even a stub repo link is better than nothing.
3. **Last-updated timestamp** in the footer — "Updated YYYY-MM-DD · build sha." Live freshness signal.
4. **Disclosures footer line** — small grey line: "Onchain Rail does not custody user funds outside the escrow contract. The system is in pre-launch and not approved to accept live user funds. Read the full status →"
5. **Live block indicator** in the header — a small pill `● Base block 45,XXX,XXX` polled from a public RPC every 12s. The most powerful "this is real and live" signal you can add for very little code.

---

## 7. Component-level fixes

### 7.1 `hero.tsx`
- Replace orbs with the money-flow diagram (§3.4)
- Add status pills under the heading (§3.3)
- Two-column layout at ≥900px

### 7.2 `site-header.tsx:9-16`
- Replace generic hexagon with brand mark (§2.3)
- Add a live "Base block" pill on the right of the nav (§6 item 5)
- Add a `Trust` nav item linking to `/trust` (or `/security`)
- Add a primary CTA in the header: `Verify on Basescan` → external

### 7.3 `footer.tsx`
- Add columns: **Product** (Home, About, Blog, Trust), **Resources** (Spec, GitHub, Status), **Legal** (Privacy, Terms, Disclosures), **Contact** (`security@`, X/Twitter, GitHub)
- Add disclosures line (§6 item 4)
- Last-updated build stamp (§6 item 3)
- Logo gradient currently uses purple `#6366f1 → #8b5cf6` (`footer.tsx:16`) which conflicts with the cyan brand color elsewhere. Unify to the chosen brand accent.

### 7.4 `trust-section.tsx`
- Split into the 3-card summary above and 3-card deep section below (§5.1)
- Each card needs a small numeric or proof anchor — e.g., on "Contract verified on Basescan", show the address `0x15E3…44d0` as a tappable monospace badge inside the card
- "Operator-gated releases" — add a visual: a lock icon over a transaction stub
- "Immutable on-chain audit trail" — show one literal sample event (mocked) like `EscrowFunded { id: 0xabc…, amount: 200 USDC, block: 45,167,892 }` in monospace

### 7.5 `settlement-simulator.tsx:39-43`
- The receipt title strings use literal `✓ ↩ ⚠` glyphs. Replace with `lucide-react` icons consistent with the rest of the page.
- Move the `Outcome` selector to a segmented control (three pills), not a dropdown — outcomes are visual; a dropdown hides the choice.
- Add a fourth outcome: `Slash → fraud confirmed` so the simulator covers all four terminal states the trust narrative claims.
- Show a real Basescan deeplink on completion: `View 0x15E3…44d0 on Basescan ↗` even if the tx hash is mocked. Trains the eye to expect on-chain receipts.

### 7.6 `state-machine-walkthrough.tsx`
- This section is the deepest content on the page and currently sits mid-fold. Consider gating it behind a `Show full lifecycle ▾` expander or moving it to `/about` so the landing page stays marketing-weighted.
- If kept on landing, add a one-line explainer above the state buttons: "Click any state to see its guards, events, and on-chain effect."

### 7.7 `work-classes.tsx`
- Add a sixth class slot or label the current five as "v1 supported" — shows roadmap.
- Each example flow (`exampleFlow`) currently uses prose. Render as a 4-step horizontal mini-timeline with the same visuals as the main `HowItWorks` component for consistency.

### 7.8 CTA section (`page.tsx:30-59`)
- "Ready to enable autonomous agent-to-agent trading?" presumes the visitor has agents. Most don't. Reframe:
  > **Build on Onchain Rail.**
  > Read the spec, inspect the contract, or follow shipping updates.
- Three buttons: `Read the spec` (primary, → `/about`) · `Inspect on Basescan` (secondary, external) · `Get shipping updates` (ghost, opens email capture or links to blog)

---

## 8. Microcopy and tone

Across all components, the voice oscillates between marketing-loose ("No intermediaries. No friction.") and engineer-tight ("operator-gated releases", "structured event"). Pick a register and hold it.

Recommended voice: **understated, precise, plural sentences.** Stripe-like. Avoid:
- "trustless" (replace with "verified" or "contract-enforced")
- "no friction" (replace with the actual mechanic — "settles in one block")
- "powered by" (replace with the noun — "with verified escrow")
- exclamation points anywhere
- emoji or check glyphs in headings

Replacements to make in `site.ts` and component constants:
- `hero.body`: rewrite per §3.2
- `siteConfig.description`: tighten to one sentence ending in a period
- `TrustSection.cards[*].body`: keep — these are well-tuned already
- `HowItWorks.steps[*].body`: keep — also well-tuned
- `siteConfig.about.body[2]`: drop "the system is not yet approved to accept live user funds — that gate opens after all guard checks and external security reviews pass" from a buried prose paragraph and **promote to a hero status pill** (§3.3). Same words, but a pill at the top is honest; a paragraph at the bottom looks like a disclaimer hidden in the fine print.

---

## 9. Accessibility and polish

- `--text-muted: #94a3b8` on `--bg: #07090f` is ~6.5:1 — passes AA but feels washed out. Consider `#a8b3c5` for body to lift readability.
- Hero gradient text on `.gradient-text` loses contrast against dark bg at smaller weights. Test with WCAG AAA in mind for the heading; if it fails, reduce gradient stops or apply only to one word.
- Add `prefers-reduced-motion` query for the live dot pulse, simulator spinners, and any added hero animation.
- All interactive elements need a visible focus ring. Currently `.btn` has none. Add:
  ```css
  .btn:focus-visible { outline: 2px solid var(--accent-light); outline-offset: 2px; }
  ```
- Hero diagram and any decorative SVG: `aria-hidden="true"`. Real semantic content: `<figure>` + `<figcaption>`.

---

## 10. Implementation priority for Codex

If implementing in passes, here is the ranked order. Each pass is shippable on its own.

### Pass 1 — Honest brand reset (highest impact, low effort)
1. Hero status pills replacing the misleading badge (§3.3)
2. Stats bar → milestone bar (§4 Option A)
3. Disclosures line in footer (§6 item 4)
4. Logo replacement (§2.3)
5. Tabular nums everywhere there's a number (§2.2)

### Pass 2 — Color and typography (medium effort)
6. Color palette shift to Base blue + money green (§2.1)
7. Serif headline pairing (§2.2)
8. Section background alternation (§5.2)
9. Section reorder, trust above technical (§5.1)

### Pass 3 — Trust depth (medium effort, high credibility payoff)
10. Trust-strip with logos below hero (§6)
11. `/trust` (or `/security`) page (§6 item 1)
12. Live Base block pill in header (§6 item 5)
13. GitHub + security email in nav/footer (§6 items 2, 4)

### Pass 4 — Hero visual and microinteractions (highest effort)
14. Money-flow diagram in hero (§3.4)
15. Count-up animation on stats (§4)
16. Sticky section TOC (§5.3)
17. Component-level fixes per §7

---

## 11. Out-of-scope notes

These are worth tracking but not in this review:

- A real contract dashboard (TVL, recent settlements, agent leaderboard) — needs an indexer and is a separate workstream
- A pricing page — N/A while user funds are gated
- Internationalization — defer
- Dark/light theme toggle — defer; the dark theme is the brand right now

---

## 12. Source files touched in recommendations

- `src/content/site.ts` — heading, body, status, hero CTA, milestone copy
- `src/app/globals.css` — color tokens, typography, tabular nums, focus ring, section bg variation
- `src/app/layout.tsx` — Inter + serif font pairing, favicon/icons, og image
- `src/app/page.tsx` — section order, new TrustStrip, milestone Stats, CTA copy
- `src/components/hero.tsx` — diagram, two-column layout, status pills
- `src/components/site-header.tsx` — logo, live block pill, Trust nav, header CTA
- `src/components/footer.tsx` — column layout, disclosures, last-updated
- `src/components/trust-section.tsx` — split into summary + deep
- `src/components/settlement-simulator.tsx` — segmented outcome control, slash outcome, Basescan deeplink
- New: `src/app/trust/page.tsx` (or `security/`) — trust center page
- New: `src/components/trust-strip.tsx` — logo lockup
- New: `src/components/live-block.tsx` — RPC-polled block pill
- New: `public/logos/{base,usdc,foundry,github,basescan}.svg`
- New: `public/logo.svg`, `public/icon-*.png`, `public/favicon.ico`

---

## 13. One-paragraph summary for the user

The landing page is technically solid but reads as a developer demo, not as money infrastructure. The four highest-leverage moves are: (1) replace the misleading "deployed" badge with honest pre-launch status pills — honesty is the strongest trust signal available; (2) shift the color palette from generic cyan to Base blue + money green and pair Inter with a serif headline; (3) add a logo strip ("Built on Base · Settles in USDC · Open source") under the hero and a live Base block pill in the header; (4) reorder so trust signals land *before* the state-machine walkthrough, and split the 6-card trust section into a 3-card summary high on the page and a 3-card deep section lower. Everything else in this review compounds on those four.
