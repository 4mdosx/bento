# 操作手册

给仓库 owner 用，不进入文档站。用户从 `npx bento-kit@preview init` 或文档站「开始使用」进入。

`bento-kit` 还没作为稳定包长期驻留 npm 时，按场景选一条路线，不要混用。

| 路线 | 什么时候用 | 依赖从哪来 |
| --- | --- | --- |
| 开发自测 | 改 CLI、模板、Host、Registry，在本机反复 `init` | 本仓库 `file:`（`--local`） |
| 上线发布 | 给别人 `npx bento-kit@…` 用，或 Preview 对外试用 | npm registry（`preview` tag） |

环境：Node.js 24、npm 11。命令都在仓库根目录执行，除非另有说明。生成的应用放在仓库外面，不要 `init` 进本 monorepo。

## 路线一：开发自测

日常改代码只走这条。不发布、不打 tag。

### 1. 安装本仓库

```bash
npm install
npm run verify
```

### 2. 用本地 CLI 建项目

```bash
npx bento init ../my-app --local
cd ../my-app
npm run dev
```

`--local` 会把新项目的 `bento-kit` 写成 `file:<本仓库>/packages/bento-kit`。改 Host、CLI 或模板后，回到应用目录再 `npm install` 或重启 `npm run dev` 即可。

不要在这一步写 `npx bento-kit@0.1.0-preview.1`：那个版本此时不在 npm 上，或不是你刚改的代码。

### 3. 在新项目里继续

```bash
npx bento doctor
npx bento add detail
npx bento add documentation
```

业务从 `app/page.tsx` 的 List Model / Actions 开始改。View 源码在 `components/bento/`。

### 4. 发版前冒烟（仍不发布）

测的是用户真正会装到的 tarball（`files`、`prepack`、CLI、Registry），不是 monorepo 里的 `src/`。

```bash
npm run pack:smoke
```

或手跑：

```bash
cd packages/bento-kit
npm pack
cd /tmp
npx --yes --package=/绝对路径/bento-kit-0.1.0-preview.1.tgz bento init demo-app --skip-install
cd demo-app
# 把 package.json 里的 bento-kit 改成该 .tgz 的绝对路径
npm install --legacy-peer-deps
npx bento doctor
npm run dev
```

`npx 某个.tgz` 会失败（shell 会把 tarball 当脚本执行）。必须用 `--package=<tgz> bento …`。

## 路线二：上线发布

给外部或另一台机器用 `npx bento-kit@preview init` 时才走这条。当前 `publishConfig.tag` 是 `preview`，`npm publish` 不会打到 `latest`。

### 1. 改版本号

只改将要发布的包：`packages/bento-kit/package.json` 的 `version`。Preview 破坏性变更（改名、删 API、改交付方式）按 ADR 0004 升 Preview 次版本，例如 `0.1.0-preview.1` → `0.1.0-preview.2`。

同步这些地方里的版本字符串：

- `registry/registry.json` 里对 `bento-kit` 的依赖
- `apps/docs/app/getting-started/page.tsx`
- `packages/bento-kit/README.md`
- `packages/bento-kit/cli/command.js` 的 `.version(...)`

### 2. 仓库门禁

```bash
npm run verify
npm run pack:smoke
```

`verify` 过的是源码；`pack:smoke` 过的是即将上传的安装包。

### 3. 登录 npm

```bash
npm whoami
npm login
```

包名是 `bento-kit`（公开包）。第一次发布前确认该名仍可用：`npm view bento-kit`。

### 4. 发布

在包目录发布，让 `prepack` 构建并写入 Registry：

```bash
cd packages/bento-kit
npm publish
```

不要加 `--tag latest`。需要显式指定时：

```bash
npm publish --tag preview
```

不要在仓库根目录对 `@4mdosx/bento` 执行 `npm publish`。

### 5. 发布后验收

```bash
npm view bento-kit dist-tags
npx bento-kit@preview init ../release-app
cd ../release-app
npm run dev
npx bento doctor
```

用户侧最小路径：

```bash
npx bento-kit@0.1.0-preview.1 init my-app
cd my-app
npm run dev
```

未指定版本时，应使用 `@preview`，不要依赖 `latest`（Preview 阶段没有 latest）。

### 6. 以后打 latest

只有契约稳定、准备让 `npx bento-kit` 默认装到该版本时，才：

1. 把 `packages/bento-kit/package.json` 的 `publishConfig.tag` 改成 `latest`（或发布时 `--tag latest`）
2. 视需要去掉版本号里的 `-preview.n`
3. 再走本节 2–5 步

## 不要做的事

- 为了自己试 `init` 就 `npm publish`
- 用 `--local` 建出来的应用去证明「用户安装没问题」
- 把生成应用放进本仓库 `apps/` 或 `packages/`
- 对根包 `@4mdosx/bento` 发布
- Preview 阶段发布到 `latest`
