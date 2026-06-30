"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type CreatorList = {
  id:          string;
  name:        string;
  description: string;
  count:       number;
  updatedAt:   string;
  color:       string;
  tags:        string[];
  creators:    { initials: string; name: string }[];
};

/* ── seed ───────────────────────────────────────────────── */
const LISTS: CreatorList[] = [
  {
    id:          "sg-shortlist",
    name:        "Summer Glow Shortlist",
    description: "Top candidates for the Aura Labs summer campaign",
    count:       12,
    updatedAt:   "Jun 28",
    color:       "#6366F1",
    tags:        ["Beauty", "Lifestyle"],
    creators:    [
      { initials: "PN", name: "Priya Nair"  },
      { initials: "MC", name: "Maya Chen"   },
      { initials: "LP", name: "Leo Park"    },
      { initials: "SR", name: "Sofia Ruiz"  },
    ],
  },
  {
    id:          "ig-mega",
    name:        "Instagram Mega Creators",
    description: "1M+ follower Instagram accounts for brand amplification",
    count:       8,
    updatedAt:   "Jun 20",
    color:       "#EC4899",
    tags:        ["Instagram", "Mega"],
    creators:    [
      { initials: "AH", name: "Amir Hassan" },
      { initials: "ZW", name: "Zoe Williams"},
      { initials: "KM", name: "Kai Matsuda" },
    ],
  },
  {
    id:          "ttk-nano",
    name:        "TikTok Nano Creators",
    description: "High-engagement nano creators for authentic UGC content",
    count:       34,
    updatedAt:   "Jun 15",
    color:       "#10B981",
    tags:        ["TikTok", "UGC", "Nano"],
    creators:    [
      { initials: "RL", name: "Riya Lal"    },
      { initials: "BK", name: "Ben Kim"     },
      { initials: "TN", name: "Tara Nakamura"},
      { initials: "JA", name: "Jules Adkins"},
    ],
  },
  {
    id:          "discovery-q3",
    name:        "Q3 Discovery Pool",
    description: "Creators scouted for Q3 campaigns — not yet contacted",
    count:       56,
    updatedAt:   "Jun 10",
    color:       "#F59E0B",
    tags:        ["Discovery", "Q3"],
    creators:    [
      { initials: "NV", name: "Nina Vargas" },
      { initials: "CB", name: "Chris Bao"   },
    ],
  },
];

