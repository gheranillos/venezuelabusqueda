export type PersonStatus = "missing" | "found";
export type PersonGender = "M" | "F" | "other";

export interface Person {
  id: string;
  name: string;
  age: number | null;
  gender: PersonGender | null;
  last_location: string;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  cedula: string | null;
  photo_url: string | null;
  status: PersonStatus;
  contact_name: string | null;
  contact_whatsapp: string;
  contact_relation: string | null;
  contact_info: string | null;
  created_at: string;
  updated_at: string;
}

export interface PersonSearchQuery {
  name?: string;
  location?: string;
  age?: number;
  gender?: string;
  status?: PersonStatus | "all";
  photoFile?: File | null;
}

export interface PersonReportData {
  name: string;
  age?: number;
  gender?: PersonGender;
  last_location: string;
  description?: string;
  cedula?: string;
  photo_url?: string;
  contact_name?: string;
  contact_whatsapp: string;
  contact_relation?: string;
}

export interface PersonStats {
  totalReportados: number;
  sinContacto: number;
  localizados: number;
}
