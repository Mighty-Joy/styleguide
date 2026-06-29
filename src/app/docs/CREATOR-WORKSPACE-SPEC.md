# Creator Workspace — Design Spec (v1, for review)

A single, self-contained spec for the **Creator** surface: the panel ↔ expanded page, its tabs
**Info · Deals · Tasks · Messages**, thread-grouped Messages (Twenty style), and the lego components.

**Stance:** the existing SuperDeal IA is strong — this **reuses and restyles** it onto the Twenty
panel system. Reuse first; build new only where there's a real gap (marked 🆕 below).

> Review me top-to-bottom. **§1 Decisions needed** is where I need your calls — they unblock the build.
> Everything else is the proposed design.

---

## 1. Decisions needed  ⬅ *review these first*

| # | Decision | Options | My recommendation |
|---|---|---|---|
| D1 | **Panel navigation** when a creator panel opens a nested record (a deal, a thread) | (a) replace in place · (b) **back-stack + breadcrumb** · (c) open a 2nd stacked panel | **(b)** back-stack — matches Twenty, cheap to reason about |
| D2 | **Tasks tab source** | (a) creator `Task[]` only · (b) **unified** Task[] + deal-workflow rows | **(b)** unified — makes the page a worklist |
| D3 | **Messages** structure | (a) **one tab, channel segments** (All/Email/SMS/Pitches) · (b) three separate tabs | **(a)** one tab, segmented |
| D4 | **Content** placement | (a) own tab · (b) **nested under each Deal** | **(b)** under Deal — content is per-deliverable |
| D5 | **Info editing** | (a) read + edit mode · (b) inline-editable fields | (b) inline, but (a) is fine for v1 |
| D6 | **Panel vs expanded page parity** | identical · page adds a right context rail (activity) | page adds an **activity rail** |

---

## 2. Principles

1. **Creator-first.** The creator is the spine; deals/content/tasks/messages hang off it.
2. **One representation per record, everywhere** (a creator always looks the same when referenced).
3. **Relationship → reference → panel.** Any related record renders as a *card/chip* and **opens its own
   panel on click** (your core ask).
4. **Panel = detail surface.** Lists live in the main column; the right panel inspects/acts on one record.
5. **Two-tone fields.** Muted keys, content-weight values.

---

## 3. The Creator surface — one record, two presentations

Same component; the existing `asPage` flag already renders it as a **side panel** *or* a **full page**.

```
SIDE PANEL (~400)                         EXPANDED PAGE (~960 + activity rail)
┌────────────────────────────┐           ┌───────────────────────────────────────────────┐
│ ⌄ [AV] Priya Nair   @priya  │  ⤢  ✕     │ ‹ Back   [AV] Priya Nair  @priya.creates   ⋯ ✕ │
│        ◦ IG 128k · TT 96k   │           │          ◦ IG 128k · TT 96k    [Active]        │
│ [Active]   ✉ Message  ⋯     │           ├───────────────────────────────────────────────┤
├────────────────────────────┤           │ Info · Deals · Tasks · Messages   |  Activity  │
│ Info · Deals · Tasks · Msgs │           │ ┌───────────────────────────────┐ |  ┌───────┐│
│ ┌────────────────────────┐  │           │ │ (active tab content)          │ |  │ feed  ││
│ │ (active tab content)   │  │           │ │                               │ |  │ …     ││
│ │                        │  │           │ └───────────────────────────────┘ |  └───────┘│
│ └────────────────────────┘  │           └───────────────────────────────────────────────┘
│ Options ⌘O    Open ⌘↵       │
└────────────────────────────┘
```

- **Header (persistent):** `CreatorIdentity` (avatar · name · green `@handle` · platforms · verified) +
  status pill + actions (**Message**, **Add deal**, ⋯) + expand/collapse + close.
- **Tab bar:** Info · Deals · Tasks · Messages.
- **Footer (panel only):** Options · Open.

---

## 4. Tabs

