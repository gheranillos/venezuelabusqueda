import { createClient } from "@supabase/supabase-js";

export function isAdminSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export function createAdminClient() {
  if (!isAdminSupabaseConfigured()) {
    throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY en las variables de entorno");
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
