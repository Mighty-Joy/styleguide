"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconBell,
  IconMail,
  IconCurrencyDollar,
  IconPhoto,
  IconAlertCircle,
  IconUserPlus,
  IconStar,
  IconPackage,
  IconEdit,
  IconChevronRight,
  IconFilter,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type NotiType = "invite" | "approval" | "revision" | "payment" | "message" | "shipment" | "review";

interface Notification {
  id: string;
  type: NotiType;
  title: string;
  body: string;
  brand: string;
  brandInitials: string;
  brandTone: string;
  time: string;
  read: boolean;
  urgent: boolean;
  action?: string;
}

const TYPE_META: Record<NotiType, { icon: React.ElementType; tone: keyof typeof TONES; label: string }> = {
  invite:   { icon: IconUserPlus,       tone: "blue",     label: "Invite"   },
  approval: { icon: IconCheck,          tone: "green",    label: "Approved" },
  revision: { icon: IconEdit,           tone: "yellow",   label: "Revision" },
  payment:  { icon: IconCurrencyDollar, tone: "orange",   label: "Payment"  },
  message:  { icon: IconMail,           tone: "purple",   label: "Message"  },
  shipment: { icon: IconPackage,        tone: "sky",      label: "Shipment" },
  review:   { icon: IconStar,           tone: "pink",     label: "Review"   },
};

const NOTIS_INIT: Notification[] = [
  {
    id: "n1", type: "invite", title: "New campaign invitation",
    body: "Aura Labs invited you to Summer Glow Vol.2. Budget: $2,800 · 3 posts · Go-live Aug 1.",
    brand: "Aura Labs", brandInitials: "AL", brandTone: "yellow",
    time: "2m ago", read: false, urgent: false, action: "Review invite",
  },
  {
    id: "n2", type: "payment", title: "Payment received — $2,400",
    body: "Milestone 2 of 3 for Summer Glow has been paid. Funds will arrive in 1–3 business days.",
    brand: "Aura Labs", brandInitials: "AL", brandTone: "yellow",
    time: "1h ago", read: false, urgent: false, action: "View payment",
  },
  {
    id: "n3", type: "approval", title: "Your Reel was approved",
    body: "Aura Labs approved your Jun 25 reel. It's now cleared to publish — post between 7–9 PM for best reach.",
    brand: "Aura Labs", brandInitials: "AL", brandTone: "yellow",
    time: "3h ago", read: false, urgent: false, action: "Post now",
  },
  {
    id: "n4", type: "revision", title: "Revision requested on feed post",
    body: "Aura Labs left 1 note: \"Please remove the competitor product in the background of the mirror shot.\"",
    brand: "Aura Labs", brandInitials: "AL", brandTone: "yellow",
    time: "5h ago", read: false, urgent: true, action: "View feedback",
  },
  {
    id: "n5", type: "shipment", title: "Product kit shipped",
    body: "Your Summer Glow product kit is on the way. Estimated arrival: Jun 28. Tracking: 1Z999AA1012345678.",
    brand: "Aura Labs", brandInitials: "AL", brandTone: "yellow",
    time: "Yesterday", read: true, urgent: false, action: "Track package",
  },
  {
    id: "n6", type: "message", title: "New message from FitLife Q2",
    body: "\"Hey! Just checking in on your TikTok draft — we're excited to see it. ETA still this week?\"",
    brand: "FitLife", brandInitials: "FL", brandTone: "green",
    time: "Yesterday", read: true, urgent: false, action: "Reply",
  },
  {
    id: "n7", type: "review", title: "Brand left you a 5-star review",
    body: "Aura Labs rated your collaboration: ★★★★★ — \"Priya went above and beyond on every deliverable.\"",
    brand: "Aura Labs", brandInitials: "AL", brandTone: "yellow",
    time: "2 days ago", read: true, urgent: false,
  },
];

