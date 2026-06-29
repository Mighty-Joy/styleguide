"use client";

import React, { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import styles from "./FieldGroup.module.css";

export interface FieldGroupProps {
  /** Section label, e.g. "Business" / "Contact". */
  label: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * A collapsible labeled section of record fields — the "Business" / "Contact"
 * groups in the right panel. Header toggles the body; rows are FieldRows.
 */
export const FieldGroup: React.FC<FieldGroupProps> = ({
  label,
  defaultOpen = true,
  children,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.group}>
      <div
        className={styles.header}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
      >
        <span className={styles.label}>{label}</span>
        <span className={styles.chevron}>
          {open ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
        </span>
      </div>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  );
};

export default FieldGroup;
