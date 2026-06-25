export const COLORS = {
  urgencyRed: "#DC2626",
  navyBlue: "#1E3A5F",
  venezuelaYellow: "#F5A623",
  lightBg: "#F9FAFB",
  darkText: "#111827",
} as const;

export const emergencyNumbers = [
  { number: "171", carrier: "Teléfono fijo CANTV", tel: "171" },
  { number: "*1", carrier: "Movilnet", tel: "*1" },
  { number: "112", carrier: "Digitel", tel: "112" },
  { number: "911", carrier: "Movistar", tel: "911" },
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://desaparecidos-venezuela.vercel.app";

export const SITE_NAME = "Desaparecidos Terremoto Venezuela";

/** Centro aproximado de Venezuela para el mapa */
export const VENEZUELA_MAP_CENTER: [number, number] = [8.0, -66.5];
export const VENEZUELA_MAP_ZOOM = 6;
