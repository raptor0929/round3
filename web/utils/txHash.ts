export const createFakeTxHash = (): string => {
  return [...Array(64)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
};
