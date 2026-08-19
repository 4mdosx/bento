# 快速开始

本项目是 Application UI Toolkit，不使用单一层级链解释全部概念。开发流程由四个坐标共同确定：

Bento 当前只支持 Next.js App Router。代码结构与依赖限制见 [architecture.md](./architecture.md)。

1. 产品语义：Intent → Use Case。
2. 体验方案：Use Case → Pattern（Composition + Interaction + Adaptation）。
3. 运行架构：Domain Model + Actions → Host → View Contract。
4. 视图实现：View → Part / Slot → Primitive，Token 横向约束视图。

详细定义见 [concepts.md](./concepts.md)。

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

# Pattern（体验方案）

Pattern 表示解决一类 Use Case 的稳定体验方案，由 Composition、Interaction 和 Adaptation 共同组成。

# Part 与 Slot（视图组合）

例如一个 List Composition Pattern 可拆分为：
Filter Bar
Data Table
Info Section
Action Footer
Part 表示 View 中具有稳定语义的区域；Slot 是替换或注入 Part 的接口。React Component 是实现机制，不是架构层级。

# Primitive（基础视图单元）

Primitive 是不包含业务语义的最小可复用 View 单元，包括布局、控件和反馈三类，例如 Stack、Grid、Surface、Button、Input、Spinner。

# Token（视觉变量层）

spacing、color、radius、shadow。
Token 横向作用于 Primitive、Part 和完整 View，提供视觉一致性；它不是组件层级的末端。

# 交付方式

- View、Part、Primitive：CLI 写入用户源码。
- Host、Core、Adapter、UI Runtime：通过包使用。
