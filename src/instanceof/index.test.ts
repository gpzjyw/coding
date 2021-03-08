import { customInstanceof } from './index';

describe('instanceof判断实现', () => {
  it ('对象判断成功', () => {
    expect(customInstanceof({}, Object)).toBeTruthy();
  });
  it ('数组判断成功', () => {
    expect(customInstanceof([1,2,3], Object)).toBeTruthy();
  });
  it ('数组判断成功', () => {
    expect(customInstanceof(null, Object)).toBeFalsy();
  });
});

