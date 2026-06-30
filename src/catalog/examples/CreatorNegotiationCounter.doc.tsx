"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconCheck,
  IconX,
  IconArrowRight,
  IconCurrencyDollar,
  IconCalendar,
  IconShield,
  IconMessageCircle,
  IconSend,
  IconAlertCircle,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

const BRAND_OFFER = {
  campaignName: "Summer Glow Campaign",
  brand: "Aura Labs",
  brandInitials: "AL",
  deliverables: ["2× Instagram Reels", "4× Stories"],
  fee: 1200,
  timeline: "Jun 10–20",
  exclusivity: "90 days",
  note: "We love your aesthetic and think you'd be a perfect fit for our Luminos launch. Open to negotiation on the details.",
};

const FEE_STEPS = [800, 1000, 1200, 1400, 1600, 1800, 2000, 2400, 2800, 3200];

const RATIONALE_OPTIONS = [
  { key: "rate",       label: "My standard rate",          sub: "This is my published market rate for this deliverable set" },
  { key: "er",         label: "High engagement rate",      sub: "My 9.2% ER delivers more value than the average creator" },
  { key: "timeline",   label: "Timeline adjustment",       sub: "Tighter timeline warrants a premium" },
  { key: "exclusivity",label: "Exclusivity premium",       sub: "90 days restricts other brand deals significantly" },
  { key: "other",      label: "Other",                     sub: "I'll explain in my note below" },
];

