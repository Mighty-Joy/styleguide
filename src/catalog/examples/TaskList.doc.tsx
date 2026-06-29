"use client";

import React, { useState } from "react";
import {
  IconCircleCheck,
  IconCircle,
  IconAlertCircle,
  IconCalendar,
  IconPlus,
  IconDotsVertical,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

type Priority = "urgent" | "high" | "normal" | "low";
type TaskStatus = "todo" | "done";

interface Task {
  id: string;
  label: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  assigneeInitials: string;
  assigneeTone: keyof typeof TONES;
  relation?: string;
  relationType?: "creator" | "campaign" | "deal";
  dueDate?: string;
  overdue?: boolean;
}

const PRIORITY_COLOR: Record<Priority, string> = {
  urgent: "var(--sd-danger)",
  high:   TONES.orange.solid,
  normal: TONES.blue.solid,
  low:    "var(--sd-font-quaternary, var(--sd-font-tertiary))",
};

const PRIORITY_LABEL: Record<Priority, string> = {
  urgent: "Urgent", high: "High", normal: "Normal", low: "Low",
};

interface TaskSection { title: string; tasks: Task[]; }

const INITIAL_SECTIONS: TaskSection[] = [
  {
    title: "Needs you",
    tasks: [
      { id: "1", label: "Approve Atlas X script",     description: "Reel v2 — morning routine angle", priority: "urgent", status: "todo", assigneeInitials: "E", assigneeTone: "green", relation: "Atlas X", relationType: "campaign", dueDate: "Today", overdue: false },
      { id: "2", label: "Send offer — Summer Glow",    description: "Nina Cole, 3× IG Stories",        priority: "high",   status: "todo", assigneeInitials: "E", assigneeTone: "green", relation: "Nina Cole", relationType: "creator",  dueDate: "Jul 2" },
      { id: "3", label: "Review contract — Spring Drop",                                                priority: "normal", status: "todo", assigneeInitials: "E", assigneeTone: "green", relation: "Spring Drop", relationType: "deal",    dueDate: "Jul 5" },
    ],
  },
  {
    title: "Waiting on creator",
    tasks: [
      { id: "4", label: "Awaiting Atlas X content",   description: "Priya to deliver Reel v2",        priority: "high",   status: "todo", assigneeInitials: "P", assigneeTone: "purple", relation: "Priya Nair", relationType: "creator", dueDate: "Aug 12" },
      { id: "5", label: "Script feedback pending",    description: "Maya reviewing Summer Glow brief", priority: "normal", status: "todo", assigneeInitials: "M", assigneeTone: "pink",   relation: "Maya Rivers", relationType: "creator", dueDate: "Aug 8" },
    ],
  },
  {
    title: "Done",
    tasks: [
      { id: "6", label: "Contract signed — Atlas X",                                                    priority: "normal", status: "done", assigneeInitials: "P", assigneeTone: "purple", relation: "Atlas X",  relationType: "deal" },
      { id: "7", label: "Onboard Priya Nair",                                                           priority: "low",    status: "done", assigneeInitials: "E", assigneeTone: "green",  relation: "Priya Nair", relationType: "creator" },
      { id: "8", label: "Send welcome email",                                                            priority: "low",    status: "done", assigneeInitials: "E", assigneeTone: "green" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* TaskRow                                                               */
/* ------------------------------------------------------------------ */

function TaskRow({ task, onToggle }: { task: Task; onToggle: (id: string) => void }) {
  const done = task.status === "done";
  const t = TONES[task.assigneeTone];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 14px", opacity: done ? 0.55 : 1, cursor: "pointer", borderRadius: "var(--sd-radius-sm)", transition: "background 0.1s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sd-bg-tertiary)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Checkbox */}
      <Button variant="ghost" iconOnly size="sm" onClick={() => onToggle(task.id)}
        style={{ color: done ? TONES.green.solid : "var(--sd-border-strong)", flexShrink: 0 }}>
        {done ? <IconCircleCheck size={17} /> : <IconCircle size={17} />}
      </Button>

      {/* Priority dot */}
      <span title={PRIORITY_LABEL[task.priority]} style={{ width: 7, height: 7, borderRadius: "50%", background: PRIORITY_COLOR[task.priority], flexShrink: 0 }} />

      {/* Label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)", textDecoration: done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {task.label}
        </div>
        {task.description && !done && (
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {task.description}
          </div>
        )}
      </div>

      {/* Relation chip */}
      {task.relation && (
        <span style={{ display: "inline-flex", alignItems: "center", height: 20, padding: "0 8px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)", whiteSpace: "nowrap", flexShrink: 0 }}>
          {task.relation}
        </span>
      )}

      {/* Assignee */}
      <Avatar initials={task.assigneeInitials} tone={task.assigneeTone} size="sm" />

      {/* Due date */}
      {task.dueDate && (
        <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: task.overdue ? "var(--sd-danger)" : "var(--sd-font-tertiary)", fontWeight: task.dueDate === "Today" ? 600 : 400, whiteSpace: "nowrap", flexShrink: 0 }}>
          {task.overdue && <IconAlertCircle size={11} style={{ color: "var(--sd-danger)" }} />}
          {!task.overdue && task.dueDate !== "Today" && <IconCalendar size={11} />}
          {task.dueDate}
        </span>
      )}

      <Button variant="tertiary" size="sm" iconOnly aria-label="More" style={{ opacity: 0, flexShrink: 0 }}>
        <IconDotsVertical size={13} />
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

function TaskListDemo() {
  const [sections, setSections] = useState<TaskSection[]>(INITIAL_SECTIONS);

  const toggle = (id: string) => {
    setSections((prev) =>
      prev.map((sec) => ({
        ...sec,
        tasks: sec.tasks.map((t) =>
          t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t
        ),
      }))
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, maxWidth: 680 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px 8px" }}>
        <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>Tasks</span>
        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "1px 7px", fontWeight: 600 }}>
          {sections.flatMap((s) => s.tasks).filter((t) => t.status !== "done").length}
        </span>
        <span style={{ flex: 1 }} />
        <Button variant="secondary" size="sm" leftIcon={<IconPlus size={12} />}>Add task</Button>
      </div>

      {/* sections */}
      {sections.map((sec) => (
        <div key={sec.title}>
          <div style={{ padding: "10px 14px 4px", fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center", gap: 6 }}>
            {sec.title}
            <span style={{ fontWeight: 500 }}>({sec.tasks.length})</span>
          </div>
          {sec.tasks.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={toggle} />
          ))}
        </div>
      ))}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "task-list",
  title: "Tasks",
  group: "Record Views",
  status: "stable",
  summary: "Workflow tasks grouped by status — checkbox toggle, priority dot, assignee avatar, due date, relation chip.",
  description:
    "TaskRow groups tasks into sections (Needs you · Waiting on creator · Done). Click the circle icon to toggle done/todo. Priority is shown as a colored dot (red=urgent, orange=high, blue=normal). Relation chips link the task to a creator, campaign, or deal. Due dates highlight red when overdue; 'Today' renders in bold.",
  demos: [{ title: "Task list", description: "Click the circle to mark tasks done. Priority dots: red = urgent, orange = high, blue = normal.", block: true, render: () => <TaskListDemo /> }],
  props: [],
};

export default doc;
