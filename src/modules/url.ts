interface IUrlParams {
  [propName: string]: string | number;
}

/**
 * 获取url上参数
 * @param {String} originUrl 需要处理的url，若不传则获取location.href
 * @returns {Object} 返回包含url全部参数的对象
 */
export function urlParse (originUrl?: string) {
  const url = originUrl || location.href
  const queryStr = url ? url.split('?')[1] : window.location.search.slice(1)
  const urlParams: IUrlParams = {}
  if (!queryStr) return urlParams
  const arr = queryStr.split('&')
  arr.forEach((items) => {
    const [key, value] = items.split('=')
    urlParams[key] = decodeURI(value)
  })
  return urlParams
}

/**
 * url参数序列化
 * @param {Object} obj 需要拼接的对象
 * @param {String} originUrl 原始的url,若传入则返回完整拼接的新url，obj中若存在同名参数则覆盖url现有参数值
 * @returns {String} 拼接后的字符串
 */
export function urlFormat (obj: IUrlParams, originUrl?: string) {
  let queryList = []
  let urlParams = null
  let urlComp: string[] = []
  if (originUrl) {
    urlComp = originUrl.split('?')
    if (urlComp.length > 1) {
      const originUrlParams = urlParse(originUrl)
      urlParams = {
        originUrlParams,
        ...obj,
      }
    }
  }
  if (urlParams === null) {
    urlParams = obj
  }
  queryList = Object.keys(urlParams).map((key) => {
    return key + '=' + encodeURIComponent(obj[key])
  })
  if (originUrl) {
    return urlComp[0] + '?' + queryList.join('&')
  }
  return queryList.join('&')
}
