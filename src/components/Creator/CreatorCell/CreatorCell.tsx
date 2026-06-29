"use client";

import React from "react";
import CreatorIdentity, {
  type CreatorPlatform,
} from "@/components/Creator/CreatorIdentity";
import CreatorPlatformChips from "@/components/Creator/CreatorPlatformChips";

const PLATFORM_ORDER: CreatorPlatform[] = ["instagram", "tiktok", "youtube"];

export interface CreatorCellProps {
  name: string;
  handle: string;
  avatarUrl?: string | null;
  /** Platforms the creator is on (controls which chips render). When omitted,
   *  derived from the keys of `followers` that have a value. */
  platforms?: CreatorPlatform[];
  /** Optional per-platform follower counts — the chip shows the compact count
   *  when present, otherwise just the platform glyph. */
  followers?: Partial<Record<CreatorPlatform, number | null | undefined>>;
  /** Optional trailing content after the platform chips (e.g. campaign tags). */
  tags?: React.ReactNode;
  size?: "xs" | "sm";
}

/**
 * THE canonical creator cell for record lists (Creators, Shipments, Deals,
 * Posts …): avatar + @handle + inline platform·follower chips. One source of
 * truth so every surface reads identically — compose into a `RecordList` `lead`.
 *
 * Re-authored lean from apps/web `components/Creator/CreatorCell`: same prop API,
 * flex `div` instead of Mantine `Group`.
 */
const CreatorCell: React.FC<CreatorCellProps> = ({
  name,
  handle,
  avatarUrl,
  platforms,
  followers,
  tags,
  size = "xs",
}) => {
  const list =
    platforms ?? PLATFORM_ORDER.filter((p) => followers?.[p] != null);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "nowrap",
        minWidth: 0,
      }}
    >
      <CreatorIdentity
        name={name}
        handle={handle}
        avatarUrl={avatarUrl}
        size={size}
      />
      <CreatorPlatformChips platforms={list} followers={followers} />
      {tags}
    </div>
  );
};

export default CreatorCell;
