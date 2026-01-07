# GM Pilot - 总经理驾驶舱

> 专为中小企业总经理（GM）设计的移动端人事财务外包管理 App。

## 📚 核心文档 (Documentation)

我们在 `docs/` 目录下维护了严格的版本化文档，用于指导开发。

### 1. [产品需求文档 (PRD)](docs/PRD.md)
*   **作用**: 项目的单一真理来源。定义了愿景、核心目标、用户角色及模块优先级 (P0/P1)。
*   **阅读时机**: 开发新模块前，用于确认功能范围。
*   **当前状态**: v1.4.0 (内部试运行).

### 2. [设计规范 (Design Standards)](docs/DesignStandards.md)
*   **作用**: 视觉语言指南。定义了 "Modern Clean" 风格，包括色彩系统、排版、毛玻璃效果及标准的 **Level 3 Overlay** 交互模式。
*   **阅读时机**: 构建任何 UI 组件或页面布局前。

### 3. [功能清单 (Feature Checklist)](docs/FeatureList.md)
*   **作用**: 细粒度的验收标准。追踪代码库中每个功能的实际实现状态。
*   **阅读时机**: 每日开发前，用于核对进度与验收。

---

*关于技术栈详情、代码习惯及项目备忘，请参考 **[memory.md](memory.md)**.*

## 🚀 如何运行 (How to Run)

本项目基于 React 19 + TypeScript + Vite/Webpack 构建。

### 环境要求
- Node.js (推荐 v18+)
- npm 或 yarn

### 快速开始

1.  **安装依赖**
    ```bash
    npm install
    ```

2.  **启动本地开发服务器**
    ```bash
    npm run dev
    # 或根据你的 package.json 配置
    npm start
    ```

3.  **构建生产版本**
    ```bash
    npm run build
    ```

### 目录结构说明

*   `pages/`: 页面级组件 (Level 1 & Level 2)
*   `components/`: 通用 UI 组件
*   `docs/`: 项目文档 (PRD, 设计规范等)
*   `types.ts`: 全局类型定义
*   `memory.md`: 开发备忘录与技术决策记录
