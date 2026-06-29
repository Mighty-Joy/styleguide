# Superdeal Style Guide — Claude Instructions

---

## The Component Hierarchy

Every UI element in this style guide lives at exactly one layer. **A composite may only import from layers below it.** Never skip a layer or reimplement something that already exists above the token level.

```
Layer 0 — Tokens
  src/tokens/tokens.css       (--sd-* CSS variables)
  src/tokens/tones.ts         (TONES[family].solid / .tint / .text)

Layer 1 — Base Components  (Inputs & Controls, Navigation, Feedback)
  Button, Input, Textarea, Select, MultiSelect, DatePicker, FileUpload
  ToggleGroup, Switch, Checkbox, RadioCard, Dropdown
  Modal, Tooltip, Toast, Skeleton
  Tabs, LeftNav

Layer 2 — Core Components  (use Layer 0 + Layer 1)
  PlatformIcon, CreatorIdentity, CreatorPlatformChips, CreatorCell
  RecordList, EmptyState, FilterBar, AvatarGroup
  Badge, StatCard, DataTable, Accordion, Pagination, ProgressStepper
  Fields: FieldGroup, FieldRow

Layer 3 — Patterns / Records  (use Layer 0 + Layer 1 + Layer 2)
  CreatorRecordList, ActivityTimeline, SearchModal
  ContentList, PostList, TaskList, ShipmentList
  EmailThread, InboxView

Layer 4 — Composite / Pre-built  (use Layer 0 + Layer 1 + Layer 2 + Layer 3)
  HomeView, CreatorPanel, CampaignCard, DealKanban, RosterCreatorRow
  BriefCard, ContractCard, NotificationPanel, ContentApprovalModal
  CampaignAnalytics, CreatorDiscovery, RateCard, CampaignCreationWizard
  CampaignRoster, SettingsPage, AppShell, RightPanel, PageHeader
```

---

## Before writing ANY component code — mandatory checklist

**Step 1 — List every UI element the component needs.**
Write them out before touching a file. Example: "I need an avatar circle, a name label, a status badge, a button to open a deal."

**Step 2 — Match each element to an existing component.**
For every item on your list, find the Layer 1 or Layer 2 component that covers it. Use the import table below. If a match exists, USE IT — never reimplement it inline.

**Step 3 — If no match exists, STOP and ask the user.**
Say: "I need a `<ComponentName>` component (description of what it does) before I can build this composite. Should I create it?" Wait for confirmation. Do not substitute with raw HTML.

**Step 4 — Read the component's TypeScript interface.**
Every component in `src/components/ui/<Name>/<Name>.tsx` has a typed props interface. Read it before using the component. Never guess prop names.

**Step 5 — Build using only matched components + Layer 0 tokens.**
Layout (`display: flex`, `gap`, `padding`) with token values is always fine. Visual elements (buttons, inputs, badges, avatars) must use the matched component.

---

## Import reference

| Need | Import |
|---|---|
| Avatar (person/entity circle — initials or photo) | `import Avatar from "@/components/ui/Avatar/Avatar"` |
| Button (any clickable action) | `import Button from "@/components/ui/Button/Button"` |
| Input (text, number, search) | `import { Input } from "@/components/ui/Input/Input"` |
| Textarea | `import Textarea from "@/components/ui/Textarea/Textarea"` |
| Select | `import Select from "@/components/ui/Select/Select"` |
| Multi-select / tag input | `import { MultiSelect } from "@/components/ui/MultiSelect/MultiSelect"` |
| Date picker / range | `import DatePicker, { DateRangePicker } from "@/components/ui/DatePicker/DatePicker"` |
| File upload | `import FileUpload from "@/components/ui/FileUpload/FileUpload"` |
| Toggle group (segmented control) | `import { ToggleGroup } from "@/components/ui/ToggleGroup/ToggleGroup"` |
| Switch / toggle | `import Switch from "@/components/ui/Switch/Switch"` |
| Checkbox | `import { Checkbox } from "@/components/ui/Checkbox/Checkbox"` |
| Radio card | `import { RadioCard } from "@/components/ui/RadioCard/RadioCard"` |
| Modal / dialog | `import Modal from "@/components/ui/Modal/Modal"` |
| Dropdown menu | `import { Dropdown } from "@/components/ui/Dropdown/Dropdown"` |
| Toast | `import { useToast } from "@/components/ui/Toast/Toast"` |
| Tooltip | `import Tooltip from "@/components/ui/Tooltip/Tooltip"` |
| Tabs | `import { Tabs } from "@/components/ui/Tabs/Tabs"` |
| Left nav | `import LeftNav from "@/components/ui/LeftNav/LeftNav"` |
| Creator identity (name + handle + avatar) | `import CreatorIdentity from "@/components/Creator/CreatorIdentity/CreatorIdentity"` |
| Creator cell (identity + platform chips) | `import CreatorCell from "@/components/Creator/CreatorCell/CreatorCell"` |
| Creator platform chips | `import CreatorPlatformChips from "@/components/Creator/CreatorPlatformChips/CreatorPlatformChips"` |
| Creator card (full showcase card) | `import CreatorCard from "@/components/Creator/CreatorCard/CreatorCard"` |
| Platform icon (IG/TT/YT logo) | `import PlatformIcon from "@/components/ui/PlatformIcon/PlatformIcon"` |
| Record list (data rows) | `import RecordList from "@/components/ui/RecordList/RecordList"` |
| Empty state | `import EmptyState from "@/components/ui/EmptyState/EmptyState"` |
| Filter bar | `import FilterBar from "@/components/ui/FilterBar/FilterBar"` |
| Avatar group (stacked avatars) | `import AvatarGroup from "@/components/ui/AvatarGroup/AvatarGroup"` |
| Badge (status/count chip) | `import Badge from "@/components/ui/Badge/Badge"` |
| Stat card (metric display) | `import { StatCard } from "@/components/ui/StatCard/StatCard"` |
| Data table | `import { DataTable } from "@/components/ui/DataTable/DataTable"` |
| Accordion | `import { Accordion } from "@/components/ui/Accordion/Accordion"` |
| Progress stepper | — (see ProgressStepper.doc.tsx) |
| Skeleton (loading placeholder) | `import Skeleton from "@/components/ui/Skeleton/Skeleton"` |
| Field group / field row | `import FieldGroup from "@/components/Fields/FieldGroup/FieldGroup"` |

