import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";

config({ path: path.join(process.cwd(), ".env.local") });

const SEARCH = ["Tony", "Verónica Márquez"];

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: all, error: listError } = await supabase
    .from("persons")
    .select("id, name");

  if (listError) {
    console.error("Error listando:", listError.message);
    process.exit(1);
  }

  console.log("Personas en DB:", all?.length ?? 0);

  const toDelete = (all ?? []).filter((p) =>
    SEARCH.some(
      (term) =>
        p.name.includes(term) ||
        (term === "Tony" && p.name.toLowerCase().includes("tony"))
    )
  );

  if (toDelete.length === 0) {
    console.log("No se encontraron coincidencias. Nombres actuales:");
    all?.forEach((p) => console.log(" -", p.name));
    return;
  }

  for (const person of toDelete) {
    const { error } = await supabase.from("persons").delete().eq("id", person.id);
    if (error) {
      console.error(`✗ ${person.name}: ${error.message}`);
      if (error.message.includes("policy") || error.code === "42501") {
        console.log("\n⚠️  RLS bloquea el borrado. Ejecuta en Supabase SQL Editor:");
        console.log(`DELETE FROM persons WHERE id = '${person.id}';`);
      }
    } else {
      console.log(`✓ Eliminado: ${person.name}`);
    }
  }
}

main();
