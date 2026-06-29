"use client";

import React, { useState } from "react";
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconArrowLeft,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconExternalLink,
  IconUserCheck,
  IconBolt,
  IconFileText,
  IconMail,
  IconMessageCircle,
  IconActivity,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type PanelMode = "inspector" | "wide" | "page";
type PanelTab  = "overview" | "deal" | "content" | "messages";

/* ------------------------------------------------------------------ */
/* Mock creator data                                                     */
/* ------------------------------------------------------------------ */

const CREATOR = {
  name: "Priya Nair",
  handle: "@priya_creates",
  initials: "PN",
  tone: "sky" as keyof typeof TONES,
  location: "Los Angeles, CA",
  bio: "Sustainable lifestyle & beauty. Honest reviews, real talk. 🌿",
  platforms: [
    { id: "ig",  icon: IconBrandInstagram, followers: "128K", er: "4.2%" },
    { id: "tt",  icon: IconBrandTiktok,    followers: "340K", er: "6.8%" },
    { id: "yt",  icon: IconBrandYoutube,   followers: "22K",  er: "3.1%" },
  ],
  stage: { label: "Active", tone: "green" as keyof typeof TONES },
  dealValue: "$2,500",
  deliverables: "3 of 5 done",
};

/* ------------------------------------------------------------------ */
/* Sub-components                                                        */
/* ------------------------------------------------------------------ */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)", marginTop: 2 }}>{value}</div>
    </div>
  );
}

const TABS: { id: PanelTab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview",  icon: IconActivity },
  { id: "deal",     label: "Deal",      icon: IconBolt },
  { id: "content",  label: "Content",   icon: IconFileText },
  { id: "messages", label: "Messages",  icon: IconMessageCircle },
];

function PanelTabs({ active, onChange }: { active: PanelTab; onChange: (t: PanelTab) => void }) {
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--sd-border-light)", padding: "0 16px", gap: 2 }}>
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button key={id} type="button" onClick={() => onChange(id)}
            style={{ display: "flex", alignItems: "center", gap: 5, height: 38, padding: "0 10px",
              border: "none", background: "transparent", cursor: "pointer", fontFamily: "var(--sd-font-stack)",
              fontSize: 12, fontWeight: isActive ? 700 : 500,
              color: isActive ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
              borderBottom: isActive ? "2px solid var(--sd-bg-inverted)" : "2px solid transparent",
              marginBottom: -1 }}>
            <Icon size={13} />{label}
          </button>
        );
      })}
    </div>
  );
}

