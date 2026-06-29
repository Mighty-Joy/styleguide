import React from "react";
import CreatorIdentity from "./CreatorIdentity";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "creator-identity",
  title: "CreatorIdentity",
  group: "Core Components",
  status: "stable",
  summary:
    "Avatar + @handle + optional platform glyphs, verified check and sub-line. The atom every creator surface is built from.",
  description:
    "The source of truth for how a creator's identity reads. The green handle uses the --sd-creator-handle token; record-list rows use the default (primary-text) handle color so green stays meaningful as a link.",
  source: "apps/web/src/components/Creator/CreatorIdentity.tsx",
  demos: [
    {
      title: "Sizes",
      description: "xs (compact secondary identity) · sm · md.",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <CreatorIdentity name="Maya Rivers" handle="@mayarivers" size="sm" />
          <CreatorIdentity name="Maya Rivers" handle="@mayarivers" size="sm" />
          <CreatorIdentity name="Maya Rivers" handle="@mayarivers" size="md" />
        </div>
      ),
    },
    {
      title: "Handle color",
      description:
        'Default uses primary text; "brand" uses the green handle token.',
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <CreatorIdentity name="Leo Park" handle="@leopark" handleColor="default" />
          <CreatorIdentity name="Leo Park" handle="@leopark" handleColor="brand" />
        </div>
      ),
    },
    {
      title: "Verified, platforms & sub-line",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <CreatorIdentity
            name="Nina Cole"
            handle="@ninacole"
            verified
            platforms={["instagram", "tiktok"]}
          />
          <CreatorIdentity
            name="Theo Vance"
            handle="@theovance"
            platforms={["youtube"]}
            subline="Joined via invite · awaiting onboarding"
          />
        </div>
      ),
    },
  ],
  props: [
    {
      title: "CreatorIdentityProps",
      rows: [
        { name: "name", type: "string", required: true, description: "Used for avatar initials." },
        { name: "handle", type: "string", required: true, description: "The @handle shown as the primary line." },
        { name: "handleSuffix", type: "string", description: "Appended after the handle in default color." },
        { name: "avatarUrl", type: "string | null", description: "Image avatar; falls back to initials." },
        { name: "platforms", type: "CreatorPlatform[]", description: "Glyphs rendered after the handle." },
        { name: "verified", type: "boolean", description: "Shows a verified check." },
        { name: "size", type: '"xs" | "sm" | "md"', default: '"md"', description: "Avatar + handle scale." },
        { name: "handleColor", type: '"brand" | "default"', default: '"default"', description: "Green brand handle vs primary text." },
        { name: "subline", type: "ReactNode", description: "Supporting content under the handle." },
      ],
    },
  ],
};

export default doc;
