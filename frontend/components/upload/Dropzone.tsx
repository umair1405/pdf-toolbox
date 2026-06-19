"use client";

import { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/utils/cn";

interface DropzoneProps {
  onFile: (file: File) => void;
  maxSizeLabel?: string;
}

export function Dropzone({ onFile, maxSizeLabel = "Max 100MB on the free plan" }: DropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "border-[1.5px] border-dashed rounded-[18px] px-6 py-11 flex flex-col items-center gap-3.5 text-center cursor-pointer transition-colors",
        dragging ? "border-accent bg-accent/[0.08]" : "border-white/[0.18]"
      )}
    >
      <UploadCloud size={38} className="text-white" />
      <p className="text-sm text-white/64">Drag a PDF here, or click to browse</p>
      <span className="text-xs text-white/38">{maxSizeLabel}</span>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
    </div>
  );
}
