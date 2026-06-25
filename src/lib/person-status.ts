import type { PersonStatus } from "@/types/person";

/** Etiqueta del estado de la persona desaparecida (no del teléfono del reportante) */
export function personStatusBadge(status: PersonStatus): string {
  return status === "found" ? "✓ Localizado" : "🔍 En búsqueda";
}

export function personStatusLabel(status: PersonStatus): string {
  return status === "found" ? "Localizado ✓" : "En búsqueda";
}

export const FILTER_TAB_MISSING = "En búsqueda" as const;
export const STATS_MISSING_LABEL = "En búsqueda";
