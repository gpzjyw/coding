import EventBus from './index';

function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function muluti(a, b) {
  return a * b;
}

const event = new EventBus();

event.add('plus', plus);

event.add('plus and minus', plus);
event.add('plus and minus', minus);

describe('eventbus 测试', () => {
  it('加法测试', () => {
    expect(event.emit('plus', 1, 5)).toEqual([6]);
  })
  it('加法减法测试', () => {
    expect(event.emit('plus and minus', 10, 4)).toEqual([14, 6]);
  })
  it('事件删除测试', () => {
    event.delete('plus and minus');
    expect(event.emit('plus and minus', 10, 4)).toBeUndefined;
    expect(event.emit('plus', 1, 5)).toEqual([6]);
  })
});
