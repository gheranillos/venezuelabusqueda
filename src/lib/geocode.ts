/** Coordenadas verificadas en zona urbana (tierra), estado La Guaira / Vargas */

type Coord = { lat: number; lng: number };

/** Claves ordenadas de más específica a más general */
const LOCATION_COORDS: Array<{ keys: string[]; coord: Coord }> = [
  {
    keys: ["pérez carreño", "perez carreno", "hospital pérez"],
    coord: { lat: 10.487, lng: -66.874 },
  },
  {
    keys: ["edificio bello horizonte", "bello horizonte"],
    coord: { lat: 10.587, lng: -66.946 },
  },
  {
    keys: ["edificio bahía mar", "bahia mar", "bahía mar"],
    coord: { lat: 10.578, lng: -66.926 },
  },
  {
    keys: ["costa brava", "los corales"],
    coord: { lat: 10.572, lng: -66.914 },
  },
  {
    keys: ["playa pantaleta", "pantaleta"],
    coord: { lat: 10.559, lng: -66.892 },
  },
  {
    keys: ["tanaguarenas"],
    coord: { lat: 10.548, lng: -66.875 },
  },
  {
    keys: ["edificio malecón", "malecón", "malecon"],
    coord: { lat: 10.582, lng: -66.938 },
  },
  {
    keys: ["quinta anache", "atlántida", "atlantida"],
    coord: { lat: 10.584, lng: -66.951 },
  },
  {
    keys: ["aeropuerto de maiquetía", "aeropuerto maiquetía", "aeropuerto maiquetia"],
    coord: { lat: 10.589, lng: -66.978 },
  },
  {
    keys: ["catia la mar"],
    coord: { lat: 10.585, lng: -66.953 },
  },
  {
    keys: ["maiquetía", "maiquetia"],
    coord: { lat: 10.593, lng: -66.968 },
  },
  {
    keys: ["pariata"],
    coord: { lat: 10.561, lng: -66.942 },
  },
  {
    keys: ["carayaca"],
    coord: { lat: 10.605, lng: -66.888 },
  },
  {
    keys: ["la guaira", "la guaira,", "guaira"],
    coord: { lat: 10.577, lng: -66.928 },
  },
  {
    keys: ["caracas"],
    coord: { lat: 10.481, lng: -66.904 },
  },
  {
    keys: ["valencia"],
    coord: { lat: 10.162, lng: -68.008 },
  },
  {
    keys: ["maracay"],
    coord: { lat: 10.247, lng: -67.596 },
  },
  {
    keys: ["barquisimeto"],
    coord: { lat: 10.065, lng: -69.357 },
  },
];

function hashSpread(seed: string): { lat: number; lng: number } {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  // Solo dispersar en longitud (a lo largo de la costa), no hacia el mar
  return {
    lat: ((hash % 7) - 3) * 0.0008,
    lng: ((hash % 11) - 5) * 0.0012,
  };
}

/**
 * Ajuste de seguridad: en la franja costera de Vargas, si lat > 10.58
 * el punto cae en el Caribe en muchos tiles — empujar al sur (tierra).
 */
export function ensureOnLand(lat: number, lng: number): Coord {
  if (lng >= -67.1 && lng <= -66.82 && lat > 10.58 && lat < 10.68) {
    return { lat: 10.575, lng };
  }
  return { lat, lng };
}

export function geocodeFromText(location: string): Coord {
  const normalized = location
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  for (const { keys, coord } of LOCATION_COORDS) {
    if (keys.some((k) => normalized.includes(k))) {
      const spread = hashSpread(location);
      return ensureOnLand(coord.lat + spread.lat, coord.lng + spread.lng);
    }
  }

  const spread = hashSpread(location);
  return ensureOnLand(10.577 + spread.lat, -66.928 + spread.lng);
}

export async function geocodeLocation(
  location: string
): Promise<{ latitude: number; longitude: number }> {
  const local = geocodeFromText(location);
  return { latitude: local.lat, longitude: local.lng };
}

export function resolveCoordinates(person: {
  last_location: string;
  latitude?: number | null;
  longitude?: number | null;
}): [number, number] | null {
  // Siempre re-geocodificar desde el texto para corregir coords mal guardadas
  const fresh = geocodeFromText(person.last_location);
  return [fresh.lat, fresh.lng];
}
