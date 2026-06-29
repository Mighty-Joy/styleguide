"use client";

import React, { useState } from "react";
import FileUpload, { UploadedFile } from "./FileUpload";
import type { ComponentDoc } from "@/catalog/types";

/* ---- Simulate upload progress ---- */
let idCounter = 0;

function useUploadSim() {
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "seed-1",
      name: "priya_reel_draft_v2.mp4",
      size: 18_400_000,
      type: "video/mp4",
      file: new File([], "priya_reel_draft_v2.mp4"),
      progress: 100,
      status: "done",
    },
  ]);

  const addFiles = (incoming: File[]) => {
    const newEntries: UploadedFile[] = incoming.map(f => ({
      id: String(++idCounter),
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
      progress: 0,
      status: "uploading" as const,
    }));
    setFiles(prev => [...prev, ...newEntries]);

    // Simulate progress for each new file
    newEntries.forEach(entry => {
      let progress = 0;
      const tick = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(tick);
          setFiles(prev => prev.map(f =>
            f.id === entry.id ? { ...f, progress: 100, status: "done" } : f
          ));
        } else {
          setFiles(prev => prev.map(f =>
            f.id === entry.id ? { ...f, progress } : f
          ));
        }
      }, 300);
    });
  };

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  return { files, addFiles, removeFile };
}

function ContentUploadDemo() {
  const { files, addFiles, removeFile } = useUploadSim();
  return (
    <div style={{ maxWidth: 420 }}>
      <FileUpload
        files={files}
        onFilesAdd={addFiles}
        onFileRemove={removeFile}
        accept="video"
        multiple
        label="Upload content"
        hint="Upload your draft video before submitting for brand review."
        maxSizeMb={500}
      />
    </div>
  );
}

function ImageUploadDemo() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const add = (incoming: File[]) => {
    setFiles(prev => [...prev, ...incoming.map(f => ({
      id: String(++idCounter),
      file: f,
      name: f.name,
      size: f.size,
      type: f.type,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
      progress: 100,
      status: "done" as const,
    }))]);
  };
  return (
    <div style={{ maxWidth: 360 }}>
      <FileUpload
        files={files}
        onFilesAdd={add}
        onFileRemove={id => setFiles(prev => prev.filter(f => f.id !== id))}
        accept="image"
        multiple
        label="Campaign cover images"
        hint="Recommended: 1200×630px, PNG or JPG"
      />
    </div>
  );
}

const doc: ComponentDoc = {
  slug: "file-upload",
  title: "FileUpload",
  group: "Inputs & Controls",
  status: "stable",
  summary: "Drag-and-drop upload zone with file list, thumbnails, simulated progress, and remove.",
  description:
    "FileUpload renders a drag-and-drop zone (click to open file browser, drag files to highlight and drop) and a file list below. Each list item shows: image thumbnail or file-type icon, file name + size, an uploading progress bar or green 'Uploaded' confirmation, and a × remove button. Accept type can be scoped to image, video, or any. The component is uncontrolled — the parent provides the `files` array and `onFilesAdd`/`onFileRemove` handlers to manage state and trigger real uploads. Used in: content submission modal (creator uploads draft video), campaign setup (cover image), and script submission.",
  demos: [
    {
      title: "Video content upload (with seeded file)",
      description: "A previously uploaded video shows as 'done'. Add more files via click or drag-and-drop to see simulated upload progress.",
      render: () => <ContentUploadDemo />,
    },
    {
      title: "Image upload",
      description: "Images show a thumbnail preview after selection.",
      render: () => <ImageUploadDemo />,
    },
  ],
  props: [
    {
      rows: [
        { name: "files",         type: "UploadedFile[]",             required: true,  description: "Controlled list of files. Parent owns this state." },
        { name: "onFilesAdd",    type: "(files: File[]) => void",    required: true,  description: "Called when the user selects or drops files. Parent initiates upload and appends to files array." },
        { name: "onFileRemove",  type: "(id: string) => void",       required: true,  description: "Called when the × button is clicked. Parent removes the item from the files array." },
        { name: "accept",        type: '"image"|"video"|"any"',      required: false, description: 'File type filter. Defaults to "any".' },
        { name: "maxSizeMb",     type: "number",                     required: false, description: "Displayed in the drop zone hint text. Enforcement is left to the parent." },
        { name: "multiple",      type: "boolean",                    required: false, description: "Allows selecting multiple files at once." },
        { name: "label",         type: "string",                     required: false, description: "Label above the drop zone." },
        { name: "hint",          type: "string",                     required: false, description: "Secondary text below the drop zone." },
        { name: "disabled",      type: "boolean",                    required: false, description: "Dims the zone and prevents all interaction." },
      ],
    },
  ],
};

export default doc;
