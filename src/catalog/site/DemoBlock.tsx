import React from "react";
import type { Demo } from "../types";
import s from "./DocSite.module.css";

/**
 * Renders one live example inside a bordered "canvas". `block` switches the
 * canvas from a centered flex row (good for chips/badges) to a full-width block
 * (good for lists/tables/panels); `plain` drops the dotted background.
 */
export function DemoBlock({
  demo,
  block,
  plain,
}: {
  demo: Demo;
  block?: boolean;
  plain?: boolean;
}) {
  return (
    <section className={s.demo}>
      <div className={s.demoHead}>
        <h3 className={s.demoTitle}>{demo.title}</h3>
        {demo.description && <p className={s.demoDesc}>{demo.description}</p>}
      </div>
      <div
        className={`${s.canvas}${block ? ` ${s.canvasBlock}` : ""}${
          plain ? ` ${s.canvasPlain}` : ""
        }`}
      >
        {demo.render()}
      </div>
    </section>
  );
}

export default DemoBlock;