### 4.1 Info  *(today's Overview + Contact, as Twenty field groups)*
```
PROFILE
  @ Username        @priya.creates
  ♡ Engagement      4.6%
  ▣ Category        [Beauty]
SOCIAL ACCOUNTS
  ◦ Instagram       128k followers        ›
  ◦ TikTok          96k followers         ›
CONTACT  (brand-private CRM)
  ✉ Email           priya@lumen.co
  ☎ Phone           —
  ⌖ Owner           [ED] Eric Dahan
STATUS
  ◷ Campaign        [Approved]   by Eric · Jun 4
NOTES
  ▤  "Met at SaaStr. Wants product before filming."
```
- Lego: `FieldGroup` + `FieldRow` (two-tone). Reference values (Owner, Vendor) = `RecordRef`.
- CRM block = `CreatorCrmContact` (per-campaign, never creator-visible).

### 4.2 Deals  *(creator's engagements, sectioned by status)*
```
ACTIVE (2)
  ┌ [▦ thumb] Atlas X Launch · $15k · IG Reel ×2  [In production]  Open ›
  └ [▦ thumb] Spring Drop    · $9k  · TikTok ×1   [Signed]         Open ›
OFFERS (1)        … COMPLETED (3)        … DROPPED (0)
```
- Row = `DealCreatorCard` (reuse). **Click → Deal panel** (`DealOverviewCard` + `DealTasksCard` + Contract — exists).

### 4.3 Tasks  🆕 *(unified worklist — what needs doing for this creator)*
```
NEEDS YOU (2)
  ⚑ Approve script — Atlas X Reel v2        owner: you      Due today    [Review]
  ⚑ Send offer — Spring Drop                owner: you      —            [Send offer]
WAITING ON CREATOR (1)
  ⏳ Awaiting content — Atlas X Reel v2      owner: creator  Due Aug 12
UPCOMING (1)   … DONE (5, collapsed)
```
- Sources unified: `Task[]` (`TaskCard`) + deal-workflow rows (`DealTaskRow`: owner you/creator, action, state, due).
- Grouped by **Needs you / Waiting / Upcoming / Done**. **Click → opens the deal panel** at that step.

### 4.4 Messages  🆕 *(grouped by thread — Twenty styling)*  ⭐
```
[ All · Email · SMS · Pitches ]                              ✎ Compose

THREAD LIST                                    →  THREAD VIEW (on click)
┌───────────────────────────────────────┐        ┌─────────────────────────────────┐
│ ◍◍  Priya, You      3   Re: Atlas brief │        │ ‹  Re: Atlas brief    · 2h ago  │
│      snippet preview…           2h ●    │        ├─────────────────────────────────┤
├───────────────────────────────────────┤        │ [AV] Priya Nair        Aug 1     │
│ ◍   You             1   Contract ready  │        │   …1-line preview (collapsed)    │
│      snippet preview…           1d      │        │ ───────────────────────────────  │
└───────────────────────────────────────┘        │ [AV] You   (agent)     Aug 2  ▾  │
                                                  │   full body when expanded…       │
                                                  ├─────────────────────────────────┤
                                                  │ ✎ Reply…                  ➤      │
                                                  └─────────────────────────────────┘
```
- **ThreadPreview:** overlapping participant avatars · sender names · count · **subject** (primary) +
  **snippet** (tertiary) · time · unread dot. **Click → Thread view**.
- **Thread view:** `ThreadHeader` (subject + last time) → stack of **collapsible `ThreadMessage`**
  (collapsed = sender + 1-line; expanded = sender + receivers + body; agent-sent badge) → `ReplyBar`.
- Channel segments map to existing systems (Email threads / SMS conversations / pitch threads), all
  scoped by `creatorId`. Maps 1:1 to Twenty `EmailsCard → EmailThreadPreview → EmailThreadMessage → bottom bar`.

---

## 5. Relationship → reference → panel (the rule)

