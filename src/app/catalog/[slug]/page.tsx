"use client";

import React, { use } from "react";
import Link from "next/link";
import { getEntry } from "@/catalog/registry";
import { isPlanned } from "@/catalog/types";
import DemoBlock from "@/catalog/site/DemoBlock";
import PropsTable from "@/catalog/site/PropsTable";
import StatusBadge from "@/catalog/site/StatusBadge";
import s from "@/catalog/site/DocSite.module.css";

export default function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const entry = getEntry(slug);

  if (!entry) {
    return (
      <div>
        <h1 className={s.pageTitle}>Not found</h1>
        <p className={s.pageSummary}>
          No component for “{slug}”. <Link href="/catalog">Back to catalog</Link>.
        </p>
      </div>
    );
  }

  if (isPlanned(entry)) {
    return (
      <div>
        <div className={s.metaRow}>
          <StatusBadge status="planned" />
        </div>
        <h1 className={s.pageTitle}>{entry.title}</h1>
        <p className={s.pageSummary}>{entry.summary}</p>
        <div className={s.comingSoon}>
          This component is on the roadmap and hasn&apos;t been built in the
          catalog yet.
        </div>
      </div>
    );
  }

  return (
    <article>
      <div className={s.metaRow}>
        {entry.status && <StatusBadge status={entry.status} />}
        {entry.source && <span className={s.source}>{entry.source}</span>}
      </div>
      <h1 className={s.pageTitle}>{entry.title}</h1>
      <p className={s.pageSummary}>{entry.summary}</p>
      {entry.description && (
        <p className={s.pageDescription}>{entry.description}</p>
      )}

      <h2 className={s.sectionTitle}>Examples</h2>
      {entry.demos.map((demo) => (
        <DemoBlock
          key={demo.title}
          demo={demo}
          block={demo.block}
          plain={demo.plain}
        />
      ))}

      {entry.props && entry.props.length > 0 && (
        <>
          <h2 className={s.sectionTitle}>Props</h2>
          {entry.props.map((table, i) => (
            <PropsTable key={table.title ?? i} table={table} />
          ))}
        </>
      )}
    </article>
  );
}
