export function isDayValid(day: string): boolean {
  const validDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const lowercaseDay = day.toLowerCase();

  return validDays.includes(lowercaseDay);
}
