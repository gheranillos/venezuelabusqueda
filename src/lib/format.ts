export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-VE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
