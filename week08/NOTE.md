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
