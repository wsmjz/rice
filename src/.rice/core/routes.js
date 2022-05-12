
import plugin from './plugin'
export function getRoutes() {
    const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.js').default
  },
  {
    "path": "/profile",
    "exact": true,
    "component": require('@/pages/profile.js').default
  },
  {
    "path": "/setting",
    "exact": true,
    "component": require('@/pages/setting.js').default
  },
  {
    "path": "/user",
    "routes": [
      {
        "path": "/user/add",
        "exact": true,
        "component": require('@/pages/user/add.js').default
      },
      {
        "path": "/user/list",
        "exact": true,
        "component": require('@/pages/user/list.js').default
      }
    ],
    "component": require('@/pages/user/_layout.js').default
  }
]
    plugin.applyPlugins({ // 写入运行时插件 app.js
        key: 'patchRoutes',
        args: {routes}
    })
    return routes;
}