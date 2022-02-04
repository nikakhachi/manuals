export default (n: number, start1: number, stop1: number, start2: number, stop2: number) => {
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  return newval;
};
