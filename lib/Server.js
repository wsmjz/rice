/**
 * 
 */
let express = require('express');
let http = require('http');

// 中间件 自动启webpack服务  需要一个webpack中间件  打包并预览 
let webpack = require('webpack')
const { join } = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackConfig = require('./webpack.config');
const { absSrcPath, absTmpPath } = require('./getPaths');

class Server {
	constructor() {
		this.app = express();
	}

	setupDevMiddleware() {
		webpackConfig.entry = join(absTmpPath, 'smi.js')
		webpackConfig.resolve.alias['@'] = absSrcPath
		webpackConfig.plugins.push(new HtmlWebpackPlugin({
			template:join(__dirname, 'index.html')
		}))
		const compile = webpack(webpackConfig)
		 // 默认放内存
		const devMiddleware = webpackDevMiddleware(compile, {
			writeToDisk: true // 写道硬盘上
		})
		this.app.use(devMiddleware)
		this.app.use((req, res, next) => {
			res.send(compile.outputFileSystem.readFileSync(join(__dirname, 'dist/index.html'), 'utf8'))
		})
		return devMiddleware
	}

	async start() {
		const devMiddleware = this.setupDevMiddleware()
		devMiddleware.waitUntilValid(() => {  // 等待打包完成 启动服务
			let listeningApp = http.createServer(this.app);
			listeningApp.listen(8000, () => {
				console.log('服务已经在8000端口上启动了!');
			});
		})

	}
}
module.exports = Server;