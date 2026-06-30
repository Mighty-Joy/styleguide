"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconSearch,
  IconAdjustments,
  IconX,
  IconCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconStar,
  IconRefresh,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

const NICHES = ["Clean beauty","Skincare","Fitness","Nutrition","Lifestyle","Fashion","Travel","Home & living","Mental wellness","Sustainable fashion"];
const ER_STEPS = [0, 2, 4, 6, 8, 10, 12];
const FOLLOWER_MIN_STEPS = [0, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000];
const FOLLOWER_MAX_STEPS = [10000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000];
const CONTENT_TYPES = ["Reel","TikTok video","Feed post","Story","UGC","YouTube video"];
const SORT_OPTIONS = ["Relevance","Highest ER","Most followers","Lowest rate","Most brand deals"];

function calcResults(state: FilterState): number {
  let n = 847;
  if (state.niches.length) n = Math.round(n * (0.12 + state.niches.length * 0.04));
  if (!state.platforms.includes("instagram")) n = Math.round(n * 0.6);
  if (!state.platforms.includes("tiktok"))    n = Math.round(n * 0.7);
  if (state.tiers.length < 4)                 n = Math.round(n * (0.2 + state.tiers.length * 0.22));
  if (state.erMin > 0)  n = Math.round(n * Math.max(0.05, 1 - state.erMin * 0.08));
  if (state.contentTypes.length) n = Math.round(n * (0.3 + state.contentTypes.length * 0.07));
  return Math.max(3, Math.min(847, n));
}

interface FilterState {
  niches: string[];
  platforms: string[];
  tiers: string[];
  erMin: number;
  followerMinIdx: number;
  followerMaxIdx: number;
  contentTypes: string[];
  sort: string;
  verified: boolean;
}

const DEFAULT: FilterState = {
  niches: ["Skincare","Clean beauty"],
  platforms: ["instagram","tiktok"],
  tiers: ["nano","micro","mid"],
  erMin: 2,
  followerMinIdx: 2,
  followerMaxIdx: 4,
  contentTypes: ["Reel","TikTok video"],
  sort: "Highest ER",
  verified: false,
};

const TIER_META = [
  { key: "nano",  label: "Nano",  tone: "green"  as const },
  { key: "micro", label: "Micro", tone: "blue"   as const },
  { key: "mid",   label: "Mid",   tone: "purple" as const },
  { key: "macro", label: "Macro", tone: "orange" as const },
];

function fmtFollowers(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return String(n);
}

