"use client";
import React, { useState } from "react";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type SubComponent = {
  name:  string;
  type:  "primitive" | "core" | "composite";
};

type Composite = {
  name:     string;
  slug?:    string;
  note?:    string;
  children: SubComponent[];
};

type AppPage = {
  name:     string;
  path:     string;
  persona:  "brand" | "creator" | "manager" | "shared";
  composites: Composite[];
};

/* ── data ───────────────────────────────────────────────── */
const PAGES: AppPage[] = [
  {
    name: "Brand Home",
    path: "/home (brand)",
    persona: "brand",
    composites: [
      {
        name: "BrandHomeView",
        slug: "brand-home-view",
        children: [
          { name: "StatCard",      type: "core"      },
          { name: "Badge",         type: "primitive" },
          { name: "Avatar",        type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Creator Home",
    path: "/creator/opportunities",
    persona: "creator",
    composites: [
      {
        name: "CreatorHomeView",
        slug: "creator-home-view",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Manager Home",
    path: "/manager/home",
    persona: "manager",
    composites: [
      {
        name: "ManagerHomeView",
        slug: "manager-home-view",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Campaigns",
    path: "/campaigns",
    persona: "brand",
    composites: [
      {
        name: "CampaignCard",
        slug: "campaign-card",
        children: [
          { name: "Badge",         type: "primitive" },
          { name: "Avatar",        type: "primitive" },
          { name: "AvatarGroup",   type: "core"      },
          { name: "StatCard",      type: "core"      },
        ],
      },
      {
        name: "CampaignSetup",
        slug: "campaign-setup",
        children: [
          { name: "Input",         type: "primitive" },
          { name: "Textarea",      type: "primitive" },
          { name: "DatePicker",    type: "primitive" },
          { name: "FileUpload",    type: "primitive" },
          { name: "Button",        type: "primitive" },
          { name: "FieldGroup",    type: "core"      },
        ],
      },
      {
        name: "BrandCampaignTimeline",
        slug: "brand-campaign-timeline",
        children: [
          { name: "Badge",         type: "primitive" },
          { name: "Avatar",        type: "primitive" },
          { name: "AvatarGroup",   type: "core"      },
        ],
      },
    ],
  },
  {
    name: "Campaign Workspace",
    path: "/campaigns/:id",
    persona: "brand",
    composites: [
      {
        name: "CampaignTabLayout",
        slug: "campaign-tab-layout",
        note: "Shared scaffold for all tabs",
        children: [
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
          { name: "Input",         type: "primitive" },
        ],
      },
      {
        name: "CampaignCreatorsTable",
        slug: "campaign-creators-table",
        note: "Creators tab",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
          { name: "FilterBar",     type: "core"      },
          { name: "DataTable",     type: "core"      },
        ],
      },
      {
        name: "ContentKanban",
        slug: "content-kanban",
        note: "Content tab",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
      {
        name: "PostsPage",
        slug: "posts-page",
        note: "Posts tab",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
      {
        name: "DeliverableTracker",
        slug: "deliverable-tracker",
        note: "Deliverables tab",
        children: [
          { name: "Badge",         type: "primitive" },
          { name: "Avatar",        type: "primitive" },
          { name: "ProgressBar",   type: "primitive" },
        ],
      },
      {
        name: "PaymentDashboard",
        slug: "payment-dashboard",
        note: "Payments tab",
        children: [
          { name: "StatCard",      type: "core"      },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
      {
        name: "BrandSafetyPage",
        slug: "brand-safety-page",
        note: "Brand safety tab",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Deals",
    path: "/deals",
    persona: "brand",
    composites: [
      {
        name: "DealKanban",
        slug: "deal-kanban",
        children: [
          { name: "DealCard",      type: "composite" },
          { name: "Badge",         type: "primitive" },
          { name: "Avatar",        type: "primitive" },
        ],
      },
      {
        name: "DealCard",
        slug: "deal-card",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
      {
        name: "DealOverview",
        slug: "deal-overview",
        children: [
          { name: "StatCard",      type: "core"      },
          { name: "Badge",         type: "primitive" },
          { name: "Avatar",        type: "primitive" },
          { name: "InlineEdit",    type: "core"      },
        ],
      },
      {
        name: "DealTaskCard",
        slug: "deal-task-card",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
      {
        name: "NegotiationView",
        slug: "negotiation-view",
        children: [
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
          { name: "Input",         type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Creators / Discovery",
    path: "/creators",
    persona: "brand",
    composites: [
      {
        name: "CreatorDiscovery",
        slug: "creator-discovery",
        children: [
          { name: "CreatorCard",   type: "composite" },
          { name: "FilterBar",     type: "core"      },
          { name: "EmptyState",    type: "core"      },
          { name: "Pagination",    type: "primitive" },
        ],
      },
      {
        name: "CreatorCard",
        slug: "creator-card",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
          { name: "CreatorIdentity",type: "core"     },
          { name: "PlatformIcon",  type: "core"      },
        ],
      },
      {
        name: "CreatorProfile",
        slug: "creator-profile",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "StatCard",      type: "core"      },
          { name: "CreatorInsightsPanel", type: "composite" },
        ],
      },
      {
        name: "DiscoveryFiltersPanel",
        slug: "discovery-filters-panel",
        children: [
          { name: "Select",        type: "primitive" },
          { name: "MultiSelect",   type: "primitive" },
          { name: "ToggleGroup",   type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Roster / Lists",
    path: "/lists",
    persona: "brand",
    composites: [
      {
        name: "ListsPage",
        slug: "lists-page",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "AvatarGroup",   type: "core"      },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
          { name: "EmptyState",    type: "core"      },
        ],
      },
      {
        name: "RosterCreatorRow",
        slug: "roster-creator-row",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "CreatorCell",   type: "core"      },
          { name: "PlatformIcon",  type: "core"      },
        ],
      },
    ],
  },
  {
    name: "Inbox / Messaging",
    path: "/inbox",
    persona: "shared",
    composites: [
      {
        name: "InboxView",
        slug: "inbox-view",
        children: [
          { name: "ConversationThread", type: "composite" },
          { name: "Avatar",         type: "primitive"  },
          { name: "Badge",          type: "primitive"  },
          { name: "EmailThread",    type: "core"       },
        ],
      },
      {
        name: "ConversationThread",
        slug: "conversation-thread",
        children: [
          { name: "Avatar",         type: "primitive" },
          { name: "Button",         type: "primitive" },
          { name: "Textarea",       type: "primitive" },
        ],
      },
      {
        name: "NotificationPanel",
        slug: "notification-panel",
        children: [
          { name: "Avatar",         type: "primitive" },
          { name: "Badge",          type: "primitive" },
          { name: "EmptyState",     type: "core"      },
        ],
      },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    persona: "brand",
    composites: [
      {
        name: "SettingsPage",
        slug: "settings-page",
        children: [
          { name: "Input",          type: "primitive" },
          { name: "FileUpload",     type: "primitive" },
          { name: "Switch",         type: "primitive" },
          { name: "Button",         type: "primitive" },
          { name: "FieldGroup",     type: "core"      },
        ],
      },
      {
        name: "TeamMemberManagement",
        slug: "team-member-management",
        children: [
          { name: "Avatar",         type: "primitive" },
          { name: "Badge",          type: "primitive" },
          { name: "Select",         type: "primitive" },
          { name: "Button",         type: "primitive" },
        ],
      },
      {
        name: "IntegrationSettings",
        slug: "integration-settings",
        children: [
          { name: "Switch",         type: "primitive" },
          { name: "Badge",          type: "primitive" },
          { name: "Button",         type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Agent Rail",
    path: "(right panel)",
    persona: "brand",
    composites: [
      {
        name: "RightPanel (Creator)",
        slug: "right-panel",
        children: [
          { name: "CreatorIdentity",type: "core"      },
          { name: "CreatorInsightsPanel", type: "composite" },
          { name: "DeliverableDetailDrawer", type: "composite" },
          { name: "AgentChat",     type: "composite" },
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
        ],
      },
      {
        name: "AgentChat",
        slug: "agent-chat",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
          { name: "Textarea",      type: "primitive" },
        ],
      },
      {
        name: "DeliverableDetailDrawer",
        slug: "deliverable-detail-drawer",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Creator Portal — My Deals",
    path: "/creator/engagements",
    persona: "creator",
    composites: [
      {
        name: "CreatorEngagementCard",
        slug: "creator-engagement-card",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Creator Portal — My Tasks",
    path: "/creator/tasks",
    persona: "creator",
    composites: [
      {
        name: "CreatorTodoList",
        slug: "creator-todo-list",
        children: [
          { name: "Avatar",        type: "primitive" },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
  {
    name: "Creator Portal — Earnings",
    path: "/creator/earnings",
    persona: "creator",
    composites: [
      {
        name: "CreatorPayoutWallet",
        slug: "creator-payout-wallet",
        children: [
          { name: "StatCard",      type: "core"      },
          { name: "Badge",         type: "primitive" },
          { name: "Button",        type: "primitive" },
        ],
      },
    ],
  },
];

/* ── helpers ────────────────────────────────────────────── */
const PERSONA_CFG = {
  brand:   { label: "Brand",   color: "#6366F1", bg: "#EEF2FF" },
  creator: { label: "Creator", color: "#10B981", bg: "#ECFDF5" },
  manager: { label: "Manager", color: "#F59E0B", bg: "#FFFBEB" },
  shared:  { label: "Shared",  color: "#6B7280", bg: "#F3F4F6" },
};

const TYPE_CFG = {
  primitive: { color: "#6B7280", label: "primitive" },
  core:      { color: "#3B82F6", label: "core"      },
  composite: { color: "#8B5CF6", label: "composite" },
};

/* ── components ─────────────────────────────────────────── */
function TypeChip({ type }: { type: SubComponent["type"] }) {
  const cfg = TYPE_CFG[type];
  return (
    <span style={{
      fontFamily:   "var(--sd-font)",
      fontSize:     9,
      fontWeight:   600,
      color:        cfg.color,
      border:       `1px solid ${cfg.color}40`,
      borderRadius: 4,
      padding:      "1px 5px",
      letterSpacing:"0.04em",
      textTransform:"uppercase",
    }}>
      {cfg.label}
    </span>
  );
}

function CompositeName({ composite }: { composite: Composite }) {
  return (
    <a
      href={composite.slug ? `/catalog/${composite.slug}` : undefined}
      style={{
        fontFamily:     "var(--sd-font)",
        fontSize:       13,
        fontWeight:     700,
        color:          composite.slug ? "#6366F1" : "var(--sd-font-primary)",
        textDecoration: "none",
        display:        "inline-flex",
        alignItems:     "center",
        gap:            6,
      }}
    >
      {composite.name}
      {composite.note && (
        <span style={{ fontFamily: "var(--sd-font)", fontSize: 11, fontWeight: 400, color: "var(--sd-font-tertiary)" }}>
          — {composite.note}
        </span>
      )}
    </a>
  );
}

function PageSection({ page, open, onToggle }: {
  page:     AppPage;
  open:     boolean;
  onToggle: () => void;
}) {
  const persona = PERSONA_CFG[page.persona];

  return (
    <div style={{
      border:       "1px solid var(--sd-border-default)",
      borderRadius: 10,
      overflow:     "hidden",
      marginBottom: 10,
    }}>
      {/* page header */}
      <button
        onClick={onToggle}
        style={{
          width:          "100%",
          display:        "flex",
          alignItems:     "center",
          gap:            12,
          padding:        "12px 16px",
          background:     open ? "var(--sd-bg-tertiary)" : "var(--sd-bg-secondary)",
          border:         "none",
          cursor:         "pointer",
          textAlign:      "left",
        }}
      >
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     14,
          fontWeight:   700,
          color:        "var(--sd-font-primary)",
          flex:         1,
        }}>
          {page.name}
        </span>
        <code style={{
          fontFamily:   "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize:     11,
          color:        "var(--sd-font-tertiary)",
          background:   "var(--sd-bg-tertiary)",
          border:       "1px solid var(--sd-border-default)",
          borderRadius: 4,
          padding:      "2px 7px",
        }}>
          {page.path}
        </code>
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     10,
          fontWeight:   600,
          color:        persona.color,
          background:   persona.bg,
          borderRadius: 100,
          padding:      "2px 8px",
        }}>
          {persona.label}
        </span>
        <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)", transform: open ? "rotate(180deg)" : "none" }}>
          ▾
        </span>
      </button>

      {/* outline body */}
      {open && (
        <div style={{
          borderTop:  "1px solid var(--sd-border-default)",
          padding:    "12px 16px",
          background: "var(--sd-bg-secondary)",
        }}>
          {page.composites.map((comp, ci) => (
            <div key={comp.name} style={{ marginBottom: ci < page.composites.length - 1 ? 14 : 0 }}>
              {/* L1 composite */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ color: "var(--sd-border-default)", fontFamily: "monospace", fontSize: 13, marginRight: 2 }}>└─</span>
                <CompositeName composite={comp} />
              </div>

              {/* L2 sub-components */}
              <div style={{ paddingLeft: 26, display: "flex", flexDirection: "column", gap: 4 }}>
                {comp.children.map((child, si) => (
                  <div key={`${child.name}-${si}`} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: "var(--sd-border-default)", fontFamily: "monospace", fontSize: 12 }}>
                      {si === comp.children.length - 1 ? "└─" : "├─"}
                    </span>
                    <span style={{
                      fontFamily: "var(--sd-font)",
                      fontSize:   12,
                      fontWeight: 500,
                      color:      "var(--sd-font-secondary)",
                    }}>
                      {child.name}
                    </span>
                    <TypeChip type={child.type} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Demo component ─────────────────────────────────────── */
function ArchitectureOutline() {
  const [openPages, setOpenPages] = useState<Set<string>>(
    new Set(PAGES.map(p => p.name))
  );

  const toggle = (name: string) =>
    setOpenPages(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });

  const brandPages   = PAGES.filter(p => p.persona === "brand");
  const creatorPages = PAGES.filter(p => p.persona === "creator");
  const managerPages = PAGES.filter(p => p.persona === "manager");
  const sharedPages  = PAGES.filter(p => p.persona === "shared");

  const Section = ({ title, pages, color }: { title: string; pages: AppPage[]; color: string }) => (
    <div style={{ marginBottom: 32 }}>
      <div style={{
        fontFamily:    "var(--sd-font)",
        fontSize:      11,
        fontWeight:    700,
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        color:         color,
        marginBottom:  12,
        paddingBottom: 6,
        borderBottom:  `2px solid ${color}30`,
      }}>
        {title}
      </div>
      {pages.map(p => (
        <PageSection
          key={p.name}
          page={p}
          open={openPages.has(p.name)}
          onToggle={() => toggle(p.name)}
        />
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "var(--sd-font)", maxWidth: 800 }}>
      {/* legend */}
      <div style={{
        display:      "flex",
        gap:          16,
        padding:      "10px 14px",
        background:   "var(--sd-bg-tertiary)",
        borderRadius: 8,
        border:       "1px solid var(--sd-border-default)",
        marginBottom: 24,
        flexWrap:     "wrap",
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)" }}>Legend:</span>
        {Object.entries(TYPE_CFG).map(([k, v]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <TypeChip type={k as SubComponent["type"]} />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>
              {k === "primitive" ? "Primitive (atoms)" : k === "core" ? "Core component" : "Nested composite"}
            </span>
          </div>
        ))}
      </div>

      <Section title="Shared surfaces"  pages={sharedPages}   color="#6B7280" />
      <Section title="Brand portal"     pages={brandPages}    color="#6366F1" />
      <Section title="Creator portal"   pages={creatorPages}  color="#10B981" />
      <Section title="Manager portal"   pages={managerPages}  color="#F59E0B" />
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "architecture",
  title:       "App Architecture",
  group:       "Foundations",
  status:      "stable",
  summary:     "Page-by-page outline of the app — which composite components cover each surface and which sub-components they use.",
  description: "An indented outline of every page in the superdeal-fe app, the composite components that cover each surface, and the primitive/core sub-components they depend on. Composites link to their catalog entry. Use this as the canonical IA reference when adding new components.",
  demos: [
    {
      title:  "App page map",
      render: () => <ArchitectureOutline />,
      block:  true,
      plain:  true,
    },
  ],
  props: [],
};

export default doc;
