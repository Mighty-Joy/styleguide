"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconClock,
  IconAlertTriangle,
  IconX,
  IconMinus,
  IconEye,
  IconBrandInstagram,
  IconBrandTiktok,
  IconPhoto,
  IconVideo,
  IconChevronRight,
  IconDownload,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type DelivStatus = "approved" | "reviewing" | "revision" | "late" | "not_started" | "submitted";

interface Deliverable {
  key: string;
  label: string;
  icon: React.ElementType;
  platform: "instagram" | "tiktok";
  dueDate: string;
}

interface Creator {
  id: string;
  name: string;
  initials: string;
  tone: "pink" | "orange" | "blue" | "green" | "purple";
}

type CellState = Record<string, Record<string, DelivStatus>>;

const DELIVERABLES: Deliverable[] = [
  { key: "ig_reel",   label: "IG Reel",    icon: IconVideo,  platform: "instagram", dueDate: "Jul 1"  },
  { key: "ig_story",  label: "IG Story",   icon: IconPhoto,  platform: "instagram", dueDate: "Jul 3"  },
  { key: "tt_video",  label: "TikTok",     icon: IconVideo,  platform: "tiktok",    dueDate: "Jul 5"  },
  { key: "ig_post",   label: "IG Post",    icon: IconPhoto,  platform: "instagram", dueDate: "Jul 8"  },
];

const CREATORS: Creator[] = [
  { id: "c1", name: "Priya Nair",    initials: "PN", tone: "pink"   },
  { id: "c2", name: "Marcus Webb",   initials: "MW", tone: "orange" },
  { id: "c3", name: "Ji-ho Kim",     initials: "JK", tone: "blue"   },
  { id: "c4", name: "Amara Diallo",  initials: "AD", tone: "green"  },
  { id: "c5", name: "Sofia Reyes",   initials: "SR", tone: "purple" },
];

const INITIAL_CELLS: CellState = {
  c1: { ig_reel: "approved",  ig_story: "approved",   tt_video: "reviewing",   ig_post: "not_started" },
  c2: { ig_reel: "approved",  ig_story: "revision",   tt_video: "submitted",   ig_post: "not_started" },
  c3: { ig_reel: "reviewing", ig_story: "not_started",tt_video: "approved",    ig_post: "late"        },
  c4: { ig_reel: "late",      ig_story: "revision",   tt_video: "not_started", ig_post: "not_started" },
  c5: { ig_reel: "submitted", ig_story: "not_started",tt_video: "not_started", ig_post: "not_started" },
};

const STATUS_META: Record<DelivStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType; bg: string; color: string }> = {
  approved:    { label: "Approved",          tone: "green",  icon: IconCheck,         bg: TONES.green.tint,  color: TONES.green.text  },
  reviewing:   { label: "Under review",      tone: "blue",   icon: IconEye,           bg: TONES.blue.tint,   color: TONES.blue.text   },
  submitted:   { label: "Submitted",         tone: "sky",    icon: IconEye,           bg: TONES.sky.tint,    color: TONES.sky.text    },
  revision:    { label: "Revision needed",   tone: "yellow", icon: IconAlertTriangle, bg: TONES.yellow.tint, color: TONES.yellow.text },
  late:        { label: "Late",              tone: "red",    icon: IconX,             bg: TONES.red.tint,    color: TONES.red.text    },
  not_started: { label: "Not started",       tone: "gray",   icon: IconMinus,         bg: "var(--sd-bg-secondary,#f4f4f5)", color: "var(--sd-font-tertiary,#bbb)" },
};

const STATUS_CYCLE: DelivStatus[] = ["not_started","submitted","reviewing","revision","approved","late"];

