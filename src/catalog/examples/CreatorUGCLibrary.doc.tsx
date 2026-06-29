"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconDownload,
  IconCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconPlayerPlay,
  IconPhoto,
  IconLayoutGrid,
  IconList,
  IconSearch,
  IconX,
  IconShieldCheck,
  IconClock,
  IconFilter,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type AssetStatus = "approved" | "pending" | "rejected" | "live";
type AssetPlatform = "instagram" | "tiktok" | "youtube";
type AssetType = "reel" | "story" | "video" | "image" | "carousel";
type ViewMode = "grid" | "list";

interface UGCAsset {
  id: string;
  creatorName: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  campaign: string;
  platform: AssetPlatform;
  type: AssetType;
  status: AssetStatus;
  gradient: string;
  caption: string;
  submittedDate: string;
  usageExpiry?: string;
  licensed: boolean;
}

/* ---- data ---- */
const ASSETS: UGCAsset[] = [
  { id: "a1",  creatorName: "Priya Nair",   creatorInitials: "PN", creatorTone: "green",     campaign: "Summer Glow", platform: "instagram", type: "reel",     status: "live",     gradient: "linear-gradient(135deg,#fde68a,#f59e0b)", caption: "5-step morning routine #skintok",         submittedDate: "Jun 15", usageExpiry: "Dec 15", licensed: true  },
  { id: "a2",  creatorName: "Diego Santos", creatorInitials: "DS", creatorTone: "orange",    campaign: "Summer Glow", platform: "tiktok",    type: "video",    status: "live",     gradient: "linear-gradient(135deg,#a5f3fc,#0ea5e9)", caption: "Testing viral SPF products",              submittedDate: "Jun 16", usageExpiry: "Dec 16", licensed: true  },
  { id: "a3",  creatorName: "Hana Kim",     creatorInitials: "HK", creatorTone: "pink",      campaign: "Summer Glow", platform: "instagram", type: "carousel", status: "approved", gradient: "linear-gradient(135deg,#fda4af,#e11d48)", caption: "Ingredient breakdown: niacinamide vs C",  submittedDate: "Jun 18", usageExpiry: "Dec 18", licensed: true  },
  { id: "a4",  creatorName: "Priya Nair",   creatorInitials: "PN", creatorTone: "green",     campaign: "Summer Glow", platform: "instagram", type: "story",    status: "approved", gradient: "linear-gradient(135deg,#bbf7d0,#22c55e)", caption: "Unboxing the Aura Labs kit",             submittedDate: "Jun 19",                        licensed: false },
  { id: "a5",  creatorName: "Marcus Webb",  creatorInitials: "MW", creatorTone: "purple",    campaign: "FitLife Q2",  platform: "tiktok",    type: "video",    status: "pending",  gradient: "linear-gradient(135deg,#ddd6fe,#7c3aed)", caption: "Morning routine ft. FitLife protein",    submittedDate: "Jun 20",                        licensed: false },
  { id: "a6",  creatorName: "Aisha Obi",    creatorInitials: "AO", creatorTone: "turquoise", campaign: "FitLife Q2",  platform: "youtube",   type: "video",    status: "pending",  gradient: "linear-gradient(135deg,#cffafe,#06b6d4)", caption: "60-day fitness transformation video",    submittedDate: "Jun 21",                        licensed: false },
  { id: "a7",  creatorName: "Diego Santos", creatorInitials: "DS", creatorTone: "orange",    campaign: "FitLife Q2",  platform: "instagram", type: "reel",     status: "rejected", gradient: "linear-gradient(135deg,#fed7aa,#ea580c)", caption: "Gym day ft. FitLife shake",              submittedDate: "Jun 14",                        licensed: false },
  { id: "a8",  creatorName: "Hana Kim",     creatorInitials: "HK", creatorTone: "pink",      campaign: "Summer Glow", platform: "instagram", type: "image",    status: "approved", gradient: "linear-gradient(135deg,#e0e7ff,#6366f1)", caption: "Flatlay: the Glow serum lineup",         submittedDate: "Jun 17", usageExpiry: "Dec 17", licensed: true  },
];

const STATUS_META: Record<AssetStatus, { label: string; tone: keyof typeof TONES; Icon: React.ElementType }> = {
  live:     { label: "Live",     tone: "green",  Icon: IconCheck       },
  approved: { label: "Approved", tone: "blue",   Icon: IconCheck       },
  pending:  { label: "Pending",  tone: "yellow", Icon: IconClock       },
  rejected: { label: "Rejected", tone: "red",    Icon: IconX           },
};

