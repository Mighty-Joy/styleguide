"use client";

import React, { useState } from "react";
import {
  IconCurrencyDollar,
  IconCircleCheck,
  IconClock,
  IconAlertTriangle,
  IconChevronRight,
  IconDotsVertical,
  IconReceipt,
  IconFlag,
  IconStar,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import { StatCard } from "@/components/ui/StatCard/StatCard";
import RecordList from "@/components/ui/RecordList/RecordList";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Types & data                                                          */
/* ------------------------------------------------------------------ */

type PayStatus = "pending" | "approved" | "processing" | "paid" | "overdue";
type PayType   = "milestone" | "final" | "bonus";

interface Payment {
  id: string;
  creator: string;
  creatorInitials: string;
  creatorTone: keyof typeof TONES;
  deal: string;
  description: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PayStatus;
  type: PayType;
}

const STATUS_META: Record<PayStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
  pending:    { label: "Pending",    tone: "yellow", icon: IconClock },
  approved:   { label: "Approved",   tone: "blue",   icon: IconCircleCheck },
  processing: { label: "Processing", tone: "sky",    icon: IconReceipt },
  paid:       { label: "Paid",       tone: "green",  icon: IconCircleCheck },
  overdue:    { label: "Overdue",    tone: "red",    icon: IconAlertTriangle },
};

const TYPE_META: Record<PayType, { label: string; icon: React.ElementType; tone: keyof typeof TONES }> = {
  milestone: { label: "Milestone", icon: IconFlag,    tone: "blue"   },
  final:     { label: "Final",     icon: IconStar,    tone: "purple" },
  bonus:     { label: "Bonus",     icon: IconStar,    tone: "yellow" },
};

const PAYMENTS: Payment[] = [
  { id: "1",  creator: "Priya Nair",  creatorInitials: "P", creatorTone: "purple", deal: "Atlas X – Reel",         description: "Milestone 1: Draft approval",      amount: 1500, dueDate: "Jul 5",  status: "approved",   type: "milestone" },
  { id: "2",  creator: "Maya Rivers", creatorInitials: "M", creatorTone: "pink",   deal: "Summer Glow – Haul",     description: "Final payment",                    amount: 4200, dueDate: "Jul 3",  status: "overdue",    type: "final"     },
  { id: "3",  creator: "Leo Park",    creatorInitials: "L", creatorTone: "blue",   deal: "Spring Drop – Unboxing", description: "Milestone 1: Content live",        amount: 800,  dueDate: "Jul 10", status: "pending",    type: "milestone" },
  { id: "4",  creator: "Nina Cole",   creatorInitials: "N", creatorTone: "green",  deal: "Atlas X – Review",       description: "Final payment",                    amount: 2800, dueDate: "Jun 30", status: "paid",       type: "final", paidDate: "Jun 28" },
  { id: "5",  creator: "Priya Nair",  creatorInitials: "P", creatorTone: "purple", deal: "Atlas X – Reel",         description: "Milestone 2: Content live",        amount: 1500, dueDate: "Jul 12", status: "pending",    type: "milestone" },
  { id: "6",  creator: "Theo Vance",  creatorInitials: "T", creatorTone: "orange", deal: "Summer Glow – GRWM",     description: "Kickoff payment (50%)",            amount: 1100, dueDate: "Jul 1",  status: "processing", type: "milestone" },
  { id: "7",  creator: "Maya Rivers", creatorInitials: "M", creatorTone: "pink",   deal: "Summer Glow – Haul",     description: "Engagement bonus (>8% ER)",        amount: 600,  dueDate: "Jul 8",  status: "pending",    type: "bonus"     },
  { id: "8",  creator: "Leo Park",    creatorInitials: "L", creatorTone: "blue",   deal: "Spring Drop – Unboxing", description: "Final payment",                    amount: 1600, dueDate: "Jul 20", status: "pending",    type: "final"     },
];

function fmt(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

/* ------------------------------------------------------------------ */
/* Cell helpers                                                          */
/* ------------------------------------------------------------------ */

function PaymentLead({ item }: { item: Payment }) {
  const typeMeta = TYPE_META[item.type];
  const TypeIcon = typeMeta.icon;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 34, height: 34, borderRadius: "var(--sd-radius-sm)", background: TONES[typeMeta.tone].tint, color: TONES[typeMeta.tone].solid, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <TypeIcon size={15} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 500, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.description}
        </div>
        <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {item.deal}
        </div>
      </div>
    </div>
  );
}

function CreatorCell({ item }: { item: Payment }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 24, padding: "0 6px 0 3px", borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-tertiary)", fontSize: 11, fontWeight: 500, color: "var(--sd-font-secondary)", whiteSpace: "nowrap" }}>
      <Avatar initials={item.creatorInitials} tone={item.creatorTone} size="sm" />
      {item.creator}
    </span>
  );
}

function AmountCell({ item }: { item: Payment }) {
  const isOverdue = item.status === "overdue";
  const isPaid = item.status === "paid";
  return (
    <span style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: isOverdue ? TONES.red.text : isPaid ? "var(--sd-font-secondary)" : "var(--sd-font-primary)", whiteSpace: "nowrap", textDecoration: isPaid ? "line-through" : "none", textDecorationColor: "var(--sd-font-tertiary)" }}>
      {fmt(item.amount)}
    </span>
  );
}

function DueDateCell({ item }: { item: Payment }) {
  if (item.status === "paid") {
    return <span style={{ fontSize: 11, color: TONES.green.text, fontWeight: 500 }}>Paid {item.paidDate}</span>;
  }
  const isOverdue = item.status === "overdue";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: isOverdue ? TONES.red.text : "var(--sd-font-tertiary)", fontWeight: isOverdue ? 600 : 400, whiteSpace: "nowrap" }}>
      {isOverdue && <IconAlertTriangle size={11} />}
      Due {item.dueDate}
    </div>
  );
}

