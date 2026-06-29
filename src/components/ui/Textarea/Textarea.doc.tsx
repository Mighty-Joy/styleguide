"use client";

import React, { useState } from "react";
import Textarea from "./Textarea";
import type { ComponentDoc } from "@/catalog/types";

function BasicDemo() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("This creator has great engagement with the sustainable lifestyle niche. Recommend for the next skincare campaign.");
  const [v3, setV3] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
      <Textarea value={v1} onChange={setV1} label="Campaign brief" placeholder="Describe the campaign goal, audience, and key messages…" rows={4} hint="Shared with all creators on this campaign." />
      <Textarea value={v2} onChange={setV2} label="Creator note" rows={3} maxLength={200} showCount />
      <Textarea value={v3} onChange={setV3} label="Revision feedback" placeholder="Describe what needs to change…" rows={3} error="Feedback is required before requesting a revision." />
      <Textarea value="Read-only content" onChange={() => {}} label="Disabled" disabled rows={2} />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "textarea",
  title: "Textarea",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Multiline text input with character count, label, hint, and error states.",
  description:
    "Textarea wraps a `<textarea>` in the design system's token-based style. Supports label, hint, error, optional character count (showCount), maxLength with over-limit warning, disabled state, configurable row height, and resize behavior. Used for campaign briefs, creator notes, revision feedback, deal talking points, and message composition.",
  demos: [
    { title: "States", description: "Basic, with character count + limit, error, and disabled.", render: () => <BasicDemo /> },
  ],
  props: [
    {
      rows: [
        { name: "value",       type: "string",                    required: true,  description: "Controlled text value." },
        { name: "onChange",    type: "(value: string) => void",   required: true,  description: "Called with the new string on every keystroke." },
        { name: "placeholder", type: "string",                    required: false, description: "Placeholder text shown when value is empty." },
        { name: "label",       type: "string",                    required: false, description: "Label rendered above the textarea." },
        { name: "hint",        type: "string",                    required: false, description: "Helper text below. Hidden when error is set." },
        { name: "error",       type: "string",                    required: false, description: "Error message below. Makes the border red." },
        { name: "disabled",    type: "boolean",                   required: false, description: "Dims and prevents editing." },
        { name: "rows",        type: "number",                    required: false, description: "Initial visible row count. Defaults to 4." },
        { name: "maxLength",   type: "number",                    required: false, description: "Character limit. Shows red count when exceeded." },
        { name: "showCount",   type: "boolean",                   required: false, description: "Show character count even without maxLength." },
        { name: "resize",      type: '"none"|"vertical"|"both"',  required: false, description: 'CSS resize behavior. Defaults to "vertical".' },
      ],
    },
  ],
};

export default doc;
