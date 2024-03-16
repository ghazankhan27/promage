export function getStartEndOfDay(epochInMs: number) {
  const startDate = new Date(epochInMs);
  const endDate = new Date(epochInMs);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const startDay = startDate.getDate();

  endDate.setDate(startDay + 1);

  return {
    startTime: startDate,
    endTime: endDate,
  };
}
