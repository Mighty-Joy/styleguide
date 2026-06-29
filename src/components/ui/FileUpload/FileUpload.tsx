"use client";

import React, { useRef, useState } from "react";
import {
  IconUpload,
  IconX,
  IconPhoto,
  IconVideo,
  IconFile,
  IconCircleCheck,
} from "@tabler/icons-react";
import { TONES } from "@/tokens/tones";

/* ------------------------------------------------------------------ */
/* Types                                                                 */
/* ------------------------------------------------------------------ */

export type AcceptType = "image" | "video" | "any";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  progress: number;       // 0–100
  status: "uploading" | "done" | "error";
  error?: string;
}

export interface FileUploadProps {
  files: UploadedFile[];
  onFilesAdd: (files: File[]) => void;
  onFileRemove: (id: string) => void;
  accept?: AcceptType;
  maxSizeMb?: number;
  multiple?: boolean;
  label?: string;
  hint?: string;
  disabled?: boolean;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                               */
/* ------------------------------------------------------------------ */

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const ACCEPT_MAP: Record<AcceptType, string> = {
  image: "image/*",
  video: "video/*",
  any:   "*/*",
};

const ACCEPT_LABEL: Record<AcceptType, string> = {
  image: "Images (PNG, JPG, GIF, WebP)",
  video: "Videos (MP4, MOV, WebM)",
  any:   "Any file type",
};

function FileIcon({ type }: { type: string }) {
  if (type.startsWith("image/")) return <IconPhoto size={16} style={{ color: TONES.blue.solid }} />;
  if (type.startsWith("video/")) return <IconVideo size={16} style={{ color: TONES.purple.solid }} />;
  return <IconFile size={16} style={{ color: "var(--sd-font-tertiary)" }} />;
}

/* ------------------------------------------------------------------ */
/* Component                                                             */
/* ------------------------------------------------------------------ */

export default function FileUpload({
  files,
  onFilesAdd,
  onFileRemove,
  accept = "any",
  maxSizeMb,
  multiple = false,
  label,
  hint,
  disabled = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming || disabled) return;
    const arr = Array.from(incoming);
    onFilesAdd(arr);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label && <div style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-secondary)" }}>{label}</div>}

      {/* Drop zone */}
      <div
        role="button" tabIndex={0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={e => { if (!disabled && (e.key === "Enter" || e.key === " ")) inputRef.current?.click(); }}
        onDragOver={e => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          border: `2px dashed ${dragging ? "var(--sd-accent)" : "var(--sd-border-medium)"}`,
          borderRadius: "var(--sd-radius-md)",
          padding: "24px 16px",
          textAlign: "center",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.5 : 1,
          background: dragging ? "var(--sd-accent-tint-2, #dbeafe)" : "var(--sd-bg-secondary)",
          transition: "border-color 0.15s, background 0.15s",
        }}>
        <input
          ref={inputRef} type="file" style={{ display: "none" }}
          accept={ACCEPT_MAP[accept]} multiple={multiple} disabled={disabled}
          onChange={e => handleFiles(e.target.files)}
        />
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: dragging ? TONES.blue.tint : "var(--sd-bg-primary)",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", transition: "background 0.15s" }}>
          <IconUpload size={18} style={{ color: dragging ? TONES.blue.solid : "var(--sd-font-tertiary)" }} />
        </div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--sd-font-primary)", marginBottom: 4 }}>
          {dragging ? "Drop to upload" : "Click to browse or drag & drop"}
        </div>
        <div style={{ fontSize: 12, color: "var(--sd-font-tertiary)" }}>
          {ACCEPT_LABEL[accept]}{maxSizeMb ? ` · Max ${maxSizeMb} MB` : ""}
        </div>
      </div>

      {hint && <div style={{ fontSize: 11, color: "var(--sd-font-tertiary)" }}>{hint}</div>}

      {/* File list */}
      {files.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
          {files.map(f => (
            <div key={f.id}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px",
                border: "1px solid var(--sd-border-light)", borderRadius: "var(--sd-radius-sm)",
                background: "var(--sd-bg-primary)" }}>
              {/* Thumbnail or icon */}
              <div style={{ width: 36, height: 36, borderRadius: "var(--sd-radius-sm)", overflow: "hidden",
                background: "var(--sd-bg-secondary)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {f.previewUrl && f.type.startsWith("image/")
                  ? <img src={f.previewUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <FileIcon type={f.type} />
                }
              </div>

              {/* Name + progress */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sd-font-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {f.name}
                  </span>
                  <span style={{ fontSize: 11, color: "var(--sd-font-tertiary)", flexShrink: 0, marginLeft: 8 }}>
                    {formatSize(f.size)}
                  </span>
                </div>

                {f.status === "uploading" && (
                  <div style={{ height: 3, background: "var(--sd-border-light)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${f.progress}%`, background: "var(--sd-accent)", borderRadius: 2, transition: "width 0.3s" }} />
                  </div>
                )}

                {f.status === "error" && f.error && (
                  <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 500 }}>{f.error}</div>
                )}

                {f.status === "done" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: TONES.green.text }}>
                    <IconCircleCheck size={11} />Uploaded
                  </div>
                )}
              </div>

              {/* Remove */}
              <button type="button" onClick={() => onFileRemove(f.id)}
                style={{ width: 24, height: 24, border: "none", background: "transparent", cursor: "pointer",
                  borderRadius: "var(--sd-radius-sm)", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--sd-font-tertiary)", flexShrink: 0 }}>
                <IconX size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
