"use client";

import React, { useState } from "react";
import {
  IconAt,
  IconSparkles,
  IconMail,
  IconPhone,
  IconUser,
  IconMoneybag,
  IconBuildingFactory2,
  IconDotsVertical,
  IconCircleCheck,
  IconClock,
  IconAlertCircle,
  IconChevronLeft,
  IconChevronDown,
  IconChevronRight,
  IconLink,
  IconCheck,
  IconBolt,
} from "@tabler/icons-react";
import { CreatorPanel } from "./CreatorPanel";
import CreatorPlatformChips from "@/components/Creator/CreatorPlatformChips/CreatorPlatformChips";
import FieldGroup from "@/components/Fields/FieldGroup/FieldGroup";
import FieldRow from "@/components/Fields/FieldRow";
import {
  FieldTextEditor,
  FieldCurrencyEditor,
} from "@/components/Fields/editors/FieldEditors";
import { default as Button } from "@/components/ui/Button/Button";
import Badge from "@/components/ui/Badge/Badge";
import Avatar from "@/components/ui/Avatar/Avatar";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import { ChatInput } from "@/components/ui/Input/ChatInput";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import { ThreadList, ThreadView } from "@/components/ui/EmailThread";
import type { ThreadData } from "@/components/ui/EmailThread";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Panel header — large avatar, name+handle right, invite card, chips  */
/* ------------------------------------------------------------------ */

function InviteCard() {
  const [copied, setCopied] = useState(false);

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Brand mark + copy */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        {/* "SD" brand logo — intentional black rounded square, not a person avatar */}
        <div style={{ width: 28, height: 28, borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-inverted)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "-0.02em", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          SD
        </div>
        <div>
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>
            Invite to connect accounts
          </div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 3, lineHeight: 1.45 }}>
            Connect Priya's Instagram &amp; TikTok to sync follower stats and content automatically.
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        <Button variant="secondary" size="sm" leftIcon={<IconMail size={13} />} style={{ flex: 1 }}>
          Send email
        </Button>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={copied ? <IconCheck size={13} /> : <IconLink size={13} />}
          onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ flex: 1 }}
        >
          {copied ? "Copied!" : "Copy link"}
        </Button>
      </div>
    </div>
  );
}

function PanelHeader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Identity: large avatar + name/handle column */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar name="Priya Nair" tone="purple" size="lg" />
        <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
          <div style={{ fontSize: "var(--sd-text-md)", fontWeight: 700, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>Priya Nair</div>
          <div style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-creator-handle)", fontWeight: 500, marginTop: 2 }}>@priya.creates</div>
          <div style={{ marginTop: 6 }}>
            <Badge label="Active" tone="green" variant="status" dot />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 2, paddingTop: 2 }}>
          <Button size="sm" variant="ghost" iconOnly aria-label="More">
            <IconDotsVertical size={14} />
          </Button>
        </div>
      </div>

      {/* Platform chips below */}
      <CreatorPlatformChips
        followers={{ instagram: 128000, tiktok: 96000 }}
        iconSize={11}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Info tab — About, Tags, Platform analytics, then fields             */
/* ------------------------------------------------------------------ */


