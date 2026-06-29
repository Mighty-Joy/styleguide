"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { IconCircleCheck, IconAlertCircle, IconInfoCircle, IconX, IconAlertTriangle } from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import styles from "./Toast.module.css";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export type ToastKind = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  kind: ToastKind;
  title: string;
  description?: string;
  duration?: number;
}

/* ------------------------------------------------------------------ */
/* Internal constants                                                    */
/* ------------------------------------------------------------------ */

const KIND_META: Record<ToastKind, { icon: React.ElementType; tone: keyof typeof TONES; accent: string }> = {
  success: { icon: IconCircleCheck,   tone: "green",  accent: TONES.green.solid },
  error:   { icon: IconAlertCircle,   tone: "red",    accent: "#ef4444" },
  warning: { icon: IconAlertTriangle, tone: "orange", accent: TONES.orange.solid },
  info:    { icon: IconInfoCircle,    tone: "blue",   accent: TONES.blue.solid },
};

/* ------------------------------------------------------------------ */
/* Single toast                                                          */
/* ------------------------------------------------------------------ */

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  const meta = KIND_META[toast.kind];
  const Icon = meta.icon;
  const t = TONES[meta.tone];

  useEffect(() => {
    const ms = toast.duration ?? 4000;
    const timer = setTimeout(() => onDismiss(toast.id), ms);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div className={styles.toast} role="alert">
      {/* Left accent bar */}
      <div className={styles.accentBar} style={{ background: meta.accent }} />

      {/* Icon */}
      <div className={styles.icon} style={{ color: meta.accent }}>
        <Icon size={18} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.title}>{toast.title}</div>
        {toast.description && <div className={styles.description}>{toast.description}</div>}
      </div>

      {/* Dismiss */}
      <button type="button" className={styles.dismiss} onClick={() => onDismiss(toast.id)} aria-label="Dismiss">
        <IconX size={13} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Context + provider                                                    */
/* ------------------------------------------------------------------ */

interface ToastContextValue {
  toast: (item: Omit<ToastItem, "id">) => void;
  success: (title: string, description?: string) => void;
  error:   (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info:    (title: string, description?: string) => void;
}

const ToastCtx = createContext<ToastContextValue | null>(null);

let idCounter = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const add = useCallback((item: Omit<ToastItem, "id">) => {
    const id = String(++idCounter);
    setToasts(prev => [...prev, { ...item, id }]);
  }, []);

  const ctx: ToastContextValue = {
    toast: add,
    success: (title, description) => add({ kind: "success", title, description }),
    error:   (title, description) => add({ kind: "error",   title, description }),
    warning: (title, description) => add({ kind: "warning", title, description }),
    info:    (title, description) => add({ kind: "info",    title, description }),
  };

  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      {toasts.length > 0 && (
        <div className={styles.viewport}>
          {toasts.map(t => <ToastCard key={t.id} toast={t} onDismiss={dismiss} />)}
        </div>
      )}
    </ToastCtx.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
