

export function delay(fn: Function, time: number) {
  return function() {
    setTimeout(fn, time);
  }
}

const now = () => new Date().getTime();

export function throttle(fn: Function, time: number, context?: Object) {
  let prev = 0;
  return function(...args) {
    if (now() - prev >= time) {
      prev = now();
      fn.apply(context, args);
    }
  }
}

export function debounce(fn: Function, time: number, context?: Object) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => fn.apply(context, args), time);
  }
}