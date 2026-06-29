import React from "react";
import type { DocStatus } from "../types";
import s from "./DocSite.module.css";

const LABEL: Record<DocStatus, string> = {
  stable: "Stable",
  wip: "WIP",
  planned: "Planned",
};
const CLASS: Record<DocStatus, string> = {
  stable: s.badgeStable,
  wip: s.badgeWip,
  planned: s.badgePlanned,
};

export function StatusBadge({ status }: { status: DocStatus }) {
  return (
    <span className={`${s.badge} ${CLASS[status]}`}>
      <span className={s.badgeDot}>●</span>
      {LABEL[status]}
    </span>
  );
}

export default StatusBadge;
