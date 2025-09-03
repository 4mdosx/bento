# 🍱 Bento

Bento 一个面向多 WebApp 与本地工具仓库的脚手架，支持“拷贝式”模板注入与增量升级。

- 支持 Next.js 应用、通用 UI 组件、Middleware、安全头、工具类 CLI 等模板
- 支持 init 初始化、add 注入、upgrade 升级、doctor 自检
- UI底层由 shadcn 和 tailwind构 建，UI 可控，最大限度客制化。
- 最小化选择项，提供开箱即用的开发体验
- 内置本地化文档

## 👥 使用者画像与场景

### 使用者
- 个人/小团队开发者，维护多个 Next WebApp 与若干 CLI/脚本工具

### 典型场景
- 快速制作项目原型
- 对现有项目导入功能模块

## 📁 仓库结构

```
bento/
├── README.md           # 使用说明、命令手册、升级流程
├── package.json        # 提供 npx 脚手架命令
├── cli/                # 脚手架实现（Node）
├── scaffold/           # 开发工具
├── templates/          # 可选模板
├── docs/               # 项目文档
```

## 📂 templates 目录结构

```
templates/
[需要补充]
```

## 🚀 快速开始

### 安装

```bash
npm install -g @4mdosx/bento
```

### 创建新项目

```bash
bento init my-project
```

### 添加功能模块

```bash
# 添加认证中间件
bento add middleware/auth

# 添加 UI 组件
bento add ui/calender

# 添加配置
bento add page/landing
```

### 开发调试

```bash
# 进入开发环境
cd dev
npm run dev

# 访问模板调试页面
open http://localhost:3000/templates
```

### Middleware 模板

- **auth/**: 认证中间件配置，JWT token 验证，路由保护逻辑
- **i18n/**: 国际化中间件，多语言路由处理
- **headers-security/**: 安全头配置，CSP，XSS 防护
- **metrics/**: 监控中间件

### UI 组件模板

- **primitives/**: 基础 UI 组件 (Button, Input, Card, Modal)
- **composion/**: 布局组件 (Shell, Navbar, Sidebar, Footer)
- **pattern/**: 交互模式（表单，弹窗的数据页）

## 🔧 CLI 命令

```bash
# 初始化新项目
bento init <project-name> [options]

# 列出所有可用命令
bento list

# 查看模板信息
bento info <template-name>

# 添加模板到现有项目
bento add <template-name> [options]

# 更新模板
bento update <template-name> [options]
```

访问 `http://localhost:4465/meta` 查看模板调试界面。


