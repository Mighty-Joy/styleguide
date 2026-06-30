"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type TodoState = "todo" | "done";

type TodoRow = {
  key:         string;
  title:       string;
  subtitle:    string;
  actionLabel: string;
  dueText?:    string;
  overdue?:    boolean;
  state:       TodoState;
};

type DealGroup = {
  key:      string;
  brand:    string;
  initials: string;
  deal:     string;
  rows:     TodoRow[];
};

/* ── seed ───────────────────────────────────────────────── */
const GROUPS: DealGroup[] = [
  {
    key:      "aura-reel",
    brand:    "Aura Labs",
    initials: "AL",
    deal:     "Summer Glow · Reel #1",
    rows: [
      {
        key:         "script",
        title:       "Submit script draft",
        subtitle:    "Brand needs to review before filming",
        actionLabel: "Submit script",
        dueText:     "Due Jul 5",
        overdue:     false,
        state:       "todo",
      },
    ],
  },
  {
    key:      "nova-story",
    brand:    "Nova Skincare",
    initials: "NS",
    deal:     "Glow Up · Story Pack",
    rows: [
      {
        key:         "post",
        title:       "Post to Instagram",
        subtitle:    "Content approved — ready to go live",
        actionLabel: "Mark as posted",
        dueText:     "Due Jul 2",
        overdue:     true,
        state:       "todo",
      },
    ],
  },
  {
    key:      "vibe-tiktok",
    brand:    "Vibe Beauty",
    initials: "VB",
    deal:     "Fall Launch · TikTok UGC",
    rows: [
      {
        key:         "sign",
        title:       "Sign contract",
        subtitle:    "Review and sign to unlock your deal",
        actionLabel: "Review contract",
        dueText:     "Due Jul 8",
        overdue:     false,
        state:       "todo",
      },
    ],
  },
  {
    key:      "done-deal",
    brand:    "Lumina Co",
    initials: "LC",
    deal:     "Spring Campaign · YouTube Review",
    rows: [
      {
        key:         "done-post",
        title:       "Post to YouTube",
        subtitle:    "Completed Jun 20",
        actionLabel: "View post",
        state:       "done",
      },
    ],
  },
];

