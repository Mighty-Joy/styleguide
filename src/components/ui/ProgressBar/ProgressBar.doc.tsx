"use client";

import React from "react";
import { ProgressBar } from "./ProgressBar";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "progress-bar",
  title: "ProgressBar",
  group: "Primitives",
  status: "stable",
  summary: "Horizontal progress indicator with tone colors, sizes, animated and striped variants.",
  description:
    "Use `ProgressBar` to communicate task completion, content submission ratios, platform breakdowns, or upload progress. Supports 4 sizes, 10 tones, optional label + value display, an animated pulse for in-progress states, and a striped pattern for visual variety.",
  demos: [
    {
      title: "Basic",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
          <ProgressBar value={67} tone="blue" />
        </div>
      ),
    },
    {
      title: "Tone variants",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 480 }}>
          {(["blue", "green", "orange", "red", "purple"] as const).map(tone => (
            <ProgressBar key={tone} value={75} tone={tone} label={tone} showValue />
          ))}
        </div>
      ),
    },
    {
      title: "With label + value",
      description: "Pass `label` and `showValue` to display context above the bar.",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
          <ProgressBar value={28} max={32} tone="purple" label="Content submitted" showValue />
          <ProgressBar value={12400} max={50000} tone="green" label="Budget spent" showValue />
        </div>
      ),
    },
    {
      title: "Animated",
      description: "Use `animated` while a background task is in progress.",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
          <ProgressBar value={45} tone="blue" label="Syncing data..." showValue animated />
          <ProgressBar value={72} tone="turquoise" label="Uploading assets..." showValue animated />
        </div>
      ),
    },
    {
      title: "Platform breakdown",
      description: "Stack multiple bars to show proportional splits.",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400 }}>
          <ProgressBar value={55} tone="pink"      label="Instagram" showValue />
          <ProgressBar value={30} tone="blue"      label="TikTok"    showValue />
          <ProgressBar value={15} tone="red"       label="YouTube"   showValue />
        </div>
      ),
    },
  ],
  props: [
    {
      title: "ProgressBarProps",
      rows: [
        { name: "value",     type: "number",              required: true,  description: "Current value (0–max)." },
        { name: "max",       type: "number",              required: false, default: "100", description: "Maximum value. Default 100." },
        { name: "tone",      type: "keyof TONES",         required: false, default: '"blue"', description: "Fill color from the TONES system." },
        { name: "label",     type: "string",              required: false, description: "Text shown above the bar on the left." },
        { name: "showValue", type: "boolean",             required: false, default: "false", description: "Show percentage on the right side of the label row." },
        { name: "animated",  type: "boolean",             required: false, default: "false", description: "Pulse animation — use for in-progress states." },
        { name: "striped",   type: "boolean",             required: false, default: "false", description: "Diagonal stripe overlay on the fill." },
        { name: "rounded",   type: "boolean",             required: false, default: "true",  description: "Pill-shaped ends. Set false for square caps." },
      ],
    },
  ],
};

export default doc;
