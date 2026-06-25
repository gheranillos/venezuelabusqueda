import { createClient } from "@supabase/supabase-js";

function decodeJwtRole(key: string): string | null {
  try {
    const payload = JSON.parse(Buffer.from(key.split(".")[1], "base64").toString("utf8"));
    return payload.role ?? null;
  } catch {
    return null;
  }
}

export function getServiceRoleKeyIssue(): string | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) {
    return "Falta SUPABASE_SERVICE_ROLE_KEY en las variables de entorno.";
  }

  const role = decodeJwtRole(key);
  if (role === "anon") {
    return "Estás usando la clave anon. Necesitas la service_role de Supabase → Settings → API.";
  }
  if (role && role !== "service_role") {
    return `Clave con rol incorrecto (${role}). Usa la service_role.`;
  }

  return null;
}

export function isAdminSupabaseConfigured(): boolean {
  return (
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && getServiceRoleKeyIssue() === null
  );
}

export function createAdminClient() {
  const issue = getServiceRoleKeyIssue();
  if (issue) {
    throw new Error(issue);
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!.trim(),
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
