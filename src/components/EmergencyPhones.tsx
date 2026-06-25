import { Phone } from "lucide-react";
import { emergencyNumbers } from "@/lib/constants";

export function EmergencyPhones() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 my-8 shadow-sm">
        <h3 className="font-bold text-[#DC2626] mb-5 flex items-center gap-2 text-sm uppercase tracking-wide">
          <Phone className="w-4 h-4" strokeWidth={2.5} />
          Teléfonos de emergencia · Caracas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emergencyNumbers.map(({ number, carrier, tel }) => (
            <a
              key={number}
              href={`tel:${tel}`}
              className="bg-slate-50 rounded-xl p-4 text-center hover:bg-slate-100 active:bg-slate-200 transition-colors"
            >
              <p className="text-2xl md:text-3xl font-black text-[#1E3A5F] leading-none mb-1">
                {number}
              </p>
              <p className="text-xs text-gray-500">{carrier}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
