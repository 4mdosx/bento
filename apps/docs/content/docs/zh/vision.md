# Bento Application UI Toolkit

Bento 是面向响应式 Web 应用的 Application UI Toolkit，用于快速构建小型、可持续定制的应用。它不是追求广泛通用性的基础组件库，也不只是视觉 Design System。

## 为什么做这个系统？

本项目通过预先确定的业务建模接口、应用模式、标准交互和自动多端适配规则，帮助开发者以较低开发与维护成本构建长尾应用、内部工具和个人项目。

开发者主要负责 Domain Model 与 Actions。Host 负责状态机、View Model 和副作用协调；可修改的 View 源码负责呈现。没有专门 UI 设计时，也应能快速得到可用、一致的应用。

## 概念坐标系

项目不再用一条层级链同时表达产品语义、交互、代码结构和视觉约束，而使用四个相互关联但彼此独立的坐标：

1. 产品语义：Intent → Use Case。
2. 体验方案：Use Case → Pattern；Pattern 由 Composition、Interaction、Adaptation 三类规则组成。
3. 运行架构：Domain Model + Actions → Host → View Contract。
4. 视图实现：View → Part / Slot → Primitive；Token 横向约束全部视图实现。

交付方式是独立维度：View、Part 和 Primitive 通过 CLI 进入用户源码；Host、Core、Adapter 和 UI Runtime 以包形式交付。

React Component 是实现机制，不是 Bento 的架构层级。详细定义见 [concepts.md](./concepts.md)。

## Opinionated Application Toolkit

- 默认提供自动多端适配。
- 视觉风格中性，便于定制或作为透明工具层使用。
- 通过动效与对比进行强调，减少对颜色的依赖，为品牌色预留空间。

## 实用性优先（Pragmatic）

- 默认值完善、API 精简。
- 支持在需要时脱离默认约束。

通过 Composition、Interaction 与 Adaptation 组合，降低选择成本与变体数量，形成低心智负担的应用开发框架。
