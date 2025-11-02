# 🍱 Bento

- 快速启动项目, 专注核心业务逻辑
- 由 shadcn 和 tailwind 构建，源码级交付，UI 完全可控
- 开箱即用、内置文档

## 📁 仓库结构

```
bento/
├── README.md           # 使用说明、命令手册、升级流程
├── package.json        # 提供 npx 脚手架命令
├── cli/                # 提供 npx 脚手架命令（Node）
├── youki/              # 项目核心代码 🗃️
├── templates/          # 可选初始化模板
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

## 开发调试

```bash
# clone this repon
npm link
npm run dev
```



