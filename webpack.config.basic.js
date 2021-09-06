const webpack = require("webpack");
module.exports = {
  entry: './src/index0.js',
  mode: 'development',
  // 通过监控源码文件的变化来解决上面不能自动编译问题(在浏览器里依然需要手动点击刷新才能看到变更后的效果)
  // watch: true, 

  /*
    一种通信机制来连接浏览器中的预览页面与本地监控代码变更的进程
    解决问题：
    每次代码变更后浏览器中的预览页面能自动显示最新效果而无须手动点击刷新

    实现原理：
    通过这个 websocket 链接，就可以使打开的网页和本地服务间建立持久化的通信。当源代码发生变更时，我们就可以通过 Socket 通知到网页端，网页端在接到通知后会自动触发页面刷新。

    仍存在的问题：
    在开发调试过程中，我们可能会在网页中进行一些操作，
    例如输入了一些表单数据想要调试错误提示的样式、打开了一个弹窗想要调试其中按钮的位置，
    然后切换回编辑器，修改样式文件进行保存。可是当我们再次返回网页时却发现，
    网页刷新后，之前输入的内容与打开的弹窗都消失了，
    网页又回到了初始化的状态。于是，我们不得不再次重复操作才能确认改动后的效果
  */ 

  // devServer: {
  //   contentBase: './dist',
  //   open: true,
  // },

  /**
   * HMR（Hot Module Replacement，模块热替换）
   * 解决页面刷新导致的状态丢失问题
   * 
   * 实现方式：
   * devServer中增加 hot:true
   * module增加css模块解析 style-loader css-loader
   * 
   * 实现原理解析：
   * 首先在网络面板中，只是新增了两个请求：hot-update.json 和 hot-update.js，而不像上一个立即刷新的示例中那样，会刷新页面重载所有请求。
   * 其次，在审查元素面板中我们可以看到，在页面的头部新增了 hot-update.js，并替换了原先 style 标签中的样式内容。
   * 
   * 注意事项：
   * 导入的 CSS 能触发模块热替换，而 JS 文件的内容修改并不能达到热替换的效果
   * 原因：
   * 热替换的实现，既依赖 webpack 核心代码中 HotModuleReplacementPlugin 所提供的相关 API，也依赖在具体模块的加载器中实现相应 API 的更新替换逻辑。
   * 实现js热更新，可在plugins中 添加 webpack.HotModuleReplacementPlugin()
   * 
   * */ 
   devServer: {
    contentBase: './dist',
    open: true,
    hot: true
  },
  module:{
    rules: [
      {
        test: /\.css$/,
        //  css-loader 处理的是将导入的 CSS 文件转化为模块供后续 Loader 处理；而 style-loader 则是负责将 CSS 模块的内容在运行时添加到页面的 style 标签中
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  /*
  module：指在模块化编程中我们把应用程序分割成的独立功能的代码模块。
  chunk：指模块间按照引用关系组合成的代码块，一个 chunk 中可以包含多个 module。
  chunk group：指通过配置入口点（entry point）区分的块组，一个 chunk group 中可包含一到多个 chunk。
  bundling：webpack 打包的过程。
  asset/bundle：打包产物。

  webpack的热更新原理 (热更新能帮助我们在开发时快速预览代码效果，免去了手动执行编译和刷新浏览器的操作)
  完整的 HMR 功能主要包含了三方面的技术：
  1、watch  对本地源代码文件内容；
  2、Live Reload  浏览器网页端与本地服务器端的 Websocket 通信；
  3、HMR（Hot Module Replacement，模块热替换） 模块解析与替换功能；

  webpack 的打包思想可以简化为 3 点：
  - 一切源代码文件均可通过各种 Loader 转换为 JS 模块 （module），模块之间可以互相引用。
  - webpack 通过入口点（entry point）递归处理各模块引用关系，最后输出为一个或多个产物包 js(bundle) 文件。
  - 每一个入口点都是一个块组（chunk group），在不考虑分包的情况下，一个 chunk group 中只有一个 chunk，该 chunk 包含递归分析后的所有模块。
    每一个 chunk 都有对应的一个打包后的输出文件（asset/bundle）。
  */ 
  devtool: false,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 达到和预设 eval-cheap-module-source-map 一样的质量
    new webpack.EvalSourceMapDevToolPlugin({ 
      exclude: /node_modules/, 
      module: true, 
      columns: false 
    }) 
  ]
  
}