const CITY_COORDS: Record<string, [number, number]> = {
  caracas: [10.4806, -66.9036],
  valencia: [10.1621, -68.0077],
  maracay: [10.2469, -67.5958],
  barquisimeto: [10.0647, -69.357],
  maracaibo: [10.6316, -71.6406],
  "ciudad guayana": [8.3535, -62.6413],
  "puerto ordaz": [8.3535, -62.6413],
  maturin: [9.7457, -63.1832],
  barcelona: [10.1362, -64.6862],
  merida: [8.5897, -71.1561],
  "san cristobal": [7.7669, -72.225],
  cumana: [10.453, -64.1826],
  "los teques": [10.344, -67.0433],
  guarenas: [10.4675, -66.5426],
  guatire: [10.474, -66.5426],
  petare: [10.488, -66.816],
  naguanagua: [10.244, -67.99],
};

function hashJitter(text: string): { lat: number; lng: number } {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  const lat = ((hash % 1000) / 1000 - 0.5) * 0.08;
  const lng = (((hash >> 8) % 1000) / 1000 - 0.5) * 0.08;
  return { lat, lng };
}

function matchCity(location: string): [number, number] | null {
  const normalized = location.toLowerCase();
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    if (normalized.includes(city)) {
      const jitter = hashJitter(location);
      return [coords[0] + jitter.lat, coords[1] + jitter.lng];
    }
  }
  return null;
}

export async function geocodeLocation(
  location: string
): Promise<{ latitude: number; longitude: number } | null> {
  const cityMatch = matchCity(location);
  if (cityMatch) {
    return { latitude: cityMatch[0], longitude: cityMatch[1] };
  }

  try {
    const query = encodeURIComponent(`${location}, Venezuela`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
      {
        headers: { "User-Agent": "DesaparecidosVenezuela/1.0 (emergency-app)" },
        next: { revalidate: 86400 },
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data[0]) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      }
    }
  } catch {
    // fallback below
  }

  const jitter = hashJitter(location);
  return { latitude: 8.0 + jitter.lat, longitude: -66.0 + jitter.lng };
}

export function resolveCoordinates(
  person: { last_location: string; latitude?: number | null; longitude?: number | null }
): [number, number] | null {
  if (person.latitude != null && person.longitude != null) {
    return [person.latitude, person.longitude];
  }
  const cityMatch = matchCity(person.last_location);
  return cityMatch;
}
