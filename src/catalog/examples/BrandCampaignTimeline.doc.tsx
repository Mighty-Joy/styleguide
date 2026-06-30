"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconClock,
  IconLock,
  IconAlertTriangle,
  IconFileText,
  IconUsers,
  IconStar,
  IconMessageCircle,
  IconPhoto,
  IconEye,
  IconChartBar,
  IconCircle,
  IconChevronRight,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type PhaseStatus = "done" | "active" | "upcoming" | "blocked";

interface Phase {
  id: string;
  label: string;
  description: string;
  date: string;
  status: PhaseStatus;
  icon: React.ElementType;
  tone: keyof typeof TONES;
  tasks: { text: string; done: boolean }[];
}

const PHASES: Phase[] = [
  {
    id: "ph1", label: "Campaign brief",     date: "Jun 1",  status: "done",    icon: IconFileText,     tone: "gray",
    description: "Campaign goals, deliverables, and content guidelines finalized.",
    tasks: [{ text: "Brief published", done: true }, { text: "Budget approved", done: true }],
  },
  {
    id: "ph2", label: "Creator applications", date: "Jun 3–7", status: "done",  icon: IconUsers,       tone: "blue",
    description: "Applications open to eligible creators in the network.",
    tasks: [{ text: "47 applications received", done: true }, { text: "5 creators shortlisted", done: true }],
  },
  {
    id: "ph3", label: "Creator selection",  date: "Jun 8",  status: "done",    icon: IconStar,         tone: "yellow",
    description: "Final creator roster approved and contracts sent.",
    tasks: [{ text: "5 creators selected", done: true }, { text: "Contracts signed", done: true }],
  },
  {
    id: "ph4", label: "Briefing & kickoff", date: "Jun 9",  status: "done",    icon: IconMessageCircle, tone: "purple",
    description: "Creators receive full brief and product shipments dispatched.",
    tasks: [{ text: "Briefing calls complete", done: true }, { text: "Product shipped to all 5", done: true }],
  },
  {
    id: "ph5", label: "Content creation",   date: "Jun 10–20", status: "done", icon: IconPhoto,        tone: "pink",
    description: "Creators produce and submit drafts for brand review.",
    tasks: [{ text: "14/16 drafts submitted", done: true }, { text: "2 revisions requested", done: true }],
  },
  {
    id: "ph6", label: "Brand review",       date: "Jun 21–24", status: "active", icon: IconEye,        tone: "orange",
    description: "Brand reviews final content for compliance and quality.",
    tasks: [{ text: "12/14 posts approved", done: true }, { text: "2 posts under final review", done: false }],
  },
  {
    id: "ph7", label: "Publication",        date: "Jun 25–28", status: "upcoming", icon: IconChartBar, tone: "green",
    description: "Approved content goes live across creator channels.",
    tasks: [{ text: "Schedule posts", done: false }, { text: "Monitor live performance", done: false }],
  },
  {
    id: "ph8", label: "Wrap report",        date: "Jul 3",  status: "upcoming", icon: IconChartBar,    tone: "teal" as any,
    description: "Final KPIs compiled and shared with stakeholders.",
    tasks: [{ text: "Aggregate metrics", done: false }, { text: "Publish wrap report", done: false }],
  },
];

const STATUS_META: Record<PhaseStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  done:     { label: "Done",     tone: "green",  icon: IconCheck         },
  active:   { label: "In progress", tone: "orange", icon: IconClock      },
  upcoming: { label: "Upcoming", tone: "gray",   icon: IconCircle        },
  blocked:  { label: "Blocked",  tone: "red",    icon: IconAlertTriangle },
};

