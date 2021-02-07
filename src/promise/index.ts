
interface IResolve {
  (val: any): void;
}

interface IReject {
  (val: any): void;
}

interface IFn {
  (resolve: IResolve, reject: IReject): void;
}

interface ICallback {
  (val?: any): any;
}

class PromiseM {
  private resolveCallbacks: ICallback[];
  private rejectCallbacks: ICallback[];
  private state: 'pending' | 'fulfilled' | 'rejected';

  constructor(fn) {
    setTimeout(() => fn(this.resolve, this.reject), 0);
    this.resolveCallbacks = [];
    this.rejectCallbacks = [];
    this.state = 'pending';
  }

  then = (callback: ICallback, rejectCallback?: ICallback) => {
    this.resolveCallbacks.push(callback);
    if (rejectCallback) {
      this.rejectCallbacks.push(rejectCallback);
    }
    return this;
  }

  resolve = (val) => {
    this.state = 'fulfilled';
    this.resolveCallbacks.reduce((prev, fn) => fn(prev), val);
  }

  reject = (val) => {
    this.state = 'rejected';
    this.rejectCallbacks.reduce((prev, fn) => fn(prev), val);
  }
}

new PromiseM((resolve, reject) => {
  setTimeout(() => resolve(true), 1000);
}).then((res) => {
  console.log(res);
}).then((res) => {
  console.log('second then', res);
});
