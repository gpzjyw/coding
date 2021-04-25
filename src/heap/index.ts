interface ITreeNode {
  val: number;
  left?: ITreeNode;
  right?: ITreeNode;
}

class TreeNode implements ITreeNode {
  val: number;
  left?: ITreeNode;
  right?: ITreeNode;
  constructor(val: number, left?: ITreeNode, right?: ITreeNode) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
}

class Heap {
  private heapArr: number[];
  constructor(props: number[]) {
    this.heapArr = [...props];
    this.heapify();
  }

  treeHeapify() {
    
  }

  heapify() {
    const level = this.getLevel();
    for (let i = level - 1; i >= 0; i -= 1) {

    }
  }

  insert() {

  }

  getParentIndex(currentIndex: number) {
    if (currentIndex === 0) {
      return -1;
    }
    return Math.floor((currentIndex - 1) / 2);
  }

  getChildIndex(currentIndex: number) {
    return [2 * currentIndex + 1, 2 * currentIndex + 2];
  }

  getLevelIndexRange(level: number) {
    return [Math.pow(2, level) - 1, Math.pow(2, level + 1) - 1];
  }

  getLevel() {
    return Math.ceil(Math.sqrt(this.heapArr.length + 1));
  }

  getSize() {
    return this.heapArr.length;
  }
}