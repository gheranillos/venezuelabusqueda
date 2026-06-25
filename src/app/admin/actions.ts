"use server";

import { revalidatePath } from "next/cache";
import type { PersonStatus } from "@/types/person";
import {
  createAdminSession,
  destroyAdminSession,
  isAdminAuthenticated,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import { createAdminClient } from "@/lib/supabase/admin";

function mapSupabaseError(message: string): string {
  if (message.toLowerCase().includes("invalid api key")) {
    return "Clave de Supabase inválida. En Vercel agrega SUPABASE_SERVICE_ROLE_KEY (service_role, NO la anon) y haz redeploy.";
  }
  return message;
}

export async function loginAdminAction(password: string): Promise<{ ok: boolean; error?: string }> {
  if (!verifyAdminPassword(password)) {
    return { ok: false, error: "Contraseña incorrecta" };
  }

  await createAdminSession();
  revalidatePath("/admin");
  return { ok: true };
}

export async function logoutAdminAction(): Promise<void> {
  await destroyAdminSession();
  revalidatePath("/admin");
}

export async function updatePersonStatusAction(
  personId: string,
  status: PersonStatus,
  contactInfo?: string
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "No autorizado" };
  }

  if (status === "found" && !contactInfo?.trim()) {
    return { ok: false, error: "Agrega información de contacto para marcar como localizado" };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from("persons")
      .update({
        status,
        contact_info: status === "found" ? contactInfo?.trim() : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", personId);

    if (error) {
      return { ok: false, error: mapSupabaseError(error.message) };
    }

    revalidatePath("/admin");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: mapSupabaseError(err instanceof Error ? err.message : "Error al actualizar"),
    };
  }
}

export async function deletePersonAction(
  personId: string
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "No autorizado" };
  }

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("persons").delete().eq("id", personId);

    if (error) {
      return { ok: false, error: mapSupabaseError(error.message) };
    }

    revalidatePath("/admin");
    revalidatePath("/");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: mapSupabaseError(err instanceof Error ? err.message : "Error al eliminar"),
    };
  }
}
