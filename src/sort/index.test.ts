import { bubble, quick, quick2, quickLoop, mergeSort } from './index';

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
    input: [1, 2, 3],
    output: [1, 2, 3],
  },
  {
    input: [12, 645, 21, 90, 53, 81, 12, 9, 89, 50, 39, 73],
    output: [9, 12, 12, 21, 39, 50, 53, 73, 81, 89, 90, 645],
  },
  {
    input: [1, 2, 3, 4, 5, 6],
    output: [1, 2, 3, 4, 5, 6]
  },
  {
    input: [6, 5, 4, 3, 2, 1],
    output: [1, 2, 3, 4, 5, 6]
  }
];

describe('冒泡', () => {
  testCases.forEach(({ input, output }) => {
    it('排序测试', () => {
      expect(bubble(input)).isSameArrayObject(output);
    })
  });
});

describe('快排', () => {
  testCases.forEach(({ input, output }) => {
    it('排序测试', () => {
      expect(quick(input)).isSameArrayObject(output);
    })
  });
});

describe('快排(先右后左)', () => {
  testCases.forEach(({ input, output }) => {
    it('排序测试', () => {
      expect(quick2(input)).isSameArrayObject(output);
    })
  });
});

describe('快排（非递归）', () => {
  testCases.forEach(({ input, output }) => {
    it('排序测试', () => {
      expect(quickLoop(input)).isSameArrayObject(output);
    })
  });
});

describe('归并排序', () => {
  testCases.forEach(({ input, output }) => {
    it('排序测试', () => {
      expect(mergeSort(input)).isSameArrayObject(output);
    })
  });
});
