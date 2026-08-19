# 可筛选资源列表

## 适用 / 不适用

适用于需要搜索、筛选、排序、分页、选择和行操作的同类资源集合。不适用于自由画布、树形导航或少量静态链接。

## 所需 Model

提供资源类型、`getKey`、`ListQuery` 与 query Action。页码和游标二选一；选择可受控或非受控；Action 必须响应取消信号。

## 最小示例

```tsx
<ListHost model={model} actions={actions}>
  {(host) => <ListView host={host} renderItem={(item) => item.name} />}
</ListHost>
```

完整示例位于 `apps/docs/src/component-docs/examples/ResourceListExample.tsx`，可在 `/overview/components/list` 交互验证。

## 定制边界

允许修改生成的 List View、条目、列、Filter Bar 和 Detail View，允许替换 Slot。禁止把请求协调移入 View、修改 Host 内部来改样式、重复实现取消与竞态保护，或建立另一套断点与 Overlay Runtime。
