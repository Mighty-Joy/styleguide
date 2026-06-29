"use client";

import React from "react";
import {
  IconUsers,
  IconBolt,
  IconPhoto,
  IconPackage,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconArrowUpRight,
  IconArrowUp,
  IconArrowDown,
  IconCircleCheck,
  IconGift,
  IconTruck,
  IconMessageCircle,
  IconUserPlus,
  IconVideo,
  IconTrendingUp,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* KPI cards                                                             */
/* ------------------------------------------------------------------ */

interface KPI {
  label: string;
  value: string;
  delta: string;
  deltaDir: "up" | "down";
  deltaGood: boolean;
  icon: React.ElementType;
  tone: keyof typeof TONES;
}

const KPI_DATA: KPI[] = [
  { label: "Active Creators",  value: "24",      delta: "+4 this month",   deltaDir: "up",   deltaGood: true,  icon: IconUsers,    tone: "green" },
  { label: "Active Deals",     value: "11",       delta: "+2 this week",    deltaDir: "up",   deltaGood: true,  icon: IconBolt,     tone: "blue" },
  { label: "Live Posts",       value: "36",       delta: "+12 this month",  deltaDir: "up",   deltaGood: true,  icon: IconPhoto,    tone: "purple" },
  { label: "Total Spend",      value: "$102.5K",  delta: "of $180K budget", deltaDir: "up",   deltaGood: true,  icon: IconTrendingUp, tone: "orange" },
];

function KPICard({ kpi }: { kpi: KPI }) {
  const t = TONES[kpi.tone];
  const Icon = kpi.icon;
  const DeltaIcon = kpi.deltaDir === "up" ? IconArrowUp : IconArrowDown;
  return (
    <div style={{ flex: "1 1 160px", padding: "14px 16px", background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)" }}>{kpi.label}</span>
        <span style={{ width: 28, height: 28, borderRadius: "var(--sd-radius-sm)", background: t.tint, display: "flex", alignItems: "center", justifyContent: "center", color: t.solid }}>
          <Icon size={14} />
        </span>
      </div>
      <div style={{ fontSize: 26, fontWeight: 800, color: "var(--sd-font-primary)", letterSpacing: "-0.02em", lineHeight: 1 }}>
        {kpi.value}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: kpi.deltaGood ? TONES.green.text : TONES.red.text }}>
        <DeltaIcon size={11} />
        {kpi.delta}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Campaign list (compact)                                               */
/* ------------------------------------------------------------------ */

type CampStatus = "active" | "paused" | "completed";

interface CampRow {
  id: string;
  name: string;
  brand: string;
  brandInitials: string;
  brandTone: keyof typeof TONES;
  status: CampStatus;
  platforms: ("instagram" | "tiktok" | "youtube")[];
  creatorsActive: number;
  livePosts: number;
  done: number;
  total: number;
  budget: string;
}

const CAMP_STATUS: Record<CampStatus, { label: string; tone: keyof typeof TONES }> = {
  active:    { label: "Active",    tone: "green" },
  paused:    { label: "Paused",    tone: "orange" },
  completed: { label: "Completed", tone: "blue" },
};

const PLAT_ICONS: Record<string, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok: IconBrandTiktok,
  youtube: IconBrandYoutube,
};

const CAMPS: CampRow[] = [
  { id: "1", name: "Atlas X Summer",  brand: "Atlas X",  brandInitials: "AX", brandTone: "purple", status: "active",    platforms: ["instagram", "tiktok"],            creatorsActive: 12, livePosts: 9,  done: 9,  total: 24, budget: "$48K" },
  { id: "2", name: "Summer Glow",     brand: "GlowCo",   brandInitials: "GC", brandTone: "pink",   status: "active",    platforms: ["instagram", "tiktok", "youtube"], creatorsActive: 8,  livePosts: 6,  done: 6,  total: 16, budget: "$32K" },
  { id: "3", name: "Back to School",  brand: "GlowCo",   brandInitials: "GC", brandTone: "pink",   status: "paused",    platforms: ["tiktok"],                         creatorsActive: 4,  livePosts: 2,  done: 2,  total: 8,  budget: "$22K" },
];

function ProgressMini({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const tone = pct === 100 ? "green" : pct >= 50 ? "blue" : pct > 0 ? "orange" : "yellow";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 4, borderRadius: 2, background: "var(--sd-bg-quaternary)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: TONES[tone].solid, borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", whiteSpace: "nowrap" }}>{done}/{total}</span>
    </div>
  );
}

