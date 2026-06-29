"use client";

import React, { useState } from "react";
import Avatar from "@/components/ui/Avatar/Avatar";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconPlus,
  IconX,
  IconCalendar,
  IconCurrencyDollar,
  IconUsers,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandYoutube,
  IconChevronRight,
  IconDots,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */

type SlotStatus = "empty" | "invited" | "confirmed";
type MilestoneStatus = "done" | "active" | "upcoming";

interface CreatorSlot {
  id: string;
  status: SlotStatus;
  budget: number;
  deliverables: string[];
  creator?: { name: string; initials: string; tone: keyof typeof TONES; handle: string };
}

interface Milestone {
  id: string;
  label: string;
  date: string;
  status: MilestoneStatus;
}

/* ---- seed ---- */

const INITIAL_SLOTS: CreatorSlot[] = [
  { id: "slot1", status: "confirmed", budget: 2400, deliverables: ["IG Reel", "3× Story"],
    creator: { name: "Priya Nair", initials: "PN", tone: "green", handle: "@priya.creates" } },
  { id: "slot2", status: "confirmed", budget: 3200, deliverables: ["TikTok", "IG Reel"],
    creator: { name: "Diego Santos", initials: "DS", tone: "orange", handle: "@diegosantos" } },
  { id: "slot3", status: "invited",   budget: 1800, deliverables: ["IG Reel"],
    creator: { name: "Hana Kim",     initials: "HK", tone: "pink",   handle: "@hanakim_" } },
  { id: "slot4", status: "empty",     budget: 2000, deliverables: ["TikTok", "2× Story"] },
  { id: "slot5", status: "empty",     budget: 1600, deliverables: ["IG Reel"] },
];

const MILESTONES: Milestone[] = [
  { id: "m1", label: "Brief finalised",       date: "Jun 25", status: "done"     },
  { id: "m2", label: "Outreach sent",         date: "Jun 28", status: "done"     },
  { id: "m3", label: "Creators confirmed",    date: "Jul 3",  status: "active"   },
  { id: "m4", label: "Products shipped",      date: "Jul 5",  status: "upcoming" },
  { id: "m5", label: "Drafts due",            date: "Jul 18", status: "upcoming" },
  { id: "m6", label: "Go-live window opens",  date: "Jul 28", status: "upcoming" },
];

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  "IG Reel":  IconBrandInstagram,
  "Story":    IconBrandInstagram,
  "3× Story": IconBrandInstagram,
  "2× Story": IconBrandInstagram,
  "TikTok":   IconBrandTiktok,
  "YouTube":  IconBrandYoutube,
};

const STATUS_TONE: Record<SlotStatus, keyof typeof TONES> = {
  empty:     "gray",
  invited:   "yellow",
  confirmed: "green",
};

function fmt(n: number) { return `$${n.toLocaleString()}`; }

/* ---- Slot card ---- */

function SlotCard({ slot, onClear }: { slot: CreatorSlot; onClear: (id: string) => void }) {
  const isEmpty = slot.status === "empty";

  return (
    <div style={{
      border: "1.5px solid",
      borderColor: isEmpty ? "var(--sd-border-default, #e5e7eb)" : slot.status === "confirmed" ? "#111" : TONES.yellow.tint,
      borderRadius: 12,
      padding: "12px 14px",
      background: isEmpty ? "var(--sd-bg-secondary, #f9f9f9)" : "#fff",
      borderStyle: isEmpty ? "dashed" : "solid",
    }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        {slot.creator ? (
          <>
            <Avatar initials={slot.creator.initials} tone={slot.creator.tone} size="sm" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{slot.creator.name}</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{slot.creator.handle}</div>
            </div>
            <Badge label={slot.status} tone={STATUS_TONE[slot.status]} size="sm" />
            <button onClick={() => onClear(slot.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sd-font-tertiary, #999)", display: "flex", padding: 2 }}>
              <IconX size={12} />
            </button>
          </>
        ) : (
          <>
            <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px dashed var(--sd-border-medium, #d1d5db)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <IconPlus size={12} style={{ color: "var(--sd-font-tertiary, #999)" }} />
            </div>
            <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "var(--sd-font-tertiary, #999)" }}>Open slot</div>
            <Button variant="secondary" size="sm">Find creator</Button>
          </>
        )}
      </div>

      {/* Deliverables */}
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
        {slot.deliverables.map((d) => {
          const Icon = PLATFORM_ICONS[d] ?? IconBrandInstagram;
          return (
            <div key={d} style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "2px 7px", borderRadius: 99, background: "var(--sd-bg-tertiary, #f1f1f1)", fontSize: 10, color: "var(--sd-font-secondary, #555)" }}>
              <Icon size={9} />
              {d}
            </div>
          );
        })}
      </div>

      {/* Budget */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Budget</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: "var(--sd-font-primary, #111)" }}>{fmt(slot.budget)}</span>
      </div>
    </div>
  );
}

/* ---- Demo ---- */

