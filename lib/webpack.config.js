const path = require("path");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const SpeedMeasureWebpack5Plugin = require('speed-measure-webpack5-plugin');
const smw = new SpeedMeasureWebpack5Plugin();
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const cwd = process.cwd();
console.log("process", process.cwd());
module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    main: "./src/.rice/rice.js"
  },
  // entry: { 如何打包rice
  //   clibuild: "./lib/cli.js"
  // },
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
        test: /\.css$/,
        //使用style-loader css-loader 从右往左生效
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",//把样式文本变成style标签插入到页面中
          {
            loader: 'css-loader' //处理CSS中的import和url
          },
          {
            loader: 'postcss-loader',//处理CSS兼容性，自动添加厂商前缀
            options: {
              postcssOptions: {
                plugins: [
                  "autoprefixer"
                ]
              }
            }
          },
          {
            loader: 'px2rem-loader',//px转为rem单位 
            options: {
              remUnit: 75, //在设计稿宽750px的情况下，1个rem等于75px
              remPrecesion: 8 // 因为rem需要计算，所以计算的精度是保留 8位小数
            }
          },
          "less-loader"//把less编译成css
        ]
      },
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