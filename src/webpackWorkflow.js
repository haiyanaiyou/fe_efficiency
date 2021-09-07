/*
  webpack的基本工作流程：
  从两方面展开
    1)通过webpack的源码来了解具体函数执行的逻辑（Webpack函数 -》 生成编译器示例compiler -》 执行 WebpackOptionsApply().process -》 根据是否是 watch 模式来决定要执行 compiler.watch 还是 compiler.run ）
      webpack的运行方式有两种，一种是基于命令行的方式，另一种是基于代码的方式，无论是哪一种，本质上都是webpack.js中的Webpack函数。
      webpack函数的核心逻辑是：
        根据配置生成编译器实例 compiler，然后处理参数，执行 WebpackOptionsApply().process，
        根据参数加载不同内部插件。在有回调函数的情况下，根据是否是 watch 模式来决定要执行 compiler.watch 还是 compiler.run。
      Compiler.js 中的基本流程：
        readRecords：读取构建记录，用于分包缓存优化，在未设置 recordsPath 时直接返回
        ↓
        compile 的主要构建过程(newCompilationParams：创建 NormalModule 和 ContextModule 的工厂实例，用于创建后续模块实例。
                              newCompilation：创建编译过程 Compilation 实例，传入上一步的两个工厂实例作为参数。
                              compiler.hooks.make.callAsync：触发 make 的 Hook，执行所有监听 make 的插件（例如 SingleEntryPlugin.js 中，会在相应的监听中触发 compilation 的 addEntry 方法）
                              compilation.finish：编译过程实例的 finish 方法，触发相应的 Hook 并报告构建模块的错误和警告。
                              compilation.seal：编译过程的 seal 方法，下一节中我会进一步分析。)
        ↓
        emitAssets：调用 compilation.getAssets()，将产物内容写入输出文件中
        ↓
        emitRecords：对应第一步的 readRecords，用于写入构建记录，在未设置 recordsPath 时直接返回。

    2)通过webpack对外暴露的声明周期Hooks 理解整体流程的阶段划分

  webpack的运行方式有两种：
  1、通过命令行的方式
    webpack --config webpack.config.js

  2、基于代码的方式
    var webpack = require('webpack')
    var config = require('./webpack.config')
    webpack(config, (err, stats) => {})
*/ 