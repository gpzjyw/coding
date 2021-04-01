import { customInstanceof } from './index';

describe('instanceof判断实现', () => {
  it('object test', () => {
    expect(customInstanceof({}, Object)).toBeTruthy();
  });
  it('arr test', () => {
    expect(customInstanceof([1,2,3], Object)).toBeTruthy();
  });
  it('null test', () => {
    expect(customInstanceof(null, Object)).toBeFalsy();
  });
  it('array is not String instance', () => {
    expect(customInstanceof([1, 2, 3], String)).toBeFalsy();
  });

  class A {
    private data: number[]
    constructor() {
      this.data = [];
    }

    toString() {
      return 'this is A';
    }

    getData() {
      return this.data;
    }
  }

  class B extends A {
    private obj: {}
    constructor() {
      super();
      this.obj = {};
    }

    test() {
      return 'this is B';
    }

    getObj() {
      return this.obj;
    }
  }

  const a = new A();
  const b = new B();

  const testArr = [
    [a, A],
    [a, B],
    [b, A],
    [b, B],
  ]

  testArr.forEach(([instance, fn]) => {
    it(`${instance} instanceOf ${fn}`, () => {
      expect(customInstanceof(instance, fn)).toBe(instance instanceof fn);
    })
  });
});

