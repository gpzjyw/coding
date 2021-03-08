const nullTag = 'null';
const undefinedTag = 'undefined';
const stringTag = 'string';
const numberTag = 'number';
const biginitTag = 'bigint';
const booleanTag = 'boolean';
const symbolTag = 'symbol';

const objectTag = 'object';
const arrayTag = 'array';
const funtionTag = 'function';

const setTag = 'set';
const mapTag = 'map';

export const isObject = (target) => {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

const getType = input => Object.prototype.toString.call(input).slice(8, -1).toLowerCase();

function cloneFunc(func: Function) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log('匹配到函数体：', body[0]);
      if (param) {
          const paramArr = param[0].split(',');
          console.log('匹配到参数：', paramArr);
          return new Function(...paramArr, body[0]);
      } else {
          return new Function(body[0]);
      }
    } else {
        return null;
    }
  } else {
    // 箭头函数
    eval(funcString);
  }
}

// 基本类型、对象、函数
export const deepClone = (target: any, circleRef = new WeakMap()) => {
  // 非引用类型
  if (!isObject(target)) {
    return target;
  }

  const type = getType(target);

  if (circleRef.has(target)) {
    return circleRef.get(target);
  }

  // 引用类型处理
  switch (type) {
    case funtionTag:
      return cloneFunc(target);
    case arrayTag:
      // 数组
      const initArr = new Array;
      circleRef.set(target, initArr);
      target.forEach((item) => {
        initArr.push(deepClone(item, circleRef));
      });
      return initArr;
    case mapTag:
      // Map
      const initMap = new Map();
      circleRef.set(target, initMap);
      for (const ele of target) {
        initMap.set(deepClone(ele[0], circleRef), deepClone(ele[1], circleRef));
      }
      return initMap;
    case setTag:
      // Set
      const initSet = new Set();
      circleRef.set(target, initSet);
      for (const ele of target) {
        initSet.add(deepClone(ele, circleRef));
      }
      return initSet;
    default:
      const initObj = {};
      circleRef.set(target, initObj);
      for (const key in target) {
        initObj[key] = deepClone(target[key], circleRef);
      }
      return initObj;
  }
}
