"use server";

import { createPerson, searchPersons } from "@/lib/persons";
import type { PersonReportData, PersonSearchQuery } from "@/types/person";

export async function searchPersonsAction(query: PersonSearchQuery) {
  return searchPersons(query);
}

export async function createPersonAction(data: PersonReportData) {
  return createPerson(data);
}
