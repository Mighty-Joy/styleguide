"use client";
import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import type { ComponentDoc } from "@/catalog/types";

/* ── earning tile ───────────────────────────────────────── */
function EarningTile({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div style={{
      flex:          1,
      display:       "flex",
      flexDirection: "column",
      gap:           4,
      padding:       "12px 14px",
      background:    "rgba(255,255,255,0.12)",
      borderRadius:  9,
      border:        "1px solid rgba(255,255,255,0.15)",
    }}>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {icon} {label}
      </div>
      <div style={{ fontFamily: "var(--sd-font)", fontSize: 20, fontWeight: 800, color: "#fff" }}>
        {value}
      </div>
    </div>
  );
}

/* ── opportunity card ───────────────────────────────────── */
function OpportunityCard({ brand, initials, campaign, dealType, amount, expiresIn, isNew }: {
  brand: string; initials: string; campaign: string; dealType: string;
  amount: string; expiresIn: string; isNew?: boolean;
}) {
  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          12,
      padding:      "12px 14px",
      background:   "var(--sd-bg-secondary)",
      border:       "1px solid var(--sd-border-default)",
      borderRadius: 10,
    }}>
      <div style={{
        width:          38,
        height:         38,
        borderRadius:   9,
        background:     "linear-gradient(135deg, #6366F1, #8B5CF6)",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     "var(--sd-font)",
        fontSize:       13,
        fontWeight:     700,
        color:          "#fff",
        flexShrink:     0,
      }}>
        {initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontFamily: "var(--sd-font)", fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>{brand}</span>
          {isNew && (
            <span style={{ fontFamily: "var(--sd-font)", fontSize: 9, fontWeight: 700, color: "#6366F1", background: "#EEF2FF", borderRadius: 100, padding: "1px 6px" }}>
              NEW
            </span>
          )}
        </div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>
          {campaign} · {dealType}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 14, fontWeight: 700, color: "var(--sd-font-primary)" }}>{amount}</div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: "var(--sd-font-tertiary)" }}>Expires {expiresIn}</div>
      </div>
      <Button variant="primary" size="sm">View offer</Button>
    </div>
  );
}

/* ── active deal row ────────────────────────────────────── */
function ActiveDealRow({ brand, campaign, nextTask, dueDate, overdue }: {
  brand: string; campaign: string; nextTask: string; dueDate: string; overdue?: boolean;
}) {
  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          12,
      padding:      "10px 0",
      borderBottom: "1px solid var(--sd-border-default)",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)" }}>{brand}</div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "var(--sd-font-tertiary)" }}>{campaign}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, fontWeight: 500, color: overdue ? "#EF4444" : "var(--sd-font-secondary)" }}>
          {nextTask}
        </div>
        <div style={{ fontFamily: "var(--sd-font)", fontSize: 10, color: overdue ? "#EF4444" : "var(--sd-font-tertiary)" }}>
          {overdue ? "⚠ " : ""}{dueDate}
        </div>
      </div>
    </div>
  );
}

