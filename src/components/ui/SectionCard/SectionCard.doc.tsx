"use client";

import React from "react";
import { SectionCard } from "./SectionCard";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "section-card",
  title: "SectionCard",
  group: "Core Components",
  status: "stable",
  summary: "Universal card shell — bordered container with optional header, footer, collapsible body, and elevation.",
  description: "Use SectionCard as the structural wrapper for any bounded content region: dashboard KPI sections, settings panels, detail cards, sidebar widgets. It handles the border, border-radius, header/footer dividers, and padding scale so you don't repeat that CSS everywhere.",
  demos: [
    {
      title: "Basic",
      block: true,
      render: () => (
        <SectionCard title="Team members" style={{ maxWidth: 480 } as React.CSSProperties}>
          <p style={{ margin: 0, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)" }}>
            Manage who has access to this workspace and their roles.
          </p>
        </SectionCard>
      ),
    },
    {
      title: "With subtitle + action",
      block: true,
      render: () => (
        <SectionCard
          title="Campaign creators"
          subtitle="8 active · 3 pending"
          action={
            <button style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", border: "1px solid var(--sd-border-default)", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)", cursor: "pointer", color: "var(--sd-font-primary)" }}>
              Invite
            </button>
          }
          style={{ maxWidth: 480 } as React.CSSProperties}
        >
          <p style={{ margin: 0, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)" }}>
            Creator list goes here.
          </p>
        </SectionCard>
      ),
    },
    {
      title: "With footer",
      block: true,
      render: () => (
        <SectionCard
          title="Display name"
          footer={
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", border: "1px solid var(--sd-border-default)", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)", cursor: "pointer", color: "var(--sd-font-secondary)" }}>Cancel</button>
              <button style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", border: "none", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-inverted)", cursor: "pointer", color: "#fff" }}>Save changes</button>
            </div>
          }
          style={{ maxWidth: 480 } as React.CSSProperties}
        >
          <input style={{ width: "100%", boxSizing: "border-box", padding: "7px 10px", border: "1px solid var(--sd-border-default)", borderRadius: "var(--sd-radius-sm)", fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)", background: "var(--sd-bg-primary)" }} defaultValue="Glow Beauty Co." />
        </SectionCard>
      ),
    },
    {
      title: "Padding variants",
      block: true,
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {(["none", "sm", "md", "lg"] as const).map(p => (
            <SectionCard key={p} title={`padding="${p}"`} padding={p} style={{ maxWidth: 480 } as React.CSSProperties}>
              <div style={{ background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-sm)", height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
                content
              </div>
            </SectionCard>
          ))}
        </div>
      ),
    },
    {
      title: "Elevated",
      block: true,
      render: () => (
        <div style={{ display: "flex", gap: 16, background: "var(--sd-bg-secondary)", padding: 24, borderRadius: "var(--sd-radius-md)" }}>
          <SectionCard title="Default" style={{ flex: 1 } as React.CSSProperties}>
            <div style={{ height: 40 }} />
          </SectionCard>
          <SectionCard title="Elevated" elevated style={{ flex: 1 } as React.CSSProperties}>
            <div style={{ height: 40 }} />
          </SectionCard>
        </div>
      ),
    },
    {
      title: "Collapsible",
      block: true,
      render: () => (
        <SectionCard title="Advanced settings" collapsible defaultCollapsed style={{ maxWidth: 480 } as React.CSSProperties}>
          <p style={{ margin: 0, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)" }}>
            These settings are hidden by default. Click the header to expand.
          </p>
        </SectionCard>
      ),
    },
    {
      title: "Nested (settings pattern)",
      block: true,
      render: () => (
        <SectionCard title="Notifications" style={{ maxWidth: 480 } as React.CSSProperties}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["New deal invite", "Content approved", "Payment received"].map(label => (
              <SectionCard key={label} bordered={false} padding="sm" style={{ background: "var(--sd-bg-secondary)" } as React.CSSProperties}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-primary)" }}>{label}</span>
                  <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Email · Push</span>
                </div>
              </SectionCard>
            ))}
          </div>
        </SectionCard>
      ),
    },
  ],
  props: [
    {
      title: "SectionCardProps",
      rows: [
        { name: "title",            type: "string",        description: "Card header title." },
        { name: "subtitle",         type: "string",        description: "Smaller secondary text below the title." },
        { name: "action",           type: "ReactNode",     description: "Element rendered in the top-right of the header." },
        { name: "children",         type: "ReactNode",     required: true, description: "Card body content." },
        { name: "footer",           type: "ReactNode",     description: "Footer row rendered below a divider with a slightly gray background." },
        { name: "padding",          type: '"none"|"sm"|"md"|"lg"', default: '"md"', description: "Content area padding (0 / 10px / 16px / 24px)." },
        { name: "bordered",         type: "boolean",       default: "true",  description: "Show a border around the card." },
        { name: "elevated",         type: "boolean",       default: "false", description: "Add a subtle box-shadow." },
        { name: "collapsible",      type: "boolean",       default: "false", description: "Clicking the header toggles the body open/closed." },
        { name: "defaultCollapsed", type: "boolean",       default: "false", description: "Start in the collapsed state." },
        { name: "className",        type: "string",        description: "Extra class on the root element." },
      ],
    },
  ],
};

export default doc;
