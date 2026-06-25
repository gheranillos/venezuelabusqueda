import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Reconecta familias tras el sismo`,
  description:
    "Herramienta ciudadana de emergencia para buscar y reportar personas desaparecidas tras el terremoto del 24 de junio de 2025 en Venezuela. Gratuito, sin registro.",
  keywords: [
    "desaparecidos",
    "terremoto",
    "Venezuela",
    "sismo",
    "emergencia",
    "buscar familiar",
    "24 de junio",
  ],
  openGraph: {
    title: `${SITE_NAME} — ¿Buscas a un familiar?`,
    description:
      "Miles de familias buscan a sus seres queridos. Sube una foto, ingresa el nombre y lugar — nosotros hacemos el resto.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_VE",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Desaparecidos Terremoto Venezuela — Herramienta de emergencia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ¿Buscas a un familiar?`,
    description:
      "Herramienta ciudadana para reconectar familias tras el terremoto del 24 de junio de 2025 en Venezuela.",
    images: [`${SITE_URL}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F9FAFB] text-[#111827] font-sans`}
      >
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