/* ── TodoCard ───────────────────────────────────────────── */
function TodoCard({ group, onAction }: { group: DealGroup; onAction: (key: string) => void }) {
  const row = group.rows[0];
  const isDone = row.state === "done";

  return (
    <div style={{
      border:       `1px solid ${isDone ? "var(--sd-border-default)" : row.overdue ? "#EF4444" : "var(--sd-border-default)"}`,
      borderLeft:   `3px solid ${isDone ? "var(--sd-border-default)" : row.overdue ? "#EF4444" : "#3B82F6"}`,
      borderRadius: 10,
      overflow:     "hidden",
      opacity:      isDone ? 0.65 : 1,
    }}>
      <div style={{
        display:       "flex",
        alignItems:    "flex-start",
        gap:           12,
        padding:       "12px 14px",
        background:    isDone ? "var(--sd-bg-tertiary)" : "var(--sd-bg-secondary)",
      }}>
        {/* brand avatar */}
        <Avatar size="sm" name={group.brand} initials={group.initials} />

        {/* content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* brand + deal line */}
          <div style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "var(--sd-font-tertiary)",
            marginBottom: 3,
          }}>
            {group.brand} · {group.deal}
          </div>

          {/* task title */}
          <div style={{
            fontFamily:     "var(--sd-font)",
            fontSize:       13,
            fontWeight:     isDone ? 500 : 600,
            color:          "var(--sd-font-primary)",
            textDecoration: isDone ? "line-through" : "none",
            marginBottom:   3,
          }}>
            {row.title}
          </div>

          {/* subtitle */}
          <div style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "var(--sd-font-tertiary)",
          }}>
            {row.subtitle}
          </div>
        </div>

        {/* right side */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
          {row.dueText && !isDone && (
            <span style={{
              fontFamily:   "var(--sd-font)",
              fontSize:     10,
              fontWeight:   600,
              color:        row.overdue ? "#EF4444" : "var(--sd-font-tertiary)",
              background:   row.overdue ? "#FEF2F2" : "var(--sd-bg-tertiary)",
              borderRadius: 100,
              padding:      "2px 8px",
              border:       `1px solid ${row.overdue ? "#EF444430" : "var(--sd-border-default)"}`,
            }}>
              {row.overdue ? "⚠ " : ""}{row.dueText}
            </span>
          )}
          {isDone && (
            <span style={{
              fontFamily:   "var(--sd-font)",
              fontSize:     10,
              fontWeight:   600,
              color:        "#10B981",
              background:   "#ECFDF5",
              borderRadius: 100,
              padding:      "2px 8px",
            }}>
              ✓ Done
            </span>
          )}
        </div>
      </div>

      {/* action footer */}
      {!isDone && (
        <div style={{
          padding:      "8px 14px",
          borderTop:    "1px solid var(--sd-border-default)",
          background:   "var(--sd-bg-tertiary)",
          display:      "flex",
          alignItems:   "center",
          justifyContent: "space-between",
        }}>
          <Button variant="primary" size="sm" onClick={() => onAction(row.key)}>
            {row.actionLabel}
          </Button>
          <span style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "var(--sd-font-tertiary)",
            cursor:     "pointer",
          }}>
            Skip for now →
          </span>
        </div>
      )}
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function CreatorTodoListDemo() {
  const [filter, setFilter] = useState<"todo" | "all">("todo");
  const [done, setDone] = useState<Set<string>>(new Set());

  const groups = filter === "todo"
    ? GROUPS.filter(g => !done.has(g.key) && g.rows[0].state !== "done")
    : GROUPS;

  const handleAction = (groupKey: string) => {
    setDone(prev => new Set([...prev, groupKey]));
  };

  const todoCount  = GROUPS.filter(g => g.rows[0].state !== "done").length;
  const doneCount  = GROUPS.filter(g => g.rows[0].state === "done").length + done.size;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 16, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            My Tasks
          </div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
            {todoCount - done.size} to do · {doneCount} done
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "var(--sd-bg-tertiary)", borderRadius: 8, padding: 3, border: "1px solid var(--sd-border-default)" }}>
          {(["todo", "all"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     11,
                fontWeight:   filter === f ? 600 : 500,
                padding:      "4px 12px",
                borderRadius: 6,
                border:       "none",
                background:   filter === f ? "var(--sd-bg-secondary)" : "transparent",
                color:        filter === f ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                cursor:       "pointer",
                boxShadow:    filter === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {f === "todo" ? "To do" : "All"}
            </button>
          ))}
        </div>
      </div>

      {/* task groups */}
      {groups.length === 0 ? (
        <div style={{
          display:        "flex",
          flexDirection:  "column",
          alignItems:     "center",
          justifyContent: "center",
          padding:        "40px 20px",
          border:         "1.5px dashed var(--sd-border-default)",
          borderRadius:   12,
          gap:            8,
        }}>
          <span style={{ fontSize: 28 }}>✓</span>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 600, color: "var(--sd-font-primary)" }}>
            All caught up!
          </span>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
            No pending tasks across your deals.
          </span>
        </div>
      ) : (
        groups.map(g => (
          <TodoCard
            key={g.key}
            group={{ ...g, rows: g.rows.map(r => done.has(g.key) ? { ...r, state: "done" as const } : r) }}
            onAction={() => handleAction(g.key)}
          />
        ))
      )}
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "creator-todo-list",
  title:       "Creator Todo List",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Creator-facing task list grouped by deal, showing the primary action per deal — maps to CreatorTodoList.tsx.",
  description: "One card per deal showing only the next thing the creator must do. Overdue tasks get a red left-border and warning chip. Completing a task marks it done inline. Maps to CreatorTodoList.tsx in the Tasks page.",
  demos: [
    {
      title:  "Priya Nair's Tasks",
      render: () => <CreatorTodoListDemo />,
      block:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "groups",    type: "DealGroup[]",  required: true,  description: "Deal groups each with a primary task row and brand identity." },
        { name: "filter",    type: "'todo' | 'all'", required: false, description: "Show only pending tasks or all including completed." },
        { name: "onAction",  type: "(key: string) => void", required: false, description: "Primary CTA callback (submit, post, sign, etc.)." },
      ],
    },
  ],
};

export default doc;
