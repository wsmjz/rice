const path = require("path");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpack5Plugin();
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const cwd = process.cwd();
module.exports = {
  mode: "none",
  devtool: "source-map",
  entry: {
    main: "./src/.umi/umi.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath:'/'
  },
  devtool: false,
  resolve: {
    alias: {
      '@': path.join(cwd, 'src')
    }
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        },
        exclude: /node_modules/
      },
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        let error = errors[0]
        notifier.notify({
          title: '编译失败',
          message: severity + "==:==" + error.name
        })
      },
      compilationSuccessInfo: {
        messages: ["编译成功啦~~~~", "欢迎加入苹果家开发~~~", "更新日志：mfsu提速，建议尽快升级至3.0, 后续将会移除"],
        notes: ["webpack 编译Info"],
        notifier: notifier.notify({
          title: '提示',
        })
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled', // 不立即启动 展示打包报告
      generateStatsFile: true // 生成stats.json 文件
    }),
    // new HtmlWebpackPlugin({
    //   template:'./src/.smi/index.html'
    // })
  ]
}