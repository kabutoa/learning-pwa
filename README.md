# Learning PWA

这是一个用于学习和实践 Progressive Web App (PWA) 技术的示例项目。

## 功能特性

- ✨ 基于 Koa.js 的后端服务
- 📱 完整的 PWA 配置（manifest.json）
- 🔄 离线缓存支持
- 📢 推送通知功能
- 📝 规范的代码提交（husky + commitlint）

## 技术栈

- Koa.js
- Service Worker
- Web Push
- PWA Manifest
- Husky
- Commitlint

## 开始使用

### 环境要求

- Node.js >= 14
- pnpm

### 安装

```bash
# 克隆项目
git clone https://github.com/kabutoa/learning-pwa.git

# 进入项目目录
cd learning-pwa

# 安装依赖
pnpm install
```

### 运行

```bash
# 启动开发服务器
pnpm start
```

服务器将在 http://localhost:3000 启动（具体端口请查看控制台输出）

## 项目结构

```
learning-pwa/
├── app.js          # 服务器入口文件
├── public/         # 静态资源目录
├── .husky/         # Git hooks 配置
└── package.json    # 项目配置文件
```

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解详细更新记录。

## 许可证

[MIT](LICENSE)