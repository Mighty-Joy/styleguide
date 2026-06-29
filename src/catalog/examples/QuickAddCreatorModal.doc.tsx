"use client";

import React, { useState, useRef, useEffect } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconSearch,
  IconX,
  IconPlus,
  IconCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconChevronRight,
  IconLoader2,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type Platform = "instagram" | "tiktok" | "youtube";

interface SearchResult {
  id: string;
  name: string;
  handle: string;
  initials: string;
  tone: keyof typeof TONES;
  platforms: Partial<Record<Platform, number>>;
  er: number;
  niche: string;
  alreadyAdded?: boolean;
}

/* ---- seed ---- */

const ALL_CREATORS: SearchResult[] = [
  { id: "c1", name: "Priya Nair",     handle: "@priya.creates",  initials: "PN", tone: "green",     platforms: { instagram: 128000, tiktok: 96000 }, er: 8.3, niche: "skincare"  },
  { id: "c2", name: "Diego Santos",   handle: "@diegocreates",   initials: "DS", tone: "orange",    platforms: { tiktok: 210000, youtube: 40000  }, er: 9.4, niche: "lifestyle" },
  { id: "c3", name: "Hana Kim",       handle: "@hanakim",        initials: "HK", tone: "pink",      platforms: { instagram: 340000              }, er: 5.1, niche: "skincare", alreadyAdded: true },
  { id: "c4", name: "Marcus Webb",    handle: "@marcuswebb",     initials: "MW", tone: "purple",    platforms: { tiktok: 210000                 }, er: 7.3, niche: "fitness"  },
  { id: "c5", name: "Liam Park",      handle: "@liampark",       initials: "LP", tone: "blue",      platforms: { youtube: 890000                }, er: 4.2, niche: "tech"     },
  { id: "c6", name: "Aisha Obi",      handle: "@aishaobi",       initials: "AO", tone: "turquoise", platforms: { instagram: 210000, tiktok: 88000 }, er: 6.8, niche: "wellness" },
  { id: "c7", name: "Sofia Alves",    handle: "@sofia.creates",  initials: "SA", tone: "red",       platforms: { instagram: 93000               }, er: 6.4, niche: "beauty"   },
  { id: "c8", name: "Jordan Ellis",   handle: "@jordanellis",    initials: "JE", tone: "sky",       platforms: { youtube: 312000, instagram: 85000 }, er: 2.8, niche: "tech"  },
];

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: IconBrandInstagram,
  tiktok:    IconBrandTiktok,
  youtube:   IconBrandYoutube,
};
const PLATFORM_COLOR: Record<Platform, string> = {
  instagram: "#e1306c",
  tiktok:    "#010101",
  youtube:   "#ff0000",
};

function fmtFollowers(n: number) {
  return n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + "M" : n >= 1_000 ? (n / 1_000).toFixed(0) + "K" : String(n);
}

/* ---- Modal shell ---- */

