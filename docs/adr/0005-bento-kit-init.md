# ADR 0005：包名 bento-kit 与 init 脚手架

## 状态

Accepted，自 0.1.0-preview.1 起生效。

## 决策

对外包名由 `bento-ui` 更名为 `bento-kit`。CLI 随包交付，`bento init` 在目标目录创建 git 仓库、Next.js App Router 模板和 Bento 依赖，安装依赖后写入基础 Registry UI（button、form、dashboard-shell、list）与可替换的 List 启动页。

## 理由

包名需要覆盖 CLI、Host 与启动模板，而不仅是 UI 运行时。最小路径应从空目录直接进入可写业务 Model/Actions 的应用，而不是要求用户先自备 Next.js 工程。

## 后果

所有公共导入从 `bento-ui/*` 改为 `bento-kit/*`。`bento add` 仍用于追加 Registry 项，并继续保护本地修改。Preview 次版本提升至 `0.1.0-preview.1`。
