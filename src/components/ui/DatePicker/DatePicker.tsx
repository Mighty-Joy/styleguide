"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconCalendar, IconX } from "@tabler/icons-react";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export interface DatePickerProps {
  value: string | null;           // ISO "YYYY-MM-DD"
  onChange: (date: string | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  clearable?: boolean;
  size?: "sm" | "md";
}

export interface DateRangePickerProps {
  startDate: string | null;
  endDate: string | null;
  onStartChange: (date: string | null) => void;
  onEndChange: (date: string | null) => void;
  startLabel?: string;
  endLabel?: string;
  disabled?: boolean;
  minDate?: string;
}

/* ------------------------------------------------------------------ */
/* Utilities                                                             */
/* ------------------------------------------------------------------ */

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function parseDate(iso: string | null): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function formatDisplay(iso: string | null): string {
  if (!iso) return "";
  const d = parseDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function calendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

/* ------------------------------------------------------------------ */
/* Calendar popup                                                        */
/* ------------------------------------------------------------------ */

function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  rangeStart,
  rangeEnd,
  pickingEnd,
}: {
  value: string | null;
  onChange: (iso: string) => void;
  minDate?: string;
  maxDate?: string;
  rangeStart?: string | null;
  rangeEnd?: string | null;
  pickingEnd?: boolean;
}) {
  const today = new Date();
  const init = parseDate(value) ?? today;
  const [view, setView] = useState({ year: init.getFullYear(), month: init.getMonth() });

  const cells = calendarDays(view.year, view.month);

  const isSelected = (d: Date) => {
    if (rangeStart !== undefined) {
      if (rangeStart && toISO(d) === rangeStart) return true;
      if (rangeEnd && toISO(d) === rangeEnd) return true;
      return false;
    }
    return value ? toISO(d) === value : false;
  };

  const isInRange = (d: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    const iso = toISO(d);
    return iso > rangeStart && iso < rangeEnd;
  };

  const isDisabled = (d: Date) => {
    const iso = toISO(d);
    if (minDate && iso < minDate) return true;
    if (maxDate && iso > maxDate) return true;
    return false;
  };

  const isToday = (d: Date) => toISO(d) === toISO(today);

  const prevMonth = () => setView(v => {
    const m = v.month === 0 ? 11 : v.month - 1;
    const y = v.month === 0 ? v.year - 1 : v.year;
    return { year: y, month: m };
  });
  const nextMonth = () => setView(v => {
    const m = v.month === 11 ? 0 : v.month + 1;
    const y = v.month === 11 ? v.year + 1 : v.year;
    return { year: y, month: m };
  });

  return (
    <div style={{ padding: "10px 12px", userSelect: "none" }}>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <button type="button" onClick={prevMonth}
          style={{ width: 26, height: 26, border: "none", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconChevronLeft size={13} style={{ color: "var(--sd-font-secondary)" }} />
        </button>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--sd-font-primary)" }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button type="button" onClick={nextMonth}
          style={{ width: 26, height: 26, border: "none", background: "var(--sd-bg-secondary)", borderRadius: "var(--sd-radius-sm)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconChevronRight size={13} style={{ color: "var(--sd-font-secondary)" }} />
        </button>
      </div>

      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 700, color: "var(--sd-font-tertiary)", padding: "2px 0" }}>{d}</div>
        ))}
      </div>

      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} />;
          const sel  = isSelected(d);
          const rang = isInRange(d);
          const dis  = isDisabled(d);
          const tod  = isToday(d);
          return (
            <button key={toISO(d)} type="button" disabled={dis}
              onClick={() => !dis && onChange(toISO(d))}
              style={{
                width: "100%", aspectRatio: "1", border: "none", borderRadius: "var(--sd-radius-sm)",
                fontSize: 12, cursor: dis ? "not-allowed" : "pointer", fontFamily: "var(--sd-font-stack)",
                fontWeight: sel ? 700 : tod ? 600 : 400,
                background: sel ? "var(--sd-accent)" : rang ? "var(--sd-accent-tint-2, #dbeafe)" : "transparent",
                color: sel ? "#fff" : dis ? "var(--sd-font-tertiary)" : tod ? "var(--sd-accent)" : "var(--sd-font-primary)",
                opacity: dis ? 0.35 : 1,
                outline: tod && !sel ? "1px solid var(--sd-accent)" : "none",
              }}>
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DatePicker (single)                                                   */
/* ------------------------------------------------------------------ */

export default function DatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  error,
  hint,
  disabled = false,
  minDate,
  maxDate,
  clearable = false,
  size = "md",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const h = size === "sm" ? 30 : 36;
  const fs = size === "sm" ? 12 : 13;

  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", gap: 4 }} ref={rootRef}>
      {label && <label style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{label}</label>}

      <button type="button" disabled={disabled} onClick={() => !disabled && setOpen(v => !v)}
        style={{ display: "flex", alignItems: "center", gap: 8, height: h, padding: "0 10px",
          border: `1px solid ${error ? "#ef4444" : open ? "var(--sd-accent)" : "var(--sd-border-medium)"}`,
          borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)",
          color: value ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
          fontSize: fs, fontFamily: "var(--sd-font-stack)", cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1, minWidth: 160,
          boxShadow: open ? "0 0 0 2px var(--sd-accent-tint-2)" : "none" }}>
        <IconCalendar size={14} style={{ color: "var(--sd-font-tertiary)", flexShrink: 0 }} />
        <span style={{ flex: 1, textAlign: "left" }}>{value ? formatDisplay(value) : placeholder}</span>
        {clearable && value && (
          <span onClick={e => { e.stopPropagation(); onChange(null); }}
            style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <IconX size={11} />
          </span>
        )}
      </button>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 300,
          background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)",
          borderRadius: "var(--sd-radius-md)", boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12)",
          animation: "pop 0.12s ease", minWidth: 240 }}>
          <Calendar value={value} minDate={minDate} maxDate={maxDate}
            onChange={iso => { onChange(iso); setOpen(false); }} />
        </div>
      )}

      {error && <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>{error}</span>}
      {hint && !error && <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{hint}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DateRangePicker                                                       */
/* ------------------------------------------------------------------ */

export function DateRangePicker({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  startLabel = "Start date",
  endLabel   = "End date",
  disabled   = false,
  minDate,
}: DateRangePickerProps) {
  const [open, setOpen]       = useState<"start" | "end" | null>(null);
  const [pickingEnd, setPickingEnd] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  function TriggerBtn({ which }: { which: "start" | "end" }) {
    const val  = which === "start" ? startDate : endDate;
    const lbl  = which === "start" ? startLabel : endLabel;
    const isOpen = open === which;
    return (
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)", marginBottom: 4 }}>{lbl}</div>
        <button type="button" disabled={disabled} onClick={() => setOpen(isOpen ? null : which)}
          style={{ display: "flex", alignItems: "center", gap: 8, height: 36, width: "100%", padding: "0 10px",
            border: `1px solid ${isOpen ? "var(--sd-accent)" : "var(--sd-border-medium)"}`,
            borderRadius: "var(--sd-radius-sm)", background: "var(--sd-bg-primary)",
            color: val ? "var(--sd-font-primary)" : "var(--sd-font-tertiary)",
            fontSize: 13, fontFamily: "var(--sd-font-stack)", cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1, boxShadow: isOpen ? "0 0 0 2px var(--sd-accent-tint-2)" : "none" }}>
          <IconCalendar size={14} style={{ color: "var(--sd-font-tertiary)" }} />
          <span>{val ? formatDisplay(val) : "Select…"}</span>
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }} ref={rootRef}>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <TriggerBtn which="start" />
        <div style={{ fontSize: 13, color: "var(--sd-font-tertiary)", paddingBottom: 8, flexShrink: 0 }}>→</div>
        <TriggerBtn which="end" />
      </div>

      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 300,
          background: "var(--sd-bg-primary)", border: "1px solid var(--sd-border-light)",
          borderRadius: "var(--sd-radius-md)", boxShadow: "0 8px 24px -4px rgba(0,0,0,0.12)",
          minWidth: 240, animation: "pop 0.12s ease" }}>
          <Calendar
            value={open === "start" ? startDate : endDate}
            minDate={open === "end" && startDate ? startDate : minDate}
            rangeStart={startDate}
            rangeEnd={endDate}
            onChange={iso => {
              if (open === "start") { onStartChange(iso); setOpen("end"); }
              else { onEndChange(iso); setOpen(null); }
            }}
          />
        </div>
      )}
    </div>
  );
}
