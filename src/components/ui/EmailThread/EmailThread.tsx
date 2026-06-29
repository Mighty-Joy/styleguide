"use client";

import React, { useState } from "react";
import { IconPlus, IconArrowLeft, IconX } from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";
import styles from "./EmailThread.module.css";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export interface ThreadParticipant {
  initials: string;
  tone: keyof typeof TONES;
}

export interface EmailMessageData {
  senderInitials: string;
  senderName: string;
  senderTone: keyof typeof TONES;
  date: string;
  to?: string;
  body: string;
}

export interface ThreadData {
  id: string;
  participants: ThreadParticipant[];
  participantLabel: string;
  count: number;
  subject: string;
  snippet: string;
  date: string;
  unread?: boolean;
  messages: EmailMessageData[];
}

/* ------------------------------------------------------------------ */
/* ThreadList                                                            */
/* ------------------------------------------------------------------ */

interface ThreadListProps {
  threads: ThreadData[];
  onSelect: (thread: ThreadData) => void;
  label?: string;
  count?: number;
}

export function ThreadList({ threads, onSelect, label = "Inbox", count }: ThreadListProps) {
  return (
    <div className={styles.inbox}>
      <div className={styles.inboxHead}>
        <span className={styles.inboxTitle}>{label}</span>
        <span className={styles.inboxCount}>{count ?? threads.length}</span>
        <span className={styles.spacer} />
        <button type="button" className={styles.iconBtn} aria-label="Compose">
          <IconPlus size={14} />
        </button>
      </div>
      {threads.map((t) => (
        <ThreadRow key={t.id} thread={t} onClick={() => onSelect(t)} />
      ))}
    </div>
  );
}

function ThreadRow({ thread: t, onClick }: { thread: ThreadData; onClick: () => void }) {
  return (
    <button type="button" className={styles.threadRow} onClick={onClick}>
      <div className={styles.avStack}>
        {t.participants.slice(0, 3).map((p, i) => (
          <span
            key={i}
            className={styles.av}
            style={{ background: TONES[p.tone].solid, zIndex: t.participants.length - i }}
          >
            {p.initials}
          </span>
        ))}
      </div>
      <span className={styles.names}>{t.participantLabel}</span>
      <span className={styles.count}>{t.count}</span>
      <span className={styles.subject}>{t.subject}</span>
      <span className={styles.snippet}>{t.snippet}</span>
      <span className={styles.date}>{t.date}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* ThreadView                                                            */
/* ------------------------------------------------------------------ */

interface ThreadViewProps {
  thread: ThreadData;
  onBack?: () => void;
  onClose?: () => void;
  /** Last message expanded by default; click to expand/collapse others */
  defaultExpanded?: number;
}

export function ThreadView({ thread, onBack, onClose, defaultExpanded }: ThreadViewProps) {
  const last = thread.messages.length - 1;
  const [expanded, setExpanded] = useState<Set<number>>(
    new Set([defaultExpanded ?? last])
  );

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  const subjectInitial = thread.subject.replace(/^Re:\s*/i, "")[0]?.toUpperCase() ?? "M";

  return (
    <div className={styles.threadView}>
      <div className={styles.tvHead}>
        {onBack && (
          <button type="button" className={styles.iconBtn} onClick={onBack} aria-label="Back">
            <IconArrowLeft size={14} />
          </button>
        )}
        <span className={styles.tvSubjectChip}>
          <span className={styles.tvSubjectInitial}>{subjectInitial}</span>
          <span className={styles.tvSubjectText}>{thread.subject}</span>
        </span>
        <span className={styles.tvCreated}>Created {thread.date}</span>
        {onClose && (
          <button type="button" className={styles.iconBtn} onClick={onClose} aria-label="Close">
            <IconX size={14} />
          </button>
        )}
      </div>

      <div>
        {thread.messages.map((msg, i) => {
          const isExpanded = expanded.has(i);
          const t = TONES[msg.senderTone];
          return (
            <div
              key={i}
              className={styles.tvMessage}
              onClick={() => toggle(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggle(i)}
            >
              <div className={styles.tvMsgHead}>
                <span className={styles.tvAv} style={{ background: t.solid }}>
                  {msg.senderInitials}
                </span>
                <span className={styles.tvSender}>{msg.senderName}</span>
                <span className={styles.tvDate}>{msg.date}</span>
              </div>

              {isExpanded ? (
                <div className={styles.tvBody}>
                  {msg.to && <div className={styles.tvTo}>to: {msg.to}</div>}
                  <p className={styles.tvText}>{msg.body}</p>
                </div>
              ) : (
                <div className={styles.tvPreview}>{msg.body.split("\n")[0]}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
