# Campaign Workspace — Design PRD (outline)

**Design language:** Twenty (twenty.com) tokens · Superdeal green accent.
**Status:** this doc formalizes the
component + panel system so it can be built consistently.
**Scope:** UI, design system, and the right-panel / record-reference model. **Out of scope:** data
wiring, backend, auth.

---

## 1. Principles (the spine)

1. **Creator-first.** Within a campaign, the Creator is the primary record; deals, content,
   contracts, and payments hang off a creator.
2. **One representation per record, everywhere.** A given record type always renders the same way
   when referenced (same chip/card), so the UI reads as one system, not a pile of components.
3. **Relationships are navigable.** Any field that points to another record is a *reference* that
   opens that record's panel — see §3. *(This is the core ask: a creator relationship shows a
   creator card; clicking it opens the creator's right panel.)*
4. **The right panel is the detail surface.** The main column is for lists/overview; the right panel
   is where you inspect or act on a single record. Two widths, two jobs (§4).
5. **Altitude / two-tone.** Field keys are muted; values carry the weight (§6).

---

## 2. Object model

```
Campaign ──< Deal/Engagement >── Creator ──< SocialAccount (platform · handle · followers)
                │   │                 │
                │   └─< Payment        └─ Superdeal profile (username) | invited (email only)
                └─< Content/Deliverable ── Contract
```

| Object | Primary identity | Key relationships |
|---|---|---|
| Campaign | name + status | creators, budget, dates |
| **Creator** | avatar · name · @username (or email) · platform·followers | social accounts, deal, content, payments |
| Deal | name + amount + stage | creator, contract, content, payments |
| Content / Deliverable | thumbnail (or script) + stage | creator, deal |
| Contract | document + status | creator, deal |
| Payment | amount + status | creator, deal |
| Task / Approval | title + due | any record |

---

## 3. Record Reference pattern  ⭐ *(core)*

> A **reference** is any UI element that stands in for another record. Rendering, affordance, and
> behavior are standardized regardless of where the reference appears (table cell, list card, panel
> field, breadcrumb).

### 3.1 Rendering by target type
| Target | Reference component | Contents |
|---|---|---|
| **Creator** | `CreatorRef` | avatar · name · `@username` *(or email if not onboarded)* · *(card size only:)* platform·followers chips |
| Deal | `DealRef` | $ amount · stage dot |
| Company | `CompanyRef` | logo · name |
| Content | `ContentRef` | thumbnail · title |
| User (internal) | `PersonRef` | avatar · name |

### 3.2 Sizes / variants (same data, density varies)
- **inline chip** — one line, bordered; table cells, panel field values, breadcrumbs.
- **list-card** — one line + secondary info (e.g. creator platform·followers); roster rows.
- **gallery card** — stacked; browse/discovery surfaces.
- **panel header** — large; the open record's own panel.

### 3.3 Affordance + behavior
- On hover (of the row/card), reveal a **diagonal-arrow "open" button** (Twenty pattern).
- **Click the open arrow → opens that record's right panel** (§4). Clicking the row body may also
  open the row's *own* record; action buttons `stopPropagation`.
- Identity fallbacks: onboarded → `@username` (green); invited → email (muted) + `Invite pending`;
  no info → muted/light avatar.

### 3.4 Rule
Whenever a record has a relationship to another record, render the related one as its **Ref
component**, never as plain text. Plain text is reserved for scalar fields (dates, amounts, free text).

---

## 4. Right Panel system  ⭐

Two panel modes occupy the same right slot; width animates between them.

| Mode | Width | Trigger | Job |
|---|---|---|---|
| **Record Inspector** | ~380px | open any record reference | read/edit a record's fields |
| **Review / Action Drawer** | ~540px | open a review item (content / contract / application) | review media/script + take an action |

### 4.1 Inspector anatomy (narrow)
1. **Header** — record avatar · name · sub-line (e.g. @username) · close ✕
2. **Tabs** — Home · Timeline · Tasks · +More
3. **Field groups** — collapsible; each = muted group label + two-tone field rows (§6)
4. **Sections** — related-record sections with edit affordance (e.g. *Recent content*, *Payments*)
5. **Footer** — Options · Open (full record)

### 4.2 Drawer anatomy (wide)
1. **Header** — kind icon · "Review {kind}" · close ✕
2. **Preview** — media (vertical frame) · document page · creator hero · **or empty/script placeholder**
3. **Content sections** — caption/script · brief checklist · details (with refs)
4. **Feedback** — note field (label adapts by kind)
5. **Action bar** — primary/secondary, context-aware (Approve · Request changes · Upload content · Open document · Decline)

### 4.3 Panel navigation (key behavior)
- A reference **inside** a panel (e.g. the Creator field in a content drawer) **swaps the panel** to
  that referenced record. → *"items that have a relationship with a creator open the creator panel."*
