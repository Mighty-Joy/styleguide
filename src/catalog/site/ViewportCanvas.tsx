"use client";
import React from "react";

/**
 * Constrains demo content to 880px — the effective content width in the app
 * after the 240px left nav. Use inside demo.render() for any composite or
 * full-page surface that should preview at realistic desktop viewport width.
 *
 * width="full" stretches to the catalog column width (no inner max-width).
 * width="app"  (default) clamps at 880px, centering within the canvas.
 */
export function ViewportCanvas({
  children,
  width = "app",
  minHeight,
  background,
}: {
  children:    React.ReactNode;
  width?:      "app" | "full";
  minHeight?:  number;
  background?: string;
}) {
  return (
    <div
      style={{
        width:      "100%",
        display:    "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width:      "100%",
          maxWidth:   width === "app" ? 880 : "none",
          minHeight:  minHeight ?? "auto",
          background: background ?? "transparent",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default ViewportCanvas;
