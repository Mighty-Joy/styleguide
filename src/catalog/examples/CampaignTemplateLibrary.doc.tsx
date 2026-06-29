"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCopy,
  IconSearch,
  IconPlus,
  IconCheck,
  IconStar,
  IconStarFilled,
  IconUsers,
  IconCurrencyDollar,
  IconPhoto,
  IconHeart,
  IconBrandInstagram,
  IconBrandTiktok,
  IconEdit,
  IconDots,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type TemplateCategory = "awareness" | "conversion" | "ugc" | "launch" | "evergreen";

interface CampaignTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  gradient: string;
  platforms: ("instagram" | "tiktok")[];
  creatorCount: number;
  avgBudget: string;
  deliverables: string;
  avgER: string;
  usedCount: number;
  starred: boolean;
  lastUsed: string;
}

const CATEGORY_META: Record<TemplateCategory, { label: string; tone: keyof typeof TONES }> = {
  awareness:  { label: "Awareness",  tone: "blue"   },
  conversion: { label: "Conversion", tone: "orange" },
  ugc:        { label: "UGC",        tone: "green"  },
  launch:     { label: "Launch",     tone: "purple" },
  evergreen:  { label: "Evergreen",  tone: "gray"   },
};

const TEMPLATES: CampaignTemplate[] = [
  {
    id: "t1", name: "Summer skincare blitz", category: "awareness",
    description: "High-reach awareness push using 3 micro + 2 mid creators. Golden-hour aesthetic, dewy finish creative direction. Proven across 3 campaigns.",
    gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", platforms: ["instagram","tiktok"],
    creatorCount: 5, avgBudget: "$38–45K", deliverables: "2 Reels + 1 Feed per creator", avgER: "7.4%", usedCount: 3, starred: true, lastUsed: "Jun 2025",
  },
  {
    id: "t2", name: "Product launch spike", category: "launch",
    description: "Concentrated 2-week launch window. 1 macro + 4 micro. Coordinated go-live date with email and paid social amplification.",
    gradient: "linear-gradient(135deg,#ede9fe,#7c3aed)", platforms: ["instagram","tiktok"],
    creatorCount: 5, avgBudget: "$55–65K", deliverables: "1 Reel + 1 Story per creator", avgER: "5.1%", usedCount: 1, starred: false, lastUsed: "Apr 2025",
  },
  {
    id: "t3", name: "UGC asset harvest", category: "ugc",
    description: "Content-first campaign. 8 nano creators submit raw footage for brand to repurpose in paid ads. 30-day usage rights included.",
    gradient: "linear-gradient(135deg,#d1fae5,#059669)", platforms: ["instagram"],
    creatorCount: 8, avgBudget: "$12–18K", deliverables: "3 raw video clips + 5 photos", avgER: "8.9%", usedCount: 5, starred: true, lastUsed: "May 2025",
  },
  {
    id: "t4", name: "Affiliate code push", category: "conversion",
    description: "Conversion-focused. All creators get unique discount codes. Commission structure: 15% of attributed revenue for 60 days.",
    gradient: "linear-gradient(135deg,#fed7aa,#ea580c)", platforms: ["instagram","tiktok"],
    creatorCount: 6, avgBudget: "$20–30K + commission", deliverables: "2 posts per creator (any format)", avgER: "4.8%", usedCount: 2, starred: false, lastUsed: "Mar 2025",
  },
  {
    id: "t5", name: "Always-on evergreen", category: "evergreen",
    description: "Rolling quarterly program. 3 anchor creators post 1× per month with consistent brand messaging. Retainer-style payments.",
    gradient: "linear-gradient(135deg,#e0f2fe,#0ea5e9)", platforms: ["instagram"],
    creatorCount: 3, avgBudget: "$8–12K/month", deliverables: "1 post per creator per month", avgER: "6.2%", usedCount: 4, starred: false, lastUsed: "Jun 2025",
  },
];

