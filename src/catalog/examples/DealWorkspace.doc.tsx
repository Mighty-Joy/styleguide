"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type MilestoneStatus = "paid" | "pending" | "upcoming";
type TaskStatus      = "done" | "active" | "upcoming";

type Milestone = {
  id:       number;
  label:    string;
  amount:   string;
  trigger:  string;
  status:   MilestoneStatus;
  paidOn?:  string;
};

type DealTask = {
  id:     number;
  title:  string;
  owner:  "brand" | "creator";
  status: TaskStatus;
  due?:   string;
  action?:string;
};

type Deliverable = {
  id:       number;
  type:     string;
  platform: string;
  stage:    string;
  stageColor: string;
  due:      string;
};

/* ── seed ───────────────────────────────────────────────── */
const MILESTONES: Milestone[] = [
  { id: 1, label: "Upfront",     amount: "$600",  trigger: "On contract signature",  status: "paid",     paidOn: "Jun 20" },
  { id: 2, label: "Delivery",    amount: "$600",  trigger: "On content approval",    status: "pending"                    },
];

const TASKS: DealTask[] = [
  { id: 1, title: "Sign contract",      owner: "brand",   status: "done"                                    },
  { id: 2, title: "Review script",      owner: "brand",   status: "active",   due: "Jul 5",  action: "Approve script" },
  { id: 3, title: "Approve content",    owner: "brand",   status: "upcoming", due: "Jul 10"                 },
  { id: 4, title: "Release payment",    owner: "brand",   status: "upcoming", due: "Jul 12"                 },
  { id: 5, title: "Submit script",      owner: "creator", status: "done"                                    },
  { id: 6, title: "Film & edit reel",   owner: "creator", status: "active",   due: "Jul 5"                  },
  { id: 7, title: "Post to Instagram",  owner: "creator", status: "upcoming", due: "Jul 10"                 },
];

const DELIVERABLES: Deliverable[] = [
  { id: 1, type: "Reel",    platform: "📷 Instagram", stage: "Filming",       stageColor: "#F59E0B", due: "Jul 5"  },
  { id: 2, type: "Story ×3",platform: "📷 Instagram", stage: "Not started",   stageColor: "#6B7280", due: "Jul 8"  },
];

/* ── status configs ─────────────────────────────────────── */
const MILESTONE_CFG: Record<MilestoneStatus, { color: string; bg: string; label: string }> = {
  paid:     { color: "#10B981", bg: "#ECFDF5", label: "Paid"     },
  pending:  { color: "#F59E0B", bg: "#FFFBEB", label: "Pending"  },
  upcoming: { color: "#6B7280", bg: "#F3F4F6", label: "Upcoming" },
};

const TASK_CFG: Record<TaskStatus, { color: string; bg: string }> = {
  done:     { color: "#10B981", bg: "#ECFDF5" },
  active:   { color: "#3B82F6", bg: "#EFF6FF" },
  upcoming: { color: "#6B7280", bg: "#F3F4F6" },
};

