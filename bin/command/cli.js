
let Service = require('../../lib/Service');
let pluginDev = require('../../lib/plugins/commands/dev'); // 挂载每一个插件
let pluginHistory = require('../../lib/plugins/generateFiles/history');
let pluginRice = require('../../lib/plugins/generateFiles/rice');
let pluginRoutes = require('../../lib/plugins/generateFiles/routes');
let pluginPlugin = require('../../lib/plugins/generateFiles/Plugin');

// (async function () {
//   let service = new Service({
//     plugins: [
//       { id: 'dev', apply: pluginDev },
//       { id: 'history', apply: pluginHistory },
//       { id: 'rice', apply: pluginRice },
//       { id: 'routes', apply: pluginRoutes },
//       { id: 'plugin', apply: pluginPlugin }
//     ]
//   });
//   //运行dev这个命令
//   await service.run({ name: 'dev' });
// })();

/**
 * 插件是有标准定义的
 * 格式{id:'dev',apply:此插件对应的函数}
 */

 module.exports = async function () {
  let service = new Service({
    plugins: [
      { id: 'dev', apply: pluginDev },
      { id: 'history', apply: pluginHistory },
      { id: 'rice', apply: pluginRice },
      { id: 'routes', apply: pluginRoutes },
      { id: 'plugin', apply: pluginPlugin }
    ]
  });
  //运行dev这个命令
  await service.run({ name: 'dev' });
}