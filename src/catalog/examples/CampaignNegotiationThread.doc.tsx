"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconSend,
  IconCheck,
  IconX,
  IconRefresh,
  IconAlertCircle,
  IconCurrencyDollar,
  IconCalendar,
  IconVideo,
  IconLock,
  IconChevronDown,
  IconChevronUp,
  IconClockHour4,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type MsgRole = "brand" | "creator";
type MsgKind = "offer" | "counter" | "accepted" | "declined" | "note";

interface OfferTerms {
  fee: string;
  deliverables: string;
  timeline: string;
  exclusivity: string;
}

interface Message {
  id: string;
  role: MsgRole;
  kind: MsgKind;
  timestamp: string;
  text?: string;
  terms?: OfferTerms;
}

/* ---- seed thread ---- */
const SEED: Message[] = [
  {
    id: "m1", role: "brand", kind: "offer", timestamp: "Jun 25 · 10:12 AM",
    text: "Hi Priya! We'd love to partner for our summer launch. Here's our initial offer:",
    terms: { fee: "$1,200", deliverables: "1 Instagram Reel (60s) + 3 Stories", timeline: "Live by Jul 15", exclusivity: "30-day skincare exclusivity" },
  },
  {
    id: "m2", role: "creator", kind: "counter", timestamp: "Jun 25 · 2:45 PM",
    text: "Thanks Aura Labs! Love the brand. I'd like to counter — Reels take significant production time and my audience size warrants a higher rate:",
    terms: { fee: "$1,800", deliverables: "1 Instagram Reel (75s) + 2 Stories", timeline: "Live by Jul 18", exclusivity: "15-day skincare exclusivity" },
  },
  {
    id: "m3", role: "brand", kind: "counter", timestamp: "Jun 26 · 9:30 AM",
    text: "We can move on fee and exclusivity. Would you consider 2 Stories instead of 3 at this rate?",
    terms: { fee: "$1,550", deliverables: "1 Instagram Reel (60s) + 2 Stories", timeline: "Live by Jul 18", exclusivity: "20-day skincare exclusivity" },
  },
];

/* ---- term row helper ---- */
function TermRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Icon size={12} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
      <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", width: 74, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

