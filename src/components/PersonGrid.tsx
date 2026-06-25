"use client";

import { useMemo, useState } from "react";
import type { Person, PersonStatus } from "@/types/person";
import { PersonCard } from "./PersonCard";
import { PersonCardSkeleton } from "./PersonCardSkeleton";
import { PersonDetailModal } from "./PersonDetailModal";

type FilterTab = "Todos" | "Sin contacto" | "Localizados";

const tabToStatus: Record<FilterTab, PersonStatus | "all"> = {
  Todos: "all",
  "Sin contacto": "missing",
  Localizados: "found",
};

interface PersonGridProps {
  persons: Person[];
  isLoading?: boolean;
}

export function PersonGrid({ persons, isLoading }: PersonGridProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("Todos");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const filteredPersons = useMemo(() => {
    const status = tabToStatus[activeTab];
    if (status === "all") return persons;
    return persons.filter((p) => p.status === status);
  }, [persons, activeTab]);

  return (
    <section id="resultados" className="max-w-7xl mx-auto px-4 py-12 pb-24 md:pb-12">
      <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          {(["Todos", "Sin contacto", "Localizados"] as FilterTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500">{filteredPersons.length} personas encontradas</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <PersonCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredPersons.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="font-semibold text-lg">No se encontraron resultados</p>
          <p className="text-sm mt-2">Intenta con otro nombre o reporta a la persona.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPersons.map((person) => (
            <PersonCard
              key={person.id}
              person={person}
              onViewDetails={setSelectedPerson}
            />
          ))}
        </div>
      )}

      <PersonDetailModal
        person={selectedPerson}
        open={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />
    </section>
  );
}
