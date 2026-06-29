"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconClock,
  IconAlertCircle,
  IconSearch,
  IconChevronRight,
  IconCurrencyDollar,
  IconCalendar,
  IconBrandInstagram,
  IconBrandTiktok,
  IconStar,
  IconStarFilled,
  IconExternalLink,
  IconTrash,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type AppStatus = "pending" | "reviewing" | "approved" | "rejected" | "waitlisted";

interface Application {
  id: string;
  brand: string;
  campaign: string;
  fee: string;
  platform: ("instagram" | "tiktok")[];
  status: AppStatus;
  appliedAt: string;
  responseEta: string;
  category: string;
  gradient: string;
  brandRating: number;
  note?: string;
}

const STATUS_META: Record<AppStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  pending:    { label: "Pending review",   tone: "gray",   icon: IconClock        },
  reviewing:  { label: "Under review",     tone: "blue",   icon: IconAlertCircle  },
  approved:   { label: "Approved!",        tone: "green",  icon: IconCheck        },
  rejected:   { label: "Not selected",     tone: "red",    icon: IconX            },
  waitlisted: { label: "Waitlisted",       tone: "yellow", icon: IconClock        },
};

const APPS: Application[] = [
  {
    id: "a1", brand: "Aura Labs", campaign: "Summer Glow Campaign", fee: "$1,200–$1,800",
    platform: ["instagram", "tiktok"], status: "approved", appliedAt: "Jun 20",
    responseEta: "Responded Jun 24", category: "Skincare",
    gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", brandRating: 5,
    note: "Great fit for this campaign — we'd love to work with you. Contract will be sent shortly.",
  },
  {
    id: "a2", brand: "NovaSkin", campaign: "Clean Beauty Q3", fee: "$900",
    platform: ["instagram"], status: "reviewing", appliedAt: "Jun 25",
    responseEta: "Expected by Jul 3", category: "Beauty",
    gradient: "linear-gradient(135deg,#fce7f3,#db2777)", brandRating: 4,
  },
  {
    id: "a3", brand: "FitLife", campaign: "Q3 Wellness Push", fee: "$650",
    platform: ["tiktok"], status: "waitlisted", appliedAt: "Jun 18",
    responseEta: "Notified Jun 26", category: "Wellness",
    gradient: "linear-gradient(135deg,#d1fae5,#10b981)", brandRating: 4,
    note: "You're on our waitlist — we'll reach out if a spot opens up.",
  },
  {
    id: "a4", brand: "Luminos", campaign: "Festival Beauty Look", fee: "$400",
    platform: ["instagram", "tiktok"], status: "rejected", appliedAt: "Jun 10",
    responseEta: "Responded Jun 18", category: "Makeup",
    gradient: "linear-gradient(135deg,#ede9fe,#7c3aed)", brandRating: 3,
    note: "Thank you for applying — we went with creators with a stronger makeup-focused audience for this campaign.",
  },
  {
    id: "a5", brand: "Wellnest", campaign: "Mindful Living Series", fee: "$1,100",
    platform: ["instagram"], status: "pending", appliedAt: "Jun 28",
    responseEta: "Expected by Jul 5", category: "Wellness",
    gradient: "linear-gradient(135deg,#e0f2fe,#0ea5e9)", brandRating: 5,
  },
];

const FILTER_TABS: { key: AppStatus | "all"; label: string }[] = [
  { key: "all",        label: "All"        },
  { key: "approved",   label: "Approved"   },
  { key: "reviewing",  label: "Reviewing"  },
  { key: "waitlisted", label: "Waitlisted" },
  { key: "pending",    label: "Pending"    },
  { key: "rejected",   label: "Rejected"   },
];