/* ---- Demo ---- */
function Demo() {
  const [query,    setQuery]    = useState("");
  const [catFil,   setCatFil]   = useState<TemplateCategory | "all">("all");
  const [templates, setTemplates] = useState<CampaignTemplate[]>(TEMPLATES);
  const [cloned,   setCloned]   = useState<string | null>(null);

  function toggleStar(id: string) {
    setTemplates((prev) => prev.map((t) => t.id === id ? { ...t, starred: !t.starred } : t));
  }
  function clone(id: string) {
    setCloned(id);
    setTimeout(() => setCloned(null), 1800);
  }

  const visible = templates.filter((t) => {
    if (catFil !== "all" && t.category !== catFil) return false;
    if (query && !t.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const starred   = visible.filter((t) => t.starred);
  const unstarred = visible.filter((t) => !t.starred);

  function TemplateCard({ t }: { t: CampaignTemplate }) {
    const { label, tone } = CATEGORY_META[t.category];
    const isCloned = cloned === t.id;

    return (
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {/* Thumbnail */}
        <div style={{ height: 80, background: t.gradient, position: "relative" }}>
          <div style={{ position: "absolute", top: 8, left: 10, display: "flex", gap: 5 }}>
            <Badge label={label} tone={tone} size="sm" />
          </div>
          <div style={{ position: "absolute", top: 8, right: 10, display: "flex", gap: 5 }}>
            <button onClick={() => toggleStar(t.id)}
              style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(255,255,255,0.8)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {t.starred
                ? <IconStarFilled size={12} style={{ color: "#f59e0b" }} />
                : <IconStar       size={12} style={{ color: "#888" }} />}
            </button>
          </div>
        </div>

        <div style={{ padding: "12px 14px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 3 }}>{t.name}</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", lineHeight: 1.5, marginBottom: 10 }}>{t.description}</div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 10 }}>
            {[
              { icon: IconUsers,          value: `${t.creatorCount} creators` },
              { icon: IconCurrencyDollar, value: t.avgBudget              },
              { icon: IconPhoto,          value: t.deliverables.split("+")[0].trim() },
              { icon: IconHeart,          value: t.avgER + " avg ER"      },
            ].map(({ icon: Icon, value }) => (
              <div key={value} style={{ textAlign: "center" }}>
                <Icon size={11} style={{ color: "var(--sd-font-tertiary, #999)", display: "block", margin: "0 auto 2px" }} />
                <div style={{ fontSize: 9, fontWeight: 700, color: "var(--sd-font-secondary, #555)", lineHeight: 1.3 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Platform + usage */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
            <div style={{ display: "flex", gap: 4 }}>
              {t.platforms.map((p) => (
                p === "instagram"
                  ? <IconBrandInstagram key={p} size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                  : <IconBrandTiktok   key={p} size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
              ))}
            </div>
            <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Used {t.usedCount}× · Last {t.lastUsed}</span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 6 }}>
            <Button variant="primary" size="sm" leftIcon={isCloned ? <IconCheck size={11} /> : <IconCopy size={11} />} onClick={() => clone(t.id)} style={{ flex: 1 }}>
              {isCloned ? "Cloned!" : "Use template"}
            </Button>
            <button style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconEdit size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Campaign templates</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Start a new campaign from a proven template</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconPlus size={12} />}>New template</Button>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 9, padding: "7px 12px", marginBottom: 12 }}>
        <IconSearch size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search templates…"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 12, background: "transparent", fontFamily: "inherit" }} />
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={() => setCatFil("all")}
          style={{ padding: "3px 10px", borderRadius: 99, background: catFil === "all" ? "#111" : "var(--sd-bg-secondary, #f1f1f1)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: catFil === "all" ? "#fff" : "var(--sd-font-secondary, #555)" }}>
          All
        </button>
        {(Object.keys(CATEGORY_META) as TemplateCategory[]).map((cat) => {
          const { label, tone } = CATEGORY_META[cat];
          const active = catFil === cat;
          return (
            <button key={cat} onClick={() => setCatFil(active ? "all" : cat)}
              style={{ padding: "3px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? TONES[tone].text : "var(--sd-font-secondary, #555)" }}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Starred */}
      {starred.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>
            <IconStarFilled size={11} style={{ color: "#f59e0b" }} />STARRED
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {starred.map((t) => <TemplateCard key={t.id} t={t} />)}
          </div>
        </div>
      )}

      {/* All / unstarred */}
      {unstarred.length > 0 && (
        <div>
          {starred.length > 0 && <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", marginBottom: 8 }}>ALL TEMPLATES</div>}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {unstarred.map((t) => <TemplateCard key={t.id} t={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-template-library",
  title: "CampaignTemplateLibrary",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Reusable campaign template library — star-filtered 2-column grid with search, category chips, gradient thumbnails, key stats, and one-click 'Use template' cloning.",
  description:
    "Speeds up campaign creation by letting brands clone from their best-performing past campaigns. Header: title, description, New template button. Search input. Category filter chips: All + Awareness / Conversion / UGC / Launch / Evergreen in tone-matched colors. Two sections: STARRED (gradient cards with gold star) and ALL TEMPLATES. Each template card: gradient thumbnail with category badge, star toggle button, template name, description, 4-stat grid (creator count, avg budget, deliverables, avg ER), platform icons, usage count + last-used date, 'Use template' primary CTA (shows green check for 1.8s on click), edit icon button. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign template library",
      description: "Filter by category, search by name, star/unstar templates, and click 'Use template' to see the clone confirmation.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
