# 每周总结可以写在这里

### 闭包

- 环境部分
  - 环境：函数的词法环境
  - 标识符列表：函数中用到的未声明的变量
- 表达式部分：函数体

### 执行上下文

- lexical environment：词法环境，当获取变量或者this值时使用
- variable environment：变量环境，当生命变量时使用
- code evaluation state：用于恢复代码执行位置
- Function：执行的任务是函数时使用，表示正在被执行的函数
- ScriptOrModule：执行的任务是脚本或者模块时使用，表示正在被执行的代码
- Realm：使用的基础库和内置对象实例
- Generator：仅生成器上下文有这个属性，表示当前生成器

var b = {}

### JavaScript引擎 和 宿主环境

宿主环境比如浏览器环境和Node环境都有一个 JavaScript引擎，宿主环境可以通过一些API调用JavaScript引擎的能力 比如浏览器环境和Node环境中的事件、定时器 同样的在IOS环境中也可以维护一个JavaScript的引擎
