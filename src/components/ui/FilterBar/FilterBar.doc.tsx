"use client";

import React, { useState } from "react";
import FilterBar from "./FilterBar";
import { IconPlus } from "@tabler/icons-react";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";
import type { FilterChip, FilterBarView } from "./FilterBar";

/* ------------------------------------------------------------------ */
/* Demos                                                                 */
/* ------------------------------------------------------------------ */

const SORT_OPTIONS = [
  { key: "newest",    label: "Newest first" },
  { key: "oldest",   label: "Oldest first" },
  { key: "az",       label: "Name A→Z" },
  { key: "followers",label: "Most followers" },
];

/** 1. Creators list — search + sort + view toggle + add button */
function CreatorsFilterBarDemo() {
  const [search, setSearch]   = useState("");
  const [sort, setSort]       = useState("newest");
  const [view, setView]       = useState<FilterBarView>("list");
  const [chips, setChips]     = useState<FilterChip[]>([
    { key: "ig",       label: "Instagram" },
    { key: "contracted", label: "Contracted" },
  ]);

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        chips={chips}
        onChipRemove={(key) => setChips(prev => prev.filter(c => c.key !== key))}
        sortOptions={SORT_OPTIONS}
        sortValue={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
        placeholder="Search creators…"
        actions={
          <Button variant="primary" size="sm" leftIcon={<IconPlus size={13} />}>Add creator</Button>
        }
      />
      <div style={{ padding: "12px 16px", background: "var(--sd-bg-secondary)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
        search: <strong style={{ color: "var(--sd-font-primary)" }}>&quot;{search}&quot;</strong> · sort: <strong style={{ color: "var(--sd-font-primary)" }}>{sort}</strong> · view: <strong style={{ color: "var(--sd-font-primary)" }}>{view}</strong> · active chips: <strong style={{ color: "var(--sd-font-primary)" }}>{chips.map(c => c.label).join(", ") || "none"}</strong>
      </div>
    </div>
  );
}

/** 2. Content list — search only (no sort, no view toggle) */
function ContentFilterBarDemo() {
  const [search, setSearch] = useState("");
  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        placeholder="Search content…"
      />
      <div style={{ padding: "12px 16px", background: "var(--sd-bg-secondary)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
        Minimal — search input only, no sort or view controls.
      </div>
    </div>
  );
}

/** 3. Posts list — search + sort + active chip */
function PostsFilterBarDemo() {
  const [search, setSearch] = useState("");
  const [sort, setSort]     = useState("followers");
  const [chips, setChips]   = useState<FilterChip[]>([
    { key: "tiktok", label: "TikTok" },
  ]);
  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        chips={chips}
        onChipRemove={(key) => setChips(prev => prev.filter(c => c.key !== key))}
        sortOptions={[
          { key: "newest",  label: "Newest" },
          { key: "views",   label: "Most views" },
          { key: "er",      label: "Highest ER" },
          { key: "followers", label: "Most followers" },
        ]}
        sortValue={sort}
        onSortChange={setSort}
        placeholder="Search posts…"
      />
      <div style={{ padding: "12px 16px", background: "var(--sd-bg-secondary)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
        Search + sort + one active filter chip. Click × on TikTok chip to remove it.
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "filter-bar",
  title: "FilterBar",
  group: "Core Components",
  status: "stable",
  summary: "Search + sort + active filter chips + optional view toggle. Sits above every record list.",
  description:
    "FilterBar is the standard toolbar that lives between the page header and a record list. Compose it with as many or as few slots as the view needs: `search` is always present; `chips` shows active filters with × remove buttons; `sortOptions` renders a dropdown; `view`/`onViewChange` shows a list/grid toggle; `actions` is a trailing slot for page-level CTAs like 'Add creator'. All state is controlled externally — the component fires callbacks and your page state drives it.",
  demos: [
    {
      title: "Creators list (full)",
      description: "Search + 2 active filter chips + sort dropdown + list/grid toggle + Add creator button. Remove chips by clicking ×.",
      block: true,
      render: () => <CreatorsFilterBarDemo />,
    },
    {
      title: "Content list (minimal)",
      description: "Search input only — no sort, no view toggle. The simplest configuration.",
      block: true,
      render: () => <ContentFilterBarDemo />,
    },
    {
      title: "Posts list (search + sort + chip)",
      description: "Search + sort dropdown + one active platform chip.",
      block: true,
      render: () => <PostsFilterBarDemo />,
    },
  ],
  props: [
    {
      rows: [
        { name: "search",        type: "string",            required: true,  description: "Controlled search string." },
        { name: "onSearchChange",type: "(v: string) => void", required: true, description: "Called on every keystroke." },
        { name: "chips",         type: "FilterChip[]",      required: false, description: "Active filter chips: `{ key, label }[]`. Rendered after the search box." },
        { name: "onChipRemove",  type: "(key: string) => void", required: false, description: "Called when the user clicks × on a chip." },
        { name: "sortOptions",   type: "SortOption[]",      required: false, description: "If provided, renders a sort dropdown. Each: `{ key, label }`." },
        { name: "sortValue",     type: "string",            required: false, description: "Active sort option key." },
        { name: "onSortChange",  type: "(key: string) => void", required: false, description: "Called when the user picks a sort option." },
        { name: "view",          type: "'list' | 'grid'",   required: false, description: "If provided alongside `onViewChange`, shows the list/grid toggle." },
        { name: "onViewChange",  type: "(v: FilterBarView) => void", required: false, description: "Called when the user clicks a view toggle button." },
        { name: "actions",       type: "React.ReactNode",   required: false, description: "Trailing slot. Typically an Add or Export button." },
        { name: "placeholder",   type: "string",            required: false, default: "'Search…'", description: "Search input placeholder." },
      ],
    },
  ],
};

export default doc;