function ContentBar({ label, value, pct, color }: { label: string; value: string; pct: number; color: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>{value}</span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: "var(--sd-bg-tertiary)", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: color, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

const PLATFORM_STATS: Record<string, React.ReactNode> = {
  instagram: (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "14px 0 4px" }}>
      {/* key metrics */}
      <div style={{ display: "flex", gap: 8 }}>
        <StatCard label="Followers" value="128K" trend={2.1} trendLabel="MoM" size="sm" />
        <StatCard label="Engagement" value="4.6%" trend={0.3} size="sm" />
        <StatCard label="Avg Likes" value="5.9K" size="sm" />
      </div>

      {/* content performance */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Content performance (30d)
        </div>
        <ContentBar label="Reels" value="12.4K avg views" pct={88} color={TONES.purple.solid} />
        <ContentBar label="Stories" value="6.2K avg views" pct={54} color={TONES.purple.solid} />
        <ContentBar label="Posts" value="4.8K avg likes" pct={40} color={TONES.purple.solid} />
      </div>

      {/* mini follower trend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Follower growth (6mo)
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
          {[52, 62, 70, 78, 84, 96, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? TONES.purple.solid : TONES.purple.tint, borderRadius: "3px 3px 0 0", minWidth: 0 }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
            <span key={m} style={{ fontSize: 10, color: "var(--sd-font-tertiary)", flex: 1, textAlign: "center" }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  ),

  tiktok: (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: "14px 0 4px" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <StatCard label="Followers" value="96K" trend={4.8} trendLabel="MoM" size="sm" />
        <StatCard label="Engagement" value="6.2%" trend={1.1} size="sm" />
        <StatCard label="Avg Views" value="48K" size="sm" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Content performance (30d)
        </div>
        <ContentBar label="Videos" value="48K avg views" pct={80} color={TONES.blue.solid} />
        <ContentBar label="Duets" value="22K avg views" pct={46} color={TONES.blue.solid} />
        <ContentBar label="Stitches" value="11K avg views" pct={25} color={TONES.blue.solid} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          Follower growth (6mo)
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
          {[40, 55, 65, 72, 80, 91, 100].map((h, i) => (
            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 6 ? TONES.blue.solid : TONES.blue.tint, borderRadius: "3px 3px 0 0", minWidth: 0 }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
            <span key={m} style={{ fontSize: 10, color: "var(--sd-font-tertiary)", flex: 1, textAlign: "center" }}>{m}</span>
          ))}
        </div>
      </div>
    </div>
  ),
};

function InfoTab() {
  const [platform, setPlatform] = useState("instagram");

  return (
    <div style={{ padding: "0 0 24px" }}>

      {/* About */}
      <div style={{ padding: "14px 16px 12px" }}>
        <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>About</div>
        <p style={{ margin: 0, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", lineHeight: 1.6 }}>
          Beauty & lifestyle creator based in LA. Authentic product reviews, GRWM content, and skincare deep-dives. Known for high engagement and relatable storytelling.
        </p>
      </div>

      {/* Tags */}
      <div style={{ padding: "0 16px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
        <Badge label="Beauty"    tone="purple" variant="status" />
        <Badge label="Lifestyle" tone="pink"   variant="status" />
        <Badge label="Skincare"  tone="green"  variant="status" />
        <Badge label="Gen Z"     tone="blue"   variant="status" />
        <Badge label="LA-based"  tone="orange" variant="status" />
      </div>

      {/* Invite card — below tags, above platform toggle */}
      <div style={{ padding: "0 16px 14px" }}>
        <InviteCard />
      </div>

      <div style={{ height: 1, background: "var(--sd-border-light)", margin: "0 16px 14px" }} />

      {/* Platform analytics */}
      <div style={{ padding: "0 16px" }}>
        <Tabs
          variant="pill"
          tabs={[
            { label: "Instagram", value: "instagram" },
            { label: "TikTok", value: "tiktok" },
          ]}
          value={platform}
          onChange={setPlatform}
        />
        {PLATFORM_STATS[platform]}
      </div>

      <div style={{ height: 1, background: "var(--sd-border-light)", margin: "14px 16px" }} />

      {/* Fields */}
      <FieldGroup label="Profile">
        <FieldRow icon={<IconAt size={15} />} label="Username" value="@priya.creates" editor={(c) => <FieldTextEditor defaultValue="@priya.creates" onClose={c} />} />
        <FieldRow icon={<IconSparkles size={15} />} label="Category" value="Beauty & Lifestyle" editor={(c) => <FieldTextEditor defaultValue="Beauty & Lifestyle" onClose={c} />} />
      </FieldGroup>

      <FieldGroup label="Business">
        <FieldRow icon={<IconMoneybag size={15} />} label="Annual Revenue" placeholder="Annual Revenue" editor={(c) => <FieldCurrencyEditor placeholder="Amount" onClose={c} />} />
        <FieldRow icon={<IconBuildingFactory2 size={15} />} label="Industry" value="Creator Economy" editor={(c) => <FieldTextEditor defaultValue="Creator Economy" onClose={c} />} />
      </FieldGroup>

      <FieldGroup label="Contact">
        <FieldRow icon={<IconMail size={15} />} label="Email" value="priya@lumen.co" editor={(c) => <FieldTextEditor defaultValue="priya@lumen.co" onClose={c} />} />
        <FieldRow icon={<IconPhone size={15} />} label="Phone" placeholder="Add phone" editor={(c) => <FieldTextEditor placeholder="Add phone" onClose={c} />} />
        <FieldRow icon={<IconUser size={15} />} label="Owner" value={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Avatar initials="ED" tone="green" size="sm" />
            <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)" }}>Eric Dahan</span>
          </span>
        } />
      </FieldGroup>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Deals tab                                                             */
/* ------------------------------------------------------------------ */

interface Deal { name: string; amount: string; deliverable: string; stage: string; stageTone: keyof typeof TONES; }

function DealRow({ deal }: { deal: Deal }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 16px", cursor: "pointer" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sd-bg-tertiary)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      <span style={{ width: 32, height: 32, borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", border: "1px solid var(--sd-border-light)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sd-font-tertiary)" }}>
        <IconBolt size={15} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{deal.name}</div>
        <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 1 }}>{deal.amount} · {deal.deliverable}</div>
      </div>
      <Badge label={deal.stage} tone={deal.stageTone} size="sm" />
    </div>
  );
}

function DealsTab() {
  const sections: { title: string; deals: Deal[] }[] = [
    { title: "Active", deals: [
      { name: "Atlas X Launch", amount: "$15,000", deliverable: "IG Reel ×2", stage: "In production", stageTone: "blue" },
      { name: "Spring Drop", amount: "$9,000", deliverable: "TikTok ×1", stage: "Signed", stageTone: "purple" },
    ]},
    { title: "Offers", deals: [
      { name: "Summer Glow", amount: "$7,500", deliverable: "IG Story ×3", stage: "Offer sent", stageTone: "yellow" },
    ]},
    { title: "Completed", deals: [
      { name: "Winter Campaign", amount: "$12,000", deliverable: "IG Reel ×1", stage: "Completed", stageTone: "green" },
    ]},
  ];

  return (
    <div style={{ padding: "8px 0 24px" }}>
      {sections.map(({ title, deals }) => (
        <div key={title} style={{ marginBottom: 4 }}>
          <div style={{ padding: "6px 16px 2px", fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {title} ({deals.length})
          </div>
          {deals.map((d) => <DealRow key={d.name} deal={d} />)}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tasks tab                                                             */
/* ------------------------------------------------------------------ */

interface Task { label: string; sub?: string; due?: string; urgent?: boolean; done?: boolean; }

function TaskRow({ task }: { task: Task }) {
  const Icon = task.done ? IconCircleCheck : task.urgent ? IconAlertCircle : IconClock;
  const iconColor = task.done ? TONES.green.solid : task.urgent ? "var(--sd-danger)" : "var(--sd-font-tertiary)";
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "7px 16px", cursor: "pointer", opacity: task.done ? 0.5 : 1 }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--sd-bg-tertiary)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
      <Icon size={15} style={{ color: iconColor, marginTop: 1, flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)", fontWeight: 500, textDecoration: task.done ? "line-through" : "none" }}>{task.label}</div>
        {task.sub && <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 1 }}>{task.sub}</div>}
      </div>
      {task.due && <span style={{ fontSize: "var(--sd-text-xs)", color: task.urgent ? "var(--sd-danger)" : "var(--sd-font-tertiary)", whiteSpace: "nowrap", fontWeight: task.urgent ? 600 : 400 }}>{task.due}</span>}
    </div>
  );
}

function TasksTab() {
  const sections: { title: string; tasks: Task[] }[] = [
    { title: "Needs you", tasks: [
      { label: "Approve script", sub: "Atlas X Reel v2", due: "Today", urgent: true },
      { label: "Send offer", sub: "Summer Glow campaign" },
    ]},
    { title: "Waiting on creator", tasks: [
      { label: "Awaiting content", sub: "Atlas X Reel v2", due: "Aug 12" },
    ]},
    { title: "Done", tasks: [
      { label: "Contract signed", sub: "Spring Drop", done: true },
      { label: "Offer accepted", sub: "Atlas X Launch", done: true },
    ]},
  ];
  return (
    <div style={{ padding: "8px 0 24px" }}>
      {sections.map(({ title, tasks }) => (
        <div key={title} style={{ marginBottom: 4 }}>
          <div style={{ padding: "6px 16px 2px", fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {title} ({tasks.length})
          </div>
          {tasks.map((t) => <TaskRow key={t.label} task={t} />)}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Messages tab — ThreadList + ThreadView from EmailThread component    */
/* ------------------------------------------------------------------ */

const PRIYA_THREADS: ThreadData[] = [
  {
    id: "t1",
    participants: [{ initials: "P", tone: "purple" }, { initials: "E", tone: "green" }],
    participantLabel: "Priya, ...",
    count: 3,
    subject: "Re: Atlas X brief",
    snippet: "Sounds great! I'll send the script draft by Friday…",
    date: "2h",
    unread: true,
    messages: [
      { senderInitials: "E", senderName: "You", senderTone: "green", date: "Jul 28 · 10:14 AM", body: "Hey Priya,\n\nExcited to kick off the Atlas X campaign! I've attached the creative brief — key ask is a 60-second Reel focused on the morning skincare routine angle.\n\nLet me know if you have questions." },
      { senderInitials: "P", senderName: "Priya Nair", senderTone: "purple", date: "Jul 28 · 2:30 PM", to: "You", body: "Hi Eric,\n\nLove the direction! One thought — can we weave in a GRWM element to boost watch time? My audience responds really well to that format.\n\nAlso, should I use ring light or natural light for this one?" },
      { senderInitials: "E", senderName: "You", senderTone: "green", date: "Today · 9:02 AM", body: "Go with natural light — reads more authentic for a skincare spot.\n\nGreen light on the GRWM angle. Let's plan for a script review by Friday?" },
    ],
  },
  {
    id: "t2",
    participants: [{ initials: "E", tone: "green" }],
    participantLabel: "You",
    count: 1,
    subject: "Contract ready — Spring Drop",
    snippet: "Hi Priya, please review the attached contract…",
    date: "1d",
    messages: [
      { senderInitials: "E", senderName: "You", senderTone: "green", date: "Yesterday · 3:45 PM", to: "priya@lumen.co", body: "Hi Priya,\n\nThe Spring Drop contract is ready for your review. Please sign by Friday so we can lock the shoot dates.\n\nSummary:\n• 1× TikTok video (60s)\n• 3× IG Stories\n• Usage rights: 6 months social\n• Fee: $9,000\n\nLet me know if anything needs adjustment." },
    ],
  },
  {
    id: "t3",
    participants: [{ initials: "P", tone: "purple" }, { initials: "E", tone: "green" }],
    participantLabel: "Priya, ...",
    count: 2,
    subject: "Atlas X — content feedback",
    snippet: "Quick note on the B-roll selects…",
    date: "Jun 25",
    messages: [
      { senderInitials: "P", senderName: "Priya Nair", senderTone: "purple", date: "Jun 25 · 11:00 AM", body: "Quick note on the B-roll selects — I really like the morning light shots. I think those will perform best on Reels." },
      { senderInitials: "E", senderName: "You", senderTone: "green", date: "Jun 25 · 2:15 PM", body: "Agreed. Let's lead with the window shot. Can you do a short voiceover take on top of it?" },
    ],
  },
];

function MessagesTab() {
  const [selected, setSelected] = useState<ThreadData | null>(null);

  if (selected) {
    return (
      <>
        <ThreadView
          thread={selected}
          onBack={() => setSelected(null)}
        />
        <div style={{ position: "sticky", bottom: 0, background: "var(--sd-bg-primary)", borderTop: "1px solid var(--sd-border-light)", padding: "10px 16px 14px" }}>
          <ChatInput placeholder={`Reply to ${selected.participantLabel.split(",")[0]}…`} onSend={() => {}} />
        </div>
      </>
    );
  }

  return (
    <div style={{ padding: "12px 16px 16px" }}>
      <ThreadList
        threads={PRIYA_THREADS}
        label="Inbox"
        count={3}
        onSelect={setSelected}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo wrapper                                                          */
/* ------------------------------------------------------------------ */

function CreatorPanelDemo() {
  return (
    <div style={{ height: 640, display: "inline-flex", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", boxShadow: "var(--sd-shadow-strong)" }}>
      <CreatorPanel
        header={<PanelHeader />}
        defaultTab="info"
        onClose={() => {}}
        onExpand={() => {}}
        tabs={[
          { value: "info", label: "Info", content: <InfoTab /> },
          { value: "deals", label: "Deals", badge: 3, content: <DealsTab /> },
          { value: "tasks", label: "Tasks", badge: 2, content: <TasksTab /> },
          { value: "messages", label: "Messages", badge: 2, content: <MessagesTab /> },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc export                                                            */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "creator-right-panel",
  title: "Creator Right Panel",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "The durable creator record — identity, platform analytics, inline fields, deals, tasks, and email threads.",
  description:
    "A `CreatorPanel` shell composed with: a large-avatar identity header; Info tab with About text, tone tags, per-platform analytics charts (Instagram / TikTok), and editable field groups; Deals and Tasks tabs; Messages tab with a thread list that drills into individual email threads (collapsible messages + reply bar).",
  source: "apps/web — CampaignCreatorDrawer",
  demos: [
    {
      title: "Creator Right Panel",
      description:
        "Click tabs to navigate Info · Deals · Tasks · Messages. In Info, toggle Instagram / TikTok to see platform analytics. In Messages, click a thread to open it — messages expand/collapse on click. Reply bar at the bottom sends messages.",
      block: true,
      render: () => <CreatorPanelDemo />,
    },
  ],
  props: [
    {
      title: "CreatorPanelProps",
      rows: [
        { name: "header", type: "ReactNode", required: true, description: "Identity + actions above the tab bar." },
        { name: "tabs", type: "CreatorPanelTab[]", required: true, description: "label, value, optional badge, content ReactNode." },
        { name: "defaultTab", type: "string", description: "Initially active tab. Defaults to first tab." },
        { name: "onClose / onExpand", type: "() => void", description: "Render ✕ / ⤢ buttons when provided." },
      ],
    },
  ],
};

export default doc;
