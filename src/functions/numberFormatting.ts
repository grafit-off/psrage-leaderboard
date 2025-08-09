export const formatNumber = (value: string | number): number => {
  if (typeof value === 'number') {
    return value;
  }
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    return 0;
  } else {
    return parsed;
  }
};
