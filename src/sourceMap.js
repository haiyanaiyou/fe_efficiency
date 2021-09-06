/*
  什么是sourceMap？
  source map 就是实现在调试时将产物代码显示回源代码的一个工具。

  source-map 的基本原理：
  在编译处理的过程中，在生成产物代码的同时生成产物代码中被转换的部分与源代码中相应部分的映射关系表。
  有了这样一张完整的映射表，我们就可以通过 Chrome 控制台中的"Enable Javascript source map"来实现调试时的显示与定位源代码功能。

  source map 功能的期望：
  - 在开发环境中，通常我们关注的是构建速度快，质量高，以便于提升开发效率，而不关注生成文件的大小和访问方式。
  - 在生产环境中，通常我们更关注是否需要提供线上 source map , 生成的文件大小和访问方式是否会对页面性能造成影响等，其次才是质量和构建速度。

  source map 处理插件：
  1、EvalDevToolModulePlugin：模块代码后添加 sourceURL=webpack:///+ 模块引用路径，不生成 source map 内容，模块产物代码通过 eval() 封装。
  2、EvalSourceMapDevToolPlugin：生成 base64 格式的 source map 并附加在模块代码之后， source map 后添加 sourceURL=webpack:///+ 模块引用路径，不单独生成文件，模块产物代码通过 eval() 封装。
  3、SourceMapDevToolPlugin：生成单独的 .map 文件，模块产物代码不通过 eval 封装。

  开发环境下 source map 预设推荐 ：
  如果在调试时，需要通过 source map 来快速定位到源代码，则优先考虑使用 eval-cheap-modulesource-map，它的质量与初次/再次构建速度都属于次优级，以牺牲定位到列的功能为代价换取更快的构建速度通常也是值得的。
  在其他情况下，根据对质量要求更高或是对速度要求更高的不同情况，可以分别考虑使用 eval-source-map 或 eval-cheap-source-map。

  在开发环境下我们首选的还是 EvalSourceMapDevToolPlugin
*/ 