/* ---- Demo ---- */
function Demo() {
  const [cells,     setCells]   = useState<CellState>(INITIAL_CELLS);
  const [selected,  setSelected] = useState<{ cid: string; dk: string } | null>(null);
  const [filter,    setFilter]  = useState<DelivStatus | "all">("all");

  function cycleStatus(cid: string, dk: string) {
    setCells((prev) => {
      const cur = prev[cid][dk];
      const idx = STATUS_CYCLE.indexOf(cur);
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      return { ...prev, [cid]: { ...prev[cid], [dk]: next } };
    });
  }

  // Summary counts across all cells
  const allCells = CREATORS.flatMap((c) => DELIVERABLES.map((d) => cells[c.id][d.key]));
  const countOf = (s: DelivStatus) => allCells.filter((v) => v === s).length;

  const approved   = countOf("approved");
  const revision   = countOf("revision");
  const late       = countOf("late");
  const reviewing  = countOf("reviewing") + countOf("submitted");

  const sel = selected ? { c: CREATORS.find((c) => c.id === selected.cid)!, d: DELIVERABLES.find((d) => d.key === selected.dk)!, status: cells[selected.cid][selected.dk] } : null;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Deliverable matrix</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign · 5 creators · 4 deliverables</div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconDownload size={11} />}>Export</Button>
      </div>

      {/* Summary row */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { label: `${approved} approved`,   tone: "green"  as const },
          { label: `${reviewing} in review`, tone: "blue"   as const },
          { label: `${revision} revision`,   tone: "yellow" as const },
          { label: `${late} late`,           tone: "red"    as const },
        ].map(({ label, tone }) => (
          <Badge key={label} label={label} tone={tone} size="sm" dot />
        ))}
      </div>

      {/* Matrix grid */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ width: 130, padding: "0 8px 8px 0", textAlign: "left" }}></th>
              {DELIVERABLES.map((d) => {
                const DIcon = d.icon;
                const PIcon = d.platform === "instagram" ? IconBrandInstagram : IconBrandTiktok;
                const ptone = d.platform === "instagram" ? "pink" as const : "blue" as const;
                return (
                  <th key={d.key} style={{ padding: "0 4px 8px", textAlign: "center", minWidth: 86 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <PIcon size={10} style={{ color: TONES[ptone].text }} />
                        <span style={{ fontSize: 10, fontWeight: 800 }}>{d.label}</span>
                      </div>
                      <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>Due {d.dueDate}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {CREATORS.map((creator) => (
              <tr key={creator.id}>
                <td style={{ padding: "4px 8px 4px 0" }}>
                  <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <Avatar initials={creator.initials} tone={creator.tone} size="sm" />
                    <span style={{ fontSize: 11, fontWeight: 700 }}>{creator.name.split(" ")[0]}</span>
                  </div>
                </td>
                {DELIVERABLES.map((d) => {
                  const status = cells[creator.id][d.key];
                  const meta   = STATUS_META[status];
                  const Icon   = meta.icon;
                  const isSelected = selected?.cid === creator.id && selected?.dk === d.key;
                  return (
                    <td key={d.key} style={{ padding: "4px", textAlign: "center" }}>
                      <button
                        onClick={() => setSelected(isSelected ? null : { cid: creator.id, dk: d.key })}
                        title={`${creator.name} · ${d.label}: ${meta.label}. Click to select, right-click to cycle.`}
                        onContextMenu={(e) => { e.preventDefault(); cycleStatus(creator.id, d.key); }}
                        style={{ width: 72, height: 34, borderRadius: 8, background: meta.bg, border: `2px solid ${isSelected ? "#111" : "transparent"}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, transition: "border 0.15s" }}>
                        <Icon size={12} style={{ color: meta.color }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: meta.color }}>{status === "not_started" ? "—" : meta.label.split(" ")[0]}</span>
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail panel */}
      {sel && (
        <div style={{ marginTop: 12, padding: "12px 14px", border: `1.5px solid ${TONES[STATUS_META[sel.status].tone].text}50`, borderRadius: 11, background: TONES[STATUS_META[sel.status].tone].tint }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <Avatar initials={sel.c.initials} tone={sel.c.tone} size="sm" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800 }}>{sel.c.name} · {sel.d.label}</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Due {sel.d.dueDate}</div>
            </div>
            <Badge label={STATUS_META[sel.status].label} tone={STATUS_META[sel.status].tone} size="sm" dot />
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            {sel.status === "reviewing" || sel.status === "submitted" ? (
              <>
                <Button variant="primary" size="sm" leftIcon={<IconCheck size={11} />}
                  onClick={() => { setCells((p) => ({ ...p, [sel.c.id]: { ...p[sel.c.id], [sel.d.key]: "approved" } })); setSelected(null); }}
                  style={{ background: TONES.green.text, borderColor: TONES.green.text }}>Approve</Button>
                <Button variant="secondary" size="sm" leftIcon={<IconAlertTriangle size={11} />}
                  onClick={() => { setCells((p) => ({ ...p, [sel.c.id]: { ...p[sel.c.id], [sel.d.key]: "revision" } })); setSelected(null); }}>
                  Request revision</Button>
              </>
            ) : sel.status === "late" ? (
              <Button variant="secondary" size="sm" leftIcon={<IconChevronRight size={11} />}>Send reminder</Button>
            ) : sel.status === "revision" ? (
              <Button variant="secondary" size="sm" leftIcon={<IconEye size={11} />}>View revision notes</Button>
            ) : null}
            <button onClick={() => setSelected(null)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>Dismiss</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 10, fontSize: 10, color: "var(--sd-font-tertiary,#999)", textAlign: "center" }}>
        Click a cell to select · Right-click to cycle status
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-deliverable-matrix",
  title: "CampaignDeliverableMatrix",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand's creator × deliverable control room — 5×4 matrix with 6 status states (approved/reviewing/revision/late/not-started), click-to-select detail panel with contextual CTAs, right-click to cycle.",
  description:
    "Bird's-eye view of all campaign deliverables across all creators. Header: campaign name + creator/deliverable counts, Export CTA. 4 summary badges: approved / in review / revision / late counts across all cells. Scrollable table: creator rows (Avatar sm + first name) × deliverable columns (platform icon + label + due date). Each cell: 72×34px tinted button with status icon + first-word label (green Approved / blue Under review / sky Submitted / yellow Revision / red Late / gray dash). Click → selects (2px black border) and opens detail panel below. Detail panel: Avatar + creator name + deliverable + due date + status badge. Contextual CTAs: reviewing/submitted → Approve (green) + Request revision; late → Send reminder; revision → View revision notes. Right-click any cell to cycle through statuses for demo purposes. Pre-seeded: Priya approved on IG + story, reviewing TikTok; Ji-ho late on IG Reel; Amara late IG + revision story; Marcus revision on story; Sofia submitted but not started others. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign deliverable matrix",
      description: "Click any colored cell to select and open the detail panel with contextual CTAs. Right-click a cell to cycle through statuses. Priya Nair's TikTok is pre-selected.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
