import { emergencyNumbers } from "@/lib/constants";

export function EmergencyPhones() {
  return (
    <section className="max-w-7xl mx-auto px-4">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 my-8">
        <h3 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
          📞 Teléfonos de emergencia · Caracas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emergencyNumbers.map(({ number, carrier }) => (
            <a
              key={number}
              href={`tel:${number.replace(/[^0-9+]/g, "")}`}
              className="bg-white rounded-xl p-3 text-center border border-amber-200 active:bg-amber-100 transition-colors"
            >
              <p className="text-2xl font-black text-[#1E3A5F]">{number}</p>
              <p className="text-xs text-gray-500">{carrier}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
