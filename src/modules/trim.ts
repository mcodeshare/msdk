/**
 * 去除字符串空格
 * @param {String} str 字符串
 * @param {String} type  side-去除两侧空格 all-去除全部空格 left-去除左侧空格 right-去除右侧空格
 * @returns {String} 去除空格后的字符串
 */
export function trim (
  str: string,
  type: 'side' | 'all' | 'left' | 'right'
): string {
  const REGEXP_MAP = {
    all: /\s*/g,
    side: /^\s*|\s*$/g,
    left: /^\s*/,
    right: /(\s*$)/g,
  }
  return str.replace(REGEXP_MAP[type], '')
}
