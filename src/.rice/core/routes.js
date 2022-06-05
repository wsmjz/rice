
import plugin from './plugin'
export function getRoutes() {
    const routes = []
    plugin.applyPlugins({ // 写入运行时插件 app.js
        key: 'patchRoutes',
        args: {routes}
    })
    return routes;
}