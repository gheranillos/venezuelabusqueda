"use client";

import { useCallback, useRef, useState } from "react";

interface PhotoUploadProps {
  id?: string;
  photoPreview: string | null;
  onPhotoChange: (file: File | null, preview: string | null) => void;
  label?: string;
}

export function PhotoUpload({
  id = "photoUpload",
  photoPreview,
  onPhotoChange,
  label = "📷 Foto de la persona (opcional pero ayuda mucho)",
}: PhotoUploadProps) {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) {
        onPhotoChange(null, null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("La imagen no puede superar 10MB");
        return;
      }
      const preview = URL.createObjectURL(file);
      onPhotoChange(file, preview);
    },
    [onPhotoChange]
  );

  const clearInputs = () => {
    if (galleryInputRef.current) galleryInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const removePhoto = () => {
    onPhotoChange(null, null);
    clearInputs();
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>

      <div
        role="button"
        tabIndex={0}
        className={`hidden md:block border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all group ${
          isDragging
            ? "border-[#DC2626] bg-red-50"
            : "border-gray-300 hover:border-[#DC2626] hover:bg-red-50"
        }`}
        onClick={() => galleryInputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && galleryInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files[0];
          if (file?.type.startsWith("image/")) handleFile(file);
        }}
      >
        <div className="text-4xl mb-2">📸</div>
        <p className="text-sm text-gray-500 group-hover:text-[#DC2626]">
          Toca para subir foto o arrastra aquí
        </p>
        <p className="text-xs text-gray-400 mt-1">JPG, PNG o HEIC · Máx. 10MB</p>
      </div>

      {/* Móvil: elegir galería/archivos o cámara por separado */}
      <div className="md:hidden space-y-2">
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#DC2626] hover:bg-red-50 transition-all"
        >
          <div className="text-3xl mb-1">🖼️</div>
          <p className="text-sm font-semibold text-gray-700">Elegir de galería o archivos</p>
          <p className="text-xs text-gray-400 mt-0.5">JPG, PNG o HEIC · Máx. 10MB</p>
        </button>
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="w-full border-2 border-gray-200 rounded-xl p-3 text-center text-sm font-semibold text-gray-700 hover:border-[#1E3A5F] hover:bg-slate-50 transition-all"
        >
          📷 Tomar foto con la cámara
        </button>
      </div>

      {/* Galería / archivos — sin capture para no forzar cámara */}
      <input
        ref={galleryInputRef}
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      {/* Cámara — solo cuando el usuario elige explícitamente */}
      <input
        ref={cameraInputRef}
        id={`${id}-camera`}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      {photoPreview && (
        <div className="mt-3 relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photoPreview}
            alt="Vista previa"
            className="w-24 h-24 rounded-xl object-cover border-2 border-[#DC2626]"
          />
          <button
            type="button"
            onClick={removePhoto}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
            aria-label="Eliminar foto"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
