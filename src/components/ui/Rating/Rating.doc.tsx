"use client";

import React, { useState } from "react";
import { Rating } from "./Rating";
import type { ComponentDoc } from "@/catalog/types";

function InteractiveDemo() {
  const [value, setValue] = useState(3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <Rating value={value} onChange={setValue} showValue />
      <span style={{ fontSize: "var(--sd-text-xs)", color: "var(--sd-font-tertiary)" }}>
        Selected: {value} star{value !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "rating",
  title: "Rating",
  group: "Primitives",
  status: "stable",
  summary: "Star rating display and interactive picker. Supports half-star display, value + count labels, and three sizes.",
  demos: [
    {
      title: "Display with value and count",
      render: () => <Rating value={4.8} showValue count={124} />,
    },
    {
      title: "Interactive",
      description: "Pass `onChange` to enable click and hover interaction.",
      render: () => <InteractiveDemo />,
    },
    {
      title: "Sizes",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Rating value={4} showValue />
          <Rating value={4} showValue />
          <Rating value={4} showValue />
        </div>
      ),
    },
    {
      title: "All values",
      render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[1, 2, 3, 4, 5].map(v => (
            <Rating key={v} value={v} showValue />
          ))}
        </div>
      ),
    },
    {
      title: "Disabled",
      render: () => <Rating value={3.5} showValue disabled />,
    },
  ],
  props: [
    {
      title: "RatingProps",
      rows: [
        { name: "value",      type: "number",              default: "0",     description: "Current rating value (0–max). Fractional values round to nearest integer for display." },
        { name: "max",        type: "number",              default: "5",     description: "Maximum number of stars." },
        { name: "onChange",   type: "(value: number) => void", description: "Makes the component interactive — enables hover and click." },
        { name: "size",       type: '"sm"|"md"|"lg"',      default: '"md"',  description: "Icon size: 12 / 16 / 20px." },
        { name: "showValue",  type: "boolean",             default: "false", description: "Show the numeric value (e.g. '4.8') after the stars." },
        { name: "count",      type: "number",                               description: "Show '(N reviews)' after the numeric value." },
        { name: "disabled",   type: "boolean",             default: "false", description: "Dims the stars and disables interaction." },
        { name: "label",      type: "string",                               description: "Optional label above the stars." },
      ],
    },
  ],
};

export default doc;
