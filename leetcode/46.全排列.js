/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  const usedNums = {};
  const res = [];

  const dfs = (path) => {
    if (path.length === nums.length) {
      res.push(path);
      return;
    } else {
      const unUsed = nums.filter(item => !usedNums[item]);
      unUsed.forEach((item) => {
        usedNums[item] = true;
        dfs([...path, item]);
        usedNums[item] = false;
      });
    }
  }
  
  dfs([]);

  return res;
};
// @lc code=end

