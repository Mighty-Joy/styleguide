"use client";

import React from "react";
import Link from "next/link";
import { NAV } from "@/catalog/registry";
import { isPlanned } from "@/catalog/types";
import StatusBadge from "@/catalog/site/StatusBadge";
import s from "@/catalog/site/DocSite.module.css";

export default function CatalogOverview() {
  return (
    <div>
      <p className={s.eyebrow}>Superdeal Design System</p>
      <h1 className={s.pageTitle}>Component Library</h1>
      <p className={s.pageSummary}>
        The living catalog of Superdeal&apos;s UI — Twenty-inspired surfaces on the
        brand green palette. Every component reads from one canonical token layer
        and mirrors a path in <code>apps/web</code>, so what you refine here ports
        straight into the product.
      </p>

      {NAV.map((group) => (
        <section key={group.group}>
          <h2 className={s.sectionTitle}>{group.group}</h2>
          <div className={s.cardGrid}>
            {group.entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/catalog/${entry.slug}`}
                className={s.card}
              >
                <div className={s.cardTitle}>
                  <span>{entry.title}</span>
                  {entry.status && <StatusBadge status={entry.status} />}
                </div>
                <p className={s.cardSummary}>{entry.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