/* ---- Demo ---- */
function Demo() {
  const [notis,  setNotis]  = useState<Notification[]>(NOTIS_INIT);
  const [filter, setFilter] = useState<NotiType | null>(null);

  function markRead(id: string) {
    setNotis((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  }
  function dismiss(id: string) {
    setNotis((prev) => prev.filter((n) => n.id !== id));
  }
  function markAllRead() {
    setNotis((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unread  = notis.filter((n) => !n.read).length;
  const visible = notis.filter((n) => filter === null || n.type === filter);

  const typeCounts = (Object.keys(TYPE_META) as NotiType[]).map((t) => ({
    type: t, count: notis.filter((n) => n.type === t).length,
  })).filter((x) => x.count > 0);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: unread > 0 ? TONES.blue.tint : "var(--sd-bg-secondary, #f1f1f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconBell size={15} style={{ color: unread > 0 ? TONES.blue.text : "var(--sd-font-tertiary, #999)" }} />
            </div>
            {unread > 0 && (
              <div style={{ position: "absolute", top: -3, right: -3, width: 16, height: 16, borderRadius: "50%", background: TONES.red.text, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 900, color: "#fff", border: "2px solid #fff" }}>
                {unread}
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Notifications</div>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{unread > 0 ? `${unread} unread` : "All caught up"}</div>
          </div>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: TONES.blue.text }}>
            Mark all read
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
        <button onClick={() => setFilter(null)}
          style={{ padding: "3px 10px", borderRadius: 99, background: filter === null ? "#111" : "var(--sd-bg-secondary, #f1f1f1)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: filter === null ? "#fff" : "var(--sd-font-secondary, #555)" }}>
          All
        </button>
        {typeCounts.map(({ type, count }) => {
          const { label, tone } = TYPE_META[type];
          const active = filter === type;
          return (
            <button key={type} onClick={() => setFilter(active ? null : type)}
              style={{ padding: "3px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? TONES[tone].text : "var(--sd-font-secondary, #555)" }}>
              {label} {count > 1 ? `· ${count}` : ""}
            </button>
          );
        })}
      </div>

      {/* Notification list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {visible.map((noti) => {
          const { icon: Icon, tone } = TYPE_META[noti.type];
          return (
            <div key={noti.id} onClick={() => markRead(noti.id)}
              style={{ display: "flex", gap: 10, padding: "11px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10, background: !noti.read ? `${TONES[tone].tint}60` : "transparent", cursor: "pointer", position: "relative", borderLeft: !noti.read ? `3px solid ${TONES[tone].text}` : "1px solid var(--sd-border-default, #e5e7eb)" }}>

              {/* Brand avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Avatar initials={noti.brandInitials} tone={noti.brandTone as any} size="sm" />
                <div style={{ position: "absolute", bottom: -2, right: -2, width: 16, height: 16, borderRadius: "50%", background: TONES[tone].tint, border: "1.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={8} style={{ color: TONES[tone].text }} />
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: noti.read ? 600 : 800 }}>{noti.title}</span>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", flexShrink: 0, marginLeft: 8 }}>{noti.time}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.5, marginBottom: noti.action ? 7 : 0 }}>{noti.body}</div>
                {noti.action && (
                  <button style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, color: TONES[tone].text, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                    {noti.action} <IconChevronRight size={10} />
                  </button>
                )}
              </div>

              <button onClick={(e) => { e.stopPropagation(); dismiss(noti.id); }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", padding: 2, flexShrink: 0, alignSelf: "flex-start" }}>
                <IconX size={12} />
              </button>
            </div>
          );
        })}
        {visible.length === 0 && (
          <div style={{ textAlign: "center", padding: "32px 0", color: "var(--sd-font-tertiary, #999)", fontSize: 12 }}>
            <IconCheck size={24} style={{ opacity: 0.3, display: "block", margin: "0 auto 8px" }} />
            No notifications here
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-notification-center",
  title: "CreatorNotificationCenter",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator-side notification feed — invites, payment confirmations, content approvals, revision requests, shipment updates, messages, and brand reviews with type filter chips.",
  description:
    "The creator's notification inbox for their brand collaboration activity. Header: bell icon with red unread badge, unread count, Mark all read shortcut. Type filter chips: All + per-type filters (invite, approval, revision, payment, message, shipment, review) — active chip gets tone-matched background. 7 notification items: brand avatar with a type icon badge overlaid (blue invite / green approval / yellow revision / orange payment / purple message / sky shipment / pink review); unread items have a colored left border and tinted background, bold title, action link. Click an item to mark it read. Dismiss with × button. Urgent revision item shown with yellow treatment. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator notification center",
      description: "Filter by type using the chips. Click any notification to mark it read. Dismiss with ×. Click 'Mark all read' to clear all unread states.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
