"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type TaskState  = "done" | "current" | "upcoming";
type TaskOwner  = "brand" | "creator";

type DealTask = {
  id:       number;
  title:    string;
  context:  string;
  state:    TaskState;
  owner:    TaskOwner;
  dueDate?: string;
  action?:  string;
};

/* ── data ───────────────────────────────────────────────── */
const MY_TASKS: DealTask[] = [
  { id: 1, title: "Review script draft",     context: "Summer Reel · Deliverable 1", state: "current",  owner: "brand",   dueDate: "Today",   action: "Approve script" },
  { id: 2, title: "Approve final content",   context: "Summer Reel · Deliverable 1", state: "upcoming", owner: "brand",   dueDate: "Jul 8"                            },
  { id: 3, title: "Release payment",         context: "Milestone 1 · $1,750",        state: "upcoming", owner: "brand",   dueDate: "Jul 12"                           },
  { id: 4, title: "Review contract",         context: "Deal agreement",              state: "done",     owner: "brand"                                                  },
];

const CREATOR_TASKS: DealTask[] = [
  { id: 5, title: "Submit script draft",     context: "Summer Reel · Deliverable 1", state: "done",     owner: "creator"                                               },
  { id: 6, title: "Film & edit content",     context: "Summer Reel · Deliverable 1", state: "current",  owner: "creator", dueDate: "Jul 5"                            },
  { id: 7, title: "Post to Instagram",       context: "Summer Reel · Deliverable 1", state: "upcoming", owner: "creator", dueDate: "Jul 10"                           },
  { id: 8, title: "Sign contract",           context: "Deal agreement",              state: "done",     owner: "creator"                                               },
];

/* ── status config ──────────────────────────────────────── */
type StatusKey = "todo" | "in_progress" | "upcoming" | "done";

const STATUS: Record<StatusKey, { label: string; color: string; bg: string }> = {
  todo:        { label: "To do",       color: "#3B82F6", bg: "#EFF6FF" },
  in_progress: { label: "In progress", color: "#F59E0B", bg: "#FFFBEB" },
  upcoming:    { label: "Upcoming",    color: "#6B7280", bg: "#F3F4F6" },
  done:        { label: "Done",        color: "#10B981", bg: "#ECFDF5" },
};

function getStatusKey(task: DealTask): StatusKey {
  if (task.state === "done")    return "done";
  if (task.state === "upcoming") return "upcoming";
  return task.owner === "brand" ? "todo" : "in_progress";
}

/* ── TaskCard ───────────────────────────────────────────── */
function TaskCard({ task }: { task: DealTask }) {
  const sk  = getStatusKey(task);
  const cfg = STATUS[sk];
  const isDone = task.state === "done";

  return (
    <div style={{
      border:        `1px solid ${isDone ? "var(--sd-border-default)" : cfg.color + "44"}`,
      borderRadius:  10,
      overflow:      "hidden",
      opacity:       isDone ? 0.7 : 1,
    }}>
      {/* header */}
      <div style={{
        display:     "flex",
        alignItems:  "flex-start",
        gap:         12,
        padding:     "12px 14px",
        background:  isDone ? "var(--sd-bg-tertiary)" : cfg.bg,
      }}>
        {/* check circle */}
        <div style={{
          width:        20,
          height:       20,
          borderRadius: "50%",
          border:       `2px solid ${isDone ? "#10B981" : cfg.color}`,
          background:   isDone ? "#10B981" : "transparent",
          flexShrink:   0,
          marginTop:    1,
          display:      "flex",
          alignItems:   "center",
          justifyContent: "center",
        }}>
          {isDone && <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>}
        </div>

        {/* content */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
          <div style={{
            fontFamily:      "var(--sd-font)",
            fontSize:        13,
            fontWeight:      600,
            color:           "var(--sd-font-primary)",
            textDecoration:  isDone ? "line-through" : "none",
          }}>
            {task.title}
          </div>
          <div style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "var(--sd-font-tertiary)",
          }}>
            {task.context}
          </div>
        </div>

        {/* status + due */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          <span style={{
            fontFamily:   "var(--sd-font)",
            fontSize:     10,
            fontWeight:   600,
            color:        cfg.color,
            background:   cfg.bg,
            borderRadius: 100,
            padding:      "2px 8px",
            border:       `1px solid ${cfg.color}30`,
          }}>
            {cfg.label}
          </span>
          {task.dueDate && !isDone && (
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>
              Due {task.dueDate}
            </span>
          )}
        </div>
      </div>

      {/* action footer */}
      {task.action && task.state === "current" && (
        <div style={{
          padding:    "8px 14px",
          borderTop:  `1px solid ${cfg.color}30`,
          background: "var(--sd-bg-secondary)",
        }}>
          <Button variant="primary" size="sm">{task.action}</Button>
        </div>
      )}
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function DealTaskCardDemo() {
  const [activeTab, setActiveTab] = useState<"mine" | "creator">("mine");

  const tasks = activeTab === "mine" ? MY_TASKS : CREATOR_TASKS;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 600, color: "var(--sd-font-primary)" }}>
          Deal Tasks — Summer Glow
        </span>
        <div style={{ display: "flex", gap: 2, background: "var(--sd-bg-tertiary)", borderRadius: 8, padding: 3, border: "1px solid var(--sd-border-default)" }}>
          {([["mine", "My tasks"], ["creator", "Creator tasks"]] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     11,
                fontWeight:   activeTab === id ? 600 : 500,
                padding:      "4px 12px",
                borderRadius: 6,
                border:       "none",
                background:   activeTab === id ? "var(--sd-bg-secondary)" : "transparent",
                color:        activeTab === id ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                cursor:       "pointer",
                boxShadow:    activeTab === id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* creator context for creator tab */}
      {activeTab === "creator" && (
        <div style={{
          display:     "flex",
          alignItems:  "center",
          gap:         10,
          padding:     "10px 14px",
          background:  "var(--sd-bg-tertiary)",
          borderRadius: 8,
          border:      "1px solid var(--sd-border-default)",
        }}>
          <Avatar size="sm" name="Priya Nair" initials="PN" />
          <div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>Priya Nair</div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>@priya.glows · Instagram</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Badge label="Active" tone="green" variant="solid" size="sm" />
          </div>
        </div>
      )}

      {/* task list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "deal-task-card",
  title:       "Deal Task Card",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Deal workflow task cards for brand and creator — maps to DealTaskCard.tsx and BrandTaskCard.tsx.",
  description: "Shows individual deal pipeline steps with status (To do / In progress / Upcoming / Done), context line (deliverable + track), due date, and an action button for the current task. Tabbed between brand tasks and creator tasks. Maps to DealTaskCard, BrandTaskCard, and DealTasksCard in the app.",
  demos: [
    {
      title:  "Summer Glow Deal Tasks",
      render: () => <DealTaskCardDemo />,
      block:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "task",     type: "DealTask",    required: true,  description: "Task object with title, context, state (done/current/upcoming), owner, and optional action label." },
        { name: "onAction", type: "() => void",  required: false, description: "Callback for the primary action button (e.g. Approve script, Release payment)." },
      ],
    },
  ],
};

export default doc;
