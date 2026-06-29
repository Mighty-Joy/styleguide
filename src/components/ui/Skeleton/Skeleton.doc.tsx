"use client";

import React from "react";
import { Skeleton, SkeletonCircle, SkeletonCreatorRow, SkeletonCreatorCard, SkeletonStatsBar } from "./Skeleton";
import type { ComponentDoc } from "@/catalog/types";

function SkeletonShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Primitives */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Primitives</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
          <Skeleton height={13} width="80%" />
          <Skeleton height={13} width="60%" />
          <Skeleton height={13} width="70%" />
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <SkeletonCircle size={32} />
            <SkeletonCircle size={32} />
            <SkeletonCircle size={32} />
            <Skeleton height={20} width={72} radius="pill" />
            <Skeleton height={20} width={56} radius="pill" />
          </div>
        </div>
      </section>

      {/* Creator rows */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 0 }}>Creator row list (loading state)</div>
        <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", marginTop: 10 }}>
          {[0, 1, 2, 3].map(i => <SkeletonCreatorRow key={i} />)}
        </div>
      </section>

      {/* Card + stats */}
      <section>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Card + stats bar</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
          <SkeletonCreatorCard />
          <div style={{ flex: 1, minWidth: 240, display: "flex", flexDirection: "column", gap: 10 }}>
            <SkeletonStatsBar />
            <Skeleton height={120} radius="md" />
          </div>
        </div>
      </section>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "skeleton",
  title: "Skeleton",
  group: "Feedback",
  status: "stable",
  summary: "Shimmer loading placeholders — primitive rect/circle plus pre-built creator row, card, and stats bar.",
  description:
    "Skeleton provides shimmer loading placeholders that match the layout of real content. Primitive: `<Skeleton>` for rectangles (configurable width, height, border-radius), `<SkeletonCircle>` for avatars. Pre-built compositions: `<SkeletonCreatorRow>` mirrors the roster row layout, `<SkeletonCreatorCard>` mirrors the full creator card, `<SkeletonStatsBar>` mirrors a 4-stat KPI row. The shimmer animation uses a 800px background-position sweep over the `--sd-bg-tertiary` / `--sd-bg-quaternary` tokens so it respects light/dark themes.",
  demos: [
    {
      title: "Skeleton primitives and compositions",
      description: "Primitives, a 4-row list skeleton, and a side-by-side card + stats skeleton.",
      block: true,
      render: () => <SkeletonShowcase />,
    },
  ],
  props: [
    {
      title: "Skeleton (primitive)",
      rows: [
        { name: "width",  type: "number | string", required: false, default: "'100%'", description: "Width. Number = px, string = any CSS unit." },
        { name: "height", type: "number | string", required: false, default: "14",     description: "Height in px or CSS unit." },
        { name: "radius", type: "'none'|'sm'|'md'|'pill'|'full'", required: false, default: "'sm'", description: "Border-radius preset." },
      ],
    },
    {
      title: "SkeletonCircle",
      rows: [
        { name: "size", type: "number", required: false, default: "32", description: "Diameter in px." },
      ],
    },
  ],
};

export default doc;
