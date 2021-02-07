const getType = input => Object.prototype.toString.call(input).slice(8, -1).toLowerCase();

export const deepClone = (obj) => {
  const type = getType(obj);
  if (type === 'object') {
    const res = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (['object', 'array'].includes(getType(obj[key]))) {
          res[key] = deepClone(obj[key]);
        } else {
          res[key] = obj[key];
        }
      }
    }
    return res;
  } else if (type === 'array') {
    const target = [];
    for (const key in obj) {
      if (['object', 'array'].includes(getType(obj[key]))) {
        target.push(deepClone(obj[key]));
      } else {
        target.push(obj[key]);
      }
    }
    return target;
  }
}