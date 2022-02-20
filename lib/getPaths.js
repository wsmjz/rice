
let {existsSync, statSync} = require('fs')
let {join} = require('path')

function isDirectoryAndExist(path) { // 判断某个路劲的文件是否存在 并且是一个目录
    return existsSync(path) && statSync(path).isDirectory()
}

let cwd = process.cwd() // 获取当前的工作路劲  就是在哪儿执行 ./bin/smi.js 的

// src目录的绝对路劲
let absSrcPath = cwd
// 如果src目录存在， 那么当前目录下的src目录才是src根目录
if(isDirectoryAndExist(join(absSrcPath, 'src'))) {
    absSrcPath = join(absSrcPath, 'src')
}
const absPagesPath = join(absSrcPath, 'pages') // 约定式路由，生成路由时会扫描pages 文件
const tmpDir = '.umi'
const absTmpPath = join(absSrcPath, tmpDir)

module.exports = {
    absSrcPath, // src根目录的绝对路径 
    absPagesPath,
    tmpDir,
    absTmpPath // 临时路径，绝对路径
}