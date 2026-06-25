"use client";

import { useState } from "react";
import { loginAdminAction } from "@/app/admin/actions";
import { toast } from "sonner";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await loginAdminAction(password);
    setLoading(false);

    if (result.ok) {
      toast.success("Acceso concedido");
      window.location.reload();
    } else {
      toast.error(result.error ?? "Error de acceso");
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100"
      >
        <div className="text-center mb-6">
          <span className="text-4xl">🔐</span>
          <h1 className="text-2xl font-black text-[#1E3A5F] mt-3">Panel Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Desaparecidos Venezuela</p>
        </div>

        <label htmlFor="admin-password" className="block text-sm font-semibold text-gray-700 mb-2">
          Contraseña
        </label>
        <input
          id="admin-password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa la contraseña de admin"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900 focus:border-[#1E3A5F] focus:outline-none mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1E3A5F] hover:bg-[#162d4a] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl transition-colors"
        >
          {loading ? "Verificando..." : "Entrar"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          Solo personal autorizado
        </p>
      </form>
    </div>
  );
}
