export const dateDiffInMillis = (dateA, dateB) => {
  const dateAInMillis = dateA.getTime();
  const dateBInMillis = dateB.getTime();

  return Math.abs(dateBInMillis - dateAInMillis);
};

export const dateDiffInDays = (dateA, dateB) => {
  const diffInMillis = dateDiffInMillis(dateA, dateB);
  const differenceInDays = diffInMillis / (1000 * 60 * 60 * 24);

  return differenceInDays;
};
