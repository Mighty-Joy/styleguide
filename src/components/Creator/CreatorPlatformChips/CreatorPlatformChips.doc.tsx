import React from "react";
import CreatorPlatformChips from "./CreatorPlatformChips";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "creator-platform-chips",
  title: "CreatorPlatformChips",
  group: "Core Components",
  status: "stable",
  summary:
    "Soft-gray platform pills with compact follower counts. Used in record cells and panel headers.",
  description:
    "When followers are provided, each chip shows the platform glyph + compact count (1.5K / 2.3M). With no count it's just the glyph. Pass platforms explicitly, or let it derive them from the follower keys that have a value.",
  source: "apps/web/src/components/Creator/CreatorPlatformChips.tsx",
  demos: [
    {
      title: "With follower counts",
      render: () => (
        <CreatorPlatformChips
          followers={{ instagram: 128000, tiktok: 2300000, youtube: 54000 }}
        />
      ),
    },
    {
      title: "Glyphs only",
      description: "Omit followers to show just the platform marks.",
      render: () => (
        <CreatorPlatformChips platforms={["instagram", "tiktok", "youtube"]} />
      ),
    },
    {
      title: "Derived from data",
      description:
        "Platforms omitted → derived from the follower keys present (YouTube is null, so it drops out).",
      render: () => (
        <CreatorPlatformChips
          followers={{ instagram: 88000, youtube: null, tiktok: 12000 }}
        />
      ),
    },
  ],
  props: [
    {
      title: "CreatorPlatformChipsProps",
      rows: [
        { name: "platforms", type: "CreatorPlatform[]", description: "Which chips to render. Omitted → derived from followers keys with values." },
        { name: "followers", type: "Partial<Record<CreatorPlatform, number | null>>", description: "Per-platform counts; shown compact when present." },
        { name: "iconSize", type: "number", default: "11", description: "Glyph size inside each chip." },
        { name: "wrap", type: "boolean", default: "false", description: "Allow chips to wrap to multiple lines." },
      ],
    },
  ],
};

export default doc;
