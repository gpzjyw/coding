

function bind(fn: Function, target: Object, ...args: any[]) {
  return function(...restArgs: any[]) {
    return fn.apply(target, args.concat(restArgs));
  }
}