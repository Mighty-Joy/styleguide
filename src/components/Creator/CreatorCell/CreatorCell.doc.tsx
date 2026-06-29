import React from "react";
import CreatorCell from "./CreatorCell";
import type { ComponentDoc } from "@/catalog/types";

const tag = (label: string) => (
  <span
    style={{
      fontSize: 11,
      fontWeight: 600,
      color: "var(--sd-accent-active)",
      background: "var(--sd-accent-tint-2)",
      borderRadius: "var(--sd-radius-pill)",
      padding: "2px 8px",
    }}
  >
    {label}
  </span>
);

const doc: ComponentDoc = {
  slug: "creator-cell",
  title: "CreatorCell",
  group: "Core Components",
  status: "stable",
  summary:
    "The canonical creator lead cell: identity + platform·follower chips. Drop into a RecordList `lead`.",
  description:
    "Composes CreatorIdentity + CreatorPlatformChips so every record surface (Creators, Deals, Shipments, Posts) reads identically. Don't re-roll identity + chips inline — use this.",
  source: "apps/web/src/components/Creator/CreatorCell.tsx",
  demos: [
    {
      title: "Default",
      render: () => (
        <CreatorCell
          name="Maya Rivers"
          handle="@mayarivers"
          followers={{ instagram: 128000, tiktok: 2300000 }}
        />
      ),
    },
    {
      title: "With trailing tags",
      description: "The `tags` slot renders after the chips — e.g. campaign membership.",
      render: () => (
        <CreatorCell
          name="Leo Park"
          handle="@leopark"
          followers={{ youtube: 540000, instagram: 41000 }}
          tags={tag("Summer Launch")}
        />
      ),
    },
  ],
  props: [
    {
      title: "CreatorCellProps",
      rows: [
        { name: "name", type: "string", required: true, description: "Creator name (avatar initials)." },
        { name: "handle", type: "string", required: true, description: "The @handle." },
        { name: "avatarUrl", type: "string | null", description: "Image avatar; falls back to initials." },
        { name: "platforms", type: "CreatorPlatform[]", description: "Chips to render. Omitted → derived from followers." },
        { name: "followers", type: "Partial<Record<CreatorPlatform, number | null>>", description: "Per-platform follower counts." },
        { name: "tags", type: "ReactNode", description: "Trailing content after the chips." },
        { name: "size", type: '"xs" | "sm"', default: '"xs"', description: "Identity scale." },
      ],
    },
  ],
};

export default doc;
