"use client";

import React, { useState, useEffect, useRef } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import {
  IconActivity,
  IconEye,
  IconHeart,
  IconCurrencyDollar,
  IconVideo,
  IconCheck,
  IconMessage2,
  IconAlertCircle,
  IconTrendingUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type EventType = "content_submitted" | "approved" | "message" | "published" | "flagged";

interface ActivityEvent {
  id: string;
  type: EventType;
  creator: { name: string; initials: string; tone: keyof typeof TONES };
  description: string;
  elapsed: number; // seconds ago
  read: boolean;
}

interface ActiveCreator {
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  status: "live" | "pending" | "overdue";
  stage: string;
}

/* ---- seed data ---- */

const CREATORS: ActiveCreator[] = [
  { name: "Priya Nair",    initials: "PN", tone: "green",     status: "live",    stage: "Filming" },
  { name: "Diego Santos",  initials: "DS", tone: "orange",    status: "pending", stage: "Review"  },
  { name: "Hana Kim",      initials: "HK", tone: "pink",      status: "live",    stage: "Editing" },
  { name: "Marcus Webb",   initials: "MW", tone: "purple",    status: "overdue", stage: "Brief"   },
  { name: "Aisha Obi",     initials: "AO", tone: "turquoise", status: "pending", stage: "Scripting"},
  { name: "Liam Park",     initials: "LP", tone: "blue",      status: "live",    stage: "Live"    },
];

const INITIAL_EVENTS: ActivityEvent[] = [
  { id: "e1", type: "content_submitted", creator: { name: "Hana Kim",     initials: "HK", tone: "pink"      }, description: "submitted reel for review",              elapsed: 42,   read: false },
  { id: "e2", type: "approved",          creator: { name: "Liam Park",    initials: "LP", tone: "blue"      }, description: "content approved and queued for publish", elapsed: 120,  read: false },
  { id: "e3", type: "message",           creator: { name: "Diego Santos", initials: "DS", tone: "orange"    }, description: "sent a message about product specs",      elapsed: 340,  read: true  },
  { id: "e4", type: "flagged",           creator: { name: "Marcus Webb",  initials: "MW", tone: "purple"    }, description: "brief not acknowledged — 3 days overdue", elapsed: 720,  read: true  },
  { id: "e5", type: "published",         creator: { name: "Priya Nair",   initials: "PN", tone: "green"     }, description: "post went live — 12k views in 2h",        elapsed: 3600, read: true  },
];

const EVENT_ICON: Record<EventType, React.ReactNode> = {
  content_submitted: <IconVideo size={13} />,
  approved:          <IconCheck size={13} />,
  message:           <IconMessage2 size={13} />,
  published:         <IconTrendingUp size={13} />,
  flagged:           <IconAlertCircle size={13} />,
};

const EVENT_COLOR: Record<EventType, string> = {
  content_submitted: "var(--sd-blue-text,   #2563eb)",
  approved:          "var(--sd-green-text,  #16a34a)",
  message:           "var(--sd-font-secondary, #666)",
  published:         "var(--sd-green-text,  #16a34a)",
  flagged:           "var(--sd-red-text,    #dc2626)",
};

const STATUS_COLOR: Record<ActiveCreator["status"], string> = {
  live:    "#16a34a",
  pending: "#ca8a04",
  overdue: "#dc2626",
};

function elapsed(s: number): string {
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

/* ---- LivePulse indicator ---- */

function LivePulse() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <span
          style={{
            display: "block", width: 8, height: 8, borderRadius: "50%",
            background: "#16a34a",
          }}
        />
        <span
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            background: "rgba(22,163,74,0.35)",
            animation: "pulse 1.8s ease-out infinite",
          }}
        />
      </span>
      <span style={{ fontSize: 11, fontWeight: 700, color: "#16a34a", letterSpacing: "0.05em" }}>LIVE</span>
      <style>{`@keyframes pulse { 0%{transform:scale(1);opacity:0.8} 70%{transform:scale(2.4);opacity:0} 100%{transform:scale(1);opacity:0} }`}</style>
    </span>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [events, setEvents] = useState<ActivityEvent[]>(INITIAL_EVENTS);
  const [tick, setTick] = useState(0);
  const counterRef = useRef(0);

  // Simulate live ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
      setEvents((prev) => prev.map((e) => ({ ...e, elapsed: e.elapsed + 15 })));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  // Simulated metrics that jitter each tick
  const impressions = 48200 + tick * 840;
  const engagements = 3610 + tick * 62;
  const er = (3610 + tick * 62) / (48200 + tick * 840) * 100;
  const spend = 8400;
  const budget = 24000;
  const spendPct = Math.round((spend / budget) * 100);

  const liveCount = CREATORS.filter((c) => c.status === "live").length;
  const unread = events.filter((e) => !e.read).length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>
              Summer Glow Campaign
            </span>
            <LivePulse />
          </div>
          <span style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)" }}>
            {liveCount} creators active · {CREATORS.length} total
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm">Export</Button>
          <Button variant="primary" size="sm">View campaign</Button>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 20 }}>
        <StatCard
          label="Impressions"
          value={`${(impressions / 1000).toFixed(1)}K`}
          icon={IconEye}
          trend={14}
        />
        <StatCard
          label="Engagements"
          value={`${(engagements / 1000).toFixed(1)}K`}
          icon={IconHeart}
          trend={8}
        />
        <StatCard
          label="Avg ER"
          value={`${er.toFixed(1)}%`}
          icon={IconActivity}
          trend={-0.3}
        />
        <StatCard
          label="Spend"
          value={`$${spend.toLocaleString()}`}
          icon={IconCurrencyDollar}
          secondary={`of $${budget.toLocaleString()} · ${spendPct}%`}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
        {/* Creator status list */}
        <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>Active creators</span>
            <div style={{ display: "flex", gap: 6 }}>
              {(["live","pending","overdue"] as const).map((s) => {
                const count = CREATORS.filter((c) => c.status === s).length;
                return (
                  <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--sd-font-secondary, #666)" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: STATUS_COLOR[s], display: "inline-block" }} />
                    {count} {s}
                  </span>
                );
              })}
            </div>
          </div>

          {CREATORS.map((c, i) => (
            <div
              key={c.name}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px",
                borderBottom: i < CREATORS.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Avatar initials={c.initials} tone={c.tone} size="sm" />
                <span style={{
                  position: "absolute", bottom: -1, right: -1,
                  width: 8, height: 8, borderRadius: "50%",
                  background: STATUS_COLOR[c.status],
                  border: "1.5px solid #fff",
                }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary, #111)", lineHeight: 1.3 }}>{c.name}</div>
                <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{c.stage}</div>
              </div>

              <Badge
                label={c.status === "live" ? "Live" : c.status === "pending" ? "In review" : "Overdue"}
                tone={c.status === "live" ? "green" : c.status === "pending" ? "yellow" : "red"}
                variant="status"
                dot
                size="sm"
              />

              <Button variant="ghost" size="sm" iconOnly aria-label="Message">
                <IconMessage2 size={13} />
              </Button>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>Activity</span>
            {unread > 0 && <Badge label={`${unread} new`} tone="blue" />}
          </div>

          <div style={{ overflowY: "auto", maxHeight: 320 }}>
            {events.map((ev, i) => (
              <div
                key={ev.id}
                style={{
                  display: "flex", gap: 9, padding: "10px 14px",
                  borderBottom: i < events.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none",
                  background: !ev.read ? "rgba(37,99,235,0.03)" : "transparent",
                }}
              >
                <Avatar initials={ev.creator.initials} tone={ev.creator.tone} size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--sd-font-primary, #111)", lineHeight: 1.4 }}>
                    <span style={{ fontWeight: 600 }}>{ev.creator.name}</span>
                    {" "}{ev.description}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <span style={{ color: EVENT_COLOR[ev.type], display: "flex", alignItems: "center" }}>
                      {EVENT_ICON[ev.type]}
                    </span>
                    <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
                      {elapsed(ev.elapsed)}
                    </span>
                    {!ev.read && (
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563eb", display: "inline-block" }} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "10px 14px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)" }}>
            <Button variant="secondary" size="sm" style={{ width: "100%" }}>View all activity</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "live-dashboard",
  title: "LiveDashboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Real-time campaign overview — live pulse, stat cards, per-creator status grid, and live activity feed.",
  description:
    "The top-of-campaign surface during an active run. Shows live impressions/engagements/ER/spend stats, a creator status list with live/pending/overdue indicators, and a timestamped activity feed with unread count. Metrics simulate live updates via a 15s interval tick. Composes StatCard, Avatar, Badge, and Button — primitives only, no Core Component imports.",
  demos: [
    {
      title: "Live campaign dashboard",
      description: "Stats update in real time. Creator status indicators reflect current stage.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
