"use client";

import React, { useState } from "react";
import {
  IconLayoutSidebar,
  IconSearch,
  IconBell,
  IconSettings,
  IconBolt,
  IconUsers,
  IconPhoto,
  IconPackage,
  IconCheckbox,
  IconMessageCircle,
  IconHome,
  IconChevronRight,
  IconPlus,
  IconDotsVertical,
  IconBrandInstagram,
  IconBrandTiktok,
  IconX,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Shell constants                                                       */
/* ------------------------------------------------------------------ */

const SIDEBAR_W  = 220;
const MAIN_MIN   = 480;
const PANEL_W    = 360;

/* ------------------------------------------------------------------ */
/* Left sidebar nav                                                      */
/* ------------------------------------------------------------------ */

type Section = "home" | "creators" | "deals" | "content" | "messages" | "shipments" | "tasks";

const NAV_ITEMS: { id: Section; label: string; icon: React.ElementType; count?: number }[] = [
  { id: "home",      label: "Home",      icon: IconHome },
  { id: "creators",  label: "Creators",  icon: IconUsers,       count: 24 },
  { id: "deals",     label: "Deals",     icon: IconBolt,        count: 8 },
  { id: "content",   label: "Content",   icon: IconPhoto,       count: 12 },
  { id: "messages",  label: "Messages",  icon: IconMessageCircle, count: 3 },
  { id: "shipments", label: "Shipments", icon: IconPackage },
  { id: "tasks",     label: "Tasks",     icon: IconCheckbox,    count: 5 },
];

function Sidebar({ active, onSelect }: { active: Section; onSelect: (s: Section) => void }) {
  return (
    <div style={{ width: SIDEBAR_W, flexShrink: 0, height: "100%", background: "var(--sd-bg-secondary)", borderRight: "1px solid var(--sd-border-light)", display: "flex", flexDirection: "column" }}>
      {/* Workspace header */}
      <div style={{ height: 52, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", borderBottom: "1px solid var(--sd-border-light)" }}>
        <div style={{ width: 24, height: 24, borderRadius: "var(--sd-radius-sm)", background: "var(--sd-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="white"/></svg>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>Superdeal</span>
        <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", background: "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "2px 7px" }}>Beta</span>
      </div>

      {/* Search */}
      <div style={{ padding: "10px 10px 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, height: 30, padding: "0 10px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", color: "var(--sd-font-tertiary)" }}>
          <IconSearch size={13} />
          <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>Search…</span>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: "4px 8px", display: "flex", flexDirection: "column", gap: 1 }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon, count }) => {
          const isActive = active === id;
          return (
            <Button key={id} variant="ghost" onClick={() => onSelect(id)}
              style={{ width: "100%", height: 32, borderRadius: "var(--sd-radius-sm)", justifyContent: "flex-start",
                padding: "0 8px", background: isActive ? "var(--sd-bg-primary)" : "transparent",
                color: isActive ? "var(--sd-font-primary)" : "var(--sd-font-secondary)",
                fontWeight: isActive ? 600 : 500, fontSize: 13,
                boxShadow: isActive ? "0 1px 3px 0 rgba(0,0,0,0.06)" : "none" }}>
              <Icon size={16} style={{ flexShrink: 0, color: isActive ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)" }} />
              <span style={{ flex: 1 }}>{label}</span>
              {count != null && (
                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#fff" : "var(--sd-font-tertiary)", background: isActive ? "var(--sd-bg-inverted)" : "var(--sd-bg-tertiary)", borderRadius: "var(--sd-radius-pill)", padding: "1px 6px" }}>
                  {count}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Bottom: user */}
      <div style={{ height: 52, display: "flex", alignItems: "center", gap: 8, padding: "0 12px", borderTop: "1px solid var(--sd-border-light)" }}>
        <Avatar name="Eric Dahan" size="md" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>Eric Dahan</div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Atlas Brands</div>
        </div>
        <IconSettings size={15} style={{ color: "var(--sd-font-tertiary)", cursor: "pointer" }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main content area                                                     */
/* ------------------------------------------------------------------ */

const ROSTER_CREATORS = [
  { id: "1", name: "Maya Rivers",  handle: "@mayarivers", tone: "pink" as keyof typeof TONES,  platforms: [{ icon: IconBrandInstagram, followers: "128K" }, { icon: IconBrandTiktok, followers: "2.3M" }], stage: "Review",     deals: 1 },
  { id: "2", name: "Priya Nair",   handle: "@priya",      tone: "purple" as keyof typeof TONES, platforms: [{ icon: IconBrandInstagram, followers: "340K" }, { icon: IconBrandTiktok, followers: "820K" }], stage: "Contracted", deals: 3 },
  { id: "3", name: "Leo Park",     handle: "@leopark",    tone: "blue" as keyof typeof TONES,  platforms: [{ icon: IconBrandInstagram, followers: "41K" }],                                                  stage: "Invited",    deals: 0 },
  { id: "4", name: "Nina Cole",    handle: "@ninacole",   tone: "green" as keyof typeof TONES, platforms: [{ icon: IconBrandTiktok, followers: "86K" }, { icon: IconBrandInstagram, followers: "22K" }],    stage: "Contracted", deals: 2 },
];

const STAGE_TONE: Record<string, keyof typeof TONES> = {
  Review: "orange", Contracted: "green", Invited: "blue",
};

function CreatorRow({ c, selected, onSelect }: { c: typeof ROSTER_CREATORS[0]; selected: boolean; onSelect: () => void }) {
  const t = TONES[c.tone];
  return (
    <div onClick={onSelect}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", height: 52, cursor: "pointer", background: selected ? "var(--sd-bg-secondary)" : "transparent", borderLeft: selected ? "2px solid var(--sd-bg-inverted)" : "2px solid transparent" }}
      onMouseEnter={(e) => { if (!selected) (e.currentTarget as HTMLDivElement).style.background = "var(--sd-bg-tertiary)"; }}
      onMouseLeave={(e) => { if (!selected) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
    >
      {/* Avatar */}
      <Avatar name={c.name} size="lg" />
      {/* Identity */}
      <div style={{ flex: "0 0 160px", minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-secondary)", fontWeight: 500 }}>{c.handle}</div>
      </div>
      {/* Platforms */}
      <div style={{ display: "flex", gap: 6, flex: 1 }}>
        {c.platforms.map(({ icon: Icon, followers }, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 20, padding: "0 7px", borderRadius: "var(--sd-radius-pill)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)" }}>
            <Icon size={11} />{followers}
          </span>
        ))}
      </div>
      {/* Stage */}
      <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: "var(--sd-radius-pill)", background: TONES[STAGE_TONE[c.stage] ?? "blue"].tint, color: TONES[STAGE_TONE[c.stage] ?? "blue"].text, whiteSpace: "nowrap" }}>
        {c.stage}
      </span>
      {/* Deals */}
      <span style={{ width: 40, textAlign: "right", fontSize: 12, color: "var(--sd-font-tertiary)", fontWeight: 500 }}>{c.deals} deal{c.deals !== 1 ? "s" : ""}</span>
    </div>
  );
}

function MainPane({ section, selectedId, onSelect }: { section: Section; selectedId: string | null; onSelect: (id: string) => void }) {
  return (
    <div style={{ flex: 1, minWidth: MAIN_MIN, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Top bar */}
      <div style={{ height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", borderBottom: "1px solid var(--sd-border-light)", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            {NAV_ITEMS.find(n => n.id === section)?.label ?? ""}
          </div>
          <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Atlas X Summer · Campaign</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
          <Button variant="secondary" size="sm" leftIcon={<IconPlus size={13} />}>Add creator</Button>
          <Button variant="ghost" iconOnly aria-label="Notifications"><IconBell size={16} /></Button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ height: 36, display: "flex", alignItems: "center", gap: 6, padding: "0 16px", borderBottom: "1px solid var(--sd-border-light)", fontSize: 12, color: "var(--sd-font-tertiary)" }}>
        <span>Atlas X Summer</span>
        <IconChevronRight size={12} />
        <span style={{ color: "var(--sd-font-primary)", fontWeight: 600 }}>Creators</span>
        <span style={{ marginLeft: "auto", fontSize: 11 }}>{ROSTER_CREATORS.length} creators</span>
      </div>

      {/* Table header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 16px", height: 34, background: "var(--sd-bg-secondary)", borderBottom: "1px solid var(--sd-border-light)" }}>
        {[["Creator", "196px"], ["Platforms", "1fr"], ["Stage", "90px"], ["Deals", "40px"]].map(([label, w]) => (
          <span key={label} style={{ flex: label === "Platforms" ? 1 : `0 0 ${w}`, fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
        ))}
      </div>

      {/* Rows */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {ROSTER_CREATORS.map((c) => (
          <React.Fragment key={c.id}>
            <CreatorRow c={c} selected={selectedId === c.id} onSelect={() => onSelect(c.id)} />
            <div style={{ height: 1, background: "var(--sd-border-light)" }} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Right panel                                                           */
/* ------------------------------------------------------------------ */

type PanelTab = "info" | "deals" | "messages";

function RightPanel({ creatorId, onClose }: { creatorId: string; onClose: () => void }) {
  const [tab, setTab] = useState<PanelTab>("info");
  const creator = ROSTER_CREATORS.find(c => c.id === creatorId)!;
  const tone = TONES[creator.tone];

  return (
    <div style={{ width: PANEL_W, flexShrink: 0, height: "100%", background: "var(--sd-bg-primary)", borderLeft: "1px solid var(--sd-border-light)", display: "flex", flexDirection: "column" }}>
      {/* Panel header */}
      <div style={{ flexShrink: 0, borderBottom: "1px solid var(--sd-border-light)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 14px 10px" }}>
          {/* Avatar */}
          <Avatar name={creator.name} size="lg" />
          {/* Identity */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--sd-font-primary)" }}>{creator.name}</div>
            <div style={{ fontSize: 12, color: "var(--sd-font-secondary)", fontWeight: 500, marginTop: 1 }}>{creator.handle}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
              {creator.platforms.map(({ icon: Icon, followers }, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 20, padding: "0 7px", borderRadius: "var(--sd-radius-pill)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)" }}>
                  <Icon size={11} />{followers}
                </span>
              ))}
            </div>
          </div>
          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button variant="ghost" iconOnly size="sm" aria-label="More options"><IconDotsVertical size={15} /></Button>
            <Button variant="ghost" iconOnly size="sm" aria-label="Close panel" onClick={onClose}><IconX size={15} /></Button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", padding: "0 8px 0", gap: 2 }}>
          {(["info", "deals", "messages"] as PanelTab[]).map((t) => (
            <Button key={t} variant="ghost" onClick={() => setTab(t)}
              style={{ height: 34, borderRadius: 0, padding: "0 12px",
                fontWeight: tab === t ? 600 : 400, color: tab === t ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                borderBottom: tab === t ? "2px solid var(--sd-bg-inverted)" : "2px solid transparent",
                textTransform: "capitalize" }}>
              {t}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px" }}>
        {tab === "info" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* About */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>About</div>
              <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-secondary)", lineHeight: 1.55 }}>Lifestyle & beauty creator. Known for authentic skincare routines and morning GRWM content. Audience is 72% female, 18-34.</p>
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                { label: "Avg. ER", value: "7.4%" },
                { label: "Avg. Views", value: "284K" },
                { label: "Total Followers", value: "1.16M" },
                { label: "Active Deals", value: String(creator.deals) },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: "8px 10px", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", border: "1px solid var(--sd-border-light)" }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "var(--sd-font-primary)", marginTop: 2 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "deals" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {creator.deals === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: "var(--sd-font-tertiary)", fontSize: 13 }}>No deals yet</div>
            ) : (
              [
                { label: "Atlas X — Morning Reel", amount: "$2,500", status: "Edited" },
                { label: "Atlas X — Serum Review", amount: "$1,800", status: "Script" },
                { label: "Summer Glow Stories ×3", amount: "$900",   status: "Live" },
              ].slice(0, creator.deals).map((deal) => (
                <div key={deal.label} style={{ padding: "10px 12px", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-sm)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "var(--sd-radius-sm)", background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", color: TONES.green.solid }}>
                    <IconBolt size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{deal.label}</div>
                    <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{deal.amount}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: "var(--sd-radius-pill)", background: "var(--sd-bg-tertiary)", color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>{deal.status}</span>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "messages" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { subject: "Atlas X script feedback", preview: "Hey! I reviewed the brief and love the morning angle...", date: "Jun 27", unread: true },
              { subject: "Contract signed ✓", preview: "Thank you for the opportunity! All signed and sent back.", date: "Jun 24", unread: false },
            ].map((thread) => (
              <div key={thread.subject} style={{ padding: "10px 12px", border: `1px solid ${thread.unread ? "var(--sd-border-medium)" : "var(--sd-border-light)"}`, borderRadius: "var(--sd-radius-sm)", cursor: "pointer", background: thread.unread ? "var(--sd-bg-secondary)" : "var(--sd-bg-primary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: thread.unread ? 700 : 500, color: "var(--sd-font-primary)" }}>{thread.subject}</span>
                  <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{thread.date}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{thread.preview}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App Shell demo                                                        */
/* ------------------------------------------------------------------ */

function AppShellDemo() {
  const [section, setSection] = useState<Section>("creators");
  const [selectedId, setSelectedId] = useState<string | null>("1");

  return (
    <div style={{ width: "100%", height: 560, display: "flex", border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
      <Sidebar active={section} onSelect={setSection} />
      <MainPane section={section} selectedId={selectedId} onSelect={(id) => setSelectedId(id === selectedId ? null : id)} />
      {selectedId && <RightPanel creatorId={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc export                                                            */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "app-shell",
  title: "App Shell",
  group: "Layout",
  status: "stable",
  summary: "The 3-pane workspace: sidebar nav + main content area + right inspector panel. Fully interactive.",
  description:
    "Demonstrates the complete Superdeal workspace anatomy: left sidebar (nav + search + user footer), main content pane (topbar + breadcrumb + record list), and right inspector panel (tabbed — Info, Deals, Messages). Click any row to open the right panel; click a sidebar item to change the active section; click × to close the panel. All three panes read from `--sd-*` tokens so the shell automatically inherits any theme update.",
  demos: [
    {
      title: "3-pane workspace",
      description: "Click rows to open the right panel. Click nav items to switch sections. Click × to dismiss the panel.",
      block: true,
      render: () => <AppShellDemo />,
    },
  ],
  props: [],
};

export default doc;