function CampaignListPanel() {
  return (
    <div style={{ flex: "1 1 420px", background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Active campaigns</span>
        <Button variant="tertiary" size="sm" rightIcon={<IconArrowUpRight size={12} />} style={{ marginLeft: "auto" }}>
          View all
        </Button>
      </div>

      {/* Column headers */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px", height: 30, background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
        {[["Campaign", "1fr"], ["Status", "80px"], ["Creators", "64px"], ["Deliverables", "140px"], ["Budget", "56px"]].map(([label, w]) => (
          <span key={label} style={{ flex: label === "Campaign" ? 1 : `0 0 ${w}`, fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        ))}
      </div>

      {/* Rows */}
      {CAMPS.map((c) => {
        const { label, tone } = CAMP_STATUS[c.status];
        const brandT = TONES[c.brandTone];
        return (
          <div key={c.id}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 16px", height: 48, borderBottom: "1px solid var(--sd-border-light)", cursor: "pointer" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = "var(--sd-bg-secondary)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
          >
            {/* Campaign identity */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              <Avatar initials={c.brandInitials} tone={c.brandTone} shape="rounded" size="sm" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                <div style={{ display: "flex", gap: 3, marginTop: 2 }}>
                  {c.platforms.map((p) => { const PIcon = PLAT_ICONS[p]; return <PIcon key={p} size={10} style={{ color: "var(--sd-font-tertiary)" }} />; })}
                </div>
              </div>
            </div>
            {/* Status */}
            <div style={{ flex: "0 0 80px" }}>
              <Badge label={label} tone={tone} size="sm" dot />
            </div>
            {/* Creators */}
            <div style={{ flex: "0 0 64px", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>
              {c.creatorsActive}
            </div>
            {/* Deliverables */}
            <div style={{ flex: "0 0 140px" }}>
              <ProgressMini done={c.done} total={c.total} />
            </div>
            {/* Budget */}
            <div style={{ flex: "0 0 56px", fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)", textAlign: "right" }}>
              {c.budget}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Activity feed                                                         */
/* ------------------------------------------------------------------ */

type EventKind = "deal_signed" | "content_approved" | "shipment_sent" | "creator_invited" | "comment" | "deal_created";

interface ActivityEvent {
  id: string;
  kind: EventKind;
  actor: string;
  actorInitials: string;
  actorTone: keyof typeof TONES;
  subject: string;
  campaign?: string;
  time: string;
}

const EVENT_META: Record<EventKind, { icon: React.ElementType; color: string; label: string }> = {
  deal_signed:      { icon: IconCircleCheck, color: TONES.green.solid,  label: "signed deal" },
  content_approved: { icon: IconPhoto,       color: TONES.blue.solid,   label: "content approved" },
  shipment_sent:    { icon: IconTruck,       color: TONES.sky.solid,    label: "shipment sent" },
  creator_invited:  { icon: IconUserPlus,    color: TONES.purple.solid, label: "invited" },
  comment:          { icon: IconMessageCircle, color: TONES.orange.solid, label: "commented" },
  deal_created:     { icon: IconBolt,        color: TONES.yellow.solid, label: "deal created" },
};

const EVENTS: ActivityEvent[] = [
  { id: "1", kind: "deal_signed",      actor: "Priya Nair",   actorInitials: "P", actorTone: "purple", subject: "Atlas X — Morning Reel",      campaign: "Atlas X Summer", time: "2m ago" },
  { id: "2", kind: "content_approved", actor: "Nina Cole",    actorInitials: "N", actorTone: "green",  subject: "Serum Review TikTok",         campaign: "Summer Glow",    time: "14m ago" },
  { id: "3", kind: "shipment_sent",    actor: "System",       actorInitials: "S", actorTone: "sky",    subject: "Atlas X Kit → Theo Vance",                                time: "1h ago" },
  { id: "4", kind: "creator_invited",  actor: "Eric D.",      actorInitials: "E", actorTone: "green",  subject: "Carlos Reyes",                campaign: "Atlas X Summer", time: "2h ago" },
  { id: "5", kind: "comment",          actor: "Maya Rivers",  actorInitials: "M", actorTone: "pink",   subject: "on Atlas X — Morning Reel",                               time: "3h ago" },
  { id: "6", kind: "deal_created",     actor: "Eric D.",      actorInitials: "E", actorTone: "green",  subject: "Gifting deal for Iris Bloom", campaign: "Summer Glow",    time: "5h ago" },
];

function ActivityFeedPanel() {
  return (
    <div style={{ flex: "0 0 300px", background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Activity</span>
        <Badge label="Live" tone="green" size="sm" dot />
      </div>

      {/* Events */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {EVENTS.map((ev, idx) => {
          const meta = EVENT_META[ev.kind];
          const EventIcon = meta.icon;
          const t = TONES[ev.actorTone];
          const isLast = idx === EVENTS.length - 1;
          return (
            <div key={ev.id} style={{ display: "flex", gap: 10, padding: "10px 16px", borderBottom: isLast ? "none" : "1px solid var(--sd-border-light)" }}>
              {/* Actor avatar + event dot */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Avatar initials={ev.actorInitials} tone={ev.actorTone} size="md" />
                {/* Event icon badge */}
                <div style={{ position: "absolute", bottom: -2, right: -4, width: 14, height: 14, borderRadius: "50%", background: meta.color, border: "2px solid var(--sd-bg-primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <EventIcon size={7} color="#fff" />
                </div>
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, color: "var(--sd-font-primary)", lineHeight: 1.4 }}>
                  <strong style={{ fontWeight: 600 }}>{ev.actor}</strong>
                  {" "}<span style={{ color: "var(--sd-font-tertiary)" }}>{EVENT_META[ev.kind].label}</span>{" "}
                  <span style={{ fontWeight: 500 }}>{ev.subject}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 3 }}>
                  {ev.campaign && (
                    <Badge label={ev.campaign} tone="blue" size="sm" />
                  )}
                  <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{ev.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Home dashboard composition                                            */
/* ------------------------------------------------------------------ */

function HomeDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Page title */}
      <div>
        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--sd-font-primary)", letterSpacing: "-0.02em" }}>Good morning, Eric</div>
        <div style={{ fontSize: 13, color: "var(--sd-font-tertiary)", marginTop: 2 }}>Here's what's happening across Atlas Brands today.</div>
      </div>

      {/* KPI row */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {KPI_DATA.map((k) => <KPICard key={k.label} kpi={k} />)}
      </div>

      {/* Main + side */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <CampaignListPanel />
        <ActivityFeedPanel />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "home-view",
  title: "Home / Dashboard",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Campaign dashboard: KPI stat cards, active campaign list with progress, and live activity feed.",
  description:
    "The Home view is the first thing a brand user sees after login. Four KPI cards surface the headline numbers (active creators, deals, live posts, spend vs. budget). Below: a campaign table with deliverable progress bars on the left, and a live activity feed on the right. The activity feed shows the 6 most recent events (deal signed, content approved, shipment sent, creator invited, comment, deal created) with actor avatars and colored event-kind badges.",
  demos: [
    {
      title: "Home dashboard",
      description: "Full-width dashboard layout: KPI row → campaign list + activity feed side-by-side.",
      block: true,
      render: () => <HomeDashboard />,
    },
  ],
  props: [],
};

export default doc;
