import { api } from "@/services/api";
import type { ConversionJob, CreateConversionPayload, UploadedFile } from "@/types/conversion";

export const conversionService = {
  uploadFile: (file: File, onProgress?: (pct: number) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    return api
      .post<UploadedFile>("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100));
        },
      })
      .then((r) => r.data);
  },

  createConversion: (payload: CreateConversionPayload) =>
    api.post<ConversionJob>("/convert", payload).then((r) => r.data),

  getJob: (jobId: string) => api.get<ConversionJob>(`/convert/${jobId}`).then((r) => r.data),

  downloadUrl: (jobId: string) =>
    `${api.defaults.baseURL}/files/${jobId}/download`,

  // Polls until the job is done or failed, calling onTick on every status change.
  pollJob: (jobId: string, onTick: (job: ConversionJob) => void, intervalMs = 1500) => {
    const timer = setInterval(async () => {
      const job = await conversionService.getJob(jobId);
      onTick(job);
      if (job.status === "done" || job.status === "failed") clearInterval(timer);
    }, intervalMs);
    return () => clearInterval(timer);
  },
};
