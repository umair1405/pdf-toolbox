"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Dropzone } from "@/components/upload/Dropzone";

export default function MarketingPage() {
  const handleFileDrop = (file: File) => {
    console.log("File selected:", file.name);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-gray-50">
        <section className="text-center py-16">
          <div className="max-w-2xl mx-auto px-7">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              PDF to WORD Converter
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Convert your PDF to WORD documents with incredible accuracy.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Powered by <span className="text-red-600 font-semibold">Solid Documents</span>.
            </p>

            {/* Upload area */}
            <div className="bg-white rounded-lg shadow-sm p-12">
              <Dropzone onFile={handleFileDrop} />
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-7">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gray-900">2.1M+</div>
                <div className="text-sm text-gray-600 mt-1">Files Converted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">99.95%</div>
                <div className="text-sm text-gray-600 mt-1">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.2s</div>
                <div className="text-sm text-gray-600 mt-1">Avg. Conversion</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