function ModalShell({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 24px 64px rgba(0,0,0,0.18)", width: 520, maxHeight: "80vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [confirming, setConfirming] = useState(false);
  const [added, setAdded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); }
    else { setQuery(""); setSelected(new Set()); setConfirming(false); setAdded(false); }
  }, [open]);

  const results = ALL_CREATORS.filter((c) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q) || c.niche.toLowerCase().includes(q);
  });

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function handleAdd() {
    setConfirming(true);
    await new Promise((r) => setTimeout(r, 900));
    setConfirming(false);
    setAdded(true);
    setTimeout(() => setOpen(false), 1000);
  }

  const selectedCreators = ALL_CREATORS.filter((c) => selected.has(c.id));

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Trigger buttons — as they appear in real surfaces */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Button variant="primary" size="sm" leftIcon={<IconPlus size={13} />} onClick={() => setOpen(true)}>
          Add creator
        </Button>
        <Button variant="secondary" size="sm" leftIcon={<IconPlus size={13} />} onClick={() => setOpen(true)}>
          Add to campaign
        </Button>
        <span style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", alignSelf: "center" }}>
          ← typical trigger points (roster, kanban header, campaign card…)
        </span>
      </div>

      {/* Modal */}
      <ModalShell open={open} onClose={() => setOpen(false)}>
        {/* Header */}
        <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary, #111)" }}>Add creators</div>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", marginTop: 1 }}>Summer Glow campaign</div>
          </div>
          <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 4 }}>
            <IconX size={16} />
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: "10px 18px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <IconSearch size={14} style={{ position: "absolute", left: 10, color: "var(--sd-font-tertiary, #999)", pointerEvents: "none" }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, handle, or niche…"
              style={{
                width: "100%", height: 34, padding: "0 10px 0 32px",
                border: "1px solid var(--sd-border-medium, #d1d5db)",
                borderRadius: "var(--sd-radius-md, 8px)",
                background: "var(--sd-bg-tertiary, #f1f1f1)",
                fontSize: 13, fontFamily: "inherit", color: "var(--sd-font-primary, #111)", outline: "none",
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                style={{ position: "absolute", right: 8, background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex" }}
              >
                <IconX size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Selected chips */}
        {selected.size > 0 && (
          <div style={{ padding: "8px 18px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", flexWrap: "wrap", gap: 6 }}>
            {selectedCreators.map((c) => (
              <span key={c.id} style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 24, padding: "0 8px", borderRadius: 99, background: TONES[c.tone].tint, border: `1px solid ${TONES[c.tone].text}33`, fontSize: 11, fontWeight: 600, color: TONES[c.tone].text }}>
                {c.name}
                <button onClick={() => toggle(c.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "flex", padding: 0 }}>
                  <IconX size={10} />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Results list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {results.length === 0 ? (
            <div style={{ padding: "40px 0", textAlign: "center", fontSize: 13, color: "var(--sd-font-tertiary, #999)" }}>
              No creators match &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((c) => {
              const isSelected = selected.has(c.id);
              return (
                <div
                  key={c.id}
                  onClick={() => !c.alreadyAdded && toggle(c.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 18px",
                    borderBottom: "1px solid var(--sd-border-default, #e5e7eb)",
                    cursor: c.alreadyAdded ? "default" : "pointer",
                    background: isSelected ? `${TONES[c.tone].tint}` : "transparent",
                    opacity: c.alreadyAdded ? 0.5 : 1,
                    transition: "background 0.1s",
                  }}
                >
                  {/* Checkbox */}
                  <div style={{
                    width: 18, height: 18, borderRadius: 5, border: "1.5px solid",
                    borderColor: isSelected ? TONES[c.tone].text : "var(--sd-border-medium, #d1d5db)",
                    background: isSelected ? TONES[c.tone].text : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, transition: "all 0.1s",
                  }}>
                    {isSelected && <IconCheck size={11} color="#fff" />}
                  </div>

                  <Avatar initials={c.initials} tone={c.tone} size="sm" />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>{c.name}</span>
                      {c.alreadyAdded && <Badge label="Added" tone="green" size="sm" />}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>{c.handle}</span>
                      <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>·</span>
                      <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", textTransform: "capitalize" }}>{c.niche}</span>
                    </div>
                  </div>

                  {/* Platform chips */}
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    {(Object.entries(c.platforms) as [Platform, number][]).map(([p, count]) => {
                      const Icon = PLATFORM_ICONS[p];
                      return (
                        <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, color: "var(--sd-font-secondary, #555)", background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 99, padding: "2px 6px" }}>
                          <Icon size={10} style={{ color: PLATFORM_COLOR[p] }} />
                          {fmtFollowers(count)}
                        </span>
                      );
                    })}
                  </div>

                  {/* ER */}
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.er >= 7 ? TONES.green.text : c.er >= 5 ? "var(--sd-font-primary, #111)" : "var(--sd-font-secondary, #555)", minWidth: 36, textAlign: "right", flexShrink: 0 }}>
                    {c.er}%
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 18px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "var(--sd-font-tertiary, #999)", flex: 1 }}>
            {selected.size === 0 ? "Select creators to add" : `${selected.size} creator${selected.size > 1 ? "s" : ""} selected`}
          </span>
          <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="primary"
            size="sm"
            disabled={selected.size === 0 || confirming || added}
            leftIcon={added ? <IconCheck size={13} /> : confirming ? <IconLoader2 size={13} style={{ animation: "spin 0.8s linear infinite" }} /> : <IconPlus size={13} />}
            onClick={handleAdd}
          >
            {added ? "Added!" : confirming ? "Adding…" : `Add ${selected.size > 0 ? selected.size : ""} creator${selected.size !== 1 ? "s" : ""}`}
          </Button>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </ModalShell>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "quick-add-creator-modal",
  title: "QuickAddCreatorModal",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Inline search-and-add creator modal — appears from any surface, multi-select with chips, spinner confirm, and already-added guard.",
  description:
    "The primary action modal for adding creators to a campaign. Triggered from roster headers, kanban add buttons, campaign cards. Features: live search (name/handle/niche), checkbox multi-select, selected-creators chip strip, platform follower chips, ER-colored metric, already-added guard (grayed, non-clickable), loading spinner on confirm, success check animation. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Add creator modal",
      description: "Click either button to open the modal. Search, multi-select creators, then confirm.",
      render: () => <Demo />,
      block: false,
    },
  ],
  props: [],
};

export default doc;
