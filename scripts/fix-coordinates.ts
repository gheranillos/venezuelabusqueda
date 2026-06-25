/**
 * Corrige coordenadas de todas las personas en Supabase.
 * Uso: npm run fix:coordinates
 */

import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { geocodeFromText } from "../src/lib/geocode";

config({ path: path.join(process.cwd(), ".env.local") });

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("Falta .env.local con credenciales de Supabase");
    process.exit(1);
  }

  const supabase = createClient(url, key);
  const { data: persons, error } = await supabase.from("persons").select("id, name, last_location");

  if (error || !persons) {
    console.error("Error al leer persons:", error?.message);
    process.exit(1);
  }

  console.log(`Corrigiendo ${persons.length} registros...\n`);

  for (const person of persons) {
    const { lat, lng } = geocodeFromText(person.last_location);
    const { error: updateError } = await supabase
      .from("persons")
      .update({ latitude: lat, longitude: lng })
      .eq("id", person.id);

    if (updateError) {
      console.error(`✗ ${person.name}: ${updateError.message}`);
    } else {
      console.log(`✓ ${person.name}`);
      console.log(`  → ${lat.toFixed(4)}, ${lng.toFixed(4)} (${person.last_location})\n`);
    }
  }

  console.log("Listo. Recarga el sitio para ver el mapa corregido.");
}

main();
