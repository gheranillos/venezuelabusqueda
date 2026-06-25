"use client";

import { useState } from "react";
import type { PersonSearchQuery } from "@/types/person";
import { PhotoUpload } from "./PhotoUpload";

interface SearchCardProps {
  onSearch: (query: PersonSearchQuery) => void;
  isSearching: boolean;
}

export function SearchCard({ onSearch, isSearching }: SearchCardProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (file: File | null, preview: string | null) => {
    setPhotoFile(file);
    setPhotoPreview(preview);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSearch({
      name: name.trim(),
      location: location.trim() || undefined,
      age: age ? parseInt(age, 10) : undefined,
      gender: gender || undefined,
      photoFile,
    });

    document.getElementById("resultados")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-2xl mx-auto -mb-8 relative z-10 text-left"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-5 text-center">
        🔍 Buscar a mi familiar
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="search-name" className="block text-sm font-semibold text-gray-700 mb-1">
            Nombre completo *
          </label>
          <input
            id="search-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: María González"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="search-location" className="block text-sm font-semibold text-gray-700 mb-1">
            Última ubicación conocida
          </label>
          <input
            id="search-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ej: Caracas, La California Norte"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="search-age" className="block text-sm font-semibold text-gray-700 mb-1">
              Edad aprox.
            </label>
            <input
              id="search-age"
              type="number"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ej: 45"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="search-gender" className="block text-sm font-semibold text-gray-700 mb-1">
              Género
            </label>
            <select
              id="search-gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none bg-white"
            >
              <option value="">Cualquiera</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
            </select>
          </div>
        </div>

        <PhotoUpload
          id="searchPhotoUpload"
          photoPreview={photoPreview}
          onPhotoChange={handlePhotoChange}
        />

        <button
          type="submit"
          disabled={isSearching || !name.trim()}
          className="w-full bg-[#DC2626] hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-xl py-5 rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-3 mt-2"
        >
          <span className="text-2xl">🔍</span>
          {isSearching ? "BUSCANDO..." : "BUSCAR FAMILIAR AHORA"}
        </button>

        <p className="text-center text-xs text-gray-400">
          Gratuito · Sin registro · Información verificada
        </p>
      </div>
    </form>
  );
}
