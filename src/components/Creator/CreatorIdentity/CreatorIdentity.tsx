"use client";

import React from "react";
import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import Avatar from "@/components/ui/Avatar/Avatar";
import styles from "./CreatorIdentity.module.css";

/**
 * Creator identity primitive — avatar + @handle + optional platform glyphs,
 * verified check and sub-line. THE source of truth for how a creator's identity
 * reads across every surface (record rows, action cards, panel headers).
 *
 * Re-authored lean from apps/web `components/Creator/CreatorIdentity`: same prop
 * API, but plain markup + scoped CSS instead of Mantine, so it stays dependency-
 * free in the catalog. The green handle uses the --sd-creator-handle token.
 */
export type CreatorPlatform = "instagram" | "tiktok" | "youtube";

type Size = "xs" | "sm" | "md";

const HANDLE_FONT: Record<Size, string> = {
  xs: "var(--sd-text-xs)",
  sm: "var(--sd-text-xs)",
  md: "var(--sd-text-sm)",
};
const GLYPH_SIZE: Record<Size, number> = { xs: 11, sm: 12, md: 13 };

// Map CreatorIdentity sizes to Avatar's 3 sizes
// xs=22px → sm=24px (closest), sm=32px → md=32px, md=40px → lg=40px
const AVATAR_SIZE_MAP = {
  xs: "sm",
  sm: "md",
  md: "lg",
} as const;

export interface CreatorIdentityProps {
  name: string;
  handle: string;
  /** Appended after handle in default (non-green) color. */
  handleSuffix?: string;
  avatarUrl?: string | null;
  /** A creator may be on several platforms — glyphs render after the handle. */
  platforms?: CreatorPlatform[];
  /** Show a verified check after the handle. */
  verified?: boolean;
  size?: Size;
  /**
   * Handle color. "brand" = the green --sd-creator-handle token;
   * "default" (default) = standard primary text (e.g. record-list rows, where
   * green would read as a link).
   */
  handleColor?: "brand" | "default";
  /** Optional supporting content rendered under the handle. */
  subline?: React.ReactNode;
}

const CreatorIdentity: React.FC<CreatorIdentityProps> = ({
  name,
  handle,
  handleSuffix,
  avatarUrl,
  platforms,
  verified,
  size = "md",
  handleColor = "default",
  subline,
}) => {
  const glyphSize = GLYPH_SIZE[size];

  return (
    <div className={styles.root}>
      <Avatar
        name={name}
        src={avatarUrl ?? undefined}
        size={AVATAR_SIZE_MAP[size]}
      />

      <div className={styles.body}>
        <div className={styles.line}>
          <span
            className={`${styles.handle} ${
              handleColor === "brand" ? styles.handleBrand : styles.handleDefault
            }`}
            style={{ fontSize: HANDLE_FONT[size] }}
          >
            {handle}
            {handleSuffix && <span className={styles.suffix}>{handleSuffix}</span>}
          </span>

          {verified && (
            <span className={styles.verified}>
              <IconRosetteDiscountCheckFilled size={glyphSize + 2} />
            </span>
          )}

          {platforms && platforms.length > 0 && (
            <span className={styles.glyphs}>
              {platforms.map((platform) => (
                <span key={platform} className={styles.glyph}>
                  <PlatformIcon platform={platform} size={glyphSize} />
                </span>
              ))}
            </span>
          )}
        </div>
        {subline && <div className={styles.subline}>{subline}</div>}
      </div>
    </div>
  );
};

export default CreatorIdentity;
