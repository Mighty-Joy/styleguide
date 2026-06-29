"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconSend,
  IconUsers,
  IconEye,
  IconEyeOff,
  IconCode,
  IconAlertTriangle,
  IconMessageCircle,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- data ---- */
const ALL_CREATORS = [
  { id: "c1", name: "Priya Nair",    initials: "PN", tone: "pink"   as const, status: "active"  },
  { id: "c2", name: "Marcus Webb",   initials: "MW", tone: "orange" as const, status: "active"  },
  { id: "c3", name: "Ji-ho Kim",     initials: "JK", tone: "blue"   as const, status: "active"  },
  { id: "c4", name: "Amara Diallo",  initials: "AD", tone: "green"  as const, status: "active"  },
  { id: "c5", name: "Sofia Reyes",   initials: "SR", tone: "purple" as const, status: "pending" },
];

const TOKENS = ["{first_name}", "{campaign_name}", "{due_date}", "{fee}"];
const TOKEN_PREVIEW: Record<string, string> = {
  "{first_name}":    "Priya",
  "{campaign_name}": "Summer Glow Campaign",
  "{due_date}":      "July 5",
  "{fee}":           "$1,700",
};

const DEFAULT_MSG = "Hi {first_name}, just a quick reminder that your first deliverable for {campaign_name} is due {due_date}. Please submit through the platform so we can review it. Reach out if you have any questions — we're excited to see your content! 🌟";

