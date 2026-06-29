"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { ProgressBar } from "@/components/ui/ProgressBar/ProgressBar";
import { PlatformIcon } from "@/components/ui/PlatformIcon/PlatformIcon";
import {
  IconCheck,
  IconAlertTriangle,
  IconClock,
  IconFileText,
  IconFilter,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

type Stage =
  | "briefed"
  | "scripting"
  | "filming"
  | "editing"
  | "review"
  | "approved"
  | "published";

const STAGES: Stage[] = [
  "briefed",
  "scripting",
  "filming",
  "editing",
  "review",
  "approved",
  "published",
];

const STAGE_LABEL: Record<Stage, string> = {
  briefed:   "Briefed",
  scripting: "Script",
  filming:   "Filming",
  editing:   "Editing",
  review:    "Review",
  approved:  "Approved",
  published: "Published",
};

const STAGE_TONE: Record<
  Stage,
  "gray" | "blue" | "orange" | "purple" | "yellow" | "green" | "turquoise"
> = {
  briefed:   "gray",
  scripting: "blue",
  filming:   "orange",
  editing:   "purple",
  review:    "yellow",
  approved:  "green",
  published: "turquoise",
};

type Flag = "on_track" | "at_risk" | "overdue";

interface Deliverable {
  id: string;
  creator: string;
  platform: "instagram" | "tiktok" | "youtube";
  contentType: string;
  stage: Stage;
  dueDate: string;
  flag: Flag;
  deal: string;
}

const DATA: Deliverable[] = [
  {
    id: "d1",
    creator: "Priya Nair",
    platform: "instagram",
    contentType: "Reel",
    stage: "review",
    dueDate: "Aug 12",
    flag: "on_track",
    deal: "Atlas X",
  },
  {
    id: "d2",
    creator: "Diego Santos",
    platform: "tiktok",
    contentType: "Short",
    stage: "filming",
    dueDate: "Aug 14",
    flag: "at_risk",
    deal: "Atlas X",
  },
  {
    id: "d3",
    creator: "Marcus Webb",
    platform: "tiktok",
    contentType: "Short",
    stage: "scripting",
    dueDate: "Aug 20",
    flag: "on_track",
    deal: "Atlas X",
  },
  {
    id: "d4",
    creator: "Hana Kim",
    platform: "instagram",
    contentType: "Post",
    stage: "briefed",
    dueDate: "Aug 7",
    flag: "overdue",
    deal: "Atlas X",
  },
  {
    id: "d5",
    creator: "Liam Park",
    platform: "youtube",
    contentType: "Integration",
    stage: "approved",
    dueDate: "Sep 1",
    flag: "on_track",
    deal: "Atlas X",
  },
  {
    id: "d6",
    creator: "Aisha Obi",
    platform: "instagram",
    contentType: "Story",
    stage: "published",
    dueDate: "Aug 2",
    flag: "on_track",
    deal: "Atlas X",
  },
];

const FLAG_ICON: Record<Flag, React.ReactNode> = {
  on_track: <IconCheck size={13} color="var(--sd-green-solid, #22c55e)" />,
  at_risk:  <IconAlertTriangle size={13} color="var(--sd-orange-solid, #f97316)" />,
  overdue:  <IconClock size={13} color="var(--sd-red-solid, #ef4444)" />,
};

const FLAG_TONE: Record<Flag, "green" | "orange" | "red"> = {
  on_track: "green",
  at_risk:  "orange",
  overdue:  "red",
};

const FLAG_LABEL: Record<Flag, string> = {
  on_track: "On track",
  at_risk:  "At risk",
  overdue:  "Overdue",
};

function stageIndex(s: Stage) {
  return STAGES.indexOf(s);
}

function pctComplete(s: Stage) {
  return Math.round(((stageIndex(s) + 1) / STAGES.length) * 100);
}

/* Mini pipeline bar — shows which stage we're on */
function StagePipeline({ current }: { current: Stage }) {
  const idx = stageIndex(current);
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {STAGES.map((s, i) => (
        <div
          key={s}
          title={STAGE_LABEL[s]}
          style={{
            height: 4,
            width: i <= idx ? 14 : 10,
            borderRadius: 99,
            background:
              i < idx
                ? "var(--sd-green-solid, #22c55e)"
                : i === idx
                ? "var(--sd-blue-solid, #3b82f6)"
                : "var(--sd-border-default, #e5e7eb)",
            transition: "width 0.2s",
          }}
        />
      ))}
    </div>
  );
}

type FilterFlag = "all" | Flag;

