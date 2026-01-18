# Google AI Studio 项目部署到 Vercel

本指南帮助你将 Google AI Studio 项目安全地部署到 Vercel，保护 API 密钥不被泄露。

## 快速开始

### 1. 下载项目代码

从 Google AI Studio 下载你的项目代码：
- 访问 [aistudio.google.com](https://aistudio.google.com)
- 打开你的项目
- 点击右上角的 "Get code" 或类似按钮下载代码

### 2. 安装 OpenCode

OpenCode 是一个命令行 AI 编程助手，可以帮你完成部署流程。

```bash
curl -fsSL https://opencode.ai/install | bash
```

安装完成后，运行以下命令验证安装：

```bash
opencode --version
```

### 3. 使用 SKILL 部署

打开 OpenCode，告诉 OpenCode 项目目录，直接输入：

```
针对 xxx 目录，帮我安装这个 SKILL（https://github.com/BUPT-HJM/ai-studio-vercel-secure-deploy），并执行部署到 vercel
```

3. 跟着 OpenCode 的指引完成部署。它会：
   - 检查并安装 Vercel CLI
   - 引导你登录 Vercel
   - 收集必要的配置信息（API 密钥等）
   - 自动改造代码，创建安全的后端接口
   - 部署到 Vercel

## 前置要求

- Node.js 18+ 安装
- Vercel 账号（推荐用 GitHub 账号登录）
- Gemini API 密钥（从 [aistudio.google.com/apikey](https://aistudio.google.com/apikey) 获取）

## SKILL 功能

这个 SKILL 会自动完成以下工作：

- ✅ 创建安全的后端 API 路由
- ✅ 将 API 密钥配置到服务器端环境变量
- ✅ 修改前端代码，移除暴露的密钥
- ✅ 预部署检查，确保一次部署成功
- ✅ 自动部署到 Vercel 生产环境
