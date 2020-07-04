# 每周总结可以写在这里

### 语言按语法的分类

- 非形式化语言
- 形式化语言
  乔姆斯基谱系
  - 0型文法（无限制文法或短语结构文法）
  - 1型文法（上下文相关文法）
  - 2型文法（上下文无关文法）
  - 3型文法（正则文法)

### 非形式化语言在计算机中的定义

BNF（巴斯克诺尔范式）可以用来描述形式化语言

- 尖括号括起来表示语法结构名
- 语法结构分为基础结构和需要其他语言结构定义的复合结构
  - 基础结构称为终结符
  - 符合结构称为非终结符
- 字符表示终结符
- * 0或多
- | 或
- + 至少一次


<Number> :: = "0" | "1" | ... | "9"
<DecimalNumber> :: = "0" | ("1" | ... | "9") <Number>*
<AddtiveExpression> ::= 
  <DecimalNumber> |
  <AddtiveExpression> "+" <DecimalNumber>

<NUmber> :: = "0" | "1" | ... | "9"
<DecimalNumber> :: = "0" | ("1" | ... | "9") <Number>*
<MultipleExpression> ::=
  <DecimalNumber> |
  <MultipleExpression> "*" <DecimalNumber>
<AddtiveExpression> ::=
  <MultipleExpression> |
  <AddtiveExpression> "+" <MultipleExpression>

### 通过产生式理解巴斯克诺尔范式

- 0型文法
  - ? ::= ?
- 1型文法
  - ?\<A>? ::= ?<B>? (abc ::= adc)
- 2型文法
  - \<A> ::= ?
- 3型文法
  - \<A> ::= \<A>?


### 图灵完备性
- 命令式---图灵机
  - goto
  - if while
- 声明式---lambda
  - 递归

### 静态类型系统和动态类型系统

### 强类型和弱类型

具有隐式强制类型转换的语言是弱类型

### 编程语言的结构层级

- Atom
  - Identifier
  - Literal
- Expression
  - Atom
  - Operator
  - punctuator
- Statement
  - Expression
  - Keyword
  - punctuator
- Structure
  - Function
  - Class
  - Process
  - Namespace
- Program
  - Program
  - Module
  - Package
  - Library

### 计算机中的文件存储

  - 二进制文件
  - 文本文件
    - 通过字符集和字符编码将二进制转换成字符
  - 字符集
    - ASCII
    - Unicode
    - GBK
    ...

思考为什么不建议使用中文作为变量名？

超过ASCII字符集的变量名比如中文会和文件本身的字符集强相关，在不同环境下编码的问题难以处理，而ASCII字符集之内的编码是所有其他编码都兼容的不会产生这个问题。如果一定要使用中文变量名的话可以使用 \u 进行转义处理。
  
InputElement
  - WhiteSpace
    - TAB (CHARACTER TABULATION) U+0009
    - VT (LINE TABULATION) U+000B
    - FF (FORM FEED) U+000C
    - SP (SPCAE) U+0020
    - NBSP (NO-BREAK SPACE) U+00A0
    - ZWNBSP (ZERO WIDTH NO-BREAK SPACE) U+FEFF
    - USP Any other Unicode “Space_Separator” code point
  - LineTerminator
    - LF (LINE FEDD) U+000A
    - CR (CARRIAGE RETURN) U+000D
    - LS (LINE SEPARATOR) U+2028
    - PS (PARAGRAPH SEPARATOR) U+2029
  - Comment
    - MultiLineComment 多行注释中如果出现至少一个LineTerminator 则会合并成一个 LineTerminator 所以会影响无法插入 LineTerminator 语法的执行
    - SingleLineComment
  - Token
    - IdentiferName
      - Name
      - Keywords
    - Punctuators
      - Punctuator
      - DivPunctuator
      - RightBracePunctuator
    - NullLiteral
    - BooleanLiteral
    - NumericLiteral
    - StringLiteral
    - Regular Expression Literals
    - Template
    - Automatic Semicolon Insertion

WhiteSpace 和 LineTerminator 可以作为 token 的分隔符 但是其实多个分隔符和一个分隔符的作用是一样的 在语法解析的时候都会忽略掉 增加多个后可以调整代码格式便于阅读。
同样的 Comment 是注释，也会被忽略，谈到注释写代码的时候不应该在所有地方都加上注释，而应该在重要的地方值得说明的地方加注释，一是因为注释在代码改动的时候需要跟着修改，大量显而易见的注释增加了冗余，和阅读维护成本，得不偿失。二是大量的注释会让人找不到逻辑的重点。
Token 是我们输入的有意义的信息
