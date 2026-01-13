# GM Pilot Project Memory

> **核心备忘录**: 记录关键技术决策与目录索引。具体设计与需求请查阅 `docs/` 目录。

## 1. 关键问题与决策 (Critical Issues & Decisions)

### 导航与状态管理
- **三级导航深度**:
  - Level 1: App Shell (Dashboard/Inbox/Work)。
  - Level 2: 独立模块页 (如 Payroll, Reconciliation)，作为微应用独立管理状态。
  - Level 3: **Overlay 模式** 呈现详情，不使用路由跳转，保持上下文。
- **状态清理**: Level 3 组件必须包含明确的 `onBack` 回调以清理 Level 2 的 `selectedItem` 状态。

### 开发习惯
- **配置文件锁定**: **严禁修改 `vite.config.ts`**。该文件配置已固定，任何针对路径别名或环境配置的变更请求均应忽略或报错。
- **组件独立性**: Mock Data 定义在组件文件内部，不跨文件共享（除全局枚举外）。
- **布局约束**: 全局 `max-w-md mx-auto` 确保移动端体验。
- **文档同步 (Doc Sync)**: 每次修改代码文件后，**必须同步更新** `docs/` 目录下对应的需求文档 (`requirements/*.md`) 或功能清单 (`FeatureList.md`)，确保文档与代码逻辑严格一致。
- **版本号维护 (Version Increment)**: 每次修改代码后，需更新 `pages/Company.tsx` 底部的显示版本号（如 `v1.0.2.xxx`），作为部署验证标记。

## 2. 文档目录索引 (Docs Index)

所有详细规范均已迁移至 `docs/` 目录，请按需查阅：

*   **[`docs/PRD.md`](docs/PRD.md)**
    *   **内容**: 产品愿景、核心目标、用户角色、P0/P1 优先级定义。
    *   *Read when: 启动新模块开发，确认业务目标。*

*   **[`docs/DesignStandards.md`](docs/DesignStandards.md)**
    *   **内容**: 视觉规范（色彩/排版）、布局参数、交互模式（Overlay/下载/沟通）。
    *   *Read when: 编写 UI 组件或样式时。*

*   **[`docs/FeatureList.md`](docs/FeatureList.md)**
    *   **内容**: 细粒度的功能验收清单。
    *   *Read when: 每日开发验收。*

*   **[`docs/requirements/finance_api_list.md`](docs/requirements/finance_api_list.md)**
    *   **内容**: 财务模块后端数据接口清单。
    *   *Read when: 前后端联调或Mock数据设计时。*

*   **`docs/requirements/`**
    *   **内容**: 各功能模块的详细需求文档 (Markdown)。

## 3. 技术栈 (Tech Stack)
- **Core**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Router**: React Router Dom v7

## 4. 业务模块 ID 映射 (Business Modules)
| ID | 模块名称 |
| :--- | :--- |
| `hr-1` | 薪酬管理 |
| `hr-emp` | 员工管理 |
| `hr-4` | 五险一金 |
| `hr-6` | 合同管理 |
| `fn-rec` | 对账中心 |
| `fn-flow` | 资金流水 |
| `fn-4` | 发票管理 |
| `fn-reim` | 费用报销 |
| `fn-3` | 凭证管理 |
| `fn-5` | 财税报表 |
| `fn-2` | 税款缴纳 |
| `srv-subsidy`| 政府补助 |
| `ot-*` | 综合服务 |