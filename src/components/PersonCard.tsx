"use client";

import type { Person } from "@/types/person";
import { formatDate } from "@/lib/format";
import { personStatusBadge, personStatusLabel } from "@/lib/person-status";
import { PersonContactSection } from "./PersonContactSection";
import { toast } from "sonner";

interface PersonCardProps {
  person: Person;
  onViewDetails: (person: Person) => void;
}

export function PersonCard({ person, onViewDetails }: PersonCardProps) {
  const handleShare = async () => {
    const shareData = {
      title: `Busco a ${person.name}`,
      text: `${person.name} — Última ubicación: ${person.last_location}. Estado: ${
        person.status === "found" ? personStatusLabel("found") : personStatusLabel("missing")
      }`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      toast.success("Enlace copiado al portapapeles");
    }
  };

  return (
    <article
      className={`bg-white rounded-2xl shadow-md overflow-hidden border-l-4 transition-all hover:shadow-xl hover:-translate-y-1 ${
        person.status === "found" ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {person.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={person.photo_url}
            alt={person.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl text-gray-300">
            👤
          </div>
        )}
        <span
          className={`absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full text-white ${
            person.status === "found" ? "bg-green-500" : "bg-amber-500"
          }`}
        >
          {personStatusBadge(person.status)}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{person.name}</h3>
        <p className="text-sm text-gray-500 mb-1">📍 {person.last_location}</p>
        {person.age && <p className="text-sm text-gray-500">👤 {person.age} años</p>}
        <p className="text-xs text-gray-400 mt-2">Reportado: {formatDate(person.created_at)}</p>

        <div className="mt-3">
          <PersonContactSection person={person} variant="card" />
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onViewDetails(person)}
            className="flex-1 border-2 border-gray-200 rounded-xl py-2 text-sm font-semibold text-gray-700 hover:border-[#DC2626] hover:text-[#DC2626] transition-colors"
          >
            Ver información completa
          </button>
          <button
            onClick={handleShare}
            className="px-3 border-2 border-gray-200 rounded-xl py-2 text-sm hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors"
            aria-label="Compartir"
            title="Compartir"
          >
            ↗
          </button>
        </div>
      </div>
    </article>
  );
}
