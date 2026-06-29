"use client";

import React, { useState, useRef, useEffect } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconSend,
  IconPaperclip,
  IconCalendarEvent,
  IconFileText,
  IconBrandInstagram,
  IconBrandTiktok,
  IconChevronRight,
  IconCheck,
  IconChecks,
  IconClock,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

/* ---- types ---- */

interface Message {
  id: string;
  side: "brand" | "creator";
  text: string;
  timestamp: string;
  read: boolean;
}

interface Deliverable {
  title: string;
  status: "pending" | "in_review" | "approved";
  dueDate: string;
}

/* ---- seed data ---- */

const MESSAGES_INIT: Message[] = [
  { id: "m1", side: "brand",   text: "Hey Priya! Really excited to kick off this collab. I've attached the campaign brief for the Summer Glow product line.",                timestamp: "Mon 9:02 AM", read: true },
  { id: "m2", side: "creator", text: "Thanks so much! I went through the brief — love the direction. A couple of questions: is the target audience primarily 18–25, and are we going for a dewy look or more matte?", timestamp: "Mon 11:34 AM", read: true },
  { id: "m3", side: "brand",   text: "Great questions. Definitely dewy — the whole campaign is about the 'lit from within' glow. Target is 22–30, slightly older than usual. We want aspirational but attainable.", timestamp: "Mon 12:15 PM", read: true },
  { id: "m4", side: "creator", text: "Got it, that changes my lighting setup a bit. I'm planning to film Tuesday morning for the natural light. Should have the raw cut to you by Wednesday afternoon.", timestamp: "Mon 1:48 PM",  read: true },
  { id: "m5", side: "brand",   text: "Perfect. One thing — can you make sure the product is visible for at least 5s in the first 10s? New brand req from legal 😅",                  timestamp: "Mon 3:07 PM", read: true },
  { id: "m6", side: "creator", text: "Ha, no worries! I'll do an opening shot with the product. Sending a test frame now.",                                                          timestamp: "Mon 3:22 PM", read: true },
  { id: "m7", side: "brand",   text: "That frame looks great! The lighting is exactly right. Looking forward to the final cut.",                                                      timestamp: "Mon 4:00 PM", read: false },
];

const DELIVERABLES: Deliverable[] = [
  { title: "Instagram Reel (60s)",  status: "in_review", dueDate: "Jun 30" },
  { title: "IG Story × 3",          status: "pending",   dueDate: "Jul 3"  },
  { title: "TikTok (45s)",          status: "pending",   dueDate: "Jul 5"  },
];

const STATUS_TONE = {
  pending:   "gray",
  in_review: "yellow",
  approved:  "green",
} as const;

const STATUS_LABEL = {
  pending:   "Pending",
  in_review: "In review",
  approved:  "Approved",
} as const;

/* ---- Sub-components ---- */

function MessageBubble({ msg }: { msg: Message }) {
  const isBrand = msg.side === "brand";
  return (
    <div style={{ display: "flex", flexDirection: isBrand ? "row-reverse" : "row", gap: 8, alignItems: "flex-end" }}>
      {!isBrand && (
        <Avatar initials="PN" tone="green" size="sm" />
      )}
      <div style={{ maxWidth: "72%", display: "flex", flexDirection: "column", alignItems: isBrand ? "flex-end" : "flex-start", gap: 3 }}>
        <div
          style={{
            padding: "9px 13px",
            borderRadius: isBrand ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
            background: isBrand ? "#111" : "var(--sd-bg-secondary, #f4f4f5)",
            color: isBrand ? "#fff" : "var(--sd-font-primary, #111)",
            fontSize: 13,
            lineHeight: 1.5,
          }}
        >
          {msg.text}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--sd-font-tertiary, #999)" }}>
          <span style={{ fontSize: 10 }}>{msg.timestamp}</span>
          {isBrand && (msg.read ? <IconChecks size={11} /> : <IconCheck size={11} />)}
        </div>
      </div>
    </div>
  );
}

