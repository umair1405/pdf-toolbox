import { create } from "zustand";
import type { ConversionJob, UploadedFile } from "@/types/conversion";

interface UploadState {
  file: UploadedFile | null;
  job: ConversionJob | null;
  uploadProgress: number;
  isUploading: boolean;
  targetFormat: string;
  setFile: (file: UploadedFile | null) => void;
  setJob: (job: ConversionJob | null) => void;
  setUploadProgress: (pct: number) => void;
  setIsUploading: (v: boolean) => void;
  setTargetFormat: (format: string) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  file: null,
  job: null,
  uploadProgress: 0,
  isUploading: false,
  targetFormat: "docx",
  setFile: (file) => set({ file }),
  setJob: (job) => set({ job }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setTargetFormat: (targetFormat) => set({ targetFormat }),
  reset: () => set({ file: null, job: null, uploadProgress: 0, isUploading: false }),
}));
