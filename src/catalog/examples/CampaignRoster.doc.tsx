"use client";

import React, { useState } from "react";
import {
  IconThumbUp,
  IconThumbDown,
  IconMessageCircle,
  IconEye,
  IconEyeOff,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconUsers,
  IconShieldCheck,
  IconSend,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Button from "@/components/ui/Button/Button";
import EmptyState from "@/components/ui/EmptyState/EmptyState";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type Platform = "instagram" | "tiktok" | "youtube";
type Vote = "approved" | "rejected" | null;

interface Reviewer {
  id: string;
  name: string;
  vote: "approved" | "rejected" | "strong" | null;
}

interface RosterCreator {
  id: string;
  name: string;
  handle: string;
  initials: string;
  avatarTone: keyof typeof TONES;
  platforms: Platform[];
  followers: string;
  reviewers: Reviewer[];
  hasDeal: boolean;
  unreadComments: number;
  visible: boolean;
}

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok: IconBrandTiktok,
  youtube: IconBrandYoutube,
};

const CREATORS: RosterCreator[] = [
  {
    id: "1", name: "Priya Nair", handle: "@priya_creates", initials: "PN",
    avatarTone: "purple", platforms: ["instagram", "tiktok"], followers: "284K",
    reviewers: [
      { id: "r1", name: "Sarah M.", vote: "approved" },
    ],
    hasDeal: true, unreadComments: 2, visible: true,
  },
  {
    id: "2", name: "Sam Kim", handle: "@sam.life", initials: "SK",
    avatarTone: "orange", platforms: ["youtube", "instagram"], followers: "1.2M",
    reviewers: [
      { id: "r1", name: "Sarah M.", vote: "approved" },
      { id: "r2", name: "Tom L.", vote: "rejected" },
    ],
    hasDeal: false, unreadComments: 0, visible: true,
  },
  {
    id: "3", name: "Tomohiro V.", handle: "@tomohiro_v", initials: "TV",
    avatarTone: "turquoise", platforms: ["tiktok"], followers: "892K",
    reviewers: [],
    hasDeal: false, unreadComments: 1, visible: false,
  },
  {
    id: "4", name: "Mara Voss", handle: "@mara.aesthetic", initials: "MV",
    avatarTone: "pink", platforms: ["instagram"], followers: "156K",
    reviewers: [
      { id: "r1", name: "Sarah M.", vote: "rejected" },
    ],
    hasDeal: true, unreadComments: 0, visible: true,
  },
  {
    id: "5", name: "Leo Park", handle: "@leofilm", initials: "LP",
    avatarTone: "blue", platforms: ["youtube", "tiktok"], followers: "540K",
    reviewers: [
      { id: "r1", name: "Sarah M.", vote: "approved" },
      { id: "r2", name: "Tom L.", vote: "approved" },
    ],
    hasDeal: false, unreadComments: 0, visible: true,
  },
];

/* ------------------------------------------------------------------ */
/* VotesPopover                                                          */
/* ------------------------------------------------------------------ */