const PLATFORM_ICON: Record<AssetPlatform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};

const TYPE_ICON: Record<AssetType, React.ElementType> = {
  reel: IconPlayerPlay, story: IconPhoto, video: IconPlayerPlay,
  image: IconPhoto, carousel: IconLayoutGrid,
};

const CAMPAIGNS = ["All campaigns", "Summer Glow", "FitLife Q2"];
const STATUSES  = ["All", "live", "approved", "pending", "rejected"] as const;

/* ---- Demo ---- */
function Demo() {
  const [campaign, setCampaign]   = useState("All campaigns");
  const [status,   setStatus]     = useState<typeof STATUSES[number]>("All");
  const [viewMode, setViewMode]   = useState<ViewMode>("grid");
  const [selected, setSelected]   = useState<Set<string>>(new Set());
  const [search,   setSearch]     = useState("");

  let visible = ASSETS
    .filter((a) => campaign === "All campaigns" || a.campaign === campaign)
    .filter((a) => status   === "All"           || a.status   === status)
    .filter((a) => !search  || a.caption.toLowerCase().includes(search.toLowerCase()) || a.creatorName.toLowerCase().includes(search.toLowerCase()));

  function toggleSelect(id: string) {
    setSelected((ss) => {
      const next = new Set(ss);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectAll()   { setSelected(new Set(visible.map((a) => a.id))); }
  function clearSelect() { setSelected(new Set()); }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>UGC Library</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{ASSETS.length} assets · {ASSETS.filter((a) => a.licensed).length} licensed for ads</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {selected.size > 0 && (
            <Button variant="primary" size="sm" leftIcon={<IconDownload size={12} />}>
              Download {selected.size}
            </Button>
          )}
          <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 7, overflow: "hidden", display: "flex" }}>
            {([
              { mode: "grid" as ViewMode, Icon: IconLayoutGrid },
              { mode: "list" as ViewMode, Icon: IconList },
            ]).map(({ mode, Icon }) => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{ padding: "6px 8px", background: viewMode === mode ? "#111" : "transparent", border: "none", cursor: "pointer", display: "flex" }}>
                <Icon size={13} color={viewMode === mode ? "#fff" : "var(--sd-font-tertiary, #999)"} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: 160 }}>
          <IconSearch size={12} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: "var(--sd-font-tertiary, #999)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assets..."
            style={{ width: "100%", height: 32, paddingLeft: 28, paddingRight: 10, borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none" }}
          />
        </div>
        {/* Campaign */}
        <select value={campaign} onChange={(e) => setCampaign(e.target.value)} style={{ height: 32, padding: "0 8px", borderRadius: 7, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, fontFamily: "inherit", outline: "none" }}>
          {CAMPAIGNS.map((c) => <option key={c}>{c}</option>)}
        </select>
        {/* Status tabs */}
        <div style={{ display: "flex", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 7, overflow: "hidden" }}>
          {STATUSES.map((s) => (
            <button key={s} onClick={() => setStatus(s)} style={{ padding: "5px 10px", background: status === s ? "#111" : "transparent", border: "none", borderRight: "1px solid var(--sd-border-default, #e5e7eb)", cursor: "pointer", fontSize: 10, fontWeight: 600, color: status === s ? "#fff" : "var(--sd-font-tertiary, #999)", textTransform: "capitalize" }}>
              {s}
            </button>
          ))}
        </div>
        {visible.length > 0 && (
          <button onClick={selected.size === visible.length ? clearSelect : selectAll} style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}>
            {selected.size === visible.length ? "Deselect all" : "Select all"}
          </button>
        )}
      </div>

      {/* Grid view */}
      {viewMode === "grid" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {visible.map((asset) => {
            const PIcon = PLATFORM_ICON[asset.platform];
            const TIcon = TYPE_ICON[asset.type];
            const { label, tone } = STATUS_META[asset.status];
            const isSel = selected.has(asset.id);

            return (
              <div
                key={asset.id}
                onClick={() => toggleSelect(asset.id)}
                style={{ borderRadius: 10, overflow: "hidden", cursor: "pointer", border: `2px solid ${isSel ? "#111" : "transparent"}`, position: "relative" }}
              >
                {/* Thumbnail */}
                <div style={{ background: asset.gradient, aspectRatio: "1", position: "relative" }}>
                  {/* Select checkbox */}
                  <div style={{ position: "absolute", top: 6, left: 6, width: 18, height: 18, borderRadius: 5, border: `2px solid ${isSel ? "#111" : "rgba(255,255,255,0.7)"}`, background: isSel ? "#111" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                    {isSel && <IconCheck size={10} color="#fff" />}
                  </div>
                  {/* Platform + type */}
                  <div style={{ position: "absolute", top: 6, right: 6, display: "flex", gap: 3 }}>
                    <div style={{ width: 20, height: 20, borderRadius: 5, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <PIcon size={11} color="#fff" />
                    </div>
                  </div>
                  {/* Play for video */}
                  {(asset.type === "reel" || asset.type === "video") && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconPlayerPlay size={12} color="#fff" fill="#fff" />
                      </div>
                    </div>
                  )}
                  {/* Licensed shield */}
                  {asset.licensed && (
                    <div style={{ position: "absolute", bottom: 6, right: 6 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, background: TONES.blue.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconShieldCheck size={10} style={{ color: TONES.blue.text }} />
                      </div>
                    </div>
                  )}
                </div>
                {/* Footer */}
                <div style={{ padding: "7px 8px", background: "#fff" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                    <Avatar initials={asset.creatorInitials} tone={asset.creatorTone} size="sm" />
                    <span style={{ fontSize: 10, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{asset.creatorName}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Badge label={label} tone={tone} size="sm" />
                    {asset.usageExpiry && <span style={{ fontSize: 9, color: "var(--sd-font-tertiary, #999)" }}>exp {asset.usageExpiry}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {viewMode === "list" && (
        <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "var(--sd-bg-secondary, #f9f9f9)", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
                {["", "Asset", "Creator", "Campaign", "Platform", "Submitted", "Licensed", "Status"].map((h) => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((asset, i) => {
                const PIcon = PLATFORM_ICON[asset.platform];
                const { label, tone } = STATUS_META[asset.status];
                const isSel = selected.has(asset.id);
                return (
                  <tr key={asset.id} onClick={() => toggleSelect(asset.id)} style={{ borderBottom: i < visible.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none", background: isSel ? "rgba(0,0,0,0.025)" : "transparent", cursor: "pointer" }}>
                    <td style={{ padding: "9px 12px" }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${isSel ? "#111" : "var(--sd-border-medium, #d1d5db)"}`, background: isSel ? "#111" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {isSel && <IconCheck size={9} color="#fff" />}
                      </div>
                    </td>
                    <td style={{ padding: "9px 12px" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 6, background: asset.gradient }} />
                    </td>
                    <td style={{ padding: "9px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <Avatar initials={asset.creatorInitials} tone={asset.creatorTone} size="sm" />
                        <span style={{ fontSize: 11, fontWeight: 700 }}>{asset.creatorName}</span>
                      </div>
                    </td>
                    <td style={{ padding: "9px 12px", fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>{asset.campaign}</td>
                    <td style={{ padding: "9px 12px" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--sd-bg-tertiary, #f1f1f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <PIcon size={12} style={{ color: "var(--sd-font-secondary, #555)" }} />
                      </div>
                    </td>
                    <td style={{ padding: "9px 12px", fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{asset.submittedDate}</td>
                    <td style={{ padding: "9px 12px" }}>
                      {asset.licensed
                        ? <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: TONES.blue.text }}><IconShieldCheck size={12} />Licensed</div>
                        : <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>—</span>
                      }
                    </td>
                    <td style={{ padding: "9px 12px" }}><Badge label={label} tone={tone} size="sm" dot /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-ugc-library",
  title: "CreatorUGCLibrary",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand UGC asset library — grid and list views with multi-select, filter by campaign/status, licensed-for-ads indicator, and bulk download.",
  description:
    "The brand's central library of all creator-submitted content across campaigns. Header: asset count, licensed-for-ads count, conditional bulk-download button (appears when items selected), grid/list toggle. Filter bar: search by creator/caption, campaign dropdown, status tabs (All/Live/Approved/Pending/Rejected), Select all. Grid view: 4-column aspect-ratio-1 tiles — gradient placeholder, platform icon, play button (video/reel), blue shield (licensed), select checkbox; footer shows creator avatar, status badge, usage expiry date. List view: table rows with thumbnail swatch, creator avatar, campaign, platform icon, submitted date, licensed indicator, status badge. Multi-select highlights tiles with a border and toggles the bulk-download button. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator UGC library",
      description: "Click tiles/rows to select. Use the filter bar to narrow by campaign or status. Toggle grid/list with the view switcher top-right.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
