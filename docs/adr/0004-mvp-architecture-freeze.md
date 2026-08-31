# ADR 0004：0.1 Preview 架构冻结

## 状态

Accepted，冻结范围从 0.1 Preview 开始。

## 决策

0.1 MVP 只承诺 Next.js App Router 下的 List 垂直闭环。Core、Host、Integration、UI Runtime 与源码交付的 Primitive、Part、View、Layout 是固定职责；不再增加顶层层级或允许反向依赖。

包层负责稳定契约、状态、副作用、请求取消、错误和通用行为；源码层负责结构、样式和业务呈现。对外最小路径为：`bento init` 创建 Next.js 项目并写入基础 UI 与 List 启动模板、替换 List Model/Actions、通过统一质量门禁。

Form 与 Chat 属于后续 Host，不进入 0.1 MVP。只有当第二个 Host 证明需要共享能力时，才允许扩展 Core 或 Adapter。

## 变更规则

冻结期内允许向后兼容地增加字段和能力；删除、重命名、依赖反转或交付方式变化必须新增 ADR，并提升 Preview 次版本。
