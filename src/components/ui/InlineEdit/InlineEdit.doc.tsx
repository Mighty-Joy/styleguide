"use client";

import React, { useState } from "react";
import InlineEdit from "./InlineEdit";
import type { ComponentDoc } from "@/catalog/types";

function Demo({ initial }: { initial: string }) {
  const [val, setVal] = useState(initial);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <InlineEdit value={val} onSave={setVal} />
      <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>Saved: "{val}"</div>
    </div>
  );
}

function MultilineDemo() {
  const [val, setVal] = useState("Beauty & lifestyle creator based in LA. I make content about skincare routines, minimalist fashion, and slow living.");
  return <InlineEdit value={val} onSave={setVal} multiline />;
}

function ValidationDemo() {
  const [val, setVal] = useState("Atlas");
  return (
    <InlineEdit
      value={val}
      onSave={setVal}
      validate={(v) => v.trim().length < 3 ? "Must be at least 3 characters" : null}
    />
  );
}

function CustomRenderDemo() {
  const [val, setVal] = useState("Active");
  return (
    <InlineEdit
      value={val}
      onSave={setVal}
      renderValue={(v) => (
        <span style={{ background: "#dcfce7", color: "#15803d", borderRadius: 9999, padding: "2px 10px", fontSize: 12, fontWeight: 600 }}>{v}</span>
      )}
    />
  );
}

const doc: ComponentDoc = {
  slug: "inline-edit",
  title: "InlineEdit",
  group: "Core Components",
  status: "stable",
  summary: "Click-to-edit text field — seamless inline editing for CRM views, deal titles, notes, and metadata.",
  description: "Displays as plain text with a hover pencil indicator. Click to enter edit mode with save (✓) and cancel (✕) controls. Supports validation, multiline textarea, and custom value rendering. Font size inherits from context.",
  demos: [
    {
      title: "Basic",
      description: "Click the text to edit. Enter saves, Escape cancels.",
      render: () => <Demo initial="Atlas Summer X Campaign" />,
    },
    {
      title: "Multiline",
      description: "Use `multiline` for bio or notes fields — renders a textarea.",
      render: () => <MultilineDemo />,
      block: true,
    },
    {
      title: "With validation",
      description: "Pass `validate` to block saving invalid input.",
      render: () => <ValidationDemo />,
    },
    {
      title: "Custom render value",
      description: "Use `renderValue` to display a Badge, chip, or any element in display mode.",
      render: () => <CustomRenderDemo />,
    },
    {
      title: "Disabled",
      render: () => <InlineEdit value="Readonly value" onSave={() => {}} disabled />,
    },
  ],
  props: [
    {
      title: "InlineEditProps",
      rows: [
        { name: "value",        type: "string",                         required: true,  description: "Current display value." },
        { name: "onSave",       type: "(value: string) => void",        required: true,  description: "Called when the user confirms an edit." },
        { name: "placeholder",  type: "string",                         required: false, description: 'Shown when value is empty. Default "Click to edit".' },
        { name: "disabled",     type: "boolean",                        required: false, description: "Prevents entering edit mode." },
        { name: "multiline",    type: "boolean",                        required: false, description: "Use a textarea instead of an input." },
        { name: "validate",     type: "(v: string) => string | null",   required: false, description: "Return an error message to block saving, or null to allow." },
        { name: "renderValue",  type: "(v: string) => React.ReactNode", required: false, description: "Custom display renderer for the non-editing state." },
        { name: "label",        type: "string",                         required: false, description: "Accessible aria-label." },
      ],
    },
  ],
};

export default doc;