/* ---- Demo ---- */
function Demo() {
  const [filter,  setFilter]  = useState<AppStatus | "all">("all");
  const [query,   setQuery]   = useState("");
  const [apps,    setApps]    = useState<Application[]>(APPS);
  const [expanded, setExpanded] = useState<string | null>("a1");

  function remove(id: string) { setApps((prev) => prev.filter((a) => a.id !== id)); }

  const visible = apps.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (query && !a.campaign.toLowerCase().includes(query.toLowerCase()) && !a.brand.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const approved   = apps.filter((a) => a.status === "approved").length;
  const reviewing  = apps.filter((a) => a.status === "reviewing" || a.status === "pending").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>My applications</div>
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <Badge label={`${approved} approved`} tone="green" size="sm" dot />
            <Badge label={`${reviewing} awaiting response`} tone="blue" size="sm" dot />
          </div>
        </div>
        <Button variant="secondary" size="sm">Browse campaigns</Button>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "7px 12px", marginBottom: 10 }}>
        <IconSearch size={13} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by brand or campaign…"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 12, background: "transparent", fontFamily: "inherit" }} />
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 5, marginBottom: 14, overflowX: "auto" }}>
        {FILTER_TABS.map(({ key, label }) => {
          const active = filter === key;
          const count = key === "all" ? apps.length : apps.filter((a) => a.status === key).length;
          return (
            <button key={key} onClick={() => setFilter(key)}
              style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 10px", borderRadius: 99, background: active ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? "#fff" : "var(--sd-font-secondary,#555)", flexShrink: 0 }}>
              {label}
              <span style={{ padding: "0 4px", borderRadius: 99, background: active ? "rgba(255,255,255,0.25)" : "var(--sd-border-default,#e5e7eb)", fontSize: 9, fontWeight: 800, color: active ? "#fff" : "var(--sd-font-tertiary,#999)" }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Application cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((app) => {
          const { label, tone, icon: SIcon } = STATUS_META[app.status];
          const isExpanded = expanded === app.id;

          return (
            <div key={app.id} style={{ border: `1px solid ${app.status === "approved" ? TONES.green.text + "40" : "var(--sd-border-default,#e5e7eb)"}`, borderRadius: 12, overflow: "hidden" }}>
              <button onClick={() => setExpanded(isExpanded ? null : app.id)}
                style={{ width: "100%", display: "flex", gap: 10, alignItems: "center", padding: "11px 14px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                {/* Gradient thumbnail */}
                <div style={{ width: 36, height: 36, borderRadius: 9, background: app.gradient, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>{app.campaign}</div>
                  <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{app.brand}</span>
                    {[1,2,3,4,5].map((s) => s <= app.brandRating
                      ? <IconStarFilled key={s} size={8} style={{ color: "#f59e0b" }} />
                      : <IconStar       key={s} size={8} style={{ color: "#e5e7eb" }} />)}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <Badge label={label} tone={tone} size="sm" dot />
                  <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginTop: 3 }}>{app.appliedAt}</div>
                </div>
              </button>

              {isExpanded && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "10px 14px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  {/* Details row */}
                  <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <IconCurrencyDollar size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                      <span style={{ fontSize: 11, fontWeight: 700 }}>{app.fee}</span>
                    </div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      {app.platform.map((p) => p === "instagram"
                        ? <IconBrandInstagram key={p} size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                        : <IconBrandTiktok   key={p} size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />)}
                    </div>
                    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                      <IconCalendar size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                      <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{app.responseEta}</span>
                    </div>
                  </div>

                  {app.note && (
                    <div style={{ padding: "8px 10px", background: app.status === "approved" ? TONES.green.tint : app.status === "rejected" ? TONES.red.tint : TONES.yellow.tint, borderRadius: 8, fontSize: 11, color: app.status === "approved" ? TONES.green.text : app.status === "rejected" ? TONES.red.text : TONES.yellow.text, fontStyle: "italic", marginBottom: 8, lineHeight: 1.5 }}>
                      "{app.note}"
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 6 }}>
                    {app.status === "approved" && (
                      <Button variant="primary" size="sm" leftIcon={<IconChevronRight size={11} />} style={{ flex: 1 }}>Go to campaign</Button>
                    )}
                    <Button variant="secondary" size="sm" leftIcon={<IconExternalLink size={11} />}>View listing</Button>
                    {(app.status === "pending" || app.status === "rejected") && (
                      <button onClick={() => remove(app.id)}
                        style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconTrash size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {visible.length === 0 && (
          <div style={{ padding: "32px", textAlign: "center", color: "var(--sd-font-tertiary,#999)", fontSize: 12 }}>
            No applications match your filter.
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-application-tracker",
  title: "CreatorApplicationTracker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's outbound application inbox — 5 campaigns across Approved/Reviewing/Waitlisted/Pending/Rejected states with filter tabs, brand rating, and expandable brand notes.",
  description:
    "Tracks all campaigns a creator has applied to. Header: approved count + awaiting count badges, Browse campaigns CTA. Search input. 6 filter tabs (All, Approved, Reviewing, Waitlisted, Pending, Rejected) with count badges. 5 application cards: each has gradient thumbnail (36px), campaign name, brand name + 5-star rating, status badge with dot + applied date. Expand reveals: fee, platform icons, response ETA; brand note in tinted italic quote (green for approved, red for rejected, yellow for waitlisted); action buttons — Approved → 'Go to campaign' primary + View listing; Pending/Rejected → trash to remove; all → View listing. Pre-seeded: Aura Labs approved ('Contract will be sent shortly'), NovaSkin under review, FitLife waitlisted ('spot may open'), Luminos rejected (wrong audience), Wellnest pending Jun 28. Aura Labs card pre-expanded. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator application tracker",
      description: "Aura Labs is pre-expanded (approved). Click other cards to expand their details and brand note. Use filter tabs or search to narrow results. Remove pending/rejected applications with the trash icon.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
