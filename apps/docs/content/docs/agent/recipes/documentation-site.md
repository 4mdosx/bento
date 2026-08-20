# 使用 Bento 自举文档站

1. 运行 `bento init` 与 `bento add documentation`。
2. 在全局样式入口导入生成的 `components/bento/theme.css`，不要复制基础 Token。
3. 用生成的 `SiteHeader`、`SiteFooter`、`DocsLayout`、`DocsSidebar` 和内容组件组合页面。
4. 路由、内容读取和导航数据保留在应用中；生成组件只负责语义结构与表现。
5. 需要改变外观时修改生成源码或覆盖语义 Token，不要建立第二套断点、Overlay 或请求协调。
6. 运行 `bento diff documentation` 和 `npm run verify`。

完成标准：文档站使用系统默认 Token；主要页面结构来自 Registry 源码；应用状态没有进入 View；验证通过。
