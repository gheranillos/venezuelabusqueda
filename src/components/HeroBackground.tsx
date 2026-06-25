const HERO_IMAGES = [
  { src: "/sismo.jpg", alt: "Daños por el sismo en Venezuela" },
  { src: "/sismo2.jpg", alt: "Emergencia tras el terremoto" },
  { src: "/sismo3.jpg", alt: "Afectados por el sismo" },
  { src: "/sismo4.jpg", alt: "Destrucción por el terremoto" },
  { src: "/sismo5.webp", alt: "Rescate tras el sismo" },
] as const;

const NOISE_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`;

export function HeroBackground() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* Mosaico de imágenes del sismo */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-3 md:grid-rows-2">
        <div className="relative col-span-2 row-span-2 md:col-span-2 md:row-span-2 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGES[0].src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
        </div>
        {HERO_IMAGES.slice(1).map((image) => (
          <div key={image.src} className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
          </div>
        ))}
      </div>

      {/* Overlay azul marino — las fotos se ven con baja opacidad debajo */}
      <div className="absolute inset-0 bg-[#1E3A5F]/88" />

      {/* Textura de ruido sutil */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: NOISE_BG }}
      />
    </div>
  );
}
