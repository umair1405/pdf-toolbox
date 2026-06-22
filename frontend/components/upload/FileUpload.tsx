"use client";

import { useState } from "react";

export default function FileUpload({
  endpoint,
}: {
  endpoint: string;
}) {
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;

    const form = new FormData();

    form.append("file", file);

    const res = await fetch(
      `http://localhost:8000${endpoint}`,
      {
        method: "POST",
        body: form,
      }
    );

    const blob = await res.blob();

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "converted.docx";

    a.click();
  }

  return (
    <div className="p-10">

      <input
        type="file"
        onChange={(e)=>
          setFile(
            e.target.files?.[0] || null
          )
        }
      />

      <button
        onClick={handleUpload}
        className="bg-red-600 text-white px-6 py-2 mt-4"
      >
        Convert
      </button>

    </div>
  );
}