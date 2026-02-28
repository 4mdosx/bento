# Project Design Purpose

面向网站的设计系统与模板，用于快速构建小型、可持续定制化的应用。

## 为什么做这个系统？

本项目目标不仅在于构建组件库，而是在保持视觉一致的前提下，提供开箱即用的界面模式，帮助开发者以较低开发与维护成本构建长尾、内部级工具应用，并获得现代交互体验。

## 行为驱动设计

通过 Intent → Pattern → Block → Primitive 的层级模型，使结构设计稳定、便于记忆。

在现代界面中，Components 是常用的分层术语，多数项目会以 Components 组织可复用界面元素；不同团队对 Component 的粒度有各自定义。为避免概念混淆，本设计系统不引入 Components 这一层，将其留给项目代码自行使用。开发者可使用设计系统提供的 Primitive 与 Token 构建自有 Components，并应用于各种 Pattern，以响应用户 Intent。

## Opinionated Rapid Toolkit

- 默认支持完整响应式布局。
- 视觉风格中性，便于定制或作为透明工具层使用。
- 通过动效与对比进行强调，减少对颜色的依赖，为品牌色预留空间。

## 实用性优先（Pragmatic）

- 默认值完善、API 精简。
- 支持在需要时脱离默认约束。

通过 Layout Pattern 与 Interaction Pattern 组合，降低选择成本与变体数量，形成低心智负担的开发框架。
