# 快速开始

Intent（行为动机）
↓
Use Case（使用场景）
↓
Pattern（结构模型）
↓
Block（结构区块）
↓
Primitive（基础单元）
↓
Token（视觉变量）

# Intent（行为层）

动词级别：Read、Browse、Modify、Review、Monitor、Configure。  
它不属于 UI，属于产品语义。

# Use Case（使用场景）

Intent 的具体化：
浏览用户
浏览日志
查看文章
编辑配置
带业务语义，但不涉及界面结构。

# Pattern（结构模型层）

设计系统提供第一个 UI 抽象层， 表示稳定的模型。
分为 Composition Pattern 和 Interaction Pattern 模型。
分别用来组织页面元素的位置和交互流程。提供实现的组合性。

# Block（页面区块层）

例如一个 List Composition Pattern 可拆分为：
Filter Bar
Data Table
Info Section
Action Footer
Block 表示可组合的结构块，是结构片段，而非组件。

# Primitive（基础布局层）
Stack
Inline
Grid
Text
Surface
Divider
表示最小结构单位。

# Token（视觉变量层）

spacing、color、radius、shadow。
全局的唯一变量，提供视觉一致性。

# 为什么不用 Component

在 React 生态中，Component 是开发者自定义的抽象单位，可能对应 Container、View、Hook、Page、Widget 等概念；各团队对 Component 的粒度定义不同。开发者可按自身需求，将 Component 层置于 Primitive 与 Pattern 之间。