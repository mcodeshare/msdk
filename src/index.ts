import { Tlog, uuid, getRunTime } from './modules/util'
import { checkType, checkNaN } from './modules/type'
import { quickSort, bubbleSort } from './modules/sort'
import { trim } from './modules/trim'
import { urlParse, urlFormat } from './modules/url'
import { clone, cloneDeep } from './modules/clone'
import { downloadBolb, downloadByUrl, downloadByTag } from './modules/download'
import { formulaParser } from './modules/formulaParser'

// const originObj = {
//   a: '100',
//   b: undefined,
//   c: null,
//   e: /^\d+$/,
//   f: new Date(),
//   g: true,
//   arr: [10, 20, 30],
//   school: {
//     name: 'cherry',
//   },
//   d: Symbol(2),// 不支持
//   h: BigInt(1222222222),// 不支持
//   fn: function fn () { // 不支持
//     console.log('fn')
//   },
// }

// const copyObj = cloneDeep(originObj)
// console.log(copyObj, 'bian~~~~~~~~~~~~', originObj)
// 使用

export {
  Tlog,
  checkType,
  checkNaN,
  uuid,
  getRunTime,
  quickSort,
  bubbleSort,
  trim,
  urlParse,
  urlFormat,
  downloadBolb,
  downloadByUrl,
  downloadByTag,
  clone,
  cloneDeep,
  formulaParser,
}
