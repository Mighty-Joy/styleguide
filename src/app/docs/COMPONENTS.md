# Components & Layouts — Outline

Catalog of the lego components and layouts for the Creator/Deal workspace (Twenty design language,
Superdeal green accent). **Status** key: `reuse` = exists in the app today · `new` = build · `restyle`
= exists but reskin. Prototype: `/style-guide` (foundations).

---

## A. Layouts

| Layout | Status | Structure | Notes |
|---|---|---|---|
| **App shell** | new | `Sidebar (240) · Main (flex) · RightPanel (variable)` | 3-pane; panel optional |
| **Sidebar** | restyle | logo/workspace · search · nav sections · favorites · settings | object nav (Campaigns/Creators/Content/Deals/Tasks/Inbox) |
| **Tabbed surface** | reuse `ToggleGroup`/`SectionTabs` | sticky header → tab bar → scroll body | used by campaign + both panels |
| **RightPanel** | new | header · tabs · scroll body · footer; width modes | inspector ↔ wide drawer ↔ page; **back-stack** (D1) |
| **Roster / list** | restyle | toolbar → stack of cards | Creators tab, Needs-review |
| **Record table** | restyle | toolbar → table; cell chips, hover ↗ | Twenty data grid |
| **Gallery grid** | new | `repeat(auto-fill, minmax(220px,1fr))` | Content tab |
| **Dashboard grid** | new | stat row + 2-col (funnel · activity) | campaign Overview |
| **Master–detail** | new | thread list ↔ thread view (stack in panel; side-by-side on page) | Messages |

---

## B. Foundations / primitives

| Component | Status | Purpose | Key props / variants | States |
|---|---|---|---|---|
| **Tokens** | new | color (green accent, grays), type (Inter scale), radii (4/8), flat shadows | CSS vars in `styleGuide.module.css` | light (dark TBD) |
| **Avatar** | reuse | identity glyph | `color`, `initials`, `round\|square`, size; **muted** when no-info | colored · muted · stacked |
| **Tag** | reuse/restyle | status/semantic pill | `color` (green/red/orange/blue/purple/gray) + dot | — |
| **StatusPill** | reuse | record status | `label`, `color` | — |
| **StageChip + Stepper** | new | production stage + N-segment tracker | `stage`, `n/total` | Script→Filming→Review→Approved→Live |
| **Chip / RelChip** | new | neutral relation/value pill | text + optional glyph | — |
| **Button** | restyle | actions | intent (primary green/secondary/tertiary/danger), size (sm/md), icon | hover/active/disabled |
| **Input / Textarea / Toggle / Checkbox** | restyle | form controls | focus ring, error | default/focus/error |
| **Skeleton / Bar** | reuse | loading + wireframe placeholder | width | — |
| **EmptyState** | reuse | empty list/gallery | icon, title, action | — |

---

## C. Identity & references  ⭐

| Component | Status | Purpose | Key props / slots | Variants / states |
|---|---|---|---|---|
| **CreatorIdentity** | reuse | canonical creator identity | avatar · name · green `@handle` (or email) · platforms · verified | sizes xs/sm/md; onboarded vs invited (email) vs no-info (muted avatar) |
| **CreatorRef** | restyle | a creator reference that **opens the creator panel** | `name`, `onOpen`; one-line + platform sub-card | bordered chip · list-card · hover ↗ |
| **RecordRef** (`Deal`/`Content`/`Person`) | new | generalized relationship → its panel | target type, `onOpen` | inline chip · card |
| **CreatorCard + CreatorCardParts** | reuse | composable card shell + parts | slots: `media`, `body`, `meta`, `actions`, `selection`, `statusBadge` | parts: ContextLine, Stat, StatusPill, Amount, Snippet, Meta, Actions, Thumbnail |

---

## D. Record cards

