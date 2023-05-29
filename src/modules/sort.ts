interface ICompareFn<T> {
  // 获取排序参数
  (a: T, b: T): boolean;
}
/**
 * 冒泡排序(稳定)
 * @param {Array} arr 【必传】需要排序的数据
 * @param {Function} compareFn 比较函数
 * @returns {Array} 排序后的数据
 */
function bubbleSort<T> (arr: T[], compareFn: ICompareFn<T>): T[] {
  let exchange = false // 本次排序发生交换的标志
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (compareFn(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        exchange = true
      }
    }
    if (!exchange) {
      // 若本趟排序未发生交换，提前终止算法
      break
    }
  }
  return arr
}

/**
 * 快速排序（不稳定）
 * @param {Array} arr 【必传】需要排序的数据
 * @param {Function} compareFn (a,b)=>boolean 比较函数 返回值为true发生交换
 * @returns {Array} 排序后的数据
 */
function quickSort<T> (arr: T[], compareFn: ICompareFn<T>): T[] {
  if (arr.length <= 1) {
    return arr
  }
  const left = []
  const right = []
  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (compareFn(arr[i], pivot)) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left, compareFn).concat(
    [pivot],
    quickSort(right, compareFn)
  )
}

export { quickSort, bubbleSort }