---

## Hard rules — no exceptions

**Raw HTML violations** (replace these immediately with the component above):
- `<button>` for any user-facing action → `<Button variant="...">`
- `<input type="text|number|search|email">` → `<Input>`
- `<textarea>` → `<Textarea>`
- `<select>` → `<Select>`
- Custom inline toggle/switch (`<button>` styled as a toggle) → `<Switch>`
- Custom inline checkbox → `<Checkbox>`
- Inline avatar circle (`<div style={{ borderRadius: "50%", ... }}>initials</div>`) → `<Avatar name="..." tone="..." />`
- Inline status chip/pill (`<span style={{ background: TONES[x].tint, ... }}>label</span>`) → `<Badge tone="..." label="..." />`
- Inline metric display (raw `fontSize: 28, fontWeight: 800` number block) → `<StatCard label="..." value="..." />`

**Color violations:**
- `var(--sd-accent)` (green) for active/selected states → forbidden. Use `var(--sd-bg-inverted)` (black) for active UI states. Green is ONLY for `Button variant="brand"` (landing page CTAs).
- `linear-gradient(...)` in composite headers/thumbnails → use flat TONES tint instead.
- Custom button background/border colors → use the correct Button variant. If no variant fits, ask to add one.

**Architecture violations:**
- Reimplementing an existing component inline (e.g. building your own avatar circle when `CreatorIdentity` exists) → use the existing component.
- Importing a Layer 3 or 4 component into a Layer 1 or 2 component → forbidden (circular dependency).
- Hardcoded pixel colors or font sizes that aren't token values → use `--sd-*` tokens.

---

## Button variants

| Variant | Appearance | When to use |
|---|---|---|
| `primary` | Black filled, pill | The single main action on a surface |
| `secondary` | White, bordered, pill | Supporting / secondary action |
| `tertiary` | Ghost (no bg, no border), pill | Low-emphasis / text-level action |
| `ghost` | Round circle, no border, no shadow, gray hover | Inline icon buttons (⋯, ✕, edit, close) |
| `danger` | White with red text/border | Destructive actions |
| `brand` | Green filled | **Landing page CTAs only — never in product UI** |

---

## When building a new composite — the protocol

```
1. Read registry.tsx → identify which layer this belongs to
2. List all UI elements needed
3. For each element: find the existing component OR ask the user to create it
4. Write the composite using ONLY those components + Layer 0 tokens
5. Run: node_modules/.bin/tsc --noEmit --project tsconfig.json
6. Add to registry.tsx (DOCS[] and NAV[])
```

**If you find yourself writing a raw `<div>` that looks like a button, badge, avatar, chip, or any other named UI pattern — stop. That's a missing component. Ask the user first.**

---

## Tokens

- CSS variables: `src/tokens/tokens.css` — prefix `--sd-*`
- Color tones: `src/tokens/tones.ts` — `TONES["blue"|"green"|"red"|"orange"|"yellow"|"purple"|"pink"|"gray"|"turquoise"|"sky"]`
  - `.solid` = saturated fill (for avatar backgrounds, indicator dots)
  - `.tint` = light wash (for card backgrounds, active row tint)  
  - `.text` = dark readable text on white (for labels, counts)
- Icons: `@tabler/icons-react` **only** — no Lucide, no Font Awesome, no inline SVGs

---

## Type-checking

Always verify before reporting done:
```
node_modules/.bin/tsc --noEmit --project tsconfig.json
```
Zero errors = done. Any errors = fix before moving on.
