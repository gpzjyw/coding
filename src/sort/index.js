export const bubble = (arr) => {
  const length = arr.length;
  if (length <= 1) {
    return arr;
  }
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j < length - i; j += 1) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};
