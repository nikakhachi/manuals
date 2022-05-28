const getAllIndexesOfValuesInArray = (array: any[], valueArray: any[]) => {
  const indexes = [];

  for (let index = 0; index < array.length; index++) {
    if (valueArray.includes(array[index])) {
      indexes.push(index);
    }
  }
  return indexes;
};
