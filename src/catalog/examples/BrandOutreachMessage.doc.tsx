"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconSend,
  IconCheck,
  IconChevronDown,
  IconSparkles,
  IconTemplate,
  IconEdit,
  IconBrandInstagram,
  IconBrandTiktok,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

interface Template {
  id: string;
  label: string;
  subject: string;
  body: string;
}

const TEMPLATES: Template[] = [
  {
    id: "t1",
    label: "Campaign invite",
    subject: "Collaboration invite — Summer Glow Campaign",
    body: `Hi {{creatorName}},

We've been following your content and think you'd be a perfect fit for our upcoming {{campaignName}} with Aura Labs.

We're looking for {{deliverables}} between {{startDate}} and {{endDate}}.

We'd love to offer you {{feeRange}} for the collaboration. The campaign is focused on our new Luminos Serum — a product we think your audience will genuinely love.

Would you be open to chatting more about this? Reply here or book a time directly.

Warm regards,
The Aura Labs team`,
  },
  {
    id: "t2",
    label: "Product gift + UGC",
    subject: "Gift partnership — Luminos Serum",
    body: `Hey {{creatorName}},

We'd love to send you our new Luminos Serum as a gift — no strings attached. If you enjoy it and feel it fits your content, any authentic UGC you share would mean the world to us.

We're huge fans of your work in {{niche}}.

Let us know if you're interested and we'll ship it out right away!

— Aura Labs`,
  },
  {
    id: "t3",
    label: "Ambassador program",
    subject: "Aura Labs Ambassador Invite — Long-term partnership",
    body: `Hi {{creatorName}},

We're building a small team of trusted brand ambassadors for Aura Labs — and after following your content in {{niche}}, you're exactly who we have in mind.

As an ambassador, you'd receive {{feeRange}} per quarter plus a dedicated discount code, product allowance, and early access to every new launch.

If this sounds interesting, we'd love to set up a call to walk you through the details.

Excited to potentially work together!
— Aura Labs`,
  },
];

const MERGE_FIELDS: Record<string, string> = {
  "{{creatorName}}":  "Priya",
  "{{campaignName}}": "Summer Glow Campaign",
  "{{deliverables}}": "2 Reels + 5 Stories",
  "{{startDate}}":    "July 5",
  "{{endDate}}":      "July 25",
  "{{feeRange}}":     "$1,400–$2,000",
  "{{niche}}":        "clean beauty",
};

function fillMerge(text: string): string {
  return Object.entries(MERGE_FIELDS).reduce((t, [key, val]) => t.replaceAll(key, val), text);
}

