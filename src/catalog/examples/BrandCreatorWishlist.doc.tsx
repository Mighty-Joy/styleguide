"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconSearch,
  IconTrash,
  IconEdit,
  IconCheck,
  IconBrandInstagram,
  IconBrandTiktok,
  IconUsers,
  IconHeart,
  IconPlus,
  IconChevronDown,
  IconChevronUp,
  IconSend,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type Tier = "nano" | "micro" | "mid" | "macro";

interface SavedCreator {
  id: string;
  name: string;
  initials: string;
  tone: "pink" | "orange" | "blue" | "green" | "purple";
  niche: string;
  tier: Tier;
  igFollowers?: string;
  ttFollowers?: string;
  er: string;
  note: string;
  savedAt: string;
  tags: string[];
}

const TIER_META: Record<Tier, { label: string; tone: keyof typeof TONES }> = {
  nano:  { label: "Nano",  tone: "green"  },
  micro: { label: "Micro", tone: "blue"   },
  mid:   { label: "Mid",   tone: "purple" },
  macro: { label: "Macro", tone: "orange" },
};

const INITIAL_CREATORS: SavedCreator[] = [
  {
    id: "w1", name: "Zoe Chen",       initials: "ZC", tone: "pink",   niche: "Clean beauty",    tier: "micro",
    igFollowers: "62K", ttFollowers: "41K",   er: "7.4%",
    note: "Amazing aesthetic — perfect for the Luminos rebrand campaign. DM'd on IG Jun 12.",
    savedAt: "Jun 12", tags: ["clean beauty","aesthetic","UGC"],
  },
  {
    id: "w2", name: "Tobias Müller",  initials: "TM", tone: "orange", niche: "Fitness & nutrition", tier: "mid",
    igFollowers: "148K", ttFollowers: undefined, er: "5.1%",
    note: "Strong conversion rate on affiliate links. Great for supplement campaigns.",
    savedAt: "Jun 18", tags: ["fitness","nutrition","high-conversion"],
  },
  {
    id: "w3", name: "Aisha Kamara",   initials: "AK", tone: "purple", niche: "Skincare & wellness", tier: "micro",
    igFollowers: "38K", ttFollowers: "27K", er: "9.2%",
    note: "Super engaged audience — 9.2% ER is outstanding. Follow up for Q3.",
    savedAt: "Jun 20", tags: ["skincare","high-ER","wellness"],
  },
  {
    id: "w4", name: "Leo Fontaine",   initials: "LF", tone: "blue",   niche: "Lifestyle",          tier: "nano",
    igFollowers: "8K",  ttFollowers: "22K",  er: "11.8%",
    note: "Rising nano — watch for Q4. Very niche audience in sustainable home.",
    savedAt: "Jun 25", tags: ["lifestyle","nano","sustainable"],
  },
  {
    id: "w5", name: "Mei Lin",        initials: "ML", tone: "green",  niche: "K-beauty & skincare", tier: "micro",
    igFollowers: "71K", ttFollowers: "53K",  er: "8.1%",
    note: "",
    savedAt: "Jun 28", tags: ["k-beauty","skincare"],
  },
];

const NICHE_FILTERS = ["All", "Skincare", "Fitness", "Beauty", "Lifestyle"];

