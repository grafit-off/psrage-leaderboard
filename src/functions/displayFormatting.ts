// Display formatting functions (for UI)
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

export const formatDecimal = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

export const formatInteger = (value: number): string => {
  return Math.round(value).toString();
};

export const formatADR = (value: number): string => {
  return value.toFixed(1);
};

export const formatKDRatio = (value: number): string => {
  return value.toFixed(2);
};
