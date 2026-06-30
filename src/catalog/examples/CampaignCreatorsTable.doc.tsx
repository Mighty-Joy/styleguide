"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type DealStatus =
  | "invited"
  | "negotiating"
  | "contract_sent"
  | "active"
  | "completed"
  | "declined";

type Platform = "instagram" | "tiktok" | "youtube";

type CampaignCreator = {
  id:          number;
  name:        string;
  initials:    string;
  handle:      string;
  platform:    Platform;
  followers:   string;
  dealStatus:  DealStatus;
  dealAmount:  string | null;
  deliverables:number;
  contentDone: number;
  tags:        string[];
};

/* ── data ───────────────────────────────────────────────── */
const ALL_CREATORS: CampaignCreator[] = [
  {
    id: 1, name: "Priya Nair",    initials: "PN", handle: "@priya.glows",     platform: "instagram",
    followers: "142K", dealStatus: "active",        dealAmount: "$3,500", deliverables: 3, contentDone: 2, tags: ["beauty", "lifestyle"],
  },
  {
    id: 2, name: "Maya Chen",     initials: "MC", handle: "@mayabeautyco",    platform: "instagram",
    followers: "89K",  dealStatus: "completed",     dealAmount: "$2,200", deliverables: 2, contentDone: 2, tags: ["beauty"],
  },
  {
    id: 3, name: "Leo Park",      initials: "LP", handle: "@leopark.ttk",     platform: "tiktok",
    followers: "310K", dealStatus: "contract_sent", dealAmount: "$1,800", deliverables: 1, contentDone: 0, tags: ["fitness"],
  },
  {
    id: 4, name: "Sofia Ruiz",    initials: "SR", handle: "@sofiaruizbeauty", platform: "instagram",
    followers: "178K", dealStatus: "negotiating",   dealAmount: "$4,000", deliverables: 4, contentDone: 0, tags: ["beauty", "wellness"],
  },
  {
    id: 5, name: "Amir Hassan",   initials: "AH", handle: "@amirh.creates",   platform: "youtube",
    followers: "54K",  dealStatus: "invited",       dealAmount: null,     deliverables: 0, contentDone: 0, tags: ["lifestyle"],
  },
  {
    id: 6, name: "Zoe Williams",  initials: "ZW", handle: "@zoeglowup",       platform: "tiktok",
    followers: "205K", dealStatus: "declined",      dealAmount: null,     deliverables: 0, contentDone: 0, tags: ["beauty"],
  },
];

type Tab = "all" | "active" | "completed" | "invited";

const TABS: { id: Tab; label: string }[] = [
  { id: "all",       label: "All"       },
  { id: "active",    label: "Active"    },
  { id: "completed", label: "Completed" },
  { id: "invited",   label: "Invited"   },
];

const DEAL_STATUS: Record<DealStatus, { label: string; tone: string; color: string }> = {
  invited:       { label: "Invited",        tone: "blue",   color: "#3B82F6" },
  negotiating:   { label: "Negotiating",    tone: "orange", color: "#F59E0B" },
  contract_sent: { label: "Contract sent",  tone: "purple", color: "#8B5CF6" },
  active:        { label: "Active",         tone: "green",  color: "#10B981" },
  completed:     { label: "Completed",      tone: "gray",   color: "#6B7280" },
  declined:      { label: "Declined",       tone: "red",    color: "#EF4444" },
};

const PLATFORM_TONE: Record<Platform, string> = {
  instagram: "pink",
  tiktok:    "blue",
  youtube:   "red",
};

/* ── FilteredCreators ───────────────────────────────────── */
function filterCreators(creators: CampaignCreator[], tab: Tab): CampaignCreator[] {
  if (tab === "all") return creators;
  if (tab === "active")    return creators.filter(c => c.dealStatus === "active" || c.dealStatus === "negotiating" || c.dealStatus === "contract_sent");
  if (tab === "completed") return creators.filter(c => c.dealStatus === "completed");
  if (tab === "invited")   return creators.filter(c => c.dealStatus === "invited" || c.dealStatus === "declined");
  return creators;
}

