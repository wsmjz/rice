
let {absPagesPath} = require('./getPaths')
let {join, basename, extname, resolve, relative} = require('path')
const { existsSync, readdirSync, statSync } = require('fs')
let winPath = require('./utils')

function getRoutes(opts = {}) {
    const {root, relDir=""} = opts // relDir相对目录 当前文件与pages之间隔着个目录
    const files = getFiles(join(root, relDir))
    const routes = files.reduce(fileToRouteReducer.bind(null, opts), [])
    console.log(files);
    return routes
}

/**
 * 把文件转成路由配置的 处理器
 * @param {*} a 
 * @param {*} b 
 */
function fileToRouteReducer(opts, routes, file) {
    const {root, relDir=""} = opts
    // 当前文件的绝对路径= pages + "" + "index.js"    ||   pages + "user" + "add.js"
    const absFile = join(root, relDir, file)
    const stats = statSync(absFile) // 获取 一个路径的文件的信息
    if(stats.isDirectory()) { // 这是目录
        const relFile = join(relDir, file) // user
        let layoutFile = join(root, relFile, '_layout.js')
        const route = {
            path: normalizePath(relFile),
            routes: getRoutes({ //  !!!!!!!!!!!!!!!!!!!!!!!! 重要
                ...opts,
                relDir: relFile // relFile 就是user
            })
        }
        if(existsSync(layoutFile)) {
            route.component = toComponentPath(root, layoutFile)
        }
        routes.push(route)
    } else { // 就是文件
        // file: profile.js , extname(file): .js(扩展名)  =====》 得到 "profile"
        let fileName = basename(file, extname(file))
        routes.push({ 
            path: normalizePath(join(relDir, fileName)), //   /user/add
            exact: true,
            // access: 'canAdmin',
            component: toComponentPath(root, absFile)
        })
    }
    return routes
}

function normalizePath(path) { // ===> '/user'
    path = winPath(path)
    path = `/${path}`
    path = path.replace(/\/index$/, '/')
    return path
}

function toComponentPath(root, absFile) {
    // 取src的绝对路径  与 当前文件的绝对路径 的相对路径
    // require('@/pages/index.js').default
    // '..'  表示上级目录
    return `@/${winPath(relative(resolve(root, '..'), absFile))}`
}

function getFiles(root) {
    if(!existsSync(root)) return []
    return readdirSync(root).filter(file => {
        if(file.charAt(0) === '_') return false
        return true
    })
}

let routes = getRoutes({root: absPagesPath})

// function replacer(key, value) {
//     switch (key) {
//         case "component":
//                 return `require('${value}').default`
//             break;
    
//         default:
//             return value
//     }
// }
// let result = JSON.stringify(routes, replacer, 2)
// result.replace(/\"component\": (\"(.+?)\")/g, (global, m1, m2) => {
//     return `"component": ${m2.replace(/\^/g, '"')}`
// })
// console.log(result);

module.exports = routes