export const COLORS = {
  urgencyRed: "#DC2626",
  navyBlue: "#1E3A5F",
  venezuelaYellow: "#F5A623",
  lightBg: "#F9FAFB",
  darkText: "#111827",
} as const;

export const emergencyNumbers = [
  { number: "171", carrier: "Emergencias nacionales" },
  { number: "911", carrier: "Policía / Bomberos" },
  { number: "0800-RESCATE", carrier: "Línea de rescate" },
  { number: "0800-AMBULANCIA", carrier: "Ambulancias" },
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://desaparecidos-venezuela.vercel.app";

export const SITE_NAME = "Desaparecidos Terremoto Venezuela";
