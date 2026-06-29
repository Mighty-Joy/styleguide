# Creator Surface — IA & Component Outline

> Companion to `PRD.md`. Scope: the **Creator** detail experience (panel ↔ expanded page) and its
> tabs **Info · Deals · Tasks · Messages**, with Messages grouped by thread in the Twenty style.
> **Premise:** the existing SuperDeal IA is good — this **reuses and restyles** it onto the
> Twenty-style panel system + lego components. Reuse first; extend only where there's a gap.

## 0. Anchors (what already exists vs. what's new)

| Need | Reuse (exists today) | New / restyle |
|---|---|---|
| Creator identity | `CreatorIdentity`, `CreatorCard` + `CreatorCardParts`, variants (`DealCreatorCard`, …) | Twenty bordered card skin; one-line + sub-card variants |
| Detail shell | `CampaignCreatorDrawer` (drawer **or** page via `asPage`), `ToggleGroup` tabs | `RightPanel` shell (width modes), Twenty field groups |
| Deals | `DealsBoard`, `DealCreatorCard`, `DealDetailPanel`, `DealTasksCard`/`DealTaskRow`, `DealOverviewCard` | Deal **Ref → panel** wiring; Twenty styling |
| Tasks | `TaskCard` (Task model), `DealTasksCard` workflow rows | Unified, owner-aware **Tasks tab** |
| Messages | Email threads (`ThreadList → ThreadView → EmailMessageItem → ReplyBox`), SMS (`Messaging/*`), Pitches (`business/inbox`) | Twenty thread components + one per-creator surface |

---

## 1. The Creator surface: one record, two presentations

- **Side panel (inspector)** ~400px ↔ **Expanded page** (full width, centered ~960 + optional right rail).
  Same component; the existing `asPage` flag already does this (SUPER-244). *(Twenty parity: side panel ↔ record page.)*
- **Persistent header** (both presentations):
  - `CreatorIdentity` — avatar · name · green `@handle` · platform glyphs · verified.
  - Right side: status pill · primary actions (**Message**, **Add deal**, ⋯) · expand/collapse · close.
- **Tab bar** (below header): **Info · Deals · Tasks · Messages** *(future: Content, Activity)*.
- Tab content scrolls; header + tabs are sticky.

---

## 2. Tabs — IA per tab

### 2.1 Info  *(= today's Overview + Contact, as Twenty two-tone field groups)*
- **Profile** — handle, category/niche, total reach, engagement.
- **Social accounts** — one row per platform: glyph · handle · followers *(row → opens that account)*.
- **Contact / brand-private CRM** — email, phone, preferred method, contact owner *(from `CreatorCrmContact`, per-campaign, never creator-visible)*.
- **Status** — campaign status (Not sent → Pending → Awaiting approval → Approved/Rejected) · approved by/at.
- **Notes** — internal notes (`client_notes`, `mightyjoy_notes`).
- Lego: `FieldGroup` + `FieldRow` (two-tone). Reference values (owner, vendor) render as `RecordRef`.

### 2.2 Deals  *(creator's engagements)*
- **Sectioned by status** (mirror `DealsBoard`): **Active · Offers · Completed · Dropped**.
- Row = `DealCreatorCard`: campaign · amount · deliverable chips · stage pill · action.
- **Click a deal → opens the Deal panel** (relationship → reference → panel).
- Deal panel itself = `DealOverviewCard` + `DealTasksCard` (workflow) + Contract — already exists.
- Empty state: "No deals yet · Add deal".

### 2.3 Tasks  *(what needs doing for this creator)*
- Unifies two existing sources:
  1. **Creator tasks** (`Task` / `TaskCard`) — type, due, status.
  2. **Deal-workflow rows** (`DealTaskRow` from `DealTasksCard`) — owner (`you`|`creator`), action, due, state.
- **Grouped by ownership/urgency:** **Needs you · Waiting on creator · Upcoming · Done**.
- Row: title · owner chip · due (overdue styling) · inline action (e.g. "Approve script", "Send offer") · link to its deal/deliverable.
- **Click → opens the related deal panel** at the relevant step.
- This is the worklist that makes the creator page operational, not just a profile.

### 2.4 Messages  *(grouped by thread — Twenty styling)*  ⭐
- **One per-creator surface**, channel-segmented: **All · Email · SMS · Pitches**
  (maps to the 3 existing systems; all carry `creatorId`).
- **Thread list** → `ThreadPreview` rows: overlapping participant avatars · sender names · message count · **subject** (primary) + **snippet** (tertiary) · time · unread dot.
- **Click a thread → Thread view** (in-panel, or stacked panel):
  - `ThreadHeader` — subject + relative last-message time (secondary-bg banner).
  - Stack of **collapsible `ThreadMessage`** — collapsed = sender + 1-line preview; expanded = sender + receivers + full body; hairline dividers; **agent-sent badge** where applicable.
  - `ReplyBar` — composer pinned at bottom (channel-aware: email reply / SMS / pitch reply).
