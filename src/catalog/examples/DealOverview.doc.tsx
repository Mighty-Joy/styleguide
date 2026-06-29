"use client";

import React, { useState } from "react";
import {
  IconArrowLeft,
  IconDotsVertical,
  IconBrandInstagram,
  IconVideo,
  IconPhoto,
  IconBlockquote,
  IconCheck,
  IconClock,
  IconFileText,
  IconCurrencyDollar,
  IconCalendar,
  IconShield,
  IconMessage2,
  IconExternalLink,
  IconCircleCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

type DealStage =
  | "offer_sent"
  | "negotiating"
  | "signed"
  | "in_production"
  | "in_review"
  | "approved"
  | "live"
  | "completed";

type DeliverableStage =
  | "brief"
  | "script"
  | "production"
  | "review"
  | "approved"
  | "live";

type PaymentStatus = "paid" | "due" | "upcoming";

interface Deliverable {
  id: string;
  type: "reel" | "story" | "post" | "video";
  title: string;
  platform: string;
  stage: DeliverableStage;
  dueDate: string;
}

interface Payment {
  id: string;
  label: string;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
}

interface ActivityEvent {
  id: string;
  actor: string;
  actorTone: keyof typeof TONES;
  event: string;
  detail?: string;
  date: string;
}

/* ------------------------------------------------------------------ */
/* Static fixtures                                                       */
/* ------------------------------------------------------------------ */

const STAGE_BADGE: Record<DealStage, { label: string; tone: keyof typeof TONES }> = {
  offer_sent:    { label: "Offer sent",    tone: "orange" },
  negotiating:   { label: "Negotiating",   tone: "yellow" },
  signed:        { label: "Signed",        tone: "blue"   },
  in_production: { label: "In Production", tone: "purple" },
  in_review:     { label: "In Review",     tone: "blue"   },
  approved:      { label: "Approved",      tone: "green"  },
  live:          { label: "Live",          tone: "sky"    },
  completed:     { label: "Completed",     tone: "gray"   },
};

const DELIVERABLE_STAGES: DeliverableStage[] = [
  "brief", "script", "production", "review", "approved", "live",
];

const DELIVERABLE_STAGE_TONE: Record<DeliverableStage, keyof typeof TONES> = {
  brief:      "gray",
  script:     "purple",
  production: "blue",
  review:     "orange",
  approved:   "green",
  live:       "sky",
};

const DELIVERABLE_STAGE_LABEL: Record<DeliverableStage, string> = {
  brief:      "Brief",
  script:     "Script",
  production: "Production",
  review:     "Review",
  approved:   "Approved",
  live:       "Live",
};

const CONTENT_TYPE_ICON: Record<Deliverable["type"], React.ElementType> = {
  reel:  IconVideo,
  story: IconBlockquote,
  post:  IconPhoto,
  video: IconVideo,
};

const DELIVERABLES: Deliverable[] = [
  { id: "d1", type: "reel",  title: "Morning Routine Reel",  platform: "Instagram", stage: "review",     dueDate: "Aug 5"  },
  { id: "d2", type: "story", title: "Product Launch Stories", platform: "Instagram", stage: "production", dueDate: "Aug 10" },
  { id: "d3", type: "post",  title: "Brand Mention Post",     platform: "TikTok",   stage: "brief",      dueDate: "Aug 15" },
];

const PAYMENTS: Payment[] = [
  { id: "p1", label: "Deposit (30%)",     amount: "$4,500", dueDate: "Jul 1",  status: "paid"     },
  { id: "p2", label: "Milestone (40%)",   amount: "$6,000", dueDate: "Aug 5",  status: "due"      },
  { id: "p3", label: "Final (30%)",       amount: "$4,500", dueDate: "Sep 1",  status: "upcoming" },
];

const ACTIVITY: ActivityEvent[] = [
  { id: "a1", actor: "Eric D",    actorTone: "green",  event: "Deal created",          detail: "Spring Drop campaign",         date: "Jun 12" },
  { id: "a2", actor: "Eric D",    actorTone: "green",  event: "Contract sent",         detail: "via email",                    date: "Jun 14" },
  { id: "a3", actor: "Priya N",   actorTone: "purple", event: "Contract signed",                                               date: "Jun 16" },
  { id: "a4", actor: "Eric D",    actorTone: "green",  event: "Brief delivered",       detail: "Morning Routine Reel",         date: "Jun 18" },
  { id: "a5", actor: "Priya N",   actorTone: "purple", event: "Script submitted",      detail: "v1 — 60s morning routine",     date: "Jun 25" },
  { id: "a6", actor: "Eric D",    actorTone: "green",  event: "Script approved",                                               date: "Jun 27" },
  { id: "a7", actor: "Priya N",   actorTone: "purple", event: "Content submitted",     detail: "Morning Routine Reel",         date: "Aug 1"  },
  { id: "a8", actor: "Eric D",    actorTone: "green",  event: "Content in review",     detail: "Sent to brand for approval",   date: "Aug 2"  },
];

/* ------------------------------------------------------------------ */
/* Section wrapper                                                       */
/* ------------------------------------------------------------------ */

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {title}
        </span>
        {action}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverable stage track                                              */
/* ------------------------------------------------------------------ */

function StageTrack({ current }: { current: DeliverableStage }) {
  const currentIdx = DELIVERABLE_STAGES.indexOf(current);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {DELIVERABLE_STAGES.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        const tone = DELIVERABLE_STAGE_TONE[s];
        return (
          <div
            key={s}
            title={DELIVERABLE_STAGE_LABEL[s]}
            style={{
              height: 4,
              flex: 1,
              borderRadius: 2,
              background: done
                ? TONES.green.solid
                : active
                ? TONES[tone].solid
                : "var(--sd-border-light)",
              transition: "background 0.15s",
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverable row                                                       */
/* ------------------------------------------------------------------ */

function DeliverableRow({ d }: { d: Deliverable }) {
  const Icon = CONTENT_TYPE_ICON[d.type];
  const isReady = d.stage === "review";
  const isDone  = d.stage === "approved" || d.stage === "live";

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 8,
      padding: "12px 14px",
      border: "1px solid var(--sd-border-light)",
      borderRadius: "var(--sd-radius-md)",
      background: "var(--sd-bg-primary)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "var(--sd-radius-sm)",
          background: "var(--sd-bg-tertiary)", color: "var(--sd-font-secondary)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Icon size={15} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>{d.title}</div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 2 }}>
            {d.platform} · Due {d.dueDate}
          </div>
        </div>
        <Badge label={DELIVERABLE_STAGE_LABEL[d.stage]} tone={DELIVERABLE_STAGE_TONE[d.stage]} size="sm" />
        {isReady && (
          <Button variant="secondary" size="sm" leftIcon={<IconExternalLink size={12} />}>
            Review
          </Button>
        )}
        {isDone && (
          <Button variant="ghost" iconOnly size="sm" aria-label="Approved">
            <IconCircleCheck size={16} style={{ color: TONES.green.solid }} />
          </Button>
        )}
      </div>
      <StageTrack current={d.stage} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Payment row                                                           */
/* ------------------------------------------------------------------ */

const PAYMENT_TONE: Record<PaymentStatus, keyof typeof TONES> = {
  paid:     "green",
  due:      "orange",
  upcoming: "gray",
};
const PAYMENT_LABEL: Record<PaymentStatus, string> = {
  paid:     "Paid",
  due:      "Due",
  upcoming: "Upcoming",
};

function PaymentRow({ p }: { p: Payment }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 0",
      borderBottom: "1px solid var(--sd-border-light)",
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: "var(--sd-radius-sm)",
        background: "var(--sd-bg-tertiary)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        <IconCurrencyDollar size={14} style={{ color: "var(--sd-font-tertiary)" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)" }}>{p.label}</div>
        <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>Due {p.dueDate}</div>
      </div>
      <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>{p.amount}</span>
      <Badge label={PAYMENT_LABEL[p.status]} tone={PAYMENT_TONE[p.status]} size="sm" dot />
      {p.status === "due" && (
        <Button variant="primary" size="sm">Mark paid</Button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Activity event row                                                    */
/* ------------------------------------------------------------------ */

function ActivityRow({ ev }: { ev: ActivityEvent }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <Avatar name={ev.actor} tone={ev.actorTone} size="sm" />
        <div style={{ width: 1, flex: 1, background: "var(--sd-border-light)", marginTop: 4 }} />
      </div>
      <div style={{ flex: 1, paddingBottom: 14, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: "var(--sd-text-xs)", fontWeight: 600, color: "var(--sd-font-primary)" }}>{ev.actor}</span>
          <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-secondary)" }}>{ev.event}</span>
        </div>
        {ev.detail && (
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)", marginTop: 1 }}>{ev.detail}</div>
        )}
        <div style={{ fontSize: 10, color: "var(--sd-font-tertiary)", marginTop: 2 }}>{ev.date}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main composite                                                        */
/* ------------------------------------------------------------------ */

function DealOverviewDemo() {
  const [stage] = useState<DealStage>("in_production");
  const stageMeta = STAGE_BADGE[stage];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Button variant="ghost" iconOnly aria-label="Back" size="sm">
          <IconArrowLeft size={16} />
        </Button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>Spring Drop Campaign</div>
          <div style={{ fontSize: "var(--sd-text-lg, var(--sd-text-md))", fontWeight: 700, color: "var(--sd-font-primary)", lineHeight: 1.2 }}>
            Priya Nair — IG Reel ×2 + Stories ×3
          </div>
        </div>
        <Button variant="ghost" iconOnly aria-label="More">
          <IconDotsVertical size={16} />
        </Button>
      </div>

      {/* Identity bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
        padding: "12px 16px",
        background: "var(--sd-bg-primary)",
        border: "1px solid var(--sd-border-light)",
        borderRadius: "var(--sd-radius-md)",
      }}>
        <Avatar name="Priya Nair" tone="purple" size="md" />
        <div>
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>Priya Nair</div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>@priya.creates · 128K followers</div>
        </div>
        <div style={{ width: 1, height: 28, background: "var(--sd-border-light)" }} />
        <div>
          <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>Contract value</div>
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)" }}>$15,000</div>
        </div>
        <div style={{ width: 1, height: 28, background: "var(--sd-border-light)" }} />
        <Badge label={stageMeta.label} tone={stageMeta.tone} variant="status" dot />
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm" leftIcon={<IconMessage2 size={13} />}>Message</Button>
          <Button variant="secondary" size="sm" leftIcon={<IconFileText size={13} />}>View brief</Button>
          <Button variant="primary" size="sm" leftIcon={<IconBrandInstagram size={13} />}>View profile</Button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <StatCard label="Contract value" value="$15,000" icon={IconCurrencyDollar} tone="green" size="sm" />
        <StatCard label="Due date"        value="Aug 15"  icon={IconCalendar}       tone="blue"  size="sm" />
        <StatCard label="Deliverables"   value="1 / 3"   icon={IconCheck}          tone="purple" size="sm" secondary="approved" />
        <StatCard label="Avg ER"          value="4.6%"    icon={IconShield}         tone="sky"   size="sm" trend={0.4} />
      </div>

      {/* Two-column body */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 24, alignItems: "start" }}>

        {/* Left — deliverables, contract, payments */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          <Section title="Deliverables">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {DELIVERABLES.map(d => <DeliverableRow key={d.id} d={d} />)}
            </div>
          </Section>

          <Section
            title="Contract"
            action={<Button variant="tertiary" size="sm" leftIcon={<IconExternalLink size={12} />}>View</Button>}
          >
            <div style={{
              padding: "14px 16px",
              border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-md)",
              background: "var(--sd-bg-primary)",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconCircleCheck size={16} style={{ color: TONES.green.solid, flexShrink: 0 }} />
                <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 600, color: "var(--sd-font-primary)" }}>Signed by both parties</span>
                <Badge label="Active" tone="green" size="sm" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { label: "Amount",        value: "$15,000" },
                  { label: "Signed",        value: "Jun 16, 2025" },
                  { label: "Rights period", value: "6 months social" },
                  { label: "Exclusivity",   value: "30 days" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                    <div style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-primary)", marginTop: 2 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Payments">
            <div style={{
              padding: "4px 14px",
              border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-md)",
              background: "var(--sd-bg-primary)",
            }}>
              {PAYMENTS.map(p => <PaymentRow key={p.id} p={p} />)}
            </div>
          </Section>
        </div>

        {/* Right — activity + notes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          <Section title="Activity">
            <div style={{
              padding: "14px 14px 0",
              border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-md)",
              background: "var(--sd-bg-primary)",
            }}>
              {ACTIVITY.map(ev => <ActivityRow key={ev.id} ev={ev} />)}
            </div>
          </Section>

          <Section title="Notes">
            <div style={{
              padding: "12px 14px",
              border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-md)",
              background: "var(--sd-bg-primary)",
              minHeight: 80,
            }}>
              <p style={{ margin: 0, fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", lineHeight: 1.65 }}>
                Priya prefers natural light for skincare content. Approved GRWM angle for the Reel. Stories should feel casual — not scripted.
              </p>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Doc export                                                            */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "deal-overview",
  title: "Deal Overview",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Full deal detail page — header, deliverables with stage track, contract terms, payment schedule, and activity timeline.",
  description:
    "The deal detail surface. Shows the identity bar (creator + contract value + stage), a 4-stat summary row, and a two-column body: left has the deliverables list (each with a 6-stage progress track and a Review/Approved action), the contract block (signed status + key terms), and the payment schedule (Paid/Due/Upcoming rows); right has a chronological activity timeline and a notes area.\n\nAll buttons are `<Button>`, all status labels are `<Badge>`, all person marks are `<Avatar>`. No custom CSS.",
  demos: [
    {
      title: "Deal Overview — In Production",
      description: "Spring Drop campaign · Priya Nair · $15,000 deal. Deliverable 1 is in Review (action button visible), Deliverable 2 is in Production, Deliverable 3 is at Brief stage. Milestone payment is due.",
      block: true,
      render: () => <DealOverviewDemo />,
    },
  ],
  props: [],
};

export default doc;
