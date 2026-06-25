"use client";

import { useCallback, useState, useTransition } from "react";
import type { Person, PersonSearchQuery, PersonStats } from "@/types/person";
import { searchPersonsAction } from "@/app/actions";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { PersonGrid } from "./PersonGrid";
import { EmergencyPhones } from "./EmergencyPhones";
import { ReportsMapSection } from "./ReportsMapSection";
import { EmergencyBar } from "./EmergencyBar";
import { ReportModal } from "./ReportModal";
import { toast } from "sonner";

interface HomePageProps {
  initialPersons: Person[];
  initialStats: PersonStats;
}

export function HomePage({ initialPersons, initialStats }: HomePageProps) {
  const [persons, setPersons] = useState<Person[]>(initialPersons);
  const [reportOpen, setReportOpen] = useState(false);
  const [isSearching, startSearchTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(
    (query: PersonSearchQuery) => {
      startSearchTransition(async () => {
        try {
          const results = await searchPersonsAction(query);
          setPersons(results);
          setHasSearched(true);
          if (results.length === 0) {
            toast.info("No se encontraron coincidencias. Intenta con otros datos.");
          } else {
            toast.success(`${results.length} persona(s) encontrada(s)`);
          }
        } catch {
          toast.error("Error al buscar. Intenta de nuevo.");
        }
      });
    },
    []
  );

  const handleReportSuccess = useCallback(() => {
    window.location.reload();
  }, []);

  const scrollToSearch = () => {
    document.getElementById("buscar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar onReportClick={() => setReportOpen(true)} />

      <Hero stats={initialStats} onSearch={handleSearch} isSearching={isSearching} />

      <div className="pt-8">
        <EmergencyPhones />
        <ReportsMapSection persons={persons} />
      </div>

      <PersonGrid persons={persons} isLoading={isSearching && hasSearched} />

      <footer className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-400 border-t border-gray-200 mb-20 md:mb-0">
        <p className="font-semibold text-[#1E3A5F] mb-1">🇻🇪 Desaparecidos Terremoto Venezuela</p>
        <p>Herramienta ciudadana de emergencia · Sismo del 24 de junio de 2025</p>
        <p className="mt-2">Gratuito · Sin registro · Hecho por y para venezolanos</p>
      </footer>

      <EmergencyBar
        onSearchClick={scrollToSearch}
        onReportClick={() => setReportOpen(true)}
      />

      <ReportModal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        onSuccess={handleReportSuccess}
      />
    </div>
  );
}