function Demo() {
  const [templateId, setTemplateId] = useState("t1");
  const [dropOpen,   setDropOpen]   = useState(false);
  const [preview,    setPreview]    = useState(false);
  const [body,       setBody]       = useState(TEMPLATES[0].body);
  const [subject,    setSubject]    = useState(TEMPLATES[0].subject);
  const [sent,       setSent]       = useState(false);
  const [sending,    setSending]    = useState(false);

  const template = TEMPLATES.find((t) => t.id === templateId)!;
  const charCount = body.length;
  const MAX_CHARS = 1200;

  function selectTemplate(t: Template) {
    setTemplateId(t.id);
    setBody(t.body);
    setSubject(t.subject);
    setDropOpen(false);
    setSent(false);
  }

  function send() {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 800);
  }

  if (sent) {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
        <div style={{ padding: "20px 16px", background: TONES.green.tint, borderRadius: 14, border: `1.5px solid ${TONES.green.text}30`, textAlign: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 99, background: TONES.green.text, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <IconCheck size={22} style={{ color: "#fff" }} />
          </div>
          <div style={{ fontSize: 14, fontWeight: 900, color: TONES.green.text, marginBottom: 4 }}>Invite sent to Priya!</div>
          <div style={{ fontSize: 11, color: TONES.green.text, opacity: 0.8, marginBottom: 14 }}>She'll receive your message and can accept, decline, or counter the offer.</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" size="sm" onClick={() => setSent(false)} style={{ flex: 1 }}>
              Send another
            </Button>
            <Button variant="primary" size="sm" style={{ flex: 1 }}>
              View pending invites
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <Avatar initials="PN" tone="pink" size="sm" />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 1 }}>
            <span style={{ fontSize: 12, fontWeight: 800 }}>Priya Nair</span>
            <Badge label="Micro" tone="blue" size="sm" />
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <span style={{ display: "flex", gap: 3, alignItems: "center", fontSize: 10, color: TONES.pink.text }}>
              <IconBrandInstagram size={10} />71K
            </span>
            <span style={{ display: "flex", gap: 3, alignItems: "center", fontSize: 10, color: TONES.blue.text }}>
              <IconBrandTiktok size={10} />43K
            </span>
            <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>9.2% ER · Clean beauty</span>
          </div>
        </div>
        <Badge label="Summer Glow" tone="orange" size="sm" />
      </div>

      {/* Template selector */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Message template</div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setDropOpen(!dropOpen)}
            style={{ width: "100%", display: "flex", gap: 8, alignItems: "center", padding: "8px 11px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, background: "white", cursor: "pointer", fontSize: 11, fontFamily: "inherit", textAlign: "left" }}>
            <IconTemplate size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
            <span style={{ flex: 1, fontWeight: 600 }}>{template.label}</span>
            <IconChevronDown size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
          </button>
          {dropOpen && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, background: "white", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 14px rgba(0,0,0,0.08)", zIndex: 10 }}>
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => selectTemplate(t)}
                  style={{ width: "100%", padding: "9px 12px", border: "none", borderBottom: "1px solid var(--sd-border-default,#f1f1f1)", background: t.id === templateId ? TONES.blue.tint : "white", cursor: "pointer", textAlign: "left", display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: t.id === templateId ? TONES.blue.text : "#111" }}>{t.label}</span>
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{t.subject}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Preview / Edit toggle */}
      <div style={{ display: "flex", gap: 0, marginBottom: 10, background: "var(--sd-bg-secondary,#f4f4f5)", borderRadius: 8, padding: 3 }}>
        {[{ key: false, label: "Edit", icon: IconEdit }, { key: true, label: "Preview", icon: IconSparkles }].map(({ key, label, icon: Icon }) => (
          <button key={String(key)} onClick={() => setPreview(key)}
            style={{ flex: 1, padding: "6px 0", borderRadius: 6, background: preview === key ? "white" : "transparent", border: "none", cursor: "pointer", fontSize: 11, fontWeight: preview === key ? 700 : 500, color: preview === key ? "#111" : "var(--sd-font-tertiary,#999)", display: "flex", gap: 5, alignItems: "center", justifyContent: "center", boxShadow: preview === key ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}>
            <Icon size={11} />{label}
          </button>
        ))}
      </div>

      {/* Subject */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Subject</div>
        {preview
          ? <div style={{ fontSize: 11, fontWeight: 600, padding: "8px 10px", background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 8 }}>{fillMerge(subject)}</div>
          : <input value={subject} onChange={(e) => setSubject(e.target.value)}
              style={{ width: "100%", padding: "8px 10px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, fontSize: 11, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />}
      </div>

      {/* Body */}
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 4 }}>Message</div>
        {preview ? (
          <div style={{ padding: "11px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, background: "var(--sd-bg-secondary,#f9f9f9)", fontSize: 11, lineHeight: 1.7, whiteSpace: "pre-wrap", color: "var(--sd-font-secondary,#555)" }}>
            {fillMerge(body)}
          </div>
        ) : (
          <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={9}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, fontSize: 11, fontFamily: "inherit", resize: "vertical", outline: "none", lineHeight: 1.7, boxSizing: "border-box" }} />
        )}
        {!preview && (
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>Use {"{{"+"field"+"}}"} for merge fields</div>
            <div style={{ fontSize: 9, color: charCount > MAX_CHARS ? TONES.red.text : "var(--sd-font-tertiary,#999)" }}>{charCount}/{MAX_CHARS}</div>
          </div>
        )}
      </div>

      {/* Merge field tags */}
      {!preview && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Auto-filled fields</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {Object.entries(MERGE_FIELDS).map(([key, val]) => (
              <div key={key} style={{ display: "flex", gap: 0, borderRadius: 6, overflow: "hidden", border: "1px solid var(--sd-border-default,#e5e7eb)" }}>
                <span style={{ padding: "2px 6px", background: "var(--sd-bg-secondary,#f4f4f5)", fontSize: 9, fontWeight: 700, fontFamily: "monospace", color: TONES.purple.text }}>{key}</span>
                <span style={{ padding: "2px 6px", fontSize: 9, color: "var(--sd-font-secondary,#555)" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button variant="primary" size="sm" leftIcon={sending ? undefined : <IconSend size={11} />}
        onClick={send} disabled={sending || charCount === 0 || charCount > MAX_CHARS} style={{ width: "100%" }}>
        {sending ? "Sending…" : "Send invite to Priya"}
      </Button>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-outreach-message",
  title: "BrandOutreachMessage",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand composes and sends a creator campaign invite — 3 preset templates, subject + body editor, Edit/Preview toggle with merge-field auto-fill, merge-field tag strip, and Send CTA with green confirmation screen.",
  description:
    "Brand crafts a personalized outreach message to invite a creator to a campaign. Header: Avatar sm, name, tier badge, platform follower counts, ER + niche, campaign badge. Template dropdown: 3 options (Campaign invite / Product gift + UGC / Ambassador program) — selecting one pre-fills subject + body. Edit/Preview toggle: Edit mode shows subject input + body textarea with char count (warn at 1200); Preview mode renders filled-in message with merge fields replaced by real values. Merge-field tag strip below body shows each {{field}} → value pair as a 2-part chip. Send button (disabled while sending or body empty) → 800ms 'Sending…' → green success screen with check circle, 'Invite sent to Priya!', description, 'Send another' + 'View pending invites' CTAs. Pre-seeded: Campaign invite template, Priya Nair / Summer Glow / $1,400–$2,000 / 2 Reels + 5 Stories / July 5–25. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator outreach composer",
      description: "Switch templates from the dropdown — body updates automatically. Toggle Preview to see merge fields filled in. Click 'Send invite' to see the confirmation screen.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
