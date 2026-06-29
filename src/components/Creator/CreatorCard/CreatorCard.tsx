"use client";

import React from "react";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconMessage2,
  IconPlus,
  IconDotsVertical,
  IconBookmark,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import styles from "./CreatorCard.module.css";

export type CreatorCardPlatform = "instagram" | "tiktok" | "youtube";
export type CreatorCardStatus = "active" | "invited" | "inactive";
export type CreatorCardVariant = "full" | "compact";

export interface CreatorCardStat {
  label: string;
  value: string;
}

export interface CreatorCardProps {
  name: string;
  handle: string;
  avatarInitials: string;
  avatarTone: keyof typeof TONES;
  platforms: Partial<Record<CreatorCardPlatform, number>>;
  /** Up to 4 key stats to show in the stats grid (full variant only). */
  stats?: CreatorCardStat[];
  status?: CreatorCardStatus;
  variant?: CreatorCardVariant;
  /** Slot for extra content below chips (e.g. a tags row). */
  extra?: React.ReactNode;
  onMessage?: () => void;
  onAdd?: () => void;
  onMore?: () => void;
  onClick?: () => void;
}

/* ------------------------------------------------------------------ */
/* Platform chip — private; keeps platform brand colors                  */
/* ------------------------------------------------------------------ */

const PLATFORM_ICONS: Record<CreatorCardPlatform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok: IconBrandTiktok,
  youtube: IconBrandYoutube,
};

const PLATFORM_COLOR: Record<CreatorCardPlatform, string> = {
  instagram: "#e1306c",
  tiktok: "#010101",
  youtube: "#ff0000",
};

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function PlatformChip({ platform, count }: { platform: CreatorCardPlatform; count: number }) {
  const Icon = PLATFORM_ICONS[platform];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 22, padding: "0 8px", borderRadius: "var(--sd-radius-pill)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 600, color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
      <Icon size={12} style={{ color: PLATFORM_COLOR[platform], flexShrink: 0 }} />
      {formatFollowers(count)}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Status → Badge mapping                                                */
/* ------------------------------------------------------------------ */

const STATUS_TONE: Record<CreatorCardStatus, keyof typeof TONES> = {
  active:   "green",
  invited:  "blue",
  inactive: "gray",
};

const STATUS_LABEL: Record<CreatorCardStatus, string> = {
  active:   "Active",
  invited:  "Invited",
  inactive: "Inactive",
};

/* ------------------------------------------------------------------ */
/* CreatorCard                                                           */
/* ------------------------------------------------------------------ */

export function CreatorCard({
  name,
  handle,
  avatarInitials,
  avatarTone,
  platforms,
  stats,
  status = "active",
  variant = "full",
  extra,
  onMessage,
  onAdd,
  onMore,
  onClick,
}: CreatorCardProps) {
  const isCompact = variant === "compact";
  const platformEntries = Object.entries(platforms) as [CreatorCardPlatform, number][];

  return (
    <div
      className={`${styles.card}${isCompact ? ` ${styles.cardCompact}` : ""}`}
      onClick={onClick}
    >
      {/* Accent bar */}
      <div className={styles.accentBar} />

      {/* Header */}
      <div className={styles.header}>
        <Avatar initials={avatarInitials} tone={avatarTone} size="lg" />
        <div className={styles.identity}>
          <span className={styles.name}>{name}</span>
          <span className={styles.handle}>{handle}</span>
        </div>
        <Badge
          label={STATUS_LABEL[status]}
          tone={STATUS_TONE[status]}
          variant="status"
          dot={status !== "inactive"}
          size="sm"
        />
      </div>

      {/* Platform chips */}
      {platformEntries.length > 0 && (
        <div className={styles.chips}>
          {platformEntries.map(([p, count]) => (
            <PlatformChip key={p} platform={p} count={count} />
          ))}
        </div>
      )}

      {/* Extra slot */}
      {extra && (
        <div style={{ padding: "0 14px 10px" }}>{extra}</div>
      )}

      {/* Stats grid — full variant only */}
      {!isCompact && stats && stats.length > 0 && (
        <>
          <div className={styles.divider} />
          <div className={styles.stats}>
            {stats.slice(0, 4).map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statLabel}>{s.label}</span>
                <span className={styles.statValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Footer actions */}
      <div className={styles.footer}>
        {onMessage && (
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<IconMessage2 size={13} />}
            style={{ flex: 1 }}
            onClick={(e) => { e.stopPropagation(); onMessage(); }}
          >
            Message
          </Button>
        )}
        {onAdd && (
          <Button
            variant="primary"
            size="sm"
            leftIcon={<IconPlus size={13} />}
            style={{ flex: 1 }}
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
          >
            Add
          </Button>
        )}
        {!onMessage && !onAdd && (
          <>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<IconBookmark size={13} />}
              style={{ flex: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<IconPlus size={13} />}
              style={{ flex: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              Add
            </Button>
          </>
        )}
        {onMore && (
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            aria-label="More"
            onClick={(e) => { e.stopPropagation(); onMore(); }}
          >
            <IconDotsVertical size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default CreatorCard;
