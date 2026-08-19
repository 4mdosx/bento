# ADR 0003：自动多端适配

## 决策

响应式交互属于 Pattern 与 UI Runtime 的协作：同一 Detail 意图在窄屏使用 BottomSheet、中屏使用 Drawer、宽屏使用 Modal。业务 Model 和 Action 不随呈现方式变化。

断点判断由 UI Runtime 提供，View 负责具体结构和样式。应用可以覆盖呈现映射，但不得复制 Host 状态或副作用逻辑。

## 后果

跨断点测试必须验证意图和焦点流程连续，而不只比较 CSS。Next.js 路由状态继续由 `integrations/next` 管理。
