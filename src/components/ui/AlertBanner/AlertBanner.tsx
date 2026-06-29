"use client";

import React from "react";
import {
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconAlertCircle,
  IconX,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertBannerProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  onDismiss?: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}

const CONFIG: Record<AlertVariant, { icon: React.ElementType; tone: keyof typeof TONES }> = {
  info:    { icon: IconInfoCircle,    tone: "blue" },
  success: { icon: IconCircleCheck,   tone: "green" },
  warning: { icon: IconAlertTriangle, tone: "orange" },
  error:   { icon: IconAlertCircle,   tone: "red" },
};

export default function AlertBanner({
  variant,
  title,
  message,
  onDismiss,
  action,
  className,
}: AlertBannerProps) {
  const { icon: Icon, tone: toneKey } = CONFIG[variant];
  const tone = TONES[toneKey];

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "12px 14px",
        borderRadius: "var(--sd-radius-md)",
        background: tone.tint,
        borderLeft: `4px solid ${tone.solid}`,
      }}
    >
      <Icon size={16} style={{ color: tone.text, flexShrink: 0, marginTop: 1 }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div style={{ fontSize: "var(--sd-text-sm)", fontWeight: 700, color: "var(--sd-font-primary)", marginBottom: 2 }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: "var(--sd-text-sm)", color: "var(--sd-font-secondary)", lineHeight: 1.5 }}>
          {message}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            style={{
              marginTop: 6,
              fontSize: "var(--sd-text-sm)",
              fontWeight: 600,
              color: tone.text,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {action.label}
          </button>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 2,
            color: "var(--sd-font-tertiary)",
            flexShrink: 0,
            lineHeight: 0,
          }}
        >
          <IconX size={14} />
        </button>
      )}
    </div>
  );
}
