module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
    // template第一行报错
    // requireConfigFile: false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // iconfont js文件报错
    'no-unused-expressions': 'off',
    'vue/multi-word-component-names': 'off',
    // 函数前面加空格
    'space-before-function-paren': 'off',
    'vue/no-mutating-props': 'off'
  }
}
