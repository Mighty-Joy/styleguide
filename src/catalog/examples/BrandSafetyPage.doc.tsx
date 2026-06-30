"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type RiskLevel = "Low Risk" | "Medium Risk" | "High Risk" | "Scanning" | "Failed";
type Platform  = "Instagram" | "TikTok" | "YouTube";

type Scan = {
  id:        number;
  creator:   string;
  initials:  string;
  handle:    string;
  platform:  Platform;
  risk:      RiskLevel;
  scannedAt: string;
  flags:     string[];
  posts:     number;
};

/* ── seed data ──────────────────────────────────────────── */
const SCANS: Scan[] = [
  {
    id: 1, creator: "Priya Nair",  initials: "PN", handle: "@priya.glows",     platform: "Instagram",
    risk: "Low Risk",    scannedAt: "2 hours ago",  flags: [],                              posts: 142,
  },
  {
    id: 2, creator: "Leo Park",    initials: "LP", handle: "@leopark.ttk",     platform: "TikTok",
    risk: "Medium Risk", scannedAt: "5 hours ago",  flags: ["Profanity (3)", "Violence (1)"], posts: 318,
  },
  {
    id: 3, creator: "Maya Chen",   initials: "MC", handle: "@mayabeautyco",    platform: "Instagram",
    risk: "Low Risk",    scannedAt: "1 day ago",    flags: [],                              posts: 89,
  },
  {
    id: 4, creator: "Amir Hassan", initials: "AH", handle: "@amirh.creates",   platform: "YouTube",
    risk: "High Risk",   scannedAt: "3 days ago",   flags: ["Hate speech (2)", "Adult content (5)", "Profanity (8)"], posts: 54,
  },
  {
    id: 5, creator: "Sofia Ruiz",  initials: "SR", handle: "@sofiaruizbeauty", platform: "Instagram",
    risk: "Scanning",    scannedAt: "Just now",     flags: [],                              posts: 0,
  },
];

/* ── risk config ────────────────────────────────────────── */
const RISK_CONFIG: Record<RiskLevel, { color: string; bg: string; icon: string }> = {
  "Low Risk":    { color: "#10B981", bg: "#ECFDF5", icon: "✓" },
  "Medium Risk": { color: "#F59E0B", bg: "#FFFBEB", icon: "!" },
  "High Risk":   { color: "#EF4444", bg: "#FEF2F2", icon: "✕" },
  "Scanning":    { color: "#3B82F6", bg: "#EFF6FF", icon: "⟳" },
  "Failed":      { color: "#6B7280", bg: "#F3F4F6", icon: "?" },
};

/* ── summary stats ──────────────────────────────────────── */
const STATS = [
  { label: "Total scanned", value: "5",  color: "var(--sd-font-primary)" },
  { label: "Low Risk",      value: "2",  color: "#10B981" },
  { label: "Medium Risk",   value: "1",  color: "#F59E0B" },
  { label: "High Risk",     value: "1",  color: "#EF4444" },
];

/* ── RiskBadge ──────────────────────────────────────────── */
function RiskBadge({ level }: { level: RiskLevel }) {
  const cfg = RISK_CONFIG[level];
  return (
    <span style={{
      display:      "inline-flex",
      alignItems:   "center",
      gap:          5,
      fontFamily:   "var(--sd-font)",
      fontSize:     11,
      fontWeight:   600,
      color:        cfg.color,
      background:   cfg.bg,
      borderRadius: 100,
      padding:      "3px 10px",
      whiteSpace:   "nowrap",
    }}>
      <span style={{ fontSize: 10 }}>{cfg.icon}</span>
      {level}
    </span>
  );
}

