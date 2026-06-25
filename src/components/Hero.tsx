import type { PersonStats } from "@/types/person";
import { SearchCard } from "./SearchCard";
import { HeroBackground } from "./HeroBackground";

interface HeroProps {
  stats: PersonStats;
  onSearch: Parameters<typeof SearchCard>[0]["onSearch"];
  isSearching: boolean;
}

export function Hero({ stats, onSearch, isSearching }: HeroProps) {
  return (
    <section className="hero bg-[#1E3A5F] text-white min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 text-center relative overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="animate-pulse bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-flex items-center gap-2">
          <span className="w-2 h-2 bg-white rounded-full" />
          EMERGENCIA · SISMO 24 DE JUNIO
        </div>

        <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4 max-w-3xl mx-auto">
          ¿Buscas a un <span className="text-[#F5A623]">familiar</span>?
          <br />
          Podemos ayudarte.
        </h1>

        <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto mb-10">
          Miles de familias buscan a sus seres queridos. Sube una foto, ingresa el nombre y lugar —
          nosotros hacemos el resto.
        </p>

        <div id="buscar" className="w-full">
          <SearchCard onSearch={onSearch} isSearching={isSearching} />
        </div>

        <div className="flex gap-6 mt-10 flex-wrap justify-center">
          <div className="text-center">
            <p className="text-3xl font-black text-[#F5A623]">{stats.totalReportados}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Reportados</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-red-400">{stats.sinContacto}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Sin contacto</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-black text-green-400">{stats.localizados}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wide">Localizados ✓</p>
          </div>
        </div>
      </div>
    </section>
  );
}
