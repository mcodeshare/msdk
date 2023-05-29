/**
 * 下载文件流
 * @param {String} bolbData 文件流
 * @param {String} fileName 文件名
 * @returns {unknown} 若bolbData是错误信息则返回错误
 */
export function downloadBolb (bolbData: Blob, fileName: string): void {
  const fileReader = new FileReader()
  fileReader.onloadend = () => {
    try {
      // @ts-ignore
      const jsonData = JSON.parse(fileReader.result)
      return jsonData
    } catch (err) {
      // 解析成对象失败，说明是正常的文件流
      // @ts-ignore
      if (window.navigator.msSaveOrOpenBlob) {
        // ie特有下载
        // @ts-ignore
        navigator.msSaveBlob(bolbData, fileName)
      } else {
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(bolbData)
        link.download = fileName
        link.click()
        window.URL.revokeObjectURL(link.href)
      }
    }
  }
  fileReader.readAsText(bolbData)
}

/**
 * 后台服务器有静态资源且是固定的文件名通过url下载
 * @param {String} url 下载路径
 */
export function downloadByUrl (url: string): void {
  window.location.href = url
}

/**
 * 模拟点击a标签下载
 * @param {String} url 下载路径
 * @param {String} fileName 文件名
 */
export function downloadByTag (url: string, fileName: string): void {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
