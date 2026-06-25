"use client";

import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import type { Person } from "@/types/person";
import { VENEZUELA_MAP_CENTER, VENEZUELA_MAP_ZOOM } from "@/lib/constants";
import { geocodeLocation, resolveCoordinates } from "@/lib/geocode";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  person: Person;
  lat: number;
  lng: number;
}

interface ReportsMapProps {
  persons: Person[];
}

function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;
    if (markers.length === 1) {
      map.setView([markers[0].lat, markers[0].lng], 11);
      return;
    }
    const lats = markers.map((m) => m.lat);
    const lngs = markers.map((m) => m.lng);
    const bounds: [[number, number], [number, number]] = [
      [Math.min(...lats) - 0.1, Math.min(...lngs) - 0.1],
      [Math.max(...lats) + 0.1, Math.max(...lngs) + 0.1],
    ];
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
  }, [markers, map]);

  return null;
}

export function ReportsMap({ persons }: ReportsMapProps) {
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function buildMarkers() {
      setLoading(true);
      const results: MapMarker[] = [];

      for (const person of persons) {
        const cached = resolveCoordinates(person);
        if (cached) {
          results.push({ person, lat: cached[0], lng: cached[1] });
          continue;
        }

        const coords = await geocodeLocation(person.last_location);
        if (coords && !cancelled) {
          results.push({
            person,
            lat: coords.latitude,
            lng: coords.longitude,
          });
        }
      }

      if (!cancelled) {
        setMarkers(results);
        setLoading(false);
      }
    }

    buildMarkers();
    return () => {
      cancelled = true;
    };
  }, [persons]);

  const missingCount = useMemo(
    () => markers.filter((m) => m.person.status === "missing").length,
    [markers]
  );
  const foundCount = useMemo(
    () => markers.filter((m) => m.person.status === "found").length,
    [markers]
  );

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h3 className="font-bold text-[#1E3A5F] text-lg mb-1">🗺️ Mapa de reportes</h3>
          <p className="text-sm text-gray-500">
            Puntos rojos: sin contacto · Puntos verdes: localizados
          </p>
          <div className="flex gap-4 mt-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#DC2626] inline-block" />
              {missingCount} en búsqueda
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              {foundCount} localizados
            </span>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[480px]">
          {loading && (
            <div className="absolute inset-0 z-[500] bg-gray-50 flex items-center justify-center">
              <p className="text-sm text-gray-500 animate-pulse">Cargando mapa...</p>
            </div>
          )}

          <MapContainer
            center={VENEZUELA_MAP_CENTER}
            zoom={VENEZUELA_MAP_ZOOM}
            className="h-full w-full z-0"
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds markers={markers} />
            {markers.map(({ person, lat, lng }) => (
              <CircleMarker
                key={person.id}
                center={[lat, lng]}
                radius={10}
                pathOptions={{
                  color: person.status === "found" ? "#16a34a" : "#DC2626",
                  fillColor: person.status === "found" ? "#22c55e" : "#DC2626",
                  fillOpacity: 0.85,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="min-w-[160px]">
                    <p className="font-bold text-gray-900 text-sm">{person.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">📍 {person.last_location}</p>
                    <p
                      className={`text-xs font-semibold mt-1 ${
                        person.status === "found" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {person.status === "found" ? "✓ Localizado" : "⚠ Sin contacto"}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
