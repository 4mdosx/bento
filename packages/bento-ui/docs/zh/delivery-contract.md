# 架构与交付契约

每项公共能力必须回答五个问题：产品语义是什么、属于哪类 Pattern、承担什么运行职责、采用什么视图粒度、通过源码还是包交付。

| 分类 | 命名 | 允许依赖 | 交付 | 定制 |
| --- | --- | --- | --- | --- |
| 共享契约 | Core | 无 UI 运行时 | 包 | 类型与薄接口 |
| 业务运行 | Host | Core、React | 包 | Model、Action、Slot、受控配置 |
| 框架适配 | Adapter/Integration | Core、Host 公共契约 | 包 | 配置与 escape hatch |
| UI 行为 | UI Runtime | Core、React、DOM | 包 | 行为配置 |
| 原子视图 | Primitive | View shared、UI Runtime | 源码 | 直接修改 |
| 语义区域 | Part/Slot | Primitive | 源码 | 替换 Slot 或修改源码 |
| 页面呈现 | View/Layout | Part、Host 公共契约 | 源码 | 结构与样式 |

薄封装统一使用产品语义命名；Action 接收取消信号；错误至少包含 `code`、`message`、`cause` 和 `retryable`；生命周期由 Host 所有；公共入口导出类型；底层实例仅通过具名 escape hatch 暴露。

List 的 `ListModel`、`ListActions`、`ListViewModel` 和 `ListSlots` 是首个冻结契约。新增能力不得从 Core、Host 或 UI Runtime 导入 View 实现。
