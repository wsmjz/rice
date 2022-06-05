const execa = require('child_process').exec;

module.exports = function (args) {
  const cmdStr = 'npm run plop'
  execa(cmdStr, (err, stdout, stderr) => {
    console.warn(err, stdout, stderr);
  })
}