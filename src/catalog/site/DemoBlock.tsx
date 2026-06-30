import React from "react";
import type { Demo } from "../types";
import s from "./DocSite.module.css";

/**
 * Renders one live example inside a bordered "canvas". `block` switches the
 * canvas from a centered flex row (good for chips/badges) to a full-width block
 * (good for lists/tables/panels); `plain` drops the dotted background.
 * `maxWidth` (from the Demo object) constrains the inner content width — use 880
 * for full-page surfaces (app content width after the 240px left nav).
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
  const inner = demo.maxWidth ? (
    <div style={{ width: "100%", maxWidth: demo.maxWidth, margin: "0 auto" }}>
      {demo.render()}
    </div>
  ) : (
    demo.render()
  );

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
        {inner}
      </div>
    </section>
  );
}

export default DemoBlock;
