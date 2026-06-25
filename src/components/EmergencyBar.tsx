"use client";

interface EmergencyBarProps {
  onSearchClick: () => void;
  onReportClick: () => void;
}

export function EmergencyBar({ onSearchClick, onReportClick }: EmergencyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 px-4 py-3 flex gap-3 safe-area-pb">
      <button
        onClick={onSearchClick}
        className="flex-1 bg-[#DC2626] text-white font-bold py-3.5 rounded-2xl text-sm active:scale-95 transition-transform"
      >
        🔍 Buscar familiar
      </button>
      <button
        onClick={onReportClick}
        className="flex-1 bg-[#1E3A5F] text-white font-bold py-3.5 rounded-2xl text-sm active:scale-95 transition-transform"
      >
        + Reportar
      </button>
    </div>
  );
}
