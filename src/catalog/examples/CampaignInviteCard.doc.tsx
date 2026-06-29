"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import Avatar from "@/components/ui/Avatar/Avatar";
import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconCheck,
  IconX,
  IconMessageCircle,
  IconCalendar,
  IconCurrencyDollar,
  IconSparkles,
  IconClock,
  IconStar,
  IconChevronDown,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type CardState = "pending" | "accepted" | "declined" | "countered";

const DELIVERABLES = [
  { icon: IconBrandInstagram, label: "1× IG Reel (15–30s)"      },
  { icon: IconBrandInstagram, label: "3× IG Stories"             },
  { icon: IconBrandTiktok,    label: "1× TikTok (30–60s)"       },
];

const TIMELINE = [
  { label: "Brief available",    date: "Jun 30, 2026" },
  { label: "Product ships",      date: "Jul 4, 2026"  },
  { label: "Draft due",          date: "Jul 18, 2026" },
  { label: "Go-live window",     date: "Jul 28–Aug 4" },
];

/* ---- Counter-offer panel ---- */

function CounterPanel({ onSubmit, onCancel }: { onSubmit: (v: string) => void; onCancel: () => void }) {
  const [fee, setFee] = useState("");
  const [note, setNote] = useState("");

  return (
    <div style={{ padding: "14px 16px", borderTop: "1px solid var(--sd-border-default, #e5e7eb)", background: "var(--sd-bg-secondary, #f9f9f9)" }}>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Make a counter-offer</div>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", display: "block", marginBottom: 4 }}>Your fee (USD)</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: "var(--sd-font-tertiary, #999)" }}>$</span>
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              placeholder="2,800"
              style={{ width: "100%", height: 36, padding: "0 10px 0 22px", borderRadius: 8, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 13, fontWeight: 700, outline: "none" }}
            />
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <label style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)", display: "block", marginBottom: 4 }}>Note (optional)</label>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Rates increased since last campaign"
            style={{ width: "100%", height: 36, padding: "0 10px", borderRadius: 8, border: "1px solid var(--sd-border-medium, #d1d5db)", background: "#fff", fontSize: 12, outline: "none" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button variant="secondary" size="sm" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" size="sm" disabled={!fee} onClick={() => onSubmit(fee)}>
          Send counter-offer
        </Button>
      </div>
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [state, setState] = useState<CardState>("pending");
  const [showCounter, setShowCounter] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [counterFee, setCounterFee] = useState("");

  function handleCounter(fee: string) {
    setCounterFee(fee);
    setShowCounter(false);
    setState("countered");
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", maxWidth: 520 }}>
      {/* Card */}
      <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 14, overflow: "hidden" }}>

        {/* Brand header */}
        <div style={{ padding: "16px 18px", background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: TONES.yellow.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
              ✨
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800 }}>Summer Glow — Q3 2026</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Aura Labs · Beauty & Skincare</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Badge label="New invite" tone="yellow" />
            </div>
          </div>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>
            We'd love to partner with you on our hero summer launch. You're a perfect fit for our audience of glow-obsessed skincare lovers.
          </p>
        </div>

        {/* Deal terms */}
        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          {/* Fee */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconCurrencyDollar size={16} style={{ color: TONES.green.text }} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Offered fee</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--sd-font-primary, #111)" }}>$2,400</div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Payment split</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>50% on signing · 50% on approval</div>
            </div>
          </div>

          {/* Deliverables */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>Deliverables</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {DELIVERABLES.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--sd-font-primary, #111)" }}>
                  <Icon size={13} style={{ color: "var(--sd-font-tertiary, #999)", flexShrink: 0 }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Key terms */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { label: "6-month usage rights", icon: IconStar },
              { label: "30-day beauty exclusivity", icon: IconClock },
              { label: "25% kill fee", icon: IconCurrencyDollar },
            ].map(({ label, icon: Icon }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 11, color: "var(--sd-font-secondary, #555)" }}>
                <Icon size={10} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline toggle */}
        <div style={{ borderBottom: "1px solid var(--sd-border-default, #e5e7eb)" }}>
          <button
            onClick={() => setShowTimeline((v) => !v)}
            style={{ width: "100%", padding: "10px 18px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary, #111)" }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <IconCalendar size={13} style={{ color: "var(--sd-font-tertiary, #999)" }} />
              Campaign timeline
            </span>
            <IconChevronDown size={13} style={{ transform: showTimeline ? "rotate(180deg)" : "none", transition: "transform 0.15s", color: "var(--sd-font-tertiary, #999)" }} />
          </button>
          {showTimeline && (
            <div style={{ padding: "0 18px 12px" }}>
              {TIMELINE.map(({ label, date }, i) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderBottom: i < TIMELINE.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none" }}>
                  <span style={{ color: "var(--sd-font-secondary, #555)" }}>{label}</span>
                  <span style={{ fontWeight: 600, color: "var(--sd-font-primary, #111)" }}>{date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* State: pending — action buttons */}
        {state === "pending" && !showCounter && (
          <div style={{ padding: "14px 18px", display: "flex", gap: 8, alignItems: "center" }}>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<IconCheck size={13} />}
              onClick={() => setState("accepted")}
            >
              Accept invite
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<IconMessageCircle size={13} />}
              onClick={() => setShowCounter(true)}
            >
              Counter-offer
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<IconX size={13} />}
              onClick={() => setState("declined")}
            >
              Decline
            </Button>
            <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--sd-font-tertiary, #999)", display: "flex", alignItems: "center", gap: 4 }}>
              <IconClock size={11} />
              Expires Jul 3
            </span>
          </div>
        )}

        {/* Counter-offer panel */}
        {showCounter && (
          <CounterPanel onSubmit={handleCounter} onCancel={() => setShowCounter(false)} />
        )}

        {/* State: accepted */}
        {state === "accepted" && (
          <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: TONES.green.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconCheck size={14} style={{ color: TONES.green.text }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: TONES.green.text }}>Invite accepted!</div>
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Your contract will be sent within 24 hours.</div>
            </div>
            <Button variant="secondary" size="sm" style={{ marginLeft: "auto" }} onClick={() => setState("pending")}>Undo</Button>
          </div>
        )}

        {/* State: declined */}
        {state === "declined" && (
          <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--sd-bg-tertiary, #f1f1f1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconX size={14} style={{ color: "var(--sd-font-tertiary, #999)" }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-secondary, #555)" }}>Invite declined</div>
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>We'll let Aura Labs know. Thanks for your time!</div>
            </div>
            <Button variant="secondary" size="sm" style={{ marginLeft: "auto" }} onClick={() => setState("pending")}>Undo</Button>
          </div>
        )}

        {/* State: countered */}
        {state === "countered" && (
          <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: TONES.yellow.tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconMessageCircle size={14} style={{ color: TONES.yellow.text }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: TONES.yellow.text }}>Counter-offer sent — ${Number(counterFee).toLocaleString()}</div>
              <div style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Aura Labs will review and respond within 48 hours.</div>
            </div>
            <Button variant="secondary" size="sm" style={{ marginLeft: "auto" }} onClick={() => setState("pending")}>Undo</Button>
          </div>
        )}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-invite-card",
  title: "CampaignInviteCard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator-facing campaign invite — brand header, deal terms, deliverables, timeline toggle, and accept / counter-offer / decline actions.",
  description:
    "The card a creator sees when invited to a campaign. Dark gradient brand header with campaign name and new-invite badge. Deal section: offered fee ($2,400) with payment split, deliverable list with platform icons, key terms chips (usage, exclusivity, kill fee). Collapsible timeline. Action row: Accept (primary), Counter-offer (opens inline fee/note form), Decline. State transitions: accepted → green confirmation; declined → gray; countered → yellow with submitted amount. All states have an Undo button. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign invite card",
      description: "Try Accept, Decline, or Counter-offer. Counter-offer opens an inline form — enter a fee and submit to see the countered state.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