function VotesPopover({ reviewers, myVote }: { reviewers: Reviewer[]; myVote: Vote }) {
  const rows = [
    ...(myVote ? [{ id: "me", name: "You", vote: myVote as Reviewer["vote"] }] : []),
    ...reviewers,
  ];

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 6px)", right: 0, zIndex: 200,
      background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-md)", boxShadow: "var(--sd-shadow-medium)",
      minWidth: 210, overflow: "hidden",
    }}>
      <div style={{
        padding: "8px 12px", borderBottom: "1px solid var(--sd-border-light)",
        fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)",
        textTransform: "uppercase", letterSpacing: "0.05em",
      }}>
        Approval votes
      </div>
      {rows.length === 0 ? (
        <div style={{ padding: "10px 12px", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
          No votes yet
        </div>
      ) : (
        rows.map(r => (
          <div key={r.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "7px 12px", gap: 8,
          }}>
            <span style={{ fontSize: 13, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {r.name}
            </span>
            {r.vote === "approved" || r.vote === "strong" ? (
              <IconThumbUp size={13} style={{ color: TONES.green.text, flexShrink: 0 }} />
            ) : r.vote === "rejected" ? (
              <IconThumbDown size={13} style={{ color: TONES.red.text, flexShrink: 0 }} />
            ) : (
              <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>—</span>
            )}
          </div>
        ))
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ApprovalVotes                                                         */
/* ------------------------------------------------------------------ */

function ApprovalVotes({
  creator,
  myVote,
  onVote,
}: {
  creator: RosterCreator;
  myVote: Vote;
  onVote: (v: Vote) => void;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const upCount =
    creator.reviewers.filter(r => r.vote === "approved" || r.vote === "strong").length +
    (myVote === "approved" ? 1 : 0);
  const downCount =
    creator.reviewers.filter(r => r.vote === "rejected").length +
    (myVote === "rejected" ? 1 : 0);

  const cast = (e: React.MouseEvent, vote: "approved" | "rejected") => {
    e.stopPropagation();
    onVote(myVote === vote ? null : vote);
  };

  return (
    <div
      style={{ position: "relative", display: "flex", alignItems: "center", gap: 1 }}
      onMouseEnter={() => setPopoverOpen(true)}
      onMouseLeave={() => setPopoverOpen(false)}
    >
      {/* Thumbs down */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="ghost"
          iconOnly
          size="sm"
          aria-label="Reject creator"
          style={{
            color: downCount > 0 ? TONES.red.text : "var(--sd-font-tertiary)",
            background: myVote === "rejected" ? TONES.red.tint : undefined,
          }}
          onClick={e => cast(e, "rejected")}
        >
          <IconThumbDown size={14} />
        </Button>
        {downCount > 0 && (
          <span style={{ fontSize: 11, fontWeight: 700, color: TONES.red.text, lineHeight: 1 }}>
            {downCount}
          </span>
        )}
      </div>

      {/* Thumbs up */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="ghost"
          iconOnly
          size="sm"
          aria-label="Approve creator"
          style={{
            color: upCount > 0 ? TONES.green.text : "var(--sd-font-tertiary)",
            background: myVote === "approved" ? TONES.green.tint : undefined,
          }}
          onClick={e => cast(e, "approved")}
        >
          <IconThumbUp size={14} />
        </Button>
        {upCount > 0 && (
          <span style={{ fontSize: 11, fontWeight: 700, color: TONES.green.text, lineHeight: 1 }}>
            {upCount}
          </span>
        )}
      </div>

      {popoverOpen && (
        <VotesPopover reviewers={creator.reviewers} myVote={myVote} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CreatorRow                                                            */
/* ------------------------------------------------------------------ */

function CreatorRow({
  creator,
  myVote,
  onVote,
  selected,
  onToggleSelect,
}: {
  creator: RosterCreator;
  myVote: Vote;
  onVote: (v: Vote) => void;
  selected: boolean;
  onToggleSelect: () => void;
}) {
  const [visible, setVisible] = useState(creator.visible);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "0 16px", height: 58, cursor: "pointer",
        borderBottom: "1px solid var(--sd-border-light)",
        background: selected ? "var(--sd-bg-secondary)" : hovered ? "var(--sd-bg-secondary)" : "transparent",
        transition: "background 0.1s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={selected}
        onChange={onToggleSelect}
        onClick={e => e.stopPropagation()}
        style={{ flexShrink: 0, accentColor: "var(--sd-bg-inverted)" }}
        aria-label={`Select ${creator.name}`}
      />

      {/* Avatar */}
      <Avatar initials={creator.initials} tone={creator.avatarTone} size="md" />

      {/* Identity */}
      <div style={{ flex: "0 0 180px", minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {creator.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{creator.handle}</span>
          <span style={{ display: "flex", gap: 3 }}>
            {creator.platforms.map(p => {
              const Icon = PLATFORM_ICONS[p];
              return <Icon key={p} size={10} style={{ color: "var(--sd-font-tertiary)" }} />;
            })}
          </span>
        </div>
      </div>

      {/* Followers */}
      <div style={{ flex: "0 0 72px", fontSize: 13, fontWeight: 500, color: "var(--sd-font-secondary)" }}>
        {creator.followers}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Actions cluster */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }} onClick={e => e.stopPropagation()}>
        {/* Approval votes */}
        <ApprovalVotes creator={creator} myVote={myVote} onVote={onVote} />

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "var(--sd-border-light)", margin: "0 4px" }} />

        {/* Comments with unread dot */}
        <div style={{ position: "relative" }}>
          <Button
            variant="ghost"
            iconOnly
            size="sm"
            aria-label="Comments"
            style={{ color: creator.unreadComments > 0 ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)" }}
          >
            <IconMessageCircle size={15} />
          </Button>
          {creator.unreadComments > 0 && (
            <span style={{
              position: "absolute", top: 3, right: 3,
              width: 6, height: 6, borderRadius: "50%",
              background: TONES.red.solid,
              border: "1.5px solid var(--sd-bg-primary)",
              pointerEvents: "none",
            }} />
          )}
        </div>

        {/* Visibility toggle */}
        <Button
          variant="ghost"
          iconOnly
          size="sm"
          aria-label={visible ? "Visible to client" : "Hidden from client"}
          style={{ color: visible ? "var(--sd-font-secondary)" : "var(--sd-border-strong)" }}
          onClick={() => setVisible(v => !v)}
        >
          {visible ? <IconEye size={15} /> : <IconEyeOff size={15} />}
        </Button>

        {/* Deal CTA */}
        {creator.hasDeal ? (
          <Button variant="secondary" size="sm">Open deal</Button>
        ) : (
          <Button variant="primary" size="sm">Create deal</Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

function CampaignRosterDemo() {
  const [votes, setVotes] = useState<Record<string, Vote>>({});
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const allSelected = selected.length === CREATORS.length;
  const toggleAll = () => setSelected(allSelected ? [] : CREATORS.map(c => c.id));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>
          Campaign creators
        </span>
        <span style={{
          fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)",
          background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "1px 7px",
        }}>
          {CREATORS.length}
        </span>
        <div style={{ flex: 1 }} />
        {selected.length > 0 && (
          <>
            <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>
              {selected.length} selected
            </span>
            <Button variant="tertiary" size="sm" onClick={() => setSelected([])}>
              Clear
            </Button>
            <Button variant="secondary" size="sm" leftIcon={<IconShieldCheck size={13} />}>
              Check safety
            </Button>
            <Button variant="primary" size="sm" leftIcon={<IconSend size={13} />}>
              Submit for approval
            </Button>
          </>
        )}
      </div>

      {/* Table */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "0 16px", height: 34,
          background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)",
        }}>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
            style={{ flexShrink: 0, accentColor: "var(--sd-bg-inverted)" }}
            aria-label="Select all"
          />
          <div style={{ width: 34, flexShrink: 0 }} />
          {[
            { label: "Creator", flex: "0 0 180px" },
            { label: "Followers", flex: "0 0 72px" },
            { label: "", flex: "1" },
            { label: "Approval", flex: "auto" },
            { label: "Notes", flex: "auto" },
            { label: "Visible", flex: "auto" },
            { label: "", flex: "auto" },
          ].map(({ label, flex }, i) => (
            <span
              key={i}
              style={{ flex, fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Rows */}
        {CREATORS.map(c => (
          <CreatorRow
            key={c.id}
            creator={c}
            myVote={votes[c.id] ?? null}
            onVote={v => setVotes(prev => ({ ...prev, [c.id]: v }))}
            selected={selected.includes(c.id)}
            onToggleSelect={() => toggleSelect(c.id)}
          />
        ))}
      </div>

      <p style={{ fontSize: 11, color: "var(--sd-font-tertiary)", margin: 0 }}>
        Hover the vote buttons to see the reviewer breakdown popover. Click to toggle your own vote. Unread comment dots clear on click.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state variant                                                   */
/* ------------------------------------------------------------------ */

function EmptyRosterDemo() {
  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
      <EmptyState
        icon={IconUsers}
        title="No creators on this campaign yet"
        description="Let the agent build a campaign-specific shortlist for review, then approve creators before outreach begins."
        actions={[
          { label: "Find with agent", onClick: () => {} },
          { label: "Add manually", onClick: () => {}, variant: "ghost" },
        ]}
        size="md"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "campaign-roster",
  title: "Campaign Roster",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Campaign creator list with inline approval voting (thumbs up/down), reviewer breakdown popover, unread comment indicators, visibility toggle, and deal CTAs.",
  description:
    "The Campaign Roster displays each creator added to a campaign with a full action cluster: **approval votes** (thumbs down/up — click to cast your vote, mutually exclusive, hover shows per-reviewer breakdown), a **comments button** with an unread-count dot, a **visibility toggle** (eye/eye-off) to control what the client sees, and a **deal CTA** that switches between 'Create deal' (primary) and 'Open deal' (secondary) based on whether an engagement exists. Bulk selection enables the Check safety and Submit for approval toolbar actions. Ported from `CreatorsTab.tsx` + `ApprovalVotes.tsx` in the main app.",
  demos: [
    {
      title: "Campaign roster with approval voting",
      description: "Hover vote buttons to see reviewer breakdown. Click thumbs to cast your vote. Toggle visibility with the eye icon.",
      block: true,
      render: () => <CampaignRosterDemo />,
    },
    {
      title: "Empty state",
      description: "Shown when no creators have been added to the campaign yet.",
      render: () => <EmptyRosterDemo />,
    },
  ],
  props: [
    {
      title: "ApprovalVotes (internal)",
      rows: [
        { name: "reviewers", type: "ApprovalReviewerVote[]", required: true, description: "Other team members' recorded votes — drives aggregate counts and the hover popover." },
        { name: "myVote", type: '"approved" | "rejected" | null', required: true, description: "Current user's own vote (optimistic). Shown as a tinted active button." },
        { name: "onVote", type: "(vote) => void", required: true, description: "Called when the current user clicks a thumb. Null means toggle off (un-vote)." },
      ],
    },
  ],
};

export default doc;
