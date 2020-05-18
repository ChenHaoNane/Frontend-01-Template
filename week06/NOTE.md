# 每周总结可以写在这里

### 有限状态机 Finite-State Machine

- 每一个状态都是一个机器
  - 每个机器离我们可以计算、存储、输出
  - 所有这些机器接收的输入是一致的
  - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，他应该是纯函数
- 每一个机器知道下一个状态
  - Moore 机 输出只依赖当前状态。eg：电梯开关
  - Mealy 机 输出依赖于输入和状态

适合场景
- 处理字符串
- 敌人AI
- 正则实现

作业：
  - 使用状态机完成“abababx”的处理
    [abababx.js](./abababx.js)
  - 可选作业：我们如何用状态机处理完全未知的pattern？
    [match.js](./match.js)

### 解析HTML Body

- 

### 计算CSS

- 获取 style 标签中的内容 使用 css 进行 parse
- 每一次创建 element 后 对 style 进行匹配
- 通过元素的所有父元素判断是否与当前规则匹配 优先判断当前元素
- 拆分选择器
- 判断是否匹配
- 生成 computeStyle属性
- 确定覆盖关系



作业：
  - 完成 DOM 树的构建 和 CSS 的计算
  - 可选作业 实现复合选择器，实现支持空格的 Class 选择器
  使用状态机分解选择器: [selectorDFS.js](./selectorDFS.js)
  在 seletor match 阶段 将所有的 selector 进行匹配 [parser.js](./parser.js) 23行开始
  在计算四元组权重的时候对所有的 selector 进行计算 [parser.js](./parser.js) 59行开始