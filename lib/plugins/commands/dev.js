let Server = require('../../Server');
//pluginAPI
const plugin = (pluginAPI)=>{
    pluginAPI.registerCommand({
        name:'dev',
        description:'启动服务',
        fn:async function(){
            console.log('dev插件加载...')
            await pluginAPI.service.applyPlugins({
                key:'onGenerateFiles' // 这个key 就是说在这儿调用生成临时文件的这个。。。onGenerateFiles？？
            });
            console.log('所有插件加载完成...')
           new Server().start();
        }
    });
}
module.exports = plugin;