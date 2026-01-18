# SKILL 快速将 Google AI Studio 项目部署到 Vercel

本指南使用 SKILL 帮助你将 Google AI Studio 项目安全快速地部署到 Vercel，保护 API 密钥不被泄露。
```
1、安装 SKILL：https://github.com/BUPT-HJM/ai-studio-vercel-secure-deploy
2、执行该 SKILL 进行部署
```

## Install（For LLM Agents）
把该项目克隆到当前项目文件夹下的 .claude/skills 文件夹下

## 快速开始

### 1. 下载项目代码

从 Google AI Studio 下载你的项目代码：
- 访问 [aistudio.google.com](https://aistudio.google.com)
- 打开你的项目
- 点击右上角的 "Download App" 下载代码

### 2. 选择 AI 工具

你可以使用任何 AI 编程工具来协助完成部署流程。如下选项：

- **OpenCode**
- **Cursor**
- **Claude Code**
- **Antigravity**
- **其他支持 Skill 的 AI 工具**

下面以 OpenCode 为例进行说明。

#### OpenCode 安装指南

OpenCode 是一个命令行 AI 编程助手（其他安装模式参考 [OpenCode 官方文档](https://opencode.ai/docs)

**Windows 用户**

如果你使用 Windows 系统，请先完成以下步骤：

1. **安装 Node.js**：
   - 访问 [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)
   - 下载 LTS 版本的安装程序
   - 按照安装向导完成安装

2. **安装 OpenCode**：
   打开命令提示符 (CMD) 或 PowerShell，运行以下命令：
   ```bash
   npm install -g opencode-ai
   ```

**Mac/Linux 用户**

```bash
curl -fsSL https://opencode.ai/install | bash
```

安装完成后，运行以下命令验证安装：

```bash
opencode --version
```

### 3. 使用 SKILL 部署

进入项目目录，使用命令行工具打开 OpenCode（或者使用其他 AI 工具输入框）
```bash
opencode
```
直接输入：
```
1、安装 SKILL：git@github.com:BUPT-HJM/ai-studio-vercel-secure-deploy.git
2、执行该 SKILL 进行部署
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
