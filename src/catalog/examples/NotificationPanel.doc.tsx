"use client";

import React, { useState } from "react";
import {
  IconBell,
  IconBellFilled,
  IconCircleCheck,
  IconClock,
  IconMessageCircle,
  IconBolt,
  IconPhoto,
  IconAlertTriangle,
  IconX,
  IconDots,
  IconCheck,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { Tabs } from "@/components/ui/Tabs/Tabs";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type NotifKind =
  | "deal_created"
  | "content_approved"
  | "content_revision"
  | "message_received"
  | "deadline_soon"
  | "contract_signed";

interface Notification {
  id: string;
  kind: NotifKind;
  actor: string;
  actorInitials: string;
  actorTone: keyof typeof TONES;
  body: string;
  timestamp: string;
  read: boolean;
  campaignName?: string;
}

/* ------------------------------------------------------------------ */
/* Constants                                                             */
/* ------------------------------------------------------------------ */

const KIND_META: Record<NotifKind, { icon: React.ElementType; tone: keyof typeof TONES; label: string }> = {
  deal_created:     { icon: IconBolt,          tone: "blue",   label: "New deal" },
  content_approved: { icon: IconCircleCheck,   tone: "green",  label: "Approved" },
  content_revision: { icon: IconAlertTriangle, tone: "orange", label: "Revision" },
  message_received: { icon: IconMessageCircle, tone: "purple", label: "Message" },
  deadline_soon:    { icon: IconClock,         tone: "yellow", label: "Due soon" },
  contract_signed:  { icon: IconCheck,         tone: "sky",    label: "Contract" },
};

/* ------------------------------------------------------------------ */
/* Seed data                                                             */
/* ------------------------------------------------------------------ */

const SEED: Notification[] = [
  {
    id: "1", kind: "content_revision", actor: "Atlas X Brands", actorInitials: "AX", actorTone: "purple",
    body: "Requested a revision on your Reel draft — please re-shoot the product intro segment.",
    timestamp: "2m ago", read: false, campaignName: "Atlas X Summer",
  },
  {
    id: "2", kind: "message_received", actor: "Priya Nair", actorInitials: "PN", actorTone: "sky",
    body: "Hey, just sent over the Story draft! Let me know if you need any tweaks.",
    timestamp: "18m ago", read: false,
  },
  {
    id: "3", kind: "deadline_soon", actor: "System", actorInitials: "SD", actorTone: "yellow",
    body: "Your TikTok post is due in 48 hours for the Atlas X Summer campaign.",
    timestamp: "1h ago", read: false, campaignName: "Atlas X Summer",
  },
  {
    id: "4", kind: "content_approved", actor: "Glow Labs", actorInitials: "GL", actorTone: "green",
    body: "Your Instagram Reel was approved and is clear to post! 🎉",
    timestamp: "3h ago", read: true, campaignName: "Glow Labs Q3",
  },
  {
    id: "5", kind: "contract_signed", actor: "Mara Kim", actorInitials: "MK", actorTone: "turquoise",
    body: "Mara Kim has signed the partnership agreement for the Coastal Basics collab.",
    timestamp: "Yesterday", read: true,
  },
  {
    id: "6", kind: "deal_created", actor: "Nova Sport", actorInitials: "NS", actorTone: "orange",
    body: "Nova Sport created a new deal proposal for you — $1,800 for 2 Instagram Reels.",
    timestamp: "2 days ago", read: true,
  },
];

/* ------------------------------------------------------------------ */
/* Notification row                                                      */
/* ------------------------------------------------------------------ */

function NotifRow({
  notif,
  onDismiss,
  onMarkRead,
}: {
  notif: Notification;
  onDismiss: (id: string) => void;
  onMarkRead: (id: string) => void;
}) {
  const km = KIND_META[notif.kind];
  const kt = TONES[km.tone];

  return (
    <div
      style={{
        display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px",
        background: notif.read ? "transparent" : TONES.blue.tint,
        borderBottom: "1px solid var(--sd-border-light)",
        transition: "background 0.2s",
      }}
    >
      {/* Avatar + kind icon */}
      <div style={{ position: "relative", flexShrink: 0, marginTop: 2 }}>
        <Avatar initials={notif.actorInitials} tone={notif.actorTone} size="md" />
        <span style={{ position: "absolute", bottom: -2, right: -4, width: 16, height: 16,
          borderRadius: "50%", background: kt.solid, display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid var(--sd-bg-primary)" }}>
          <km.icon size={8} style={{ color: "#fff" }} />
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 12, fontWeight: notif.read ? 500 : 700, color: "var(--sd-font-primary)" }}>
            {notif.actor}
          </span>
          {notif.campaignName && (
            <Badge label={notif.campaignName} tone="purple" size="sm" />
          )}
        </div>
        <p style={{ margin: "0 0 4px", fontSize: 12, color: "var(--sd-font-secondary)", lineHeight: 1.5 }}>
          {notif.body}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Badge label={km.label} tone={km.tone} size="sm" />
          <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{notif.timestamp}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
        {!notif.read && (
          <Button variant="ghost" iconOnly size="sm" aria-label="Mark as read" onClick={() => onMarkRead(notif.id)}>
            <IconCheck size={11} />
          </Button>
        )}
        <Button variant="ghost" iconOnly size="sm" aria-label="Dismiss" onClick={() => onDismiss(notif.id)}>
          <IconX size={11} />
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel                                                                 */
/* ------------------------------------------------------------------ */

function NotificationPanelDemo() {
  const [notifs, setNotifs] = useState<Notification[]>(SEED);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unread = notifs.filter(n => !n.read).length;
  const visible = filter === "unread" ? notifs.filter(n => !n.read) : notifs;

  const dismiss  = (id: string) => setNotifs(prev => prev.filter(n => n.id !== id));
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAll  = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
      {/* Bell trigger */}
      <div style={{ position: "relative", paddingTop: 4 }}>
        <Button variant="secondary" iconOnly aria-label="Notifications">
          {unread > 0 ? <IconBellFilled size={18} style={{ color: TONES.orange.solid }} /> : <IconBell size={18} />}
        </Button>
        {unread > 0 && (
          <span style={{ position: "absolute", top: 0, right: -2, minWidth: 18, height: 18,
            background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700,
            borderRadius: "var(--sd-radius-pill)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
            border: "2px solid var(--sd-bg-primary)" }}>
            {unread}
          </span>
        )}
      </div>

      {/* Panel */}
      <div style={{ width: 360, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)",
        background: "var(--sd-bg-primary)", overflow: "hidden", boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <IconBellFilled size={15} style={{ color: "var(--sd-font-primary)" }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>Notifications</span>
            {unread > 0 && (
              <Badge label={String(unread)} tone="red" variant="count" size="sm" />
            )}
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {unread > 0 && (
              <Button variant="tertiary" size="sm" onClick={markAll}>
                Mark all read
              </Button>
            )}
            <Button variant="ghost" iconOnly size="sm" aria-label="More">
              <IconDots size={14} />
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ padding: "0 14px", borderBottom: "1px solid var(--sd-border-light)" }}>
          <Tabs
            tabs={[{ label: "All", value: "all" }, { label: "Unread", value: "unread", badge: unread || undefined }]}
            value={filter}
            onChange={(v) => setFilter(v as "all" | "unread")}
            variant="underline"
          />
        </div>

        {/* List */}
        <div style={{ maxHeight: 360, overflowY: "auto" }}>
          {visible.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
              All caught up! No {filter === "unread" ? "unread " : ""}notifications.
            </div>
          ) : (
            visible.map(n => <NotifRow key={n.id} notif={n} onDismiss={dismiss} onMarkRead={markRead} />)
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "notification-panel",
  title: "NotificationPanel",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Notification bell + dropdown panel — unread badge, mark-read, dismiss, all-read, and filter by unread.",
  description:
    "NotificationPanel is the bell icon + dropdown used in the app header. The bell shows a red badge with unread count. Each notification row shows: actor avatar with a kind-icon overlay (Approved / Revision / Message / Due soon / Contract / New deal), actor name, optional campaign badge, body text, kind chip + relative timestamp, and per-row mark-read / dismiss actions. The panel header has 'Mark all read' and an All / Unread tab filter. Dismissing removes the item from the list; marking read changes it from blue-tinted to neutral.",
  demos: [
    {
      title: "Notification panel",
      description: "Click ✓ to mark individual items read; × to dismiss. 'Mark all read' clears the unread badge. Switch 'Unread' to filter.",
      block: true,
      render: () => <NotificationPanelDemo />,
    },
  ],
  props: [],
};

export default doc;
