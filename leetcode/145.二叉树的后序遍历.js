/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {

  const res = [];
  const stack = [];

  if (root) {
    stack.push(root);
  }

  while (stack.length > 0) {
    const currentNode = stack.pop();

    res.unshift(currentNode.val);

    if (currentNode.left) {
      stack.push(currentNode.left);
    } 
    
    if (currentNode.right) {
      stack.push(currentNode.right);
    }
    
  }

  return res;


};
// @lc code=end