/* ---- Demo ---- */
function Demo() {
  const [messages, setMessages] = useState<Message[]>(SEED);
  const [status,   setStatus]   = useState<"negotiating" | "accepted" | "declined">("negotiating");
  const [note,     setNote]     = useState("");

  const latest = messages[messages.length - 1];
  const canRespond = status === "negotiating";
  const isCreatorTurn = latest.role === "brand";

  function accept() {
    setMessages((prev) => [...prev, { id: `m${prev.length + 1}`, role: "creator", kind: "accepted", timestamp: "Jun 26 · 11:02 AM", text: "These terms work for me. Looking forward to creating great content for Aura Labs!" }]);
    setStatus("accepted");
  }
  function decline() {
    setMessages((prev) => [...prev, { id: `m${prev.length + 1}`, role: "creator", kind: "declined", timestamp: "Jun 26 · 11:02 AM", text: "Unfortunately I can't accept these terms at this time. Thanks for reaching out." }]);
    setStatus("declined");
  }
  function sendNote() {
    if (!note.trim()) return;
    setMessages((prev) => [...prev, { id: `m${prev.length + 1}`, role: "creator", kind: "note", timestamp: "Just now", text: note }]);
    setNote("");
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Negotiation — Summer Glow Campaign</div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Aura Labs × Priya Nair · {messages.length} messages</div>
        </div>
        <Badge
          label={status === "accepted" ? "Accepted" : status === "declined" ? "Declined" : "Negotiating"}
          tone={status === "accepted" ? "green" : status === "declined" ? "red" : "yellow"}
          size="sm"
          dot
        />
      </div>

      {/* Thread */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 14 }}>
        {messages.map((msg) => {
          const isBrand   = msg.role === "brand";
          const isAccepted = msg.kind === "accepted";
          const isDeclined = msg.kind === "declined";

          const bubbleStyle: React.CSSProperties = {
            maxWidth: "84%",
            alignSelf: isBrand ? "flex-start" : "flex-end",
          };

          let bubbleBg = isBrand ? "var(--sd-bg-secondary, #f4f4f5)" : TONES.blue.tint;
          if (isAccepted) bubbleBg = TONES.green.tint;
          if (isDeclined) bubbleBg = TONES.red.tint;

          const isOffer   = msg.kind === "offer" || msg.kind === "counter";
          const roundBase = "12px";
          const borderRadius = isBrand
            ? `2px ${roundBase} ${roundBase} ${roundBase}`
            : `${roundBase} 2px ${roundBase} ${roundBase}`;

          return (
            <div key={msg.id} style={{ display: "flex", flexDirection: "column", alignItems: isBrand ? "flex-start" : "flex-end" }}>
              {/* Label */}
              <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}>
                {isBrand && <Avatar initials="AL" tone="orange" size="sm" />}
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)" }}>
                  {isBrand ? "Aura Labs" : "Priya Nair"} · {msg.timestamp}
                </span>
                {msg.kind === "offer"   && <Badge label="Initial offer" tone="blue"   size="sm" />}
                {msg.kind === "counter" && <Badge label="Counter offer" tone="orange" size="sm" />}
                {isAccepted             && <Badge label="Deal accepted" tone="green"  size="sm" />}
                {isDeclined             && <Badge label="Declined"      tone="red"    size="sm" />}
                {!isBrand && msg.kind !== "offer" && msg.kind !== "counter" && !isAccepted && !isDeclined && <Avatar initials="PN" tone="green" size="sm" />}
              </div>

              {/* Bubble */}
              <div style={{ ...bubbleStyle, background: bubbleBg, borderRadius, padding: "10px 14px" }}>
                {msg.text && (
                  <p style={{ fontSize: 12, lineHeight: 1.55, margin: "0 0 8px 0", color: isAccepted ? TONES.green.text : isDeclined ? TONES.red.text : "#111" }}>
                    {msg.text}
                  </p>
                )}
                {msg.terms && (
                  <div style={{ background: "#fff", borderRadius: 8, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6, border: "1px solid var(--sd-border-default, #e5e7eb)" }}>
                    <TermRow icon={IconCurrencyDollar} label="Creator fee"    value={msg.terms.fee}           />
                    <TermRow icon={IconVideo}          label="Deliverables"   value={msg.terms.deliverables}  />
                    <TermRow icon={IconCalendar}       label="Go-live by"     value={msg.terms.timeline}      />
                    <TermRow icon={IconLock}           label="Exclusivity"    value={msg.terms.exclusivity}   />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA area */}
      {canRespond && isCreatorTurn && (
        <div style={{ borderTop: "1px solid var(--sd-border-default, #e5e7eb)", paddingTop: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8 }}>Respond to latest offer</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <Button variant="primary"   size="sm" leftIcon={<IconCheck size={11} />} onClick={accept}
              style={{ flex: 1, background: TONES.green.text, borderColor: TONES.green.text }}>
              Accept these terms
            </Button>
            <Button variant="secondary" size="sm" leftIcon={<IconX size={11} />} onClick={decline}>Decline</Button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, display: "flex", gap: 8, border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 9, padding: "7px 12px", alignItems: "center" }}>
              <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note before countering…"
                style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit" }}
                onKeyDown={(e) => e.key === "Enter" && sendNote()} />
            </div>
            <Button variant="secondary" size="sm" leftIcon={<IconSend size={11} />} onClick={sendNote} disabled={!note.trim()}>Send</Button>
          </div>
        </div>
      )}

      {status === "accepted" && (
        <div style={{ padding: "10px 14px", background: TONES.green.tint, borderRadius: 10, fontSize: 12, fontWeight: 700, color: TONES.green.text, textAlign: "center" }}>
          Deal accepted — ready to generate contract
        </div>
      )}
      {status === "declined" && (
        <div style={{ padding: "10px 14px", background: TONES.red.tint, borderRadius: 10, fontSize: 12, fontWeight: 700, color: TONES.red.text, textAlign: "center" }}>
          Negotiation closed
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-negotiation-thread",
  title: "CampaignNegotiationThread",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Structured deal negotiation thread — brand initial offer, creator counter, brand counter with terms cards inside chat bubbles. Accept / Decline / Note actions.",
  description:
    "The back-and-forth deal negotiation chat between brand and creator. Header: campaign name, message count, status badge (Negotiating/Accepted/Declined). Thread of messages: brand messages align left (gray bubble, brand avatar + 'Initial offer'/'Counter offer' badge), creator messages align right (blue tint bubble). Each offer/counter embeds a white terms card with 4 rows: fee, deliverables, go-live date, exclusivity — with icon and monospace label. Accepted messages show green bubble; declined show red. CTA zone (when it's the creator's turn + status is negotiating): Accept (green primary, full-width) + Decline, plus a free-text note input with Send button (disabled until text typed). Clicking Accept adds an 'accepted' message bubble and shows a green 'generate contract' banner; Decline adds a red 'declined' bubble and a 'Negotiation closed' banner. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Negotiation thread",
      description: "3-message seed thread (brand initial offer → creator counter → brand counter). Click 'Accept these terms' or 'Decline', or type a note and send.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
