"use client";

import React, { useState } from "react";
import {
  IconChevronRight,
  IconPlus,
  IconDownload,
  IconFilter,
  IconBolt,
  IconArrowLeft,
  IconDots,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

interface Breadcrumb { label: string; href?: string }

interface PageHeaderProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
  subtitle?: string;
  badge?: { label: string; tone: keyof typeof TONES };
  actions?: React.ReactNode;
  tabs?: { id: string; label: string; count?: number }[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
  backLabel?: string;
  onBack?: () => void;
}

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  badge,
  actions,
  tabs,
  activeTab,
  onTabChange,
  backLabel,
  onBack,
}: PageHeaderProps) {
  const bt = badge ? TONES[badge.tone] : null;

  return (
    <div style={{ background: "var(--sd-bg-primary)", borderBottom: "1px solid var(--sd-border-light)" }}>
      <div style={{ padding: "14px 20px 0" }}>
        {/* Back nav */}
        {onBack && (
          <div style={{ marginBottom: 10 }}>
            <Button variant="tertiary" size="sm" leftIcon={<IconArrowLeft size={13} />} onClick={onBack}>
              {backLabel ?? "Back"}
            </Button>
          </div>
        )}

        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 8 }}>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <IconChevronRight size={11} style={{ color: "var(--sd-font-tertiary)" }} />}
                <span style={{ fontSize: 12, color: b.href ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)", cursor: b.href ? "pointer" : "default" }}>
                  {b.label}
                </span>
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Title row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>
                {title}
              </h1>
              {badge && bt && (
                <span style={{ display: "inline-flex", alignItems: "center", height: 22, padding: "0 9px",
                  borderRadius: "var(--sd-radius-pill)", background: bt.tint, color: bt.text, fontSize: 11, fontWeight: 600 }}>
                  {badge.label}
                </span>
              )}
            </div>
            {subtitle && (
              <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--sd-font-tertiary)", lineHeight: 1.4 }}>
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>{actions}</div>}
        </div>

        {/* Tabs */}
        {tabs && (
          <div style={{ display: "flex", gap: 2 }}>
            {tabs.map(tab => {
              const isActive = tab.id === activeTab;
              return (
                <button key={tab.id} type="button" onClick={() => onTabChange?.(tab.id)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 36,
                    padding: "0 12px", border: "none", background: "transparent", cursor: "pointer",
                    fontFamily: "var(--sd-font-stack)", fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                    borderBottom: isActive ? "2px solid var(--sd-bg-inverted)" : "2px solid transparent",
                    marginBottom: -1 }}>
                  {tab.label}
                  {tab.count !== undefined && (
                    <span style={{ fontSize: 10, fontWeight: 700, height: 16, minWidth: 16, padding: "0 4px",
                      borderRadius: "var(--sd-radius-pill)", background: isActive ? TONES.blue.tint : "var(--sd-bg-secondary)",
                      color: isActive ? TONES.blue.text : "var(--sd-font-tertiary)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demos                                                                 */
/* ------------------------------------------------------------------ */


function CampaignListHeaderDemo() {
  const [tab, setTab] = useState("active");
  return (
    <PageHeader
      title="Campaigns"
      subtitle="Manage all influencer campaigns across your brands"
      breadcrumbs={[{ label: "Workspace", href: "#" }, { label: "Campaigns" }]}
      tabs={[
        { id: "active",    label: "Active",    count: 6 },
        { id: "draft",     label: "Drafts",    count: 2 },
        { id: "completed", label: "Completed", count: 14 },
        { id: "archived",  label: "Archived" },
      ]}
      activeTab={tab}
      onTabChange={setTab}
      actions={
        <>
          <Button variant="secondary" size="sm" leftIcon={<IconFilter size={12} />}>Filter</Button>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export</Button>
          <Button variant="primary" size="sm" leftIcon={<IconPlus size={12} />}>New campaign</Button>
        </>
      }
    />
  );
}

function CampaignDetailHeaderDemo() {
  const [starred, setStarred] = useState(false);
  const [tab, setTab] = useState("creators");
  return (
    <PageHeader
      breadcrumbs={[{ label: "Campaigns", href: "#" }, { label: "Atlas X Summer" }]}
      title="Atlas X Summer"
      subtitle="Running Jun 15 – Aug 30, 2025 · 12 creators · $28,400 budget"
      badge={{ label: "Active", tone: "green" }}
      tabs={[
        { id: "overview",  label: "Overview" },
        { id: "creators",  label: "Creators",  count: 12 },
        { id: "content",   label: "Content",   count: 34 },
        { id: "shipments", label: "Shipments", count: 5 },
        { id: "contract",  label: "Contract" },
      ]}
      activeTab={tab}
      onTabChange={setTab}
      actions={
        <>
          <Button variant="ghost" iconOnly aria-label={starred ? "Unstar" : "Star"} onClick={() => setStarred(v => !v)}
            style={{ color: starred ? "#f59e0b" : "var(--sd-font-tertiary)" }}>
            {starred ? <IconStarFilled size={14} /> : <IconStar size={14} />}
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<IconBolt size={12} />}>Add deal</Button>
          <Button variant="ghost" iconOnly aria-label="More"><IconDots size={14} /></Button>
        </>
      }
    />
  );
}

function CreatorDetailHeaderDemo() {
  return (
    <PageHeader
      backLabel="Back to roster"
      onBack={() => {}}
      title="Priya Nair"
      subtitle="@priya_creates · Los Angeles, CA · 128K followers on Instagram"
      badge={{ label: "Active deal", tone: "blue" }}
      actions={
        <>
          <Button variant="secondary" size="sm" leftIcon={<IconDownload size={12} />}>Export</Button>
          <Button variant="primary" size="sm" leftIcon={<IconBolt size={12} />}>Create deal</Button>
        </>
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "page-header",
  title: "PageHeader",
  group: "Layout",
  status: "stable",
  summary: "Top-of-page header with breadcrumb, title, status badge, subtitle, tabs, and action buttons.",
  description:
    "PageHeader is the consistent chrome at the top of every major list and detail page. It composes: an optional back-link (for drill-down navigation), a breadcrumb trail, a large title with optional status badge inline, a subtitle line, a right-side action area (buttons, icon buttons), and a tab bar with optional count chips. The tab bar sits flush against the bottom border so the active tab underline runs to the page edge. Three usage patterns demonstrated: list page (Campaigns with tabs + primary action), detail page (campaign with star toggle + nested tabs), and creator detail (back-nav + deal CTA).",
  demos: [
    { title: "Campaign list page", description: "Breadcrumb + tabs with counts + export + new CTA.", render: () => <CampaignListHeaderDemo /> },
    { title: "Campaign detail page", description: "Badge inline with title, star toggle, nested content tabs with counts.", render: () => <CampaignDetailHeaderDemo /> },
    { title: "Creator detail (with back nav)", description: "Back-link replaces breadcrumb for drill-down navigated pages.", render: () => <CreatorDetailHeaderDemo /> },
  ],
  props: [],
};

export default doc;
