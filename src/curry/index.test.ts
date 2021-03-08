import { curry } from './index';

function addThree (x, y, z) {
  return x + y + z;
}

describe('curry function test', () => {
  const curried = curry(addThree);
  it('function with three parameter', () => {
    expect(curried(1,2,3)).toBe(6);
    expect(curried(1)(2,3)).toBe(6);
    expect(curried(1)(2)(3)).toBe(6);
  });
});
