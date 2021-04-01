/*
 * @lc app=leetcode.cn id=146 lang=javascript
 *
 * [146] LRU 缓存机制
 */

// @lc code=start
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  function initListNode() {
    const head = {
      prev: null,
      next: null,
    };
    const end = {
      prev: head,
      next: null,
    };
    head.next = end;
    return { head, end };
  }
  
  this.valueMap = {};
  this.headEnd = initListNode();
  this.maxSize = capacity;
  this.size = 0;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.valueMap[key]) {
    const node = this.valueMap[key];
    // 取出节点
    this.extractNode(node);
    // 插入最后
    this.insertBefore(node, this.headEnd.end);
    return this.valueMap[key].value;
  } else {
    return -1;
  }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.valueMap[key]) {
    const node = this.valueMap[key];
    node.value = value;
    this.extractNode(node);
    this.insertBefore(node, this.headEnd.end);
  } else if (this.size === this.maxSize) {
    const deletedNode = this.headEnd.head.next;
    this.extractNode(deletedNode);
    delete this.valueMap[deletedNode.key];
    this.insertBefore({
      value,
      key,
      prev: null,
      next: null,
    }, this.headEnd.end);
  } else {
    this.size += 1;
    this.insertBefore({
      value,
      key,
      prev: null,
      next: null,
    }, this.headEnd.end);
  }
};

LRUCache.prototype.extractNode = function(node) {
  const prevNode = node.prev;
  const nextNode = node.next;
  prevNode.next = nextNode;
  nextNode.prev = prevNode;
}

LRUCache.prototype.insertBefore = function(node, targetNode) {
  node.prev = targetNode.prev;
  node.next = targetNode;
  targetNode.prev.next = node;
  targetNode.prev = node;
  this.valueMap[node.key] = node;
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end

