"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconClock,
  IconMessageCircle,
  IconPhoto,
  IconCurrencyDollar,
  IconAlertTriangle,
  IconChevronRight,
  IconBell,
  IconFilter,
  IconX,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type ActionType = "approval" | "overdue" | "message" | "payment";

interface ActionItem {
  id: string;
  type: ActionType;
  title: string;
  subtitle: string;
  campaign: string;
  urgency: "high" | "medium" | "low";
  time: string;
  creatorInitials: string;
  creatorTone: string;
  dismissed: boolean;
}

const TYPE_META: Record<ActionType, { icon: React.ElementType; label: string; tone: keyof typeof TONES }> = {
  approval: { icon: IconPhoto,           label: "Review content",   tone: "blue"   },
  overdue:  { icon: IconAlertTriangle,   label: "Overdue",          tone: "red"    },
  message:  { icon: IconMessageCircle,   label: "Message",          tone: "purple" },
  payment:  { icon: IconCurrencyDollar,  label: "Payment due",      tone: "orange" },
};

const URGENCY_META: Record<"high" | "medium" | "low", { dot: string }> = {
  high:   { dot: TONES.red.text    },
  medium: { dot: TONES.yellow.text },
  low:    { dot: TONES.blue.text   },
};

const ITEMS_INIT: ActionItem[] = [
  { id: "a1", type: "overdue",  title: "Diego Santos — Reel overdue",       subtitle: "Due Jun 24 · 5 days late",               campaign: "Summer Glow",   urgency: "high",   time: "5d overdue", creatorInitials: "DS", creatorTone: "orange",    dismissed: false },
  { id: "a2", type: "approval", title: "Priya Nair submitted 3 posts",      subtitle: "Story × 2, Feed post × 1 — awaiting review", campaign: "FitLife Q2",  urgency: "high",   time: "2h ago",     creatorInitials: "PN", creatorTone: "green",     dismissed: false },
  { id: "a3", type: "payment",  title: "Hana Kim — invoice pending",        subtitle: "$3,240 · milestone 2 of 3",              campaign: "Summer Glow",   urgency: "medium", time: "Due today",  creatorInitials: "HK", creatorTone: "pink",      dismissed: false },
  { id: "a4", type: "message",  title: "Marcus Webb sent a message",        subtitle: "\"Quick question about the caption guidelines…\"", campaign: "FitLife Q2", urgency: "medium", time: "3h ago",  creatorInitials: "MW", creatorTone: "purple",    dismissed: false },
  { id: "a5", type: "approval", title: "Aisha Obi — TikTok draft ready",   subtitle: "1 video · awaiting first review",        campaign: "Summer Glow",   urgency: "low",    time: "Yesterday",  creatorInitials: "AO", creatorTone: "turquoise", dismissed: false },
  { id: "a6", type: "payment",  title: "3 creators — milestone payment",    subtitle: "Total $8,100 · batch payment",           campaign: "FitLife Q2",    urgency: "low",    time: "Due in 2d",  creatorInitials: "×3", creatorTone: "blue",      dismissed: false },
];

/* ---- Demo ---- */
function Demo() {
  const [items,  setItems]  = useState<ActionItem[]>(ITEMS_INIT);
  const [filter, setFilter] = useState<ActionType | null>(null);

  function dismiss(id: string) {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, dismissed: true } : i));
  }

  const visible = items.filter((i) => !i.dismissed && (filter === null || i.type === filter));
  const counts  = (["approval", "overdue", "message", "payment"] as ActionType[]).map((t) => ({
    type: t, count: items.filter((i) => !i.dismissed && i.type === t).length,
  }));
  const totalPending = items.filter((i) => !i.dismissed).length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: TONES.red.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconBell size={15} style={{ color: TONES.red.text }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Action required</div>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{totalPending} items need your attention</div>
          </div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconFilter size={12} />}>Filter</Button>
      </div>

      {/* Type filter chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={() => setFilter(null)}
          style={{ padding: "4px 10px", borderRadius: 99, background: filter === null ? "#111" : "var(--sd-bg-secondary, #f1f1f1)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: filter === null ? "#fff" : "var(--sd-font-secondary, #555)" }}>
          All · {totalPending}
        </button>
        {counts.map(({ type, count }) => {
          if (!count) return null;
          const { label, tone } = TYPE_META[type];
          const active = filter === type;
          return (
            <button key={type} onClick={() => setFilter(active ? null : type)}
              style={{ padding: "4px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? TONES[tone].text : "var(--sd-font-secondary, #555)" }}>
              {label} · {count}
            </button>
          );
        })}
      </div>

      {/* Action list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "32px 0", color: "var(--sd-font-tertiary, #999)", fontSize: 12 }}>
            <IconCheck size={24} style={{ marginBottom: 6, opacity: 0.4, display: "block", margin: "0 auto 8px" }} />
            All caught up!
          </div>
        )}
        {visible.map((item) => {
          const { icon: Icon, tone } = TYPE_META[item.type];
          const { dot } = URGENCY_META[item.urgency];
          return (
            <div key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, background: item.urgency === "high" ? "rgba(220,38,38,0.02)" : "transparent", position: "relative" }}>
              {/* Urgency dot */}
              <div style={{ position: "absolute", top: 14, left: 6, width: 6, height: 6, borderRadius: "50%", background: dot }} />

              {/* Type icon */}
              <div style={{ width: 30, height: 30, borderRadius: 8, background: TONES[tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 4 }}>
                <Icon size={14} style={{ color: TONES[tone].text }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.subtitle}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge label={item.campaign} tone="gray" size="sm" />
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{item.time}</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                <button onClick={() => dismiss(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}>
                  <IconX size={12} />
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: TONES[tone].text }}>
                  Go <IconChevronRight size={11} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-action-center",
  title: "BrandActionCenter",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand-side action inbox — pending approvals, overdue deliverables, unread messages, and payment items across all active campaigns in one prioritized feed.",
  description:
    "The daily command center digest for brand managers. Header: red bell icon, pending count, Filter button. Type filter chips: All + per-type counts (approvals, overdue, messages, payments) — click to filter; active chip gets tone-matched background. Action items: urgency dot (red/yellow/blue) on the left rail, type icon in a tinted circle, title, subtitle, campaign badge, relative timestamp. High-urgency items get a faint red background. Each item has a dismiss (×) button and a 'Go →' shortcut link. All-caught-up empty state with check icon. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Brand action center",
      description: "Filter by type using the chips. Dismiss individual items with the × button to see the all-caught-up empty state.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
