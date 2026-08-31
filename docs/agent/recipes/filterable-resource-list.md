# 创建可筛选资源列表

1. 运行 `bento init`。启动模板已包含 `list`；如需补写可再执行 `bento add list`。
2. 定义资源类型、稳定的 `getKey` 和初始 `ListQuery`。
3. 实现接收 `AbortSignal` 的 query Action；把搜索、筛选、排序和分页发送给数据源。
4. 用 `ListHost` 包住生成的 `ListView`，提供移动条目和桌面列映射。
5. 在 View 源码中调整布局；不要复制 `useListHost`。
6. 验证 loading、empty、error、refresh、快速连续查询取消、键盘访问和窄/宽断点。

完成标准：业务代码只定义 Model、Actions 和映射；生成 View 可独立修改；Host 包代码未改动；`npm run verify` 通过。
