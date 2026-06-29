"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconFileText,
  IconCheck,
  IconMessage2,
  IconPlus,
  IconSend,
  IconPencil,
  IconTrash,
  IconUpload,
  IconAlertCircle,
  IconCurrencyDollar,
  IconFilter,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type ActionType =
  | "content_approved"
  | "content_submitted"
  | "brief_sent"
  | "creator_added"
  | "creator_removed"
  | "message_sent"
  | "contract_signed"
  | "payment_sent"
  | "campaign_created"
  | "revision_requested";

interface TeamMember {
  id: string;
  name: string;
  initials: string;
  tone: keyof typeof TONES;
  role: "manager" | "coordinator" | "finance" | "admin";
}

interface Activity {
  id: string;
  actor: TeamMember;
  action: ActionType;
  subject: string;    // e.g. creator name or content title
  campaign: string;
  elapsed: number;    // seconds ago
  meta?: string;      // optional extra detail
  read: boolean;
}

/* ---- seed ---- */

const TEAM: TeamMember[] = [
  { id: "t1", name: "Jamie Okafor",  initials: "JO", tone: "blue",   role: "manager"     },
  { id: "t2", name: "Sara Chen",     initials: "SC", tone: "purple", role: "coordinator" },
  { id: "t3", name: "Ravi Mehta",    initials: "RM", tone: "orange", role: "finance"     },
  { id: "t4", name: "Leila Torres",  initials: "LT", tone: "pink",   role: "coordinator" },
];

const ACTIVITIES: Activity[] = [
  { id: "a1",  actor: TEAM[1], action: "content_approved",   subject: "Summer Reel v2",       campaign: "Summer Glow",    elapsed: 120,    meta: "approved after 2 revisions",        read: false },
  { id: "a2",  actor: TEAM[0], action: "creator_added",      subject: "Aisha Obi",            campaign: "Summer Glow",    elapsed: 480,    meta: undefined,                          read: false },
  { id: "a3",  actor: TEAM[3], action: "brief_sent",         subject: "Marcus Webb",          campaign: "FitLife Q2",     elapsed: 900,    meta: "included revised usage clause",    read: false },
  { id: "a4",  actor: TEAM[2], action: "payment_sent",       subject: "Priya Nair",           campaign: "Summer Glow",    elapsed: 3_600,  meta: "$1,200 · INV-0041",                read: true  },
  { id: "a5",  actor: TEAM[1], action: "revision_requested", subject: "Diego TikTok Draft",   campaign: "Summer Glow",    elapsed: 5_400,  meta: "product not visible in first 5s",  read: true  },
  { id: "a6",  actor: TEAM[0], action: "contract_signed",    subject: "Hana Kim",             campaign: "Summer Glow",    elapsed: 7_200,  meta: "countersigned by brand",           read: true  },
  { id: "a7",  actor: TEAM[3], action: "message_sent",       subject: "Liam Park",            campaign: "Tech Drop",      elapsed: 10_800, meta: undefined,                          read: true  },
  { id: "a8",  actor: TEAM[1], action: "campaign_created",   subject: "Winter Skin",          campaign: "Winter Skin",    elapsed: 86_400, meta: "6 creators planned",               read: true  },
  { id: "a9",  actor: TEAM[2], action: "payment_sent",       subject: "Diego Santos",         campaign: "FitLife Q2",     elapsed: 90_000, meta: "$3,200 · INV-0040",               read: true  },
  { id: "a10", actor: TEAM[3], action: "content_submitted",  subject: "Aisha Story Set",      campaign: "Summer Glow",    elapsed: 93_000, meta: "3 stories, awaiting review",       read: true  },
];

const ACTION_META: Record<ActionType, { icon: React.ElementType; color: string; verb: string }> = {
  content_approved:   { icon: IconCheck,           color: TONES.green.text,  verb: "approved"          },
  content_submitted:  { icon: IconUpload,           color: TONES.blue.text,   verb: "submitted"         },
  brief_sent:         { icon: IconFileText,         color: TONES.purple.text, verb: "sent brief to"     },
  creator_added:      { icon: IconPlus,             color: TONES.green.text,  verb: "added"             },
  creator_removed:    { icon: IconTrash,            color: TONES.red.text,    verb: "removed"           },
  message_sent:       { icon: IconMessage2,         color: "var(--sd-font-secondary, #666)", verb: "messaged"  },
  contract_signed:    { icon: IconPencil,           color: TONES.blue.text,   verb: "signed contract with" },
  payment_sent:       { icon: IconCurrencyDollar,   color: TONES.green.text,  verb: "sent payment to"   },
  campaign_created:   { icon: IconSend,             color: TONES.purple.text, verb: "created campaign"  },
  revision_requested: { icon: IconAlertCircle,      color: TONES.yellow.text, verb: "requested revision on" },
};

const ROLE_TONE: Record<TeamMember["role"], keyof typeof TONES> = {
  manager:     "blue",
  coordinator: "purple",
  finance:     "green",
  admin:       "gray",
};

