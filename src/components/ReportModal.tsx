"use client";

import { useState } from "react";
import { uploadPhoto } from "@/lib/upload";
import { createPersonAction } from "@/app/actions";
import { PhotoUpload } from "./PhotoUpload";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReportModal({ open, onClose, onSuccess }: ReportModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 fields
  const [name, setName] = useState("");
  const [lastLocation, setLastLocation] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [cedula, setCedula] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Step 2 fields
  const [contactName, setContactName] = useState("");
  const [contactWhatsapp, setContactWhatsapp] = useState("");
  const [contactRelation, setContactRelation] = useState("");

  const resetForm = () => {
    setStep(1);
    setName("");
    setLastLocation("");
    setAge("");
    setDescription("");
    setCedula("");
    setPhotoFile(null);
    setPhotoPreview(null);
    setContactName("");
    setContactWhatsapp("");
    setContactRelation("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handlePhotoChange = (file: File | null, preview: string | null) => {
    setPhotoFile(file);
    setPhotoPreview(preview);
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !lastLocation.trim()) {
      toast.error("Nombre y ubicación son obligatorios");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactWhatsapp.trim()) {
      toast.error("El número de WhatsApp es obligatorio");
      return;
    }

    setIsSubmitting(true);
    try {
      let photoUrl: string | undefined;
      if (photoFile) {
        photoUrl = await uploadPhoto(photoFile);
      }

      await createPersonAction({
        name: name.trim(),
        last_location: lastLocation.trim(),
        age: age ? parseInt(age, 10) : undefined,
        description: description.trim() || undefined,
        cedula: cedula.trim() || undefined,
        photo_url: photoUrl,
        contact_name: contactName.trim() || undefined,
        contact_whatsapp: contactWhatsapp.trim(),
        contact_relation: contactRelation.trim() || undefined,
      });

      toast.success("Reporte publicado correctamente. ¡Gracias por ayudar!");
      handleClose();
      onSuccess();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al publicar el reporte");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            + Reportar persona desaparecida
          </DialogTitle>
          <div className="flex gap-2 mt-2">
            <div
              className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[#DC2626]" : "bg-gray-200"}`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-[#DC2626]" : "bg-gray-200"}`}
            />
          </div>
          <p className="text-xs text-gray-400">Paso {step} de 2</p>
        </DialogHeader>

        {step === 1 ? (
          <form onSubmit={handleStep1Next} className="space-y-4">
            <h3 className="font-bold text-lg">Datos de la persona desaparecida</h3>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo *"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />

            <PhotoUpload
              id="reportPhotoUpload"
              photoPreview={photoPreview}
              onPhotoChange={handlePhotoChange}
              label="📷 Foto de la persona"
            />

            <input
              type="text"
              required
              value={lastLocation}
              onChange={(e) => setLastLocation(e.target.value)}
              placeholder="Última ubicación conocida *"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />

            <input
              type="number"
              min={0}
              max={120}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Edad aproximada"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción física (ropa que llevaba, señas particulares...)"
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none resize-none"
            />

            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Cédula de identidad (si la conoce)"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#1E3A5F] hover:bg-[#162d4a] text-white font-bold py-4 rounded-2xl text-lg transition-colors"
            >
              Siguiente →
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="font-bold text-lg">¿Cómo te contactamos si la encontramos?</h3>

            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />

            <input
              type="tel"
              required
              value={contactWhatsapp}
              onChange={(e) => setContactWhatsapp(e.target.value)}
              placeholder="Tu número de WhatsApp *"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />

            <input
              type="text"
              value={contactRelation}
              onChange={(e) => setContactRelation(e.target.value)}
              placeholder="Relación con la persona (hijo/a, esposo/a...)"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#DC2626] focus:outline-none"
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-gray-200 text-gray-700 font-semibold py-4 rounded-2xl"
              >
                ← Atrás
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-[2] bg-[#DC2626] hover:bg-red-700 disabled:opacity-60 text-white font-black py-5 rounded-2xl text-xl transition-colors"
              >
                {isSubmitting ? "Publicando..." : "📢 PUBLICAR REPORTE"}
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
