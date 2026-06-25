import type { Person, PersonReportData, PersonSearchQuery, PersonStats } from "@/types/person";
import { MOCK_PERSONS } from "./mock-data";
import { geocodeFromText } from "./geocode";
import { isSupabaseConfigured } from "./supabase/server";
import { createClient } from "./supabase/server";

export async function getPersons(): Promise<Person[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_PERSONS;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("persons")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching persons:", error.message);
    return MOCK_PERSONS;
  }

  return data ?? [];
}

export async function getStats(): Promise<PersonStats> {
  const persons = await getPersons();
  return {
    totalReportados: persons.length,
    sinContacto: persons.filter((p) => p.status === "missing").length,
    localizados: persons.filter((p) => p.status === "found").length,
  };
}

export async function searchPersons(query: PersonSearchQuery): Promise<Person[]> {
  if (!isSupabaseConfigured()) {
    return filterMockPersons(query);
  }

  const supabase = await createClient();
  let builder = supabase.from("persons").select("*");

  if (query.name?.trim()) {
    builder = builder.ilike("name", `%${query.name.trim()}%`);
  }

  if (query.location?.trim()) {
    builder = builder.ilike("last_location", `%${query.location.trim()}%`);
  }

  if (query.age) {
    const minAge = Math.max(0, query.age - 3);
    const maxAge = query.age + 3;
    builder = builder.gte("age", minAge).lte("age", maxAge);
  }

  if (query.gender) {
    builder = builder.eq("gender", query.gender);
  }

  if (query.status && query.status !== "all") {
    builder = builder.eq("status", query.status);
  }

  const { data, error } = await builder.order("created_at", { ascending: false });

  if (error) {
    console.error("Error searching persons:", error.message);
    return filterMockPersons(query);
  }

  return data ?? [];
}

function filterMockPersons(query: PersonSearchQuery): Person[] {
  return MOCK_PERSONS.filter((person) => {
    if (query.name?.trim()) {
      const name = query.name.trim().toLowerCase();
      if (!person.name.toLowerCase().includes(name)) return false;
    }
    if (query.location?.trim()) {
      const loc = query.location.trim().toLowerCase();
      if (!person.last_location.toLowerCase().includes(loc)) return false;
    }
    if (query.age && person.age) {
      if (Math.abs(person.age - query.age) > 3) return false;
    }
    if (query.gender && person.gender !== query.gender) return false;
    if (query.status && query.status !== "all" && person.status !== query.status) {
      return false;
    }
    return true;
  });
}

export async function createPerson(data: PersonReportData): Promise<Person> {
  const coords = geocodeFromText(data.last_location);

  if (!isSupabaseConfigured()) {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      name: data.name,
      age: data.age ?? null,
      gender: data.gender ?? null,
      last_location: data.last_location,
      latitude: coords.lat,
      longitude: coords.lng,
      description: data.description ?? null,
      cedula: data.cedula ?? null,
      photo_url: data.photo_url ?? null,
      status: "missing",
      contact_name: data.contact_name ?? null,
      contact_whatsapp: data.contact_whatsapp,
      contact_relation: data.contact_relation ?? null,
      contact_info: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    MOCK_PERSONS.unshift(newPerson);
    return newPerson;
  }

  const supabase = await createClient();
  const { data: created, error } = await supabase
    .from("persons")
    .insert({
      name: data.name,
      age: data.age ?? null,
      gender: data.gender ?? null,
      last_location: data.last_location,
      latitude: coords.lat,
      longitude: coords.lng,
      description: data.description ?? null,
      cedula: data.cedula ?? null,
      photo_url: data.photo_url ?? null,
      contact_name: data.contact_name ?? null,
      contact_whatsapp: data.contact_whatsapp,
      contact_relation: data.contact_relation ?? null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return created;
}
