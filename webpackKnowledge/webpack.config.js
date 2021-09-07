// resolve 用来拼接绝对路径的方法
const {resolve} = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js', 
    //__dirname 代表当前文件的目录的绝对路径
    path: resolve(__dirname, 'build') 
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader','less-loader']
      }
    ]
  },
  plugins: [

  ],
  mode: 'development',
}