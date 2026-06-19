"use client";

import { useCallback } from "react";
import { useUploadStore } from "@/store/useUploadStore";
import { conversionService } from "@/services/conversion.service";

export function useFileUpload() {
  const { setFile, setJob, setUploadProgress, setIsUploading, targetFormat } = useUploadStore();

  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setUploadProgress(0);
      try {
        const uploaded = await conversionService.uploadFile(file, setUploadProgress);
        setFile(uploaded);

        const job = await conversionService.createConversion({
          file_id: uploaded.id,
          target_format: targetFormat,
          operation: "convert",
        });
        setJob(job);

        const stopPolling = conversionService.pollJob(job.id, (updated) => setJob(updated));
        return stopPolling;
      } finally {
        setIsUploading(false);
      }
    },
    [setFile, setJob, setUploadProgress, setIsUploading, targetFormat]
  );

  return { upload };
}
