"use client";

import React from "react";
import { CreatorCard } from "./CreatorCard";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Demo data                                                             */
/* ------------------------------------------------------------------ */

const CREATORS = [
  {
    name: "Priya Nair",    handle: "@priya",      avatarInitials: "P", avatarTone: "purple" as keyof typeof TONES,
    platforms: { instagram: 340000, tiktok: 820000 },
    status: "active" as const,
    stats: [
      { label: "Total followers", value: "1.16M" },
      { label: "Avg. engagement", value: "7.4%" },
      { label: "Avg. views",      value: "284K" },
      { label: "Active deals",    value: "3" },
    ],
  },
  {
    name: "Maya Rivers",   handle: "@mayarivers", avatarInitials: "M", avatarTone: "pink" as keyof typeof TONES,
    platforms: { instagram: 128000, tiktok: 2300000 },
    status: "active" as const,
    stats: [
      { label: "Total followers", value: "2.43M" },
      { label: "Avg. engagement", value: "9.1%" },
      { label: "Avg. views",      value: "128K" },
      { label: "Active deals",    value: "1" },
    ],
  },
  {
    name: "Leo Park",      handle: "@leopark",    avatarInitials: "L", avatarTone: "blue" as keyof typeof TONES,
    platforms: { youtube: 540000, instagram: 41000 },
    status: "invited" as const,
    stats: [
      { label: "Total followers", value: "581K" },
      { label: "Avg. engagement", value: "6.8%" },
      { label: "Avg. views",      value: "56K" },
      { label: "Active deals",    value: "0" },
    ],
  },
  {
    name: "Nina Cole",     handle: "@ninacole",   avatarInitials: "N", avatarTone: "green" as keyof typeof TONES,
    platforms: { tiktok: 86000, instagram: 22000 },
    status: "active" as const,
    stats: [
      { label: "Total followers", value: "108K" },
      { label: "Avg. engagement", value: "12.4%" },
      { label: "Avg. views",      value: "44K" },
      { label: "Active deals",    value: "2" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Grid showcase                                                         */
/* ------------------------------------------------------------------ */

function FullCardGrid() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {CREATORS.map((c) => (
        <CreatorCard key={c.name} {...c} />
      ))}
    </div>
  );
}

function CompactCardRow() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {CREATORS.slice(0, 3).map((c) => (
        <CreatorCard key={c.name} {...c} variant="compact" />
      ))}
    </div>
  );
}

function DiscoverGrid() {
  return (
    <div>
      <div style={{ marginBottom: 12, fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>
        Suggested for Atlas X campaign
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
        {CREATORS.map((c) => (
          <CreatorCard
            key={c.name}
            {...c}
            status="inactive"
            onMessage={() => {}}
            onAdd={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc export                                                            */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "creator-card",
  title: "CreatorCard",
  group: "Creator",
  status: "stable",
  summary: "Bordered outline creator card with avatar, platform chips, stats grid, and footer actions. Full and compact variants.",
  description:
    "The standard creator card rendered in catalog, search results, and campaign pickers. A 3px accent bar at the top anchors to `--sd-accent` (brand green). The status badge (Active / Invited / Inactive) sits right of the identity. Stats grid shows up to 4 metrics in a 2×2 layout (full variant only). Footer renders Save + Add by default, or custom `onMessage`/`onAdd` callbacks for context-specific actions (discover → message + add). Compact variant drops the stats grid and narrows to 220px for dense layouts.",
  demos: [
    {
      title: "Full variant — 4-stat grid",
      description: "Default bordered card with platform chips, stats (followers, ER%, avg views, deals), and Save/Add footer.",
      block: true,
      render: () => <FullCardGrid />,
    },
    {
      title: "Compact variant",
      description: "Narrower (220px), no stats grid. For dense lists, sidebars, or inline pickers.",
      block: true,
      render: () => <CompactCardRow />,
    },
    {
      title: "Discover / search context",
      description: "Message + Add actions replace Save. Status set to inactive (not yet in a campaign).",
      block: true,
      render: () => <DiscoverGrid />,
    },
  ],
  props: [
    {
      rows: [
        { name: "name",            type: "string",   required: true,  description: "Creator display name." },
        { name: "handle",          type: "string",   required: true,  description: "Social handle (@...)." },
        { name: "avatarInitials",  type: "string",   required: true,  description: "1–2 letter initials for the avatar circle." },
        { name: "avatarTone",      type: "keyof TONES", required: true, description: "Color tone for the avatar background." },
        { name: "platforms",       type: "Partial<Record<CreatorCardPlatform, number>>", required: true, description: "Platform → follower count map." },
        { name: "stats",           type: "CreatorCardStat[]", required: false, description: "Up to 4 { label, value } stats shown in the 2×2 grid (full variant)." },
        { name: "status",          type: "'active' | 'invited' | 'inactive'", required: false, default: "'active'", description: "Creator status badge." },
        { name: "variant",         type: "'full' | 'compact'", required: false, default: "'full'", description: "Full shows stats grid; compact is narrower without stats." },
        { name: "onMessage",       type: "() => void", required: false, description: "If provided, replaces the default Save button with a Message button." },
        { name: "onAdd",           type: "() => void", required: false, description: "If provided, replaces the default Add button." },
        { name: "onMore",          type: "() => void", required: false, description: "If provided, shows a ⋯ more button at the end of the footer." },
        { name: "onClick",         type: "() => void", required: false, description: "Click handler for the card itself." },
      ],
    },
  ],
};

export default doc;
