import { Tlog, throwErr } from './util'
interface IFormualLib {
  [propName: string]: unknown;
}
/**
 * 公式解析器 v1 (注意:本解析器使用new Function实现,调用的外部方法必须在lib中注册)
 * @param {Object} lib 注册被解析JavaScript代码内部允许访问的外部资源
 * @returns {Function} run ()    执行JavaScript代码字符串
 * @returns {Function} add ()    追加允许访问的外部资源
 * @returns {Function} delete () 删除允许访问的外部资源
 * @returns {Function} getLib () 查询允许访问的外部资源
 */
export class formulaParser {
  constructor (lib: IFormualLib) {
    this.init(lib)
  }
  private libStr = '' // new Function 创建函数传入的变量
  private formualDebugger = false // 是否开启debugger
  // 用于JavaScript字符串可访问的资源
  private lib: IFormualLib = {
    fnWrapper: (fn: unknown) => {
      if (typeof fn === 'function') {
        return fn.call(this)
      } else {
        throwErr('The argument passed must be a function')
      }
    },
  }
  // 初始化
  private init (libComp: IFormualLib) {
    if (localStorage.getItem('formualDebugger')) {
      this.formualDebugger = true
    }
    this.lib = {
      ...this.lib,
      ...libComp,
    }
    this.handleLibStr(this.lib)
  }
  // 处理参数
  private handleLibStr (lib: IFormualLib) {
    this.libStr = Object.getOwnPropertyNames(lib).join(',')
  }
  // 删除可访问资源
  private handleDel (key: string) {
    if (key !== 'fnWrapper') {
      Reflect.deleteProperty(this.lib, key)
    } else {
      throwErr('The fnWrapper function must exist and cannot be removed')
    }
  }
  // 创建可执行函数
  private create (fnStr: string) {
    const fnBody = `fnWrapper(${fnStr})`
    return new Function(`{${this.libStr}}`, `return (${fnBody})`)
  }
  // 添加允许访问的资源
  add (libComp: IFormualLib) {
    this.lib = {
      ...this.lib,
      ...libComp,
    }
    this.init(this.lib)
  }
  // 移除允许访问的资源
  delete (keys: string[] | string) {
    if (Array.isArray(keys)) {
      // 传入数组遍历删除
      keys.forEach((key) => {
        this.handleDel(key)
      })
    } else {
      this.handleDel(keys)
    }
    this.handleLibStr(this.lib)
  }
  // 获取允许访问的资源
  getLib () {
    return this.lib
  }
  // 执行动态生成的字符串(传入的字符串必须是函数)
  run (fnStr: string): unknown {
    const func = this.create(fnStr)
    if (this.formualDebugger) {
      Tlog('formulaParser', 'The original function string', fnStr)
      Tlog('formulaParser', 'The parsed function', String(func))
    }
    return func(this.lib)
  }
}

/* 

// 注册解析器
const parser = new formulaParser({
  add: (a: number, b: number) => {
    return a + b
  },
})
console.log('公式解析器实例:', parser)
// 追加允许访问资源
parser.add({
  sub: (a: number, b: number) => {
    return a - b
  },
  test1: () => {
    console.log('测试被删除的方法1')
  },
  test2: () => {
    console.log('测试被删除的方法2')
  },
})
// 移除允许访问资源
parser.delete(['test1'])
parser.delete('test2')
// 执行动态生成的JavaScript
const result = parser.run(`
  function(){
    const outRes = sub(add(1,2),0.5)
    const inRes = outRes + 1
    console.log('内部访问变量：',inRes)
    return outRes
  }
`)
console.log('外部访问变量：', result)

*/
