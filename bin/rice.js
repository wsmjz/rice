#! /usr/bin/env node
// require('../lib/cli');

// const {semver, error, warn} = require('@vue/cli-shared-utils')
// const requiredVersion = require('../package.json').engines.node

// if (!semver.satisfies(process.version, requiredVersion)) {
//   error(
//     `您在用的Node版本是 ${process.version} 但是 my 命令行工具要求 Node 版本 ${requiredVersion}。 请您升级Node版本！`
//   )
//   process.exit(1)
// }

const defaultCommand = function (args, type) {
  console.log(
    `sailfish不支持${type}命令，请检查输入是否正确，或查看sailfish命令文档和用法。`
  )
}

const commandArray = [
  'dev',
  'color',
  'theme',
  'newPage'
]
const commandMap = Object.create(null)
commandArray.forEach(name => {
  commandMap[name] = require(`./command/${name}`)
})

const rawArgv = process.argv.slice(2)
const [type, ...args] = rawArgv
const commandHandler = commandMap[type] || defaultCommand
commandHandler(args, type)