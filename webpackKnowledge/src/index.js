/*
  1、webpack能处理js/json资源，不能处理css/img等其他资源
  2、生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
  3、生产环境比开发环境多一个压缩js代码
*/ 

import './index.css'
import './index.less'
function add (x,y){
  return x+y
}

console.log(add(1,2))