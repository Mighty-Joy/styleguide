"use client";

import React from "react";
import Badge from "./Badge";
import { IconBolt, IconCircleCheck, IconClock, IconAlertCircle } from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import type { ComponentDoc } from "@/catalog/types";

function BadgeShowcase() {
  const allTones = Object.keys(TONES) as (keyof typeof TONES)[];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Variants */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Variants (blue tone)</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Badge label="Status"  tone="blue" variant="status"  dot />
          <Badge label="Solid"   tone="blue" variant="solid" />
          <Badge label="Outline" tone="blue" variant="outline" />
          <Badge label="12"      tone="blue" variant="count" />
        </div>
      </section>

      {/* All tones — status */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>All tones — status (with dot)</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {allTones.map(tone => (
            <Badge key={tone} label={tone} tone={tone} variant="status" dot />
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sizes</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Badge label="Small"  tone="green" variant="status" dot size="sm" />
          <Badge label="Medium" tone="green" variant="status" dot size="md" />
          <Badge label="Large"  tone="green" variant="status" dot size="lg" />
        </div>
      </section>

      {/* With icons */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>With icons</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Badge label="Contracted"  tone="green"  variant="status" icon={IconCircleCheck} />
          <Badge label="In Review"   tone="orange" variant="status" icon={IconClock} />
          <Badge label="Needs Action" tone="red"   variant="status" icon={IconAlertCircle} />
          <Badge label="Active Deal" tone="blue"   variant="solid"  icon={IconBolt} />
        </div>
      </section>

      {/* Real-world context */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>In context — creator stages</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "Invited",    tone: "yellow" as const },
            { label: "In Review",  tone: "orange" as const },
            { label: "Contracted", tone: "green"  as const },
            { label: "Completed",  tone: "purple" as const },
            { label: "Dropped",    tone: "red"    as const },
          ].map(({ label, tone }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-secondary)" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", flex: 1 }}>Creator stage</span>
              <Badge label={label} tone={tone} variant="status" dot />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "badge",
  title: "Badge",
  group: "Core Components",
  status: "stable",
  summary: "Status pill, count chip, solid badge, and outline variant. All 10 TONES, 3 sizes, optional dot and icon.",
  description:
    "Badge is the single source-of-truth for every status pill, count chip, and label badge in the app. Four variants: `status` (tint background + toned text — the default, used for stage labels), `solid` (fully filled, high emphasis), `outline` (border only, no background), `count` (circular number chip). Three sizes (sm/md/lg). All 10 TONES are supported. Add a `dot` prop for a colored presence indicator before the label, or pass any Tabler icon component.",
  demos: [
    {
      title: "Variants, tones, sizes, and icons",
      block: true,
      render: () => <BadgeShowcase />,
    },
  ],
  props: [
    {
      rows: [
        { name: "label",   type: "React.ReactNode",                       required: true,  description: "Badge text or content." },
        { name: "tone",    type: "keyof TONES",                           required: false, default: "'blue'",   description: "Color tone from the TONES system." },
        { name: "variant", type: "'status'|'count'|'outline'|'solid'",   required: false, default: "'status'", description: "Visual treatment." },
        { name: "size",    type: "'sm'|'md'|'lg'",                        required: false, default: "'md'",     description: "sm=18px, md=22px, lg=26px height." },
        { name: "dot",     type: "boolean",                               required: false, description: "Adds a colored dot before the label." },
        { name: "icon",    type: "React.ElementType",                     required: false, description: "Tabler icon shown before the label." },
      ],
    },
  ],
};

export default doc;
