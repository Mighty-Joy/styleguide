"use client";

import React, { useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import styles from "./Modal.module.css";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  hideClose?: boolean;
}

/* ------------------------------------------------------------------ */
/* Sub-components exported for composition                               */
/* ------------------------------------------------------------------ */

export function ModalHeader({ children, onClose }: { children?: React.ReactNode; onClose?: () => void }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>{children}</div>
      {onClose && (
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}

export function ModalBody({ children, scrollable = true }: { children: React.ReactNode; scrollable?: boolean }) {
  return <div className={`${styles.body} ${scrollable ? styles.bodyScroll : ""}`}>{children}</div>;
}

export function ModalFooter({ children }: { children: React.ReactNode }) {
  return <div className={styles.footer}>{children}</div>;
}

/* ------------------------------------------------------------------ */
/* Widths                                                                */
/* ------------------------------------------------------------------ */

const WIDTH: Record<ModalSize, number> = { sm: 380, md: 500, lg: 640, xl: 800 };

/* ------------------------------------------------------------------ */
/* Modal                                                                 */
/* ------------------------------------------------------------------ */

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdrop = true,
  hideClose = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent scroll on body
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onClick={closeOnBackdrop ? onClose : undefined} role="dialog" aria-modal="true">
      <div
        ref={dialogRef}
        className={styles.panel}
        style={{ width: WIDTH[size], maxWidth: "calc(100vw - 32px)" }}
        onClick={e => e.stopPropagation()}
      >
        {title !== undefined && (
          <ModalHeader onClose={hideClose ? undefined : onClose}>{title}</ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </div>
    </div>
  );
}
