"use client";

import React, { useState } from "react";
import {
  IconUsers,
  IconFileText,
  IconPhoto,
  IconRocket,
  IconChartBar,
  IconDotsVertical,
  IconChevronDown,
  IconChevronRight,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type MilestoneStatus = "completed" | "active" | "upcoming" | "late";

interface Milestone {
  id:     string;
  label:  string;
  icon:   React.ElementType;
  status: MilestoneStatus;
  /** Start column offset (0-based, out of NUM_WEEKS columns) */
  startWeek: number;
  /** Duration in weeks */
  spanWeeks: number;
}

interface CampaignRow {
  id:         string;
  name:       string;
  brand:      string;
  brandTone:  keyof typeof TONES;
  creators:   { name: string; tone: keyof typeof TONES }[];
  milestones: Milestone[];
  expanded:   boolean;
}

/* ------------------------------------------------------------------ */
/* Config                                                               */
/* ------------------------------------------------------------------ */

const NUM_WEEKS = 12;

// Jun 2 → Aug 18, 2026 (12 weeks)
const WEEK_LABELS = [
  "Jun 2",  "Jun 9",  "Jun 16", "Jun 23",
  "Jun 30", "Jul 7",  "Jul 14", "Jul 21",
  "Jul 28", "Aug 4",  "Aug 11", "Aug 18",
];

// Today = Jun 29 = week 3 (index 3: Jun 23 – Jun 29)
const TODAY_WEEK = 3;

/* ------------------------------------------------------------------ */
/* Status styling                                                       */
/* ------------------------------------------------------------------ */

const STATUS_TONE: Record<MilestoneStatus, keyof typeof TONES> = {
  completed: "green",
  active:    "blue",
  upcoming:  "gray",
  late:      "red",
};

const STATUS_LABEL: Record<MilestoneStatus, string> = {
  completed: "Done",
  active:    "In progress",
  upcoming:  "Upcoming",
  late:      "Late",
};

const BAR_BG: Record<MilestoneStatus, string> = {
  completed: TONES.green.tint,
  active:    TONES.blue.tint,
  upcoming:  "var(--sd-bg-tertiary)",
  late:      TONES.red.tint,
};

const BAR_BORDER: Record<MilestoneStatus, string> = {
  completed: TONES.green.solid,
  active:    TONES.blue.solid,
  upcoming:  "var(--sd-border-medium)",
  late:      TONES.red.solid,
};

/* ------------------------------------------------------------------ */
/* Fixture data                                                         */
/* ------------------------------------------------------------------ */

const CAMPAIGNS: CampaignRow[] = [
  {
    id: "c1",
    name: "Spring Drop",
    brand: "Lumi Beauty",
    brandTone: "pink",
    creators: [
      { name: "Priya Nair",  tone: "purple" },
      { name: "Jake Mills",  tone: "blue"   },
      { name: "Sofia Chen",  tone: "orange" },
    ],
    expanded: true,
    milestones: [
      { id: "m1", label: "Creator brief",   icon: IconFileText, status: "completed", startWeek: 0, spanWeeks: 2 },
      { id: "m2", label: "Creator outreach", icon: IconUsers,    status: "completed", startWeek: 1, spanWeeks: 2 },
      { id: "m3", label: "Content creation", icon: IconPhoto,    status: "active",    startWeek: 3, spanWeeks: 4 },
      { id: "m4", label: "Content review",   icon: IconChartBar, status: "upcoming",  startWeek: 7, spanWeeks: 2 },
      { id: "m5", label: "Campaign live",    icon: IconRocket,   status: "upcoming",  startWeek: 9, spanWeeks: 3 },
    ],
  },
  {
    id: "c2",
    name: "Summer Glow",
    brand: "Aura Skincare",
    brandTone: "orange",
    creators: [
      { name: "Marcus Lee",  tone: "turquoise" },
      { name: "Lily Park",   tone: "sky"        },
    ],
    expanded: false,
    milestones: [
      { id: "m6", label: "Creator brief",   icon: IconFileText, status: "completed", startWeek: 2, spanWeeks: 1 },
      { id: "m7", label: "Content creation", icon: IconPhoto,   status: "active",    startWeek: 3, spanWeeks: 5 },
      { id: "m8", label: "Content review",  icon: IconChartBar, status: "upcoming",  startWeek: 8, spanWeeks: 2 },
      { id: "m9", label: "Campaign live",   icon: IconRocket,   status: "upcoming",  startWeek: 10, spanWeeks: 2 },
    ],
  },
  {
    id: "c3",
    name: "Holiday Prep",
    brand: "Nova Brand",
    brandTone: "purple",
    creators: [
      { name: "Eric Dahan",  tone: "green"  },
      { name: "Mia Torres",  tone: "pink"   },
      { name: "Jake Mills",  tone: "blue"   },
      { name: "Sofia Chen",  tone: "orange" },
    ],
    expanded: false,
    milestones: [
      { id: "m10", label: "Planning",        icon: IconFileText, status: "late",     startWeek: 0, spanWeeks: 3 },
      { id: "m11", label: "Creator outreach", icon: IconUsers,   status: "active",   startWeek: 2, spanWeeks: 4 },
      { id: "m12", label: "Content creation", icon: IconPhoto,   status: "upcoming", startWeek: 6, spanWeeks: 4 },
      { id: "m13", label: "Campaign live",    icon: IconRocket,  status: "upcoming", startWeek: 10, spanWeeks: 2 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Gantt bar cell                                                       */
/* ------------------------------------------------------------------ */

function GanttBar({
  milestone,
  colCount,
}: {
  milestone: Milestone;
  colCount: number;
}) {
  const colW = 100 / colCount;
  const left   = milestone.startWeek * colW;
  const width  = milestone.spanWeeks * colW;
  const Icon   = milestone.icon;

  return (
    <div
      title={`${milestone.label} — ${STATUS_LABEL[milestone.status]}`}
      style={{
        position:     "absolute",
        left:         `${left}%`,
        width:        `${width}%`,
        top:          4,
        bottom:       4,
        borderRadius: "var(--sd-radius-sm)",
        background:   BAR_BG[milestone.status],
        border:       `1.5px solid ${BAR_BORDER[milestone.status]}`,
        display:      "flex",
        alignItems:   "center",
        gap:          5,
        padding:      "0 7px",
        overflow:     "hidden",
        cursor:       "default",
        transition:   "opacity 0.1s",
      }}
    >
      <Icon size={11} style={{ color: TONES[STATUS_TONE[milestone.status]].text, flexShrink: 0 }} />
      <span style={{ fontSize: 11, fontWeight: 600, color: TONES[STATUS_TONE[milestone.status]].text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {milestone.label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CampaignTimeline                                                     */
/* ------------------------------------------------------------------ */

function CampaignTimeline() {
  const [rows, setRows] = useState(CAMPAIGNS);
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  const toggle = (id: string) => {
    setRows(rs => rs.map(r => r.id === id ? { ...r, expanded: !r.expanded } : r));
  };

  const LEFT_COL = 220; // px width of the label column

  return (
    <div style={{ background: "var(--sd-bg-primary)", borderRadius: "var(--sd-radius-lg)", border: "1px solid var(--sd-border-light)", overflow: "hidden" }}>

      {/* ---- Header ---- */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>
          Campaign Timeline
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          <Button variant="secondary" size="sm">Jun 2 – Aug 18</Button>
          <Button variant="ghost" size="sm" iconOnly aria-label="More">
            <IconDotsVertical size={14} />
          </Button>
        </div>
      </div>

      {/* ---- Grid ---- */}
      <div style={{ display: "flex", overflowX: "auto" }}>
        {/* Label column */}
        <div style={{ width: LEFT_COL, flexShrink: 0, borderRight: "1px solid var(--sd-border-light)" }}>
          {/* Week header spacer */}
          <div style={{ height: 36, borderBottom: "1px solid var(--sd-border-light)", background: "var(--sd-bg-secondary)" }} />

          {/* Campaign rows */}
          {rows.map(row => (
            <React.Fragment key={row.id}>
              {/* Campaign header row */}
              <div
                onClick={() => toggle(row.id)}
                style={{ height: 48, display: "flex", alignItems: "center", gap: 8, padding: "0 10px 0 12px", borderBottom: "1px solid var(--sd-border-light)", cursor: "pointer", background: "var(--sd-bg-secondary)" }}
              >
                {row.expanded ? <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} /> : <IconChevronRight size={13} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />}
                <Avatar name={row.brand} tone={row.brandTone} shape="rounded" size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-primary)", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.name}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", marginTop: 1 }}>{row.brand}</div>
                </div>
                {/* Creator stack */}
                <div style={{ display: "flex", marginLeft: "auto" }}>
                  {row.creators.slice(0, 3).map((c, i) => (
                    <div key={c.name} style={{ marginLeft: i === 0 ? 0 : -5 }}>
                      <Avatar name={c.name} tone={c.tone} size="sm" bordered />
                    </div>
                  ))}
                  {row.creators.length > 3 && (
                    <div style={{ marginLeft: -5, width: 24, height: 24, borderRadius: "50%", background: "var(--sd-bg-tertiary)", border: "1.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "var(--sd-font-secondary)" }}>
                      +{row.creators.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded: milestone label rows */}
              {row.expanded && row.milestones.map(m => (
                <div
                  key={m.id}
                  style={{ height: 36, display: "flex", alignItems: "center", gap: 6, padding: "0 10px 0 28px", borderBottom: "1px solid var(--sd-border-light)", background: "var(--sd-bg-primary)" }}
                >
                  <m.icon size={11} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />
                  <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.label}</span>
                  <Badge label={STATUS_LABEL[m.status]} tone={STATUS_TONE[m.status]} variant="status" size="sm" />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Gantt chart area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Week header */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${NUM_WEEKS}, 1fr)`, height: 36, borderBottom: "1px solid var(--sd-border-light)", background: "var(--sd-bg-secondary)", position: "relative" }}>
            {WEEK_LABELS.map((w, i) => (
              <div key={w} style={{ display: "flex", alignItems: "center", justifyContent: "center", borderRight: i < NUM_WEEKS - 1 ? "1px solid var(--sd-border-light)" : "none", fontSize: 10, fontWeight: i === TODAY_WEEK ? 700 : 500, color: i === TODAY_WEEK ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)" }}>
                {w}
              </div>
            ))}
            {/* Today marker */}
            <div style={{ position: "absolute", left: `${(TODAY_WEEK + 0.5) / NUM_WEEKS * 100}%`, top: 0, bottom: 0, width: 1.5, background: TONES.blue.solid, opacity: 0.6 }} />
          </div>

          {/* Campaign row gantt bars */}
          {rows.map(row => (
            <React.Fragment key={row.id}>
              {/* Campaign summary row — shows condensed bars */}
              <div
                style={{ height: 48, borderBottom: "1px solid var(--sd-border-light)", position: "relative", background: "var(--sd-bg-secondary)" }}
              >
                <div style={{ display: "grid", gridTemplateColumns: `repeat(${NUM_WEEKS}, 1fr)`, height: "100%", position: "absolute", inset: 0 }}>
                  {Array.from({ length: NUM_WEEKS }).map((_, i) => (
                    <div key={i} style={{ borderRight: i < NUM_WEEKS - 1 ? "1px solid var(--sd-border-light)" : "none" }} />
                  ))}
                </div>
                {/* All milestones condensed into the summary row */}
                <div style={{ position: "absolute", inset: 0 }}>
                  {row.milestones.map(m => <GanttBar key={m.id} milestone={m} colCount={NUM_WEEKS} />)}
                </div>
                {/* Today line */}
                <div style={{ position: "absolute", left: `${(TODAY_WEEK + 0.5) / NUM_WEEKS * 100}%`, top: 0, bottom: 0, width: 1.5, background: TONES.blue.solid, opacity: 0.4, zIndex: 2 }} />
              </div>

              {/* Expanded: individual milestone rows */}
              {row.expanded && row.milestones.map(m => (
                <div
                  key={m.id}
                  style={{ height: 36, borderBottom: "1px solid var(--sd-border-light)", position: "relative", background: "var(--sd-bg-primary)" }}
                >
                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${NUM_WEEKS}, 1fr)`, height: "100%", position: "absolute", inset: 0 }}>
                    {Array.from({ length: NUM_WEEKS }).map((_, i) => (
                      <div key={i} style={{ borderRight: i < NUM_WEEKS - 1 ? "1px solid var(--sd-border-light)" : "none" }} />
                    ))}
                  </div>
                  <div style={{ position: "absolute", inset: 0 }}>
                    <GanttBar milestone={m} colCount={NUM_WEEKS} />
                  </div>
                  {/* Today line */}
                  <div style={{ position: "absolute", left: `${(TODAY_WEEK + 0.5) / NUM_WEEKS * 100}%`, top: 0, bottom: 0, width: 1.5, background: TONES.blue.solid, opacity: 0.4, zIndex: 2 }} />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ---- Legend ---- */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderTop: "1px solid var(--sd-border-light)", background: "var(--sd-bg-secondary)", flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Status:</span>
        {(["completed", "active", "upcoming", "late"] as MilestoneStatus[]).map(s => (
          <Badge key={s} label={STATUS_LABEL[s]} tone={STATUS_TONE[s]} variant="status" size="sm" />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 8 }}>
          <div style={{ width: 10, height: 10, background: TONES.blue.solid, borderRadius: 2 }} />
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Today</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                  */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "campaign-timeline",
  title: "Campaign Timeline",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Gantt-style campaign timeline showing milestone spans across campaigns — with collapse/expand per campaign.",
  description:
    "The Campaign Timeline gives brand managers and campaign owners a portfolio-level view across all active campaigns. Each row shows a campaign with its milestones rendered as horizontal Gantt bars spanning a 12-week window. Clicking the chevron expands a campaign to show individual milestone rows. A vertical 'today' line anchors the view in time. Status colors follow the standard tone system: green=done, blue=active, gray=upcoming, red=late.",
  demos: [
    {
      title: "12-week view",
      description: "3 campaigns — Spring Drop expanded, Summer Glow and Holiday Prep collapsed.",
      render: () => <CampaignTimeline />,
    },
  ],
};

export default doc;
