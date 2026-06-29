"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconStar,
  IconStarFilled,
  IconCurrencyDollar,
  IconPhoto,
  IconCalendar,
  IconChevronDown,
  IconChevronUp,
  IconBrandInstagram,
  IconBrandTiktok,
  IconTrendingUp,
  IconDownload,
  IconFilter,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type DealStatus = "completed" | "active" | "cancelled";

interface Deal {
  id: string;
  brandName: string;
  brandInitials: string;
  brandTone: string;
  campaign: string;
  category: string;
  platform: "instagram" | "tiktok";
  period: string;
  fee: number;
  deliverables: string;
  postsLive: number;
  avgER: string;
  status: DealStatus;
  brandRating: number;
  brandNote?: string;
}

const STATUS_META: Record<DealStatus, { label: string; tone: keyof typeof TONES }> = {
  completed: { label: "Completed", tone: "green"  },
  active:    { label: "Active",    tone: "blue"   },
  cancelled: { label: "Cancelled", tone: "red"    },
};

const DEALS: Deal[] = [
  { id: "d1", brandName: "Aura Labs",    brandInitials: "AL", brandTone: "yellow",    campaign: "Summer Glow",     category: "Skincare",  platform: "instagram", period: "Jun 2025",      fee: 2_800, deliverables: "2 Reels · 1 Feed · 2 Stories",  postsLive: 5, avgER: "9.4%", status: "active",    brandRating: 0 },
  { id: "d2", brandName: "FitLife",      brandInitials: "FL", brandTone: "green",     campaign: "Q1 Challenge",    category: "Fitness",   platform: "tiktok",    period: "Mar 2025",      fee: 1_500, deliverables: "3 TikToks",                      postsLive: 3, avgER: "6.8%", status: "completed", brandRating: 5, brandNote: "Priya absolutely crushed this — content was on-brand, on-time, and performed well above benchmark." },
  { id: "d3", brandName: "GlowCo",      brandInitials: "GC", brandTone: "pink",      campaign: "Winter Refresh",  category: "Skincare",  platform: "instagram", period: "Dec 2024",      fee: 2_200, deliverables: "1 Reel · 1 Feed · 3 Stories",   postsLive: 5, avgER: "7.2%", status: "completed", brandRating: 5, brandNote: "Amazing creator — very professional and easy to work with." },
  { id: "d4", brandName: "Wellnest",    brandInitials: "WN", brandTone: "turquoise", campaign: "Morning Ritual",  category: "Wellness",  platform: "instagram", period: "Sep 2024",      fee: 1_800, deliverables: "2 Reels · 2 Stories",           postsLive: 4, avgER: "8.1%", status: "completed", brandRating: 4, brandNote: "Great content, slight delay on final revision but communicated well." },
  { id: "d5", brandName: "NovaSkin",    brandInitials: "NS", brandTone: "purple",    campaign: "SPF Launch",      category: "Skincare",  platform: "instagram", period: "Jun 2024",      fee: 900,   deliverables: "1 Reel · 1 Feed",               postsLive: 2, avgER: "5.6%", status: "completed", brandRating: 4 },
  { id: "d6", brandName: "PureForm",    brandInitials: "PF", brandTone: "gray",      campaign: "Collab 2024",     category: "Fashion",   platform: "instagram", period: "Jan 2024",      fee: 600,   deliverables: "1 Feed",                         postsLive: 0, avgER: "—",    status: "cancelled", brandRating: 0 },
];