function Demo() {
  const [filter, setFilter] = useState<FilterFlag>("all");

  const visible =
    filter === "all" ? DATA : DATA.filter((d) => d.flag === filter);

  const counts = {
    on_track: DATA.filter((d) => d.flag === "on_track").length,
    at_risk:  DATA.filter((d) => d.flag === "at_risk").length,
    overdue:  DATA.filter((d) => d.flag === "overdue").length,
  };

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 760 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--sd-font-primary, #333)" }}>
            Deliverables
          </div>
          <div style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", marginTop: 2 }}>
            {DATA.length} pieces · Atlas X campaign
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["all", "on_track", "at_risk", "overdue"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "4px 10px",
                borderRadius: 99,
                border: "1px solid",
                borderColor: filter === f ? "var(--sd-font-primary, #333)" : "var(--sd-border-default, #e5e7eb)",
                background: filter === f ? "var(--sd-font-primary, #333)" : "transparent",
                color: filter === f ? "#fff" : "var(--sd-font-secondary, #666)",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {f === "all"
                ? `All (${DATA.length})`
                : f === "on_track"
                ? `On track (${counts.on_track})`
                : f === "at_risk"
                ? `At risk (${counts.at_risk})`
                : `Overdue (${counts.overdue})`}
            </button>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "12px 16px",
          background: "#f8f8f8",
          borderRadius: 10,
          marginBottom: 12,
          flexWrap: "wrap",
        }}
      >
        {(["briefed", "scripting", "filming", "editing", "review", "approved", "published"] as Stage[]).map(
          (s) => {
            const n = DATA.filter((d) => d.stage === s).length;
            return (
              <div key={s} style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                <span style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary, #333)" }}>{n}</span>
                <Badge label={STAGE_LABEL[s]} tone={STAGE_TONE[s]} size="sm" />
              </div>
            );
          }
        )}
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
        {/* Column headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.5fr 1fr",
            gap: 0,
            padding: "8px 16px",
            background: "#fafafa",
            borderBottom: "1px solid var(--sd-border-default, #e5e7eb)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--sd-font-tertiary, #999)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          <span>Creator · Content</span>
          <span>Stage</span>
          <span>Progress</span>
          <span>Pipeline</span>
          <span>Due</span>
        </div>

        {visible.length === 0 && (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              color: "var(--sd-font-tertiary, #999)",
              fontSize: 13,
            }}
          >
            No deliverables match this filter.
          </div>
        )}

        {visible.map((d, i) => (
          <div
            key={d.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1.5fr 1fr",
              gap: 0,
              padding: "12px 16px",
              alignItems: "center",
              borderBottom:
                i < visible.length - 1
                  ? "1px solid var(--sd-border-default, #e5e7eb)"
                  : "none",
              background: "#fff",
            }}
          >
            {/* Creator + content */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={d.creator} size="sm" />
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--sd-font-primary, #333)",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {d.creator}
                  <span style={{ color: "var(--sd-font-tertiary, #999)" }}>
                    {FLAG_ICON[d.flag]}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--sd-font-tertiary, #999)",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 1,
                  }}
                >
                  <PlatformIcon platform={d.platform} size={11} />
                  {d.contentType}
                </div>
              </div>
            </div>

            {/* Stage badge */}
            <Badge label={STAGE_LABEL[d.stage]} tone={STAGE_TONE[d.stage]} size="sm" />

            {/* Progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ProgressBar
                value={pctComplete(d.stage)}
                max={100}
                tone={d.flag === "overdue" ? "red" : d.flag === "at_risk" ? "orange" : "green"}
                height={4}
              />
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", whiteSpace: "nowrap" }}>
                {pctComplete(d.stage)}%
              </span>
            </div>

            {/* Mini pipeline */}
            <StagePipeline current={d.stage} />

            {/* Due date */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color:
                    d.flag === "overdue"
                      ? "var(--sd-red-solid, #ef4444)"
                      : d.flag === "at_risk"
                      ? "var(--sd-orange-solid, #f97316)"
                      : "var(--sd-font-secondary, #666)",
                }}
              >
                {d.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "deliverable-tracker",
  title: "DeliverableTracker",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Track all content deliverables across a campaign — stage, progress bar, pipeline visualization, and on-track / at-risk / overdue flags.",
  description:
    "Campaign PM view for tracking every piece of content through the production pipeline: Briefed → Script → Filming → Editing → Review → Approved → Published. Composes Avatar, Badge, Button, ProgressBar, and PlatformIcon. Filter by health flag. Mini pipeline bars show relative position at a glance.",
  demos: [
    {
      title: "Atlas X campaign deliverables",
      description: "6 creators, 6 pieces. Filter by flag. Progress bars reflect stage completion.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
