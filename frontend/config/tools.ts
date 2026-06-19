export interface Tool {
  badge: string;
  name: string;
  desc: string;
  gradient: string;
  operation: "convert" | "merge" | "split" | "compress" | "ocr";
  targetFormat: string;
}

export const tools: Tool[] = [
  { badge: "PDF→DOC", name: "PDF to Word", desc: "Editable .docx", gradient: "from-blue-500 to-accent", operation: "convert", targetFormat: "docx" },
  { badge: "PDF→PPT", name: "PDF to PowerPoint", desc: "Editable slides", gradient: "from-secondary to-primary", operation: "convert", targetFormat: "pptx" },
  { badge: "PDF→XLS", name: "PDF to Excel", desc: "Tables extracted", gradient: "from-green-500 to-accent", operation: "convert", targetFormat: "xlsx" },
  { badge: "PDF→IMG", name: "PDF to Image", desc: "PNG or JPG, any page", gradient: "from-accent to-purple-400", operation: "convert", targetFormat: "png" },
  { badge: "MERGE", name: "Merge PDFs", desc: "Combine in any order", gradient: "from-primary to-secondary", operation: "merge", targetFormat: "pdf" },
  { badge: "SPLIT", name: "Split PDF", desc: "By page or range", gradient: "from-secondary to-accent", operation: "split", targetFormat: "pdf" },
  { badge: "COMPRESS", name: "Compress PDF", desc: "Smaller, same quality", gradient: "from-slate-400 to-slate-600", operation: "compress", targetFormat: "pdf" },
  { badge: "OCR", name: "Scan to text", desc: "Searchable, 40+ languages", gradient: "from-accent to-primary", operation: "ocr", targetFormat: "pdf" },
];
