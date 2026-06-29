"use client";

import React from "react";
import AvatarGroup from "./AvatarGroup";
import type { ComponentDoc } from "@/catalog/types";

const TEAM = [
  { initials: "ED", tone: "green"  as const, label: "Eric Dahan" },
  { initials: "PN", tone: "purple" as const, label: "Priya Nair" },
  { initials: "MR", tone: "pink"   as const, label: "Maya Rivers" },
  { initials: "LP", tone: "blue"   as const, label: "Leo Park" },
  { initials: "NC", tone: "sky"    as const, label: "Nina Cole" },
  { initials: "SO", tone: "orange" as const, label: "Sam Okafor" },
];

function AvatarGroupShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Sizes */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sizes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(["sm", "md", "lg"] as const).map(size => (
            <div key={size} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 24, fontSize: 11, color: "var(--sd-font-tertiary)", fontWeight: 600 }}>{size}</span>
              <AvatarGroup avatars={TEAM} max={4} size={size} />
              <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>6 members, max 4 shown</span>
            </div>
          ))}
        </div>
      </section>

      {/* In-context: campaign team */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Campaign roster header</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { name: "Atlas X Summer",  count: 12, avs: TEAM },
            { name: "Summer Glow",     count: 8,  avs: TEAM.slice(0, 5) },
            { name: "Back to School",  count: 4,  avs: TEAM.slice(0, 4) },
          ].map(({ name, count, avs }) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", background: "var(--sd-bg-primary)" }}>
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{name}</div>
              <AvatarGroup avatars={avs} max={5} size="sm" />
              <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>{count} creators</span>
            </div>
          ))}
        </div>
      </section>

      {/* Overflow at various maxes */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Overflow overflow indicator</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          {[1, 2, 3, 5].map(max => (
            <div key={max} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <AvatarGroup avatars={TEAM} max={max} size="md" />
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>max={max}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "avatar-group",
  title: "AvatarGroup",
  group: "Core Components",
  status: "stable",
  summary: "Overlapping avatar stack for teams and creator rosters. Four sizes, configurable max with +N overflow.",
  description:
    "AvatarGroup renders a horizontal stack of overlapping circular avatars. Each avatar uses initials + a tone-keyed background color. Pass `src` for a photo; falls back to initials if the image fails to load. When the count exceeds `max`, a +N overflow chip is shown. All four sizes (xs/sm/md/lg) are covered. Hover the group to see the full label list in a native title tooltip.",
  demos: [
    {
      title: "Sizes, contexts, and overflow",
      block: true,
      render: () => <AvatarGroupShowcase />,
    },
  ],
  props: [
    {
      rows: [
        { name: "avatars",     type: "AvatarItem[]",          required: true,  description: "List of avatars. Each: `{ initials, tone?, src?, label? }`." },
        { name: "max",         type: "number",                required: false, default: "4",    description: "Max visible before +N overflow." },
        { name: "size",        type: "'xs'|'sm'|'md'|'lg'",  required: false, default: "'md'", description: "xs=20px, sm=26px, md=32px, lg=40px." },
        { name: "showTooltip", type: "boolean",               required: false, default: "true", description: "Native title tooltip listing all labels." },
      ],
    },
  ],
};

export default doc;
