import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { isAdminAuthenticated, isAdminPasswordConfigured } from "@/lib/admin-auth";
import { getPersons } from "@/lib/persons";

export const metadata: Metadata = {
  title: "Admin — Desaparecidos Venezuela",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!isAdminPasswordConfigured()) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <p className="text-4xl mb-4">⚙️</p>
          <h1 className="font-bold text-gray-900 mb-2">Admin no configurado</h1>
          <p className="text-sm text-gray-500">
            Agrega <code className="bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code> y{" "}
            <code className="bg-gray-100 px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> en las
            variables de entorno.
          </p>
        </div>
      </div>
    );
  }

  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLogin />;
  }

  const persons = await getPersons();
  return <AdminPanel persons={persons} />;
}