function Demo() {
  const [selected, setSelected] = useState<string>("ph6");

  const activeIdx   = PHASES.findIndex((p) => p.status === "active");
  const selectedPhase = PHASES.find((p) => p.id === selected)!;
  const completedCount = PHASES.filter((p) => p.status === "done").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Summer Glow Campaign</div>
          <Badge label="In progress" tone="orange" size="sm" dot />
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Phase {activeIdx + 1} of {PHASES.length} · {completedCount} completed</div>
      </div>

      {/* Phase progress bar */}
      <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
        {PHASES.map((p, i) => (
          <div key={p.id} style={{ flex: 1, height: 4, borderRadius: 2, background: p.status === "done" ? TONES.green.text : p.status === "active" ? TONES.orange.text : "var(--sd-bg-tertiary,#e5e7eb)" }} />
        ))}
      </div>

      {/* Timeline */}
      <div style={{ display: "flex", gap: 16 }}>
        {/* Left column: phase list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0, width: 140, flexShrink: 0 }}>
          {PHASES.map((phase, i) => {
            const meta    = STATUS_META[phase.status];
            const isLast  = i === PHASES.length - 1;
            const isSelected = selected === phase.id;

            return (
              <div key={phase.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                {/* Connector */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <button onClick={() => setSelected(phase.id)}
                    style={{ width: 24, height: 24, borderRadius: 99, border: `2px solid ${isSelected ? "#111" : phase.status === "done" ? TONES.green.text : phase.status === "active" ? TONES.orange.text : "var(--sd-border-default,#e5e7eb)"}`, background: phase.status === "done" ? TONES.green.text : phase.status === "active" ? TONES.orange.text : isSelected ? "#111" : "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                    {phase.status === "done"
                      ? <IconCheck size={12} style={{ color: "#fff" }} />
                      : phase.status === "active"
                        ? <IconClock size={11} style={{ color: "#fff" }} />
                        : <div style={{ width: 7, height: 7, borderRadius: 99, background: isSelected ? "#fff" : "var(--sd-bg-tertiary,#e5e7eb)" }} />}
                  </button>
                  {!isLast && <div style={{ width: 1, flexGrow: 1, minHeight: 24, background: phase.status === "done" ? TONES.green.text + "40" : "var(--sd-border-default,#e5e7eb)", marginTop: 2, marginBottom: 2 }} />}
                </div>

                {/* Label */}
                <div style={{ paddingBottom: isLast ? 0 : 12, paddingTop: 3 }}>
                  <button onClick={() => setSelected(phase.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                    <div style={{ fontSize: 11, fontWeight: isSelected || phase.status === "active" ? 800 : 600, color: isSelected ? "#111" : phase.status === "done" ? TONES.green.text : phase.status === "active" ? TONES.orange.text : "var(--sd-font-tertiary,#999)", lineHeight: 1.2 }}>
                      {phase.label}
                    </div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#bbb)", marginTop: 1 }}>{phase.date}</div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right panel: detail */}
        <div style={{ flex: 1, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, padding: "12px 13px" }}>
          <div style={{ display: "flex", gap: 7, alignItems: "center", marginBottom: 4 }}>
            <selectedPhase.icon size={14} style={{ color: TONES[selectedPhase.tone]?.text ?? "#111" }} />
            <div style={{ fontSize: 12, fontWeight: 800 }}>{selectedPhase.label}</div>
            <Badge label={STATUS_META[selectedPhase.status].label} tone={STATUS_META[selectedPhase.status].tone} size="sm" />
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginBottom: 10, lineHeight: 1.5 }}>{selectedPhase.description}</div>
          <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 6 }}>Phase tasks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {selectedPhase.tasks.map((task, i) => (
              <div key={i} style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, background: task.done ? TONES.green.text : "var(--sd-bg-tertiary,#f1f1f1)", border: `1px solid ${task.done ? TONES.green.text : "var(--sd-border-default,#e5e7eb)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {task.done && <IconCheck size={10} style={{ color: "#fff" }} />}
                </div>
                <span style={{ fontSize: 11, color: task.done ? "var(--sd-font-secondary,#555)" : "var(--sd-font-primary,#111)", textDecoration: task.done ? "line-through" : "none", opacity: task.done ? 0.7 : 1 }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 9, color: "var(--sd-font-tertiary,#bbb)", borderTop: "1px solid var(--sd-border-default,#e5e7eb)", paddingTop: 8 }}>
            Scheduled: {selectedPhase.date}
          </div>
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-campaign-timeline",
  title: "BrandCampaignTimeline",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "8-phase campaign lifecycle tracker — vertical timeline with done/active/upcoming states, segmented progress bar, and a detail panel with phase tasks when a phase is selected.",
  description:
    "Brand tracks where a campaign is in its lifecycle. Header: campaign name + 'In progress' orange dot badge + phase count. Segmented progress bar: 8 equal segments — done phases green, active orange, upcoming gray. Vertical timeline left column: 8 rows each with a 24×24 circle node (green + check for done / orange + clock for active / hollow gray for upcoming) connected by 1px vertical lines (green-tinted between done phases, gray otherwise); label text is bold+colored when active or selected, green when done, gray when upcoming; date sub-label in light gray. Clicking a phase selects it and shows the right detail panel: icon + title + status badge, description text, task checklist (green filled check + strikethrough for done / empty for pending), scheduled date footer. Pre-selected: 'Brand review' (active, phase 6 / 8) with 12/14 done + 2 pending tasks. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign timeline",
      description: "Click any phase node or label to open its detail panel. Done phases are green, the current active phase is orange, upcoming phases are gray.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
