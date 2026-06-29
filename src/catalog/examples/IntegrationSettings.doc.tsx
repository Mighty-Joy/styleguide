"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconRefresh,
  IconPlus,
  IconExternalLink,
  IconChevronDown,
  IconChevronUp,
  IconShoppingCart,
  IconChartBar,
  IconBrandMeta,
  IconBrandTiktok,
  IconMail,
  IconBolt,
  IconWebhook,
  IconLink,
  IconPlugConnected,
  IconPlugConnectedX,
  IconTrash,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type IntegStatus = "connected" | "error" | "disconnected";
type IntegCategory = "ecommerce" | "analytics" | "ads" | "email" | "automation";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegCategory;
  status: IntegStatus;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  connectedAs?: string;
  lastSync?: string;
  errorMsg?: string;
  scopes: string[];
}

const CAT_META: Record<IntegCategory, { label: string; tone: keyof typeof TONES }> = {
  ecommerce:   { label: "E-commerce",  tone: "green"  },
  analytics:   { label: "Analytics",   tone: "blue"   },
  ads:         { label: "Ads",         tone: "purple" },
  email:       { label: "Email / CRM", tone: "orange" },
  automation:  { label: "Automation",  tone: "gray"   },
};

const STATUS_META: Record<IntegStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  connected:    { label: "Connected",    tone: "green",  icon: IconCheck          },
  error:        { label: "Error",        tone: "red",    icon: IconAlertTriangle  },
  disconnected: { label: "Disconnected", tone: "gray",   icon: IconPlugConnectedX },
};

const INTEGRATIONS: Integration[] = [
  {
    id: "i1", name: "Shopify", category: "ecommerce",
    description: "Sync orders, revenue, and attributed sales from creator affiliate links.",
    icon: IconShoppingCart, iconColor: "#96bf48", iconBg: "#f0f9eb",
    status: "connected", connectedAs: "auralabs.myshopify.com", lastSync: "2 min ago",
    scopes: ["orders:read", "products:read", "analytics:read"],
  },
  {
    id: "i2", name: "Google Analytics 4", category: "analytics",
    description: "Import UTM attribution data and conversion events from your web store.",
    icon: IconChartBar, iconColor: "#f9ab00", iconBg: "#fef9e7",
    status: "error", connectedAs: "UA-48293847-1", lastSync: "6h ago",
    errorMsg: "Token expired — reconnect to restore GA4 data sync.",
    scopes: ["analytics.readonly"],
  },
  {
    id: "i3", name: "Meta Ads", category: "ads",
    description: "Boost creator posts and track paid amplification alongside organic performance.",
    icon: IconBrandMeta, iconColor: "#0866ff", iconBg: "#eff6ff",
    status: "connected", connectedAs: "Aura Labs (Ad account 829301)", lastSync: "15 min ago",
    scopes: ["ads_read", "ads_management", "business_management"],
  },
  {
    id: "i4", name: "TikTok Ads", category: "ads",
    description: "Whitelisting and spark ads from creator content approved in Superdeal.",
    icon: IconBrandTiktok, iconColor: "#000", iconBg: "#f5f5f5",
    status: "disconnected",
    scopes: ["advertiser:read", "spark_ad:read"],
  },
  {
    id: "i5", name: "Klaviyo", category: "email",
    description: "Sync creator campaign milestones as triggers for email flows to your customer list.",
    icon: IconMail, iconColor: "#006e52", iconBg: "#f0faf7",
    status: "disconnected",
    scopes: ["lists:read", "events:write"],
  },
  {
    id: "i6", name: "Zapier", category: "automation",
    description: "Trigger Zaps from Superdeal events — new campaign, payment approved, content live.",
    icon: IconBolt, iconColor: "#ff4a00", iconBg: "#fff4ef",
    status: "connected", connectedAs: "Connected via API key", lastSync: "Just now",
    scopes: ["webhook:events"],
  },
];

