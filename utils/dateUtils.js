// utils/dateUtils.js
export const getDateRange = (query) => {
  const start = query.startDate || "2025-01-01";
  const end = query.endDate || "2025-12-31";
  return { start, end };
};