/* ---- Demo ---- */
function Demo() {
  const [selected,  setSelected]  = useState<Set<string>>(new Set(ALL_CREATORS.filter((c) => c.status === "active").map((c) => c.id)));
  const [body,      setBody]      = useState(DEFAULT_MSG);
  const [preview,   setPreview]   = useState(false);
  const [sending,   setSending]   = useState(false);
  const [sent,      setSent]      = useState(false);
  const [showTokens, setShowTokens] = useState(false);

  function toggleCreator(id: string) {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function insertToken(token: string) {
    setBody((prev) => prev + token);
  }

  function send() {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1200);
  }

  const previewBody = body.replace(/\{first_name\}/g, TOKEN_PREVIEW["{first_name}"])
    .replace(/\{campaign_name\}/g, TOKEN_PREVIEW["{campaign_name}"])
    .replace(/\{due_date\}/g, TOKEN_PREVIEW["{due_date}"])
    .replace(/\{fee\}/g, TOKEN_PREVIEW["{fee}"]);

  const canSend = selected.size > 0 && body.trim().length >= 10;
  const charMax = 500;

  if (sent) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", textAlign: "center", padding: "28px 0" }}>
        <div style={{ width: 52, height: 52, borderRadius: 99, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
          <IconCheck size={24} style={{ color: TONES.green.text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 4 }}>Message sent!</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", marginBottom: 12 }}>
          Delivered to {selected.size} creator{selected.size !== 1 ? "s" : ""}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {ALL_CREATORS.filter((c) => selected.has(c.id)).map((c) => (
            <div key={c.id} style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 9px", background: TONES[c.tone].tint, borderRadius: 99 }}>
              <Avatar initials={c.initials} tone={c.tone} size="sm" />
              <span style={{ fontSize: 11, fontWeight: 700, color: TONES[c.tone].text }}>{c.name.split(" ")[0]}</span>
              <IconCheck size={10} style={{ color: TONES[c.tone].text }} />
            </div>
          ))}
        </div>
        <Button variant="secondary" size="sm" onClick={() => { setSent(false); setSelected(new Set(ALL_CREATORS.filter((c) => c.status === "active").map((c) => c.id))); setBody(DEFAULT_MSG); }}>
          Reset demo
        </Button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Message all creators</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Summer Glow Campaign</div>
        </div>
        <Badge label={`${selected.size} recipients`} tone="blue" size="sm" dot />
      </div>

      {/* Recipient chips */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 7 }}>
          <IconUsers size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />
          <span style={{ fontSize: 11, fontWeight: 700 }}>Recipients</span>
          <button onClick={() => setSelected(new Set(ALL_CREATORS.map((c) => c.id)))}
            style={{ fontSize: 10, color: TONES.blue.text, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginLeft: "auto" }}>
            Select all
          </button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {ALL_CREATORS.map((c) => {
            const active = selected.has(c.id);
            return (
              <button key={c.id} onClick={() => toggleCreator(c.id)}
                style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 10px", borderRadius: 99, border: `1.5px solid ${active ? TONES[c.tone].text : "var(--sd-border-default,#e5e7eb)"}`, background: active ? TONES[c.tone].tint : "transparent", cursor: "pointer" }}>
                <Avatar initials={c.initials} tone={c.tone} size="sm" />
                <span style={{ fontSize: 11, fontWeight: 700, color: active ? TONES[c.tone].text : "var(--sd-font-secondary,#555)" }}>{c.name.split(" ")[0]}</span>
                {c.status === "pending" && <Badge label="Pending" tone="yellow" size="sm" />}
                {active ? <IconX size={10} style={{ color: TONES[c.tone].text }} /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Compose area */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 700 }}>Message</span>
          <button onClick={() => setShowTokens(!showTokens)}
            style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 10, color: TONES.blue.text, background: "none", border: "none", cursor: "pointer" }}>
            <IconCode size={11} />
            Personalization tokens
            <IconChevronDown size={10} style={{ transform: showTokens ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
        </div>

        {showTokens && (
          <div style={{ display: "flex", gap: 5, marginBottom: 7, flexWrap: "wrap" }}>
            {TOKENS.map((token) => (
              <button key={token} onClick={() => insertToken(token)}
                style={{ padding: "3px 8px", borderRadius: 5, background: TONES.blue.tint, border: `1px solid ${TONES.blue.text}40`, fontSize: 10, fontFamily: "monospace", fontWeight: 700, color: TONES.blue.text, cursor: "pointer" }}>
                {token}
              </button>
            ))}
          </div>
        )}

        <textarea value={body} onChange={(e) => setBody(e.target.value.slice(0, charMax))}
          style={{ width: "100%", minHeight: 110, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, padding: "10px 12px", fontSize: 12, fontFamily: "inherit", resize: "none", boxSizing: "border-box", lineHeight: 1.6 }}
          placeholder="Write your message…" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
            Tokens like {"{first_name}"} are replaced per recipient
          </div>
          <div style={{ fontSize: 10, color: body.length >= charMax * 0.9 ? TONES.red.text : "var(--sd-font-tertiary,#999)" }}>
            {body.length}/{charMax}
          </div>
        </div>
      </div>

      {/* Preview toggle */}
      <button onClick={() => setPreview(!preview)}
        style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 11, fontWeight: 700, color: TONES.blue.text, background: "none", border: "none", cursor: "pointer", marginBottom: preview ? 10 : 14 }}>
        {preview ? <IconEyeOff size={13} /> : <IconEye size={13} />}
        {preview ? "Hide preview" : "Preview for Priya Nair"}
      </button>

      {preview && (
        <div style={{ marginBottom: 14, padding: "12px 14px", background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 10, borderLeft: `3px solid ${TONES.blue.text}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: TONES.blue.text, marginBottom: 6 }}>Preview — as Priya Nair will see it</div>
          <div style={{ fontSize: 12, lineHeight: 1.65 }}>{previewBody || <em style={{ color: "var(--sd-font-tertiary,#999)" }}>Message empty</em>}</div>
        </div>
      )}

      {/* Warning if pending creator included */}
      {selected.has("c5") && (
        <div style={{ display: "flex", gap: 7, padding: "8px 11px", background: TONES.yellow.tint, borderRadius: 9, marginBottom: 10, alignItems: "center" }}>
          <IconAlertTriangle size={12} style={{ color: TONES.yellow.text, flexShrink: 0 }} />
          <div style={{ fontSize: 11, color: TONES.yellow.text }}>Sofia Reyes is still pending approval — she'll receive this message but may not be confirmed on the campaign yet.</div>
        </div>
      )}

      {/* Send */}
      <Button variant="primary" size="sm" onClick={send} disabled={!canSend || sending}
        leftIcon={sending ? undefined : <IconSend size={11} />} style={{ width: "100%" }}>
        {sending ? `Sending to ${selected.size} creator${selected.size !== 1 ? "s" : ""}…` : canSend ? `Send to ${selected.size} creator${selected.size !== 1 ? "s" : ""}` : "Select recipients and write a message"}
      </Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-message-blast",
  title: "BrandMessageBlast",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand message composer for all campaign creators — recipient chip toggles, personalization token insertion, per-creator preview, pending-creator warning, and animated delivery confirmation.",
  description:
    "Brand sends a single message to some or all creators on a campaign. Header: campaign name, live '5 recipients' badge. Recipient row: 5 creator chips (Avatar sm + first name + pending badge if applicable), tinted border + bg when selected, X icon to deselect; Select all link. Message compose: 'Personalization tokens' disclosure button → monospace chips ({first_name}/{campaign_name}/{due_date}/{fee}) that insert at cursor; 110px textarea with 500-char limit, character count turns red near limit, token-explanation footer. 'Preview for Priya Nair' toggle → blue left-border card showing the message with all tokens replaced (Priya, Summer Glow Campaign, July 5, $1,700). Yellow warning banner when pending creator (Sofia Reyes) is in the recipient list. Send button: disabled until recipients + 10-char message; label is 'Send to N creators'; on click → 'Sending to N creators…' (1.2s) → success screen with green circle, delivery count, per-creator chips with check marks, Reset demo. Default message pre-loaded as a delivery reminder. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Brand message blast",
      description: "Deselect creators by clicking their chip. Click 'Personalization tokens' to insert {first_name} etc. Toggle 'Preview for Priya Nair' to see token substitution. Click Send.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
