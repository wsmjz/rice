
let Service = require('./Service');
let pluginDev = require('./plugins/commands/dev'); // 挂载每一个插件
let pluginHistory = require('./plugins/generateFiles/history');
let pluginSmi = require('./plugins/generateFiles/smi');
let pluginRoutes = require('./plugins/generateFiles/routes');
let pluginPlugin = require('./plugins/generateFiles/Plugin');

(async function () {
  let service = new Service({
    plugins: [
      { id: 'dev', apply: pluginDev },
      { id: 'history', apply: pluginHistory },
      { id: 'smi', apply: pluginSmi },
      { id: 'routes', apply: pluginRoutes },
      { id: 'plugin', apply: pluginPlugin }
    ]
  });
  //运行dev这个命令
  await service.run({ name: 'dev' });
})();
/**
 * 插件是有标准定义的
 * 格式{id:'dev',apply:此插件对应的函数}
 */