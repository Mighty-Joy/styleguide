"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconSearch,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconStar,
  IconStarFilled,
  IconUserPlus,
  IconDots,
  IconTrendingUp,
  IconTrendingDown,
  IconFilter,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type RelStatus = "active" | "past" | "invited" | "blocked";
type SortKey   = "name" | "campaigns" | "er" | "spend";

interface CreatorRow {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  handle: string;
  platform: "instagram" | "tiktok" | "youtube";
  followers: string;
  status: RelStatus;
  campaigns: number;
  avgER: number;
  totalSpend: number;
  lastActive: string;
  stars: number;
  trending: "up" | "down" | "flat";
  tags: string[];
}

const CREATORS: CreatorRow[] = [
  { id: "c1", name: "Priya Nair",   initials: "PN", tone: "green",     handle: "@priya.creates", platform: "instagram", followers: "248K", status: "active",  campaigns: 4, avgER: 8.6,  totalSpend: 14_400, lastActive: "Jun 2025",  stars: 5, trending: "up",   tags: ["Skincare", "Wellness"] },
  { id: "c2", name: "Hana Kim",     initials: "HK", tone: "pink",      handle: "@hanakim_",      platform: "instagram", followers: "184K", status: "active",  campaigns: 3, avgER: 7.1,  totalSpend: 10_200, lastActive: "Jun 2025",  stars: 5, trending: "up",   tags: ["Beauty", "Lifestyle"] },
  { id: "c3", name: "Diego Santos", initials: "DS", tone: "orange",    handle: "@diegosantos",   platform: "tiktok",    followers: "620K", status: "active",  campaigns: 2, avgER: 5.8,  totalSpend: 7_200,  lastActive: "Jun 2025",  stars: 4, trending: "flat", tags: ["Lifestyle", "Fitness"] },
  { id: "c4", name: "Marcus Webb",  initials: "MW", tone: "purple",    handle: "@marcuswebb",    platform: "tiktok",    followers: "1.2M", status: "past",    campaigns: 3, avgER: 3.4,  totalSpend: 22_000, lastActive: "Mar 2025",  stars: 3, trending: "down", tags: ["Comedy", "Lifestyle"] },
  { id: "c5", name: "Aisha Obi",    initials: "AO", tone: "turquoise", handle: "@aishaobi",      platform: "instagram", followers: "91K",  status: "invited", campaigns: 1, avgER: 6.2,  totalSpend: 3_800,  lastActive: "Jun 2025",  stars: 4, trending: "up",   tags: ["Skincare", "GRWM"] },
  { id: "c6", name: "Luca Ferrari", initials: "LF", tone: "sky",       handle: "@lucaferrari",   platform: "youtube",   followers: "340K", status: "past",    campaigns: 1, avgER: 4.1,  totalSpend: 5_600,  lastActive: "Jan 2025",  stars: 4, trending: "flat", tags: ["Tech", "Reviews"] },
  { id: "c7", name: "Zara Amani",   initials: "ZA", tone: "red",       handle: "@zara.amani",    platform: "instagram", followers: "78K",  status: "blocked", campaigns: 1, avgER: 2.1,  totalSpend: 2_000,  lastActive: "Oct 2024",  stars: 1, trending: "down", tags: ["Beauty"] },
];

const STATUS_META: Record<RelStatus, { label: string; tone: keyof typeof TONES }> = {
  active:  { label: "Active",   tone: "green"  },
  past:    { label: "Past",     tone: "gray"   },
  invited: { label: "Invited",  tone: "blue"   },
  blocked: { label: "Blocked",  tone: "red"    },
};

const PLATFORM_ICON: Record<string, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

function fmtMoney(n: number) {
  return n >= 1000 ? `$${(n / 1000).toFixed(0)}K` : `$${n}`;
}

