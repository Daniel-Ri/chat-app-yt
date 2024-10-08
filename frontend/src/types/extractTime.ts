export function extractTime(dateString: string) {
  const data = new Date(dateString);
  const hours = padZero(data.getHours());
  const minutes = padZero(data.getMinutes());
  return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
function padZero(number: number) {
  return number.toString().padStart(2, "0");
}
