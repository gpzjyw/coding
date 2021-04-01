/*
 * @lc app=leetcode.cn id=912 lang=javascript
 *
 * [912] 排序数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  function divideSort (left, right) {
    if (left >= right) {
      return;
    }
    if (right - left === 1) {
      if (nums[left] > nums[right]) {
        return [nums[left], nums[right]] = [nums[right], nums[left]];
      }
      return;
    }

    const baseVal = nums[left];

    let leftPoint = left;
    let rightPoint = right;

    while (leftPoint < rightPoint) {

      while (leftPoint < rightPoint && nums[rightPoint] >= baseVal) {
        rightPoint -= 1;
      }

      while (leftPoint < rightPoint && nums[leftPoint] <= baseVal) {
        leftPoint += 1;
      }

      if (leftPoint < rightPoint) {
        [nums[leftPoint], nums[rightPoint]] = [nums[rightPoint], nums[leftPoint]];
        rightPoint -= 1;
      }
    }

    [nums[left], nums[rightPoint]] = [nums[rightPoint], nums[left]];

    divideSort(left, rightPoint);
    divideSort(rightPoint + 1, right);
  }

  divideSort(0, nums.length - 1);
  return nums;
};
// @lc code=end