function StarRow({ n }: { n: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1,2,3,4,5].map((i) => (
        i <= n
          ? <IconStarFilled key={i} size={11} style={{ color: "#f59e0b" }} />
          : <IconStar       key={i} size={11} style={{ color: "var(--sd-border-default, #d1d5db)" }} />
      ))}
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter,   setFilter]   = useState<DealStatus | "all">("all");

  const visible = DEALS.filter((d) => filter === "all" || d.status === filter);
  const totalEarned = DEALS.filter((d) => d.status === "completed").reduce((s, d) => s + d.fee, 0);
  const activeCount = DEALS.filter((d) => d.status === "active").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 3 }}>Deal history</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{DEALS.length} campaigns · {activeCount} active</span>
          </div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export</Button>
      </div>

      {/* KPI strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Total earned",   value: `$${(totalEarned/1000).toFixed(1)}K`, tone: "green"  as const },
          { label: "Campaigns done", value: String(DEALS.filter((d) => d.status === "completed").length), tone: "blue" as const },
          { label: "Avg brand rating", value: (() => { const rated = DEALS.filter((d) => d.brandRating > 0); return rated.length ? (rated.reduce((s,d) => s + d.brandRating, 0) / rated.length).toFixed(1) : "—"; })(), tone: "yellow" as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "10px 12px", border: `1px solid ${TONES[tone].tint}`, borderRadius: 10, background: `${TONES[tone].tint}50` }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {(["all", "active", "completed", "cancelled"] as const).map((f) => {
          const active = filter === f;
          const tone = f === "all" ? null : STATUS_META[f].tone;
          return (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "3px 10px", borderRadius: 99, background: active ? (tone ? TONES[tone].tint : "#111") : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active && tone ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? (tone ? TONES[tone].text : "#fff") : "var(--sd-font-secondary, #555)" }}>
              {f === "all" ? "All" : STATUS_META[f].label}
            </button>
          );
        })}
      </div>

      {/* Deal list */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {visible.map((deal, i) => {
          const { label, tone } = STATUS_META[deal.status];
          const PIco  = deal.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
          const isOpen = expanded === deal.id;

          return (
            <div key={deal.id} style={{ borderBottom: i < visible.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", opacity: deal.status === "cancelled" ? 0.6 : 1 }}>
              <button onClick={() => setExpanded(isOpen ? null : deal.id)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <Avatar initials={deal.brandInitials} tone={deal.brandTone as any} size="sm" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>{deal.campaign}</div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{deal.brandName}</span>
                    <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>·</span>
                    <PIco size={10} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                    <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{deal.period}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 900 }}>${deal.fee.toLocaleString()}</div>
                  {deal.brandRating > 0 && <StarRow n={deal.brandRating} />}
                </div>
                <Badge label={label} tone={tone} size="sm" dot />
                {isOpen ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />}
              </button>

              {isOpen && (
                <div style={{ padding: "0 14px 14px 58px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", paddingTop: 10 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: deal.brandNote ? 10 : 0 }}>
                    {[
                      { icon: IconPhoto,           label: "Deliverables", value: deal.deliverables },
                      { icon: IconTrendingUp,      label: "Avg ER",       value: deal.avgER },
                      { icon: IconCurrencyDollar,  label: "Posts live",   value: String(deal.postsLive) },
                    ].map(({ icon: Icon, label: l, value }) => (
                      <div key={l}>
                        <div style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.04em", marginBottom: 2 }}>{l}</div>
                        <div style={{ fontSize: 11, fontWeight: 700 }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  {deal.brandNote && (
                    <div style={{ padding: "8px 10px", background: TONES.yellow.tint, borderRadius: 8, fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.5, fontStyle: "italic" }}>
                      "{deal.brandNote}" — {deal.brandName}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-deal-history",
  title: "CreatorDealHistory",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's chronological deal history — KPI strip (total earned, campaigns, avg rating), filterable list of past campaigns with expandable deliverables and brand review quotes.",
  description:
    "The creator's career record of brand collaborations. KPI strip: total earned ($9K), campaigns completed (4), avg brand rating (4.5★). Status filter chips: All / Active / Completed / Cancelled. Deal list accordion: brand avatar, campaign name, brand name + platform icon + period, fee amount, star rating (if rated), status badge; expand to see deliverables string, avg ER, posts live, and branded review quote in a yellow tint block. Cancelled deals dimmed to 60%. 6 seeded deals spanning Jan 2024 – Jun 2025. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator deal history",
      description: "Filter by status. Expand any deal to see deliverables, ER, and brand review quotes.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
