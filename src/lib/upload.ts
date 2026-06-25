"use client";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export async function uploadPhoto(file: File): Promise<string> {
  if (!isSupabaseConfigured()) {
    return URL.createObjectURL(file);
  }

  const supabase = createClient();
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from("person-photos")
    .upload(filename, file, { contentType: file.type, upsert: false });

  if (error) {
    throw new Error(`Error al subir foto: ${error.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("person-photos").getPublicUrl(filename);

  return publicUrl;
}
