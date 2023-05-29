/* 
TODO:图片转base64，base64转图片,编码、解码
*/

// 图片编码解码

/**
 * 字符串转base64
 * @param {String} str 字符串
 */
export function encodeStr (str: string) {
  const encode = encodeURI(str) // 编码
  const base64 = window.btoa(encode) // 转Base64
  return base64
}

/**
 * base64转字符串
 * @param {String} str 字符串
 */
export function decodeStr (base64: string) {
  const decode = window.atob(base64) // Base64反转
  const str = decodeURI(decode) // 解码
  return str
}
