# 每周总结可以写在这里

运算符的优先级在语言实现的层面上是树的结构

## 表达式
### Left Hand Sides

运行时为Reference类型
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
    - + a
    - - a
    - ~ a
    - ! a
    - await a
  - Exponental
    - **
  - Multiplicative
    - / *  %
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

### 声明

- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
- AsyncGeneratorDeclaration
- VariableStatement

写复杂的正则表达式