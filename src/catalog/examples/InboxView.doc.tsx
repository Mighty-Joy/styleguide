"use client";

import React, { useState } from "react";
import {
  IconSearch,
  IconPencil,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconCircleCheck,
  IconX,
  IconSend,
  IconPaperclip,
  IconPhoto,
  IconDots,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import { Input } from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type InboxTab  = "all" | "unread" | "sent";
type MsgStatus = "new" | "creator_replied" | "rate_card" | "declined";

interface InboxThread {
  id: string;
  creatorName: string;
  creatorHandle: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  platform: "instagram" | "tiktok" | "youtube";
  snippet: string;
  timestamp: string;
  unread: boolean;
  status: MsgStatus;
  campaign?: string;
  messages: InboxMessage[];
}

interface InboxMessage {
  id: string;
  from: "brand" | "creator";
  body: string;
  timestamp: string;
}

/* ------------------------------------------------------------------ */
/* Constants                                                             */
/* ------------------------------------------------------------------ */

const STATUS_META: Record<MsgStatus, { label: string; tone: keyof typeof TONES }> = {
  new:             { label: "New",              tone: "gray"   },
  creator_replied: { label: "Creator replied",  tone: "blue"   },
  rate_card:       { label: "Rate card",        tone: "green"  },
  declined:        { label: "Declined",         tone: "red"    },
};

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

/* ------------------------------------------------------------------ */
/* Seed data                                                             */
/* ------------------------------------------------------------------ */

const THREADS: InboxThread[] = [
  {
    id: "t1", creatorName: "Priya Nair", creatorHandle: "@priya_creates", creatorInitials: "PN", creatorTone: "sky",
    platform: "instagram", snippet: "Hey! I'd love to be part of the Atlas X campaign. Here's my rate card…", timestamp: "2m ago",
    unread: true, status: "rate_card", campaign: "Atlas X Summer",
    messages: [
      { id: "m1", from: "brand", body: "Hi Priya! We'd love to collaborate on our Atlas X Summer campaign. We're looking for 2 Instagram Reels and 3 Stories featuring our new skincare line. Budget is $2,500. Interested?", timestamp: "Jun 18, 10:30am" },
      { id: "m2", from: "creator", body: "Hey! I'd love to be part of the Atlas X campaign. Here's my rate card — I typically charge $1,500 per Reel and $300 per Story. Happy to negotiate a bundle deal!", timestamp: "Jun 18, 2:14pm" },
      { id: "m3", from: "brand", body: "That sounds great! Can we schedule a quick call to align on creative direction?", timestamp: "Jun 18, 4:02pm" },
      { id: "m4", from: "creator", body: "Absolutely! I'm free Tuesday or Wednesday afternoon. Let me know what works!", timestamp: "2m ago" },
    ],
  },
  {
    id: "t2", creatorName: "Sam Kim", creatorHandle: "@sam.life", creatorInitials: "SK", creatorTone: "orange",
    platform: "tiktok", snippet: "Thanks for reaching out! I'm definitely interested in UGC work.", timestamp: "1h ago",
    unread: true, status: "creator_replied", campaign: "Glow Labs Q3",
    messages: [
      { id: "m1", from: "brand", body: "Hi Sam! Glow Labs is launching a new skincare line next quarter and we'd love some authentic UGC content from you. Raw video, no post required. $800 for 3 clips.", timestamp: "Jun 17, 9:00am" },
      { id: "m2", from: "creator", body: "Thanks for reaching out! I'm definitely interested in UGC work. Do you have a brief I can review?", timestamp: "1h ago" },
    ],
  },
  {
    id: "t3", creatorName: "Mara Voss", creatorHandle: "@mara.aesthetic", creatorInitials: "MV", creatorTone: "purple",
    platform: "instagram", snippet: "Really appreciate the offer but my schedule is booked for the next 6 weeks.", timestamp: "3h ago",
    unread: false, status: "declined",
    messages: [
      { id: "m1", from: "brand", body: "Hi Mara! Would you be open to a paid partnership for our summer campaign? We're thinking 1 Reel + 2 Stories, $1,800 total.", timestamp: "Jun 16, 11:00am" },
      { id: "m2", from: "creator", body: "Really appreciate the offer but my schedule is booked for the next 6 weeks. Maybe next season!", timestamp: "3h ago" },
    ],
  },
  {
    id: "t4", creatorName: "Tomohiro V", creatorHandle: "@tomohiro_v", creatorInitials: "TV", creatorTone: "turquoise",
    platform: "youtube", snippet: "We just sent the campaign brief and contract for your review.", timestamp: "Yesterday",
    unread: false, status: "new", campaign: "Nova Sport",
    messages: [
      { id: "m1", from: "brand", body: "We just sent the campaign brief and contract for your review. Please sign by Friday!", timestamp: "Yesterday" },
    ],
  },
  {
    id: "t5", creatorName: "Lena Fischer", creatorHandle: "@lena.vis", creatorInitials: "LF", creatorTone: "pink",
    platform: "instagram", snippet: "Can't wait to shoot! The product arrived today 📦", timestamp: "2 days ago",
    unread: false, status: "creator_replied", campaign: "Coastal Basics",
    messages: [
      { id: "m1", from: "brand", body: "Hi Lena! Your shipment should arrive by Wednesday. We've sent the brief — let us know if you have questions.", timestamp: "Jun 14" },
      { id: "m2", from: "creator", body: "Can't wait to shoot! The product arrived today 📦", timestamp: "2 days ago" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Sub-components                                                        */
/* ------------------------------------------------------------------ */


function StatusPill({ status }: { status: MsgStatus }) {
  const m = STATUS_META[status];
  return <Badge label={m.label} tone={m.tone} size="sm" />;
}

/* ------------------------------------------------------------------ */
/* Thread list                                                           */
/* ------------------------------------------------------------------ */

function ThreadRow({ thread, active, onClick }: { thread: InboxThread; active: boolean; onClick: () => void }) {
  const PlatIcon = PLATFORM_ICONS[thread.platform];
  return (
    <Button variant="ghost" onClick={onClick}
      style={{
        width: "100%", height: "auto", borderRadius: 0,
        padding: "10px 14px", display: "flex",
        justifyContent: "flex-start", alignItems: "flex-start", gap: 10,
        borderBottom: "1px solid var(--sd-border-light)",
        background: active ? "var(--sd-bg-tertiary)" : thread.unread ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)",
        color: "inherit", textAlign: "left",
      }}>

      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar initials={thread.creatorInitials} tone={thread.creatorTone} size="lg" />
        <span style={{ position: "absolute", bottom: -1, right: -3, width: 14, height: 14, borderRadius: "50%",
          background: "var(--sd-bg-primary)", display: "flex", alignItems: "center", justifyContent: "center",
          border: "1.5px solid var(--sd-bg-primary)" }}>
          <PlatIcon size={10} style={{ color: "var(--sd-font-tertiary)" }} />
        </span>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: thread.unread ? 700 : 500, color: "var(--sd-font-primary)" }}>{thread.creatorName}</span>
            {thread.unread && (
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: TONES.blue.solid, flexShrink: 0 }} />
            )}
          </div>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", flexShrink: 0 }}>{thread.timestamp}</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginBottom: 5, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {thread.snippet}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
          <StatusPill status={thread.status} />
          {thread.campaign && (
            <Badge label={thread.campaign} tone="purple" size="sm" />
          )}
        </div>
      </div>
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Message bubble                                                        */
/* ------------------------------------------------------------------ */

function MessageBubble({ msg }: { msg: InboxMessage }) {
  const isMe = msg.from === "brand";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: isMe ? "flex-end" : "flex-start", marginBottom: 12 }}>
      <div style={{
        maxWidth: "72%", padding: "9px 12px", borderRadius: isMe ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
        background: isMe ? "var(--sd-bg-inverted)" : "var(--sd-bg-secondary)",
        color: isMe ? "#fff" : "var(--sd-font-primary)", fontSize: 13, lineHeight: 1.55,
      }}>
        {msg.body}
      </div>
      <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", marginTop: 3 }}>{msg.timestamp}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Thread detail                                                         */
/* ------------------------------------------------------------------ */

function ThreadDetail({ thread }: { thread: InboxThread }) {
  const [reply, setReply] = useState("");
  const PlatIcon = PLATFORM_ICONS[thread.platform];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)", flexShrink: 0 }}>
        <Avatar initials={thread.creatorInitials} tone={thread.creatorTone} size="md" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)", display: "flex", alignItems: "center", gap: 6 }}>
            {thread.creatorName}
            <PlatIcon size={13} style={{ color: "var(--sd-font-tertiary)" }} />
            <span style={{ fontSize: 11, fontWeight: 400, color: "var(--sd-font-tertiary)" }}>{thread.creatorHandle}</span>
          </div>
          {thread.campaign && (
            <Badge label={thread.campaign} tone="purple" size="sm" />
          )}
        </div>
        <StatusPill status={thread.status} />
        <Button variant="ghost" iconOnly aria-label="More" size="sm">
          <IconDots size={14} />
        </Button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {thread.messages.map(m => <MessageBubble key={m.id} msg={m} />)}
      </div>

      {/* Reply bar */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid var(--sd-border-light)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: "8px 10px",
          border: "1px solid var(--sd-border-medium)", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)" }}>
          <div style={{ flex: 1 }}>
            <Textarea value={reply} onChange={(val) => setReply(val)} placeholder="Type a message…" rows={2} resize="none" />
          </div>
          <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
            <Button variant="ghost" iconOnly aria-label="Attach" size="sm">
              <IconPaperclip size={14} />
            </Button>
            <Button variant="primary" size="sm" leftIcon={<IconSend size={12} />} onClick={() => setReply("")} disabled={!reply}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* InboxView                                                             */
