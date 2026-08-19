# 概念坐标系

本文定义 Bento Application UI Toolkit 的正式术语。目录、公共 API、文档和 Agent 指令都应使用这些含义。

## 1. 产品语义

### Intent

用户希望完成的稳定目标，例如 Browse、Read、Modify、Review、Monitor、Configure。Intent 不描述页面结构或组件。

### Use Case

Intent 在具体业务资源和上下文中的落地，例如“浏览用户”“审核内容”“编辑项目设置”。Use Case 连接产品需求与体验方案，但不指定 React 实现。

关系：一个 Intent 可以对应多个 Use Case；一个 Use Case 也可能包含多个 Intent。

## 2. 体验方案

### Pattern

解决一类 Use Case 的可复用体验方案。Pattern 不是单个组件，也不是固定 DOM 结构，而是以下三类规则的组合：

- Composition：页面区域及其组合关系，例如 Filter → Data Region → Pagination。
- Interaction：状态转换和操作规则，例如加载、筛选、选择、提交、撤销。
- Adaptation：同一意图针对断点、输入方式和设备能力的标准呈现规则。

例如 List Pattern 可以在移动端使用条目列表和 Bottom Sheet，在桌面端使用 Table 和 Modal；这是同一 Pattern 的不同 Adaptation。

## 3. 运行架构

### Domain Model

业务数据及其领域含义。Domain Model 不包含组件状态、断点或 DOM 信息。

### Actions

Host 可调用的业务操作或端口，例如 query、save、delete、send。请求库、路由和持久化实现通过 Adapter 接入 Actions。

### Host

包级运行单元。Host 持有 Use Case 的运行状态，管理状态机、View Model、异步副作用和标准交互，并通过 View Contract 向视图提供数据与事件。

Host 按运行职责命名，例如 ListHost、FormHost、ChatHost；Table、`<form>`、ChatBubble 等视觉元素本身不是 Host。

### View Model

由 Host 派生、可直接供 View 渲染的状态。它可以包含 loading、empty、error、selection 和可用操作，但不包含具体样式。

### View Contract

Host 与可替换 View 之间稳定且有类型的接口。用户定制 View 时不需要修改 Host 内部。

## 4. 视图实现

### View

一个 Pattern 或 Host 的完整呈现实现。View 可以由 CLI 写入用户源码并直接修改。

### Part

View 中具有稳定语义的区域，例如 FilterBar、DataRegion、Pagination、MessageComposer。

### Slot

替换或注入 Part 的接口。Slot 是扩展机制，不等同于默认视图实现。

### Primitive

不包含业务语义的最小可复用 View 单元，包括：

- Layout Primitive：Stack、Inline、Grid、Surface。
- Control Primitive：Button、Input、Select。
- Feedback Primitive：Spinner、Progress、Alert。

### Token

横向约束所有 View 层的视觉语义，包括 spacing、color、radius、shadow、motion 和 breakpoint。Token 不是 Primitive 下方的组件层级。

React Component 是上述概念的实现方式之一，不作为架构分类。

## 5. 包级基础能力

### Core

无 UI、尽量无框架依赖的共享契约、错误类型和基础类型。

### Adapter

对请求、Schema/校验、路由、日志等外部能力的薄适配层。Adapter 统一 Bento 所需的命名、类型、错误与生命周期，同时保留底层能力的 escape hatch。

项目只支持 Next.js；Next.js 框架特有能力统一放入 `integrations/next`，不再为其他前端框架设计通用路由抽象。Adapter 仍用于请求、Schema、日志等第三方能力的稳定薄接口。

### UI Runtime

支撑标准 UI 行为但不决定业务外观的运行能力，例如 Overlay Stack、Focus Management、Scroll Lock、Keyboard、Gesture 和 Breakpoint Runtime。

Modal、Drawer、BottomSheet 的视觉外壳属于 Primitive 或 View；其 Portal、Focus、Stack 等行为属于 UI Runtime。

不再使用 `infrastructure` 同时指代 UI 行为基础和第三方库适配。

## 6. 交付坐标

| 类型 | 默认交付方式 | 主要定制方式 |
| --- | --- | --- |
| View / Part / Primitive | CLI 写入用户源码 | 直接修改结构和样式 |
| Host | npm 包 | Model、Actions、View Contract、受控配置 |
| Core / Adapter / UI Runtime | npm 包 | 稳定接口与 escape hatch |

交付方式不决定概念层级；同一个 Use Case 会同时使用源码交付的 View 和包交付的 Host。

## 7. 自动多端适配

Application UI Toolkit 为同一个 Use Case 提供自动多端适配：

- 根据使用端自动选择标准化的 Composition、Interaction 和 Adaptation。
- Host 与 Domain Model 保持稳定，View 根据使用端采用合适的呈现方式。
