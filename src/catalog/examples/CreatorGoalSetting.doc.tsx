"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconEdit,
  IconTrendingUp,
  IconTrendingDown,
  IconMinus,
  IconCurrencyDollar,
  IconBriefcase,
  IconUsers,
  IconHeart,
  IconCalendar,
  IconTarget,
  IconChevronRight,
  IconRefresh,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type GoalStatus = "on_track" | "at_risk" | "exceeded" | "not_started";

interface Goal {
  id: string;
  label: string;
  icon: React.ElementType;
  tone: keyof typeof TONES;
  target: number;
  current: number;
  unit: string;
  prefix?: string;
  status: GoalStatus;
  pace: string;
}

const STATUS_META: Record<GoalStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  on_track:    { label: "On track",    tone: "green",  icon: IconTrendingUp   },
  at_risk:     { label: "At risk",     tone: "yellow", icon: IconTrendingDown },
  exceeded:    { label: "Exceeded!",   tone: "blue",   icon: IconTrendingUp   },
  not_started: { label: "Not started", tone: "gray",   icon: IconMinus        },
};

const INITIAL_GOALS: Goal[] = [
  { id: "g1", label: "Quarterly earnings",   icon: IconCurrencyDollar, tone: "green",  prefix: "$", target: 12000, current: 7750,  unit: "",          status: "on_track",    pace: "$4,250 needed in 6 weeks — you're on pace" },
  { id: "g2", label: "Campaigns completed",  icon: IconBriefcase,      tone: "blue",   prefix: "",  target: 6,     current: 4,      unit: " campaigns", status: "on_track",    pace: "2 remaining — 1 active, 1 contracted"       },
  { id: "g3", label: "Follower growth",      icon: IconUsers,          tone: "purple", prefix: "",  target: 20000, current: 5200,   unit: " new",       status: "at_risk",     pace: "On pace for ~12K — increase posting freq."  },
  { id: "g4", label: "Avg engagement rate",  icon: IconHeart,          tone: "pink",   prefix: "",  target: 8,     current: 8.6,    unit: "%",          status: "exceeded",    pace: "Already exceeding target by 0.6%"           },
  { id: "g5", label: "New brand partners",   icon: IconBriefcase,      tone: "orange", prefix: "",  target: 4,     current: 2,      unit: " brands",    status: "on_track",    pace: "Summer Glow + NovaSkin expected this month" },
];

