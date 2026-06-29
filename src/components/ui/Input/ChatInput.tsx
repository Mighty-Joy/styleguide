"use client";

import React, { useState, useRef, useEffect } from "react";
import { IconArrowUp, IconPaperclip } from "@tabler/icons-react";
import styles from "./ChatInput.module.css";

export interface ChatInputProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * ReplyBar — the compose/reply input at the bottom of a message thread.
 * Auto-grows with content; Enter sends, Shift+Enter newlines.
 */
export function ChatInput({
  placeholder = "Reply…",
  onSend,
  disabled,
  className,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const send = () => {
    const msg = value.trim();
    if (!msg) return;
    onSend?.(msg);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  const active = value.trim().length > 0;

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <textarea
        ref={ref}
        className={styles.textarea}
        value={value}
        placeholder={placeholder}
        rows={1}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
      />
      <div className={styles.actions}>
        <button type="button" className={styles.attachBtn} aria-label="Attach file">
          <IconPaperclip size={16} />
        </button>
        <span className={styles.spacer} />
        <button
          type="button"
          className={`${styles.sendBtn} ${active ? styles.sendActive : ""}`}
          onClick={send}
          disabled={!active || disabled}
          aria-label="Send"
        >
          <IconArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