function DeliverableRow({ d }: { d: Deliverable }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--sd-font-primary, #111)" }}>{d.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginTop: 1 }}>
          <IconClock size={10} />
          {d.dueDate}
        </div>
      </div>
      <Badge label={STATUS_LABEL[d.status]} tone={STATUS_TONE[d.status]} size="sm" />
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [messages, setMessages] = useState<Message[]>(MESSAGES_INIT);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        side: "brand",
        text,
        timestamp: "Just now",
        read: false,
      },
    ]);
    setDraft("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 264px",
        height: 560,
        border: "1px solid var(--sd-border-default, #e5e7eb)",
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "var(--sd-font, Inter, sans-serif)",
      }}
    >
      {/* Thread pane */}
      <div style={{ display: "flex", flexDirection: "column", borderRight: "1px solid var(--sd-border-default, #e5e7eb)" }}>
        {/* Thread header */}
        <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <Avatar initials="PN" tone="green" size="md" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>Priya Nair</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>
              <IconBrandInstagram size={11} style={{ color: "#e1306c" }} />
              128K
              <span>·</span>
              Summer Glow
            </div>
          </div>
          <Badge label="Active" tone="green" variant="status" dot size="sm" />
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 14 }}>
          {messages.map((m) => <MessageBubble key={m.id} msg={m} />)}
          <div ref={bottomRef} />
        </div>

        {/* Quick actions */}
        <div style={{ padding: "8px 14px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", gap: 6, flexShrink: 0 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconFileText size={12} />}>Send brief</Button>
          <Button variant="secondary" size="sm" leftIcon={<IconCalendarEvent size={12} />}>Schedule call</Button>
        </div>

        {/* Compose */}
        <div
          style={{
            padding: "10px 14px 12px",
            borderTop: "1px solid var(--sd-border-default, #e5e7eb)",
            display: "flex",
            alignItems: "flex-end",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", padding: 4, display: "flex" }}>
            <IconPaperclip size={16} />
          </button>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message Priya…"
            rows={2}
            style={{
              flex: 1,
              resize: "none",
              border: "1px solid var(--sd-border-medium, #d1d5db)",
              borderRadius: 10,
              padding: "7px 10px",
              fontFamily: "inherit",
              fontSize: 13,
              color: "var(--sd-font-primary, #111)",
              background: "var(--sd-bg-tertiary, #f1f1f1)",
              outline: "none",
              lineHeight: 1.4,
            }}
          />
          <Button
            variant="primary"
            size="sm"
            iconOnly
            aria-label="Send"
            onClick={send}
            disabled={!draft.trim()}
          >
            <IconSend size={14} />
          </Button>
        </div>
      </div>

      {/* Context sidebar */}
      <div style={{ display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Deal info */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Deal</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary, #111)", marginBottom: 2 }}>Summer Glow</div>
          <div style={{ fontSize: 12, color: "var(--sd-font-secondary, #555)", marginBottom: 6 }}>$2,400 · 3 deliverables</div>
          <div style={{ display: "flex", gap: 6 }}>
            <Badge label="In progress" tone="blue" size="sm" />
          </div>
        </div>

        {/* Deliverables */}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Deliverables</div>
          {DELIVERABLES.map((d) => <DeliverableRow key={d.title} d={d} />)}
        </div>

        {/* Creator stats */}
        <div style={{ padding: "12px 14px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Creator stats</div>
          {[
            { label: "Platforms",   value: "IG · TikTok" },
            { label: "Followers",   value: "128K + 96K" },
            { label: "Avg ER",      value: "8.3%" },
            { label: "Avg views",   value: "284K" },
            { label: "Past deals",  value: "4" },
            { label: "Rating",      value: "4.9 / 5" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{label}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ padding: "12px 14px", marginTop: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
          <Button variant="secondary" size="sm" style={{ width: "100%" }}>View creator profile</Button>
          <Button variant="secondary" size="sm" style={{ width: "100%" }}>Go to deal</Button>
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "conversation-thread",
  title: "ConversationThread",
  group: "Messaging",
  status: "stable",
  summary:
    "Single creator DM view — message thread with brand/creator bubbles, compose bar, deal context, and deliverable status sidebar.",
  description:
    "The focused 1:1 conversation surface. Left pane: creator header (name, platform, deal), scrollable message thread, quick-action shortcuts (send brief, schedule call), compose box with Enter-to-send. Right pane: deal summary, deliverable status list, creator key stats, CTA buttons. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator conversation",
      description: "Type and press Enter (or the send button) to add messages. Quick actions in the toolbar above the compose box.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
