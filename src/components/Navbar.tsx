"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  onReportClick: () => void;
}

export function Navbar({ onReportClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSearch = () => {
    document.getElementById("buscar")?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#1E3A5F] text-lg">
          <span className="text-2xl" aria-hidden="true">
            🇻🇪
          </span>
          <span className="hidden sm:inline">Desaparecidos Venezuela</span>
          <span className="sm:hidden">Desaparecidos VE</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={scrollToSearch}
            className="text-sm font-semibold text-gray-600 hover:text-[#1E3A5F] transition-colors"
          >
            Buscar
          </button>
          <button
            onClick={onReportClick}
            className="bg-[#DC2626] hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors shadow-md shadow-red-200"
          >
            + Reportar persona
          </button>
        </div>

        <button
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
          <button
            onClick={scrollToSearch}
            className="text-left py-2 font-semibold text-gray-700"
          >
            🔍 Buscar familiar
          </button>
          <button
            onClick={() => {
              onReportClick();
              setMenuOpen(false);
            }}
            className="bg-[#DC2626] text-white font-bold py-3 rounded-2xl text-sm"
          >
            + Reportar persona
          </button>
        </div>
      )}
    </nav>
  );
}
