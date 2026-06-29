import type React from "react";

/** Maturity of a component in the system. */
export type DocStatus = "stable" | "wip" | "planned";

/** One row in a props reference table. */
export interface PropRow {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

/** A named props table (a component may document more than one interface). */
export interface PropsTableDef {
  title?: string;
  rows: PropRow[];
}

/** A single live example shown in a bordered canvas. */
export interface Demo {
  title: string;
  description?: string;
  /** Render the live example. */
  render: () => React.ReactNode;
  /** Full-width block canvas (lists/tables/panels) instead of centered flex row. */
  block?: boolean;
  /** Drop the dotted canvas background. */
  plain?: boolean;
}

/** Everything the catalog needs to render one component's documentation page. */
export interface ComponentDoc {
  /** URL slug under /catalog/<slug>. */
  slug: string;
  title: string;
  /** Nav group label, e.g. "Core Components". */
  group: string;
  status?: DocStatus;
  /** One-line summary (nav tooltip + page subtitle). */
  summary: string;
  /** Longer intro paragraph(s). */
  description?: React.ReactNode;
  demos: Demo[];
  props?: PropsTableDef[];
  /** The apps/web path this mirrors, shown as provenance. */
  source?: string;
}

/** A planned-but-not-built nav entry (renders a "coming soon" stub page). */
export interface PlannedDoc {
  slug: string;
  title: string;
  group: string;
  status: "planned";
  summary: string;
}

export type NavEntry = ComponentDoc | PlannedDoc;

export function isPlanned(e: NavEntry): e is PlannedDoc {
  return (e as PlannedDoc).status === "planned" && !("demos" in e);
}
