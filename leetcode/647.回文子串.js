/*
 * @lc app=leetcode.cn id=647 lang=javascript
 *
 * [647] 回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function(s) {
  const res = [];

  const getSubstring = (left, right) => {
    if (left < 0 || right >= s.length) {
      return;
    }
    if (s[left] === s[right]) {
      res.push(s.slice(left, right - left + 1));
      getSubstring(left - 1, right + 1);
    }
  }

  // 中心拓展
  for (let i = 0; i <= s.length; i += 0.5) {
    const left = Math.floor(i);
    const right = Math.ceil(i);
    getSubstring(left, right);
  }
  return res.length;
};
// @lc code=end

