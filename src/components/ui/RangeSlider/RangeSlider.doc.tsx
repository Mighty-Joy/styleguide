"use client";

import React, { useState } from "react";
import RangeSlider from "./RangeSlider";
import type { ComponentDoc } from "@/catalog/types";

function Demo({
  min, max, step, init, format, label, hint, disabled,
}: {
  min: number; max: number; step?: number;
  init: [number, number]; format?: (v: number) => string;
  label?: string; hint?: string; disabled?: boolean;
}) {
  const [val, setVal] = useState<[number, number]>(init);
  return (
    <div style={{ width: 320 }}>
      <RangeSlider
        min={min} max={max} step={step}
        value={val} onChange={setVal}
        formatValue={format}
        label={label} hint={hint} disabled={disabled}
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "range-slider",
  title: "RangeSlider",
  group: "Primitives",
  status: "stable",
  summary: "Dual-thumb range slider — drag to set minimum and maximum values. Mouse and touch support.",
  description:
    "Use `RangeSlider` for budget ranges, follower count filters, engagement rate windows, or any two-ended numeric constraint. The two thumbs cannot cross each other. Pass `formatValue` to localize the displayed numbers (e.g. `$2,000`, `50K`, `4.6%`).",
  demos: [
    {
      title: "Follower count range",
      description: "min=0, max=1000, formatValue shows 'K' suffix.",
      render: () => (
        <Demo
          min={0} max={1000} step={10}
          init={[50, 500]}
          format={(v) => `${v}K`}
          label="Followers"
        />
      ),
    },
    {
      title: "Budget range",
      description: "Formatted as currency with thousands separator.",
      render: () => (
        <Demo
          min={0} max={50000} step={500}
          init={[2000, 15000]}
          format={(v) => `$${v.toLocaleString()}`}
          label="Budget"
        />
      ),
    },
    {
      title: "Engagement rate",
      description: "Float step (0.1), percentage suffix.",
      render: () => (
        <Demo
          min={0} max={20} step={0.1}
          init={[2, 8]}
          format={(v) => `${v.toFixed(1)}%`}
          label="Engagement rate"
        />
      ),
    },
    {
      title: "With label and hint",
      render: () => (
        <Demo
          min={0} max={365} step={1}
          init={[30, 90]}
          format={(v) => `${v}d`}
          label="Campaign duration"
          hint="Select a range between 30 and 365 days"
        />
      ),
    },
    {
      title: "Disabled",
      render: () => (
        <Demo
          min={0} max={1000} step={10}
          init={[100, 400]}
          format={(v) => `${v}K`}
          label="Followers (locked)"
          disabled
        />
      ),
    },
  ],
  props: [
    {
      title: "RangeSliderProps",
      rows: [
        { name: "min",          type: "number",                  required: true,  description: "Minimum bound of the range." },
        { name: "max",          type: "number",                  required: true,  description: "Maximum bound of the range." },
        { name: "value",        type: "[number, number]",        required: false, description: "Controlled [low, high] value." },
        { name: "defaultValue", type: "[number, number]",        required: false, description: "Initial value for uncontrolled mode." },
        { name: "onChange",     type: "(v: [number, number]) => void", required: false, description: "Called on every drag update." },
        { name: "step",         type: "number",                  required: false, default: "1", description: "Snap increment." },
        { name: "formatValue",  type: "(v: number) => string",  required: false, description: "Format numbers for display (e.g. currency, suffix)." },
        { name: "label",        type: "string",                  required: false, description: "Field label rendered above." },
        { name: "hint",         type: "string",                  required: false, description: "Helper text below." },
        { name: "disabled",     type: "boolean",                 required: false, default: "false", description: "Makes the slider non-interactive." },
      ],
    },
  ],
};

export default doc;
