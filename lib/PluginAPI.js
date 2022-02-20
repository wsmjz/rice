
class PluginAPI{
    constructor(opts){
        this.id = opts.id;
        this.service = opts.service;
    }
    registerCommand(command){
        //this.service.commands.dev = {name,description,fn};
        this.service.commands[command.name]=command;  // 注册命令到 Service中 ；就是给Service中的 this.commands = {} 赋值
    }
    register(hook){
        this.service.hooksByPluginId[this.id]=(
            this.service.hooksByPluginId[this.id]||[]
        ).concat(hook);
    }
    registerMethod({name,fn}){
        this.service.pluginMethods[name] = fn ;
    }
}
module.exports = PluginAPI;


// 7 exp============================
// pluginAPI.registerCommand({
//     name:'dev',
//     description:'启动服务',
//     fn:async function(){
//         await pluginAPI.service.applyPlugins({
//             key:'onGenerateFiles'
//         });
//        new Server().start();
//     }
// });