"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./RangeSlider.module.css";

export interface RangeSliderProps {
  min: number;
  max: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?: (value: [number, number]) => void;
  step?: number;
  formatValue?: (v: number) => string;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function snap(v: number, step: number, min: number) {
  return Math.round((v - min) / step) * step + min;
}

export default function RangeSlider({
  min,
  max,
  value: controlledValue,
  defaultValue,
  onChange,
  step = 1,
  formatValue = (v) => String(v),
  label,
  hint,
  disabled = false,
}: RangeSliderProps) {
  const [internal, setInternal] = useState<[number, number]>(
    controlledValue ?? defaultValue ?? [min, max]
  );

  const value = controlledValue ?? internal;
  const [lo, hi] = value;

  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<"lo" | "hi" | null>(null);

  const getPercent = (v: number) => ((v - min) / (max - min)) * 100;

  const valueFromEvent = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return min;
      const rect = track.getBoundingClientRect();
      const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
      const raw = ratio * (max - min) + min;
      return clamp(snap(raw, step, min), min, max);
    },
    [min, max, step]
  );

  const update = useCallback(
    (which: "lo" | "hi", clientX: number) => {
      const v = valueFromEvent(clientX);
      let next: [number, number];
      if (which === "lo") {
        next = [clamp(v, min, hi), hi];
      } else {
        next = [lo, clamp(v, lo, max)];
      }
      if (!controlledValue) setInternal(next);
      onChange?.(next);
    },
    [valueFromEvent, lo, hi, min, max, controlledValue, onChange]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current || disabled) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      update(dragging.current, clientX);
    };
    const onUp = () => { dragging.current = null; };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove as EventListener);
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove as EventListener);
      document.removeEventListener("touchend", onUp);
    };
  }, [update, disabled]);

  const startDrag = (which: "lo" | "hi") => (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    e.preventDefault();
    dragging.current = which;
  };

  const loPct = getPercent(lo);
  const hiPct = getPercent(hi);

  return (
    <div className={styles.root}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.values}>
        <span>{formatValue(lo)}</span>
        <span>{formatValue(hi)}</span>
      </div>
      <div
        ref={trackRef}
        className={`${styles.track} ${disabled ? styles.trackDisabled : ""}`}
      >
        <div className={styles.rail} />
        <div
          className={styles.fill}
          style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }}
        />
        {/* Low thumb */}
        <div
          className={`${styles.thumb} ${disabled ? styles.thumbDisabled : ""}`}
          style={{ left: `${loPct}%` }}
          onMouseDown={startDrag("lo")}
          onTouchStart={startDrag("lo")}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={hi}
          aria-valuenow={lo}
          aria-label="Minimum"
          tabIndex={disabled ? -1 : 0}
        />
        {/* High thumb */}
        <div
          className={`${styles.thumb} ${disabled ? styles.thumbDisabled : ""}`}
          style={{ left: `${hiPct}%` }}
          onMouseDown={startDrag("hi")}
          onTouchStart={startDrag("hi")}
          role="slider"
          aria-valuemin={lo}
          aria-valuemax={max}
          aria-valuenow={hi}
          aria-label="Maximum"
          tabIndex={disabled ? -1 : 0}
        />
      </div>
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
}
