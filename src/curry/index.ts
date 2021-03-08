// 函数柯里化
function curry(fn: Function) {
  const length = fn.length;
  function wrapFunc(...restArgs) {
    if (restArgs.length < length) {
      return function (...secondArgs) {
        return wrapFunc(...restArgs, ...secondArgs);
      }
    } else {
      return fn.apply(null, restArgs);
    }
  }
  return wrapFunc;
}

export { curry };
