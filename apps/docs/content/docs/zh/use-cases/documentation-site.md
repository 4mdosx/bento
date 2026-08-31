# 文档站自举

## 目标

使用 Bento 的系统默认 Token 和 Registry 交付的可编辑呈现组件构建文档站，以真实消费过程发现设计系统与组件能力缺口。

## Model 与边界

- 文档内容、目录数据和路由状态由应用持有。
- `documentation` 是无状态的源码交付 View 集合，只提供站点壳、文档布局、卡片、代码块和提示块。
- 文档站直接消费 `bento-kit/theme.css` 的默认 Token；应用主题文件只用于显式覆盖，不复制基础 Token。
- 响应式断点、Overlay 和请求协调继续使用现有公共基础设施。

## 获取与使用

```sh
bento init
bento add documentation
```

生成源码位于 `components/bento/views/Documentation.tsx`，可以在应用内修改视觉结构。

## 完成标准

- 文档站不维护第二套基础 Token。
- 页面壳、文档布局和常用内容呈现由生成组件提供。
- `bento diff documentation` 能检查生成源码是否发生本地修改。
- `npm run verify` 通过。
