"use client";

import type { Person } from "@/types/person";
import { formatDate } from "@/lib/format";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PersonDetailModalProps {
  person: Person | null;
  open: boolean;
  onClose: () => void;
}

export function PersonDetailModal({ person, open, onClose }: PersonDetailModalProps) {
  if (!person) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">{person.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
            {person.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={person.photo_url}
                alt={person.name}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl text-gray-300">
                👤
              </div>
            )}
            <span
              className={`absolute top-3 right-3 text-xs font-bold px-3 py-1.5 rounded-full text-white ${
                person.status === "found" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {person.status === "found" ? "✓ Localizado" : "⚠ Sin contacto"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 uppercase">Ubicación</p>
              <p className="font-semibold text-gray-800">📍 {person.last_location}</p>
            </div>
            {person.age && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase">Edad</p>
                <p className="font-semibold text-gray-800">👤 {person.age} años</p>
              </div>
            )}
            {person.gender && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase">Género</p>
                <p className="font-semibold text-gray-800">
                  {person.gender === "F" ? "Femenino" : person.gender === "M" ? "Masculino" : "Otro"}
                </p>
              </div>
            )}
            {person.cedula && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 uppercase">Cédula</p>
                <p className="font-semibold text-gray-800">{person.cedula}</p>
              </div>
            )}
          </div>

          {person.description && (
            <div>
              <p className="text-xs text-gray-400 uppercase mb-1">Descripción física</p>
              <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">{person.description}</p>
            </div>
          )}

          {person.status === "found" && person.contact_info && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-xs font-bold text-green-700 mb-1">✓ INFORMACIÓN DE CONTACTO</p>
              <p className="text-sm text-green-800">{person.contact_info}</p>
            </div>
          )}

          <p className="text-xs text-gray-400">Reportado: {formatDate(person.created_at)}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
