// resolve 用来拼接绝对路径的方法
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


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
      },
      {
        // 处理图片资源
        test: /\.(png|jpe?g|gif)$/i,
        // 此时需要下载两个包 url-loader file-loader, 此时处理的是css background类型的图片
        loader: 'url-loader',
        options: {
          // 图片大小 小于8kb 就会被base64处理
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会变大(文件请求会变慢)
          limit: 8*1024,
          // url-loader默认使用ES6模块化解析。html-loader引入图片是commonjs，解析会出问题：[object Module]
          // 解决方法是：关闭url-loader 的es6模块化，使用commonjs解析
          esModule: false,
          // [hash:10] 取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        // 处理html 中img引入的图片类型
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          // html-loader 中esModule 默认值是true
          esModule: false,
        }
      }
    ]
  },
  plugins: [
    // 无配置可实现的效果： 默认创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS）
    new HtmlWebpackPlugin({
      // 实现：复制'./src/index.html'文件，自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
  mode: 'development',
}