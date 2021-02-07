/**
 * 冒泡
 * @param nums 
 */
export const bubble = (nums: number[]) => {
  for (let i = 0; i < nums.length - 1; i += 1) {
    for (let j = 0; j < nums.length - i - 1; j += 1) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
  }
  return nums;
}

/**
 * quick sort (recursion)
 * @param nums 
 */
export const quick = (nums: number[]) => {
  const partition = (start: number, end: number) => {
    if (end - start <= 0) {
      return;
    }
    if (end - start === 1) {
      if (nums[start] > nums[end]) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
      }
      return;
    }
    
    let l = start + 1;
    let r = end;
    while (l < r) {
      if (nums[l] > nums[start]) {
        while (l < r) {
          if (nums[r] < nums[start]) {
            [nums[l], nums[r]] = [nums[r], nums[l]];
            break;
          } 
          r -= 1;
        }
      } 
      l += 1;
    }

    // l与r相遇时，存在如下两种情况：r指向值未进行与基准值比较；r遍历过程未找到能与l进行交换的值
    if (nums[r] > nums[start]) {
      [nums[start], nums[r - 1]] = [nums[r - 1], nums[start]]
    } else {
      [nums[start], nums[r]] = [nums[r], nums[start]]
    }

    partition(start, r - 1);
    partition(r, end);
  }

  partition(0, nums.length - 1);
  return nums;
}

/**
 * quick sort(right before left)
 * @param nums 
 */
export const quick2 = (nums: number[]) => {
  const partition = (start: number, end: number) => {
    if (end - start <= 0) {
      return;
    }
    if (end - start === 1) {
      if (nums[start] > nums[end]) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
      }
      return;
    }
    
    let l = start;
    let r = end;

    while (l < r) {
      while (l < r && nums[r] >= nums[start]) {
        r -= 1;
      }
      while (l < r && nums[l] <= nums[start]) {
        l += 1;
      }
      if (l < r) {
        [nums[l], nums[r]] = [nums[r], nums[l]];
      }
    }

    [nums[start], nums[l]] = [nums[l], nums[start]];
    partition(start, l - 1);
    partition(l + 1, end);
  }

  partition(0, nums.length - 1);
  return nums;
}

/**
 * quick sort（loop）
 * @param nums 
 */
export const quickLoop = (nums: number[]) => {
  const stack = [];

  const partition = (start: number, end: number) => {
    if (end - start <= 0) {
      return;
    }
    if (end - start === 1) {
      if (nums[start] > nums[end]) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
      }
      return;
    }
    
    let l = start;
    let r = end;

    while (l < r) {
      while (l < r && nums[r] >= nums[start]) {
        r -= 1;
      }
      while (l < r && nums[l] <= nums[start]) {
        l += 1;
      }
      if (l < r) {
        [nums[l], nums[r]] = [nums[r], nums[l]];
      }
    }

    [nums[start], nums[l]] = [nums[l], nums[start]];
    stack.push([start, l, end]);
  }

  partition(0, nums.length - 1);
  while (stack.length !== 0) {
    const range = stack.pop();
    partition(range[0], range[1] - 1);
    partition(range[1] + 1, range[2]);
  }

  return nums;
}

/**
 * merge sort（recursion）
 * @param nums 
 */
export const mergeSort = (nums: number[]) => {
  const merge = (start: number, end: number) => {
    if (end - start <= 0) {
      return;
    }
    const mid = Math.floor((start + end) / 2);
    merge(start, mid);
    merge(mid + 1, end);

    let i = start;
    let j = mid + 1;
    const temp = [];
    while (i <= mid || j <= end) {
      if (i <= mid && j <= end) {
        if (nums[i] <= nums[j]) {
          temp.push(nums[i++]);
        } else {
          temp.push(nums[j++]);
        }
        continue;
      }
      if (i <= mid) {
        temp.push(nums[i++]);
        continue;
      }
      if (j <= end) {
        temp.push(nums[j++]);
        continue;
      }
    }
    let index = start;
    while (index <= end) {
      nums[index] = temp[index - start];
      index += 1;
    }
  }

  merge(0, nums.length - 1);
  return nums;
}
