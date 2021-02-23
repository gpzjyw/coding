import { deepClone, isObject } from './index';

const isSuccessClone = (received, target) => {
  if (isObject(received) && received === target) {
    return {
      message: () => '这是浅拷贝的结果',
      pass: false,
    }
  }
  const pass = JSON.stringify(received) === JSON.stringify(target);
  if (pass) {
    return {
      message: () => '比对通过',
      pass: true,
    };
  } else {
    return {
      message: () => {
        console.log(received);
        return '比对不通过';
      },
      pass: false,
    };
  }
};

const mapSuccessClone = (received: Map<any, any>, target: Map<any, any>) => {
  if (received === target) {
    return {
      message: () => '这是浅拷贝的结果',
      pass: false,
    }
  }
  for (const item of received) {
    if (isObject(item)) {
      if (target.get(item)) {
        console.warn(item);
        return {
          message: () => 'Map的某个为对象的key未进行深拷贝',
          pass: false,
        }
      }
    } else {
      const res = isSuccessClone(received.get(item), target.get(item));
      if (!res.pass) {
        console.warn(item);
        return res;
      }
    }
  }
  return {
    message: () => '比对通过',
    pass: true,
  };
}

const setSuccessClone = (received: Set<any>, target: Set<any>) => {
  if (received === target) {
    return {
      message: () => '这是浅拷贝的结果',
      pass: false,
    }
  }
  for (const item of received) {
    if (isObject(item)) {
      if (target.has(item)) {
        console.warn(item);
        return {
          message: () => 'Set中的某项未进行深拷贝',
          pass: false,
        }
      }
    } else if (!target.has(item)) {
      console.warn(item);
      return  {
        message: () => '这是浅拷贝的结果',
        pass: false,
      };
    }
  }
  return {
    message: () => '比对通过',
    pass: true,
  };
}

expect.extend({
  isSuccessClone,
  mapSuccessClone,
  setSuccessClone,
});

const testCase = [
  { input: { name: 1 } },
  { input: [2,3,4] },
  {
    input: { name: { secend: [1,2,3] } },
  },
  {
    input: [
      { name: 10 }, 
      [1, 2, { name: 100 }], 
      { arr: [1, 2, 3] },
    ]
  },
  {
    input: [null, true],
  }
];

describe('深拷贝结果比较', () => {
  testCase.forEach(({ input }) => {
    it('普通数组、对象的嵌套结构', () => {
      expect(deepClone(input)).isSuccessClone(input);
    });
  })

  it('Map结构', () => {
    const mapDemo = new Map();
    mapDemo.set('name', 12);
    expect(deepClone(mapDemo)).mapSuccessClone(mapDemo);
    const objKey = { name: 'a object in map' };
    mapDemo.set(objKey, 'hahaha');
    expect(deepClone(mapDemo)).mapSuccessClone(mapDemo);
  });

  it('Set结构', () => {
    const setDemo = new Set<any>([1, 2, null]);
    expect(deepClone(setDemo)).setSuccessClone(setDemo);
    setDemo.add({ name: 'a object in set' });
    expect(deepClone(setDemo)).setSuccessClone(setDemo);
  });

  it('循环引用拷贝', () => {
    const objDemo: any = { 
      name: 'jipeng', 
      next: { level: 2 },
    };
    const tempObj: any = { level: 3 };
    tempObj.next = tempObj;
    objDemo.next.next = tempObj;
    const clonedObjDemo = deepClone(objDemo);
    expect(clonedObjDemo.next.next.next === clonedObjDemo.next.next && clonedObjDemo.next.next !== tempObj).toBe(true);

    const setDemo: Set<number | any> = new Set([1,2,3]);
    setDemo.add(setDemo);
    const clonedSet = deepClone(setDemo);

    expect(setDemo !== clonedSet && clonedSet.has(clonedSet)).toBe(true);
  });
});
