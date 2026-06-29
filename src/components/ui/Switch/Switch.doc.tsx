"use client";

import React, { useState } from "react";
import Switch from "./Switch";
import type { ComponentDoc } from "@/catalog/types";

function BasicDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <Switch checked={checked} onChange={setChecked} label="Email notifications" description="Receive updates when a creator approves your deal." />
      <Switch checked={!checked} onChange={v => setChecked(!v)} label="Auto-approve content" description="Skip manual review when creator uploads meet all criteria." />
      <Switch checked={false} onChange={() => {}} label="Beta features" disabled description="Contact support to enable early access." />
    </div>
  );
}

function SizeDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(true);
  const [c, setC] = useState(false);
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <Switch checked={a} onChange={setA} size="sm" label="Small" />
      <Switch checked={b} onChange={setB} size="md" label="Medium" />
      <Switch checked={c} onChange={setC} size="lg" label="Large" />
    </div>
  );
}

function SettingsGroupDemo() {
  const [s, setS] = useState({ deal: true, content: false, messages: true, weekly: false });
  const toggle = (k: keyof typeof s) => setS(prev => ({ ...prev, [k]: !prev[k] }));
  const items = [
    { key: "deal"     as const, label: "Deal activity",       desc: "When a deal is created, updated, or closed" },
    { key: "content"  as const, label: "Content updates",     desc: "Approval, revision requests, and uploads" },
    { key: "messages" as const, label: "Messages",            desc: "New messages from creators and brands" },
    { key: "weekly"   as const, label: "Weekly digest",       desc: "Summary of campaign activity every Monday" },
  ];
  return (
    <div style={{ border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-md)", overflow: "hidden", maxWidth: 420 }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--sd-border-light)", fontSize: 12, fontWeight: 700, color: "var(--sd-font-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Notification preferences
      </div>
      {items.map((item, i) => (
        <div key={item.key} style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
          padding: "12px 14px", borderBottom: i < items.length - 1 ? "1px solid var(--sd-border-light)" : "none" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)" }}>{item.label}</div>
            <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)", marginTop: 2 }}>{item.desc}</div>
          </div>
          <Switch checked={s[item.key]} onChange={() => toggle(item.key)} size="sm" />
        </div>
      ))}
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "switch",
  title: "Switch",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Toggle switch for boolean settings — three sizes with optional label and description.",
  description:
    "Switch is a styled checkbox rendered as an iOS-style toggle track. The `checked` state controls the thumb position and track color (accent when on, border-heavy when off). Accepts an optional `label` and `description` to the right of the track. Three sizes: sm (32×18), md (40×22), lg (48×26). The hidden `<input type=\"checkbox\">` remains keyboard-accessible. Used for notification preferences, feature flags, creator opt-in/opt-out, and any boolean setting.",
  demos: [
    { title: "With label + description", render: () => <BasicDemo /> },
    { title: "Sizes", render: () => <SizeDemo /> },
    { title: "Settings group", description: "Pattern: right-aligned sm switch in a settings list. Each row has label + secondary description on the left.", render: () => <SettingsGroupDemo /> },
  ],
  props: [
    {
      rows: [
        { name: "checked",     type: "boolean",                  required: true,  description: "Whether the switch is on." },
        { name: "onChange",    type: "(checked: boolean) => void", required: true, description: "Called with the new boolean value on toggle." },
        { name: "label",       type: "string",                   required: false, description: "Text rendered to the right of the track." },
        { name: "description", type: "string",                   required: false, description: "Secondary line below the label." },
        { name: "disabled",    type: "boolean",                  required: false, description: "Dims and prevents interaction." },
        { name: "size",        type: '"sm" | "md" | "lg"',       required: false, description: "Track size. Defaults to md (40×22px)." },
        { name: "id",          type: "string",                   required: false, description: "DOM id for the hidden input. Auto-generated if omitted." },
      ],
    },
  ],
};

export default doc;
