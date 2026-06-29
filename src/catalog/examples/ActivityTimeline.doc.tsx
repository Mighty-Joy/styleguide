"use client";

import React, { useState } from "react";
import {
  IconSend,
  IconCircleCheck,
  IconFileText,
  IconPencil,
  IconPhoto,
  IconThumbUp,
  IconBrandInstagram,
  IconCurrencyDollar,
  IconRocket,
  IconUserPlus,
  IconMessage,
  IconAlertTriangle,
  IconX,
  IconClock,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type EventKind =
  | "deal_created"
  | "offer_sent"
  | "offer_accepted"
  | "contract_sent"
  | "contract_signed"
  | "brief_sent"
  | "content_submitted"
  | "revision_requested"
  | "content_approved"
  | "published"
  | "payment_sent"
  | "creator_added"
  | "message_sent"
  | "declined"
  | "custom";

interface TimelineEvent {
  id: string;
  kind: EventKind;
  title: string;
  description?: string;
  actor?: string;
  timestamp: string;
  iconOverride?: React.ElementType;
  toneOverride?: keyof typeof TONES;
}

/* ------------------------------------------------------------------ */
/* Event meta                                                            */
/* ------------------------------------------------------------------ */

const EVENT_META: Record<EventKind, { icon: React.ElementType; tone: keyof typeof TONES }> = {
  deal_created:       { icon: IconRocket,         tone: "blue"      },
  offer_sent:         { icon: IconSend,            tone: "blue"      },
  offer_accepted:     { icon: IconCircleCheck,     tone: "green"     },
  contract_sent:      { icon: IconFileText,        tone: "purple"    },
  contract_signed:    { icon: IconCircleCheck,     tone: "green"     },
  brief_sent:         { icon: IconFileText,        tone: "orange"    },
  content_submitted:  { icon: IconPhoto,           tone: "sky"       },
  revision_requested: { icon: IconPencil,          tone: "yellow"    },
  content_approved:   { icon: IconThumbUp,         tone: "green"     },
  published:          { icon: IconBrandInstagram,  tone: "pink"      },
  payment_sent:       { icon: IconCurrencyDollar,  tone: "green"     },
  creator_added:      { icon: IconUserPlus,        tone: "turquoise" },
  message_sent:       { icon: IconMessage,         tone: "gray"      },
  declined:           { icon: IconX,               tone: "red"       },
  custom:             { icon: IconClock,           tone: "gray"      },
};

/* ------------------------------------------------------------------ */
/* ActivityTimeline component                                            */
/* ------------------------------------------------------------------ */

interface ActivityTimelineProps {
  events: TimelineEvent[];
  compact?: boolean;
}

function ActivityTimeline({ events, compact = false }: ActivityTimelineProps) {
  return (
    <div style={{ position: "relative", paddingLeft: compact ? 28 : 36 }}>
      {/* Vertical connector line */}
      <div style={{
        position: "absolute", left: compact ? 11 : 15, top: 12, bottom: 12,
        width: 2, background: "var(--sd-border-light)",
      }} />

      {events.map((evt, i) => {
        const meta = EVENT_META[evt.kind];
        const Icon = evt.iconOverride ?? meta.icon;
        const tone = evt.toneOverride ?? meta.tone;
        const t = TONES[tone];
        const iconSize = compact ? 22 : 28;
        const isLast = i === events.length - 1;

        return (
          <div key={evt.id} style={{
            position: "relative", display: "flex", flexDirection: "column", gap: 2,
            paddingBottom: isLast ? 0 : compact ? 16 : 20,
          }}>
            {/* Icon dot */}
            <div style={{
              position: "absolute", left: -(compact ? 28 : 36),
              width: iconSize, height: iconSize, borderRadius: "50%",
              background: t.tint, color: t.text,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "2px solid var(--sd-bg-primary)",
              zIndex: 1,
            }}>
              <Icon size={compact ? 11 : 13} />
            </div>

            {/* Content */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span style={{
                fontSize: compact ? 12 : 13, fontWeight: 600,
                color: "var(--sd-font-primary)", lineHeight: 1.3,
              }}>
                {evt.title}
              </span>
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", flexShrink: 0 }}>
                {evt.timestamp}
              </span>
            </div>

            {evt.description && (
              <span style={{ fontSize: compact ? 11 : 12, color: "var(--sd-font-secondary)", lineHeight: 1.45 }}>
                {evt.description}
              </span>
            )}

            {evt.actor && (
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>
                by {evt.actor}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo data                                                             */
/* ------------------------------------------------------------------ */

const DEAL_EVENTS: TimelineEvent[] = [
  {
    id: "e1", kind: "deal_created", title: "Deal created",
    description: "Atlas X Summer · Instagram Reel + 3 Stories · $2,500",
    actor: "Sarah Chen", timestamp: "Jun 10, 9:02am",
  },
  {
    id: "e2", kind: "offer_sent", title: "Offer sent",
    description: "Initial outreach with deal terms and brand brief attached.",
    actor: "Sarah Chen", timestamp: "Jun 10, 9:14am",
  },
  {
    id: "e3", kind: "offer_accepted", title: "Creator accepted offer",
    description: "Priya agreed to the terms. Rate: $1,500/Reel, $300/Story.",
    timestamp: "Jun 11, 2:30pm",
  },
  {
    id: "e4", kind: "contract_sent", title: "Contract sent",
    actor: "Sarah Chen", timestamp: "Jun 12, 10:00am",
  },
  {
    id: "e5", kind: "contract_signed", title: "Contract signed",
    description: "All parties signed. Deal is now active.",
    timestamp: "Jun 12, 4:45pm",
  },
  {
    id: "e6", kind: "brief_sent", title: "Campaign brief sent",
    description: "Creative direction, do's & don'ts, and hashtag requirements attached.",
    actor: "Sarah Chen", timestamp: "Jun 13, 11:00am",
  },
  {
    id: "e7", kind: "content_submitted", title: "Draft content submitted",
    description: "1 Reel draft + 3 Story frames uploaded for review.",
    timestamp: "Jun 17, 3:22pm",
  },
  {
    id: "e8", kind: "revision_requested", title: "Revision requested",
    description: "Please add #superdeal to the caption and reframe the CTA.",
    actor: "Sarah Chen", timestamp: "Jun 17, 5:15pm",
  },
  {
    id: "e9", kind: "content_approved", title: "Content approved",
    description: "All 4 pieces approved. Creator may post.",
    actor: "Sarah Chen", timestamp: "Jun 18, 2:00pm",
  },
  {
    id: "e10", kind: "published", title: "Posted live on Instagram",
    description: "Reel posted — 14.2k views in first 2 hours.",
    timestamp: "Jun 19, 9:00am",
  },
  {
    id: "e11", kind: "payment_sent", title: "Payment sent",
    description: "$2,500 via bank transfer. Expected 3–5 business days.",
    actor: "Finance", timestamp: "Jun 20, 11:30am",
  },
];

const CAMPAIGN_EVENTS: TimelineEvent[] = [
  {
    id: "c1", kind: "creator_added", title: "Priya Nair added to roster",
    description: "Invited via Discover. Audience: 184K · 4.8% engagement.",
    actor: "Marcus Lee", timestamp: "Jun 10",
  },
  {
    id: "c2", kind: "creator_added", title: "Sam Kim added to roster",
    actor: "Marcus Lee", timestamp: "Jun 10",
  },
  {
    id: "c3", kind: "offer_sent", title: "Batch offers sent — 2 creators",
    actor: "Sarah Chen", timestamp: "Jun 11",
  },
  {
    id: "c4", kind: "offer_accepted", title: "Priya accepted",
    timestamp: "Jun 11",
  },
  {
    id: "c5", kind: "declined", title: "Sam declined",
    description: "Budget mismatch — requested $3,200, budget is $1,800.",
    timestamp: "Jun 12",
  },
  {
    id: "c6", kind: "contract_signed", title: "Priya's contract signed",
    timestamp: "Jun 13",
  },
  {
    id: "c7", kind: "content_submitted", title: "Priya submitted draft",
    description: "1 Reel + 3 Stories ready for review.",
    timestamp: "Jun 17",
  },
  {
    id: "c8", kind: "content_approved", title: "Content approved",
    actor: "Sarah Chen", timestamp: "Jun 18",
  },
  {
    id: "c9", kind: "published", title: "Published — 14.2K views",
    description: "Atlas X Reel live. 2.3% CTR on link in bio.",
    timestamp: "Jun 19",
  },
];

/* ------------------------------------------------------------------ */
/* Demo wrappers                                                         */
/* ------------------------------------------------------------------ */

function DealTimelineDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const visible = collapsed ? DEAL_EVENTS.slice(-3) : DEAL_EVENTS;
  return (
    <div style={{ maxWidth: 500 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Deal Activity</span>
        <Button variant="tertiary" size="sm" onClick={() => setCollapsed(c => !c)}>
          {collapsed ? `Show all ${DEAL_EVENTS.length} events` : "Show latest only"}
        </Button>
      </div>
      <ActivityTimeline events={visible} />
    </div>
  );
}

function CampaignActivityDemo() {
  return (
    <div style={{ maxWidth: 440 }}>
      <div style={{ marginBottom: 16 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Campaign Activity</span>
        <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginLeft: 8 }}>Atlas X Summer · June 2025</span>
      </div>
      <ActivityTimeline events={CAMPAIGN_EVENTS} compact />
    </div>
  );
}

function EmbeddedPanelDemo() {
  const recent = DEAL_EVENTS.slice(-4);
  return (
    <div style={{
      width: 300, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)",
      overflow: "hidden", background: "var(--sd-bg-primary)",
    }}>
      {/* Panel header */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>Activity</span>
        <Badge label="Live" tone="green" size="sm" dot />
      </div>
      {/* Timeline */}
      <div style={{ padding: "14px 14px 14px 14px" }}>
        <ActivityTimeline events={recent} compact />
      </div>
      <div style={{ padding: "0 14px 12px", borderTop: "1px solid var(--sd-border-light)", paddingTop: 10 }}>
        <Button variant="tertiary" size="sm">View full history</Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "activity-timeline",
  title: "ActivityTimeline",
  group: "Patterns",
  status: "stable",
  summary: "Vertical chronological event feed for deal progress, campaign history, and creator activity.",
  description:
    "ActivityTimeline renders a vertical connected list of timestamped events. Each event has a color-coded icon dot (from the token's TONES palette), a title, optional description, optional actor ('by Sarah Chen'), and a relative timestamp. 14 built-in event kinds cover the full deal lifecycle (deal_created → offer_sent → offer_accepted → contract_sent → contract_signed → brief_sent → content_submitted → revision_requested → content_approved → published → payment_sent) plus creator_added, message_sent, and declined. A `compact` prop reduces icon size and vertical spacing for embedding inside sidebars or Right Panels. Toggle to show all events or only the most recent N. Pairs naturally with the Right Panel (Overview tab) and inside the Deal Kanban card detail drawer.",
  demos: [
    {
      title: "Deal activity — full lifecycle",
      description: "Tracks a complete deal from creation to payment. Click 'Show latest only' to collapse to the 3 most recent events.",
      render: () => <DealTimelineDemo />,
    },
    {
      title: "Campaign activity — compact mode",
      description: "Compact mode (smaller icons, tighter spacing) for embedding in sidebars. Shows cross-creator events across a campaign.",
      render: () => <CampaignActivityDemo />,
    },
    {
      title: "Embedded in a panel",
      description: "Shows the last 4 events inside a 300px panel widget, as used in the Right Panel's Overview tab.",
      render: () => <EmbeddedPanelDemo />,
    },
  ],
  props: [
    {
      title: "ActivityTimeline",
      rows: [
        { name: "events",   type: "TimelineEvent[]",  required: true,  description: "Ordered list of events (earliest first)." },
        { name: "compact",  type: "boolean",          required: false, description: "Reduces icon size (22px→16px) and vertical gap for sidebar embedding." },
      ],
    },
    {
      title: "TimelineEvent",
      rows: [
        { name: "id",           type: "string",                required: true,  description: "Unique key." },
        { name: "kind",         type: "EventKind",             required: true,  description: "Determines default icon and tone. 14 built-in kinds; use 'custom' with iconOverride for others." },
        { name: "title",        type: "string",                required: true,  description: "Short event label." },
        { name: "description",  type: "string",                required: false, description: "Secondary line below the title." },
        { name: "actor",        type: "string",                required: false, description: "Who performed the action — renders as 'by <actor>'." },
        { name: "timestamp",    type: "string",                required: true,  description: "Display string (e.g. 'Jun 18, 2:00pm' or '3 days ago')." },
        { name: "iconOverride", type: "React.ElementType",     required: false, description: "Override the default icon for this kind." },
        { name: "toneOverride", type: "keyof typeof TONES",   required: false, description: "Override the dot color for this event." },
      ],
    },
  ],
};

export default doc;
