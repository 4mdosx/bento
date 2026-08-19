# ADR 0002：Host 边界

## 决策

Host 以 Domain Model、Actions、State、View Model 和 Slots 为统一契约。Host 管理异步副作用与状态机，不包含 Tailwind class 或页面结构。

受控值必须同时提供 `value` 与 `onChange`；非受控值使用 `defaultValue`，两种模式不得在生命周期中切换。Action 接收 `AbortSignal`，错误在 Host 边界归一化，同时保留原始 `cause`。

## 后果

View 只消费 View Model 并触发 Action。底层客户端或第三方实例可通过明确的 escape hatch 暴露，不能成为默认 API。