function RowActions({ item, onApprove, onPay }: { item: Payment; onApprove: (id: string) => void; onPay: (id: string) => void }) {
  if (item.status === "paid") {
    return (
      <Button variant="ghost" size="sm" iconOnly aria-label="View receipt">
        <IconReceipt size={14} />
      </Button>
    );
  }
  if (item.status === "approved") {
    return (
      <div style={{ display: "flex", gap: 4 }}>
        <Button variant="primary" size="sm" onClick={(e) => { e.stopPropagation(); onPay(item.id); }}>
          Pay
        </Button>
        <Button variant="ghost" size="sm" iconOnly aria-label="More">
          <IconDotsVertical size={14} />
        </Button>
      </div>
    );
  }
  if (item.status === "pending" || item.status === "overdue") {
    return (
      <div style={{ display: "flex", gap: 4 }}>
        <Button variant="secondary" size="sm" rightIcon={<IconChevronRight size={12} />} onClick={(e) => { e.stopPropagation(); onApprove(item.id); }}>
          Approve
        </Button>
        <Button variant="ghost" size="sm" iconOnly aria-label="More">
          <IconDotsVertical size={14} />
        </Button>
      </div>
    );
  }
  return (
    <Button variant="ghost" size="sm" iconOnly aria-label="More">
      <IconDotsVertical size={14} />
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Summary                                                               */
/* ------------------------------------------------------------------ */

function PaymentSummary({ payments }: { payments: Payment[] }) {
  const total   = payments.reduce((s, p) => s + p.amount, 0);
  const paid    = payments.filter((p) => p.status === "paid").reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter((p) => p.status === "pending" || p.status === "approved").reduce((s, p) => s + p.amount, 0);
  const overdue = payments.filter((p) => p.status === "overdue").reduce((s, p) => s + p.amount, 0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: "16px 16px 0" }}>
      <StatCard label="Total budget"  value={fmt(total)}   tone="blue"   icon={IconCurrencyDollar} />
      <StatCard label="Paid out"      value={fmt(paid)}    tone="green"  icon={IconCircleCheck}    trend={(paid / total) * 100} trendLabel="of total" />
      <StatCard label="Pending"       value={fmt(pending)} tone="yellow" icon={IconClock}          />
      <StatCard label="Overdue"       value={fmt(overdue)} tone="red"    icon={IconAlertTriangle}  />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo                                                                  */
/* ------------------------------------------------------------------ */

type FilterValue = PayStatus | "all";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All",        value: "all"        },
  { label: "Overdue",    value: "overdue"    },
  { label: "Approved",   value: "approved"   },
  { label: "Pending",    value: "pending"    },
  { label: "Processing", value: "processing" },
  { label: "Paid",       value: "paid"       },
];

function PaymentDashboardDemo() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [payments, setPayments] = useState<Payment[]>(PAYMENTS);

  const visible = filter === "all" ? payments : payments.filter((p) => p.status === filter);

  const approve = (id: string) => {
    setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: "approved" } : p));
  };
  const pay = (id: string) => {
    setPayments((prev) => prev.map((p) => p.id === id ? { ...p, status: "paid", paidDate: "Jul 1" } : p));
  };

  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", background: "var(--sd-bg-primary)" }}>
      <PaymentSummary payments={payments} />

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 6, padding: "14px 16px 12px", flexWrap: "wrap" }}>
        {FILTERS.map(({ label, value }) => (
          <Button
            key={value}
            variant={filter === value ? "primary" : "secondary"}
            size="sm"
            onClick={() => setFilter(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      <RecordList
        items={visible}
        getId={(p) => p.id}
        leadHeader="Payment"
        lead={(p) => <PaymentLead item={p} />}
        columns={[
          {
            key: "creator",
            header: "Creator",
            render: (p) => <CreatorCell item={p} />,
          },
          {
            key: "status",
            header: "Status",
            render: (p) => {
              const meta = STATUS_META[p.status];
              return <Badge label={meta.label} tone={meta.tone} icon={meta.icon} />;
            },
          },
          {
            key: "amount",
            header: "Amount",
            render: (p) => <AmountCell item={p} />,
          },
          {
            key: "due",
            header: "Due / Paid",
            render: (p) => <DueDateCell item={p} />,
            collapseOnMobile: true,
          },
        ]}
        actions={(p) => <RowActions item={p} onApprove={approve} onPay={pay} />}
        onRowClick={(p) => console.log("open payment", p.id)}
        emptyMessage="No payments match this filter."
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "payment-dashboard",
  title: "Payments",
  group: "Pre-built / Composite",
  status: "stable",
  summary: "Campaign payment tracker — milestone and final payments per creator, with approve/pay actions and overdue alerts.",
  description:
    "Tracks all deal payments (milestones, finals, bonuses) across a campaign. The summary row shows total budget, amount paid, amount pending, and overdue. Each row shows the payment description, linked deal, creator chip, status badge, amount (struck-through when paid), and due/paid date. Overdue rows show red amounts and an alert icon.\n\nActions are contextual: pending/overdue rows show **Approve**, approved rows show **Pay**, paid rows show a receipt icon. Clicking Approve or Pay updates status inline without a reload.",
  demos: [
    {
      title: "Payment dashboard",
      description: "Click Approve to advance a pending payment. Click Pay to mark approved payments as paid. Filter by status to isolate overdue or processing rows.",
      block: true,
      render: () => <PaymentDashboardDemo />,
    },
  ],
  props: [],
};

export default doc;
