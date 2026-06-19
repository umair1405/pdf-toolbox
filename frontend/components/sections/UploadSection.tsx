"use client";

import { useState } from "react";
import { Dropzone } from "@/components/upload/Dropzone";
import { ProgressBar } from "@/components/upload/ProgressBar";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useUploadStore } from "@/store/useUploadStore";
import { cn } from "@/utils/cn";

const FORMATS = ["docx", "pptx", "xlsx", "png", "jpg", "txt"];

const recentMock = [
  { badge: "PDF→DOC", gradient: "from-blue-500 to-accent", name: "invoice-april.docx", size: "212 KB" },
  { badge: "PDF→IMG", gradient: "from-accent to-purple-400", name: "scan-page-1.png", size: "1.4 MB" },
  { badge: "MERGE", gradient: "from-primary to-secondary", name: "contract-final.pdf", size: "3.1 MB" },
];

export function UploadSection() {
  const { job, uploadProgress, isUploading, targetFormat, setTargetFormat } = useUploadStore();
  const { upload } = useFileUpload();
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleFile(file: File) {
    setFileName(file.name);
    await upload(file);
  }

  const statusText = !fileName
    ? "Click the dropzone to start a real conversion"
    : isUploading
    ? "Uploading…"
    : job?.status === "processing"
    ? "Converting…"
    : job?.status === "done"
    ? "Converted — ready to download"
    : job?.status === "failed"
    ? `Failed: ${job.error_message ?? "unknown error"}`
    : "Queued…";

  return (
    <section id="upload" className="py-[120px] relative z-10">
      <div className="max-w-[1180px] mx-auto px-7">
        <div className="max-w-[560px] mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-white/64 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-grad-warm" />
            Try it
          </span>
          <h2 className="font-display font-semibold text-[clamp(28px,4vw,44px)] leading-[1.12] tracking-[-0.01em] mt-3.5">
            See it work, right here.
          </h2>
          <p className="text-base text-white/64 leading-relaxed mt-3.5">
            This calls the real API — point <code className="text-white">NEXT_PUBLIC_API_URL</code> at your running backend.
          </p>
        </div>

        <div className="glass rounded-2xl grid md:grid-cols-2 overflow-hidden">
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/[0.09]">
            <Dropzone onFile={handleFile} />
            <div className="flex gap-2 flex-wrap mt-5.5">
              {FORMATS.map((f) => (
                <button
                  key={f}
                  onClick={() => setTargetFormat(f)}
                  className={cn(
                    "font-mono text-[11.5px] font-semibold px-3 py-1.5 rounded-lg border transition-all",
                    targetFormat === f
                      ? "bg-grad-warm text-white border-transparent"
                      : "text-white/64 border-white/[0.09]"
                  )}
                >
                  → {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.05em] text-white/38">
              {fileName ?? "no file selected"}
            </p>
            <ProgressBar
              percent={job?.status === "done" ? 100 : uploadProgress}
              statusText={statusText}
              done={job?.status === "done"}
            />
            {job?.status === "done" && (
          <div className="mt-6">
              <a
                href={`http://127.0.0.1:8000/api/v1/files/${job.id}/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  px-5
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-red-500
                  to-pink-500
                  text-white
                  font-semibold
                  hover:scale-[1.03]
                  transition
                "
              >
                ↓ Download Converted File
              </a>
            </div>
          )}

            <div className="mt-7.5">
              <p className="text-xs text-white/38 mb-3.5 font-mono uppercase tracking-[0.05em]">Recent</p>
              <div className="flex flex-col gap-2.5">
                {recentMock.map((r) => (
                  <div key={r.name} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.09]">
                    <span className={`font-mono text-[10px] font-semibold px-2.5 py-1.5 rounded-lg min-w-[38px] text-center text-white bg-gradient-to-br ${r.gradient}`}>
                      {r.badge}
                    </span>
                    <span className="text-[13.5px] flex-1">{r.name}</span>
                    <span className="text-xs text-white/38 font-mono">{r.size}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
