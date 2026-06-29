# Component Backlog — central style guide (`/style-guide`)

Goal: one central page showing every component used across the app, restyled in the Twenty/green
language. This tracks what's **done** on the page vs. still **to add**.

## Done on `/style-guide`
- [x] Color (gray scale, green accent ramp, semantic palette)
- [x] Typography (Inter scale)
- [x] Buttons (primary/dark/secondary/tertiary/danger · sizes · icon)
- [x] Inputs (text, search, select, textarea, error state)
- [x] Checkbox + Switch
- [x] **Tab navigation** (underline SectionTabs)
- [x] **Segmented toggle** (ToggleGroup)
- [x] **Right-panel fields** (FieldGroup / FieldRow two-tone, value types)
- [x] **Creator identity card** (onboarded / invited-email / muted avatar)
- [x] **Platform · follower chips**
- [x] Tags & badges · status pills · avatars
- [x] Cards (record cards)
- [x] Record table (data grid, cell chip + hover ↗)

## To add — Mantine components to restyle & place here
- [ ] **Select / Combobox** (single + multi, with search) — restyle Mantine `Select`/`MultiSelect`
- [ ] **Menu / Dropdown** (the ⋯ kebab menu, context menus)
- [ ] **Modal / Dialog** (confirm, form modal)
- [ ] **Drawer / Sheet** (mobile panel, filters drawer)
- [ ] **Tooltip** (already themed in provider — show it)
- [ ] **Popover** (filter dropdowns, date range)
- [ ] **DatePicker / DateRange** (Mantine dates)
- [ ] **Accordion / Collapse** (grouped sections)
- [ ] **Radio group**
- [ ] **NumberInput / currency input**
- [ ] **Pagination / load-more**
- [ ] **Breadcrumbs** (panel back-stack + page crumbs)
- [ ] **Notification / Toast** (Sonner is wired — show the styled variants)
- [ ] **Progress / Loader / Skeleton** (spinner, bar, skeleton rows)
- [ ] **Stepper** (already have content StageStepper — add the generic deal stepper)
- [ ] **Tabs (vertical)** for settings-style nav

## To add — domain / app components
- [ ] **Creator cards** — the full kit: `CreatorCard` shell + parts (ContextLine, Stat, StatusPill, Amount, Snippet, Meta, Actions, Thumbnail) + variants (`DealCreatorCard`, `EmailCreatorCard`, `ContentCreatorCard`, `MarketplaceCreatorCard`)
- [ ] **Deal card / row** (`DealCreatorCard`) — amount, deliverable chips, stage, action
- [ ] **Task card / row** + **TaskGroup** (Needs-you / Waiting / Upcoming / Done)
- [ ] **Deal workflow checklist** (`DealTasksCard` / `DealTaskRow` — owner you/creator, action, due, state)
- [ ] **Content card** (media + **script-only** state + production stepper)
- [ ] **Messaging** — ThreadList, ThreadPreview, ThreadView, ThreadHeader, ThreadMessage, ReplyBar, ChannelSegment
- [ ] **Right-panel shells** — CreatorPanel, DealPanel, ReviewDrawer
- [ ] **Empty states** (no deals, all-caught-up tasks, empty inbox)
- [ ] **Record reference chips** — generalized `RecordRef` (Deal/Company/Content/Person) with hover ↗

## To add — charts & data viz
- [ ] **Stat card** (KPI + delta)
- [ ] **Pipeline funnel** (stage bars)
- [ ] **Activity timeline**
- [ ] **Line / area chart** (reach, spend over time) — restyle ApexCharts theme (green)
- [ ] **Bar chart** (per-creator performance)
- [ ] **Donut / progress ring** (budget spent, deliverable completion)
- [ ] **Sparkline** (inline trend in cards/rows)
- [ ] **Mini progress bar** (deliverables N/M)

## Foundations still to document
- [ ] **Dark theme** token set
- [ ] **Spacing scale** swatch
- [ ] **Radii / shadows** swatch (we went flat — show the rule)
- [ ] **Icon set** reference (Tabler usage + sizes)
- [ ] **Motion** (transitions, durations)

---
*Sources to restyle from: existing app `src/components/*` (CreatorCard, Deal, Tasks, Messages, Messaging) and Mantine. Charts: `react-apexcharts` (already a dependency).*
