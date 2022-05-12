let mkdirp = require('mkdirp') // 创建文件夹
let {writeFileSync} = require('fs') // 写入文件
let {dirname,join} = require('path')
let {absTmpPath} = require('./getPaths')
/**
 * 
 * @param {path} 写入文件的路劲 
 */
function writeTemFile({path, content}) {
    const absPath = join(absTmpPath, path)
    // 保证此文件所在的文件夹是存在的，如果不存在则先建立文件夹
    mkdirp(dirname(absPath))
    writeFileSync(absPath, content, 'utf8')
}
module.exports = writeTemFile