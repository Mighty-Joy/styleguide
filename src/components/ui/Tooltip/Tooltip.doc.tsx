"use client";

import React from "react";
import Tooltip from "./Tooltip";
import Button from "@/components/ui/Button/Button";
import {
  IconMessageCircle,
  IconTrash,
  IconExternalLink,
  IconBolt,
  IconSettings,
  IconInfoCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";

function TooltipShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Icon buttons with tooltips */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>Icon button row (hover each)</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip content="Send message" side="top">
            <Button variant="secondary" size="sm" iconOnly aria-label="Message"><IconMessageCircle size={15} /></Button>
          </Tooltip>
          <Tooltip content="Open profile in new tab" side="top">
            <Button variant="secondary" size="sm" iconOnly aria-label="View profile"><IconExternalLink size={15} /></Button>
          </Tooltip>
          <Tooltip content="Create deal" side="top">
            <Button variant="secondary" size="sm" iconOnly aria-label="Create deal"><IconBolt size={15} /></Button>
          </Tooltip>
          <Tooltip content="Campaign settings" side="top">
            <Button variant="secondary" size="sm" iconOnly aria-label="Settings"><IconSettings size={15} /></Button>
          </Tooltip>
          <Tooltip content="Remove from roster — this cannot be undone" side="top">
            <Button variant="danger" size="sm" iconOnly aria-label="Remove"><IconTrash size={15} /></Button>
          </Tooltip>
        </div>
      </section>

      {/* All four sides */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>Side placement</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", paddingLeft: 16 }}>
          {(["top", "bottom", "left", "right"] as const).map(side => (
            <div key={side} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <Tooltip content={`Tooltip on the ${side}`} side={side} delay={0}>
                <Button variant="secondary" size="sm">{side}</Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </section>

      {/* Info label with tooltip */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.05em" }}>Label + info icon</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>Average Engagement Rate</span>
          <Tooltip content="ER is calculated as (likes + comments) / followers × 100. We use the last 30 posts." side="right" delay={100}>
            <span style={{ display: "inline-flex", alignItems: "center", color: "var(--sd-font-tertiary)", cursor: "help" }}>
              <IconInfoCircle size={14} />
            </span>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "tooltip",
  title: "Tooltip",
  group: "Feedback",
  status: "stable",
  summary: "Hover tooltip with 4 placement options and configurable delay. Wraps any element.",
  description:
    "Tooltip wraps any React element and shows a dark label bubble after a configurable delay (default 400ms). Four placements: `top` (default), `bottom`, `left`, `right`. Each includes a directional arrow. Content can be any React node. Set `delay={0}` for instant show. Set `disabled` to prevent the tooltip from appearing. Common uses: icon-only buttons, truncated text overflow, info icons next to field labels.",
  demos: [
    {
      title: "Tooltip placements and contexts",
      description: "Hover each button or label to trigger. Placement demo uses delay=0 for instant visibility.",
      block: true,
      render: () => <TooltipShowcase />,
    },
  ],
  props: [
    {
      rows: [
        { name: "content",  type: "React.ReactNode",            required: true,  description: "The tooltip label or content." },
        { name: "children", type: "React.ReactElement",         required: true,  description: "The element that triggers the tooltip on hover/focus." },
        { name: "side",     type: "'top'|'bottom'|'left'|'right'", required: false, default: "'top'", description: "Which side the tooltip appears on." },
        { name: "delay",    type: "number",                     required: false, default: "400", description: "Milliseconds before showing. 0 = instant." },
        { name: "disabled", type: "boolean",                    required: false, default: "false", description: "Prevents the tooltip from appearing." },
      ],
    },
  ],
};

export default doc;
