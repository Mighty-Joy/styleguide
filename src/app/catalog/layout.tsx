import React from "react";
import s from "@/catalog/site/DocSite.module.css";

/**
 * Catalog pages render in a centered, readable doc column. The shell + left menu
 * now live in the root layout, so they persist across every route — this nested
 * layout only supplies the column. (Foundations has no nested layout, so it
 * renders full-bleed inside the root <main>.)
 */
export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={s.main}>
      <div className={s.content}>{children}</div>
    </div>
  );
}
