/**
 * 写入临时文件
 */
let {readFileSync} = require('fs')
let {join} = require('path')
let writeTmpFile = require('../../writeTmpFile')
let Mustache = require('mustache') // ejs， jade, handlebar
const plugin = (pluginAPI)=>{
    //监听一个事件，生成文件了
    pluginAPI.onGenerateFiles(async ()=>{
        console.log("smi插件加载...");
        const smiTpl = readFileSync(join(__dirname, 'smi.tpl'), 'utf8')
        let content = Mustache.render(smiTpl)
        writeTmpFile({
            path: 'smi.js',
            content
        })
    });
}
module.exports = plugin;