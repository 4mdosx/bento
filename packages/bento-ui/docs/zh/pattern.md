# Pattern Collection

Pattern 是面向 Use Case 的体验方案，由 Composition、Interaction、Adaptation 三类规则共同定义，不等同于单个组件或固定页面结构。

## Composition

组织页面结构。

### Stack

页面元素沿垂直方向排列。

## List Pattern

支持以 Browse 为主、并可组合 Read、Review、Modify Intent 的资源集合用例。

### Composition

Filter Part（可选）→ Data Region → Pagination Part（可选）

### Interaction

查询、加载、空状态、错误、刷新、筛选、排序、选择和条目 Action。

### Adaptation

- 移动端：List View + Bottom Sheet Detail。
- 平板端：List/Table View + Drawer Detail。
- 桌面端：Table View + Modal 或并列 Detail。
