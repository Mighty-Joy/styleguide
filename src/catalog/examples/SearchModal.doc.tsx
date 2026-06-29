"use client";

import React, { useState, useEffect } from "react";
import {
  IconSearch,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconSpeakerphone,
  IconUsers,
  IconFileText,
  IconLayoutKanban,
  IconInbox,
  IconSettings,
  IconArrowRight,
  IconClock,
  IconHash,
  IconCommand,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

type ResultKind = "creator" | "campaign" | "deal" | "page" | "recent";

interface SearchResult {
  id: string;
  kind: ResultKind;
  title: string;
  subtitle?: string;
  icon?: React.ElementType;
  tone?: keyof typeof TONES;
  meta?: string;
}

/* ------------------------------------------------------------------ */
/* Meta                                                                  */
/* ------------------------------------------------------------------ */

const KIND_META: Record<ResultKind, { label: string; icon: React.ElementType; tone: keyof typeof TONES }> = {
  creator:  { label: "Creator",  icon: IconUsers,         tone: "blue"   },
  campaign: { label: "Campaign", icon: IconSpeakerphone,  tone: "purple" },
  deal:     { label: "Deal",     icon: IconLayoutKanban,  tone: "green"  },
  page:     { label: "Page",     icon: IconFileText,      tone: "gray"   },
  recent:   { label: "Recent",   icon: IconClock,         tone: "gray"   },
};

/* ------------------------------------------------------------------ */
/* Seed data                                                             */
/* ------------------------------------------------------------------ */

const ALL_RESULTS: SearchResult[] = [
  // Creators
  { id: "c1", kind: "creator", title: "Priya Nair",        subtitle: "@priya_creates · 184K",     icon: IconBrandInstagram, tone: "pink",      meta: "Instagram" },
  { id: "c2", kind: "creator", title: "Sam Kim",           subtitle: "@sam.life · 420K",          icon: IconBrandTiktok,    tone: "gray",      meta: "TikTok" },
  { id: "c3", kind: "creator", title: "Tomohiro V",        subtitle: "@tomohiro_v · 98K",         icon: IconBrandYoutube,   tone: "red",       meta: "YouTube" },
  { id: "c4", kind: "creator", title: "Mara Voss",         subtitle: "@mara.aesthetic · 61K",     icon: IconBrandInstagram, tone: "pink",      meta: "Instagram" },
  { id: "c5", kind: "creator", title: "Lena Fischer",      subtitle: "@lena.vis · 210K",          icon: IconBrandInstagram, tone: "pink",      meta: "Instagram" },
  // Campaigns
  { id: "ca1", kind: "campaign", title: "Atlas X Summer",  subtitle: "12 creators · Jun–Jul",     tone: "purple", meta: "Active" },
  { id: "ca2", kind: "campaign", title: "Glow Labs Q3",    subtitle: "6 creators · Jul–Sep",      tone: "purple", meta: "Draft" },
  { id: "ca3", kind: "campaign", title: "Nova Sport Fall", subtitle: "9 creators · Aug–Oct",      tone: "purple", meta: "Active" },
  // Deals
  { id: "d1", kind: "deal", title: "Priya Nair — Atlas X Summer",   subtitle: "$2,500 · Content submitted", tone: "green" },
  { id: "d2", kind: "deal", title: "Sam Kim — Glow Labs Q3",        subtitle: "$1,800 · Offer sent",        tone: "green" },
  // Pages
  { id: "p1", kind: "page", title: "Inbox",          icon: IconInbox,         meta: "Messaging" },
  { id: "p2", kind: "page", title: "Roster",         icon: IconUsers,         meta: "Creators" },
  { id: "p3", kind: "page", title: "Campaign Board", icon: IconLayoutKanban,  meta: "Campaigns" },
  { id: "p4", kind: "page", title: "Settings",       icon: IconSettings,      meta: "Account" },
];

const RECENT: SearchResult[] = [
  { id: "r1", kind: "recent", title: "Priya Nair",       subtitle: "Creator",           icon: IconBrandInstagram, tone: "pink" },
  { id: "r2", kind: "recent", title: "Atlas X Summer",   subtitle: "Campaign",          tone: "purple" },
  { id: "r3", kind: "recent", title: "Inbox",            subtitle: "Page",              icon: IconInbox },
];

const QUICK_ACTIONS = [
  { label: "New campaign",   icon: IconSpeakerphone  },
  { label: "Add creator",    icon: IconUsers         },
  { label: "Send offer",     icon: IconArrowRight    },
];

/* ------------------------------------------------------------------ */
/* SearchModal component                                                 */
/* ------------------------------------------------------------------ */

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  useEffect(() => {
    if (!open) { setQuery(""); setSelectedIdx(0); return; }
    setTimeout(() => (document.getElementById("sd-search-input") as HTMLInputElement | null)?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);

  const results = query
    ? ALL_RESULTS.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        (r.subtitle ?? "").toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Group results by kind
  const grouped: { label: string; items: SearchResult[] }[] = [];
  const KINDS_ORDER: ResultKind[] = ["creator", "campaign", "deal", "page"];
  for (const kind of KINDS_ORDER) {
    const items = results.filter(r => r.kind === kind);
    if (items.length > 0) {
      grouped.push({ label: KIND_META[kind].label + "s", items });
    }
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          zIndex: 1000, animation: "fadeIn 0.1s ease",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: 560, maxHeight: 500, zIndex: 1001,
        background: "var(--sd-bg-primary)",
        borderRadius: "var(--sd-radius-lg, 12px)",
        boxShadow: "0 20px 60px -10px rgba(0,0,0,0.3), 0 0 0 1px var(--sd-border-light)",
        display: "flex", flexDirection: "column",
        overflow: "hidden", animation: "pop 0.12s ease",
      }}>
        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 16px",
          borderBottom: "1px solid var(--sd-border-light)",
        }}>
          <div style={{ flex: 1 }}>
            <Input
              id="sd-search-input"
              variant="bare"
              value={query}
              onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
              placeholder="Search creators, campaigns, deals…"
              leftIcon={<IconSearch size={16} />}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
            <kbd style={{ fontSize: 10, padding: "2px 5px", background: "var(--sd-bg-secondary)", border: "1px solid var(--sd-border-light)", borderRadius: 4, color: "var(--sd-font-tertiary)", fontFamily: "var(--sd-font-stack)" }}>esc</kbd>
          </div>
        </div>

        {/* Results / empty state */}
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
          {!query && (
            <>
              {/* Recent */}
              <div style={{ padding: "4px 14px 4px", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Recent
              </div>
              {RECENT.map(r => <ResultRow key={r.id} result={r} />)}

              {/* Quick actions */}
              <div style={{ padding: "10px 14px 4px", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Quick actions
              </div>
              {QUICK_ACTIONS.map(a => {
                const Icon = a.icon;
                return (
                  <Button key={a.label} variant="ghost" onClick={() => {}}
                    style={{ width: "100%", height: "auto", borderRadius: "var(--sd-radius-sm)", justifyContent: "flex-start", padding: "8px 14px" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={13} style={{ color: "var(--sd-font-secondary)" }} />
                    </div>
                    <span style={{ fontSize: 13, color: "var(--sd-font-primary)" }}>{a.label}</span>
                    <IconArrowRight size={12} style={{ color: "var(--sd-font-tertiary)", marginLeft: "auto" }} />
                  </Button>
                );
              })}
            </>
          )}

          {query && results.length === 0 && (
            <div style={{ padding: 24, textAlign: "center" }}>
              <IconSearch size={28} style={{ color: "var(--sd-font-tertiary)", display: "block", margin: "0 auto 8px" }} />
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-secondary)" }}>No results for "{query}"</div>
              <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", marginTop: 4 }}>Try a creator name, campaign, or page</div>
            </div>
          )}

          {query && grouped.map(group => (
            <div key={group.label}>
              <div style={{ padding: "8px 14px 4px", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {group.label}
              </div>
              {group.items.slice(0, 4).map(r => <ResultRow key={r.id} result={r} />)}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, padding: "8px 14px",
          borderTop: "1px solid var(--sd-border-light)",
          fontSize: 10, color: "var(--sd-font-tertiary)",
        }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3 }}>
            <IconCommand size={10} />K to open
          </span>
        </div>
      </div>
    </>
  );
}

function ResultRow({ result }: { result: SearchResult }) {
  const meta = KIND_META[result.kind];
  const Icon = result.icon ?? meta.icon;
  const tone = result.tone ?? meta.tone;
  const t = TONES[tone];

  return (
    <Button variant="ghost"
      style={{ width: "100%", height: "auto", borderRadius: 0, justifyContent: "flex-start", padding: "7px 14px", textAlign: "left" }}>
      <div style={{
        width: 28, height: 28, borderRadius: "var(--sd-radius-sm)",
        background: t.tint, color: t.text,
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <Icon size={14} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{result.title}</div>
        {result.subtitle && <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1 }}>{result.subtitle}</div>}
      </div>
      {result.meta && (
        <span style={{ fontSize: 10, color: "var(--sd-font-tertiary)", flexShrink: 0 }}>{result.meta}</span>
      )}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Demo wrapper                                                           */
/* ------------------------------------------------------------------ */

function SearchModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Button variant="secondary" leftIcon={<IconSearch size={14} />} onClick={() => setOpen(true)}>
          Search…
          <span style={{ marginLeft: 6, fontSize: 11, padding: "1px 6px", border: "1px solid var(--sd-border-medium)", borderRadius: 4, color: "var(--sd-font-tertiary)" }}>⌘K</span>
        </Button>
      </div>

      <p style={{ fontSize: 12, color: "var(--sd-font-tertiary)", margin: "12px 0 0" }}>
        Click the button above to open the search modal. Try typing "atlas", "priya", or "inbox".
      </p>

      <SearchModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "search-modal",
  title: "SearchModal",
  group: "Patterns",
  status: "stable",
  summary: "Global command-K search overlay for creators, campaigns, deals, and pages.",
  description:
    "SearchModal is the app-wide search interface, typically triggered by ⌘K or clicking a search button in the top nav. It renders a centered modal with a backdrop, a full-width search input, and grouped results. Empty state shows recent items and quick action shortcuts (New campaign, Add creator, Send offer). As the user types, results group into Creators, Campaigns, Deals, and Pages sections with a 4-item cap per group. Each result row shows a toned icon, title, subtitle, and optional meta badge. No results shows a friendly empty state. Footer shows keyboard shortcut hints (↑↓ navigate, ↵ select, Esc close). Dismiss by clicking the backdrop or pressing Escape.",
  demos: [
    {
      title: "Global search",
      description: "Click the search button (or press ⌘K in the real app) to open. Try typing 'atlas', 'priya', or 'inbox'. Empty state shows recent + quick actions.",
      render: () => <SearchModalDemo />,
    },
  ],
  props: [
    {
      title: "SearchModal",
      rows: [
        { name: "open",    type: "boolean",    required: true,  description: "Controls modal visibility." },
        { name: "onClose", type: "() => void", required: true,  description: "Called on Escape keydown or backdrop click." },
      ],
    },
  ],
};

export default doc;
