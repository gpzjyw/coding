// 去重
export function removeRepeat(arr: any[]) {
  return Array.from(new Set(arr));
}

type arrItem = number | string | null | Object | arrItem[];

// 扁平
export function flat(arr: arrItem[]) {
  const res = [];
  arr.forEach((item)=> {
    if (Array.isArray(item)) {
      res.push(...flat(item));
    } else {
      res.push(item);
    }
  });
  return res;
}

// 最值

