type WorkTag = 
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

type Lane = number;

interface Update<State> {
  eventTime: number,
  lane: Lane,
  tag: 0 | 1 | 2 | 3,
  payload: any,
  callback: (() => unknown) | null,
  next: Update<State> | null,
}

interface SharedQueue<State> {
  pending: Update<State> | null,
}

interface UpdateQueue<State> {
  baseState: State,
  firstBaseUpdate: Update<State> | null,
  lastBaseUpdate: Update<State> | null,
  shared: SharedQueue<State>,
  effects: Array<Update<State>> | null,
};

/**
 * 通过该函数创建Update
 */
type createUpdate = (eventTime: number, lane: Lane)=> Update<any>;

/**
 * 通过该函数将Update入队（单向环形链表）
 */
type enqueueUpdate = <State>(fiber: Fiber, update: UpdateQueue<State>) => void;

// 最小计算单元
interface Fiber {
  workTag: WorkTag;
  key: null | string;
  elementType: any;
  type: any;
  stateNode: any;

  // 父节点
  return: Fiber | null;
  // 子节点
  child: Fiber | null;
  // 兄弟节点
  sibling: Fiber | null;
  index: number;

  pendingProps: any;
  memoizedProps: any;
  memoizedState: any;

  // 更新队列
  updateQueue: unknown | UpdateQueue<any>;

  mode: number;

  nextEffect: Fiber | null;
  firstEffect: Fiber | null;
  lastEffect: Fiber | null;

  alternate: Fiber | null;

}

// hook中使用的Update
interface HookUpdate<S, A> {
  lane: Lane;
  action: A,
  eagerReducer: ((arg1: S, arg2: A) => S) | null,
  eagerState: S | null,
  next: HookUpdate<S, A>, 
  priority?: number,
}

interface HookUpdateQueue<S, A> {
  pending: HookUpdate<S, A> | null;
  dispatch: ((param: A) => unknown) | null;
  lastRenderedReducer: ((S, A) => S) | null;
  lastRenderedState: S | null;
}

interface Hook {
  memoizedState: any,
  baseState: any,
  baseQueue: HookUpdate<any, any> | null,
  queue: HookUpdateQueue<any, any> | null,
  next: Hook | null, // 同一个hook的其他Update构成的链表
}
