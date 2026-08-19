# 代码结构与依赖规则

Bento 当前只面向 Next.js App Router。目录按运行职责和交付边界组织，不按 Intent 或 Pattern 名称建立顶层代码层级。

## 目录树

```text
packages/bento-ui/src/
├── core/                  # 预留：无 UI 的共享契约与错误类型
├── hosts/                 # 包交付：状态、View Model 与副作用协调
│   └── list/
├── integrations/
│   └── next/              # 包交付：Next.js App Router、缓存、Server Action 集成
├── ui-runtime/            # 包交付：不决定业务外观的 UI 行为
│   ├── adaptation/
│   └── overlay/
├── views/                 # 未来由 Registry/CLI 源码交付的默认视图
│   ├── primitives/
│   │   └── overlay/
│   ├── parts/
│   │   └── list/
│   ├── layouts/
│   ├── list/
│   ├── detail/
│   └── shared/
├── index.ts
└── theme.css
```

`core/` 在出现真实共享契约前不创建占位文件。后续建立 Registry 时，`views/` 将成为可复制源码的来源或迁移至仓库根级 `registry/`；Host、Integration 和 UI Runtime 继续作为包代码。

## 各目录职责

### hosts

Host 管理 Use Case 的运行状态、View Model、异步副作用和标准交互，不包含 Tailwind class 或具体页面结构。

`hosts/list` 已提供 ListHost、统一 Query、异步协调、选择和 Row Action；View 只接收 View Model 与受控分页回调。

### integrations/next

只放 Next.js 特有能力，例如：

- App Router URL 状态。
- Server Actions。
- Route Handlers。
- Next.js cache/revalidation。
- Server/Client 边界适配。

通用 View 不直接导入 `next/*`。例如 Detail View 只负责多端呈现，URL 查询参数由 `integrations/next/useDetailRouteState` 管理。

### ui-runtime

提供标准 UI 行为，但不决定最终业务外观：

- Overlay Portal、Stack、Focus、Scroll Lock、Escape Key。
- 断点检测和自动多端适配所需的运行能力。
- 后续的 Keyboard、Gesture 和 Motion Runtime。

UI Runtime 不使用 Tailwind class，不依赖具体 View，也不依赖 Next.js。

### views

保存可修改的默认 UI 实现：

- `primitives`：Button、Modal、Drawer、BottomSheet 等无业务语义视图。
- `parts`：FilterBar、DataRegion、Pagination 等具有稳定语义的视图区域。
- `layouts`：DashboardShell、ResponsiveLayout 等空间和适配实现。
- `list`、`detail`：完整 Pattern/Host View。
- `shared`：随 View 源码共同交付的 cn、tokens 等视图依赖。

View 可以依赖 Host 公共契约与 UI Runtime，但包级运行代码不能反向依赖 View。

## 依赖方向

允许的依赖方向：

```text
core
  ↑
hosts       ui-runtime       integrations/next
  ↑              ↑                    ↑
  └──────────── views ────────────────┘
```

箭头表示上层可以使用下层提供的能力；具体规则如下：

1. `core` 不依赖 React、Next.js、DOM、Host、UI Runtime 或 View。
2. `hosts` 可依赖 React 和 core，不依赖 views、Tailwind 或 Next.js。
3. `ui-runtime` 可依赖 React、DOM 和行为类第三方库，不依赖 views、hosts 或 Next.js。
4. `integrations/next` 可以依赖 Next.js、core 和 host 公共契约，不依赖具体 View。
5. `views` 可以依赖 hosts、ui-runtime 和 integrations/next 的公共入口。
6. 目录之间禁止引用对方内部文件；跨职责引用必须经过各目录的 `index.ts` 公共入口。
7. 根 `src/index.ts` 只负责兼容性聚合，不作为内部模块之间的导入入口。

## Next.js 边界

- 默认采用 App Router。
- 使用浏览器状态、Context、effect 或事件处理器的文件必须明确标记 `'use client'`。
- Server Component 不导入 Client Host 的实现，只通过可序列化 Props 传递数据。
- Next.js 路由、缓存和 Server Action API 只进入 `integrations/next` 或明确的应用入口。
- View 不自行发起业务请求；请求由 Server 层或 Host Actions 协调。

## 公共导入

用户代码优先从职责明确的子路径导入：

```ts
import { ListHost } from 'bento-ui/hosts/list'
import { useDetailState } from 'bento-ui/integrations/next'
import { OverlayProvider } from 'bento-ui/ui-runtime/overlay'
import { ListContainer } from 'bento-ui/views'
```

根入口暂时保留现有聚合导出，以降低目录迁移造成的兼容性影响。
