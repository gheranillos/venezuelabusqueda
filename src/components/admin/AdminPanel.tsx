"use client";

import { useState } from "react";
import type { Person } from "@/types/person";
import { formatDate } from "@/lib/format";
import { personStatusBadge } from "@/lib/person-status";
import {
  deletePersonAction,
  logoutAdminAction,
  updatePersonStatusAction,
} from "@/app/admin/actions";
import { toast } from "sonner";
import Link from "next/link";

interface AdminPanelProps {
  persons: Person[];
  supabaseIssue?: string | null;
}

export function AdminPanel({ persons, supabaseIssue }: AdminPanelProps) {
  const [filter, setFilter] = useState<"all" | "missing" | "found">("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = persons.filter((p) => filter === "all" || p.status === filter);

  const handleLogout = async () => {
    await logoutAdminAction();
    window.location.reload();
  };

  const handleMarkFound = async (personId: string) => {
    setLoadingId(personId);
    const result = await updatePersonStatusAction(personId, "found", contactInfo);
    setLoadingId(null);

    if (result.ok) {
      toast.success("Marcado como localizado ✓");
      setEditingId(null);
      setContactInfo("");
      window.location.reload();
    } else {
      toast.error(result.error ?? "Error al actualizar");
    }
  };

  const handleMarkMissing = async (personId: string) => {
    if (!confirm("¿Volver a marcar como en búsqueda?")) return;

    setLoadingId(personId);
    const result = await updatePersonStatusAction(personId, "missing");
    setLoadingId(null);

    if (result.ok) {
      toast.success("Actualizado a en búsqueda");
      window.location.reload();
    } else {
      toast.error(result.error ?? "Error al actualizar");
    }
  };

  const handleDelete = async (personId: string, name: string) => {
    if (!confirm(`¿Eliminar el reporte de ${name}? Esta acción no se puede deshacer.`)) return;

    setLoadingId(personId);
    const result = await deletePersonAction(personId);
    setLoadingId(null);

    if (result.ok) {
      toast.success("Reporte eliminado");
      window.location.reload();
    } else {
      toast.error(result.error ?? "Error al eliminar");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="font-black text-[#1E3A5F] text-lg">🔐 Panel Admin</h1>
            <p className="text-xs text-gray-500">{persons.length} reportes totales</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/"
              className="text-sm font-semibold text-gray-600 hover:text-[#1E3A5F] px-3 py-2"
            >
              Ver sitio
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-red-600 hover:text-red-700 px-3 py-2"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {supabaseIssue && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-800">
            <p className="font-bold mb-1">⚠️ No se pueden guardar cambios</p>
            <p>{supabaseIssue}</p>
            <p className="mt-2 text-xs text-red-700">
              Supabase → Project Settings → API → copia <strong>service_role</strong> → Vercel →
              Environment Variables → <code>SUPABASE_SERVICE_ROLE_KEY</code> → Redeploy
            </p>
          </div>
        )}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "missing", "found"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                filter === tab
                  ? "bg-[#1E3A5F] text-white"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {tab === "all" ? "Todos" : tab === "missing" ? "En búsqueda" : "Localizados"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No hay reportes en esta categoría</p>
          ) : (
            filtered.map((person) => (
              <article
                key={person.id}
                className={`bg-white rounded-2xl border-l-4 shadow-sm p-4 md:p-5 ${
                  person.status === "found" ? "border-green-500" : "border-red-500"
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    {person.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={person.photo_url}
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl text-gray-300">
                        👤
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h2 className="font-bold text-gray-900 text-lg leading-tight">
                          {person.name}
                        </h2>
                        <p className="text-sm text-gray-500">📍 {person.last_location}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Reportado: {formatDate(person.created_at)}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full text-white shrink-0 ${
                          person.status === "found" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {personStatusBadge(person.status)}
                      </span>
                    </div>

                    {person.status === "found" && person.contact_info && (
                      <div className="mt-3 bg-green-50 rounded-xl p-3 text-sm text-green-800">
                        <p className="font-semibold text-green-700 text-xs mb-1">
                          INFO DE CONTACTO
                        </p>
                        {person.contact_info}
                      </div>
                    )}

                    {editingId === person.id ? (
                      <div className="mt-4 space-y-3">
                        <textarea
                          value={contactInfo}
                          onChange={(e) => setContactInfo(e.target.value)}
                          placeholder="Ej: Localizado en Hospital Pérez Carreño, piso 3. Contactar al 0412..."
                          rows={3}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:border-green-500 focus:outline-none resize-none"
                        />
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => handleMarkFound(person.id)}
                            disabled={loadingId === person.id}
                            className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold px-4 py-2.5 rounded-xl text-sm"
                          >
                            {loadingId === person.id ? "Guardando..." : "✓ Confirmar localizado"}
                          </button>
                          <button
                            onClick={() => {
                              setEditingId(null);
                              setContactInfo("");
                            }}
                            className="border-2 border-gray-200 text-gray-600 font-semibold px-4 py-2.5 rounded-xl text-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {person.status === "missing" ? (
                          <button
                            onClick={() => {
                              setEditingId(person.id);
                              setContactInfo(person.contact_info ?? "");
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2.5 rounded-xl text-sm"
                          >
                            ✓ Marcar como localizado
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingId(person.id);
                              setContactInfo(person.contact_info ?? "");
                            }}
                            className="border-2 border-green-200 text-green-700 font-semibold px-4 py-2.5 rounded-xl text-sm"
                          >
                            Editar contacto
                          </button>
                        )}
                        {person.status === "found" && (
                          <button
                            onClick={() => handleMarkMissing(person.id)}
                            disabled={loadingId === person.id}
                            className="border-2 border-amber-200 text-amber-700 font-semibold px-4 py-2.5 rounded-xl text-sm"
                          >
                            Volver a en búsqueda
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(person.id, person.name)}
                          disabled={loadingId === person.id}
                          className="border-2 border-red-200 text-red-600 font-semibold px-4 py-2.5 rounded-xl text-sm ml-auto"
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
