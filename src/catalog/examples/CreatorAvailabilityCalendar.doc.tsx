"use client";

import React, { useState } from "react";
import Badge from "@/components/ui/Badge/Badge";
import Button from "@/components/ui/Button/Button";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCheck,
  IconX,
  IconCalendarEvent,
  IconLock,
  IconCircleDot,
} from "@tabler/icons-react";
import type { ComponentDoc } from "@/catalog/types";
import { TONES } from "@/tokens/tones";

/* ---- types ---- */
type DayState = "available" | "booked" | "unavailable" | "past";

interface BookedEntry {
  brand: string;
  campaign: string;
}

/* ---- seed data ---- */
const TODAY_DAY = 29; // June 29
const MONTH_NAME = "June 2025";
const DAYS_IN_MONTH = 30;
const FIRST_DOF = 0; // June 2025 starts on Sunday

const BOOKED_BRANDS: Record<number, BookedEntry> = {
  5:  { brand: "GlowCo",    campaign: "Summer Refresh" },
  6:  { brand: "GlowCo",    campaign: "Summer Refresh" },
  7:  { brand: "GlowCo",    campaign: "Summer Refresh" },
  12: { brand: "Aura Labs",  campaign: "Glow Campaign"  },
  13: { brand: "Aura Labs",  campaign: "Glow Campaign"  },
  14: { brand: "Aura Labs",  campaign: "Glow Campaign"  },
  20: { brand: "FitLife",   campaign: "Q3 Wellness"     },
};

