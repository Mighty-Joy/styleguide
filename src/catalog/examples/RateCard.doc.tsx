"use client";

import React, { useState } from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconVideo,
  IconPhoto,
  IconMicrophone,
  IconSpeakerphone,
  IconCurrencyDollar,
  IconPlus,
  IconX,
  IconCheck,
  IconEdit,
  IconSend,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import Textarea from "@/components/ui/Textarea/Textarea";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

interface RateEntry {
  id: string;
  deliverable: string;
  price: number;
  notes?: string;
}

interface RateSection {
  id: string;
  platform: string;
  icon: React.ElementType;
  tone: keyof typeof TONES;
  entries: RateEntry[];
}

/* ------------------------------------------------------------------ */
/* Helpers                                                               */
/* ------------------------------------------------------------------ */

function usd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

/* ------------------------------------------------------------------ */
/* Subcomponents                                                         */
/* ------------------------------------------------------------------ */

function SectionHeader({ icon: Icon, platform, tone }: { icon: React.ElementType; platform: string; tone: keyof typeof TONES }) {
  const t = TONES[tone];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 0 6px", borderBottom: "1px solid var(--sd-border-light)", marginBottom: 8 }}>
      <div style={{ width: 22, height: 22, borderRadius: "var(--sd-radius-sm)", background: t.tint, color: t.text, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={12} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 800, color: "var(--sd-font-secondary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{platform}</span>
    </div>
  );
}

function RateRow({ entry, editable, onRemove, onEdit }: { entry: RateEntry; editable: boolean; onRemove: () => void; onEdit: (price: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(entry.price));

  const commit = () => {
    const n = parseInt(draft.replace(/\D/g, ""), 10);
    if (!isNaN(n) && n > 0) onEdit(n);
    setEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
      <span style={{ flex: 1, fontSize: 12, color: "var(--sd-font-primary)" }}>{entry.deliverable}</span>

      {editing ? (
        <div style={{ display: "flex", alignItems: "center", gap: 4, width: 80 }}>
          <Input value={draft} onChange={e => setDraft(e.target.value)} onBlur={commit} onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && commit()} autoFocus />
        </div>
      ) : (
        <span
          onClick={() => editable && setEditing(true)}
          style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)", cursor: editable ? "text" : "default", borderBottom: editable ? "1px dashed var(--sd-border-medium)" : "none" }}>
          {usd(entry.price)}
        </span>
      )}

      {editable && !editing && (
        <Button variant="tertiary" size="sm" iconOnly onClick={onRemove} aria-label="Remove">
          <IconX size={11} />
        </Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* RateCard view                                                         */
/* ------------------------------------------------------------------ */

const INITIAL_SECTIONS: RateSection[] = [
  {
    id: "instagram", platform: "Instagram", icon: IconBrandInstagram, tone: "pink",
    entries: [
      { id: "ig1", deliverable: "Reel (30–60s)",           price: 1500 },
      { id: "ig2", deliverable: "Feed post (static)",       price: 700  },
      { id: "ig3", deliverable: "Story set (3 slides)",     price: 450  },
    ],
  },
  {
    id: "tiktok", platform: "TikTok", icon: IconBrandTiktok, tone: "gray",
    entries: [
      { id: "tt1", deliverable: "TikTok video (15–60s)",   price: 1200 },
      { id: "tt2", deliverable: "TikTok series (3 parts)",  price: 2800 },
    ],
  },
  {
    id: "ugc", platform: "UGC (No post)", icon: IconVideo, tone: "blue",
    entries: [
      { id: "ugc1", deliverable: "UGC video (raw file)",     price: 400  },
      { id: "ugc2", deliverable: "UGC photo set (5 images)", price: 250  },
    ],
  },
];

function RateCardEditable() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [sent, setSent] = useState(false);
  const [notes, setNotes] = useState("Happy to bundle deliverables — DM me to negotiate!");

  const updatePrice = (sectionId: string, entryId: string, price: number) =>
    setSections(prev => prev.map(s => s.id !== sectionId ? s : {
      ...s, entries: s.entries.map(e => e.id !== entryId ? e : { ...e, price }),
    }));

  const removeEntry = (sectionId: string, entryId: string) =>
    setSections(prev => prev.map(s => s.id !== sectionId ? s : {
      ...s, entries: s.entries.filter(e => e.id !== entryId),
    }));

  const total = sections.reduce((sum, s) => sum + s.entries.reduce((ss, e) => ss + e.price, 0), 0);

  return (
    <div style={{ maxWidth: 400, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--sd-border-light)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--sd-font-primary)" }}>My rate card</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>Priya Nair · @priya_creates</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: "var(--sd-radius-pill)", background: TONES.green.tint, color: TONES.green.text, fontWeight: 600 }}>
          <IconBrandInstagram size={11} /><IconBrandTiktok size={11} />184K followers
        </div>
      </div>

      {/* Sections */}
      <div style={{ padding: "12px 16px" }}>
        {sections.map(section => (
          <div key={section.id} style={{ marginBottom: 14 }}>
            <SectionHeader icon={section.icon} platform={section.platform} tone={section.tone} />
            {section.entries.map(entry => (
              <RateRow key={entry.id} entry={entry} editable
                onEdit={price => updatePrice(section.id, entry.id, price)}
                onRemove={() => removeEntry(section.id, entry.id)}
              />
            ))}
          </div>
        ))}

        {/* Divider + total */}
        <div style={{ borderTop: "1px solid var(--sd-border-light)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>Total package (if all)</span>
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--sd-font-primary)" }}>{usd(total)}</span>
        </div>

        {/* Notes */}
        <div style={{ marginTop: 10 }}>
          <Textarea value={notes} onChange={(val) => setNotes(val)} rows={2} placeholder="Add notes…" />
        </div>

        {/* CTA */}
        <Button
          variant={sent ? "secondary" : "primary"}
          onClick={() => setSent(true)}
          disabled={sent}
          leftIcon={sent ? <IconCheck size={14} /> : <IconSend size={14} />}
          style={{ width: "100%", marginTop: 10 }}
        >
          {sent ? "Rate card sent!" : "Send rate card"}
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Read-only view (brand perspective in inbox)                           */
/* ------------------------------------------------------------------ */

function RateCardReadOnly() {
  const [expanded, setExpanded] = useState(true);
  return (
    <div style={{ maxWidth: 380, border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)", background: "var(--sd-bg-secondary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar initials="PN" tone="sky" size="md" />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>Priya's rate card</div>
            <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)" }}>Sent Jun 18, 2:14pm</div>
          </div>
        </div>
        <Button variant="tertiary" size="sm" onClick={() => setExpanded(v => !v)}>
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      {expanded && (
        <div style={{ padding: "12px 14px" }}>
          {INITIAL_SECTIONS.map(section => (
            <div key={section.id} style={{ marginBottom: 12 }}>
              <SectionHeader icon={section.icon} platform={section.platform} tone={section.tone} />
              {section.entries.map(entry => (
                <div key={entry.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 0" }}>
                  <span style={{ fontSize: 12, color: "var(--sd-font-primary)" }}>{entry.deliverable}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>{usd(entry.price)}</span>
                </div>
              ))}
            </div>
          ))}

          <div style={{ borderTop: "1px solid var(--sd-border-light)", paddingTop: 8, display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Total package</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "var(--sd-font-primary)" }}>
              {usd(INITIAL_SECTIONS.reduce((s, sec) => s + sec.entries.reduce((ss, e) => ss + e.price, 0), 0))}
            </span>
          </div>

          <div style={{ padding: "8px 10px", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", fontSize: 12, color: "var(--sd-font-secondary)", fontStyle: "italic", marginBottom: 10 }}>
            "Happy to bundle deliverables — DM me to negotiate!"
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" size="sm" style={{ flex: 1 }}>Counter offer</Button>
            <Button variant="primary" size="sm" style={{ flex: 1 }}>Accept rates</Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "rate-card",
  title: "RateCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Creator pricing card — editable by creators, read-only with accept/counter for brands in the inbox flow.",
  description:
    "RateCard has two modes. **Editable** (creator-facing): per-platform sections (Instagram, TikTok, UGC) with deliverable rows showing inline-editable prices (click any price to edit), × remove buttons, a notes textarea, a running total, and 'Send rate card' CTA. **Read-only** (brand inbox view): displays the rate card a creator sent, collapsible, with 'Counter offer' and 'Accept rates' action buttons. Section headers show a toned platform icon + uppercase label. Used in the creator Inbox when responding to a brand offer, and in the brand Inbox when reviewing a creator's response.",
  demos: [
    {
      title: "Editable (creator view)",
      description: "Click any price to edit inline. Click × to remove a row. Send rate card turns green on click.",
      render: () => <RateCardEditable />,
    },
    {
      title: "Read-only (brand inbox view)",
      description: "How the rate card appears on the brand side — expand/collapse, counter offer or accept.",
      render: () => <RateCardReadOnly />,
    },
  ],
  props: [],
};

export default doc;
