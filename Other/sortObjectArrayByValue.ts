const sortObjectArrayByValue = (array: Record<string, any>[], prop: string) =>
  array.sort((a, b) => {
    const keyA = a[prop];
    const keyB = b[prop];
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });
