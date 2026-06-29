import React from "react";
import { PlatformIcon } from "./PlatformIcon";
import type { ComponentDoc } from "@/catalog/types";

const PLATFORMS = ["instagram", "tiktok", "youtube"] as const;

const doc: ComponentDoc = {
  slug: "platform-icon",
  title: "PlatformIcon",
  group: "Core Components",
  status: "stable",
  summary:
    "Brand-colored social platform glyph (Instagram / TikTok / YouTube). The single source for platform marks across the system.",
  description:
    "Inline SVG so platform glyphs read as recognizable brand marks. Decorative by default (aria-hidden) — pass a label to make it standalone-accessible. Every other component (CreatorIdentity, CreatorPlatformChips) routes its glyphs through this.",
  source: "apps/web/src/components/ui/PlatformIcon.tsx",
  demos: [
    {
      title: "Platforms",
      description: "The three supported marks at the default size (14px).",
      render: () => (
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {PLATFORMS.map((p) => (
            <div
              key={p}
              style={{ display: "grid", placeItems: "center", gap: 8 }}
            >
              <PlatformIcon platform={p} size={32} />
              <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>
                {p}
              </span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Sizes",
      description:
        "Size is contextual — the glyph matches the text beside it (default 14px), so there's no fixed size scale. It accepts any number, but in practice only two show up: inline (14) and standalone (20).",
      render: () => (
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[
            { n: 14, l: "Inline (default)" },
            { n: 20, l: "Standalone" },
          ].map(({ n, l }) => (
            <div key={n} style={{ display: "grid", placeItems: "center", gap: 8 }}>
              <PlatformIcon platform="instagram" size={n} />
              <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>
                {l} · {n}px
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ],
  props: [
    {
      rows: [
        {
          name: "platform",
          type: '"instagram" | "tiktok" | "youtube" | string',
          required: true,
          description:
            "Platform key. Loosely matched (ig, insta, tik, yt, …); unknown values render nothing.",
        },
        {
          name: "size",
          type: "number",
          default: "14",
          description: "Width/height in px.",
        },
        {
          name: "label",
          type: "string",
          description:
            "When set, the glyph becomes non-decorative (role=img + aria-label).",
        },
      ],
    },
  ],
};

export default doc;
