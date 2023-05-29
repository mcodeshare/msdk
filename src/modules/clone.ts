import { throwErr } from './util'
import { getType, isArray, isObject } from './type'
import { hasKey } from './object'

interface IObj {
  [propName: string | number | symbol]: unknown;
}

/**
 * 深拷贝
 * @param {Any} 需要拷贝的数据
 * @returns 拷贝的数据
 */
export function cloneDeep<T> (data: T): T {
  if (data) {
    return clone(data, true)
  }
  return data
}

/**
 * 浅拷贝
 * @param {Any} 需要拷贝的数据
 * @returns 拷贝的数据
 */
export function clone<T> (data: T, deep = false, hash = new WeakMap()): T {
  if (data) {
    return copyValue(data, deep, hash)
  }
  return data
}

function copyValue<T> (
  origin: T,
  deep: boolean,
  hash: WeakMap<object, unknown>
) {
  if (isArray(origin)) {
    // 克隆数组
    const target: unknown[] = []
    origin.forEach((v) => {
      target.push(copyValue(v, deep, hash))
    })
    return target
  } else if (isObject(origin)) {
    // 克隆对象
    const target: IObj = {}
    if (hash.has(origin)) return hash.get(origin) // 防止循环引用
    hash.set(origin, target)
    const props = Object.getOwnPropertyNames(origin)
    props.forEach((prop) => {
      if (hasKey(origin, prop)) {
        target[prop] = copyValue(origin[prop], deep, hash)
      }
    })
    // getOwnPropertyNames无法获取symbol，特殊处理symbol
    const symbolKeys = Object.getOwnPropertySymbols(origin)
    if (symbolKeys.length) {
      symbolKeys.forEach((symKey) => {
        if (hasKey(origin, symKey)) {
          target[symKey] = copyValue(origin[symKey], deep, hash)
        }
      })
    }
    return target
  }
  return handleOtherClone(origin, deep, hash)
}

function handleOtherClone (
  origin: unknown,
  deep: boolean,
  hash: WeakMap<object, unknown>
) {
  if (deep && origin) {
    // @ts-ignore
    const Ctor = origin.__proto__.constructor
    const type = getType(origin)
    switch (type) {
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
      case 'null':
        return origin
      case 'date':
        return new Ctor((origin as Date).valueOf())
      case 'regexp':
        return new Ctor((origin as RegExp).valueOf())
      case 'set': {
        const originSet = origin as Set<unknown>
        const set = new Ctor()
        originSet.forEach((v: unknown) => {
          set.add(copyValue(v, deep, hash))
        })
        return set
      }
      case 'map': {
        const originMap = origin as Map<unknown, unknown>
        const map = new Ctor()
        originMap.forEach((v: unknown, k: unknown) => {
          map.set(copyValue(k, true, hash), copyValue(v, true, hash))
        })
        return map
      }
      default: {
        const unSupport = ['function', 'symbol', 'bigint', 'arguments']
        const tipTypes = unSupport.filter((item) => item !== type)
        return throwErr(
          `${type} 为未支持的拷贝类型,其他未受支持类型分别为: ${tipTypes.join(
            ','
          )}`
        )
      }
    }
  }
  return origin
}