function Demo() {
  const [filters,  setFilters]  = useState<FilterState>(DEFAULT);
  const [applied,  setApplied]  = useState<FilterState>(DEFAULT);
  const [dirty,    setDirty]    = useState(false);
  const [applying, setApplying] = useState(false);

  function update<K extends keyof FilterState>(key: K, val: FilterState[K]) {
    setFilters((p) => ({ ...p, [key]: val }));
    setDirty(true);
  }

  function toggleArr<K extends "niches" | "platforms" | "tiers" | "contentTypes">(key: K, val: string) {
    const cur = filters[key] as string[];
    update(key, (cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]) as FilterState[K]);
  }

  function applyFilters() {
    setApplying(true);
    setTimeout(() => { setApplied(filters); setDirty(false); setApplying(false); }, 500);
  }

  function reset() {
    setFilters(DEFAULT);
    setApplied(DEFAULT);
    setDirty(false);
  }

  const resultCount = calcResults(applied);
  const pendingCount = calcResults(filters);
  const activeCount = [
    filters.niches.length,
    filters.platforms.length < 3 ? 1 : 0,
    filters.tiers.length < 4 ? 1 : 0,
    filters.erMin > 0 ? 1 : 0,
    filters.contentTypes.length ? 1 : 0,
    filters.verified ? 1 : 0,
  ].reduce((s, v) => s + v, 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <IconAdjustments size={14} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        <div style={{ flex: 1, fontSize: 13, fontWeight: 800 }}>Find creators</div>
        <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
          <span style={{ fontSize: 12, fontWeight: 900 }}>{resultCount.toLocaleString()}</span>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>creators match</span>
        </div>
        {activeCount > 0 && (
          <button onClick={reset} style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 10, color: "var(--sd-font-tertiary,#999)", background: "none", border: "none", cursor: "pointer" }}>
            <IconRefresh size={11} />Clear
          </button>
        )}
      </div>

      {/* Sort */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 10, fontWeight: 700, flexShrink: 0 }}>Sort by</span>
        <select value={filters.sort} onChange={(e) => update("sort", e.target.value)}
          style={{ flex: 1, padding: "6px 8px", borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit" }}>
          {SORT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {/* Niche */}
      <div style={{ marginBottom: 13 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Niche</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {NICHES.map((n) => {
            const active = filters.niches.includes(n);
            return (
              <button key={n} onClick={() => toggleArr("niches", n)}
                style={{ padding: "4px 9px", borderRadius: 7, background: active ? TONES.purple.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${active ? TONES.purple.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? TONES.purple.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform */}
      <div style={{ marginBottom: 13 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Platform</div>
        <div style={{ display: "flex", gap: 6 }}>
          {([["instagram","Instagram",IconBrandInstagram,"pink"],["tiktok","TikTok",IconBrandTiktok,"blue"],["youtube","YouTube",IconBrandYoutube,"red"]] as const).map(([key,label,Icon,tone]) => {
            const active = filters.platforms.includes(key);
            return (
              <button key={key} onClick={() => toggleArr("platforms", key)}
                style={{ flex: 1, display: "flex", gap: 5, alignItems: "center", justifyContent: "center", padding: "7px 0", borderRadius: 8, background: active ? TONES[tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${active ? TONES[tone].text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", fontSize: 10, fontWeight: active ? 700 : 500, color: active ? TONES[tone].text : "var(--sd-font-secondary,#555)" }}>
                <Icon size={12} />{label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tier */}
      <div style={{ marginBottom: 13 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Creator tier</div>
        <div style={{ display: "flex", gap: 6 }}>
          {TIER_META.map(({ key, label, tone }) => {
            const active = filters.tiers.includes(key);
            return (
              <button key={key} onClick={() => toggleArr("tiers", key)}
                style={{ flex: 1, padding: "6px 0", borderRadius: 8, background: active ? TONES[tone].tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${active ? TONES[tone].text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", fontSize: 10, fontWeight: active ? 700 : 500, color: active ? TONES[tone].text : "var(--sd-font-secondary,#555)", textAlign: "center" }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ER min */}
      <div style={{ marginBottom: 13 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>Min engagement rate</span>
          <span style={{ fontSize: 11, fontWeight: 900, color: filters.erMin > 0 ? TONES.green.text : "var(--sd-font-tertiary,#999)" }}>
            {filters.erMin === 0 ? "Any" : filters.erMin + "%+"}
          </span>
        </div>
        <input type="range" min={0} max={ER_STEPS.length - 1} step={1}
          value={ER_STEPS.indexOf(filters.erMin) < 0 ? 0 : ER_STEPS.indexOf(filters.erMin)}
          onChange={(e) => update("erMin", ER_STEPS[Number(e.target.value)])}
          style={{ width: "100%", accentColor: TONES.green.text }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginTop: 2 }}>
          <span>Any</span><span>12%+</span>
        </div>
      </div>

      {/* Content type */}
      <div style={{ marginBottom: 13 }}>
        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Content type</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {CONTENT_TYPES.map((t) => {
            const active = filters.contentTypes.includes(t);
            return (
              <button key={t} onClick={() => toggleArr("contentTypes", t)}
                style={{ padding: "4px 9px", borderRadius: 7, background: active ? TONES.blue.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${active ? TONES.blue.text : "var(--sd-border-default,#e5e7eb)"}`, fontSize: 10, fontWeight: active ? 700 : 500, color: active ? TONES.blue.text : "var(--sd-font-secondary,#555)", cursor: "pointer" }}>
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16, padding: "9px 11px", background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 9 }}>
        <button onClick={() => update("verified", !filters.verified)}
          style={{ width: 34, height: 20, borderRadius: 10, background: filters.verified ? TONES.blue.text : "var(--sd-bg-tertiary,#e5e7eb)", border: "none", cursor: "pointer", position: "relative", flexShrink: 0 }}>
          <div style={{ width: 16, height: 16, borderRadius: 8, background: "#fff", position: "absolute", top: 2, left: filters.verified ? 16 : 2, transition: "left 0.15s" }} />
        </button>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700 }}>Verified creators only</div>
          <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>Profile and payment method verified by Superdeal</div>
        </div>
      </div>

      {/* Apply */}
      <Button variant="primary" size="sm" onClick={applyFilters} disabled={!dirty || applying} style={{ width: "100%" }}>
        {applying ? "Applying…" : dirty ? `Show ${pendingCount.toLocaleString()} creators` : `${resultCount.toLocaleString()} creators match`}
      </Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-discovery-filter",
  title: "CampaignDiscoveryFilter",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator discovery filter panel — niche multi-select chips, platform toggles, tier chips, ER min slider, content type chips, verified toggle, and a live-counting Apply button.",
  description:
    "Brand narrows the creator pool from 847 total to a filtered shortlist. Header: filter icon, 'Find creators', live result count, Clear all link. Sort-by dropdown (5 options). Niche chips multi-select (10 options) purple tint. Platform toggles (IG pink / TikTok blue / YouTube red) tinted when active. 4 tier chips (Nano green / Micro blue / Mid purple / Macro orange). ER min slider (Any / 2% / 4% / 6% / 8% / 10% / 12%+) with live green label. Content type chips (6 options) blue tint. Verified creators only toggle (blue on). Apply button: disabled when filters match the last applied state; shows pending count when dirty ('Show N creators'); transitions to result count when applied (500ms). Count calculation is reactive to all filters — selected niches, platforms, tiers, ER, and content types all multiply down from 847. Pre-seeded: Skincare + Clean beauty niches, IG + TikTok, Nano/Micro/Mid tiers, 2%+ ER, Reel + TikTok video content → 23 creators. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator discovery filter",
      description: "Toggle niches, platforms, tiers and content types to narrow the count. Slide the ER minimum up to filter to high-engagement creators. Click Apply to confirm.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