function Demo() {
  const [view,         setView]         = useState<"offer" | "counter" | "sent">("offer");
  const [feeIdx,       setFeeIdx]       = useState(6);
  const [reducedEx,    setReducedEx]    = useState(false);
  const [exWindow,     setExWindow]     = useState<"none" | "30" | "60" | "90">("90");
  const [rationale,    setRationale]    = useState("er");
  const [note,         setNote]         = useState("Hi Aura Labs team — I love the campaign concept! My current rate for 2 Reels + 4 Stories is $2,000 given my 9.2% avg ER. I'm also hoping we can reduce the exclusivity to 30 days as I have other non-competing partnerships in the queue. Happy to discuss!");
  const [submitting,   setSubmitting]   = useState(false);
  const [showOffer,    setShowOffer]    = useState(true);

  const proposedFee = FEE_STEPS[feeIdx];
  const feeDelta    = proposedFee - BRAND_OFFER.fee;
  const feeDeltaPct = Math.round((feeDelta / BRAND_OFFER.fee) * 100);

  function submit() {
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setView("sent"); }, 900);
  }

  if (view === "sent") {
    return (
      <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)", textAlign: "center", padding: "28px 0" }}>
        <div style={{ width: 52, height: 52, borderRadius: 99, background: TONES.blue.tint, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
          <IconSend size={24} style={{ color: TONES.blue.text }} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 4 }}>Counter-offer sent!</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)", marginBottom: 14, lineHeight: 1.5 }}>
          Aura Labs will review your counter and respond<br />within 24–48 hours.
        </div>
        <div style={{ display: "flex", gap: 7, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <Badge label={"$" + proposedFee.toLocaleString()} tone="green" size="sm" />
          <Badge label={exWindow === "none" ? "No exclusivity" : exWindow + "-day exclusivity"} tone="orange" size="sm" />
          <Badge label="Awaiting response" tone="blue" size="sm" dot />
        </div>
        <Button variant="secondary" size="sm" onClick={() => { setView("offer"); setFeeIdx(6); setExWindow("90"); }}>Reset demo</Button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 2 }}>Campaign offer</div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary,#999)" }}>Review and respond to this brand invitation</div>
      </div>

      {/* Brand offer card */}
      <button onClick={() => setShowOffer(!showOffer)}
        style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "11px 13px", background: TONES.blue.tint, border: `1px solid ${TONES.blue.text}30`, borderRadius: 11, cursor: "pointer", textAlign: "left", marginBottom: 12 }}>
        <Avatar initials={BRAND_OFFER.brandInitials} tone="blue" size="sm" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: TONES.blue.text }}>{BRAND_OFFER.brand}</div>
          <div style={{ fontSize: 10, color: TONES.blue.text, opacity: 0.7 }}>{BRAND_OFFER.campaignName} · ${BRAND_OFFER.fee.toLocaleString()}</div>
        </div>
        <Badge label="New offer" tone="blue" size="sm" dot />
        {showOffer ? <IconChevronUp size={13} style={{ color: TONES.blue.text }} /> : <IconChevronDown size={13} style={{ color: TONES.blue.text }} />}
      </button>

      {showOffer && (
        <div style={{ padding: "11px 13px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 11, marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            {[
              { Icon: IconCurrencyDollar, label: "Offer fee",     value: "$" + BRAND_OFFER.fee.toLocaleString(), tone: "green"  as const },
              { Icon: IconCalendar,       label: "Timeline",      value: BRAND_OFFER.timeline,                   tone: "purple" as const },
              { Icon: IconShield,         label: "Exclusivity",   value: BRAND_OFFER.exclusivity,               tone: "orange" as const },
            ].map(({ Icon, label, value, tone }) => (
              <div key={label} style={{ padding: "8px 9px", background: TONES[tone].tint, borderRadius: 8 }}>
                <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 1 }}>
                  <Icon size={10} style={{ color: TONES[tone].text }} />
                  <span style={{ fontSize: 9, color: TONES[tone].text, opacity: 0.7 }}>{label}</span>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: TONES[tone].text }}>{value}</div>
              </div>
            ))}
            <div style={{ padding: "8px 9px", background: "var(--sd-bg-secondary,#f9f9f9)", borderRadius: 8 }}>
              <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginBottom: 1 }}>Deliverables</div>
              {BRAND_OFFER.deliverables.map((d) => <div key={d} style={{ fontSize: 10, fontWeight: 600 }}>{d}</div>)}
            </div>
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", fontStyle: "italic", lineHeight: 1.5, borderTop: "1px solid var(--sd-border-default,#e5e7eb)", paddingTop: 8 }}>
            "{BRAND_OFFER.note}"
          </div>
        </div>
      )}

      {/* Counter-offer form */}
      {view === "offer" && (
        <div style={{ display: "flex", gap: 7, marginBottom: 14 }}>
          <Button variant="primary"   size="sm" leftIcon={<IconArrowRight size={11} />} onClick={() => setView("counter")} style={{ flex: 1 }}>Counter-offer</Button>
          <Button variant="secondary" size="sm" leftIcon={<IconCheck size={11} />}      style={{ flex: 1 }}>Accept offer</Button>
          <Button variant="secondary" size="sm" leftIcon={<IconX size={11} />}          style={{ flex: 0 }}>Decline</Button>
        </div>
      )}

      {view === "counter" && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, marginBottom: 12 }}>Your counter-offer</div>

          {/* Fee slider */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700 }}>Proposed fee</span>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 900 }}>${proposedFee.toLocaleString()}</span>
                {feeDelta > 0 && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: TONES.green.text }}>+{feeDeltaPct}%</span>
                )}
              </div>
            </div>
            <input type="range" min={0} max={FEE_STEPS.length - 1} step={1} value={feeIdx}
              onChange={(e) => setFeeIdx(Number(e.target.value))}
              style={{ width: "100%", accentColor: TONES.green.text }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "var(--sd-font-tertiary,#999)", marginTop: 2 }}>
              <span>$800</span><span>Brand offer: ${BRAND_OFFER.fee.toLocaleString()}</span><span>$3,200</span>
            </div>
          </div>

          {/* Exclusivity */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Proposed exclusivity</div>
            <div style={{ display: "flex", gap: 5 }}>
              {(["none","30","60","90"] as const).map((w) => (
                <button key={w} onClick={() => setExWindow(w)}
                  style={{ flex: 1, padding: "6px 0", borderRadius: 8, background: exWindow === w ? TONES.orange.tint : "var(--sd-bg-secondary,#f4f4f5)", border: `1.5px solid ${exWindow === w ? TONES.orange.text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", fontSize: 10, fontWeight: exWindow === w ? 700 : 500, color: exWindow === w ? TONES.orange.text : "var(--sd-font-secondary,#555)", textAlign: "center" }}>
                  {w === "none" ? "None" : w + "d"}
                </button>
              ))}
            </div>
            {exWindow !== "90" && (
              <div style={{ fontSize: 9, color: TONES.orange.text, marginTop: 5 }}>
                Reduced from brand's {BRAND_OFFER.exclusivity} request
              </div>
            )}
          </div>

          {/* Rationale */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 7 }}>Why are you countering?</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {RATIONALE_OPTIONS.map((r) => (
                <button key={r.key} onClick={() => setRationale(r.key)}
                  style={{ display: "flex", gap: 9, alignItems: "center", padding: "8px 10px", borderRadius: 8, background: rationale === r.key ? TONES.purple.tint : "var(--sd-bg-secondary,#f9f9f9)", border: `1.5px solid ${rationale === r.key ? TONES.purple.text : "var(--sd-border-default,#e5e7eb)"}`, cursor: "pointer", textAlign: "left" }}>
                  <div style={{ width: 14, height: 14, borderRadius: 99, border: `2px solid ${rationale === r.key ? TONES.purple.text : "var(--sd-border-default,#e5e7eb)"}`, background: rationale === r.key ? TONES.purple.text : "transparent", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: rationale === r.key ? TONES.purple.text : "var(--sd-font-primary,#111)" }}>{r.label}</div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{r.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 5 }}>Personal note <span style={{ fontWeight: 500, color: "var(--sd-font-tertiary,#999)" }}>(optional)</span></div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)}
              style={{ width: "100%", minHeight: 80, border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, padding: "9px 11px", fontSize: 11, fontFamily: "inherit", resize: "none", boxSizing: "border-box", lineHeight: 1.6 }} />
          </div>

          <div style={{ display: "flex", gap: 7 }}>
            <Button variant="secondary" size="sm" onClick={() => setView("offer")} style={{ flex: 0 }}>Back</Button>
            <Button variant="primary" size="sm" leftIcon={submitting ? undefined : <IconSend size={11} />}
              onClick={submit} disabled={submitting} style={{ flex: 1 }}>
              {submitting ? "Sending counter…" : `Send $${proposedFee.toLocaleString()} counter-offer`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-negotiation-counter",
  title: "CreatorNegotiationCounter",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator counter-offer flow — brand offer card with fee/timeline/exclusivity tiles, fee slider, exclusivity window selector, rationale radio, personal note, and Send counter CTA.",
  description:
    "Creator responds to a brand campaign offer. Collapsible brand offer card (blue tint): brand Avatar sm, campaign name, $fee; expanded shows 4 tiles (fee green / timeline purple / exclusivity orange / deliverables). Three CTAs: Counter-offer / Accept / Decline. Counter-offer mode: fee slider (10 steps $800–$3,200, +N% delta label vs brand offer); exclusivity window (None / 30d / 60d / 90d) orange chips with 'Reduced from X' note when lower than brand ask; 5 rationale radio-style options (My standard rate / High ER / Timeline / Exclusivity premium / Other) in purple tint; optional personal note textarea. 'Send $N counter-offer' CTA → 900ms → success screen: blue send icon, 'Counter-offer sent!', summary badges (proposed fee / exclusivity window / 'Awaiting response'), Reset demo. Pre-seeded: $2,000 counter (vs $1,200 offer, +67%), 30-day exclusivity, high-ER rationale, personal note pre-filled. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator negotiation counter",
      description: "Expand the brand offer card to review terms. Click 'Counter-offer', adjust the fee slider and exclusivity, pick a rationale, then send.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
