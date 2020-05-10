export const createStore = (initialState) => {
  const keys = Object.keys(initialState);
  return keys.reduce(
    (acc, key) => {
      acc[key] = { key };
      return acc;
    },
    { initialState }
  );
};
