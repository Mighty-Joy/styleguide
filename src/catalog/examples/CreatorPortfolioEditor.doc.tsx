"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconTrash,
  IconStar,
  IconStarFilled,
  IconArrowUp,
  IconArrowDown,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconEye,
  IconEdit,
  IconCheck,
  IconX,
  IconExternalLink,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

type Platform = "instagram" | "tiktok" | "youtube" | "ugc";

interface PortfolioItem {
  id: string;
  platform: Platform;
  caption: string;
  url: string;
  emoji: string;
  featured: boolean;
  type: string;
  brand: string;
}

const PLATFORM_META: Record<Platform, { label: string; icon: React.ElementType; tone: keyof typeof TONES }> = {
  instagram: { label: "Instagram", icon: IconBrandInstagram, tone: "pink"   },
  tiktok:    { label: "TikTok",    icon: IconBrandTiktok,    tone: "blue"   },
  youtube:   { label: "YouTube",   icon: IconBrandYoutube,   tone: "red"    },
  ugc:       { label: "UGC",       icon: IconEye,             tone: "purple" },
};

const INITIAL_ITEMS: PortfolioItem[] = [
  { id: "i1", platform: "instagram", caption: "Summer skincare routine ft. Aura Labs Luminos — 3.2% save rate",          url: "#", emoji: "🌿", featured: true,  type: "Reel",  brand: "Aura Labs"   },
  { id: "i2", platform: "tiktok",    caption: "Honest 30-day review — hit 1.2M views, highest performing TikTok ever", url: "#", emoji: "✨", featured: false, type: "Video", brand: "GlowCo"      },
  { id: "i3", platform: "instagram", caption: "Get ready with me: 5-step morning routine (gifted collab)",               url: "#", emoji: "🎀", featured: true,  type: "Reel",  brand: "Satin & Co"  },
  { id: "i4", platform: "ugc",       caption: "UGC pack — 4 raw unboxing clips delivered for paid ads",                  url: "#", emoji: "📦", featured: false, type: "UGC",   brand: "Bloom Labs"  },
  { id: "i5", platform: "youtube",   caption: "Full review: does this serum actually work? 142K views",                  url: "#", emoji: "🔬", featured: false, type: "Video", brand: "DermFirst"   },
];

