import fs from "fs";
import path from "path";

export const resolve = function (filePath) {
  return path.join(__dirname, "", filePath);
}

/**
 * 清空指定路径下的所有文件及文件夹
 * @param {*} path
 */
export function clearDir(fileUrl) {
  // 如果当前url不存在，则中止
  if (!fs.existsSync(fileUrl)) return;
  // 当前文件为文件夹时
  if (fs.statSync(fileUrl).isDirectory()) {
    const files = fs.readdirSync(fileUrl);
    const len = files.length,
      removeNumber = 0;
    if (len > 0) {
      files.forEach(function (file) {
        removeNumber++;
        const url = fileUrl + '/' + file;
        if (fs.statSync(url).isDirectory()) {
          clearDir(url);
        } else {
          fs.unlinkSync(url);
        }
      });
      if (removeNumber === len) {
        // 删除当前文件夹下的所有文件后，删除当前文件夹（注：所有的都采用同步删除）
        fs.rmdirSync(fileUrl);
        console.log('delete folder' + fileUrl + 'success');
      }
    } else {
      fs.rmdirSync(fileUrl)
    }
  } else {
    // 当前文件为文件时
    fs.unlinkSync(fileUrl);
    console.log('delete file' + fileUrl + 'success');
  }
}