/* ── Section header ─────────────────────────────────────── */
function SectionHead({ title }: { title: string }) {
  return (
    <div style={{
      fontFamily:    "var(--sd-font)",
      fontSize:      10,
      fontWeight:    700,
      color:         "var(--sd-font-tertiary)",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      padding:       "10px 0 6px",
      borderBottom:  "1px solid var(--sd-border-default)",
      marginBottom:  8,
    }}>
      {title}
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function DealWorkspaceDemo() {
  const [taskTab, setTaskTab] = useState<"mine" | "creator">("mine");

  const tasks = TASKS.filter(t => t.owner === (taskTab === "mine" ? "brand" : "creator"));

  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           0,
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  12,
      overflow:      "hidden",
      background:    "var(--sd-bg-secondary)",
    }}>
      {/* deal header */}
      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          14,
        padding:      "14px 18px",
        background:   "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <Avatar size="md" name="Priya Nair" initials="PN" />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 15, fontWeight: 700, color: "#fff" }}>
            Priya Nair — Summer Glow
          </div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
            Paid Post · 📷 Instagram · 2 deliverables
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 18, fontWeight: 800, color: "#fff" }}>$1,200</span>
          <Badge label="Active" tone="green" variant="solid" size="sm" />
        </div>
      </div>

      {/* body — 2 col on wide screens */}
      <div style={{
        display:             "grid",
        gridTemplateColumns: "1fr 1fr",
        gap:                 0,
      }}>
        {/* left: deliverables + milestones */}
        <div style={{ padding: "16px 18px", borderRight: "1px solid var(--sd-border-default)", display: "flex", flexDirection: "column", gap: 20 }}>
          {/* deliverables */}
          <div>
            <SectionHead title="Deliverables" />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {DELIVERABLES.map(d => (
                <div key={d.id} style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          10,
                  padding:      "10px 12px",
                  background:   "var(--sd-bg-tertiary)",
                  border:       "1px solid var(--sd-border-default)",
                  borderRadius: 8,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>
                      {d.type}
                    </div>
                    <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
                      {d.platform} · Due {d.due}
                    </div>
                  </div>
                  <span style={{
                    fontFamily:   "var(--sd-font)",
                    fontSize:     10,
                    fontWeight:   600,
                    color:        d.stageColor,
                    background:   `${d.stageColor}18`,
                    borderRadius: 100,
                    padding:      "2px 8px",
                    whiteSpace:   "nowrap",
                  }}>
                    {d.stage}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* payment milestones */}
          <div>
            <SectionHead title="Payment schedule" />
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {MILESTONES.map((m, i) => {
                const cfg = MILESTONE_CFG[m.status];
                return (
                  <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* connector */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                      <div style={{
                        width:        16,
                        height:       16,
                        borderRadius: "50%",
                        background:   m.status === "paid" ? "#10B981" : "var(--sd-border-default)",
                        border:       `2px solid ${m.status === "paid" ? "#10B981" : "var(--sd-border-default)"}`,
                        display:      "flex",
                        alignItems:   "center",
                        justifyContent:"center",
                      }}>
                        {m.status === "paid" && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>✓</span>}
                      </div>
                      {i < MILESTONES.length - 1 && (
                        <div style={{ width: 1, height: 24, background: "var(--sd-border-default)" }} />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>
                          {m.amount}
                        </span>
                        <span style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
                          {m.label}
                        </span>
                        <span style={{
                          fontFamily:   "var(--sd-font)",
                          fontSize:     9,
                          fontWeight:   700,
                          color:        cfg.color,
                          background:   cfg.bg,
                          borderRadius: 100,
                          padding:      "1px 7px",
                        }}>
                          {cfg.label}{m.paidOn ? ` · ${m.paidOn}` : ""}
                        </span>
                      </div>
                      <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>
                        {m.trigger}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* release button */}
            <div style={{ marginTop: 12 }}>
              <Button variant="primary" size="sm">Release payment</Button>
            </div>
          </div>
        </div>

        {/* right: tasks */}
        <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <SectionHead title="Tasks" />
            <div style={{ display: "flex", gap: 2, background: "var(--sd-bg-tertiary)", borderRadius: 7, padding: 2, border: "1px solid var(--sd-border-default)" }}>
              {([["mine", "My tasks"], ["creator", "Creator"]] as const).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setTaskTab(id)}
                  style={{
                    fontFamily:   "var(--sd-font)",
                    fontSize:     10,
                    fontWeight:   taskTab === id ? 700 : 500,
                    padding:      "3px 10px",
                    borderRadius: 5,
                    border:       "none",
                    background:   taskTab === id ? "var(--sd-bg-secondary)" : "transparent",
                    color:        taskTab === id ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                    cursor:       "pointer",
                    boxShadow:    taskTab === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {tasks.map(t => {
              const cfg = TASK_CFG[t.status];
              const isDone = t.status === "done";
              return (
                <div key={t.id} style={{
                  display:      "flex",
                  alignItems:   "flex-start",
                  gap:          10,
                  padding:      "10px 12px",
                  background:   isDone ? "var(--sd-bg-tertiary)" : "var(--sd-bg-secondary)",
                  border:       `1px solid ${isDone ? "var(--sd-border-default)" : cfg.color + "44"}`,
                  borderRadius: 8,
                  opacity:      isDone ? 0.75 : 1,
                }}>
                  <div style={{
                    width:        16,
                    height:       16,
                    borderRadius: "50%",
                    border:       `2px solid ${isDone ? "#10B981" : cfg.color}`,
                    background:   isDone ? "#10B981" : "transparent",
                    flexShrink:   0,
                    marginTop:    1,
                    display:      "flex",
                    alignItems:   "center",
                    justifyContent:"center",
                  }}>
                    {isDone && <span style={{ color: "#fff", fontSize: 9, fontWeight: 700 }}>✓</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily:     "var(--sd-font)",
                      fontSize:       12,
                      fontWeight:     600,
                      color:          "var(--sd-font-primary)",
                      textDecoration: isDone ? "line-through" : "none",
                    }}>
                      {t.title}
                    </div>
                    {t.due && !isDone && (
                      <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>
                        Due {t.due}
                      </div>
                    )}
                  </div>
                  {t.action && t.status === "active" && (
                    <Button variant="primary" size="sm">{t.action}</Button>
                  )}
                </div>
              );
            })}
          </div>

          {/* message creator */}
          <div style={{ borderTop: "1px solid var(--sd-border-default)", paddingTop: 12 }}>
            <Button variant="secondary" size="sm">💬 Message creator</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "deal-workspace",
  title:       "Deal Workspace",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Deal-level workspace showing deliverables, payment milestones, and task checklist for both brand and creator — maps to DealDetailPanel.tsx.",
  description: "The single-deal workspace opened from the deal list or campaign view. Left column: deliverables with production stage, payment milestone timeline with release action. Right column: brand/creator task checklist tabbed view. Deal identity header with amount and status. Maps to DealDetailPanel.tsx and DealDetailsView.tsx in the app.",
  demos: [
    {
      title:   "Priya Nair — Summer Glow Deal",
      render:  () => <DealWorkspaceDemo />,
      block:   true,
      plain:   true,
      maxWidth: 880,
    },
  ],
  props: [
    {
      rows: [
        { name: "creator",      type: "CreatorRef",    required: true,  description: "Creator identity shown in the deal header." },
        { name: "campaign",     type: "string",        required: true,  description: "Campaign name." },
        { name: "amount",       type: "string",        required: true,  description: "Total deal amount formatted (e.g. '$1,200')." },
        { name: "deliverables", type: "Deliverable[]", required: true,  description: "Array of deliverables with type, platform, stage, and due date." },
        { name: "milestones",   type: "Milestone[]",   required: true,  description: "Payment milestone schedule with trigger and status." },
        { name: "tasks",        type: "DealTask[]",    required: true,  description: "Brand and creator task checklist items." },
        { name: "onRelease",    type: "() => void",    required: false, description: "Trigger payment release modal." },
        { name: "onMessage",    type: "() => void",    required: false, description: "Open message thread with creator." },
      ],
    },
  ],
};

export default doc;
