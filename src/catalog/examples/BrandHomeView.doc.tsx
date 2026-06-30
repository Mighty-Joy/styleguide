"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── stat card ──────────────────────────────────────────── */
function StatTile({ label, value, delta, icon }: { label: string; value: string; delta?: string; icon: string }) {
  const up = delta?.startsWith("+");
  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           6,
      padding:       "14px 16px",
      background:    "var(--sd-bg-secondary)",
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  10,
    }}>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {icon} {label}
      </div>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 22, fontWeight: 800, color: "var(--sd-font-primary)" }}>
        {value}
      </div>
      {delta && (
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, fontWeight: 600, color: up ? "#10B981" : "#EF4444" }}>
          {delta} vs last month
        </div>
      )}
    </div>
  );
}

/* ── campaign row ───────────────────────────────────────── */
function CampaignRow({ name, brand, creatorCount, status, progress }: {
  name: string; brand: string; creatorCount: number; status: string; progress: number;
}) {
  const statusColor = status === "Active" ? "#10B981" : status === "Draft" ? "#6B7280" : "#F59E0B";
  return (
    <div style={{
      display:     "flex",
      alignItems:  "center",
      gap:         14,
      padding:     "11px 0",
      borderBottom:"1px solid var(--sd-border-default)",
    }}>
      <div style={{
        width:          36,
        height:         36,
        borderRadius:   9,
        background:     "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontSize:       16,
        flexShrink:     0,
      }}>
        ☀️
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{name}</div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{brand} · {creatorCount} creators</div>
        <div style={{ marginTop: 4, height: 4, borderRadius: 100, background: "var(--sd-bg-tertiary)", overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#6366F1", borderRadius: 100 }} />
        </div>
      </div>
      <span style={{
        fontFamily:   "var(--sd-font)",
        fontSize:     10,
        fontWeight:   600,
        color:        statusColor,
        background:   `${statusColor}18`,
        borderRadius: 100,
        padding:      "3px 9px",
        flexShrink:   0,
      }}>
        {status}
      </span>
      <Button variant="secondary" size="sm">Open</Button>
    </div>
  );
}

/* ── deal action row ────────────────────────────────────── */
function DealRow({ creator, initials, campaign, amount, action, actionColor = "#3B82F6" }: {
  creator: string; initials: string; campaign: string; amount: string; action: string; actionColor?: string;
}) {
  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          12,
      padding:      "10px 0",
      borderBottom: "1px solid var(--sd-border-default)",
    }}>
      <Avatar size="sm" name={creator} initials={initials} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{creator}</div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{campaign} · {amount}</div>
      </div>
      <span style={{
        fontFamily:   "var(--sd-font)",
        fontSize:     10,
        fontWeight:   600,
        color:        actionColor,
        background:   `${actionColor}15`,
        borderRadius: 100,
        padding:      "3px 9px",
        whiteSpace:   "nowrap",
        flexShrink:   0,
      }}>
        {action}
      </span>
    </div>
  );
}

function BrandHomeViewDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* greeting */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 20, fontWeight: 800, color: "var(--sd-font-primary)" }}>
            Good morning, Sarah 👋
          </div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", marginTop: 3 }}>
            Aura Labs · Here's what needs your attention today.
          </div>
        </div>
        <Button variant="primary" size="sm">+ New campaign</Button>
      </div>

      {/* stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatTile label="Active campaigns" value="3"      icon="📁" delta="+1"    />
        <StatTile label="Active deals"     value="12"     icon="🤝" delta="+3"    />
        <StatTile label="Content pieces"   value="28"     icon="🎬" delta="+8"    />
        <StatTile label="Total reach"      value="1.4M"   icon="📡" delta="+22%"  />
      </div>

      {/* 2-col content */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* campaigns */}
        <div style={{ background: "var(--sd-bg-secondary)", border: "1px solid var(--sd-border-default)", borderRadius: 12, padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Campaigns</span>
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "#6366F1", cursor: "pointer" }}>See all →</span>
          </div>
          <CampaignRow name="Summer Glow"    brand="Aura Labs" creatorCount={6} status="Active" progress={62} />
          <CampaignRow name="Fall Collection" brand="Aura Labs" creatorCount={4} status="Active" progress={24} />
          <CampaignRow name="Q4 Launch"      brand="Aura Labs" creatorCount={0} status="Draft"  progress={0}  />
        </div>

        {/* deals needing action */}
        <div style={{ background: "var(--sd-bg-secondary)", border: "1px solid var(--sd-border-default)", borderRadius: 12, padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>Needs your attention</span>
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 12, color: "#6366F1", cursor: "pointer" }}>See all →</span>
          </div>
          <DealRow creator="Priya Nair"  initials="PN" campaign="Summer Glow" amount="$1,200" action="Review script"   actionColor="#F59E0B" />
          <DealRow creator="Leo Park"    initials="LP" campaign="Summer Glow" amount="$800"   action="Approve content" actionColor="#10B981" />
          <DealRow creator="Sofia Ruiz"  initials="SR" campaign="Fall"         amount="$2,400" action="Awaiting sign"   actionColor="#3B82F6" />
          <DealRow creator="Amir Hassan" initials="AH" campaign="Fall"         amount="$3,500" action="Release payment" actionColor="#8B5CF6" />
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug:        "brand-home-view",
  title:       "Brand Home View",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Brand home screen — greeting, 4 KPI tiles, campaigns with progress bars, and deals needing attention. Maps to HomeView.tsx (brand account context).",
  description: "The brand operator's home page. Greets the user by name with account context. Four stat tiles (active campaigns, deals, content pieces, total reach). Two-column content area: campaign list with progress bars and status, and a priority deal feed showing deals that need brand action (review, approve, sign, pay). Maps to HomeView.tsx in the app.",
  demos: [
    { title: "Brand Home — Aura Labs", render: () => <BrandHomeViewDemo />, block: true, plain: true, maxWidth: 880 },
  ],
  props: [
    {
      rows: [
        { name: "userName",   type: "string",        required: true,  description: "Brand operator name for the greeting." },
        { name: "accountName",type: "string",        required: true,  description: "Brand/account name shown in the sub-line." },
        { name: "stats",      type: "HomeStat[]",    required: true,  description: "KPI tiles (active campaigns, deals, content, reach)." },
        { name: "campaigns",  type: "Campaign[]",    required: true,  description: "Active/draft campaigns with progress." },
        { name: "actionDeals",type: "ActionDeal[]",  required: true,  description: "Deals needing brand attention, action-needed first." },
      ],
    },
  ],
};

export default doc;