function CreatorHomeViewDemo() {
  const [tab, setTab] = useState<"new" | "active">("new");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* hero earnings banner */}
      <div style={{
        borderRadius: 14,
        background:   "linear-gradient(135deg, #6366F1 0%, #8B5CF6 60%, #EC4899 100%)",
        padding:      "20px 20px 16px",
        display:      "flex",
        flexDirection:"column",
        gap:          16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar size="md" name="Priya Nair" initials="PN" />
          <div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 16, fontWeight: 700, color: "#fff" }}>
              Hey Priya ✨
            </div>
            <div style={{ fontFamily: "var(--sd-font)", fontSize: 11, color: "rgba(255,255,255,0.75)" }}>
              2 new offers waiting · 3 active deals
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <EarningTile label="This month"  value="$3,200" icon="💰" />
          <EarningTile label="Pending"     value="$1,200" icon="⏳" />
          <EarningTile label="All time"    value="$18.4K" icon="🏆" />
        </div>
      </div>

      {/* opportunities / active deals tabs */}
      <div style={{ background: "var(--sd-bg-secondary)", border: "1px solid var(--sd-border-default)", borderRadius: 12, overflow: "hidden" }}>
        {/* tab bar */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--sd-border-default)", background: "var(--sd-bg-tertiary)" }}>
          {([["new", "New offers", "2"], ["active", "Active deals", "3"]] as const).map(([id, label, count]) => {
            const active = tab === id;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          6,
                  padding:      "11px 16px",
                  fontFamily:   "var(--sd-font)",
                  fontSize:     12,
                  fontWeight:   active ? 700 : 500,
                  color:        active ? "#6366F1" : "var(--sd-font-tertiary)",
                  background:   "none",
                  border:       "none",
                  borderBottom: active ? "2px solid #6366F1" : "2px solid transparent",
                  cursor:       "pointer",
                  marginBottom: -1,
                }}
              >
                {label}
                <span style={{
                  fontFamily: "var(--sd-font)", fontSize: 10, fontWeight: 700,
                  color: active ? "#6366F1" : "var(--sd-font-tertiary)",
                  background: active ? "#EEF2FF" : "var(--sd-bg-secondary)",
                  borderRadius: 100, padding: "1px 6px",
                  border: `1px solid ${active ? "#C7D2FE" : "var(--sd-border-default)"}`,
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          {tab === "new" ? (
            <>
              <OpportunityCard brand="Aura Labs"     initials="AL" campaign="Summer Glow"    dealType="Paid Post" amount="$1,200"   expiresIn="3d" isNew />
              <OpportunityCard brand="Vibe Beauty"   initials="VB" campaign="Fall Collection" dealType="UGC"       amount="$650"     expiresIn="7d" isNew />
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ActiveDealRow brand="Aura Labs"   campaign="Summer Glow"    nextTask="Film & edit reel"   dueDate="Due Jul 5"  overdue />
              <ActiveDealRow brand="Nova Skincare" campaign="Glow Up"      nextTask="Post to Instagram"  dueDate="Due Jul 8"  />
              <ActiveDealRow brand="Lumina Co"   campaign="Spring Launch"  nextTask="Awaiting payment"   dueDate="Est Jul 12" />
            </div>
          )}
        </div>
      </div>

      {/* quick action row */}
      <div style={{ display: "flex", gap: 10 }}>
        <Button variant="secondary" size="sm">📲 My tasks</Button>
        <Button variant="secondary" size="sm">💬 Messages</Button>
        <Button variant="secondary" size="sm">💰 Earnings</Button>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug:        "creator-home-view",
  title:       "Creator Home View",
  group:       "Pre-built / Composite",
  status:      "stable",
  summary:     "Creator home screen — earnings banner, new offer cards, and active deal task list. Maps to /creator/opportunities.",
  description: "The creator's home page (redirected to from /creator/home). Hero banner shows creator identity + 3 earning tiles (this month, pending, all time). Tabbed content below: New Offers (brand invites with amount and expiry) and Active Deals (deals in flight with the creator's next task and due date). Quick action row at the bottom. Maps to the creator portal in the app.",
  demos: [
    { title: "Creator Home — Priya Nair", render: () => <CreatorHomeViewDemo />, block: true, plain: true, maxWidth: 880 },
  ],
  props: [
    {
      rows: [
        { name: "creator",      type: "Creator",        required: true,  description: "Creator identity for the hero banner." },
        { name: "earnings",     type: "CreatorEarnings",required: true,  description: "This month / pending / all-time earning figures." },
        { name: "newOffers",    type: "Engagement[]",   required: true,  description: "Pending brand invitations, newest first." },
        { name: "activeDeals",  type: "ActiveDeal[]",   required: true,  description: "In-flight deals with creator's next action and due date." },
      ],
    },
  ],
};

export default doc;
