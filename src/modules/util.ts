/* 
判断为空
判断点击空白位置
比较对象或数组是否完全相同
防抖,
节流,
禁止对象修改,
正则,
去除空格,
执行字符串，
金额逢三一断
文件大小计算
*/
/**
 * 生成uuid
 * @param {Number} len 生成id长度
 * @param {Number} radix 构成id字符取值范围 最大62
 * @returns {String} uuid
 */
export function uuid (len?: number, radix?: number) {
  const chars =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  radix = radix || chars.length
  if (len) {
    for (let i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (let n = 0; n < 36; n++) {
      if (!uuid[n]) {
        r = 0 | (Math.random() * 16)
        uuid[n] = chars[n === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
/**
 * 控制台打印log
 * @param {String} 标题
 * @param {String} 提示消息
 * @param {Any} detail 详情
 */
export function Tlog (title: string, msg: string | number, detail?: unknown) {
  console.info(
    `%c ${title} %c ${msg} ${detail ? ' ↓↓↓ \n' : ''}`,
    'background: #ff4d4f;color: #ffffff;border-top-left-radius: 3px;border-bottom-left-radius: 3px;padding: 0;',
    'background: #35495E;color: #ffffff;border-top-right-radius: 3px;border-bottom-right-radius: 3px;padding-right: 10px;',
    detail ? detail : ''
  )
}
/**
 * 抛出异常错误
 * @param {String} msg 错误信息
 * @returns
 */
export function throwErr (msg: string): never {
  Tlog('TSDK ERROR', msg)
  throw new Error(msg)
}
/**
 * 获取函数执行时间(请勿在开发环境使用)
 * @param {String} label 控制台输出执行时间的label
 * @param {Function} func 测试执行时间的函数
 * @param {Number}  repet 重复执行次数
 */
export function getRunTime (label: string, func: () => void, repet?: number) {
  const title = `${label} ${repet ? `${repet}次` : ''}执行耗时`
  console.time(title)
  if (repet) {
    let i = 0
    while (i < repet) {
      func()
      i++
    }
  } else {
    func()
  }
  console.timeEnd(title)
}