/* ── ProgressBar ────────────────────────────────────────── */
function MiniProgress({ done, total }: { done: number; total: number }) {
  if (total === 0) return <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>—</span>;
  const pct = Math.round((done / total) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{
        width:        64,
        height:       4,
        borderRadius: 2,
        background:   "var(--sd-border-default)",
        overflow:     "hidden",
      }}>
        <div style={{
          width:        `${pct}%`,
          height:       "100%",
          background:   pct === 100 ? "#10B981" : "#3B82F6",
          borderRadius: 2,
          transition:   "width 0.3s",
        }} />
      </div>
      <span style={{
        fontFamily: "var(--sd-font)",
        fontSize:   11,
        color:      "var(--sd-font-tertiary)",
        whiteSpace: "nowrap",
      }}>
        {done}/{total}
      </span>
    </div>
  );
}

/* ── CreatorRow ─────────────────────────────────────────── */
function CreatorRow({ creator }: { creator: CampaignCreator }) {
  const st = DEAL_STATUS[creator.dealStatus];
  return (
    <tr style={{ borderBottom: "1px solid var(--sd-border-default)" }}>
      {/* creator */}
      <td style={{ padding: "10px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar size="sm" name={creator.name} initials={creator.initials} />
          <div>
            <div style={{
              fontFamily: "var(--sd-font)",
              fontSize:   13,
              fontWeight: 600,
              color:      "var(--sd-font-primary)",
            }}>
              {creator.name}
            </div>
            <div style={{
              fontFamily: "var(--sd-font)",
              fontSize:   11,
              color:      "var(--sd-font-tertiary)",
            }}>
              {creator.handle}
            </div>
          </div>
        </div>
      </td>

      {/* platform + followers */}
      <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Badge label={creator.platform} tone={PLATFORM_TONE[creator.platform] as any} variant="solid" size="sm" />
          <span style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "var(--sd-font-tertiary)",
          }}>
            {creator.followers}
          </span>
        </div>
      </td>

      {/* deal status */}
      <td style={{ padding: "10px 12px" }}>
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     11,
          fontWeight:   600,
          color:        st.color,
          background:   `${st.color}18`,
          borderRadius: 100,
          padding:      "3px 10px",
          whiteSpace:   "nowrap",
        }}>
          {st.label}
        </span>
      </td>

      {/* deal amount */}
      <td style={{ padding: "10px 12px", textAlign: "right" }}>
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   13,
          fontWeight: 600,
          color:      creator.dealAmount ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
        }}>
          {creator.dealAmount ?? "—"}
        </span>
      </td>

      {/* content progress */}
      <td style={{ padding: "10px 12px" }}>
        <MiniProgress done={creator.contentDone} total={creator.deliverables} />
      </td>

      {/* tags */}
      <td style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {creator.tags.map(t => (
            <span key={t} style={{
              fontFamily:   "var(--sd-font)",
              fontSize:     10,
              fontWeight:   500,
              color:        "var(--sd-font-secondary)",
              background:   "var(--sd-bg-tertiary)",
              border:       "1px solid var(--sd-border-default)",
              borderRadius: 4,
              padding:      "1px 6px",
            }}>
              {t}
            </span>
          ))}
        </div>
      </td>

      {/* actions */}
      <td style={{ padding: "10px 16px" }}>
        <Button variant="secondary" size="sm">View deal</Button>
      </td>
    </tr>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function CampaignCreatorsTableDemo() {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");

  const visible = filterCreators(ALL_CREATORS, tab).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.handle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* toolbar */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "12px 16px",
        borderBottom:   "1px solid var(--sd-border-default)",
        background:     "var(--sd-bg-tertiary)",
        gap:            12,
      }}>
        {/* tabs */}
        <div style={{ display: "flex", gap: 2 }}>
          {TABS.map(t => {
            const count = filterCreators(ALL_CREATORS, t.id).length;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  fontFamily:   "var(--sd-font)",
                  fontSize:     12,
                  fontWeight:   active ? 600 : 500,
                  padding:      "5px 12px",
                  borderRadius: 6,
                  border:       "none",
                  background:   active ? "var(--sd-bg-secondary)" : "transparent",
                  color:        active ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                  cursor:       "pointer",
                  boxShadow:    active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  display:      "flex",
                  alignItems:   "center",
                  gap:          6,
                }}
              >
                {t.label}
                <span style={{
                  fontFamily:   "var(--sd-font)",
                  fontSize:     10,
                  fontWeight:   600,
                  color:        active ? "var(--sd-font-secondary)" : "var(--sd-font-tertiary)",
                  background:   "var(--sd-bg-tertiary)",
                  borderRadius: 100,
                  padding:      "1px 6px",
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* search + add */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search creators…"
            style={{
              fontFamily:   "var(--sd-font)",
              fontSize:     12,
              color:        "var(--sd-font-primary)",
              background:   "var(--sd-bg-secondary)",
              border:       "1px solid var(--sd-border-default)",
              borderRadius: 6,
              padding:      "6px 10px",
              width:        160,
              outline:      "none",
            }}
          />
          <Button variant="primary" size="sm">+ Add creator</Button>
        </div>
      </div>

      {/* table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width:           "100%",
          borderCollapse: "collapse",
          background:      "var(--sd-bg-secondary)",
        }}>
          <thead>
            <tr style={{
              background:   "var(--sd-bg-tertiary)",
              borderBottom: "1px solid var(--sd-border-default)",
            }}>
              {["Creator", "Platform", "Deal status", "Amount", "Content", "Tags", ""].map(h => (
                <th key={h} style={{
                  padding:    "8px 12px",
                  fontFamily: "var(--sd-font)",
                  fontSize:   11,
                  fontWeight: 600,
                  color:      "var(--sd-font-tertiary)",
                  textAlign:  h === "Amount" ? "right" : "left",
                  whiteSpace: "nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} style={{
                  padding:   "40px",
                  textAlign: "center",
                  fontFamily:"var(--sd-font)",
                  fontSize:  13,
                  color:     "var(--sd-font-tertiary)",
                }}>
                  No creators match your filter
                </td>
              </tr>
            ) : (
              visible.map(c => <CreatorRow key={c.id} creator={c} />)
            )}
          </tbody>
        </table>
      </div>

      {/* footer */}
      <div style={{
        padding:      "10px 16px",
        borderTop:    "1px solid var(--sd-border-default)",
        background:   "var(--sd-bg-tertiary)",
        fontFamily:   "var(--sd-font)",
        fontSize:     12,
        color:        "var(--sd-font-tertiary)",
      }}>
        {visible.length} of {ALL_CREATORS.length} creators
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "campaign-creators-table",
  title:       "Campaign Creators Table",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Campaign-scoped creator list with deal status tabs, search, and per-row content progress — maps to CampaignCreatorsTable.tsx.",
  description: "Shows all creators attached to a campaign with their deal lifecycle status, amount, content completion progress bar, and tags. Tab filters (All / Active / Completed / Invited) mirror the CampaignDealStatus enum. Maps to the CampaignCreatorsTable + CreatorsTable composite in the app.",
  demos: [
    {
      title:  "Summer Glow Campaign",
      render: () => <CampaignCreatorsTableDemo />,
      block:  true,
      plain:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "creators",    type: "CampaignCreator[]", required: true,  description: "Creators with deal status, platform, amount, and content progress." },
        { name: "activeTab",   type: "Tab",               required: false, description: "Active filter tab: all | active | completed | invited." },
        { name: "onAddCreator",type: "() => void",        required: false, description: "Opens the add-creator flow (CreatorSearch + AddCreatorsToCampaignModal)." },
      ],
    },
  ],
};

export default doc;
