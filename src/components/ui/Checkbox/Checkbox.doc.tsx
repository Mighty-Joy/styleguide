"use client";

import React, { useState } from "react";
import Checkbox, { Radio, RadioGroup } from "./Checkbox";
import type { ComponentDoc } from "@/catalog/types";

/* ---- Checkbox demos ---- */

function CheckboxBasicDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);
  const [items, setItems] = useState([true, false, true]);

  const allChecked  = items.every(Boolean);
  const someChecked = items.some(Boolean) && !allChecked;
  const toggle = (i: number) => setItems(prev => { const n = [...prev]; n[i] = !n[i]; return n; });
  const toggleAll = () => setItems(allChecked ? [false,false,false] : [true,true,true]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <Checkbox checked={a} onChange={setA} label="Unchecked" />
        <Checkbox checked={b} onChange={setB} label="Checked" />
        <Checkbox checked="indeterminate" onChange={() => {}} label="Indeterminate" />
        <Checkbox checked={false} onChange={() => {}} label="Disabled" disabled />
      </div>

      <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-sm)", overflow: "hidden", maxWidth: 260 }}>
        <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--sd-border-light)" }}>
          <Checkbox checked={someChecked ? "indeterminate" : allChecked} onChange={toggleAll} label="Select all creators" size="sm" />
        </div>
        {["Priya Nair", "Sam Kim", "Mara Voss"].map((name, i) => (
          <div key={name} style={{ padding: "8px 20px", borderBottom: i < 2 ? "1px solid var(--sd-border-light)" : "none" }}>
            <Checkbox checked={items[i]} onChange={() => toggle(i)} label={name} size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Radio demos ---- */

function RadioBasicDemo() {
  const [dealType, setDealType] = useState("paid");
  const [platform, setPlatform] = useState("instagram");

  return (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Deal type</div>
        <RadioGroup value={dealType} onChange={setDealType}>
          <Radio value="gifting"   label="Gifting"            description="Product in exchange for content" />
          <Radio value="ugc"       label="UGC"                description="Usage rights, no post required" />
          <Radio value="paid"      label="Paid partnership"   description="Cash compensation for post" />
          <Radio value="affiliate" label="Affiliate"          description="Commission on tracked sales" />
        </RadioGroup>
      </div>

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Platform (row)</div>
        <RadioGroup value={platform} onChange={setPlatform} direction="row">
          <Radio value="instagram" label="Instagram" />
          <Radio value="tiktok"    label="TikTok" />
          <Radio value="youtube"   label="YouTube" />
        </RadioGroup>
      </div>
    </div>
  );
}

/* ---- Doc ---- */

const doc: ComponentDoc = {
  slug: "checkbox",
  title: "Checkbox & Radio",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Checkbox with indeterminate state, and Radio + RadioGroup for single-select option lists.",
  description:
    "Two components in one file: **Checkbox** renders a styled square toggle with three states (unchecked / checked / indeterminate). The indeterminate state is used for 'select all' rows when only some children are selected. **Radio** and **RadioGroup** render a single-choice list — RadioGroup manages checked state across children automatically. Both support sm (14px) and md (16px) sizes, optional label + description, and disabled. All hidden `<input>` elements remain keyboard-accessible.",
  demos: [
    { title: "Checkbox — states + select-all pattern", render: () => <CheckboxBasicDemo /> },
    { title: "Radio + RadioGroup — column and row", render: () => <RadioBasicDemo /> },
  ],
  props: [
    {
      title: "Checkbox",
      rows: [
        { name: "checked",     type: 'boolean | "indeterminate"', required: true,  description: "Checked state. Pass \"indeterminate\" for the dash state." },
        { name: "onChange",    type: "(checked: boolean) => void", required: true, description: "Called with true/false on click." },
        { name: "label",       type: "React.ReactNode",            required: false, description: "Text label to the right of the box." },
        { name: "description", type: "string",                    required: false, description: "Secondary line below the label." },
        { name: "disabled",    type: "boolean",                   required: false, description: "Dims and prevents interaction." },
        { name: "size",        type: '"sm" | "md"',               required: false, description: "Box size. sm=14px, md=16px (default)." },
      ],
    },
    {
      title: "Radio",
      rows: [
        { name: "checked",     type: "boolean",       required: true,  description: "Whether this option is selected." },
        { name: "onChange",    type: "() => void",    required: true,  description: "Called when this option is selected." },
        { name: "value",       type: "string",        required: false, description: "The value passed to RadioGroup.onChange when this is selected." },
        { name: "label",       type: "React.ReactNode", required: false, description: "Label to the right of the indicator." },
        { name: "description", type: "string",        required: false, description: "Secondary line below the label." },
        { name: "disabled",    type: "boolean",       required: false, description: "Dims and prevents interaction." },
        { name: "size",        type: '"sm" | "md"',   required: false, description: "Indicator size. sm=14px, md=16px (default)." },
      ],
    },
    {
      title: "RadioGroup",
      rows: [
        { name: "value",      type: "string",                    required: true,  description: "Currently selected value." },
        { name: "onChange",   type: "(value: string) => void",   required: true,  description: "Called with the selected Radio's value prop." },
        { name: "children",   type: "React.ReactNode",           required: true,  description: "Radio elements. Non-Radio children are passed through unchanged." },
        { name: "name",       type: "string",                    required: false, description: "HTML name attribute for the radio group. Auto-generated if omitted." },
        { name: "direction",  type: '"row" | "column"',          required: false, description: 'Layout direction. Defaults to "column".' },
        { name: "gap",        type: "number",                    required: false, description: "Gap between radio items in px. Defaults to 8 (column) or 16 (row)." },
      ],
    },
  ],
};

export default doc;
