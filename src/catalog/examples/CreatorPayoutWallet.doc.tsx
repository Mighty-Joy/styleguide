"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconWallet,
  IconBuildingBank,
  IconBrandPaypal,
  IconCheck,
  IconX,
  IconPlus,
  IconChevronRight,
  IconArrowRight,
  IconClock,
  IconLock,
  IconArrowDown,
  IconArrowUp,
  IconCircleCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type PayoutMethod = "bank" | "paypal";
type TxType = "payment" | "withdrawal" | "adjustment";
type TxStatus = "completed" | "pending" | "processing";

interface Transaction {
  id: string;
  label: string;
  brand?: string;
  type: TxType;
  status: TxStatus;
  amount: number;
  date: string;
}

const TX: Transaction[] = [
  { id: "t1", label: "Aura Labs — Summer Glow Campaign", brand: "Aura Labs", type: "payment",    status: "pending",    amount: 1550,  date: "Expected Jul 18" },
  { id: "t2", label: "Wellnest — Q2 Wellness",           brand: "Wellnest",  type: "payment",    status: "pending",    amount: 800,   date: "Expected Jul 5"  },
  { id: "t3", label: "Withdrawal to Chase ···4521",                           type: "withdrawal", status: "processing", amount: -2400, date: "Jun 28"          },
  { id: "t4", label: "GlowCo — Summer Refresh",          brand: "GlowCo",    type: "payment",    status: "completed",  amount: 1200,  date: "Jun 15"          },
  { id: "t5", label: "Aura Labs — Spring Campaign",      brand: "Aura Labs", type: "payment",    status: "completed",  amount: 1400,  date: "May 30"          },
  { id: "t6", label: "FitLife — Q1 Wellness",            brand: "FitLife",   type: "payment",    status: "completed",  amount: 950,   date: "Apr 12"          },
  { id: "t7", label: "Performance bonus",                                     type: "adjustment", status: "completed",  amount: 200,   date: "Apr 12"          },
];

const METHOD_ICONS: Record<PayoutMethod, React.ElementType> = {
  bank:   IconBuildingBank,
  paypal: IconBrandPaypal,
};

