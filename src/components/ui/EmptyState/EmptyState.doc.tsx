"use client";

import React from "react";
import EmptyState from "./EmptyState";
import {
  IconUsers,
  IconBolt,
  IconPhoto,
  IconPackage,
  IconSearch,
  IconMail,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

function EmptyStateShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Default md — with two actions */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", marginBottom: 16 }}>
        <EmptyState
          icon={IconUsers}
          title="No creators yet"
          description="Add creators to this campaign to get started. You can search your roster or invite someone new."
          actions={[
            { label: "Add from roster", onClick: () => {}, variant: "primary" },
            { label: "Invite creator", onClick: () => {}, variant: "ghost" },
          ]}
          hint="Or import from a CSV file"
        />
      </div>

      {/* Row of sm empties */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        {[
          { icon: IconBolt,    title: "No deals",     description: "Create a deal to send an offer.", actions: [{ label: "New deal", onClick: () => {}, variant: "primary" as const }] },
          { icon: IconPhoto,   title: "No content",   description: "Content will appear here once it's submitted." },
          { icon: IconPackage, title: "No shipments", description: "Shipments appear once a deal is contracted." },
          { icon: IconSearch,  title: "No results",   description: "Try adjusting your search or filters." },
        ].map(({ icon, title, description, actions }) => (
          <div key={title} style={{ flex: "1 1 180px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-secondary)" }}>
            <EmptyState size="sm" icon={icon} title={title} description={description} actions={actions} />
          </div>
        ))}
      </div>

      {/* lg — full-pane */}
      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-secondary)" }}>
        <EmptyState
          size="lg"
          icon={IconMail}
          title="No messages yet"
          description="Start a conversation with a creator to discuss campaign details, share briefs, or review content."
          actions={[
            { label: "Send a message", onClick: () => {}, variant: "primary" },
          ]}
        />
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "empty-state",
  title: "EmptyState",
  group: "Core Components",
  status: "stable",
  summary: "Centered placeholder for empty lists, panels, and full pages. Three sizes: sm, md, lg.",
  description:
    "EmptyState is the standard placeholder shown when a list or view has no content. Pass any Tabler icon component, a title, an optional description, up to 2 action buttons (primary filled + ghost outlined), and an optional hint line below. Three sizes: `sm` for inline cells or narrow panels, `md` (default) for standard section empties, `lg` for full-pane blanks.",
  demos: [
    {
      title: "Empty state variants",
      description: "Top: md with two actions and a hint. Middle: sm — 4 context-specific empties. Bottom: lg full-pane.",
      block: true,
      render: () => <EmptyStateShowcase />,
    },
  ],
  props: [
    {
      rows: [
        { name: "icon",        type: "React.ElementType",          required: false, description: "Tabler icon component. Pass the component itself (not JSX)." },
        { name: "title",       type: "string",                     required: true,  description: "Primary message — short, action-oriented." },
        { name: "description", type: "string",                     required: false, description: "Supporting context sentence." },
        { name: "actions",     type: "EmptyStateAction[]",         required: false, description: "Up to 2 action buttons. Each: `{ label, onClick, variant? }`." },
        { name: "size",        type: "'sm' | 'md' | 'lg'",         required: false, default: "'md'", description: "Controls padding, icon size, and text size." },
        { name: "hint",        type: "string",                     required: false, description: "Small hint text below the actions (e.g. 'Or import from a CSV')." },
      ],
    },
  ],
};

export default doc;
