<!-- # 常见问题
- Cannot find module 'C:\Users\shouwang\AppData\Roaming\npm\node_modules\smi\bin\www.js'
```js
先执行 `npm link` 把 `smi` 链接到全局 (或者当前目录执行 node ./bin/smi)
```
- 生成.umi 文件

- 使用 webpack-dev-middleware 自动启动服务
- index.html 内置 启动生成的smi文件中 不存在
- Uncaught ReferenceError: process is not defined
```
当webpack的配置文件中mode设置为none时，运行页面会报这个错误。查看官网后，文档中模式mode支持的字符串只有development和 production，这里将mode改为 development
``` -->