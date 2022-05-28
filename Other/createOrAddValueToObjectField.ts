const createOrAddValueToObjectField = (
  object: Record<string, number>,
  field: string
) => {
  if (!object.hasOwnProperty(field)) {
    object[field] = 1;
  } else {
    object[field]++;
  }
};