/* ── ScanRow ────────────────────────────────────────────── */
function ScanRow({ scan }: { scan: Scan }) {
  return (
    <tr style={{ borderBottom: "1px solid var(--sd-border-default)" }}>
      {/* creator */}
      <td style={{ padding: "12px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size="sm" name={scan.creator} initials={scan.initials} />
          <div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>
              {scan.creator}
            </div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
              {scan.handle}
            </div>
          </div>
        </div>
      </td>

      {/* platform */}
      <td style={{ padding: "12px 12px" }}>
        <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-secondary)" }}>
          {scan.platform}
        </span>
      </td>

      {/* risk */}
      <td style={{ padding: "12px 12px" }}>
        <RiskBadge level={scan.risk} />
      </td>

      {/* flags */}
      <td style={{ padding: "12px 12px", maxWidth: 240 }}>
        {scan.flags.length === 0 ? (
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>None</span>
        ) : (
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {scan.flags.map(f => (
              <span key={f} style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     10,
                fontWeight:   500,
                color:        "#EF4444",
                background:   "#FEF2F2",
                border:       "1px solid #EF444430",
                borderRadius: 4,
                padding:      "2px 7px",
                whiteSpace:   "nowrap",
              }}>
                {f}
              </span>
            ))}
          </div>
        )}
      </td>

      {/* scanned at */}
      <td style={{ padding: "12px 12px" }}>
        <span style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
          {scan.scannedAt}
        </span>
      </td>

      {/* actions */}
      <td style={{ padding: "12px 16px" }}>
        <Button variant="secondary" size="sm">View report</Button>
      </td>
    </tr>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function BrandSafetyPageDemo() {
  const [filter, setFilter] = useState<RiskLevel | "All">("All");

  const visible = filter === "All"
    ? SCANS
    : SCANS.filter(s => s.risk === filter);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, border: "1px solid var(--sd-border-default)", borderRadius: 10, overflow: "hidden" }}>
      {/* header */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "14px 16px",
        background:     "var(--sd-bg-tertiary)",
        borderBottom:   "1px solid var(--sd-border-default)",
        gap:            12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>🛡</span>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            Brand Safety
          </span>
        </div>
        <Button variant="primary" size="sm">+ New scan</Button>
      </div>

      {/* stats row */}
      <div style={{
        display:      "flex",
        gap:          0,
        borderBottom: "1px solid var(--sd-border-default)",
        background:   "var(--sd-bg-secondary)",
      }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{
            flex:         1,
            padding:      "12px 16px",
            borderRight:  i < STATS.length - 1 ? "1px solid var(--sd-border-default)" : "none",
            display:      "flex",
            flexDirection:"column",
            gap:          2,
          }}>
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              {s.label}
            </span>
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 22, fontWeight: 700, color: s.color }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>

      {/* filter pills */}
      <div style={{
        display:      "flex",
        gap:          6,
        padding:      "10px 16px",
        borderBottom: "1px solid var(--sd-border-default)",
        background:   "var(--sd-bg-tertiary)",
        flexWrap:     "wrap",
      }}>
        {(["All", "Low Risk", "Medium Risk", "High Risk"] as const).map(f => {
          const active = filter === f;
          const cfg = f === "All" ? null : RISK_CONFIG[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                fontFamily:   "var(--sd-font)",
                fontSize:     11,
                fontWeight:   active ? 600 : 500,
                padding:      "4px 12px",
                borderRadius: 100,
                border:       `1px solid ${active && cfg ? cfg.color : "var(--sd-border-default)"}`,
                background:   active && cfg ? cfg.bg : active ? "var(--sd-bg-secondary)" : "transparent",
                color:        active && cfg ? cfg.color : active ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                cursor:       "pointer",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* table */}
      <div style={{ overflowX: "auto", background: "var(--sd-bg-secondary)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--sd-bg-tertiary)", borderBottom: "1px solid var(--sd-border-default)" }}>
              {["Creator", "Platform", "Risk level", "Flags", "Scanned", ""].map(h => (
                <th key={h} style={{
                  padding:    "8px 12px",
                  fontFamily: "var(--sd-font)",
                  fontSize:   11,
                  fontWeight: 600,
                  color:      "var(--sd-font-tertiary)",
                  textAlign:  "left",
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(s => <ScanRow key={s.id} scan={s} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "brand-safety-page",
  title:       "Brand Safety Page",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Creator risk scan dashboard with summary stats and filterable scan results — maps to BrandSafetyPage.tsx.",
  description: "Shows all brand safety scans for the account. Summary tiles for total / low / medium / high risk. Filterable table with creator identity, platform, risk badge, flag chips (e.g. Profanity, Hate speech), scan timestamp, and a link to the full report. Maps to BrandSafetyPage.tsx in the app.",
  demos: [
    {
      title:  "Aura Labs Brand Safety",
      render: () => <BrandSafetyPageDemo />,
      block:  true,
      plain:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "scans",     type: "Scan[]",  required: true,  description: "Array of creator scan results with risk level and flag categories." },
        { name: "onNewScan", type: "() => void", required: false, description: "Opens the new scan modal (NewScanModal in the app)." },
      ],
    },
  ],
};

export default doc;