/* ------------------------------------------------------------------ */

function InboxViewDemo() {
  const [tab, setTab] = useState<InboxTab>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>("t1");

  const unreadCount = THREADS.filter(t => t.unread).length;

  const filtered = THREADS.filter(t => {
    if (tab === "unread" && !t.unread) return false;
    if (query && !t.creatorName.toLowerCase().includes(query.toLowerCase()) && !t.snippet.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const selected = THREADS.find(t => t.id === selectedId) ?? THREADS[0];

  const TABS: { id: InboxTab; label: string; count?: number }[] = [
    { id: "all",    label: "All" },
    { id: "unread", label: "Unread", count: unreadCount },
  ];

  return (
    <div style={{ display: "flex", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", height: 520 }}>
      {/* ── Left: thread list ── */}
      <div style={{ width: 280, flexShrink: 0, borderRight: "1px solid var(--sd-border-light)", display: "flex", flexDirection: "column" }}>
        {/* Inbox header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)", flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>Inbox</span>
          <Button variant="ghost" iconOnly aria-label="Compose" size="sm">
            <IconPencil size={14} />
          </Button>
        </div>

        {/* Search */}
        <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--sd-border-light)", flexShrink: 0 }}>
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search messages…" leftIcon={<IconSearch size={13} />} />
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid var(--sd-border-light)", padding: "0 10px", flexShrink: 0 }}>
          <Tabs
            tabs={TABS.map(t => ({ label: t.label, value: t.id, badge: t.count }))}
            value={tab}
            onChange={(v) => setTab(v as InboxTab)}
            variant="underline"
          />
        </div>

        {/* Thread rows */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", fontSize: 12, color: "var(--sd-font-tertiary)" }}>No messages</div>
          ) : (
            filtered.map(t => <ThreadRow key={t.id} thread={t} active={t.id === selectedId} onClick={() => setSelectedId(t.id)} />)
          )}
        </div>
      </div>

      {/* ── Right: thread detail ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--sd-bg-primary)" }}>
        {selected ? <ThreadDetail thread={selected} /> : (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sd-font-tertiary)", fontSize: 13 }}>
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "inbox-view",
  title: "InboxView",
  group: "Messaging",
  status: "stable",
  summary: "Split-pane messaging inbox — thread list with status badges + selected conversation with reply bar.",
  description:
    "InboxView is the full messaging interface: a 280px left panel (thread list) + expandable right panel (selected conversation). Thread list has a search bar, All / Unread tab filter with unread count badge, and rows showing creator avatar with platform icon overlay, creator name + unread dot, message snippet, relative timestamp, status pill (New / Creator replied / Rate card / Declined), and optional campaign tag. The right panel shows chronological message bubbles (brand messages right-aligned in dark bg; creator messages left-aligned in secondary bg) and a reply bar with attachment and send buttons. Click any thread row to switch conversations.",
  demos: [
    {
      title: "Full inbox",
      description: "Click thread rows to switch conversations. Filter by Unread. Search filters by name or snippet. Type in the reply bar and click Send to clear it.",
      block: true,
      render: () => <InboxViewDemo />,
    },
  ],
  props: [],
};

export default doc;
