"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "../registry";
import { isPlanned } from "../types";
import s from "./DocSite.module.css";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={s.sidebar}>
      <Link href="/catalog" className={s.brand}>
        <span className={s.brandMark}>S</span>
        <span className={s.brandText}>
          <span className={s.brandTitle}>Superdeal</span>
          <span className={s.brandSub}>Design System</span>
        </span>
      </Link>

      <div className={s.navGroup}>
        <div className={s.navGroupLabel}>Getting Started</div>
        <Link
          href="/catalog"
          className={`${s.navLink}${pathname === "/catalog" ? ` ${s.navLinkActive}` : ""}`}
        >
          <span>Overview</span>
        </Link>
        <Link
          href="/foundations"
          className={`${s.navLink}${pathname === "/foundations" ? ` ${s.navLinkActive}` : ""}`}
          title="The original all-in-one showcase — being carved into dedicated pages"
        >
          <span>Full Showcase</span>
        </Link>
      </div>

      {NAV.map((group) => (
        <div key={group.group} className={s.navGroup}>
          <div className={s.navGroupLabel}>{group.group}</div>
          {group.entries.map((entry) => {
            const href = `/catalog/${entry.slug}`;
            const active = pathname === href;
            const isStub = isPlanned(entry);
            return (
              <Link
                key={entry.slug}
                href={href}
                className={`${s.navLink}${active ? ` ${s.navLinkActive}` : ""}${
                  isStub ? ` ${s.navLinkPlanned}` : ""
                }`}
                title={entry.summary}
              >
                <span>{entry.title}</span>
                {isStub && <span style={{ fontSize: 11 }}>soon</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

export default Sidebar;
