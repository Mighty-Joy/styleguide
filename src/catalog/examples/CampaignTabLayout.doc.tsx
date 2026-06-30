"use client";
import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type Tab = {
  id:    string;
  label: string;
  icon:  string;
  count: number | null;
};

/* ── tabs ───────────────────────────────────────────────── */
const TABS: Tab[] = [
  { id: "creators",    label: "Creators",    icon: "👥", count: 6   },
  { id: "content",     label: "Content",     icon: "🎬", count: 11  },
  { id: "deals",       label: "Deals",       icon: "🤝", count: 4   },
  { id: "deliverables",label: "Deliverables",icon: "📦", count: 8   },
  { id: "payments",    label: "Payments",    icon: "💳", count: null },
  { id: "settings",    label: "Settings",    icon: "⚙️", count: null },
];

/* ── tab content placeholders ───────────────────────────── */
const TAB_CONTENT: Record<string, React.ReactNode> = {
  creators: (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {["Priya Nair", "Maya Chen", "Leo Park", "Sofia Ruiz", "Amir Hassan", "Zoe Williams"].map((name, i) => (
        <div key={name} style={{
          display:      "flex",
          alignItems:   "center",
          gap:          12,
          padding:      "10px 14px",
          background:   "var(--sd-bg-secondary)",
          borderRadius: 8,
          border:       "1px solid var(--sd-border-default)",
        }}>
          <div style={{
            width:          32,
            height:         32,
            borderRadius:   "50%",
            background:     `hsl(${i * 55}, 65%, 55%)`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            color:          "#fff",
            fontFamily:     "var(--sd-font)",
            fontSize:       11,
            fontWeight:     700,
          }}>
            {name.split(" ").map(n => n[0]).join("")}
          </div>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 500, color: "var(--sd-font-primary)", flex: 1 }}>{name}</span>
          <Badge label={i < 3 ? "Active" : i === 3 ? "Negotiating" : "Invited"} tone={i < 3 ? "green" : i === 3 ? "orange" : "blue"} variant="solid" size="sm" />
        </div>
      ))}
    </div>
  ),
  content: (
    <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", padding: "20px 0" }}>
      Content kanban / table view — 11 deliverables across 6 stages.
    </div>
  ),
  deals: (
    <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", padding: "20px 0" }}>
      Deal list — 4 active deals with amounts and status.
    </div>
  ),
  deliverables: (
    <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", padding: "20px 0" }}>
      Deliverable tracker — 8 items across brief → posted.
    </div>
  ),
  payments: (
    <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", padding: "20px 0" }}>
      Payment schedule and history.
    </div>
  ),
  settings: (
    <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", padding: "20px 0" }}>
      Campaign settings — name, brief, goals, dates.
    </div>
  ),
};

const ACTIONS: Record<string, React.ReactNode> = {
  creators:     <Button variant="primary" size="sm">+ Add creator</Button>,
  content:      <Button variant="primary" size="sm">+ New content</Button>,
  deals:        <Button variant="primary" size="sm">+ New deal</Button>,
  deliverables: <Button variant="secondary" size="sm">Export</Button>,
  payments:     <Button variant="primary" size="sm">Pay all</Button>,
  settings:     <Button variant="primary" size="sm">Save changes</Button>,
};

const SUBTITLES: Record<string, string> = {
  creators:     "Manage creators in this campaign and their deal status",
  content:      "Track deliverables from brief through to approved",
  deals:        "All deal agreements for this campaign",
  deliverables: "Individual deliverable items and their review stage",
  payments:     "Payment schedule and disbursement history",
  settings:     "Campaign configuration, brief, and goals",
};