function elapsed(s: number): string {
  if (s < 60)     return "just now";
  if (s < 3600)   return `${Math.floor(s / 60)}m ago`;
  if (s < 86400)  return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

/* ---- Demo ---- */

function Demo() {
  const [filterMember, setFilterMember] = useState<string>("all");
  const [filterAction, setFilterAction] = useState<ActionType | "all">("all");
  const [showFilters, setShowFilters] = useState(false);

  const visible = ACTIVITIES.filter((a) => {
    if (filterMember !== "all" && a.actor.id !== filterMember) return false;
    if (filterAction !== "all" && a.action !== filterAction) return false;
    return true;
  });

  const unread = ACTIVITIES.filter((a) => !a.read).length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>Team activity</span>
          {unread > 0 && <Badge label={`${unread} new`} tone="blue" />}
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<IconFilter size={12} />}
          onClick={() => setShowFilters((v) => !v)}
        >
          Filter
        </Button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, marginBottom: 14, display: "flex", gap: 20, flexWrap: "wrap" }}>
          {/* Member filter */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Team member</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <button onClick={() => setFilterMember("all")} style={{ padding: "3px 8px", borderRadius: 99, border: "1px solid", borderColor: filterMember === "all" ? "#333" : "var(--sd-border-default, #e5e7eb)", background: filterMember === "all" ? "#333" : "transparent", color: filterMember === "all" ? "#fff" : "var(--sd-font-secondary, #666)", fontSize: 11, cursor: "pointer", fontWeight: 500 }}>All</button>
              {TEAM.map((m) => (
                <button key={m.id} onClick={() => setFilterMember(m.id)} style={{ padding: "3px 8px", borderRadius: 99, border: "1px solid", borderColor: filterMember === m.id ? "#333" : "var(--sd-border-default, #e5e7eb)", background: filterMember === m.id ? "#333" : "transparent", color: filterMember === m.id ? "#fff" : "var(--sd-font-secondary, #666)", fontSize: 11, cursor: "pointer", fontWeight: 500 }}>
                  {m.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Action type filter */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Action type</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              {(["all", "content_approved", "payment_sent", "contract_signed", "creator_added", "brief_sent"] as const).map((a) => (
                <button key={a} onClick={() => setFilterAction(a)} style={{ padding: "3px 8px", borderRadius: 99, border: "1px solid", borderColor: filterAction === a ? "#333" : "var(--sd-border-default, #e5e7eb)", background: filterAction === a ? "#333" : "transparent", color: filterAction === a ? "#fff" : "var(--sd-font-secondary, #666)", fontSize: 11, cursor: "pointer", fontWeight: 500, textTransform: "capitalize" }}>
                  {a === "all" ? "All" : a.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Feed */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, overflow: "hidden" }}>
        {visible.length === 0 ? (
          <div style={{ padding: "40px 0", textAlign: "center", fontSize: 13, color: "var(--sd-font-tertiary, #999)" }}>
            No activity matches your filters.
          </div>
        ) : (
          visible.map((a, i) => {
            const { icon: Icon, color, verb } = ACTION_META[a.action];
            return (
              <div
                key={a.id}
                style={{
                  display: "flex", gap: 10, padding: "11px 14px",
                  borderBottom: i < visible.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none",
                  background: !a.read ? "rgba(37,99,235,0.03)" : "transparent",
                }}
              >
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <Avatar initials={a.actor.initials} tone={a.actor.tone} size="sm" />
                  <div style={{
                    position: "absolute", bottom: -2, right: -2,
                    width: 16, height: 16, borderRadius: "50%",
                    background: TONES[ROLE_TONE[a.actor.role]].tint,
                    border: "1.5px solid #fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={8} style={{ color }} />
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: "var(--sd-font-primary, #111)", lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700 }}>{a.actor.name}</span>
                    {" "}
                    <span style={{ color: "var(--sd-font-secondary, #666)" }}>{verb}</span>
                    {" "}
                    <span style={{ fontWeight: 600, color }}>{a.subject}</span>
                    {" in "}
                    <span style={{ color: "var(--sd-font-secondary, #666)" }}>{a.campaign}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3, flexWrap: "wrap" }}>
                    {a.meta && (
                      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{a.meta}</span>
                    )}
                    <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginLeft: "auto" }}>{elapsed(a.elapsed)}</span>
                    {!a.read && (
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563eb", display: "inline-block", flexShrink: 0 }} />
                    )}
                  </div>
                </div>

                {/* Role badge */}
                <Badge label={a.actor.role} tone={ROLE_TONE[a.actor.role]} size="sm" />
              </div>
            );
          })
        )}
      </div>

      {visible.length > 0 && (
        <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
          <Button variant="secondary" size="sm">Load more activity</Button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "team-activity-feed",
  title: "TeamActivityFeed",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Workspace audit log — all team actions across campaigns, filterable by member and action type, with unread indicators.",
  description:
    "The workspace-level activity surface. Shows every action by every team member: content approvals, payments, briefs, creator adds, contract signs, revisions. Each row: avatar with action-icon badge, actor name + verb + subject + campaign, meta detail, elapsed time, unread dot, role badge. Filter panel (hidden until toggled): by team member or action type. Unread count in header. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Team activity feed",
      description: "Click Filter to open the member/action-type filter panel. Unread events have a blue dot and tinted background.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
