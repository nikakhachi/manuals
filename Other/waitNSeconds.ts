const waitNSeconds = (n: number) =>
  new Promise((res, rej) => setTimeout(() => res(""), n * 1000));

export { waitNSeconds };
