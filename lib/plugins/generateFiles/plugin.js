/**
 * 写入临时文件
 */
let {readFileSync, existsSync} = require('fs')
let {join} = require('path')
let writeTmpFile = require('../../writeTmpFile')
let Mustache = require('mustache') // ejs， jade, handlebar
const { absSrcPath } = require('../../getPaths')
const winPath = require('../../utils')

const plugin = (pluginAPI)=>{
    let plugins = []
    if(existsSync(join(absSrcPath, 'app.js'))) {
      plugins.push(existsSync(join(absSrcPath, 'app.js')))
    }

  //监听一个事件，生成文件了
  pluginAPI.onGenerateFiles(async ()=>{
    console.log("运行时插件加载...");
    const pluginTpl = readFileSync(join(__dirname, 'plugin.tpl'), 'utf8')
    let content = Mustache.render(pluginTpl, {
      plugins: plugins.map((plugin, index) => {
        return {
          index,
          path: winPath(plugin)
        }
      })
    })
    writeTmpFile({
      path: 'core/plugin.js',
      content
    })
  });
}

module.exports = plugin;