"use client";

import React from "react";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { formatFollowersCompact } from "@/components/lib/format";
import { type CreatorPlatform } from "@/components/Creator/CreatorIdentity";
import styles from "./CreatorPlatformChips.module.css";

const PLATFORM_ORDER: CreatorPlatform[] = ["instagram", "tiktok", "youtube"];

export interface CreatorPlatformChipsProps {
  /** Platforms to render. When omitted, derived from `followers` keys with values. */
  platforms?: CreatorPlatform[];
  followers?: Partial<Record<CreatorPlatform, number | null | undefined>>;
  /** Icon size inside each chip. */
  iconSize?: number;
  wrap?: boolean;
}

/**
 * Platform·follower chips (soft gray pills). Shared by RecordList creator cells
 * and the campaign creator panel header.
 *
 * Re-authored lean from apps/web `components/Creator/CreatorPlatformChips`: same
 * prop API, plain markup + scoped CSS instead of Mantine `Group`/`Text`.
 */
const CreatorPlatformChips: React.FC<CreatorPlatformChipsProps> = ({
  platforms,
  followers,
  iconSize = 11,
  wrap = false,
}) => {
  const list =
    platforms ?? PLATFORM_ORDER.filter((p) => followers?.[p] != null);

  if (list.length === 0) return null;

  return (
    <div className={`${styles.root} ${wrap ? styles.wrap : styles.nowrap}`}>
      {list.map((p) => (
        <span key={p} className={styles.chip}>
          <PlatformIcon platform={p} size={iconSize} />
          {followers?.[p] != null && (
            <span className={styles.count}>
              {formatFollowersCompact(followers[p])}
            </span>
          )}
        </span>
      ))}
    </div>
  );
};

export default CreatorPlatformChips;
