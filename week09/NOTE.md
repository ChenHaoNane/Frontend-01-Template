# 每周总结可以写在这里

HTML 在结构上与 SGML 和 XML 存在联系

### SGML

需要记住的实体

- \<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
- \<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
- \<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
- \<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->

### XML

namespace

### 语义

语义和样式没有关系 不能因为样式的原因选择某些标签 

- aside 非正文部分
- hr 内容的转折
- hgroup 一系列相关标题
- time 时间
- address 文章作者邮寄地址
- nav 菜单
- figure figcaption 主文章相关的图像、照片等流内容
- abbr 缩写
- blockquote 表示段落级引述内容
- q 表示行内的引述内容
- cite 表示引述的作品名
- dfn 包裹被定义的名词
- pre, samp, code

### 语法

#### 类型

- Element
- Comment
- DocumentType
- CDATA

#### 字符引用

- \<!ENTITY quot    "&#34;"> <!--  quotation mark, U+0022 ISOnum -->
- \<!ENTITY amp     "&#38;#38;"> <!--  ampersand, U+0026 ISOnum -->
- \<!ENTITY lt      "&#38;#60;"> <!--  less-than sign, U+003C ISOnum -->
- \<!ENTITY gt      "&#62;"> <!--  greater-than sign, U+003E ISOnum -->

### DOM

- Node
  - Element
    - HTMLElement
    - SVGElement
  - Document
  - CharacterData
    - Text
    - Comment
    - ProcessingInstruction
  - DocumentFragment
  - DocumentType

#### 导航类操作

- parentNode
- childNodes
- firstChild
- lastChild
- nextSibling
- previousSibling

#### 修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

appendChild 和 insertBefore 会将当前节点移除再插入

childNodes 和 child 是 living 的

#### 高级操作

- compareDocumentPosition
- contains
- isEqualNode
- isSmaeNode
- cloneNode

### Event

addEventListener options passive 表示在回调函数不会阻止默认事件 可以提高滑动的性能 因为不用等待函数执行