- **Compose** button (new email/SMS).
- Lego maps to Twenty: `EmailsCard → EmailThreadPreview → EmailThreadHeader + EmailThreadMessage(+Sender/Receivers/Body) → bottom bar`, over existing `EmailThread` / `ConversationThread` / `BusinessInboxThread` data.

---

## 3. The relationship → reference → panel rule (applied here)

- A creator referenced **anywhere** (deal card, task, thread participant, table cell) renders as a
  `CreatorRef` and **opens this creator panel**.
- Inside the creator panel, **deals / tasks / threads** render as their own Ref cards and **open their
  own panels** (Deal panel, Thread view).
- **Panel navigation** = the key open decision (see §7): replace-in-place vs. **back-stack/breadcrumb**
  vs. second stacked panel. *Recommend: stack with a back affordance (Twenty-style record navigation).*

---

## 4. Lego component inventory

| Component | Status | Role |
|---|---|---|
| `RightPanel` (shell) | **new** | container: width modes (inspector ↔ wide ↔ page), sticky header, tab bar, scroll body, footer |
| `CreatorHeader` | reuse `CreatorIdentity` | persistent identity + actions |
| `Tabs` | reuse `ToggleGroup` / `SectionTabs` | Info/Deals/Tasks/Messages |
| `FieldGroup` / `FieldRow` | **new** (Twenty two-tone) | Info fields; value types incl. `RecordRef` |
| `RecordRef` (Creator/Deal/Content/Person) | **new** (generalize `CreatorRef`) | relationship chip/card → opens panel |
| `CreatorCard` + `CreatorCardParts` | reuse | card shell + parts (ContextLine, Stat, StatusPill, Amount, Snippet, Meta, Actions, Thumbnail) |
| `DealCreatorCard` | reuse | Deals tab row |
| `DealTasksCard` / `DealTaskRow` | reuse | deal workflow rows (feed Tasks tab) |
| `TaskCard` | reuse/extend | creator task row |
| `TaskGroup` | **new** | Needs-you / Waiting / Upcoming / Done grouping |
| `ChannelSegment` | **new** | All/Email/SMS/Pitches switch |
| `ThreadList` / `ThreadPreview` | **new** (Twenty skin over existing) | message thread list |
| `ThreadView` / `ThreadHeader` / `ThreadMessage` / `ReplyBar` | **new** | opened thread |
| `StatusPill` / `Tag` / `StageStepper` | reuse/extend | status, stage, production tracker |
| `EmptyState`, `Avatar`, `Skeleton` | reuse | states |

---

## 5. Layout specs (per presentation)

- **Inspector (~400):** header → tabs → single-column tab body → footer (Open · Options).
- **Expanded page (~960 + rail):** header → tabs → tab body. Info/Deals/Tasks full-width; **Messages**
  may use master–detail (thread list + open thread side-by-side) when space allows.
- **Thread:** in inspector it stacks (list → view with back); on page it's two-pane.
- **Mobile:** panel = full-screen sheet; tabs become a scrollable row.

---

## 6. States (must-spec)

- Creator: onboarded / invited (email) / no-info (muted avatar); status enum.
- Deals: empty per section; Tasks: empty ("All caught up"); Messages: `EmptyInbox`.
- Thread: unread · restricted/not-shared · agent-sent · loading skeleton.
- Deliverable lifecycle states (for Tasks/Deals): brief_not_sent → awaiting_script → script_ready_for_review → edits_requested → awaiting_content → content_ready_for_review → content_approved → awaiting_publish_link → link_ready_for_review → finished.

---

## 7. Open decisions

1. **Panel navigation model** — replace vs **back-stack/breadcrumb** vs second stacked panel. *(blocks the RightPanel spec)*
2. **Tasks tab source** — creator `Task[]` only, or **unified** with deal-workflow rows? *(recommend unified)*
3. **Messages** — one tab with channel segments, or separate Email/SMS/Pitches? Default channel?
4. **Content** — own tab, or nested under each Deal?
5. **Info editing** — read-only + edit mode, or inline-editable fields (Twenty-style)?
6. **Page vs panel parity** — does the expanded page add a context rail (activity/related) the panel omits?

---

## 8. File map (existing — reuse targets)

- Creator shell/tabs: `src/components/CampaignWorkspace/CampaignCreatorDrawer.tsx`
- Identity/kit: `src/components/Creator/CreatorIdentity.tsx`, `src/components/CreatorCard/*`
- Deals: `src/components/Deal/{DealsBoard,DealDetailPanel,DealTasksCard,DealOverviewCard,dealTasks}.tsx`, `dealCardMapping.ts`
- Tasks: `src/components/Tasks/TaskCard.tsx`, `src/api/types/task.types.ts`
- Messages — email: `src/components/Messages/{ThreadList,ThreadView,EmailMessageItem,ReplyBox}.tsx`
- Messages — SMS: `src/components/Messaging/{ConversationList,MessageBubble}.tsx`
- Messages — pitches: `src/app/business/inbox/*`
- Twenty reference: `twenty-front/src/modules/activities/emails/components/*`
</content>
