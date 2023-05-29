/**
 * 精确检验是否为指定类型
 * @param {unknown} value 需要判断类型的值
 * @param {String} type null undefined number string boolean function arguments array date regexp object symbol error window document
 * @returns {Boolean} 返回判断结果true false
 */
export function checkType (value: unknown, type: string) {
  return type === getType(value)
}
/**
 * 精确获取参数类型
 * @param {unknown} value 需要判断类型的值
 * @returns null undefined number string boolean function arguments array date regexp object symbol error window document
 */
export function getType (value: unknown) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}
/**
 * 判断是否为NaN
 * javascript中isNaN存在弊端会自动转换类型,string等类型会自动转换为number变成了NaN,此函数规避了此问题
 * @param {unknown} value 需要判断的值
 * @returns {Boolean}
 */
export function checkNaN (value: unknown) {
  if (typeof value === 'number') {
    if (isNaN(value as number)) {
      return true
    }
  }
  return false
}

export function isObject (value: unknown): value is object {
  return checkType(value, 'object')
}
export function isArray (value: unknown): value is Array<unknown> {
  return checkType(value, 'array')
}
export function isNumber (value: unknown): value is number {
  return checkType(value, 'number')
}
export function isString (value: unknown): value is string {
  return checkType(value, 'string')
}
export function isBoolean (value: unknown): value is boolean {
  return checkType(value, 'boolean')
}
export function isUndefined (value: unknown): value is undefined {
  return value === undefined
}
export function isNull (value: unknown): value is null {
  return value === null
}
export function isDate (value: unknown): value is Date {
  return checkType(value, 'date')
}
export function isMap (value: unknown): value is Map<unknown, unknown> {
  return checkType(value, 'map')
}
export function isSet (value: unknown): value is Set<unknown> {
  return checkType(value, 'set')
}
export function isRegExp (value: unknown): value is RegExp {
  return checkType(value, 'regexp')
}
