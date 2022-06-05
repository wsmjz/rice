const path = require('path') ;

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: '创建一个新组件',
    prompts: [
      { type: 'input', name: 'name', message: '请输入组件名称（多个单词以中横线命名）' }
    ],
    actions: [
			{
        type: 'add',
        path: path.resolve(__dirname, '../pages/{{kebabCase name}}/package.json'),
        templateFile: path.resolve(__dirname, '../templates/package-js/package.hbs'),
      },
			{
        type: 'add',
        path: path.resolve(__dirname, '../pages/{{kebabCase name}}/gulpfile.js'),
        templateFile: path.resolve(__dirname, '../templates/package-js/gulpfile.hbs'),
      }
    ],
  });
}
