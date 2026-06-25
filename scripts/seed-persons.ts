/**
 * Recorta fotos de screenshots y carga personas en Supabase.
 * Uso: npm run seed:persons
 * Requiere .env.local con NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: path.join(process.cwd(), ".env.local") });

const SOURCE_DIR = path.join(process.cwd(), "scripts", "source-images");
const OUTPUT_DIR = path.join(process.cwd(), "public", "personas");

type Crop = { left: number; top: number; width: number; height: number };

interface SeedPerson {
  id: string;
  sourceFile: string;
  crop: Crop;
  name: string;
  age?: number;
  gender?: "M" | "F";
  last_location: string;
  description?: string;
  cedula?: string;
  contact_whatsapp: string;
  contact_name?: string;
  contact_relation?: string;
}

const PERSONS: SeedPerson[] = [
  {
    id: "dayany-dayerlin-sanchez",
    sourceFile: "64bbe5a4-e5c0-4480-a71a-cbe88b0dd2fb.png",
    crop: { left: 36, top: 195, width: 400, height: 195 },
    name: "Dayany y Dayerlin Sánchez",
    age: 40,
    gender: "F",
    last_location: "Venezuela (ubicación exacta desconocida)",
    description: "No se sabe de ellas después del terremoto del 24 de junio. C.I. 16129448 / 1612450.",
    cedula: "16129448",
    contact_whatsapp: "00000000000",
    contact_relation: "Familiar",
  },
  {
    id: "alejandro-landaeta",
    sourceFile: "4baa8907-0651-4a49-b661-9d90f9905b45.png",
    crop: { left: 75, top: 115, width: 322, height: 290 },
    name: "Alejandro Wladimir Landaeta Mejías",
    gender: "M",
    last_location: "Edificio Bello Horizonte, Catia La Mar",
    description: "Desaparecido tras el terremoto del 24 de junio.",
    contact_whatsapp: "04243696841",
    contact_relation: "Familiar",
  },
  {
    id: "paola-briceno",
    sourceFile: "bdd8a225-a700-451f-809a-423e1565f041.png",
    crop: { left: 15, top: 95, width: 210, height: 270 },
    name: "Paola Briceño",
    gender: "F",
    last_location: "Catia La Mar, Edificio Malecón, cerca del Club de Yates de La Guaira",
    contact_whatsapp: "04141464092",
    contact_relation: "Familiar",
  },
  {
    id: "clementina-segovia",
    sourceFile: "2d6f2e00-e638-418b-9db8-b3424958a53c.png",
    crop: { left: 25, top: 145, width: 210, height: 265 },
    name: "Clementina Segovia",
    gender: "F",
    last_location: "Edificio Costa Brava, Los Corales, La Guaira",
    description: "Desaparecida tras terremoto en Venezuela, 24 de junio.",
    cedula: "V-28155685",
    contact_whatsapp: "04243420415",
    contact_name: "Familiar",
    contact_relation: "Familiar",
  },
  {
    id: "ian-lambert",
    sourceFile: "9734362a-b4da-465d-98fd-fd6d562f39e0.png",
    crop: { left: 55, top: 135, width: 362, height: 330 },
    name: "Ian Lambert",
    gender: "M",
    last_location: "La Guaira, Los Corales",
    cedula: "V-30225544",
    contact_whatsapp: "04127240400",
    contact_relation: "Amigos",
  },
  {
    id: "aaron-villalta",
    sourceFile: "3f51be3c-ed18-4fb4-8761-5ba8fbca5ff9.png",
    crop: { left: 15, top: 85, width: 440, height: 360 },
    name: "Aaron Isaac Villalta",
    age: 8,
    gender: "M",
    last_location: "Pariata, La Guaira — Emergencia pediátrica Hospital Pérez Carreño",
    description: "Traído por Ven 911. SIN FAMILIAR. Se busca a su familia.",
    contact_whatsapp: "00000000000",
    contact_relation: "Hospital",
  },
  {
    id: "alonso-cabrera",
    sourceFile: "0abca4ad-2c72-4ef6-b6f5-57dcc92bdc46.png",
    crop: { left: 35, top: 115, width: 210, height: 230 },
    name: "Alonso Cabrera",
    age: 6,
    gender: "M",
    last_location: "Edificio Bahía Mar, Av. Principal La Costanera",
    description: "Sobrino desaparecido tras el terremoto. Familia Cabrera.",
    contact_whatsapp: "00000000000",
    contact_relation: "Tía",
  },
  {
    id: "antonio-cabrera-piloto",
    sourceFile: "0abca4ad-2c72-4ef6-b6f5-57dcc92bdc46.png",
    crop: { left: 35, top: 375, width: 210, height: 230 },
    name: "Antonio Cabrera",
    gender: "M",
    last_location: "Edificio Bahía Mar, Av. Principal La Costanera",
    description: "Piloto. C.I. 2904181. Desaparecido tras el terremoto.",
    cedula: "2904181",
    contact_whatsapp: "00000000000",
    contact_relation: "Tía",
  },
  {
    id: "francisco-marcano",
    sourceFile: "c87987ff-33f0-448d-8876-3c9503742f64.png",
    crop: { left: 75, top: 125, width: 322, height: 285 },
    name: "Francisco Antonio Marcano Paruta",
    age: 66,
    gender: "M",
    last_location: "Carayaca, estado La Guaira",
    description: "Desaparecido desde el terremoto del 24 de junio por la tarde. Señales móviles inestables en la zona.",
    contact_whatsapp: "04248726631",
    contact_relation: "Familiares",
  },
  {
    id: "yimvert-berroteran",
    sourceFile: "4e84fa7c-1de5-4738-af31-4f2fa62216dd.png",
    crop: { left: 25, top: 155, width: 210, height: 270 },
    name: "Yimvert Berroterán",
    age: 18,
    gender: "M",
    last_location: "Los Corales, La Guaira",
    description: "Altura 1.80 m, contextura atlética. Jugador de fútbol.",
    contact_whatsapp: "04141133786",
    contact_relation: "FVF / Familia",
  },
  {
    id: "ana-solangel-prieto",
    sourceFile: "3b2b6eb7-b1d5-49f9-991a-ad8075614c75.png",
    crop: { left: 45, top: 140, width: 380, height: 290 },
    name: "Ana Solangel Prieto",
    age: 67,
    gender: "F",
    last_location: "Aeropuerto de Maiquetía, salida de emergencia (última vez 7:30 pm)",
    description: "Tiene número extranjero y no puede comunicarse con familiares. Está sola en Caracas.",
    contact_whatsapp: "04249050375",
    contact_relation: "Familiar",
  },
  {
    id: "genesis-aguirre-maximiliano",
    sourceFile: "da0a9f8a-1d84-492e-8875-9ed0c67ccd3f.png",
    crop: { left: 15, top: 95, width: 442, height: 400 },
    name: "Génesis Aguirre y Maximiliano Merentes",
    gender: "F",
    last_location: "La Guaira, Tanaguarenas",
    description: "Madre e hijo. No se tiene información de ellos desde el terremoto.",
    contact_whatsapp: "04248875689",
    contact_relation: "Familiar",
  },
  {
    id: "skarlent-rodriguez",
    sourceFile: "2aba2035-4a0a-470e-849b-93361cd68eb4.png",
    crop: { left: 15, top: 135, width: 210, height: 285 },
    name: "Skarlent Rodríguez",
    gender: "F",
    last_location: "Catia La Mar, Av. La Atlántida, Calle 7, Quinta Anache (cerca Pinturas Montana)",
    contact_whatsapp: "04244567728",
    contact_relation: "Familiar",
  },
  {
    id: "natalia-benezra",
    sourceFile: "04929066-9757-4a87-ab52-8acb877edb09.png",
    crop: { left: 35, top: 55, width: 402, height: 430 },
    name: "Natalia Benezra",
    age: 22,
    gender: "F",
    last_location: "La Guaira, zona Playa Pantaleta",
    description: "Estaba en La Guaira cuando ocurrió el terremoto del 24 de junio.",
    contact_whatsapp: "00000000000",
    contact_relation: "Familiar",
  },
];

import { geocodeFromText } from "../src/lib/geocode";

function findSourceFile(filename: string): string {
  const files = fs.readdirSync(SOURCE_DIR);
  const match = files.find((f) => f.includes(filename.replace(".png", "")));
  if (!match) throw new Error(`No se encontró: ${filename}`);
  return path.join(SOURCE_DIR, match);
}

async function cropPhoto(person: SeedPerson): Promise<Buffer> {
  const src = findSourceFile(person.sourceFile);
  const { left, top, width, height } = person.crop;
  return sharp(src)
    .extract({ left, top, width, height })
    .resize(600, 600, { fit: "cover", position: "centre" })
    .jpeg({ quality: 88 })
    .toBuffer();
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = url && key ? createClient(url, key) : null;

  if (!supabase) {
    console.log("⚠️  Sin .env.local — solo se recortarán fotos en public/personas/");
  }

  let ok = 0;
  let fail = 0;

  for (const person of PERSONS) {
    try {
      const buffer = await cropPhoto(person);
      const filename = `${person.id}.jpg`;
      const localPath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(localPath, buffer);
      console.log(`✂️  Recortado: ${person.name} → public/personas/${filename}`);

      let photoUrl = `/personas/${filename}`;
      const coords = geocodeFromText(person.last_location);

      if (supabase) {
        const storageName = `seed-${person.id}-${Date.now()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from("person-photos")
          .upload(storageName, buffer, { contentType: "image/jpeg", upsert: true });

        if (uploadError) {
          console.warn(`   ⚠ Storage falló (${person.name}): ${uploadError.message} — usando /public`);
        } else {
          const { data } = supabase.storage.from("person-photos").getPublicUrl(storageName);
          photoUrl = data.publicUrl;
        }

        const { error: insertError } = await supabase.from("persons").insert({
          name: person.name,
          age: person.age ?? null,
          gender: person.gender ?? null,
          last_location: person.last_location,
          latitude: coords.lat,
          longitude: coords.lng,
          description: person.description ?? null,
          cedula: person.cedula ?? null,
          photo_url: photoUrl,
          status: "missing",
          contact_name: person.contact_name ?? null,
          contact_whatsapp: person.contact_whatsapp,
          contact_relation: person.contact_relation ?? null,
        });

        if (insertError) {
          console.error(`   ✗ DB error (${person.name}): ${insertError.message}`);
          fail++;
        } else {
          console.log(`   ✓ Insertado en Supabase`);
          ok++;
        }
      } else {
        ok++;
      }
    } catch (err) {
      console.error(`✗ ${person.name}:`, err instanceof Error ? err.message : err);
      fail++;
    }
  }

  console.log(`\nListo: ${ok} exitosos, ${fail} fallidos (${PERSONS.length} total)`);
  if (!supabase) {
    console.log("\nPara cargar en Supabase, crea .env.local y ejecuta: npm run seed:persons");
  }
}

main();
