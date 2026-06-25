/** Normaliza teléfono venezolano y genera enlace wa.me */
export function whatsappUrl(phone: string | null | undefined): string | null {
  if (!phone?.trim()) return null;

  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || /^0+$/.test(digits)) return null;

  let normalized = digits;
  if (normalized.startsWith("0")) {
    normalized = `58${normalized.slice(1)}`;
  } else if (!normalized.startsWith("58")) {
    normalized = `58${normalized}`;
  }

  return `https://wa.me/${normalized}`;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }
  return phone;
}

export function hasReporterContact(person: {
  contact_whatsapp: string;
  contact_name?: string | null;
}): boolean {
  return Boolean(whatsappUrl(person.contact_whatsapp) || person.contact_name?.trim());
}