/* ── ListCard ───────────────────────────────────────────── */
function ListCard({ list, onOpen }: { list: CreatorList; onOpen: (id: string) => void }) {
  return (
    <div
      onClick={() => onOpen(list.id)}
      style={{
        display:      "flex",
        flexDirection:"column",
        gap:          12,
        padding:      "16px",
        background:   "var(--sd-bg-secondary)",
        border:       "1px solid var(--sd-border-default)",
        borderRadius: 12,
        cursor:       "pointer",
        transition:   "border-color 0.12s ease, box-shadow 0.12s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = list.color;
        (e.currentTarget as HTMLDivElement).style.boxShadow  = `0 0 0 3px ${list.color}18`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--sd-border-default)";
        (e.currentTarget as HTMLDivElement).style.boxShadow  = "none";
      }}
    >
      {/* top: color dot + name + count */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width:        32,
          height:       32,
          borderRadius: 8,
          background:   `${list.color}20`,
          border:       `1.5px solid ${list.color}40`,
          display:      "flex",
          alignItems:   "center",
          justifyContent:"center",
          flexShrink:   0,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: list.color }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily:   "var(--sd-font)",
            fontSize:     14,
            fontWeight:   700,
            color:        "var(--sd-font-primary)",
            whiteSpace:   "nowrap",
            overflow:     "hidden",
            textOverflow: "ellipsis",
          }}>
            {list.name}
          </div>
        </div>
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     11,
          fontWeight:   700,
          color:        list.color,
          background:   `${list.color}15`,
          border:       `1px solid ${list.color}30`,
          borderRadius: 100,
          padding:      "2px 9px",
          flexShrink:   0,
        }}>
          {list.count}
        </span>
      </div>

      {/* description */}
      <div style={{
        fontFamily: "var(--sd-font)",
        fontSize:   12,
        color:      "var(--sd-font-tertiary)",
        lineHeight: "1.5",
      }}>
        {list.description}
      </div>

      {/* creator avatars */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: -4 }}>
          {list.creators.slice(0, 4).map((c, i) => (
            <div key={c.initials} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 10 - i }}>
              <Avatar size="sm" name={c.name} initials={c.initials} />
            </div>
          ))}
          {list.count > 4 && (
            <div style={{
              marginLeft:     -8,
              width:          28,
              height:         28,
              borderRadius:   "50%",
              background:     "var(--sd-bg-tertiary)",
              border:         "2px solid var(--sd-bg-secondary)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontFamily:     "var(--sd-font)",
              fontSize:       10,
              fontWeight:     700,
              color:          "var(--sd-font-tertiary)",
              zIndex:         5,
            }}>
              +{list.count - 4}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {list.tags.map(t => (
            <span key={t} style={{
              fontFamily:   "var(--sd-font)",
              fontSize:     10,
              fontWeight:   500,
              color:        "var(--sd-font-tertiary)",
              background:   "var(--sd-bg-tertiary)",
              border:       "1px solid var(--sd-border-default)",
              borderRadius: 4,
              padding:      "2px 7px",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* footer */}
      <div style={{
        borderTop:  "1px solid var(--sd-border-default)",
        marginTop:  4,
        paddingTop: 10,
        fontFamily: "var(--sd-font)",
        fontSize:   11,
        color:      "var(--sd-font-tertiary)",
      }}>
        Updated {list.updatedAt}
      </div>
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function ListsPageDemo() {
  const [search, setSearch] = useState("");

  const visible = LISTS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 16, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            Creator Lists
          </div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
            {LISTS.length} lists · {LISTS.reduce((a, l) => a + l.count, 0)} creators total
          </div>
        </div>
        <Button variant="primary" size="sm">+ New list</Button>
      </div>

      {/* search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search lists…"
        style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     13,
          color:        "var(--sd-font-primary)",
          background:   "var(--sd-bg-secondary)",
          border:       "1px solid var(--sd-border-default)",
          borderRadius: 8,
          padding:      "9px 14px",
          width:        "100%",
          outline:      "none",
        }}
      />

      {/* grid */}
      <div style={{
        display:               "grid",
        gridTemplateColumns:   "repeat(auto-fill, minmax(300px, 1fr))",
        gap:                   16,
      }}>
        {visible.map(l => (
          <ListCard key={l.id} list={l} onOpen={() => {}} />
        ))}
      </div>

      {visible.length === 0 && (
        <div style={{
          padding:        "40px",
          textAlign:      "center",
          fontFamily:     "var(--sd-font)",
          fontSize:       13,
          color:          "var(--sd-font-tertiary)",
          border:         "1.5px dashed var(--sd-border-default)",
          borderRadius:   12,
        }}>
          No lists match "{search}"
        </div>
      )}
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "lists-page",
  title:       "Lists Page",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Creator list management — card grid of saved creator lists with counts, preview avatars, tags, and search. Maps to ListsPage.tsx.",
  description: "The Lists page for organizing and managing saved groups of creators. Each card shows list name, creator count badge, description, stacked avatar preview, classification tags, and last-updated date. Supports search and opens a list detail view on click. Maps to ListsPage.tsx and ListDetailPage.tsx in the app.",
  demos: [
    {
      title:   "Creator Lists",
      render:  () => <ListsPageDemo />,
      block:   true,
      maxWidth: 880,
    },
  ],
  props: [
    {
      rows: [
        { name: "lists",       type: "CreatorList[]", required: true,  description: "Array of list objects with name, count, creators preview, tags, and updated date." },
        { name: "onOpen",      type: "(id: string) => void", required: true, description: "Navigate to the list detail page." },
        { name: "onNewList",   type: "() => void",    required: false, description: "Open the new list creation modal." },
      ],
    },
  ],
};

export default doc;