function Demo() {
  const [slots, setSlots] = useState(INITIAL_SLOTS);

  const totalBudget = 24_000;
  const allocated   = slots.reduce((s, sl) => s + sl.budget, 0);
  const unallocated = totalBudget - allocated;
  const confirmed   = slots.filter((s) => s.status === "confirmed").length;
  const invited     = slots.filter((s) => s.status === "invited").length;
  const empty       = slots.filter((s) => s.status === "empty").length;

  function clearSlot(id: string) {
    setSlots((ss) => ss.map((s) => s.id === id ? { ...s, status: "empty" as SlotStatus, creator: undefined } : s));
  }

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Campaign header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Summer Glow — Planning</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <Badge label="Planning" tone="blue" dot />
            <span style={{ fontSize: 11, color: "var(--sd-font-tertiary, #999)" }}>Aura Labs · Go-live Jul 28</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="secondary" size="sm">Preview brief</Button>
          <Button variant="primary" size="sm" leftIcon={<IconChevronRight size={12} />}>Launch campaign</Button>
        </div>
      </div>

      {/* Budget bar */}
      <div style={{ padding: "12px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Budget allocation</span>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Allocated</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{fmt(allocated)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Remaining</div>
              <div style={{ fontSize: 14, fontWeight: 800, color: unallocated > 0 ? TONES.green.text : TONES.red.text }}>{fmt(unallocated)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>Total</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>{fmt(totalBudget)}</div>
            </div>
          </div>
        </div>
        <div style={{ height: 6, background: "var(--sd-bg-tertiary, #f1f1f1)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${Math.min(100, (allocated / totalBudget) * 100)}%`, height: "100%", background: "#111", borderRadius: 3, transition: "width 0.3s" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{Math.round((allocated / totalBudget) * 100)}% allocated across {slots.length} slots</span>
          <span style={{ fontSize: 10, color: "var(--sd-font-tertiary, #999)" }}>{confirmed} confirmed · {invited} invited · {empty} open</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Creator slots */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>
            Creator slots ({slots.length})
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {slots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} onClear={clearSlot} />
            ))}
            <button style={{ height: 44, border: "1.5px dashed var(--sd-border-medium, #d1d5db)", borderRadius: 10, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "var(--sd-font-tertiary, #999)", fontSize: 12, fontWeight: 600 }}>
              <IconPlus size={13} />
              Add slot
            </button>
          </div>
        </div>

        {/* Milestones */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary, #999)", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 10 }}>
            Milestones
          </div>
          <div style={{ border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 12, overflow: "hidden" }}>
            {MILESTONES.map((m, i) => (
              <div key={m.id} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                borderBottom: i < MILESTONES.length - 1 ? "1px solid var(--sd-border-default, #e5e7eb)" : "none",
                background: m.status === "active" ? "rgba(37,99,235,0.03)" : "transparent",
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  background: m.status === "done" ? "#111" : m.status === "active" ? "#fff" : "transparent",
                  border: `2px solid ${m.status === "done" ? "#111" : m.status === "active" ? "#111" : "var(--sd-border-medium, #d1d5db)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {m.status === "done"
                    ? <IconCheck size={11} color="#fff" />
                    : m.status === "active"
                    ? <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#111" }} />
                    : null
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: m.status === "active" ? 700 : 500, color: m.status === "upcoming" ? "var(--sd-font-tertiary, #999)" : "var(--sd-font-primary, #111)" }}>
                    {m.label}
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: m.status === "done" ? "var(--sd-font-tertiary, #999)" : m.status === "active" ? TONES.blue.text : "var(--sd-font-tertiary, #999)" }}>
                  {m.date}
                </div>
                {m.status === "active" && <Badge label="Now" tone="blue" size="sm" dot />}
              </div>
            ))}
          </div>

          {/* Checklist summary */}
          <div style={{ marginTop: 12, padding: "10px 14px", border: "1px solid var(--sd-border-default, #e5e7eb)", borderRadius: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 8, color: "var(--sd-font-secondary, #555)" }}>Launch readiness</div>
            {[
              { label: "Campaign brief approved",  done: true  },
              { label: "All creators confirmed",   done: false },
              { label: "Contracts signed",         done: false },
              { label: "Products ordered",         done: true  },
              { label: "Brief sent to all",        done: true  },
            ].map(({ label, done }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, background: done ? "#111" : "transparent", border: `1.5px solid ${done ? "#111" : "var(--sd-border-medium, #d1d5db)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {done && <IconCheck size={9} color="#fff" />}
                </div>
                <span style={{ fontSize: 11, color: done ? "var(--sd-font-primary, #111)" : "var(--sd-font-tertiary, #999)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "campaign-planning-board",
  title: "CampaignPlanningBoard",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Pre-launch planning workspace — creator slots with budget allocation, milestone rail, and launch-readiness checklist.",
  description:
    "The workspace used to build a campaign before it goes live. Budget bar: allocated vs remaining vs total with slot breakdown. Two-column layout: (1) Creator slots — confirmed (solid border), invited (yellow border), and empty (dashed) cards each showing avatar, deliverable chips, and budget; clear button un-assigns a creator. (2) Milestones — step rail with done/active/upcoming states and a 'Now' badge on the current milestone; launch-readiness mini-checklist below. Launch button in header. Composes Avatar, Badge, Button — primitives only.",
  demos: [
    {
      title: "Campaign planning board",
      description: "Click × on a confirmed creator to open their slot. Launch is gated until all readiness items are checked.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