function EditableNumber({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  return editing ? (
    <input value={draft} autoFocus onChange={(e) => setDraft(e.target.value)}
      onBlur={() => { setEditing(false); const n = parseInt(draft); if (!isNaN(n)) onChange(n); }}
      style={{ width: 80, border: "none", borderBottom: "2px solid #111", outline: "none", fontSize: 16, fontWeight: 900, fontFamily: "inherit", background: "transparent" }} />
  ) : (
    <span onClick={() => { setDraft(String(value)); setEditing(true); }} style={{ cursor: "text", borderBottom: "2px dashed var(--sd-border-default,#e5e7eb)" }}>{value.toLocaleString()}</span>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [goals, setGoals] = useState<Goal[]>(INITIAL_GOALS);
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);
  const [period, setPeriod] = useState<"q2" | "q3">("q3");

  function updateTarget(id: string, target: number) {
    setGoals((prev) => prev.map((g) => g.id === id ? { ...g, target } : g));
  }

  function save() {
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }, 900);
  }

  const onTrack   = goals.filter((g) => g.status === "on_track").length;
  const atRisk    = goals.filter((g) => g.status === "at_risk").length;
  const exceeded  = goals.filter((g) => g.status === "exceeded").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Creator goals</div>
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <Badge label={`${onTrack} on track`}  tone="green"  size="sm" dot />
            {atRisk   > 0 && <Badge label={`${atRisk} at risk`}  tone="yellow" size="sm" dot />}
            {exceeded > 0 && <Badge label={`${exceeded} exceeded`} tone="blue"   size="sm" dot />}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["q2","q3"] as const).map((q) => (
            <button key={q} onClick={() => setPeriod(q)}
              style={{ padding: "4px 10px", borderRadius: 99, background: period === q ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: period === q ? "#fff" : "var(--sd-font-secondary,#555)", textTransform: "uppercase" }}>
              {q} 2025
            </button>
          ))}
        </div>
      </div>

      {/* Progress summary ring-less version */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Weeks left",   value: "6",   tone: "gray"   as const },
          { label: "Goals on track", value: `${onTrack}/${goals.length}`, tone: "green"  as const },
          { label: "Est. earnings",  value: "$12K", tone: "orange" as const },
        ].map(({ label, value, tone }) => (
          <div key={label} style={{ padding: "10px 12px", background: TONES[tone].tint, borderRadius: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: TONES[tone].text }}>{value}</div>
            <div style={{ fontSize: 10, color: TONES[tone].text, opacity: 0.8 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Goal cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
        {goals.map((g) => {
          const GIcon = g.icon;
          const { label, tone, icon: SIcon } = STATUS_META[g.status];
          const pct = Math.min((g.current / g.target) * 100, 100);
          const barTone = g.status === "exceeded" ? "blue" : g.status === "at_risk" ? "yellow" : g.tone;

          return (
            <div key={g.id} style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12 }}>
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: TONES[g.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <GIcon size={14} style={{ color: TONES[g.tone].text }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700 }}>{g.label}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
                    {g.prefix}{g.current.toLocaleString()}{g.unit} of{" "}
                    <span style={{ color: "#111", fontWeight: 700 }}>
                      {g.prefix}<EditableNumber value={g.target} onChange={(v) => updateTarget(g.id, v)} />{g.unit}
                    </span>
                    {" "}target
                  </div>
                </div>
                <Badge label={label} tone={tone} size="sm" dot />
              </div>

              {/* Progress bar */}
              <div style={{ height: 6, background: "var(--sd-bg-tertiary,#f1f1f1)", borderRadius: 3, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: TONES[barTone].text, borderRadius: 3, transition: "width 0.5s ease" }} />
              </div>

              {/* Pace note */}
              <div style={{ fontSize: 10, color: tone === "green" ? TONES.green.text : tone === "yellow" ? TONES.yellow.text : tone === "blue" ? TONES.blue.text : "var(--sd-font-tertiary,#999)", fontWeight: 600 }}>
                {g.pace}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="secondary" size="sm" leftIcon={<IconRefresh size={11} />} onClick={() => setGoals(INITIAL_GOALS)}>Reset</Button>
        <Button variant="primary" size="sm" onClick={save} style={{ flex: 1 }}
          leftIcon={saved ? <IconCheck size={11} /> : <IconTarget size={11} />}>
          {saved ? "Goals saved!" : saving ? "Saving…" : "Save goals"}
        </Button>
      </div>
      <div style={{ marginTop: 8, fontSize: 10, color: "var(--sd-font-tertiary,#999)", textAlign: "center" }}>
        Click any target number to edit it inline
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-goal-setting",
  title: "CreatorGoalSetting",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Quarterly creator goal planner — 5 goals (earnings, campaigns, followers, ER, brands) with editable targets, progress bars, on-track/at-risk/exceeded status badges and pace notes.",
  description:
    "Lets creators set and track quarterly performance goals. Header: on-track/at-risk/exceeded badges, Q2/Q3 period switcher. 3 summary tiles: weeks left, goals on track fraction, estimated quarterly earnings. 5 goal cards: earnings ($7,750/$12,000 on track), campaigns (4/6 on track), follower growth (5.2K/20K at risk), avg ER (8.6%/8% exceeded), new brand partners (2/4 on track). Each card: tinted icon square, goal name, current vs target with inline-editable target (click number to edit, dashed underline hints), status badge, 6px progress bar in tone color (yellow for at-risk, blue for exceeded), pace note in matching color. 'At risk' follower growth shows yellow warning to increase posting frequency. Reset restores initial state. Save animates 'Saving…' → 'Goals saved!' with green check. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator goal setting",
      description: "Click any target number (underlined with dashes) to edit it inline. Watch progress bars shift. Q3 / Q2 switcher in header. Click Save goals to see the confirmation animation.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
