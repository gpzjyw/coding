/*
 * @lc app=leetcode.cn id=442 lang=javascript
 *
 * [442] 数组中重复的数据
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
  const arr = [];
  nums.forEach((num, index) => {
    const current = Math.abs(num);
    if (nums[current - 1] > 0) {
      nums[current - 1] = -1 * nums[current - 1];
    } else {
      arr.push(current);
    }
  });
  
  return arr;
};
// @lc code=end