/* ---- Demo ---- */
function Demo() {
  const [creators,  setCreators]  = useState<SavedCreator[]>(INITIAL_CREATORS);
  const [query,     setQuery]     = useState("");
  const [niche,     setNiche]     = useState("All");
  const [expanded,  setExpanded]  = useState<string | null>("w1");
  const [editNote,  setEditNote]  = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState("");
  const [invited,   setInvited]   = useState<string | null>(null);

  function remove(id: string) { setCreators((prev) => prev.filter((c) => c.id !== id)); }
  function startEdit(id: string, cur: string) { setEditNote(id); setNoteDraft(cur); }
  function saveNote(id: string) {
    setCreators((prev) => prev.map((c) => c.id === id ? { ...c, note: noteDraft } : c));
    setEditNote(null);
  }
  function invite(id: string) {
    setInvited(id);
    setTimeout(() => setInvited(null), 2000);
  }

  const visible = creators.filter((c) => {
    if (query && !c.name.toLowerCase().includes(query.toLowerCase()) && !c.niche.toLowerCase().includes(query.toLowerCase())) return false;
    if (niche !== "All" && !c.niche.toLowerCase().includes(niche.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>Saved creators</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Your personal shortlist for future campaigns</div>
        </div>
        <Badge label={`${creators.length} saved`} tone="blue" size="sm" dot />
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "7px 12px", marginBottom: 10 }}>
        <IconSearch size={12} style={{ color: "var(--sd-font-tertiary,#999)", flexShrink: 0 }} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or niche…"
          style={{ flex: 1, border: "none", outline: "none", fontSize: 12, fontFamily: "inherit" }} />
      </div>

      {/* Niche filter */}
      <div style={{ display: "flex", gap: 5, marginBottom: 14, overflowX: "auto" }}>
        {NICHE_FILTERS.map((f) => (
          <button key={f} onClick={() => setNiche(f)}
            style={{ padding: "4px 10px", borderRadius: 99, background: niche === f ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: niche === f ? "#fff" : "var(--sd-font-secondary,#555)", flexShrink: 0 }}>
            {f}
          </button>
        ))}
      </div>

      {/* Creator cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {visible.map((c) => {
          const isOpen = expanded === c.id;
          const tierMeta = TIER_META[c.tier];

          return (
            <div key={c.id} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
              {/* Summary row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px" }}>
                <Avatar initials={c.initials} tone={c.tone} size="sm" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 800 }}>{c.name}</div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{c.niche}</div>
                </div>
                <div style={{ display: "flex", gap: 5, alignItems: "center", flexShrink: 0 }}>
                  <Badge label={tierMeta.label} tone={tierMeta.tone} size="sm" />
                  <span style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{c.er} ER</span>
                </div>
                <button onClick={() => setExpanded(isOpen ? null : c.id)}
                  style={{ width: 24, height: 24, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 6, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {isOpen ? <IconChevronUp size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} /> : <IconChevronDown size={12} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
                </button>
              </div>

              {isOpen && (
                <div style={{ borderTop: "1px solid var(--sd-border-default,#e5e7eb)", padding: "10px 13px", background: "var(--sd-bg-secondary,#f9f9f9)" }}>
                  {/* Platform stats */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    {c.igFollowers && (
                      <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 8px", background: TONES.pink.tint, borderRadius: 7 }}>
                        <IconBrandInstagram size={11} style={{ color: TONES.pink.text }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: TONES.pink.text }}>{c.igFollowers}</span>
                      </div>
                    )}
                    {c.ttFollowers && (
                      <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 8px", background: TONES.blue.tint, borderRadius: 7 }}>
                        <IconBrandTiktok size={11} style={{ color: TONES.blue.text }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: TONES.blue.text }}>{c.ttFollowers}</span>
                      </div>
                    )}
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", alignSelf: "center" }}>Saved {c.savedAt}</div>
                  </div>

                  {/* Tags */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                    {c.tags.map((tag) => (
                      <span key={tag} style={{ padding: "2px 8px", borderRadius: 99, background: "var(--sd-border-default,#e5e7eb)", fontSize: 10, color: "var(--sd-font-secondary,#555)" }}>#{tag}</span>
                    ))}
                  </div>

                  {/* Private note */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, marginBottom: 5, color: "var(--sd-font-secondary,#555)" }}>Private note</div>
                    {editNote === c.id ? (
                      <div>
                        <textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)}
                          style={{ width: "100%", minHeight: 60, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, padding: "7px 10px", fontSize: 11, fontFamily: "inherit", resize: "none", boxSizing: "border-box" }} />
                        <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
                          <Button variant="primary" size="sm" leftIcon={<IconCheck size={11} />} onClick={() => saveNote(c.id)}>Save</Button>
                          <Button variant="secondary" size="sm" onClick={() => setEditNote(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
                        <div style={{ flex: 1, fontSize: 11, color: c.note ? "var(--sd-font-secondary,#333)" : "var(--sd-font-tertiary,#bbb)", fontStyle: c.note ? "normal" : "italic", lineHeight: 1.5 }}>
                          {c.note || "No note yet — click to add one"}
                        </div>
                        <button onClick={() => startEdit(c.id, c.note)}
                          style={{ width: 24, height: 24, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 6, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <IconEdit size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: 7 }}>
                    <Button variant="primary" size="sm" leftIcon={invited === c.id ? <IconCheck size={11} /> : <IconSend size={11} />}
                      onClick={() => invite(c.id)} style={{ flex: 1 }}>
                      {invited === c.id ? "Invite sent!" : "Invite to campaign"}
                    </Button>
                    <button onClick={() => remove(c.id)}
                      style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconTrash size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {visible.length === 0 && (
          <div style={{ padding: "28px", textAlign: "center", color: "var(--sd-font-tertiary,#999)", fontSize: 12 }}>
            No saved creators match your filters.
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "brand-creator-wishlist",
  title: "BrandCreatorWishlist",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Brand's personal shortlist of creators to work with — 5 cards with tier badge, ER, platform followers, editable private notes, hashtag tags, niche filter, and Invite to campaign CTA.",
  description:
    "Brand saves creators they want to reach out to in the future. Header: 'Saved creators' + count badge. Search by name or niche. 5 niche filter chips (All/Skincare/Fitness/Beauty/Lifestyle). 5 creator cards: summary row shows Avatar sm, name, niche, tier badge, ER, expand chevron. Expanded reveals: platform stat tiles (IG pink / TikTok blue, only platforms present), saved date, hashtag tag chips (#clean-beauty, #high-ER etc.), private note section (italic 'No note yet' placeholder when empty, pencil to edit inline → textarea + Save/Cancel), Invite to campaign primary → 2s 'Invite sent!', trash to remove. Zoe Chen pre-expanded with note. Leo Fontaine has no note (empty state demo). Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Brand creator wishlist",
      description: "Expand any card. Click the pencil on a note to edit it inline. Filter by niche chips. Click 'Invite to campaign' for the 2s confirmation. Trash to remove from list.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
