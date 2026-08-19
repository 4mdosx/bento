# 🍱 Bento

- 面向 Next.js App Router 的 Application UI Toolkit
- 快速启动项目，专注核心业务逻辑
- 由 shadcn 和 tailwind 构建，源码级交付，UI 完全可控
- 开箱即用、内置文档

## 开发

启动 playground（组件展示与用例闭环）：

```bash
npm run dev -w playground
```

## 📁 仓库结构

```
bento/
├── apps/               # 文档、playground 与示例应用
├── packages/bento-ui/  # Host、Next 集成、UI Runtime 和 View
├── cli/                # 当前 CLI 入口，后续迁移为 workspace package
├── roadmap/            # 本地开发计划，不进入 Git
└── package.json        # workspace 与开发命令
```
