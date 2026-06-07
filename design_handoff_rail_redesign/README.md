# Handoff: PSRAGE Hub — RAIL Leaderboard Redesign

## Overview
A redesign of the PSRAGE Hub CS2 / FACEIT leaderboard dashboard. "RAIL" is a
**left-sidebar app shell** with a cool, broadcast-grade dark theme ("Ice" — electric
blue on near-black). The main area shows three highlight stat cards, a sortable
ranking table, and a strip of recent/live match cards. The UI is **bilingual
(English / Ukrainian)** and **responsive** (full-screen web app, collapses to a top
bar on narrow screens).

This replaces the previous teal/violet concepts. It is the chosen direction ("variant A")
out of three explored (RAIL / COMMAND / ANALYST).

## About the Design Files
The files in this bundle are **design references created in HTML/React-via-Babel** —
a working prototype that demonstrates the intended look, layout, and behavior. They are
**not production code to drop in directly**: they use in-browser Babel, a global-scope
component pattern, and a bespoke "Tweaks" panel that exists only for design review.

**Your task is to recreate this design in the target codebase's existing environment.**
The original product is a React web app (see source repo
`github.com/grafit-off/psrage-leaderboard`, branch `master`). Implement RAIL using that
project's established patterns (components, styling approach, data layer). If you are
starting fresh, React + CSS Modules (or the project's existing styling solution) is a fine
choice. **Do not ship the Babel/CDN setup or the Tweaks panel** — those are prototype-only.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, radii, and interaction
behavior are all specified below and present in the CSS. Recreate the UI pixel-faithfully
using the codebase's component library and styling system. The exact hex/spacing values
are authoritative.

---

## Screens / Views

### 1. Leaderboard (the only fully-designed view)

**Purpose:** Browse the hub's ranked players, see top-performer highlights, and glance at
live/recent matches. Sort the table by any stat; switch UI language.

**Layout (desktop ≥ 920px):**
- Two-column CSS grid: `grid-template-columns: 248px minmax(0, 1fr)`.
  - **Left:** fixed/sticky sidebar, full viewport height (`position: sticky; top: 0; height: 100vh`).
  - **Right:** scrolling main content, padding `30px clamp(22px,3.4vw,48px) 40px`, inner
    column capped at `max-width: 1320px`, centered.
- Main content is a vertical flex stack, `gap: 22px`, in this order:
  1. Header row (title block + live pill)
  2. Stat cards — 3-up grid (`repeat(3, minmax(0,1fr))`, `gap:16px`)
  3. Ranking panel (table)
  4. Match strip — auto-fit grid (`repeat(auto-fit, minmax(190px,1fr))`, `gap:14px`)

**Sidebar components (top→bottom):**
- **Wordmark** `PSRAGE` + `hub` (the "hub" span is accent-colored). Font: Space Grotesk
  700, 23px, letter-spacing −0.01em.
- **Hub ID** `HUB · 3B81` — JetBrains Mono, 10.5px, letter-spacing 0.22em, muted color.
- **Nav** (4 buttons, vertical, `gap:4px`, `margin-top:36px`): Leaderboard / Matches /
  Players / Stats. Each: 11px×14px padding, radius 10px, 14.5px Space Grotesk 500, a 7px
  square dot before the label. Active item: tint background, white text, accent dot with
  glow, plus a 3px accent bar pinned to the left edge (`::before`). Hover: faint accent wash.
- **Footer** (pushed to bottom with `margin-top:auto`, `gap:13px`):
  - **Language toggle** EN / UA — a bordered pill, JetBrains Mono 11px. Active segment:
    solid accent fill, dark text (`#04121c`), weight 700.
  - **Sync button** — `↻ Sync data` with a right-aligned `Synced HH:MM` timestamp
    (JetBrains Mono 10px, muted). On click: the `↻` glyph rotates 360° over 0.8s and the
    timestamp updates to the current time.

**Header components:**
- **H1** = localized "Leaderboard" / "Таблиця лідерів". Space Grotesk 700,
  `clamp(24px,2.4vw,31px)`, letter-spacing −0.02em.
- **Subtitle** = `CS2 · FACEIT Hub · sorted by <active column>` — JetBrains Mono 12px,
  muted, with the active sort key emphasized in accent.
- **Live pill** (right) = `● LIVE · 1 MATCH` — JetBrains Mono 11.5px, accent text, 1px
  accent-tinted border, fully rounded; the dot is a 7px accent circle with glow that blinks
  (`rl-blink`, 1.4s steps(2) infinite, 50%→opacity .25).

**Stat cards (×3):** "Clutch Master / 🏆 / psr-Veles / 71% / 1v1 · 12/17 won",
"Utility King / 💣 / shadowZSU / 13,402 / total util damage",
"Most Matches / 🎮 / psr-Veles / 312 / matches played".
- Card: gradient panel `linear-gradient(180deg, #131a24, #0e131b)`, 1px hairline border,
  radius 16px, padding `20px 22px`. A 2px accent→transparent gradient bar sits along the top
  edge (`::after`). Hover: `translateY(-3px)` + brighter border (0.25s).
- Tag: JetBrains Mono 10.5px uppercase, letter-spacing 0.16em, muted.
- Emoji icon: 17px (the brand's three semantic glyphs — keep exactly these).
- Nick: 14px Space Grotesk 600, accent-bright color.
- Value: JetBrains Mono 700, `clamp(30px,3vw,38px)`, tabular-nums, letter-spacing −0.02em.
- Sub: 11.5px, muted.

**Ranking panel / table:**
- Panel: same gradient/border/radius-16 as cards. Header row: title "Ranking" (13px 600) +
  meta `10 operatives · live` (JetBrains Mono 11px, "live" in accent).
- Table wrapper has `overflow-x: auto`; table `min-width: 720px`.
- Columns (grid): `54px | minmax(150px,2.2fr) | repeat(6, minmax(64px,1fr))` =
  **# · Player · Rating · K/D · ADR · HS% · Win% · Matches**.
- Header cells are **buttons** (sortable). Label: JetBrains Mono 10.5px uppercase,
  letter-spacing 0.12em, muted; hover → lighter; active → accent-bright. A caret (▾/▴)
  appears on hover and stays on the active column. Numeric headers right-align (caret sits
  left of the label so the label stays flush right).
- Body rows: height `var(--row-h)` (50px comfortable / 40px compact), 14px text, hairline
  bottom border. Hover: faint accent wash (0.18s).
  - `#` rank: JetBrains Mono 13px, muted (zero-padded, e.g. `01`).
  - Player: 26px circular avatar (gradient `135deg, var(--acc-dim), #16202c`, 1px border) +
    nick (Space Grotesk 500, ellipsis-truncated, **rendered verbatim** — preserve case,
    underscores, tags like `psr-`).
  - Numeric cells: JetBrains Mono, tabular-nums, `--tx2` color, right-aligned. The **K/D**
    cell is accent-bright + weight 700.
  - **Rank-1 row (`.t1`)**: left-to-transparent accent tint background; rank + nick brighten
    (nick white/700); avatar gets a glow ring when "Glow on #1" is enabled (else a plain
    border ring).

**Match strip (×5 cards, includes one live):**
- Card: gradient panel, radius 13px, padding `13px 15px`. Hover `translateY(-3px)`. Live
  card has a brighter border + inset accent ring.
- Header: status (`FINAL · 2h AGO` or `● LIVE · RD 16`) and map name — JetBrains Mono 9.5px
  uppercase, muted; the live dot blinks.
- Body: `home  score  away` grid. Score is JetBrains Mono 700 18px; winner side
  accent-bright, loser muted, `:` separator muted.
- Footer: `FACEIT · HUB 3B81`, JetBrains Mono 10px muted.

### Other nav views (Matches / Players / Stats)
**Not designed.** The nav buttons currently only toggle the active highlight. If you build
these out, follow the same shell, card, and table vocabulary. Confirm scope with the design
owner before implementing.

---

## Interactions & Behavior

- **Sort:** Clicking a column header sorts the table by that key. Clicking the active column
  toggles asc/desc. Default sort is **K/D descending**. Numeric columns default to descending
  on first click; `#` (rank) and Player default to ascending. The rank-1 highlight always
  follows the player whose standing rank is 1, regardless of current sort order.
- **Language toggle (EN/UA):** Swaps every UI string between English and Ukrainian
  (parity-first — both locales always exist). **Player nicknames and acronyms
  (ADR, K/D, HS%, PSRAGE Hub) are never translated.** In the real product, `uk` is the
  app's default language; the prototype defaults to `en` for review — pick per product spec.
- **Sync:** Click → `↻` rotates 360° (0.8s), button label shows an ellipsis state, and the
  `Synced HH:MM` timestamp updates. In production, wire this to the real data refetch.
- **Hover lifts:** Stat cards and match cards translateY(−3px) + border brighten (0.25s).
  Table rows get a faint accent wash (0.18s). Nav/sync/lang have their own hover washes.
- **Live blink:** All "live" dots pulse via `rl-blink` (1.4s, steps(2), opacity 1→.25).
- **Responsive:** At `max-width: 920px` the sidebar becomes a horizontal top bar (nav goes
  row-wise, hub id hidden, footer controls move inline). Stat grid: 3-up → 2-up at ≤1080px →
  1-up at ≤560px. Table scrolls horizontally below 720px content width.

## State Management
Local UI state (no global store required for this view):
- `lang: 'en' | 'uk'` — current locale.
- `sort: { key, dir }` — active sort column + direction (default `{ key:'kd', dir:'desc' }`).
- `active: string` — currently highlighted nav item (`'leaderboard'` default).
- `syncing: boolean` + `synced: string` — sync animation flag and last-synced timestamp.

Data needs (replace mock `data.js` with real API):
- **Players** list with `rank, nick, rating, kd, adr, win, hs, m`.
- **Stat highlights** (clutch / utility / matches) — nick + value per card.
- **Matches** — `home, away, hs, as, map`, plus `live`+`round` or `ago` (hours).
- **i18n** strings for both locales (see `data.js` → `RAIL_I18N`).

> **Note on the Tweaks panel:** `tweaks-panel.jsx` and the `<TweaksPanel>` block in
> `rail-app.jsx` are a **design-review tool only** (live accent/density/glow/strip toggles).
> Do **not** port them. Instead bake in the chosen defaults: Accent = Ice `#38bdf8`,
> Density = comfortable, Glow-on-#1 = on, Match-strip = on.

---

## Design Tokens

**Color (Ice theme, dark):**
| Token | Value | Use |
|---|---|---|
| `--acc` | `#38bdf8` | Primary accent (links, active sort, dots, K/D, rank-1) |
| `--acc-br` | `color-mix(in srgb, var(--acc), white 45%)` ≈ `#9fd9fa` | Bright accent (nicks, hover) |
| `--acc-dim` | `color-mix(in srgb, var(--acc), black 42%)` ≈ `#21708f` | Avatar gradient base |
| `--bg0` | `#07090d` | Page floor (with a faint top-right accent radial glow) |
| `--bg1` | `#0c1016` | Sidebar background |
| panel grad | `#131a24` → `#0e131b` | Cards, table, match cards |
| `--tx` | `#e7edf4` | Primary text |
| `--tx2` | `#aeb9c6` | Secondary text / numeric cells |
| `--mut` | `#6e7888` | Muted labels |
| `--win` | `#5fd38a` | Positive / win (reserved) |
| `--loss` | `#ff6b6b` | Negative / loss (reserved) |
| `--line` | `color-mix(in srgb, var(--acc) 9%, transparent)` | Hairline borders |
| `--line2` | `color-mix(in srgb, var(--acc) 18%, transparent)` | Stronger borders |
| `--tint` | `color-mix(in srgb, var(--acc) 11%, transparent)` | Active nav / rank-1 wash |
| text-on-accent | `#04121c` | Text over solid accent fills |

The **entire theme is driven by `--acc`**: bright/dim variants and all tints derive from it
via `color-mix`, so re-theming = changing one variable. Alternate accents explored:
Crimson `#f43f5e`, Emerald `#34d399`, Gold `#e8b54a`, Violet `#a855f7`. **Ship Ice `#38bdf8`.**

**Typography:**
- **Space Grotesk** (400/500/600/700) — UI text, headings, labels.
- **JetBrains Mono** (400/500/700) — all numerals (tabular), mono labels, timestamps, hub id.
- Scale: hub id 10.5px · mono labels 10.5–11px · body/cells 14px · nav 14.5px · subtitle 12px
  · stat tag 10.5px · stat value clamp(30–38px) · H1 clamp(24–31px). Display letter-spacing
  −0.02em; mono labels +0.12–0.22em.

**Spacing:** main stack gap 22px · stat/strip gaps 16/14px · card padding `20px 22px`
(comfortable) / `…16px` (compact) · sidebar padding `26px 20px` · row height 50/40px.

**Radii:** cards/table/panels 16px · match cards 13px · nav/lang/sync 8–10px · live pill 999px
· avatar 50%.

**Borders/shadows:** hairlines are accent-tinted (9% / 18% alpha), not solid gray. Depth comes
from the panel gradient + hover translate, not heavy shadows. Glow-on-#1 = soft accent ring
(`0 0 0 2px` + `0 0 16px` accent at ~35–40% alpha).

**Motion:** 0.18s (hover washes, sort caret, color) · 0.25s (card/match lifts) · 0.8s (sync
rotate) · 1.4s blink. Easing: default ease / `cubic-bezier(.4,0,.2,1)` for the sync rotate.

## Assets
- **No image assets.** Player avatars are CSS-gradient placeholders with an intended
  initials/photo fallback — in production use the real FACEIT avatar URLs (round for players)
  with an initials fallback.
- **Icons:** none except the three brand **emoji** (🏆 💣 🎮) as semantic stat glyphs, plus
  Unicode `↻` (sync) and `▾/▴` (sort carets). Keep the emoji exactly; don't add an icon set
  unless the product needs one (flag it if so).
- **Logo:** no image — the brand mark is the CSS wordmark `PSRAGE` + accent `hub`.
- **Fonts:** Google Fonts (Space Grotesk, JetBrains Mono). Self-host in production.

## Files
- `RAIL Dashboard.html` — entry point; mounts the app, loads fonts + scripts.
- `rail-app.jsx` — the full component (sidebar, header, stat cards, sortable table, match
  strip) + the prototype Tweaks block (**do not port the Tweaks block**).
- `rail-app.css` — all styles and tokens (the source of truth for exact values).
- `data.js` — mock data + the full EN/UA i18n dictionary (`RAIL_PLAYERS`, `RAIL_STATS`,
  `RAIL_MATCHES`, `RAIL_I18N`).
- `tweaks-panel.jsx` — prototype-only review tool. **Ignore for production.**

Open `RAIL Dashboard.html` in a browser to interact with the reference (sort, switch
language, sync, and — via the host's Tweaks toggle — recolor/adjust).
