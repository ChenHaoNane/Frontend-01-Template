# 每周总结可以写在这里

运算符的优先级在语言实现的层面上是树的结构

## 表达式

### Left Hand Sides

运行时为 Reference 类型
可以理解为放在等号左边的表达式

- MemberExpression
  - a.b
  - a['b']
  - foo`a`
  - super.b
  - super['b']
  - new.target
  - new Foo()
- NewExpression
  - new Foo
- CallExpression
  - foo()
  - super()
  - foo()['b']
  - foo().b
  - foo()`b`

### Right Hand Sides
可以放在表达式右边的 返回结果是具体的值
- Expression
  - Update
    - a ++
    - a --
    - -- a
    - ++ a
  - Unary
    - delete a.b
    - void foo()
    - typeof a
    - - a
    - - a
    - ~ a
    - ! a
    - await a
  - Exponental
    - \*\*
  - Multiplicative
    - / \* %
  - Additive
    - \+ \-
  - Shift
    - << >> >>>
  - Relationship
    - <> <= >= instanceof in
  - Equality
    - ==
    - !=
    - ===
    - !==
  - Bitwise
    - &^|
  - Logical
    - && ||
  - Conditional
    - ? :

## 类型转换

Number -> String
String -> Number
Object -> 基本类型
基本类型 -> Object

## 语句

- Completion Record
  \[[type]]: normal, break, continue, return, or throw
  \[[value]]: Types
  \[[target]]: label

### 简单语句

- ExpressionStatement
- EmptyStatement
- DebuggerStatement
- ThrowStatement
- ContinueStatement
- BreakStatement
- ReturnStatement

### 复合语句

- BlockStatement
- IterationStatement
- LabelledStatement
- SwitchStatement

### 声明

- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
- AsyncGeneratorDeclaration
- VariableStatement
- ClassDeclaration
- LexicalDeclaration

写复杂的正则表达式 分解为多个简单正则然后进行组合

程序员使用编程语言描述事物，重点在于如何表达的能力而不是模仿写法，每个语言都有自己的特性，追逐别的语言的写法相当于舍本逐末

### Object(对象/万物)

- 唯一标识
- 状态
- 行为

### 类继承

- 归类
- 分类

### Object in JavaScript

- Data Property
  - \[[value]]
  - writable
  - enumerable
  - configurable
- Accessor Property
  - get
  - set
  - enumerable
  - configurable

### Object API/Grammar

- {} . [] Object.defineProperty
- Object.create Object.setPrototypeOf Object.getPrototypeOf
- new class extends
- new function prototype


### JavaScript 中的对象

- 宿主对象
- 内置对象
  - 固有对象
  - 原生对象
    - 基本类型
      - Boolean
      - String
      - Number
      - Symbol
      - Object
    - 基础功能和数据结构
      - Array
      - Date
      - Promise
      - Function
      - RegExp
      - Proxy
      - Map
      - WeakMap
      - Set
      - WeakSet
    - 错误类型
      - Error
      - EvalError
      - ReferenceError
      - SyntaxError
      - TypeError
      - URIError
    - 二进制操作
      - ArrayBuffer
      - SharedArrayBuffer
      - DataView
    - 带类型的数组
      - Float32Array
      - Float64Array
      - Int8Array
      - Int16Array
      - Int32Array
      - Uint8Array
      - Uint16Array
      - Uint32Array
      - Uint8ClampedArray
  - 普通对象


### JavaScript 中的特殊对象

- Function \[[call]] \[[construct]]
- Array \[[length]]
- RegExp \[[RegExpMatcher]]
- Symbol \[[SymbolData]]
- Map \[[MapData]]
- Error \[[ErrorData]]
- Boolean \[[BooleanData]]
- Number \[[NumberData]]
- Date [[DateVale]]

