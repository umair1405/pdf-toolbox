"use client";

import { useState } from "react";
import Link from "next/link";
import { tools } from "@/config/tools";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-gray-200 py-4">
      <div className="max-w-[1180px] mx-auto px-7 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <span className="text-red-600">PDF TOOLBOX</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <li>
            <a href="#" className="hover:text-gray-900">
              MERGE PDF
            </a>
          </li>
          <li>
              <Link
                href="/tools/pdf-to-word"
                className="hover:text-gray-900"
              >
                PDF TO WORD
              </Link>
            </li>
          <li>
            <a href="#" className="hover:text-gray-900">
              SPLIT PDF
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-gray-900">
              COMPRESS PDF
            </a>
          </li>

          <li>
            <button className="hover:text-gray-900 flex items-center gap-1">
              CONVERT PDF
              <span>▼</span>
            </button>
          </li>

          <li
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="text-red-600 font-semibold flex items-center gap-1">
              ALL PDF TOOLS
              <span>▼</span>
            </button>

            {toolsOpen && (
              <div
                className="
                  absolute
                  top-[45px]
                  right-0
                  bg-white
                  shadow-2xl
                  rounded-xl
                  w-[600px]
                  p-8
                  grid
                  grid-cols-2
                  gap-6
                  z-50
                "
              >
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={`/tools/${tool.operation}/${tool.targetFormat}`}
                    className="
                      border
                      rounded-lg
                      p-4
                      hover:bg-red-50
                    "
                  >
                    <div className="font-semibold">{tool.name}</div>

                    <div className="text-sm text-gray-500">
                      {tool.desc}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-700 font-medium hover:text-gray-900">
            Login
          </button>

          <button className="bg-red-600 text-white px-6 py-2 rounded font-medium hover:bg-red-700">
            Sign up
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="w-5 h-0.5 bg-gray-700" />
            <span className="w-5 h-0.5 bg-gray-700" />
            <span className="w-5 h-0.5 bg-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 px-7 py-4 flex flex-col gap-3">
          <a href="#" className="text-gray-700 font-medium">
            MERGE PDF
          </a>

          <a href="#" className="text-gray-700 font-medium">
            SPLIT PDF
          </a>

          <a href="#" className="text-gray-700 font-medium">
            COMPRESS PDF
          </a>

          <a href="#" className="text-gray-700 font-medium">
            CONVERT PDF
          </a>

          <a href="#" className="text-red-600 font-semibold">
            ALL PDF TOOLS
          </a>
        </div>
      )}
    </nav>
  );
}