/* ---- Demo ---- */
function Demo() {
  const [catFil,    setCatFil]    = useState<IntegCategory | "all">("all");
  const [statuses,  setStatuses]  = useState<Record<string, IntegStatus>>(
    Object.fromEntries(INTEGRATIONS.map((i) => [i.id, i.status]))
  );
  const [expanding, setExpanding] = useState<string | null>(null);
  const [syncing,   setSyncing]   = useState<string | null>(null);

  function connect(id: string) {
    setStatuses((prev) => ({ ...prev, [id]: "connected" }));
  }
  function disconnect(id: string) {
    setStatuses((prev) => ({ ...prev, [id]: "disconnected" }));
  }
  function syncNow(id: string) {
    setSyncing(id);
    setTimeout(() => setSyncing(null), 1800);
  }

  const visible = INTEGRATIONS.filter((i) => catFil === "all" || i.category === catFil);
  const connectedCount = INTEGRATIONS.filter((i) => statuses[i.id] === "connected").length;
  const errorCount     = INTEGRATIONS.filter((i) => statuses[i.id] === "error").length;

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Integrations</div>
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            <Badge label={`${connectedCount} connected`} tone="green" size="sm" dot />
            {errorCount > 0 && <Badge label={`${errorCount} error`} tone="red" size="sm" dot />}
          </div>
        </div>
        <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />}>Browse all</Button>
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={() => setCatFil("all")}
          style={{ padding: "3px 10px", borderRadius: 99, background: catFil === "all" ? "#111" : "var(--sd-bg-secondary, #f1f1f1)", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: catFil === "all" ? "#fff" : "var(--sd-font-secondary, #555)" }}>
          All
        </button>
        {(Object.keys(CAT_META) as IntegCategory[]).map((cat) => {
          const { label, tone } = CAT_META[cat];
          const active = catFil === cat;
          return (
            <button key={cat} onClick={() => setCatFil(active ? "all" : cat)}
              style={{ padding: "3px 10px", borderRadius: 99, background: active ? TONES[tone].tint : "var(--sd-bg-secondary, #f1f1f1)", border: `1px solid ${active ? TONES[tone].text : "transparent"}`, cursor: "pointer", fontSize: 11, fontWeight: 700, color: active ? TONES[tone].text : "var(--sd-font-secondary, #555)" }}>
              {label}
            </button>
          );
        })}
      </div>

      {/* Integration cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {visible.map((integ) => {
          const st    = statuses[integ.id];
          const stMeta = STATUS_META[st];
          const StIcon = stMeta.icon;
          const IntIcon = integ.icon;
          const isExpanded = expanding === integ.id;
          const isSyncing  = syncing  === integ.id;
          const { label: catLabel, tone: catTone } = CAT_META[integ.category];

          return (
            <div key={integ.id} style={{ border: `1px solid ${st === "error" ? TONES.red.tint : "var(--sd-border-default, #e5e7eb)"}`, borderRadius: 12, overflow: "hidden", background: st === "error" ? `${TONES.red.tint}40` : "#fff" }}>
              {/* Main row */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: integ.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IntIcon size={18} style={{ color: integ.iconColor }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 800 }}>{integ.name}</span>
                    <Badge label={catLabel} tone={catTone} size="sm" />
                  </div>
                  <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {st === "connected" && integ.connectedAs ? integ.connectedAs
                     : st === "error" && integ.errorMsg      ? integ.errorMsg
                     : integ.description}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                  {/* Status badge */}
                  <span style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, background: TONES[stMeta.tone].tint, fontSize: 10, fontWeight: 700, color: TONES[stMeta.tone].text }}>
                    <StIcon size={10} />
                    {stMeta.label}
                  </span>

                  {st === "connected" && (
                    <button onClick={() => syncNow(integ.id)}
                      style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--sd-font-tertiary, #999)" }}>
                      <IconRefresh size={13} style={{ color: isSyncing ? TONES.green.text : undefined, animation: isSyncing ? "spin 0.8s linear infinite" : "none" }} />
                    </button>
                  )}

                  {st === "disconnected" && (
                    <Button variant="primary" size="sm" leftIcon={<IconPlugConnected size={11} />} onClick={() => connect(integ.id)}>Connect</Button>
                  )}

                  {(st === "connected" || st === "error") && (
                    <button onClick={() => disconnect(integ.id)}
                      style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <IconTrash size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
                    </button>
                  )}

                  <button onClick={() => setExpanding(isExpanded ? null : integ.id)}
                    style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default, #e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {isExpanded ? <IconChevronUp size={13} style={{ color: "var(--sd-font-tertiary, #999)" }} /> : <IconChevronDown size={13} style={{ color: "var(--sd-font-tertiary, #999)" }} />}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div style={{ borderTop: "1px solid var(--sd-border-default, #e5e7eb)", padding: "12px 14px", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
                  <div style={{ fontSize: 11, color: "var(--sd-font-secondary, #555)", lineHeight: 1.6, marginBottom: 10 }}>{integ.description}</div>

                  {/* Scopes */}
                  <div style={{ marginBottom: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 5 }}>Permissions</div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      {integ.scopes.map((s) => (
                        <div key={s} style={{ padding: "2px 8px", borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 10, fontWeight: 600, fontFamily: "monospace", color: "var(--sd-font-secondary, #555)" }}>{s}</div>
                      ))}
                    </div>
                  </div>

                  {/* Last sync */}
                  {integ.lastSync && st === "connected" && (
                    <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>
                      Last synced: {isSyncing ? <span style={{ color: TONES.green.text, fontWeight: 700 }}>Syncing…</span> : <span style={{ fontWeight: 600 }}>{integ.lastSync}</span>}
                    </div>
                  )}

                  {/* Error reconnect */}
                  {st === "error" && (
                    <div style={{ marginTop: 8 }}>
                      <Button variant="primary" size="sm" leftIcon={<IconPlugConnected size={11} />} onClick={() => connect(integ.id)}>Reconnect</Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "integration-settings",
  title: "IntegrationSettings",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Connected integrations panel — Shopify, GA4, Meta Ads, TikTok Ads, Klaviyo, Zapier with connect/disconnect/sync-now actions and expandable permission scopes.",
  description:
    "Lets brands manage all third-party connections from a single panel. Header: connected count + error count badges, Browse all button. Category filter chips: E-commerce / Analytics / Ads / Email·CRM / Automation. 6 integration cards: each has a colored icon square, name, category badge, status pill (green Connected / yellow Error / gray Disconnected), and per-state action buttons — Sync now (spin animation, turns green while syncing) for connected, Reconnect for error, Connect button for disconnected; expand chevron always shown. Expand reveals: full description, monospace permission scope pills, last-sync timestamp (live while syncing). Shopify connected, GA4 error (expired token — expand shows Reconnect CTA), Meta connected, TikTok disconnected, Klaviyo disconnected, Zapier connected. Disconnect (trash icon) transitions any connected card to disconnected; Connect/Reconnect transitions to connected. Error cards have a red tinted border and background. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Integration settings",
      description: "Expand any card to see permission scopes. Click Sync now to see the spinning refresh + 'Syncing…' state. Expand GA4 and click Reconnect. Disconnect/connect any integration.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
