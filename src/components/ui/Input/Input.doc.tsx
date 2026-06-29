"use client";

import React, { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { Input, Textarea } from "./Input";
import { Select } from "./Select";
import { MultiSelect } from "./MultiSelect";
import { ChatInput } from "./ChatInput";
import type { ComponentDoc } from "@/catalog/types";

const PLATFORM_OPTIONS = [
  { value: "ig", label: "Instagram" },
  { value: "tt", label: "TikTok" },
  { value: "yt", label: "YouTube" },
  { value: "pi", label: "Pinterest" },
  { value: "tw", label: "Twitter / X" },
];

const STAGE_OPTIONS = [
  { value: "prospect", label: "Prospect" },
  { value: "outreach", label: "Outreach" },
  { value: "negotiation", label: "Negotiation" },
  { value: "signed", label: "Signed" },
  { value: "in_production", label: "In production" },
  { value: "completed", label: "Completed" },
];

function SelectDemo() {
  const [platform, setPlatform] = useState("ig");
  const [stage, setStage] = useState("");
  return (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <Select
        label="Primary platform"
        options={PLATFORM_OPTIONS}
        value={platform}
        onChange={setPlatform}
      />
      <Select
        label="Deal stage"
        options={STAGE_OPTIONS}
        value={stage}
        onChange={setStage}
        placeholder="Pick a stage…"
      />
    </div>
  );
}

function MultiSelectDemo() {
  const [platforms, setPlatforms] = useState<string[]>(["ig", "tt"]);
  return (
    <MultiSelect
      label="Platforms"
      options={PLATFORM_OPTIONS}
      value={platforms}
      onChange={setPlatforms}
      placeholder="Add platform…"
      hint="Backspace removes the last tag."
    />
  );
}

function ChatDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480, width: "100%" }}>
      {log.length > 0 && (
        <div
          style={{
            padding: "10px 12px",
            background: "var(--sd-bg-tertiary)",
            borderRadius: "var(--sd-radius-sm)",
            fontSize: "var(--sd-text-xs)",
            color: "var(--sd-font-secondary)",
          }}
        >
          {log.map((m, i) => (
            <div key={i}>✓ Sent: "{m}"</div>
          ))}
        </div>
      )}
      <ChatInput
        placeholder="Reply to Priya…"
        onSend={(msg) => setLog((l) => [...l, msg])}
      />
      <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
        Enter to send · Shift+Enter for newline
      </span>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "input",
  title: "Input",
  group: "Inputs & Controls",
  status: "stable",
  summary:
    "Text, select, multi-select, and the chat reply bar — all on the --sd-* token layer.",
  description:
    "One scaffold, four shapes. `Input` / `Textarea` have two skins: `elevated` (forms, sign-in) and `bare` (inline right-panel fields). `Select` and `MultiSelect` match the elevated look. `ChatInput` (the ReplyBar) lives at the bottom of message threads.",
  source: "apps/web — restyle of the existing inputs",
  demos: [
    {
      title: "Variants",
      description:
        "elevated (forms) vs bare (right-panel fields). Bare is shown on a panel surface so its hover/focus reads correctly.",
      render: () => (
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <Input variant="elevated" placeholder="email@company.com" />
            <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>elevated</span>
          </div>
          <div
            style={{
              padding: 12,
              background: "var(--sd-bg-primary)",
              border: "1px solid var(--sd-border-light)",
              borderRadius: "var(--sd-radius-md)",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Input variant="bare" placeholder="Annual Revenue" />
            <span style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>
              bare (hover / focus me)
            </span>
          </div>
        </div>
      ),
    },
    {
      title: "Text & label",
      render: () => (
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <Input label="Campaign name" placeholder="Summer Launch" />
          <Input label="Budget" placeholder="$0" hint="Total across all creators." />
        </div>
      ),
    },
    {
      title: "Search (leading icon)",
      render: () => (
        <Input leftIcon={<IconSearch size={15} />} placeholder="Search creators…" />
      ),
    },
    {
      title: "Select",
      description: "Styled dropdown — same elevated look as Input. Chevron rotates on open.",
      render: () => <SelectDemo />,
    },
    {
      title: "Multi-select",
      description:
        "Selected values become pills. Type to filter remaining options. Backspace removes the last tag.",
      render: () => <MultiSelectDemo />,
    },
    {
      title: "Chat input (ReplyBar)",
      description:
        "The compose bar at the bottom of a message thread. Auto-grows. Send activates on first character.",
      block: true,
      render: () => <ChatDemo />,
    },
    {
      title: "Error state",
      render: () => (
        <Input label="Email" defaultValue="not-an-email" error="Enter a valid email address." />
      ),
    },
    {
      title: "Disabled",
      render: () => <Input label="Workspace" defaultValue="Mighty Joy" disabled />,
    },
    {
      title: "Textarea",
      block: true,
      render: () => (
        <Textarea
          label="Creator blurb"
          placeholder="A short note about this creator…"
          style={{ maxWidth: 480 }}
        />
      ),
    },
  ],
  props: [
    {
      title: "InputProps",
      rows: [
        { name: "variant", type: '"elevated" | "bare"', default: '"elevated"', description: "Form look (shadowed) vs quiet inline field." },
        { name: "label", type: "string", description: "Field label above the control." },
        { name: "hint", type: "string", description: "Helper text below the control." },
        { name: "error", type: "string | boolean", description: "true for error ring; string also shows the message." },
        { name: "leftIcon", type: "ReactNode", description: "Leading glyph (e.g. search); insets the text." },
        { name: "…rest", type: "input HTML attributes", description: "value, onChange, placeholder, disabled… forwarded." },
      ],
    },
    {
      title: "SelectProps",
      rows: [
        { name: "options", type: "{ label, value }[]", required: true, description: "The list of options." },
        { name: "value", type: "string", description: "Controlled selected value." },
        { name: "onChange", type: "(value: string) => void", description: "Called on selection." },
        { name: "placeholder", type: "string", default: '"Select…"', description: "Trigger label when nothing is selected." },
        { name: "label / hint / disabled", type: "—", description: "Same as Input." },
      ],
    },
    {
      title: "MultiSelectProps",
      rows: [
        { name: "options", type: "{ label, value }[]", required: true, description: "All available options." },
        { name: "value", type: "string[]", default: "[]", description: "Controlled array of selected values." },
        { name: "onChange", type: "(value: string[]) => void", description: "Called on any change." },
        { name: "placeholder", type: "string", default: '"Search…"', description: "Shown when nothing is selected." },
        { name: "label / hint", type: "—", description: "Same as Input." },
      ],
    },
    {
      title: "ChatInputProps",
      rows: [
        { name: "placeholder", type: "string", default: '"Reply…"', description: "Textarea placeholder." },
        { name: "onSend", type: "(message: string) => void", description: "Called with trimmed content on Enter or send button click." },
        { name: "disabled", type: "boolean", description: "Disables the control." },
      ],
    },
    {
      title: "TextareaProps",
      rows: [
        { name: "label / hint / error", type: "—", description: "Same as Input." },
        { name: "…rest", type: "textarea HTML attributes", description: "Forwarded to <textarea>." },
      ],
    },
  ],
};

export default doc;
