"use client";

import React, { useState } from "react";
import { CreatorCard } from "@/components/Creator/CreatorCard/CreatorCard";
import Badge from "@/components/ui/Badge/Badge";
import {
  IconSearch,
  IconLayoutGrid,
  IconList,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

const CREATORS = [
  {
    name: "Priya Nair",
    handle: "@priya.creates",
    avatarInitials: "PN",
    avatarTone: "green" as const,
    platforms: { instagram: 128000, tiktok: 96000 },
    stats: [
      { label: "Avg ER",    value: "8.3%" },
      { label: "Avg views", value: "284k" },
      { label: "Deals",     value: "4"    },
      { label: "Rating",    value: "4.9"  },
    ],
    status: "active" as const,
    niche: "skincare",
  },
  {
    name: "Diego Santos",
    handle: "@diegocreates",
    avatarInitials: "DS",
    avatarTone: "orange" as const,
    platforms: { tiktok: 210000, youtube: 40000 },
    stats: [
      { label: "Avg ER",    value: "9.4%" },
      { label: "Avg views", value: "1.2M" },
      { label: "Deals",     value: "2"    },
      { label: "Rating",    value: "4.7"  },
    ],
    status: "active" as const,
    niche: "lifestyle",
  },
  {
    name: "Marcus Webb",
    handle: "@marcuswebb",
    avatarInitials: "MW",
    avatarTone: "purple" as const,
    platforms: { tiktok: 210000 },
    stats: [
      { label: "Avg ER",    value: "7.3%" },
      { label: "Avg views", value: "89k"  },
      { label: "Deals",     value: "6"    },
      { label: "Rating",    value: "4.5"  },
    ],
    status: "active" as const,
    niche: "fitness",
  },
  {
    name: "Hana Kim",
    handle: "@hanakim",
    avatarInitials: "HK",
    avatarTone: "pink" as const,
    platforms: { instagram: 340000 },
    stats: [
      { label: "Avg ER",    value: "5.1%" },
      { label: "Avg views", value: "180k" },
      { label: "Deals",     value: "8"    },
      { label: "Rating",    value: "5.0"  },
    ],
    status: "active" as const,
    niche: "skincare",
  },
  {
    name: "Liam Park",
    handle: "@liampark",
    avatarInitials: "LP",
    avatarTone: "blue" as const,
    platforms: { youtube: 890000 },
    stats: [
      { label: "Avg ER",    value: "4.2%" },
      { label: "Avg views", value: "620k" },
      { label: "Deals",     value: "3"    },
      { label: "Rating",    value: "4.8"  },
    ],
    status: "active" as const,
    niche: "tech",
  },
  {
    name: "Aisha Obi",
    handle: "@aishaobi",
    avatarInitials: "AO",
    avatarTone: "turquoise" as const,
    platforms: { instagram: 210000, tiktok: 88000 },
    stats: [
      { label: "Avg ER",    value: "6.8%" },
      { label: "Avg views", value: "145k" },
      { label: "Deals",     value: "1"    },
      { label: "Rating",    value: "4.6"  },
    ],
    status: "invited" as const,
    niche: "wellness",
  },
];

const NICHES = ["All", "skincare", "lifestyle", "fitness", "tech", "wellness"];

function Demo() {
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("All");
  const [added, setAdded] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"grid" | "compact">("grid");

  function toggleAdd(name: string) {
    setAdded((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  const filtered = CREATORS.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.handle.toLowerCase().includes(search.toLowerCase());
    const matchNiche = niche === "All" || c.niche === niche;
    return matchSearch && matchNiche;
  });

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <IconSearch size={13} style={{ position: "absolute", left: 9, color: "var(--sd-font-tertiary, #999)", pointerEvents: "none" }} />
            <input
              placeholder="Search creators…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                height: 32, width: "100%", paddingLeft: 30, paddingRight: 10,
                borderRadius: "var(--sd-radius-md, 8px)",
                border: "1px solid var(--sd-border-medium, #d1d5db)",
                background: "var(--sd-bg-tertiary, #f1f1f1)",
                fontSize: 13, fontFamily: "inherit",
                color: "var(--sd-font-primary, #111)", outline: "none",
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {NICHES.map((n) => (
            <button
              key={n}
              onClick={() => setNiche(n)}
              style={{
                padding: "4px 10px",
                borderRadius: 99,
                border: "1px solid",
                borderColor: niche === n ? "#333" : "var(--sd-border-default, #e5e7eb)",
                background: niche === n ? "#333" : "transparent",
                color: niche === n ? "#fff" : "var(--sd-font-secondary, #666)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {n === "All" ? `All (${CREATORS.length})` : n}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          <button
            onClick={() => setView("grid")}
            style={{
              width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: "1px solid",
              borderColor: view === "grid" ? "#333" : "var(--sd-border-default, #e5e7eb)",
              background: view === "grid" ? "#333" : "transparent",
              color: view === "grid" ? "#fff" : "var(--sd-font-tertiary, #999)",
              cursor: "pointer",
            }}
          >
            <IconLayoutGrid size={14} />
          </button>
          <button
            onClick={() => setView("compact")}
            style={{
              width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 6, border: "1px solid",
              borderColor: view === "compact" ? "#333" : "var(--sd-border-default, #e5e7eb)",
              background: view === "compact" ? "#333" : "transparent",
              color: view === "compact" ? "#fff" : "var(--sd-font-tertiary, #999)",
              cursor: "pointer",
            }}
          >
            <IconList size={14} />
          </button>
        </div>

        {added.size > 0 && (
          <Badge label={`${added.size} added`} tone="blue" dot />
        )}
      </div>

      {/* Result count */}
      <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", marginBottom: 12 }}>
        {filtered.length} creator{filtered.length !== 1 ? "s" : ""}
        {search && ` matching "${search}"`}
        {niche !== "All" && ` in ${niche}`}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: "48px 0", textAlign: "center", color: "var(--sd-font-tertiary, #999)", fontSize: 13 }}>
          No creators match your filters.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: view === "grid"
              ? "repeat(auto-fill, minmax(240px, 1fr))"
              : "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          {filtered.map((c) => (
            <CreatorCard
              key={c.name}
              name={c.name}
              handle={c.handle}
              avatarInitials={c.avatarInitials}
              avatarTone={c.avatarTone}
              platforms={c.platforms}
              stats={view === "grid" ? c.stats : undefined}
              status={c.status}
              variant={view === "grid" ? "full" : "compact"}
              onAdd={added.has(c.name) ? undefined : () => toggleAdd(c.name)}
              onMessage={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-grid",
  title: "CreatorGrid",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Discovery grid — searchable, filterable grid of CreatorCards with saved state, niche filters, and grid/compact toggle.",
  description:
    "The primary creator discovery surface. Renders `CreatorCard` components in a responsive auto-fill grid. Toolbar: search input, niche filter pills, grid/compact view toggle, saved count badge. Each card has Save and Add to campaign actions that update independently. Composes the `CreatorCard` Creator component with primitive Input, Badge, and Button.",
  demos: [
    {
      title: "Creator discovery grid",
      description: "Search, filter by niche, toggle grid/compact, save or add creators.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
