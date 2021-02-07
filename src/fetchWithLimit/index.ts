const MAX = 6;

let count = 0;
const waitQueue = [];

const execFetch = () => {

}

const fetchWithLimit = (input, init) => {
  const wrapRequest = () => fetch(input, init).then(res => {
    count -= 1;
    return res;
  }, err => {
    count -= 1;
    throw err;
  });

  if (count < MAX) {
    count += 1;
    return wrapRequest();
  } else {
    waitQueue.push(wrapRequest);
  }
}

class FetchWidthLimit {
  private count: number;
  private waitQueue: any[];

  constructor() {
    this.waitQueue = [];
  }

  checkQueue() {
    if (this.waitQueue.length > 0) {
      const targetRequest = this.waitQueue.shift();
      execFetch()
    }
  }

  execFetch() {

  }

  addFetch(url, init) {
    if (this.count < MAX) {

    } else {

    }
  }

  thenCallback(res) {
    this.finishCallback();
    return res;
  }

  errCallback(err) {
    this.finishCallback();
    throw err;
  }

  beginCallback() {
    this.count += 1;
  }

  finishCallback() {
    this.count -= 1;
  }
}