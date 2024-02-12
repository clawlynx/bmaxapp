export const findOverall = async (total) => {
  let overall = Number(total) / 4;
  const rounded = Math.round(overall * 100) / 100; // Round to 2 decimal places

  const decimalPart = rounded - Math.floor(rounded);

  if (decimalPart < 0.25) {
    return Math.floor(rounded);
  } else if (decimalPart >= 0.25 && decimalPart < 0.75) {
    return Math.floor(rounded) + 0.5;
  } else {
    return Math.ceil(rounded);
  }
};