/* ── Demo ───────────────────────────────────────────────── */
function CampaignTabLayoutDemo() {
  const [activeTab, setActiveTab] = useState("creators");
  const [search, setSearch] = useState("");

  const tab = TABS.find(t => t.id === activeTab)!;

  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           0,
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  12,
      overflow:      "hidden",
      background:    "var(--sd-bg-secondary)",
    }}>
      {/* campaign header */}
      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          14,
        padding:      "14px 20px",
        borderBottom: "1px solid var(--sd-border-default)",
        background:   "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
      }}>
        <div style={{
          width:          40,
          height:         40,
          borderRadius:   10,
          background:     "rgba(255,255,255,0.2)",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       20,
          flexShrink:     0,
        }}>
          ☀️
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 15, fontWeight: 700, color: "#fff" }}>
            Summer Glow Campaign
          </div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
            Aura Labs · 6 creators · Jul 1 – Aug 31
          </div>
        </div>
        <Badge label="Active" tone="green" variant="solid" size="sm" />
      </div>

      {/* tab bar */}
      <div style={{
        display:      "flex",
        borderBottom: "1px solid var(--sd-border-default)",
        background:   "var(--sd-bg-tertiary)",
        overflowX:    "auto",
      }}>
        {TABS.map(t => {
          const active = t.id === activeTab;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                display:       "flex",
                alignItems:    "center",
                gap:           6,
                padding:       "11px 16px",
                fontFamily:    "var(--sd-font)",
                fontSize:      12,
                fontWeight:    active ? 600 : 500,
                color:         active ? "#6366F1" : "var(--sd-font-tertiary)",
                background:    "none",
                border:        "none",
                borderBottom:  active ? "2px solid #6366F1" : "2px solid transparent",
                cursor:        "pointer",
                whiteSpace:    "nowrap",
                marginBottom:  -1,
              }}
            >
              <span>{t.icon}</span>
              {t.label}
              {t.count !== null && (
                <span style={{
                  fontFamily:   "var(--sd-font)",
                  fontSize:     10,
                  fontWeight:   600,
                  color:        active ? "#6366F1" : "var(--sd-font-tertiary)",
                  background:   active ? "#EEF2FF" : "var(--sd-bg-secondary)",
                  borderRadius: 100,
                  padding:      "1px 6px",
                  border:       active ? "1px solid #C7D2FE" : "1px solid var(--sd-border-default)",
                }}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* tab content area */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* sub-header: title + action */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>
              {tab.icon} {tab.label}
            </div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)", marginTop: 2 }}>
              {SUBTITLES[activeTab]}
            </div>
          </div>
          {ACTIONS[activeTab]}
        </div>

        {/* search toolbar (on tabs that need it) */}
        {["creators", "content", "deals", "deliverables"].includes(activeTab) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={`Search ${tab.label.toLowerCase()}…`}
              style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     12,
                color:        "var(--sd-font-primary)",
                background:   "var(--sd-bg-tertiary)",
                border:       "1px solid var(--sd-border-default)",
                borderRadius: 7,
                padding:      "7px 12px",
                width:        200,
                outline:      "none",
              }}
            />
          </div>
        )}

        {/* content */}
        {TAB_CONTENT[activeTab]}
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "campaign-tab-layout",
  title:       "Campaign Tab Layout",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Campaign workspace scaffold with tab bar (Creators, Content, Deals, Deliverables, Payments, Settings) — maps to CampaignTabLayout.tsx.",
  description: "Shared scaffold for every campaign-workspace tab. Provides a consistent campaign header (name, brand, dates, status), tab bar with counts, sub-header with title + action button, optional search toolbar, and a content slot. Tabs line up at the same vertical positions on every switch. Maps to CampaignTabLayout.tsx in the app.",
  demos: [
    {
      title:  "Summer Glow Campaign",
      render: () => <CampaignTabLayoutDemo />,
      block:  true,
      maxWidth: 880,
      plain:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "title",    type: "string",         required: true,  description: "Tab title shown in the sub-header." },
        { name: "subtitle", type: "string",         required: false, description: "One-line description below the tab title." },
        { name: "actions",  type: "React.ReactNode",required: false, description: "Right-aligned header actions (Add, Export, etc.)." },
        { name: "search",   type: "CampaignTabSearch", required: false, description: "Left-aligned search field config; omit for tabs without search." },
        { name: "filters",  type: "React.ReactNode",required: false, description: "Right-aligned toolbar controls (filter dropdowns, bulk actions)." },
        { name: "children", type: "React.ReactNode",required: true,  description: "Tab content — record lists, kanban, forms, etc." },
      ],
    },
  ],
};

export default doc;