- **Close ✕** returns to the panel's default record (campaign's lead) and narrows back.
- **Open decision:** do we keep a **back stack** (breadcrumb of opened records) or always reset?
  *(see §10)*
- The panel is record-aware: same shell, content driven by the record type's model.

---

## 5. Panel content specs (per record type)

> Each panel = `{ header, groups[], sections[] }`. Group = `{ label, fields[] }`. Field =
> `{ icon, label, value }`. Value types in §6.

- **Creator inspector** — header: rich identity. Groups: **Profile** (username, engagement,
  category) · **Social accounts** (one row per platform) · **Deal** (stage, deliverables, amount) ·
  **Contact** (email, phone, location) · **System** (created, owner). Sections: Recent content,
  Payments.
- **Content review drawer (media)** — preview (vertical media) · Caption · Brief checklist · Details
  (Creator ref, Deliverable, Submitted, Status). Actions: Request changes / Approve.
- **Content review drawer (script-only)** — empty-media placeholder · Script · Details (Updated, Status).
  Actions: Request changes / **Upload content**.
- **Contract drawer** — document preview · Details (Creator ref, Amount, Terms, Status). Actions:
  Send reminder / Open document.
- **Application drawer** — creator hero (stats) · Why they applied · Details. Actions: Decline / Approve.

---

## 6. Field rendering (two-tone)

- **Key** = muted icon + muted label (`--font-secondary`, icon `--font-light`).
- **Value** = one of:
  | type | render |
  |---|---|
  | text | content color; `strong` for emphasis (amounts, counts) |
  | empty | light placeholder text (the field name) |
  | tag | colored pill (status/stage) |
  | chip | neutral relation chip |
  | **reference** | a **Ref component** (§3) → opens panel on click |
- A reference value is the bridge between fields and §3: e.g. *Owner* and *Creator* fields render a
  `PersonRef` / `CreatorRef`.

---

## 7. Component inventory

| Component | Variants | Used in | Notes |
|---|---|---|---|
| `CreatorRef` / identity | chip · list-card · gallery · header | refs, roster, drawers, panels | username→email fallback, platform·followers sub-card, hover ↗ |
| `RecordChip` (generic ref) | inline | table cells, fields | base for DealRef/CompanyRef/etc. |
| `Tag` | color set | status, stage, semantic | pill + dot |
| `StageChip` + `Stepper` | — | content cards | production tracker (Script→…→Live) |
| `Avatar` | colored · muted | everywhere | muted = no-info creator |
| List card (review / creator) | — | Needs review, Creators | compact, ~44–52px, flat |
| Roster / list | — | Creators tab | one card per record |
| Content gallery card | media · **script-only** | Content tab | thumbnail or script placeholder + stepper |
| Stat card · Funnel · Timeline | — | Overview dashboard | — |
| `Inspector` (narrow) · `ReviewDrawer` (wide) | per record type | right panel | §4 |
| Field row | two-tone | panels, drawers | §6 |
| Buttons · inputs · toggle · checkbox | sizes/intents | global | green primary (dark text), flat cards |
| Sidebar nav · Tabs · Toolbar | — | shell | objects: Campaigns/Creators/Content/Deals/Tasks |

*(Each component needs: props, states, sizes, do/don't — to be filled per row.)*

---

## 8. Layout & navigation

- **App shell:** Sidebar (240) · Main (flex) · Right panel (380 ↔ 540).
- **Campaign tabs:** Overview (dashboard) · Creators (roster, list cards) · Content (gallery) ·
  Activity (timeline) · Deals *(or folded into Creators — decide)*.
- **Overview = dashboard only** (KPIs, Needs-review queue, pipeline funnel, recent activity); no full
  table — the deep lists live in their tabs.

---

## 9. States & edge cases (must-spec)

- Creator: onboarded · invited (email) · no-info (muted avatar, Invite pending).
- Content: script-only (no media) · in-review · approved · live; production stage tracker.
- Review actions adapt to stage (Upload content vs Approve).
- Empty states for every list/gallery; loading skeletons; truncation rules.

---

## 10. Open decisions

1. **Panel back-stack** — keep a history/breadcrumb of opened records, or always reset on close?
2. **Panel persistence** — does the open panel survive a tab switch?
3. **Deals** — own tab or folded into Creators?
4. **Bulk actions** — multi-select on roster/gallery? where do bulk actions live?
5. **Gallery/list toggle** — on Creators (and Content)?
6. **Editing** — inline field edit in the inspector vs. dedicated edit; can the stepper advance stage on click?
7. **Mobile** — panel as full-screen sheet; sidebar collapse.

---

## 11. Appendix — file map

- Tokens + component CSS: `src/app/style-guide/styleGuide.module.css`
- Style guide (foundations + components): `src/app/style-guide/page.tsx`
- Reference design tokens: twenty-ui `theme/constants` (grays, indigo→green accent, radii, shadows)
