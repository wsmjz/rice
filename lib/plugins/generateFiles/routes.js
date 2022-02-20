/**
 * 写入临时文件
 */
let {readFileSync} = require('fs')
let {join} = require('path')
let writeTmpFile = require('../../writeTmpFile')
let Mustache = require('mustache') // ejs， jade, handlebar
let routes = require('../../getRoutes')
const plugin = (pluginAPI)=>{
  //监听一个事件，生成文件了
  pluginAPI.onGenerateFiles(async ()=>{
    console.log("路由插件加载...");
    const routesTpl = readFileSync(join(__dirname, 'routes.tpl'), 'utf8')
    let content = Mustache.render(routesTpl, {
      // routes // JSON.stringify(routes, replacer, 2) // 格式化 缩进2 
      routes: JSON.stringify(routes, replacer, 2).replace(/\"component\": (\"(.+?)\")/g, (global, m1, m2) => {
        return `"component": ${m2.replace(/\^/g, '"')}`
      })
    })
    writeTmpFile({
      path: 'core/routes.js',
      content
    })
  });
}

function replacer(key, value) {
  switch (key) {
    case "component":
      return `require('${value}').default`
      break;

    default:
      return value
  }
}

module.exports = plugin;