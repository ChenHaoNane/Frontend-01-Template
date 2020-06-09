# 每周总结可以写在这里

### 选择器语法

- 简单选择器

  - \*
  - div
  - .cls
  - #id
  - [attr=value]
  - :hover
  - ::before

- 复合选择器

  - 简单选择器的组合
  - * 或者 div 在最前面 伪类 或者 伪元素在最后面

- 复杂选择器

  - 空格
  - \>
  - ~
  - /+
  - ||

### 选择器优先级

四元组 inline id class|attr tag

#### 伪类

- 链接/行为
  - :any:link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target
- 树结构
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child
- 逻辑型
  - :not
  - :where :has

#### 伪元素

- ::before
- ::after
- ::first-letter
- ::first-line


#### Normal Flow

- Formatting Context
  - Block Formatting Context 产生情况为 float absolute block containers block boxes with 'overflow' other than 'visible'
  - Inline Formatting Context
- Element 元素会产生 box
  - block-level element display: block | table | list-item
  - inline-level element display: inline | inline-flex | inline-block | inline-table
- Box
  - block-level box 参与 block formatting context
  - block container box children 按照 block 布局
  - block box block-level && block container
  - Anonymous block boxes inline 中与 block 一起布局时产生
  - inline-level box 参与 inline formatting context
  - atomic inline-level boxes 作为单独 inline 参与布局
  - Anonymous inline boxes
- Margin
  - collapsing margins


  