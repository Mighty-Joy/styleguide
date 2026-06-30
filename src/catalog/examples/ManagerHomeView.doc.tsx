"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── creator roster row ─────────────────────────────────── */
function CreatorRosterRow({ name, initials, handle, activeDeals, pendingEarnings, nextTask, hasAlert }: {
  name: string; initials: string; handle: string;
  activeDeals: number; pendingEarnings: string;
  nextTask: string; hasAlert?: boolean;
}) {
  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          12,
      padding:      "11px 0",
      borderBottom: "1px solid var(--sd-border-default)",
    }}>
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar size="sm" name={name} initials={initials} />
        {hasAlert && (
          <div style={{
            position:     "absolute",
            top:          -2,
            right:        -2,
            width:        8,
            height:       8,
            borderRadius: "50%",
            background:   "#EF4444",
            border:       "1.5px solid var(--sd-bg-secondary)",
          }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{name}</div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{handle}</div>
      </div>
      <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>{activeDeals}</div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>deals</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 700, color: "var(--sd-font-primary)" }}>{pendingEarnings}</div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>pending</div>
        </div>
      </div>
      <div style={{ minWidth: 160, flexShrink: 0 }}>
        <div style={{
          fontFamily:   "var(--sd-font)",
          fontSize:     11,
          color:        hasAlert ? "#EF4444" : "var(--sd-font-tertiary)",
          fontWeight:   hasAlert ? 600 : 400,
        }}>
          {hasAlert ? "⚠ " : ""}{nextTask}
        </div>
      </div>
      <Button variant="secondary" size="sm">Manage</Button>
    </div>
  );
}

/* ── brand invite card ──────────────────────────────────── */
function InviteCard({ brand, initials, campaign, dealType, forCreator, amount, expiresIn }: {
  brand: string; initials: string; campaign: string; dealType: string;
  forCreator: string; amount: string; expiresIn: string;
}) {
  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          12,
      padding:      "11px 14px",
      background:   "var(--sd-bg-secondary)",
      border:       "1px solid var(--sd-border-default)",
      borderRadius: 10,
    }}>
      <div style={{
        width:          36,
        height:         36,
        borderRadius:   8,
        background:     "linear-gradient(135deg, #6366F1, #8B5CF6)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     "var(--sd-font)",
        fontSize:       12,
        fontWeight:     700,
        color:          "#fff",
        flexShrink:     0,
      }}>
        {initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>{brand}</div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
          {campaign} · {dealType} · for {forCreator}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>{amount}</div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>Expires {expiresIn}</div>
      </div>
      <Button variant="primary" size="sm">Review</Button>
    </div>
  );
}

/* ── summary tiles ──────────────────────────────────────── */
function SummaryTile({ icon, label, value, sub }: { icon: string; label: string; value: string; sub?: string }) {
  return (
    <div style={{
      display:       "flex",
      flexDirection: "column",
      gap:           4,
      padding:       "13px 15px",
      background:    "var(--sd-bg-secondary)",
      border:        "1px solid var(--sd-border-default)",
      borderRadius:  10,
    }}>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {icon} {label}
      </div>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 22, fontWeight: 800, color: "var(--sd-font-primary)" }}>{value}</div>
      {sub && <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{sub}</div>}
    </div>
  );
}

