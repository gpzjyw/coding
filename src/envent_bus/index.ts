
interface ICallback {
  (...val: any[]): void;
}

class EventBus {
  private eventMap: Map<string, ICallback[]>;
  
  constructor() {
    this.eventMap = new Map();
  }

  public add(name: string, callback: ICallback) {
    const funcArr = this.eventMap.get(name);
    if (Array.isArray(funcArr)) {
      funcArr.push(callback);
    } else {
      this.eventMap.set(name, [callback]);
    }
    return this;
  }

  public emit(name: string, ...args: any[]) {
    const funcArr = this.eventMap.get(name);
    if (funcArr && funcArr.length > 0) {
      const res = [];
      funcArr.forEach((func) => {
        res.push(func.call(null, ...args));
      })
      return res;
    }
  }

  public delete(name: string, funcRef?: ICallback) {
    const funcArr = this.eventMap.get(name);
    if (funcArr && funcArr.length > 0) {
      if (funcRef) {
        const matchIndex = funcArr.findIndex(func => func === funcRef);
        if (matchIndex > -1) {
          funcArr.splice(matchIndex, 1);
        }
      } else {
        this.eventMap.delete(name);
      }
    } else {
      return false;
    }
  }
}

export default EventBus;
