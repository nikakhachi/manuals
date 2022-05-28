const pickHighest = (obj: any, num = 1) => {
  const requiredObj: any = {};
  if (num > Object.keys(obj).length) {
    return false;
  }
  Object.keys(obj)
    .sort((a, b) => obj[b].length - obj[a].length)
    .forEach((key, ind) => {
      // if (ind < num) {
      //   requiredObj[key] = obj[key].length;
      // }
      requiredObj[key] = obj[key].length;
    });
  return requiredObj;
};
