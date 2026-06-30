"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import type { ComponentDoc } from "@/catalog/types";

/* ── types ─────────────────────────────────────────────── */
type Column = {
  id: string;
  label: string;
  color: string;
  bg: string;
};

type Card = {
  id: number;
  creator: string;
  initials: string;
  platform: "instagram" | "tiktok" | "youtube";
  type: string;
  due: string;
  column: string;
};

/* ── data ───────────────────────────────────────────────── */
const COLUMNS: Column[] = [
  { id: "brief",   label: "Brief Not Sent",    color: "#6B7280", bg: "#F3F4F6" },
  { id: "script",  label: "Awaiting Script",   color: "#3B82F6", bg: "#EFF6FF" },
  { id: "review",  label: "Script Review",     color: "#F59E0B", bg: "#FFFBEB" },
  { id: "content", label: "Awaiting Content",  color: "#8B5CF6", bg: "#F5F3FF" },
  { id: "approve", label: "Content Review",    color: "#EC4899", bg: "#FDF2F8" },
  { id: "done",    label: "Finished",          color: "#10B981", bg: "#ECFDF5" },
];

const SEED: Card[] = [
  { id: 1,  creator: "Maya Chen",       initials: "MC", platform: "instagram", type: "Reel",   due: "Jul 5",  column: "brief"   },
  { id: 2,  creator: "Priya Nair",      initials: "PN", platform: "instagram", type: "Story",  due: "Jul 8",  column: "brief"   },
  { id: 3,  creator: "Leo Park",        initials: "LP", platform: "tiktok",    type: "Video",  due: "Jul 6",  column: "script"  },
  { id: 4,  creator: "Sofia Ruiz",      initials: "SR", platform: "youtube",   type: "Vlog",   due: "Jul 10", column: "script"  },
  { id: 5,  creator: "Amir Hassan",     initials: "AH", platform: "tiktok",    type: "UGC",    due: "Jul 4",  column: "review"  },
  { id: 6,  creator: "Zoe Williams",    initials: "ZW", platform: "instagram", type: "Reel",   due: "Jul 7",  column: "review"  },
  { id: 7,  creator: "James Lee",       initials: "JL", platform: "youtube",   type: "Review", due: "Jul 3",  column: "content" },
  { id: 8,  creator: "Aiko Tanaka",     initials: "AT", platform: "tiktok",    type: "Haul",   due: "Jul 9",  column: "approve" },
  { id: 9,  creator: "Nina Patel",      initials: "NP", platform: "instagram", type: "Post",   due: "Jul 2",  column: "approve" },
  { id: 10, creator: "Sam Torres",      initials: "ST", platform: "tiktok",    type: "UGC",    due: "Jun 30", column: "done"    },
  { id: 11, creator: "Ella Brown",      initials: "EB", platform: "youtube",   type: "Unbox",  due: "Jun 28", column: "done"    },
];

const PLATFORM_TONE: Record<string, string> = {
  instagram: "pink",
  tiktok:    "blue",
  youtube:   "red",
};

/* ── KanbanCard ─────────────────────────────────────────── */
function KanbanCard({ card }: { card: Card }) {
  return (
    <div style={{
      background:    "var(--sd-bg-secondary)",
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  10,
      padding:       "10px 12px",
      cursor:        "grab",
      display:       "flex",
      flexDirection: "column",
      gap:           8,
    }}>
      {/* header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Avatar size="sm" name={card.creator} initials={card.initials} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily:   "var(--sd-font)",
            fontSize:     12,
            fontWeight:   600,
            color:        "var(--sd-font-primary)",
            whiteSpace:   "nowrap",
            overflow:     "hidden",
            textOverflow: "ellipsis",
          }}>
            {card.creator}
          </div>
          <div style={{
            fontFamily: "var(--sd-font)",
            fontSize:   11,
            color:      "var(--sd-font-tertiary)",
          }}>
            {card.type}
          </div>
        </div>
        <Badge
          label={card.platform}
          tone={PLATFORM_TONE[card.platform] as any}
          variant="solid"
          size="sm"
        />
      </div>

      {/* footer row */}
      <div style={{
        display:    "flex",
        alignItems: "center",
        gap:        6,
      }}>
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   11,
          color:      "var(--sd-font-tertiary)",
        }}>
          Due {card.due}
        </span>
      </div>
    </div>
  );
}