/* ---- Demo ---- */
function Demo() {
  const [step, setStep] = useState<"idle" | "withdraw" | "confirm" | "done">("idle");
  const [withdrawAmt, setWithdrawAmt] = useState("2350");
  const [activeMethod, setActiveMethod] = useState<PayoutMethod>("bank");
  const [txFilter, setTxFilter] = useState<"all" | TxStatus>("all");

  const pending    = TX.filter((t) => t.status === "pending"    && t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const processing = TX.filter((t) => t.status === "processing" && t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
  const available  = 2350;
  const lifetime   = 8240;

  const visibleTx = TX.filter((t) => txFilter === "all" || t.status === txFilter);

  const statusMeta: Record<TxStatus, { label: string; tone: keyof typeof TONES; icon: React.ElementType }> = {
    pending:    { label: "Pending",    tone: "yellow", icon: IconClock        },
    processing: { label: "Processing", tone: "blue",   icon: IconClock        },
    completed:  { label: "Paid",       tone: "green",  icon: IconCircleCheck  },
  };

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Balance strip */}
      <div style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)", borderRadius: 14, padding: "18px 20px", marginBottom: 16, color: "#fff" }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.6, marginBottom: 4 }}>Available balance</div>
        <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 12 }}>${available.toLocaleString()}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { label: "Pending",    value: `$${pending.toLocaleString()}`,   tone: "yellow" as const },
            { label: "Processing", value: `$${processing.toLocaleString()}`, tone: "blue"  as const },
            { label: "Lifetime",   value: `$${lifetime.toLocaleString()}`,  tone: "green"  as const },
          ].map(({ label, value, tone }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 9, padding: "8px 10px" }}>
              <div style={{ fontSize: 9, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: TONES[tone].text, marginTop: 2 }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw flow */}
      {step === "idle" && (
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <Button variant="primary" size="sm" leftIcon={<IconArrowUp size={11} />} onClick={() => setStep("withdraw")} style={{ flex: 1 }}>
            Withdraw funds
          </Button>
          <Button variant="secondary" size="sm" leftIcon={<IconPlus size={11} />}>Add payout method</Button>
        </div>
      )}

      {step === "withdraw" && (
        <div style={{ padding: "14px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, marginBottom: 16, background: "var(--sd-bg-secondary,#f9f9f9)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>Withdraw funds</div>
          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            {(["bank", "paypal"] as PayoutMethod[]).map((m) => {
              const MIcon = METHOD_ICONS[m];
              const active = activeMethod === m;
              return (
                <button key={m} onClick={() => setActiveMethod(m)}
                  style={{ flex: 1, display: "flex", alignItems: "center", gap: 7, padding: "8px 12px", borderRadius: 9, background: active ? "#fff" : "var(--sd-bg-secondary,#f4f4f5)", border: active ? "2px solid #111" : "1px solid var(--sd-border-default,#e5e7eb)", cursor: "pointer" }}>
                  <MIcon size={14} style={{ color: "#111" }} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{m === "bank" ? "Bank transfer" : "PayPal"}</div>
                    <div style={{ fontSize: 9, color: "var(--sd-font-tertiary,#999)" }}>{m === "bank" ? "Chase ···4521" : "priya@email.com"}</div>
                  </div>
                  {active && <IconCheck size={12} style={{ color: "#111", marginLeft: "auto" }} />}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 8, padding: "7px 12px", marginBottom: 8, background: "#fff" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "var(--sd-font-tertiary,#999)" }}>$</span>
            <input value={withdrawAmt} onChange={(e) => setWithdrawAmt(e.target.value.replace(/[^0-9]/g, ""))}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 16, fontWeight: 800, fontFamily: "inherit" }} />
            <button onClick={() => setWithdrawAmt(String(available))}
              style={{ fontSize: 10, fontWeight: 700, color: TONES.blue.text, background: TONES.blue.tint, border: "none", cursor: "pointer", borderRadius: 5, padding: "2px 7px" }}>
              Max
            </button>
          </div>
          <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", marginBottom: 10 }}>Available: ${available.toLocaleString()} · Estimated 1–2 business days</div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary" size="sm" onClick={() => setStep("confirm")} disabled={!withdrawAmt || parseInt(withdrawAmt) <= 0 || parseInt(withdrawAmt) > available} style={{ flex: 1 }}>
              Review withdrawal
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setStep("idle")}>Cancel</Button>
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div style={{ padding: "14px", border: `2px solid ${TONES.orange.text}`, borderRadius: 12, marginBottom: 16, background: `${TONES.orange.tint}40` }}>
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Confirm withdrawal</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11 }}>Amount</span>
            <span style={{ fontSize: 13, fontWeight: 900 }}>${parseInt(withdrawAmt).toLocaleString()}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 11 }}>To</span>
            <span style={{ fontSize: 11, fontWeight: 700 }}>{activeMethod === "bank" ? "Chase ···4521" : "PayPal · priya@email.com"}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="primary" size="sm" onClick={() => setStep("done")} style={{ flex: 1 }}>Confirm</Button>
            <Button variant="secondary" size="sm" onClick={() => setStep("withdraw")}>Back</Button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div style={{ padding: "14px", border: `1px solid ${TONES.green.text}`, borderRadius: 12, marginBottom: 16, background: TONES.green.tint, display: "flex", gap: 10, alignItems: "center" }}>
          <IconCircleCheck size={18} style={{ color: TONES.green.text, flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: TONES.green.text }}>Withdrawal initiated!</div>
            <div style={{ fontSize: 10, color: TONES.green.text }}>Expected in 1–2 business days.</div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setStep("idle")}>Done</Button>
        </div>
      )}

      {/* Payout accounts */}
      <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Payout accounts</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16 }}>
        {[
          { method: "bank" as const, name: "Chase checking", detail: "···4521", primary: true  },
          { method: "paypal" as const, name: "PayPal",        detail: "priya@email.com", primary: false },
        ].map(({ method, name, detail, primary }) => {
          const MIcon = METHOD_ICONS[method];
          return (
            <div key={method} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--sd-bg-secondary,#f4f4f5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MIcon size={15} style={{ color: "#111" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700 }}>{name}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)", fontFamily: "monospace" }}>{detail}</div>
              </div>
              {primary && <Badge label="Primary" tone="green" size="sm" dot />}
            </div>
          );
        })}
      </div>

      {/* Transaction history */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", textTransform: "uppercase", letterSpacing: "0.04em", flex: 1 }}>Transactions</div>
        {(["all","pending","completed"] as const).map((f) => (
          <button key={f} onClick={() => setTxFilter(f)}
            style={{ padding: "2px 8px", borderRadius: 99, background: txFilter === f ? "#111" : "var(--sd-bg-secondary,#f4f4f5)", border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, color: txFilter === f ? "#fff" : "var(--sd-font-secondary,#555)", textTransform: "capitalize" }}>
            {f}
          </button>
        ))}
      </div>
      <div style={{ border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
        {visibleTx.map((tx, i) => {
          const { tone, icon: SIcon } = statusMeta[tx.status];
          const isCredit = tx.amount > 0;
          return (
            <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderBottom: i < visibleTx.length - 1 ? "1px solid var(--sd-border-default,#e5e7eb)" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: isCredit ? TONES.green.tint : TONES.blue.tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {isCredit ? <IconArrowDown size={13} style={{ color: TONES.green.text }} /> : <IconArrowUp size={13} style={{ color: TONES.blue.text }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{tx.label}</div>
                <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>{tx.date}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: isCredit ? TONES.green.text : "#111" }}>
                  {isCredit ? "+" : ""}${Math.abs(tx.amount).toLocaleString()}
                </div>
                <Badge label={statusMeta[tx.status].label} tone={tone} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-payout-wallet",
  title: "CreatorPayoutWallet",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Creator's financial wallet — dark balance strip (available/pending/processing/lifetime), withdraw flow with bank/PayPal selector, payout accounts, and transaction history.",
  description:
    "The creator's money management screen. Dark gradient balance strip (navy): large available balance, 3 sub-cards for pending earnings, processing withdrawals, and lifetime total in tone colors. Withdraw funds button → 2-step form: (1) pick bank or PayPal payout method, enter dollar amount with Max shortcut, Review withdrawal CTA; (2) confirmation panel with orange border showing amount + destination; on confirm shows green 'Withdrawal initiated!' success banner with Done button. Payout accounts section: bank (Chase ···4521, primary badge) + PayPal with method icons. Transaction history: All/Pending/Completed filter chips; table rows with green down-arrow (credits) or blue up-arrow (withdrawals), label, date, amount in green/black, status badge. 7 seed transactions. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator payout wallet",
      description: "Click 'Withdraw funds' to open the 2-step withdrawal flow. Select bank or PayPal, enter amount, click Review, then Confirm. Filter transactions with the chip buttons.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
