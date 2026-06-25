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
  const inputRef = useRef<HTMLInputElement>(null);
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

  const removePhoto = () => {
    onPhotoChange(null, null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div
        role="button"
        tabIndex={0}
        className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all group ${
          isDragging
            ? "border-[#DC2626] bg-red-50"
            : "border-gray-300 hover:border-[#DC2626] hover:bg-red-50"
        }`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
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
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
      </div>
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