/* ── KanbanColumn ───────────────────────────────────────── */
function KanbanColumn({ col, cards }: { col: Column; cards: Card[] }) {
  return (
    <div style={{
      width:         224,
      flexShrink:    0,
      display:       "flex",
      flexDirection: "column",
      gap:           8,
    }}>
      {/* column header */}
      <div style={{
        display:      "flex",
        alignItems:   "center",
        gap:          8,
        padding:      "6px 10px",
        background:   col.bg,
        borderRadius: 8,
        border:       `1px solid ${col.color}22`,
      }}>
        <span style={{
          display:      "inline-block",
          width:        8,
          height:       8,
          borderRadius: "50%",
          background:   col.color,
          flexShrink:   0,
        }} />
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   12,
          fontWeight: 600,
          color:      col.color,
          flex:       1,
        }}>
          {col.label}
        </span>
        <span style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     11,
          color:        col.color,
          background:   `${col.color}22`,
          borderRadius: 100,
          padding:      "1px 7px",
          fontWeight:   600,
        }}>
          {cards.length}
        </span>
      </div>

      {/* cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {cards.map(c => <KanbanCard key={c.id} card={c} />)}
        {cards.length === 0 && (
          <div style={{
            border:       `1.5px dashed var(--sd-border-default)`,
            borderRadius: 10,
            height:       72,
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "var(--sd-font)",
              fontSize:   12,
              color:      "var(--sd-font-tertiary)",
            }}>
              No items
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Demo ───────────────────────────────────────────────── */
function ContentKanbanDemo() {
  const [cards] = useState<Card[]>(SEED);
  const [activeCol, setActiveCol] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* toolbar */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "var(--sd-font)",
          fontSize:   14,
          fontWeight: 600,
          color:      "var(--sd-font-primary)",
        }}>
          Summer Glow Campaign — Content Board
        </span>
        <div style={{ display: "flex", gap: 8 }}>
          {COLUMNS.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCol(activeCol === c.id ? null : c.id)}
              style={{
                fontFamily:  "var(--sd-font)",
                fontSize:    11,
                fontWeight:  600,
                padding:     "4px 10px",
                borderRadius: 100,
                border:      `1px solid ${activeCol === c.id ? c.color : "var(--sd-border-default)"}`,
                background:  activeCol === c.id ? c.bg : "transparent",
                color:       activeCol === c.id ? c.color : "var(--sd-font-secondary)",
                cursor:      "pointer",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* board */}
      <div style={{
        display:    "flex",
        gap:        12,
        overflowX:  "auto",
        paddingBottom: 8,
      }}>
        {COLUMNS
          .filter(c => activeCol === null || c.id === activeCol)
          .map(col => (
            <KanbanColumn
              key={col.id}
              col={col}
              cards={cards.filter(c => c.column === col.id)}
            />
          ))
        }
      </div>
    </div>
  );
}

/* ── doc ────────────────────────────────────────────────── */
const doc: ComponentDoc = {
  slug:        "content-kanban",
  title:       "Content Kanban",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Six-stage content review board tracking creator deliverables from brief to finished.",
  description: "Mirrors the ContentKanban surface in the app — columns map to ContentStatus enum values. Cards show creator identity, content type, platform, and due date. Supports column-filter pills for focused views.",
  demos: [
    {
      title:  "Summer Glow Campaign",
      render: () => <ContentKanbanDemo />,
      block:  true,
    },
  ],
  props: [
    {
      rows: [
        { name: "columns",   type: "Column[]",       required: true,  description: "Ordered stage definitions with label, accent color, and background." },
        { name: "cards",     type: "Card[]",         required: true,  description: "Content items with creator, platform, type, due date, and column id." },
        { name: "activeCol", type: "string | null",  required: false, description: "When set, collapses board to show only the selected column." },
      ],
    },
  ],
};

export default doc;
