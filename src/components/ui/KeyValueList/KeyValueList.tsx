"use client";

import React, { useState } from "react";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import styles from "./KeyValueList.module.css";

export interface KeyValueItem {
  label: string;
  value: React.ReactNode;
  icon?: React.ElementType;
  copyable?: boolean;
  href?: string;
}

export interface KeyValueListProps {
  items: KeyValueItem[];
  layout?: "inline" | "stacked" | "grid";
  labelWidth?: number;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={styles.copyBtn}
      onClick={() => {
        navigator.clipboard.writeText(text).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      aria-label="Copy"
    >
      {copied ? <IconCheck size={11} /> : <IconCopy size={11} />}
    </button>
  );
}

function Item({ item, layout, labelWidth }: {
  item: KeyValueItem;
  layout: "inline" | "stacked" | "grid";
  labelWidth: number;
}) {
  const Icon = item.icon;
  const labelEl = (
    <span className={styles.label}>
      {Icon && <Icon size={13} className={styles.icon} />}
      {item.label}
    </span>
  );

  const valueEl = (
    <span className={styles.value}>
      {item.href
        ? <a href={item.href} className={styles.link} target="_blank" rel="noopener noreferrer">{item.value}</a>
        : item.value
      }
      {item.copyable && typeof item.value === "string" && (
        <CopyButton text={item.value} />
      )}
    </span>
  );

  if (layout === "stacked") {
    return (
      <div className={styles.stackedItem}>
        {labelEl}
        {valueEl}
      </div>
    );
  }

  if (layout === "grid") {
    return (
      <>
        {labelEl}
        {valueEl}
      </>
    );
  }

  return (
    <div className={styles.inlineItem} style={{ gridTemplateColumns: `${labelWidth}px 1fr` }}>
      {labelEl}
      {valueEl}
    </div>
  );
}

export function KeyValueList({
  items,
  layout = "inline",
  labelWidth = 120,
}: KeyValueListProps) {
  if (layout === "grid") {
    return (
      <div className={styles.grid}>
        {items.map((item, i) => (
          <Item key={i} item={item} layout="grid" labelWidth={labelWidth} />
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.list} ${layout === "stacked" ? styles.stacked : ""}`}>
      {items.map((item, i) => (
        <Item key={i} item={item} layout={layout} labelWidth={labelWidth} />
      ))}
    </div>
  );
}

export default KeyValueList;
