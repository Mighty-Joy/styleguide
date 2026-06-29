import React from "react";
import styles from "./Skeleton.module.css";

/* ── Primitive ── */
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: "none" | "sm" | "md" | "pill" | "full";
  className?: string;
}

export function Skeleton({ width = "100%", height = 14, radius = "sm", className }: SkeletonProps) {
  return (
    <span
      className={`${styles.skeleton} ${styles[`r_${radius}`]} ${className ?? ""}`}
      style={{ width, height: typeof height === "number" ? height : height, display: "block" }}
      aria-hidden="true"
    />
  );
}

/* ── Circle ── */
export function SkeletonCircle({ size = 32 }: { size?: number }) {
  return <Skeleton width={size} height={size} radius="full" />;
}

/* ── Pre-built: creator row ── */
export function SkeletonCreatorRow() {
  return (
    <div className={styles.row}>
      <SkeletonCircle size={36} />
      <div className={styles.rowBody}>
        <Skeleton width={140} height={13} />
        <Skeleton width={90} height={11} />
      </div>
      <Skeleton width={70} height={20} radius="pill" />
      <Skeleton width={80} height={4} />
      <Skeleton width={48} height={13} />
    </div>
  );
}

/* ── Pre-built: creator card ── */
export function SkeletonCreatorCard() {
  return (
    <div className={styles.card}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
        <SkeletonCircle size={40} />
        <div style={{ flex: 1 }}>
          <Skeleton width="65%" height={13} />
          <div style={{ marginTop: 5 }}><Skeleton width="45%" height={11} /></div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        <Skeleton width={72} height={20} radius="pill" />
        <Skeleton width={56} height={20} radius="pill" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ padding: "8px 10px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-sm)" }}>
            <Skeleton width="50%" height={10} />
            <div style={{ marginTop: 5 }}><Skeleton width="70%" height={16} /></div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <Skeleton width="50%" height={30} radius="sm" />
        <Skeleton width="50%" height={30} radius="sm" />
      </div>
    </div>
  );
}

/* ── Pre-built: stats bar ── */
export function SkeletonStatsBar() {
  return (
    <div className={styles.statsBar}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} className={styles.statCell}>
          <Skeleton width={48} height={26} />
          <Skeleton width={72} height={11} />
        </div>
      ))}
    </div>
  );
}
