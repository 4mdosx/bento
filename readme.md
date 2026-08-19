# 🍱 Bento

- 面向 Next.js App Router 的 Application UI Toolkit
- 快速启动项目，专注核心业务逻辑
- 由 shadcn 和 tailwind 构建，源码级交付，UI 完全可控
- 开箱即用、内置文档

## 开发

环境要求：Node.js 24、npm 11。首次检出后安装依赖并运行统一验证：

```bash
npm install
npm run verify
```

同时启动 playground 组件验证工作台与 docs：

```bash
npm run dev
```

只启动单个应用可使用 `npm run dev:playground` 或 `npm run dev:docs`。
联合启动默认使用 playground `3000`、docs `3001`；需要避让端口时可设置
`PLAYGROUND_PORT` 与 `DOCS_PORT`。

新组件必须遵循 `CONTRIBUTING.md` 与 `docs/component-development.md`：先确定 Use Case
和交付边界，再实现契约、加入交互式 workbench、补齐自动门禁与文档。

启动文档站（客户入门、AI 配方与冻结架构）：

```bash
npm run dev:docs
```

最小 MVP 路径：安装 `bento-ui@0.1.0-preview.0`，运行 `bento init` 与
`bento add list`，定义 List Model/Actions，再由 ListHost 连接生成的 View。
完整说明位于 `apps/docs`。

根级命令：

- `npm run lint`：检查全部 workspace。
- `npm run typecheck`：检查 TypeScript 类型。
- `npm test`：运行现有自动化测试。
- `npm run build`：执行生产构建。
- `npm run verify`：依次执行以上全部质量门禁。

## 📁 仓库结构

```
bento/
├── apps/               # 文档、playground 与示例应用
├── packages/bento-ui/  # Host、Next 集成、UI Runtime 和 View
├── cli/                # 当前 CLI 入口，后续迁移为 workspace package
├── roadmap/            # 本地开发计划，不进入 Git
└── package.json        # workspace 与开发命令
```
