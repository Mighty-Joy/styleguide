"use client";

import React, { useState } from "react";
import DatePicker, { DateRangePicker } from "./DatePicker";
import type { ComponentDoc } from "@/catalog/types";

function SingleDemo() {
  const [d1, setD1] = useState<string | null>(null);
  const [d2, setD2] = useState<string | null>("2025-08-10");
  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-start" }}>
      <DatePicker label="Deliverable due date" value={d1} onChange={setD1} placeholder="Pick a date" />
      <DatePicker label="Pre-selected + clearable" value={d2} onChange={setD2} clearable />
      <DatePicker label="Disabled" value="2025-06-01" onChange={() => {}} disabled />
      <DatePicker label="With error" value={null} onChange={() => {}} error="Due date is required." />
    </div>
  );
}

function RangeDemo() {
  const [start, setStart] = useState<string | null>(null);
  const [end,   setEnd]   = useState<string | null>(null);
  return (
    <div style={{ maxWidth: 380 }}>
      <DateRangePicker
        startDate={start} endDate={end}
        onStartChange={setStart} onEndChange={setEnd}
        startLabel="Campaign start" endLabel="Campaign end"
      />
      {start && end && (
        <div style={{ marginTop: 10, fontSize: 12, color: "var(--sd-font-secondary)" }}>
          Selected: {start} → {end}
        </div>
      )}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "date-picker",
  title: "DatePicker",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Single-date and date-range calendar pickers — zero external dependencies.",
  description:
    "Two components: **DatePicker** renders a calendar trigger button + popup month calendar. Selecting a day calls onChange with an ISO `YYYY-MM-DD` string and closes the popup. Supports minDate/maxDate constraints, optional clearable ×, label, hint, error, disabled, and two sizes (sm/md). **DateRangePicker** renders a start + end pair that open sequentially — clicking a start date auto-advances focus to the end picker, and selected range days are highlighted. Used for campaign start/end dates, deliverable due dates, and date filter ranges.",
  demos: [
    { title: "Single date", render: () => <SingleDemo /> },
    { title: "Date range — campaign dates", description: "Click start date, then end date. Range highlights between them.", render: () => <RangeDemo /> },
  ],
  props: [
    {
      rows: [
        { name: "value",       type: "string | null",           required: true,  description: 'ISO date string "YYYY-MM-DD" or null.' },
        { name: "onChange",    type: "(date: string|null)=>void", required: true, description: "Called with ISO string on selection, or null when cleared." },
        { name: "label",       type: "string",                  required: false, description: "Label above the trigger button." },
        { name: "placeholder", type: "string",                  required: false, description: 'Shown when value is null. Defaults to "Select date".' },
        { name: "error",       type: "string",                  required: false, description: "Error text below the trigger. Makes border red." },
        { name: "hint",        type: "string",                  required: false, description: "Hint text below. Hidden when error is set." },
        { name: "disabled",    type: "boolean",                 required: false, description: "Dims and prevents opening the calendar." },
        { name: "minDate",     type: "string",                  required: false, description: "ISO date — days before this are greyed and unselectable." },
        { name: "maxDate",     type: "string",                  required: false, description: "ISO date — days after this are greyed and unselectable." },
        { name: "clearable",   type: "boolean",                 required: false, description: "Shows × inside trigger to clear the selection." },
        { name: "size",        type: '"sm" | "md"',             required: false, description: "Trigger height. sm=30px, md=36px (default)." },
      ],
    },
  ],
};

export default doc;
