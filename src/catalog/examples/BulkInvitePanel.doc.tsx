"use client";

import React, { useState } from "react";
import {
  IconX,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconChevronDown,
  IconChevronUp,
  IconSend,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import AvatarGroup from "@/components/ui/AvatarGroup/AvatarGroup";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Data                                                                  */
/* ------------------------------------------------------------------ */

type PlatformKey = "instagram" | "tiktok" | "youtube";

const PLATFORM_ICONS: Record<PlatformKey, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

interface Creator {
  id: number;
  name: string;
  handle: string;
  tone: "blue" | "purple" | "orange" | "pink" | "turquoise" | "sky" | "yellow" | "red";
  platforms: { key: PlatformKey; followers: string }[];
  engagement: string;
  alreadyInvited?: boolean;
}

const CREATORS: Creator[] = [
  { id: 1, name: "Priya Nair",       handle: "@priya.creates",   tone: "purple",    platforms: [{ key: "instagram", followers: "128K" }, { key: "tiktok", followers: "96K" }],  engagement: "4.6%", alreadyInvited: true },
  { id: 2, name: "Marco Delgado",    handle: "@marco.lifestyle",  tone: "blue",      platforms: [{ key: "instagram", followers: "84K" }],                                         engagement: "3.9%" },
  { id: 3, name: "Yuki Tanaka",      handle: "@yukicreates",      tone: "orange",    platforms: [{ key: "tiktok", followers: "210K" }, { key: "youtube", followers: "45K" }],    engagement: "6.2%" },
  { id: 4, name: "Aisha Okafor",     handle: "@aisha.beauty",     tone: "pink",      platforms: [{ key: "instagram", followers: "67K" }],                                         engagement: "5.1%", alreadyInvited: true },
  { id: 5, name: "Lena Bergström",   handle: "@lena.nordic",      tone: "turquoise", platforms: [{ key: "instagram", followers: "93K" }, { key: "tiktok", followers: "72K" }],  engagement: "4.8%" },
  { id: 6, name: "Carlos Fuentes",   handle: "@carlosfuentes_",   tone: "sky",       platforms: [{ key: "youtube", followers: "180K" }],                                          engagement: "3.4%" },
  { id: 7, name: "Sophie Laurent",   handle: "@sophieinparis",    tone: "yellow",    platforms: [{ key: "instagram", followers: "55K" }, { key: "tiktok", followers: "38K" }],  engagement: "7.1%" },
  { id: 8, name: "Devon Park",       handle: "@devonxcreative",   tone: "red",       platforms: [{ key: "tiktok", followers: "148K" }],                                           engagement: "5.5%" },
];

const TEMPLATE = `Hi {creator_name},

I'd love to invite you to collaborate on the {campaign_name} campaign with Glow Beauty Co.!

We think your aesthetic aligns perfectly with our brand. Reply here or click the link below to learn more and accept your invite.

Looking forward to working together!`;

/* ------------------------------------------------------------------ */
/* Panel component                                                       */
/* ------------------------------------------------------------------ */

function BulkInvitePanel() {
  const [selected, setSelected] = useState<Set<number>>(new Set([2, 5, 7]));
  const [templateOpen, setTemplateOpen] = useState(false);

  const toggle = (id: number, alreadyInvited?: boolean) => {
    if (alreadyInvited) return;
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedCreators = CREATORS.filter(c => selected.has(c.id));

  return (
    <div style={{
      width: 480,
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-lg)",
      background: "var(--sd-bg-primary)",
      display: "flex",
      flexDirection: "column",
      maxHeight: 680,
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "14px 16px",
        borderBottom: "1px solid var(--sd-border-light)",
        flexShrink: 0,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>
            Invite to Campaign
          </div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 2 }}>
            Atlas Summer X
          </div>
        </div>
        <Button variant="ghost" size="sm" iconOnly aria-label="Close">
          <IconX size={14} />
        </Button>
      </div>

      {/* Campaign context strip */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 16px",
        background: "var(--sd-bg-secondary)",
        borderBottom: "1px solid var(--sd-border-light)",
        flexShrink: 0,
      }}>
        <Avatar name="Atlas Summer X" shape="rounded" tone="blue" size="sm" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-primary)" }}>
            Atlas Summer X
          </div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
            Jul 1 – Aug 31, 2026 · 6 creators on roster
          </div>
        </div>
        <Badge label="Active" tone="green" variant="status" dot size="sm" />
      </div>

      {/* Message template (collapsible) */}
      <div style={{ borderBottom: "1px solid var(--sd-border-light)", flexShrink: 0 }}>
        <button
          onClick={() => setTemplateOpen(o => !o)}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "10px 16px",
            background: "none", border: "none", cursor: "pointer",
            fontSize: "var(--sd-text-xs)", fontWeight: 600,
            color: "var(--sd-font-secondary)",
          }}
        >
          <span style={{ flex: 1, textAlign: "left" }}>Invite message template</span>
          {templateOpen ? <IconChevronUp size={13} /> : <IconChevronDown size={13} />}
        </button>
        {templateOpen && (
          <div style={{ padding: "0 16px 12px" }}>
            <div style={{
              fontSize: "var(--sd-text-xs)",
              lineHeight: 1.6,
              color: "var(--sd-font-secondary)",
              background: "var(--sd-bg-secondary)",
              border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-sm)",
              padding: "10px 12px",
              whiteSpace: "pre-wrap",
            }}>
              {TEMPLATE.split(/(\{[^}]+\})/).map((part, i) =>
                /^\{[^}]+\}$/.test(part)
                  ? <span key={i} style={{ background: TONES.blue.tint, color: TONES.blue.text, borderRadius: 3, padding: "1px 4px", fontWeight: 600 }}>{part}</span>
                  : part
              )}
            </div>
          </div>
        )}
      </div>

      {/* Creator list */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {CREATORS.map(creator => {
          const isSelected = selected.has(creator.id);
          const dimmed = creator.alreadyInvited;
          return (
            <div
              key={creator.id}
              onClick={() => toggle(creator.id, creator.alreadyInvited)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px",
                borderBottom: "1px solid var(--sd-border-light)",
                cursor: dimmed ? "default" : "pointer",
                opacity: dimmed ? 0.45 : 1,
                background: isSelected && !dimmed ? "var(--sd-bg-secondary)" : "transparent",
                transition: "background 0.1s",
              }}
            >
              {/* Checkbox */}
              <div style={{
                width: 16, height: 16,
                borderRadius: "var(--sd-radius-sm)",
                border: `1.5px solid ${isSelected && !dimmed ? "var(--sd-bg-inverted)" : "var(--sd-border-medium)"}`,
                background: isSelected && !dimmed ? "var(--sd-bg-inverted)" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                color: "#fff", fontSize: 10, fontWeight: 700,
              }}>
                {isSelected && !dimmed ? "✓" : ""}
              </div>

              <Avatar name={creator.name} tone={creator.tone} size="sm" />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>
                  {creator.name}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>{creator.handle}</span>
                  {creator.platforms.map(p => {
                    const Icon = PLATFORM_ICONS[p.key];
                    return (
                      <span key={p.key} style={{ display: "flex", alignItems: "center", gap: 2, fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
                        <Icon size={11} />
                        {p.followers}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                <Badge label={`${creator.engagement} eng`} tone="gray" variant="status" size="sm" />
                {creator.alreadyInvited && (
                  <Badge label="Invited" tone="gray" variant="outline" size="sm" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky footer */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "12px 16px",
        borderTop: "1px solid var(--sd-border-light)",
        background: "var(--sd-bg-primary)",
        flexShrink: 0,
      }}>
        <AvatarGroup
          avatars={selectedCreators.map(c => ({ initials: c.name.split(" ").map(w => w[0]).join(""), label: c.name, tone: c.tone }))}
          max={4}
          size="sm"
        />
        <span style={{ flex: 1, fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)", fontWeight: 500 }}>
          {selected.size} creator{selected.size !== 1 ? "s" : ""} selected
        </span>
        <Button variant="secondary" size="sm">Cancel</Button>
        <Button variant="primary" size="sm" leftIcon={<IconSend size={13} />}>
          Send Invites
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "bulk-invite-panel",
  title: "BulkInvitePanel",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Slide-in panel for selecting and inviting multiple creators to a campaign in one batch operation.",
  description:
    "Bridges creator discovery and outreach — select from an eligible list, preview the invite template with merge tags, and send in one click. Already-invited creators are shown dimmed and non-selectable. A sticky footer shows the selected AvatarGroup and send action.",
  demos: [
    {
      title: "Bulk invite panel",
      block: true,
      render: () => (
        <div style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
          <BulkInvitePanel />
        </div>
      ),
    },
  ],
  props: [],
};

export default doc;
