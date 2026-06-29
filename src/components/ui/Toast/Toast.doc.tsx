"use client";

import React from "react";
import { ToastProvider, useToast } from "./Toast";
import type { ComponentDoc } from "@/catalog/types";

/* ------------------------------------------------------------------ */
/* Interactive demo — must be inside a ToastProvider                    */
/* ------------------------------------------------------------------ */

function ToastButtons() {
  const { success, error, warning, info } = useToast();

  const examples: { label: string; action: () => void; bg: string; color: string }[] = [
    {
      label: "Deal signed",
      action: () => success("Deal signed", "Priya Nair accepted the Atlas X offer."),
      bg: "#dcfce7", color: "#166534",
    },
    {
      label: "Content rejected",
      action: () => error("Content rejected", "The TikTok reel did not meet brief requirements."),
      bg: "#fee2e2", color: "#991b1b",
    },
    {
      label: "Shipment delayed",
      action: () => warning("Shipment delayed", "Atlas X Kit → Nina Cole is past its estimated date."),
      bg: "#ffedd5", color: "#9a3412",
    },
    {
      label: "Creator invited",
      action: () => info("Invitation sent", "Leo Park has been invited to the Atlas X campaign."),
      bg: "#dbeafe", color: "#1e40af",
    },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {examples.map(({ label, action, bg, color }) => (
        <button key={label} type="button" onClick={action}
          style={{ height: 34, padding: "0 14px", border: "none", borderRadius: "var(--sd-radius-sm)", background: bg, color, fontSize: 13, fontWeight: 600, cursor: "pointer", font: "inherit" }}>
          {label}
        </button>
      ))}
    </div>
  );
}

function ToastDemo() {
  return (
    <ToastProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0, fontSize: 13, color: "var(--sd-font-secondary)" }}>
          Click a button to fire a toast. They auto-dismiss after 4 seconds or on ×. Multiple stack vertically.
        </p>
        <ToastButtons />
      </div>
    </ToastProvider>
  );
}

/* ------------------------------------------------------------------ */
/* Doc                                                                   */
/* ------------------------------------------------------------------ */

const doc: ComponentDoc = {
  slug: "toast",
  title: "Toast",
  group: "Feedback",
  status: "stable",
  summary: "Bottom-right notification toasts for action feedback — success, error, warning, info. Auto-dismiss after 4s.",
  description:
    "Toast is a context-based notification system. Wrap your app (or a demo) in `<ToastProvider>` and call `useToast()` to get `success()`, `error()`, `warning()`, `info()` helpers. Each toast shows a 3px left accent bar, an icon, a bold title, an optional description, and a dismiss ×. They stack vertically bottom-right and auto-dismiss after `duration` ms (default 4000). The accent color and icon are determined by the `kind` prop.",
  demos: [
    {
      title: "Interactive toast demo",
      description: "Click any button to fire a toast. Stack them up to see multi-toast layout.",
      block: true,
      render: () => <ToastDemo />,
    },
  ],
  props: [
    {
      title: "ToastItem",
      rows: [
        { name: "kind",        type: "'success'|'error'|'warning'|'info'", required: true,  description: "Determines icon, accent color, and tone." },
        { name: "title",       type: "string",   required: true,  description: "Primary message line." },
        { name: "description", type: "string",   required: false, description: "Supporting detail shown below the title." },
        { name: "duration",    type: "number",   required: false, default: "4000", description: "Auto-dismiss delay in ms." },
      ],
    },
    {
      title: "useToast() helpers",
      rows: [
        { name: "success(title, description?)", type: "() => void", required: false, description: "Green success toast." },
        { name: "error(title, description?)",   type: "() => void", required: false, description: "Red error toast." },
        { name: "warning(title, description?)", type: "() => void", required: false, description: "Orange warning toast." },
        { name: "info(title, description?)",    type: "() => void", required: false, description: "Blue informational toast." },
        { name: "toast(item)",                  type: "() => void", required: false, description: "Full-control shorthand." },
      ],
    },
  ],
};

export default doc;