| Component | Status | Purpose | Key props | States |
|---|---|---|---|---|
| **DealCreatorCard** | reuse | a deal, creator-faced (roster row, Deals tab) | creator + campaign · amount · deliverable chips · stage · action | active/offer/completed/dropped |
| **ContentCard** | new | a deliverable in the gallery | thumbnail (or **script-only** placeholder) · stepper · creator chip · stage chip | media · script-only (no media yet) |
| **TaskCard** | reuse | a creator task | type · due · status · campaign | to-do/completed/expired |
| **DealTaskRow** | reuse | a deal-workflow step | title · owner (you/creator) · action · due · state | done/current/upcoming |
| **TaskGroup** | new | grouped worklist | Needs-you / Waiting / Upcoming / Done | counts, collapse |
| **StatCard / Funnel / Timeline** | new | dashboard tiles | label/value/delta · stage bars · activity dots | — |

---

## E. Panels

| Component | Status | Purpose | Tabs / sections | Notes |
|---|---|---|---|---|
| **RightPanel (shell)** | new | container for any record panel | header · tabs · body · footer · breadcrumb/back | width: inspector(~400) ↔ wide(~540) ↔ page |
| **CreatorPanel** | new | the durable relationship record | **Info · Deals · Tasks · Messages** | identity header; opened via CreatorRef ↗ |
| **DealPanel** | new (composes reuse) | the atomic engagement record | **Overview · Tasks · Content · Messages · Contract** | creator-identity header → ↗ to creator |
| **ReviewDrawer** (wide) | new | review a content/contract/application item | preview · checklist/script · details · feedback · actions | record-aware; "Upload content" at script stage |
| **DealOverviewCard / ContractDocument** | reuse | deal facts · agreement | field rows · doc | inside DealPanel |

---

## F. Fields (Info / detail)

| Component | Status | Purpose | Spec |
|---|---|---|---|
| **FieldGroup** | new | labeled collapsible group | muted group label + rows |
| **FieldRow** | new | one two-tone field | muted **key** (icon+label) · **value** |
| **Field value types** | new | how values render | `text` · `empty` (placeholder) · `tag` · `chip` · `reference` (→ RecordRef → panel) |

---

## G. Messaging (Twenty thread model)  ⭐

| Component | Status | Purpose | Structure |
|---|---|---|---|
| **ChannelSegment** | new | channel switch | All · Email · SMS · Pitches |
| **ThreadList** | restyle | grouped threads | header (count) + rows + compose + infinite scroll + empty |
| **ThreadPreview** | new | one thread row | overlapping participant avatars · sender names · count · subject (primary) + snippet (tertiary) · time · unread dot → opens thread |
| **ThreadView** | new | opened thread | header + message stack + reply bar |
| **ThreadHeader** | new | thread top | subject + relative last-message time (secondary-bg banner) |
| **ThreadMessage** | new | one message (collapsible) | collapsed = sender + 1-line; expanded = sender + receivers + body; agent badge; hairline divider |
| **ReplyBar** | new | composer | channel-aware reply input + send |

Data sources (reuse): email `EmailThread`, SMS `ConversationThread`, pitches `BusinessInboxThread` — all scoped by `creatorId`. Maps to Twenty `EmailsCard → EmailThreadPreview → EmailThreadHeader + EmailThreadMessage → bottom bar`.

---

## H. States (cross-cutting)

- **Creator:** onboarded · invited (email) · no-info (muted avatar) · status enum.
- **Lists:** empty (per section) · loading skeleton · truncation.
- **Content:** media · script-only · stage (Script→Live).
- **Thread:** unread · restricted/not-shared · agent-sent.
- **Tasks:** owner you/creator · overdue · done.

---

## I. Navigation rules

- **Relationship → reference → panel:** any related record renders as a Ref → opens its panel.
- **Roster row → Deal panel** (the deal is the record); **identity ↗ → Creator panel** (the durable entity).
- **Back-stack breadcrumb** between opened records (D1).

---

## J. Build order

1. Tokens · primitives (Avatar, Tag, Button, Field*).
2. `RightPanel` shell + back-stack + Tabs.
3. `CreatorIdentity` / `CreatorRef` / `RecordRef`.
4. CreatorPanel (Info) → DealPanel (Overview) → cross-nav.
5. Cards: DealCreatorCard, ContentCard, TaskGroup/DealTaskRow.
6. Messaging: ChannelSegment → ThreadList/Preview → ThreadView/Message/ReplyBar.

---
*Related docs (this folder): `PRD.md`, `CREATOR-WORKSPACE-SPEC.md`, `CREATOR-PANEL-IA.md`. Prototype: `/style-guide`.*