function ManagerHomeViewDemo() {
  const [rosterTab, setRosterTab] = useState<"alerts" | "all">("alerts");

  const ALL_CREATORS = [
    { name: "Priya Nair",   initials: "PN", handle: "@priya.glows",     activeDeals: 3, pendingEarnings: "$1,200", nextTask: "Film & edit reel — overdue", hasAlert: true  },
    { name: "Leo Park",     initials: "LP", handle: "@leopark.ttk",     activeDeals: 2, pendingEarnings: "$800",   nextTask: "Post to Instagram · Jul 8",  hasAlert: false },
    { name: "Maya Chen",    initials: "MC", handle: "@mayabeautyco",    activeDeals: 1, pendingEarnings: "$0",     nextTask: "Contract pending signature",  hasAlert: true  },
    { name: "Sofia Ruiz",   initials: "SR", handle: "@sofiaruizbeauty", activeDeals: 2, pendingEarnings: "$2,400", nextTask: "Awaiting content approval",   hasAlert: false },
    { name: "Amir Hassan",  initials: "AH", handle: "@amirh.creates",   activeDeals: 1, pendingEarnings: "$3,500", nextTask: "Awaiting payment release",    hasAlert: false },
  ];

  const visible = rosterTab === "alerts" ? ALL_CREATORS.filter(c => c.hasAlert) : ALL_CREATORS;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      {/* greeting */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 20, fontWeight: 800, color: "var(--sd-font-primary)" }}>
            Good morning, Jordan 👋
          </div>
          <div style={{ fontFamily: "var(--sd-font)", fontSize: 13, color: "var(--sd-font-tertiary)", marginTop: 3 }}>
            5 creators · 2 need attention today
          </div>
        </div>
        <Button variant="primary" size="sm">+ Add creator</Button>
      </div>

      {/* roster summary tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <SummaryTile icon="👥" label="Roster"          value="5"      sub="creators managed"      />
        <SummaryTile icon="🤝" label="Active deals"    value="9"      sub="across all creators"   />
        <SummaryTile icon="💰" label="Pending earnings" value="$7.9K"  sub="awaiting payment"      />
        <SummaryTile icon="⚠️" label="Needs attention" value="2"      sub="creators need action"  />
      </div>

      {/* pending offers section */}
      <div style={{ background: "var(--sd-bg-secondary)", border: "1px solid var(--sd-border-default)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "13px 16px",
          borderBottom:   "1px solid var(--sd-border-default)",
          background:     "var(--sd-bg-tertiary)",
        }}>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            Pending offers
          </span>
          <Badge label="3 new" tone="blue" variant="solid" size="sm" />
        </div>
        <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          <InviteCard brand="Aura Labs"   initials="AL" campaign="Summer Glow"    dealType="Paid Post" forCreator="Priya Nair" amount="$1,200" expiresIn="3d" />
          <InviteCard brand="Vibe Beauty" initials="VB" campaign="Fall Collection" dealType="UGC"       forCreator="Leo Park"   amount="$650"   expiresIn="7d" />
          <InviteCard brand="Nova Skincare" initials="NS" campaign="Glow Up"     dealType="Gifting"   forCreator="Maya Chen"  amount="Gift"   expiresIn="5d" />
        </div>
      </div>

      {/* creator roster */}
      <div style={{ background: "var(--sd-bg-secondary)", border: "1px solid var(--sd-border-default)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "10px 16px",
          borderBottom:   "1px solid var(--sd-border-default)",
          background:     "var(--sd-bg-tertiary)",
        }}>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>
            My Roster
          </span>
          <div style={{ display: "flex", gap: 2, background: "var(--sd-bg-secondary)", borderRadius: 7, padding: 2, border: "1px solid var(--sd-border-default)" }}>
            {([["alerts", "Needs action"], ["all", "All creators"]] as const).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setRosterTab(id)}
                style={{
                  fontFamily:   "var(--sd-font)",
                  fontSize:     11,
                  fontWeight:   rosterTab === id ? 700 : 500,
                  padding:      "3px 10px",
                  borderRadius: 5,
                  border:       "none",
                  background:   rosterTab === id ? "var(--sd-bg-tertiary)" : "transparent",
                  color:        rosterTab === id ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
                  cursor:       "pointer",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding: "4px 16px 8px" }}>
          {visible.map(c => <CreatorRosterRow key={c.name} {...c} />)}
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug:        "manager-home-view",
  title:       "Manager Home View",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Talent manager home — roster summary tiles, pending brand offers for review, and creator roster with alerts and deal status. Third user type.",
  description: "The talent manager's home page. A manager represents one or more creators and reviews/accepts brand deals on their behalf. Summary tiles (roster size, active deals, pending earnings, alerts). Pending Offers section lists incoming brand invites tagged to which creator they're for. My Roster table shows all managed creators with active deal count, pending earnings, and next required action — filterable to alerts-only.",
  demos: [
    { title: "Manager Home — Jordan", render: () => <ManagerHomeViewDemo />, block: true, plain: true, maxWidth: 880 },
  ],
  props: [
    {
      rows: [
        { name: "manager",       type: "ManagerProfile",   required: true,  description: "Manager identity for the greeting." },
        { name: "rosterCreators",type: "ManagedCreator[]", required: true,  description: "Creators this manager represents, with deal + earning + task status." },
        { name: "pendingOffers", type: "ManagerOffer[]",   required: true,  description: "Brand invites that need manager review/acceptance on behalf of a creator." },
        { name: "onReviewOffer", type: "(id: string) => void", required: false, description: "Open offer review flow for a specific creator." },
        { name: "onManageCreator",type: "(id: string) => void",required: false, description: "Open the creator's deal workspace." },
      ],
    },
  ],
};

export default doc;
