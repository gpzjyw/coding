// 查询字符串的解析

const arrReg = /\[\]/;

export function queryParse(url: string) {
  const queryString = url.slice(url.indexOf('?') + 1);
  const arr = queryString.split('&');
}