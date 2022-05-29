const utils = require('./utils')
// My库所在的绝对路径位置
const MyRootPath = utils.resolve('./')

// 项目工程根目录
const ProjectRootPath = false ? process.cwd() : './'

// 临时文件存放绝对路径, 临时目录在工程下
const TempPath = utils.join(ProjectRootPath, '.my')

// lib 所在绝对路径位置
const LibPath = utils.join(MyRootPath, 'ui/lib')

// ElementUI 主题编译后存放目录
const OutputElementThemePath = utils.join(TempPath, 'el-themes')

// UI 主题编译后存放目录
const OutputUIThemePath = utils.join(TempPath, 'ui-themes')

// ElementUI样式源码目录
const ElementThemeSrcPath = utils.join(ProjectRootPath, 'node_modules/element-ui/packages/theme-chalk/src')

// UI主题源码目录
const UIThemeSrcPath = utils.join(LibPath, 'styles')

// 工程的主题配置SCSS文件夹路径
const ProjectThemeVarPath = utils.join(ProjectRootPath, 'src/style/themes')

const ThemeVarScssLoaderPath = utils.join(MyRootPath, 'core/loaders/theme-var-scss-loader.js')

module.exports = {
  ProjectRootPath,
  TempPath,
  LibPath,
  OutputElementThemePath,
  OutputUIThemePath,
  ElementThemeSrcPath,
  UIThemeSrcPath,
  ProjectThemeVarPath,
  ThemeVarScssLoaderPath
}