import { removeRepeat, flat } from './index';

describe('array extend method test', () => {
  it('delete the repeat', () => {
    expect(
      removeRepeat([1, 2, 3, 3, 4, 4])
    ).toEqual([1, 2, 3, 4]);
  });

  it('flat the array', () => {
    expect(
      flat([1,2, [3, [4, 5], 6], [7], 8])
    ).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  })
});
