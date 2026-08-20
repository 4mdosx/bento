# Agent 入口

1. 在 `manifest.json` 中按 `useCases` 选择能力。
2. 阅读对应 Use Case 的适用条件、Model 和定制边界。
3. 使用 `bento init`，再用 `bento add <name>` 获取可改视图源码。
4. 从 `bento-ui/hosts/*` 接入 Model 和 Actions；只在应用源码中修改视觉结构。
5. 按配方完成任务并运行 `npm run verify`。

禁止修改或复制 Host 内部以定制外观；禁止自行建立第二套请求取消、Overlay、断点或 Token 基础设施。需要改变行为时优先使用公共契约，缺失能力应作为 API 需求提出。

当前配方：[`创建可筛选资源列表`](./recipes/filterable-resource-list.md)、[`使用 Bento 自举文档站`](./recipes/documentation-site.md)。
