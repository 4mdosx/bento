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

启动统一 docs（包含使用说明、组件验证、项目定位与项目文档）：

```bash
npm run dev
```

`npm run dev` 与 `npm run dev:docs` 均启动 docs，默认地址为 `http://localhost:3000`。

新组件必须遵循 `CONTRIBUTING.md` 与 `docs/contributing/component-development.md`：先确定 Use Case
和交付边界，再实现契约、加入 spec 映射的可执行组件文档、补齐自动门禁与文档。

启动文档站（使用说明、组件文档、项目定位与冻结架构）：

```bash
npm run dev:docs
```

最小 MVP 路径见 [操作手册](docs/operations.md)：开发自测用 `npx bento init ../my-app --local`；对外发布走 `preview` tag，不要为了自测 `npm publish`。

根级命令：

- `npm run lint`：检查全部 workspace。
- `npm run typecheck`：检查 TypeScript 类型。
- `npm test`：运行现有自动化测试。
- `npm run build`：执行生产构建。
- `npm run verify`：依次执行以上全部质量门禁。
- `npm run pack:smoke`：用真实 tarball 跑一遍 `init`（发版前）。

## 📁 仓库结构

```
bento/
├── apps/docs/          # 面向用户的文档站、可执行组件验证与示例
├── docs/               # 给仓库 owner 的操作手册、ADR、Agent 配方
├── packages/bento-kit/ # CLI、Host、Next 集成、UI Runtime 和 View
├── registry/           # 源码交付的 Primitive / View
├── roadmap/            # 本地开发计划，不进入 Git
└── package.json        # workspace 与开发命令
```