function initDays(): Record<number, DayState> {
  const m: Record<number, DayState> = {};
  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    if (d < TODAY_DAY)            m[d] = "past";
    else if (BOOKED_BRANDS[d])    m[d] = "booked";
    else if (d >= 22 && d <= 27)  m[d] = "unavailable";
    else                          m[d] = "available";
  }
  return m;
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ---- Demo ---- */
function Demo() {
  const [days,   setDays]   = useState<Record<number, DayState>>(initDays);
  const [saved,  setSaved]  = useState(false);
  const [tooltip, setTip]   = useState<{ day: number; x: number; y: number } | null>(null);

  function cycleDay(d: number) {
    if (days[d] === "past" || days[d] === "booked") return;
    setDays((prev) => ({
      ...prev,
      [d]: prev[d] === "available" ? "unavailable" : "available",
    }));
    setSaved(false);
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const availCount   = Object.values(days).filter((s) => s === "available").length;
  const bookedCount  = Object.values(days).filter((s) => s === "booked").length;
  const unavailCount = Object.values(days).filter((s) => s === "unavailable").length;

  const DAY_STYLE: Record<DayState, React.CSSProperties> = {
    available:   { background: TONES.green.tint,  border: `1px solid ${TONES.green.text}20`,  color: TONES.green.text,  cursor: "pointer" },
    booked:      { background: TONES.blue.tint,   border: `1px solid ${TONES.blue.text}30`,   color: TONES.blue.text,   cursor: "default"  },
    unavailable: { background: TONES.red.tint,    border: `1px solid ${TONES.red.text}20`,    color: TONES.red.text,    cursor: "pointer"  },
    past:        { background: "var(--sd-bg-tertiary,#f5f5f5)", border: "1px solid transparent", color: "var(--sd-font-tertiary,#ccc)", cursor: "default" },
  };

  // build calendar grid
  const cells: (number | null)[] = [
    ...Array(FIRST_DOF).fill(null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];
  while (cells.length % 7) cells.push(null);

  return (
    <div style={{ fontFamily: "var(--sd-font, Inter, sans-serif)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <button style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconChevronLeft size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        </button>
        <div style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 800 }}>{MONTH_NAME}</div>
        <button style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--sd-border-default,#e5e7eb)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconChevronRight size={13} style={{ color: "var(--sd-font-tertiary,#999)" }} />
        </button>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        {([
          { state: "available",   label: `${availCount} Available`,   icon: IconCircleDot, tone: "green"  as const },
          { state: "booked",      label: `${bookedCount} Booked`,     icon: IconLock,      tone: "blue"   as const },
          { state: "unavailable", label: `${unavailCount} Blocked`,   icon: IconX,         tone: "red"    as const },
        ] as const).map(({ state, label, icon: Icon, tone }) => (
          <div key={state} style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 99, background: TONES[tone].tint }}>
            <Icon size={10} style={{ color: TONES[tone].text }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: TONES[tone].text }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 4 }}>
        {WEEKDAYS.map((w) => (
          <div key={w} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary,#999)", padding: "4px 0" }}>{w}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginBottom: 14 }}>
        {cells.map((day, i) => {
          if (!day) return <div key={`e${i}`} />;
          const st = days[day];
          const isToday = day === TODAY_DAY;
          return (
            <div key={day} onClick={() => cycleDay(day)}
              style={{ ...DAY_STYLE[st], borderRadius: 8, aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", outline: isToday ? `2px solid #111` : "none", outlineOffset: 1 }}
              onMouseEnter={(e) => {
                if (st === "booked" && BOOKED_BRANDS[day]) {
                  const r = (e.target as HTMLElement).getBoundingClientRect();
                  setTip({ day, x: r.left, y: r.bottom });
                }
              }}
              onMouseLeave={() => setTip(null)}>
              <span style={{ fontSize: 12, fontWeight: isToday ? 900 : 700 }}>{day}</span>
              {st === "available"   && <IconCircleDot size={8} style={{ color: TONES.green.text, marginTop: 1 }} />}
              {st === "booked"      && <IconLock       size={8} style={{ color: TONES.blue.text,  marginTop: 1 }} />}
              {st === "unavailable" && <IconX          size={8} style={{ color: TONES.red.text,   marginTop: 1 }} />}
            </div>
          );
        })}
      </div>

      {/* Booked details */}
      {Object.entries(BOOKED_BRANDS).map(([d, b]) => {
        const day = parseInt(d);
        if (!BOOKED_BRANDS[day] || BOOKED_BRANDS[day - 1] === b) return null;
        return (
          <div key={d} style={{ display: "flex", gap: 8, alignItems: "center", padding: "7px 12px", border: "1px solid var(--sd-border-default,#e5e7eb)", borderRadius: 9, marginBottom: 6 }}>
            <IconCalendarEvent size={13} style={{ color: TONES.blue.text, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{b.brand} — {b.campaign}</div>
              <div style={{ fontSize: 10, color: "var(--sd-font-tertiary,#999)" }}>
                Jun {day}–{Math.max(...Object.entries(BOOKED_BRANDS).filter(([,bk]) => bk.brand === b.brand).map(([d2]) => parseInt(d2)))}
              </div>
            </div>
            <Badge label="Booked" tone="blue" size="sm" />
          </div>
        );
      })}

      {/* Save */}
      <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button variant="secondary" size="sm" onClick={() => { setDays(initDays()); setSaved(false); }}>Reset</Button>
        <Button variant="primary"   size="sm" leftIcon={saved ? <IconCheck size={11} /> : undefined} onClick={save}>
          {saved ? "Saved!" : "Save availability"}
        </Button>
      </div>
      <div style={{ marginTop: 8, fontSize: 10, color: "var(--sd-font-tertiary,#999)", textAlign: "right" }}>
        Click an available day to block it, or a blocked day to re-open it
      </div>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "creator-availability-calendar",
  title: "CreatorAvailabilityCalendar",
  group: "Pre-built / Composite",
  status: "stable",
  summary:
    "Month-view calendar where creators mark their availability — green available, blue booked (with brand name), red blocked. Click to toggle; Save pushes to brands.",
  description:
    "Lets creators control their booking calendar. Month nav (prev/next chevrons), current month title. Legend row: green/blue/red counts. Weekday header row. 7-column calendar grid: each day cell shows number + mini icon (dot/lock/×) tinted to its state. Past days are light gray and inert. Booked days show a lock icon and cannot be toggled — a booked details strip below lists brand name + campaign + date range with a blue badge. Today's date has a black outline ring. Clicking available ↔ blocked (red) toggles that day; booked days are protected. 3 booked windows pre-seeded: GlowCo Jun 5–7, Aura Labs Jun 12–14, FitLife Jun 20. Jun 22–27 pre-blocked. Reset button restores initial state. Save button shows 'Saved!' green check for 2 seconds. Composes Badge, Button — primitives only.",
  demos: [
    {
      title: "Creator availability calendar",
      description: "Click any green (available) day to block it, or any red (blocked) day to re-open it. Booked days (blue, locked) cannot be changed. Click Save availability.",
      render: () => <Demo />,
      block: true,
    },
  ],
  props: [],
};

export default doc;