function StarMini({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 1 }}>
      {[1,2,3,4,5].map((i) => (
        i <= n
          ? <IconStarFilled key={i} size={9} style={{ color: "#f59e0b" }} />
          : <IconStar       key={i} size={9} style={{ color: "var(--sd-border-default, #d1d5db)" }} />
      ))}
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [query,   setQuery]   = useState("");
  const [statFil, setStatFil] = useState<RelStatus | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("campaigns");

  const filtered = CREATORS
    .filter((c) => {
      if (statFil && c.status !== statFil) return false;
      if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.handle.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortKey === "name")      return a.name.localeCompare(b.name);
      if (sortKey === "campaigns") return b.campaigns - a.campaigns;
      if (sortKey === "er")        return b.avgER - a.avgER;
      if (sortKey === "spend")     return b.totalSpend - a.totalSpend;
      return 0;
    });

  const counts = (["active","past","invited","blocked"] as RelStatus[]).map((s) => ({
    status: s, count: CREATORS.filter((c) => c.status === s).length,
  }));

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Creator roster</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Aura Labs · {CREATORS.length} creators</div>
        </div>
        <Button variant="primary" size="sm" leftIcon={<IconUserPlus size={12} />}>Add creator</Button>
      </div>

      {/* Search + filter bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 9, padding: "7px 12px" }}>
          <IconSearch size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search creators…"
            style={{ flex: 1, border: "none", outline: "none", fontSize: 12, background: "transparent", fontFamily: "inherit" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 9, padding: "7px 12px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary, #555)" }}>
          <IconFilter size={12} />Sort: <span style={{ fontWeight: 800 }}>{sortKey}</span>
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
            style={{ position: "absolute", opacity: 0, fontSize: 12 }}>
            {(["campaigns","er","spend","name"] as SortKey[]).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>

      {/* Status filter chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={() => setStatFil(null)}
          style={{ padding: "3px 10px", borderRadius: 99, background: !statFil ? "#111" : "var(--sd-bg-secondary, #f1f1f1)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: !statFil ? "#fff" : "var(--sd-font-secondary, #555)" }}>
          All · {CREATORS.length}
        </button>
        {counts.map(({ status, count }) => {
          const { label, tone } = STATUS_META[status];
          const active = statFil === status;
          return (
            <button key={status} onClick={() => setStatFil(active ? null : status)}
              style={{ padding: "3px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? TONES[tone].text : "var(--sd-font-secondary, #555)" }}>
              {label} · {count}
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              {["Creator","Status","Campaigns","Avg ER","Total spend","Rating",""].map((h) => (
                <th key={h} style={{ padding: "8px 12px", textAlign: h === "" ? "center" : "left", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const PIco = PLATFORM_ICON[c.platform];
              const { tone, label } = STATUS_META[c.status];
              return (
                <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", opacity: c.status === "blocked" ? 0.6 : 1 }}>
                  <td style={{ padding: "10px 12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <Avatar initials={c.initials} tone={c.tone} size="sm" />
                      <div>
                        <div style={{ fontWeight: 700 }}>{c.name}</div>
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          <PIco size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{c.handle} · {c.followers}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px" }}><Badge label={label} tone={tone} size="sm" dot /></td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, textAlign: "center" }}>{c.campaigns}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                      <span style={{ fontWeight: 800, color: c.avgER >= 5 ? TONES.green.text : c.avgER >= 3 ? "var(--sd-font-primary, #111)" : TONES.red.text }}>{c.avgER}%</span>
                      {c.trending === "up"   && <IconTrendingUp   size={11} style={{ color: TONES.green.text }} />}
                      {c.trending === "down" && <IconTrendingDown size={11} style={{ color: TONES.red.text   }} />}
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, textAlign: "center" }}>{fmtMoney(c.totalSpend)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}><StarMini n={c.stars} /></td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    {c.status !== "blocked" && (
                      <Button variant="secondary" size="sm" leftIcon={<IconUserPlus size={10} />}>Invite</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-creator-roster",
  title: "BrandCreatorRoster",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand's master creator CRM — searchable, filterable table of all creators by relationship status (active/past/invited/blocked) with ER, spend, campaigns, and ratings.",
  description:
    "The brand's running list of every creator they've collaborated with. Header: roster title, total count, Add creator CTA. Search input + sort dropdown (campaigns / ER / spend / name). Status filter chips: All + active / past / invited / blocked with counts. Table: creator avatar + handle + follower count, status badge, campaign count, avg ER (green ≥5% / red <3%) with trend arrow (up/down), total spend, star rating, Invite action button. Blocked creators are dimmed to 60% opacity. Live filter and sort on all dimensions. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Brand creator roster",
      description: "Search by name or handle. Filter by status chip. Sort by campaigns, ER, spend, or name.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
