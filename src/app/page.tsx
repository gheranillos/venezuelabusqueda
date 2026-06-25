import { getPersons, getStats } from "@/lib/persons";
import { HomePage } from "@/components/HomePage";

export default async function Page() {
  const [persons, stats] = await Promise.all([getPersons(), getStats()]);

  return (
    <>
      {/* SSR fallback: content visible without JavaScript */}
      <noscript>
        <div className="min-h-screen bg-[#F9FAFB]">
          <header className="bg-white border-b border-gray-200 px-4 py-4">
            <p className="font-bold text-[#1E3A5F] text-lg">🇻🇪 Desaparecidos Venezuela</p>
          </header>
          <section className="bg-[#1E3A5F] text-white px-4 py-12 text-center">
            <h1 className="text-3xl font-black mb-4">
              ¿Buscas a un <span className="text-[#F5A623]">familiar</span>?
            </h1>
            <p className="text-slate-300">
              Activa JavaScript para usar el buscador interactivo, o revisa la lista de personas
              reportadas a continuación.
            </p>
            <div className="flex gap-6 mt-8 justify-center">
              <div>
                <p className="text-2xl font-black text-[#F5A623]">{stats.totalReportados}</p>
                <p className="text-xs text-slate-400">Reportados</p>
              </div>
              <div>
                <p className="text-2xl font-black text-red-400">{stats.sinContacto}</p>
                <p className="text-xs text-slate-400">Sin contacto</p>
              </div>
              <div>
                <p className="text-2xl font-black text-green-400">{stats.localizados}</p>
                <p className="text-xs text-slate-400">Localizados</p>
              </div>
            </div>
          </section>
          <section className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Personas reportadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {persons.map((person) => (
                <article
                  key={person.id}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden border-l-4 p-4 ${
                    person.status === "found" ? "border-green-500" : "border-red-500"
                  }`}
                >
                  <h3 className="font-bold text-gray-900">{person.name}</h3>
                  <p className="text-sm text-gray-500">📍 {person.last_location}</p>
                  {person.age && <p className="text-sm text-gray-500">👤 {person.age} años</p>}
                  <p className="text-xs mt-2 font-semibold">
                    {person.status === "found" ? "✓ Localizado" : "⚠ Sin contacto"}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </noscript>

      <HomePage initialPersons={persons} initialStats={stats} />
    </>
  );
}