- A **creator** referenced anywhere → `CreatorRef` → opens **this** panel.
- Inside this panel, **deal / task / thread** → their own Ref cards → open **their** panels.
- Navigation between them governed by **D1** (recommend back-stack + breadcrumb).

---

## 6. Lego component inventory

| Component | Status | Role |
|---|---|---|
| `RightPanel` (shell) | 🆕 | width modes (inspector ↔ page), sticky header, tabs, scroll body, footer, **nav stack** |
| `CreatorHeader` | reuse `CreatorIdentity` | identity + actions |
| `Tabs` | reuse `ToggleGroup`/`SectionTabs` | tab bar |
| `FieldGroup` / `FieldRow` | 🆕 | Info two-tone fields |
| `RecordRef` (Creator/Deal/Content/Person) | 🆕 (generalize `CreatorRef`) | relationship → panel |
| `CreatorCard` + `CreatorCardParts` | reuse | card shell + parts |
| `DealCreatorCard` | reuse | Deals row |
| `DealTasksCard` / `DealTaskRow` | reuse | deal-workflow rows → Tasks |
| `TaskCard` | reuse/extend | creator task row |
| `TaskGroup` | 🆕 | Needs-you/Waiting/Upcoming/Done |
| `ChannelSegment` | 🆕 | All/Email/SMS/Pitches |
| `ThreadList` · `ThreadPreview` | 🆕 (Twenty skin over existing data) | message list |
| `ThreadView` · `ThreadHeader` · `ThreadMessage` · `ReplyBar` | 🆕 | opened thread |
| `StatusPill` · `Tag` · `StageStepper` | reuse/extend | status, stage, tracker |
| `EmptyState` · `Avatar` · `Skeleton` | reuse | states |

---

## 7. States

- Creator: onboarded / invited (email) / no-info (muted avatar); status enum.
- Deals empty (per section) · Tasks "All caught up" · Messages `EmptyInbox`.
- Thread: unread · restricted/not-shared · agent-sent · loading skeleton.
- Deliverable lifecycle (drives Deals/Tasks): brief_not_sent → awaiting_script → script_ready_for_review →
  edits_requested → awaiting_content → content_ready_for_review → content_approved → awaiting_publish_link →
  link_ready_for_review → finished.

---

## 8. Build phases (after decisions)

1. `RightPanel` shell + nav model (D1) · `FieldGroup`/`FieldRow` · `RecordRef`.
2. **Info** tab (field groups over `CampaignCreator` + `CreatorCrmContact`).
3. **Deals** tab (reuse `DealCreatorCard`; wire Deal panel).
4. **Tasks** tab (unify `Task[]` + `DealTaskRow`; grouping).
5. **Messages** tab — Twenty thread components over existing email/SMS/pitch data; channel segments.
6. Expanded-page presentation + activity rail (D6).

---

## 9. Appendix — existing components to reuse (file map)

- Creator shell/tabs: `src/components/CampaignWorkspace/CampaignCreatorDrawer.tsx` (drawer-or-page via `asPage`)
- Identity/kit: `src/components/Creator/CreatorIdentity.tsx`, `src/components/CreatorCard/*` (+ `CreatorCardParts`, variants)
- Deals: `src/components/Deal/{DealsBoard,DealDetailPanel,DealTasksCard,DealOverviewCard,dealTasks}.tsx`, `dealCardMapping.ts`
- Tasks: `src/components/Tasks/TaskCard.tsx`; `src/api/types/task.types.ts`
- Messages — email (thread-grouped today): `src/components/Messages/{ThreadList,ThreadView,EmailMessageItem,ReplyBox}.tsx`
- Messages — SMS: `src/components/Messaging/{ConversationList,MessageBubble}.tsx`
- Messages — pitches: `src/app/business/inbox/*`
- Twenty reference (thread components): `twenty-front/src/modules/activities/emails/components/*`

---
*Companion docs in this folder: `PRD.md` (campaign workspace + panel system), `CREATOR-PANEL-IA.md` (longer IA notes).*
