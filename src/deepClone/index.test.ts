import { deepClone } from './index';

expect.extend({
  isSuccessClone(received, target) {
    if (received === target) {
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
  }
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
  }
];

describe('深拷贝结果比较', () => {
  testCase.forEach(({ input }) => {
    it('结果比较', () => {
      expect(deepClone(input)).isSuccessClone(input);
    });
  })
});