function OverviewContent() {
  return (
    <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: 12,
        background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)" }}>
        {CREATOR.platforms.map(p => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <p.icon size={16} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>{p.followers}</div>
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>ER {p.er}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Bio</div>
        <p style={{ margin: 0, fontSize: 12, color: "var(--sd-font-secondary)", lineHeight: 1.6 }}>{CREATOR.bio}</p>
      </div>

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 8 }}>
        {[
          { label: "Approve",      icon: IconUserCheck },
          { label: "Send email",   icon: IconMail },
          { label: "Open profile", icon: IconExternalLink },
        ].map(({ label, icon: Icon }) => (
          <Button key={label} variant="secondary" size="sm" leftIcon={<Icon size={12} />} style={{ flex: 1 }}>
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function PlaceholderContent({ tab }: { tab: PanelTab }) {
  const labels: Record<PanelTab, string> = {
    overview: "Overview",
    deal:     "Deal timeline and contract",
    content:  "Deliverables and uploads",
    messages: "Direct thread",
  };
  return (
    <div style={{ padding: 24, color: "var(--sd-font-tertiary)", fontSize: 12, textAlign: "center" }}>
      {labels[tab]} content goes here.
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Panel shell                                                           */
/* ------------------------------------------------------------------ */

const MODE_META: Record<PanelMode, { label: string; width: number; desc: string }> = {
  inspector: { label: "Inspector",  width: 320, desc: "320px sidebar drawer — floats over content" },
  wide:      { label: "Wide",       width: 480, desc: "480px — expanded inspector for more data" },
  page:      { label: "Full page",  width: 640, desc: "Takes over the main content area with back navigation" },
};

function RightPanel({ mode, onClose, onBack }: { mode: PanelMode; onClose: () => void; onBack?: () => void }) {
  const [tab, setTab] = useState<PanelTab>("overview");
  const meta = MODE_META[mode];

  return (
    <div style={{ width: meta.width, maxWidth: "100%", background: "var(--sd-bg-primary)",
      border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)",
      display: "flex", flexDirection: "column", overflow: "hidden",
      boxShadow: mode !== "page" ? "0 8px 32px -8px rgba(0,0,0,0.12)" : "none" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
        borderBottom: "1px solid var(--sd-border-light)" }}>
        {mode === "page" && onBack && (
          <Button variant="ghost" iconOnly size="sm" aria-label="Back" onClick={onBack}>
            <IconArrowLeft size={14} />
          </Button>
        )}

        <Avatar initials={CREATOR.initials} tone={CREATOR.tone} size="md" />

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>{CREATOR.name}</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{CREATOR.handle}</div>
        </div>

        <Badge label={CREATOR.stage.label} tone={CREATOR.stage.tone} variant="status" />

        <Button variant="ghost" iconOnly size="sm" aria-label="Close" onClick={onClose}>
          <IconX size={14} />
        </Button>
      </div>

      {/* Deal summary bar */}
      <div style={{ display: "flex", gap: 20, padding: "8px 16px",
        background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
        <Stat label="Deal value"    value={CREATOR.dealValue} />
        <Stat label="Deliverables" value={CREATOR.deliverables} />
        <Stat label="Location"     value={CREATOR.location} />
      </div>

      {/* Tabs */}
      <PanelTabs active={tab} onChange={setTab} />

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {tab === "overview" ? <OverviewContent /> : <PlaceholderContent tab={tab} />}
      </div>

      {/* Footer label */}
      <div style={{ padding: "6px 12px", borderTop: "1px solid var(--sd-border-light)",
        fontSize: 10, color: "var(--sd-font-tertiary)", fontWeight: 500 }}>
        {meta.desc}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo shell                                                            */
/* ------------------------------------------------------------------ */

function ModeDemo() {
  const [mode, setMode] = useState<PanelMode>("inspector");
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* Mode switcher */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {(Object.keys(MODE_META) as PanelMode[]).map(m => (
          <Button key={m} variant={mode === m ? "primary" : "secondary"} size="sm"
            onClick={() => { setMode(m); setOpen(true); }}>
            {MODE_META[m].label}
          </Button>
        ))}
        {!open && (
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Reopen panel
          </Button>
        )}
      </div>

      {open && (
        <RightPanel
          mode={mode}
          onClose={() => setOpen(false)}
          onBack={mode === "page" ? () => setOpen(false) : undefined}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "right-panel",
  title: "Right Panel",
  group: "Layout",
  status: "stable",
  summary: "Creator inspector drawer — three modes: sidebar inspector, wide expanded view, and full-page detail.",
  description:
    "The Right Panel is the primary detail surface throughout the app. It opens when you click a creator row, deal card, or content item and provides a tab-navigated view of overview, deal, content, and messages. Three modes: Inspector (320px floating drawer), Wide (480px for expanded data), Page (640px full-page takeover with back navigation). Each mode renders the same component — only the width and chrome behavior differ. The panel includes a sticky header (avatar, name, handle, stage badge, close/back), a deal summary bar (value, deliverables, location), tab navigation, and a scrollable body.",
  demos: [
    {
      title: "Inspector · Wide · Page",
      description: "Switch between the three panel modes. Close the panel and reopen with the button.",
      block: true,
      render: () => <ModeDemo />,
    },
  ],
  props: [],
};

export default doc;
