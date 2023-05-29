/**
 * 判断对象是否包含某个属性
 * @param {Object} obj 查找属性的对象
 * @param {Object} key 查找属性的对象
 * @returns {Boolean}
 */
export function hasKey (
  obj: unknown,
  key: string | number | symbol
): key is keyof typeof obj {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
