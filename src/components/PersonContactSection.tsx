import type { Person } from "@/types/person";
import {
  formatPhoneDisplay,
  hasReporterContact,
  whatsappUrl,
} from "@/lib/contact";

interface PersonContactSectionProps {
  person: Person;
  variant?: "card" | "modal";
}

export function PersonContactSection({ person, variant = "modal" }: PersonContactSectionProps) {
  const waUrl = whatsappUrl(person.contact_whatsapp);
  const showReporter = hasReporterContact(person);
  const isCompact = variant === "card";

  return (
    <div className="space-y-3">
      {person.status === "found" && person.contact_info && (
        <div
          className={`bg-green-50 border border-green-200 rounded-xl ${
            isCompact ? "p-3" : "p-4"
          }`}
        >
          <p className="text-xs font-bold text-green-700 mb-1">✓ DÓNDE ESTÁ / CÓMO LOCALIZARLO</p>
          <p className={`text-green-800 ${isCompact ? "text-sm" : "text-sm"}`}>
            {person.contact_info}
          </p>
        </div>
      )}

      {showReporter ? (
        <div
          className={`bg-[#1E3A5F]/5 border border-[#1E3A5F]/15 rounded-xl ${
            isCompact ? "p-3" : "p-4"
          }`}
        >
          <p className="text-xs font-bold text-[#1E3A5F] mb-2">
            {person.status === "found"
              ? "📞 Contactar a la familia"
              : "📞 ¿Tienes información? Contacta a quien busca a esta persona"}
          </p>

          {(person.contact_name || person.contact_relation) && (
            <p className={`text-gray-800 font-semibold ${isCompact ? "text-sm" : "text-base"}`}>
              {person.contact_name}
              {person.contact_relation && (
                <span className="font-normal text-gray-500"> · {person.contact_relation}</span>
              )}
            </p>
          )}

          {waUrl ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 inline-flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl transition-colors ${
                isCompact ? "py-2.5 text-sm" : "py-3.5 text-base"
              }`}
            >
              <span className="text-lg">💬</span>
              Escribir por WhatsApp
              <span className="opacity-90 font-medium text-sm">
                {formatPhoneDisplay(person.contact_whatsapp)}
              </span>
            </a>
          ) : (
            person.contact_whatsapp &&
            !/^0+$/.test(person.contact_whatsapp.replace(/\D/g, "")) && (
              <p className="mt-2 text-sm text-gray-600">
                Tel: {formatPhoneDisplay(person.contact_whatsapp)}
              </p>
            )
          )}
        </div>
      ) : (
        person.status === "missing" && (
          <p className={`text-gray-400 italic ${isCompact ? "text-xs" : "text-sm"}`}>
            Sin datos de contacto del reportante
          </p>
        )
      )}
    </div>
  );
}