function Demo() {
  const [items,    setItems]    = useState<PortfolioItem[]>(INITIAL_ITEMS);
  const [mode,     setMode]     = useState<"edit" | "preview">("edit");
  const [editing,  setEditing]  = useState<string | null>(null);
  const [draft,    setDraft]    = useState<Partial<PortfolioItem>>({});
  const [adding,   setAdding]   = useState(false);
  const [newItem,  setNewItem]  = useState<Partial<PortfolioItem>>({ platform: "instagram", caption: "", emoji: "🌟", featured: false, type: "Reel", brand: "", url: "" });
  const [saved,    setSaved]    = useState(false);

  const MAX = 6;

  function moveUp(id: string) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === id);
      if (i === 0) return prev;
      const n = [...prev];
      [n[i - 1], n[i]] = [n[i], n[i - 1]];
      return n;
    });
  }
  function moveDown(id: string) {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === id);
      if (i === prev.length - 1) return prev;
      const n = [...prev];
      [n[i], n[i + 1]] = [n[i + 1], n[i]];
      return n;
    });
  }
  function toggleFeatured(id: string) {
    setItems((prev) => prev.map((x) => x.id === id ? { ...x, featured: !x.featured } : x));
  }
  function remove(id: string) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }
  function startEdit(item: PortfolioItem) {
    setEditing(item.id);
    setDraft({ ...item });
  }
  function saveEdit() {
    setItems((prev) => prev.map((x) => x.id === editing ? { ...x, ...draft } as PortfolioItem : x));
    setEditing(null);
  }
  function addItem() {
    const id = "i" + Date.now();
    setItems((prev) => [...prev, { ...newItem, id } as PortfolioItem]);
    setAdding(false);
    setNewItem({ platform: "instagram", caption: "", emoji: "🌟", featured: false, type: "Reel", brand: "", url: "" });
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const featured = items.filter((x) => x.featured);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>My portfolio</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>{items.length}/{MAX} pieces · {featured.length} featured</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["edit","preview"] as const).map((m) => (
            <button key={m} onClick={() => setMode(m)}
              style={{ padding: "5px 11px", borderRadius: 7, background: mode === m ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: mode === m ? "#fff" : "var(--sd-font-secondary,#555)", textTransform: "capitalize" }}>
              {m === "preview" ? <><IconEye size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />Preview</> : "Edit"}
            </button>
          ))}
        </div>
      </div>

      {mode === "preview" ? (
        <div>
          {featured.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 7, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: 0.6 }}>Featured</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {featured.map((item) => {
                  const plat = PLATFORM_META[item.platform];
                  return (
                    <div key={item.id} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--sd-border-default,#e5e7eb)" }}>
                      <div style={{ height: 80, background: TONES[plat.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>{item.emoji}</div>
                      <div style={{ padding: "8px 9px" }}>
                        <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 3 }}>
                          <plat.icon size={11} style={{ color: TONES[plat.tone].text }} />
                          <span style={{ fontSize: 9, fontWeight: 700, color: TONES[plat.tone].text }}>{item.type}</span>
                          <IconStarFilled size={9} style={{ color: TONES.yellow.text, marginLeft: "auto" }} />
                        </div>
                        <div style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)", lineHeight: 1.4 }}>{item.caption}</div>
                        <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#bbb)", marginTop: 3 }}>{item.brand}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div style={{ fontSize: 10, fontWeight: 800, marginBottom: 7, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: 0.6 }}>All work</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {items.filter((x) => !x.featured).map((item) => {
              const plat = PLATFORM_META[item.platform];
              return (
                <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 11px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: TONES[plat.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 1 }}>
                      <plat.icon size={10} style={{ color: TONES[plat.tone].text }} />
                      <span style={{ fontSize: 9, fontWeight: 700, color: TONES[plat.tone].text }}>{item.type}</span>
                      <span style={{ fontSize: 9, color: "var(--sd-font-tertiary,#bbb)" }}>· {item.brand}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.caption}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
            {items.map((item, idx) => {
              const plat = PLATFORM_META[item.platform];
              const isEditing = editing === item.id;

              return (
                <div key={item.id} style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 11, overflow: "hidden" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "10px 12px" }}>
                    <div style={{ width: 34, height: 34, borderRadius: 7, background: TONES[plat.tone].tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.emoji}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", gap: 5, alignItems: "center", marginBottom: 1 }}>
                        <plat.icon size={10} style={{ color: TONES[plat.tone].text }} />
                        <span style={{ fontSize: 9, fontWeight: 700, color: TONES[plat.tone].text }}>{item.platform === "ugc" ? "UGC" : plat.label} · {item.type}</span>
                        {item.featured && <Badge label="Featured" tone="yellow" size="sm" />}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--sd-font-secondary,#555)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.caption}</div>
                    </div>
                    <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                      <button onClick={() => moveUp(item.id)} disabled={idx === 0}
                        style={{ width: 24, height: 24, borderRadius: 5, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: idx === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: idx === 0 ? 0.3 : 1 }}>
                        <IconArrowUp size={11} />
                      </button>
                      <button onClick={() => moveDown(item.id)} disabled={idx === items.length - 1}
                        style={{ width: 24, height: 24, borderRadius: 5, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: idx === items.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: idx === items.length - 1 ? 0.3 : 1 }}>
                        <IconArrowDown size={11} />
                      </button>
                      <button onClick={() => toggleFeatured(item.id)}
                        style={{ width: 24, height: 24, borderRadius: 5, border: `1px solid ${item.featured ? TONES.yellow.text : "var(--sd-border-default,#e5e7eb)"}`, background: item.featured ? TONES.yellow.tint : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {item.featured ? <IconStarFilled size={11} style={{ color: TONES.yellow.text }} /> : <IconStar size={11} style={{ color: "var(--sd-font-tertiary,#999)" }} />}
                      </button>
                      <button onClick={() => remove(item.id)}
                        style={{ width: 24, height: 24, borderRadius: 5, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconTrash size={11} style={{ color: "var(--sd-font-tertiary,#bbb)" }} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {items.length < MAX && !adding && (
            <button onClick={() => setAdding(true)}
              style={{ width: "100%", padding: "10px", borderRadius: 10, border: "1.5px dashed var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", gap: 7, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <IconPlus size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
              <span style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", fontWeight: 600 }}>Add portfolio piece ({items.length}/{MAX})</span>
            </button>
          )}

          {adding && (
            <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 11, padding: "11px 12px", marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 9 }}>Add new piece</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>Platform</div>
                  <select value={newItem.platform} onChange={(e) => setNewItem((p) => ({ ...p, platform: e.target.value as Platform }))}
                    style={{ width: "100%", padding: "6px 8px", borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit" }}>
                    {(Object.keys(PLATFORM_META) as Platform[]).map((p) => <option key={p} value={p}>{PLATFORM_META[p].label}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>Type</div>
                  <input value={newItem.type ?? ""} onChange={(e) => setNewItem((p) => ({ ...p, type: e.target.value }))} placeholder="Reel, UGC, Video…"
                    style={{ width: "100%", padding: "6px 8px", borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>Caption / description</div>
                <input value={newItem.caption ?? ""} onChange={(e) => setNewItem((p) => ({ ...p, caption: e.target.value }))} placeholder="Short description of this work…"
                  style={{ width: "100%", padding: "7px 9px", borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", fontSize: 11, fontFamily: "inherit", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 7 }}>
                <Button variant="primary" size="sm" leftIcon={<IconCheck size={11} />} onClick={addItem} disabled={!newItem.caption?.trim()} style={{ flex: 1 }}>Add piece</Button>
                <Button variant="secondary" size="sm" leftIcon={<IconX size={11} />} onClick={() => setAdding(false)}>Cancel</Button>
              </div>
            </div>
          )}

          <Button variant="primary" size="sm" onClick={save} leftIcon={saved ? <IconCheck size={11} /> : undefined} style={{ width: "100%" }}>
            {saved ? "Portfolio saved!" : "Save portfolio"}
          </Button>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-portfolio-editor",
  title: "CreatorPortfolioEditor",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator portfolio manager — 5 work-sample cards with up/down reorder, star-to-feature, trash to remove, dashed Add piece CTA, and a Preview tab showing featured grid + list view.",
  description:
    "Creator manages their portfolio of past brand work. Header: piece count (N/6) + featured count + Edit/Preview mode tabs. Edit mode: 5 work-sample rows — emoji thumbnail (platform-tinted bg), platform icon + type label, caption preview, Featured badge when starred. Controls per row: ↑/↓ arrow buttons (disabled at edges), star toggle (yellow tint when featured), trash. Dashed 'Add portfolio piece (N/6)' CTA → inline form: platform dropdown, type input, caption input, Add/Cancel — disabled until caption has content. 'Save portfolio' primary → 2s 'Portfolio saved!'. Preview mode: Featured section (2-column card grid with large emoji, platform icon + type + star, caption, brand); All work section (compact list rows for non-featured). Pre-loaded: 5 pieces across IG/TikTok/YouTube/UGC; items 1 (Aura Labs Reel) and 3 (Satin & Co Reel) featured. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator portfolio editor",
      description: "Reorder with arrows. Click the star to toggle featured. Click 'Add portfolio piece' to add a new piece inline. Switch to Preview to see the public-facing view.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
