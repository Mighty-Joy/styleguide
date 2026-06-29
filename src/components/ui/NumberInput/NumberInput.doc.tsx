"use client";

import React from "react";
import { NumberInput } from "./NumberInput";
import type { ComponentDoc } from "@/catalog/types";

const doc: ComponentDoc = {
  slug: "number-input",
  title: "NumberInput",
  group: "Primitives",
  status: "stable",
  summary: "Numeric stepper with − / + buttons, prefix/suffix slots, min/max clamping, and three sizes.",
  description:
    "Use NumberInput for budget fields, quantity selectors, day counts, or any bounded numeric input. The − and + buttons respect `min`/`max` and are automatically disabled at the limits. Optional `prefix` (e.g. \"$\") and `suffix` (e.g. \"days\") render inside the control.",
  demos: [
    {
      title: "Default",
      render: () => <NumberInput defaultValue={1} />,
    },
    {
      title: "Budget",
      description: "Dollar prefix, $100 step.",
      render: () => (
        <NumberInput
          label="Campaign budget"
          prefix="$"
          defaultValue={2400}
          step={100}
          min={0}
          hint="Minimum $0"
        />
      ),
    },
    {
      title: "Days",
      description: "Suffix and bounded range.",
      render: () => (
        <NumberInput
          label="Usage rights duration"
          suffix=" days"
          defaultValue={30}
          min={1}
          max={365}
          hint="1–365 days"
        />
      ),
    },
    {
      title: "At minimum",
      description: "− button disabled when value reaches `min`.",
      render: () => (
        <NumberInput
          label="Creator slots"
          defaultValue={1}
          min={1}
          max={10}
          hint="1–10 creators"
        />
      ),
    },
    {
      title: "Disabled",
      render: () => (
        <NumberInput label="Locked value" defaultValue={12} disabled hint="This value is locked." />
      ),
    },
  ],
  props: [
    {
      title: "NumberInputProps",
      rows: [
        { name: "value",        type: "number",              description: "Controlled value." },
        { name: "defaultValue", type: "number",  default: "0", description: "Initial value for uncontrolled use." },
        { name: "onChange",     type: "(value: number) => void", description: "Called on every value change." },
        { name: "min",          type: "number",              description: "Minimum allowed value. − button disables at limit." },
        { name: "max",          type: "number",              description: "Maximum allowed value. + button disables at limit." },
        { name: "step",         type: "number",  default: "1", description: "Increment/decrement amount per button click." },
        { name: "prefix",       type: "string",              description: "Text shown inside the left edge (e.g. \"$\")." },
        { name: "suffix",       type: "string",              description: "Text shown inside the right edge (e.g. \" days\")." },
        { name: "size",         type: '"sm"|"md"|"lg"', default: '"md"', description: "Control height: 28 / 32 / 38 px." },
        { name: "disabled",     type: "boolean", default: "false", description: "Disables all interaction." },
        { name: "label",        type: "string",              description: "Field label." },
        { name: "hint",         type: "string",              description: "Helper text below the control." },
        { name: "error",        type: "string | boolean",    description: "Error state — true for red border, string to also show message." },
      ],
    },
  ],
};

export default doc;
