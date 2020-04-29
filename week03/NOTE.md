# 每周总结可以写在这里

运算符的优先级在语言实现的层面上是树的结构

## 表达式

### Left Hand Sides

运行时为 Reference 类型

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

### JavaScript 中的特殊对象

- Function
- Array
-