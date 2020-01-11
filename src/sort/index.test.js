import { bubble } from './index';

expect.extend({
  isSameArrayObject(received, target) {
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

const testCases = [
  {
    input: [1],
    output: [1],
  }, 
  {
    input: [2, 1],
    output: [1, 2],
  }, 
  {
    input: [12, 645, 21, 90, 53, 81, 12, 9, 89, 50, 39, 73],
    output: [9, 12, 12, 21, 39, 50, 53, 73, 81, 89, 90, 645],
  }
];

describe('冒泡', () => {
  testCases.forEach(({ input, output }) => {
    it('排序测试', () => {
      expect(bubble(input)).isSameArrayObject(output);
    })
  });
});
