# GM Pilot Project Memory

> 记录本项目的关键开发标准、设计规范及代码习惯，用于指导后续开发。

## 1. 技术栈 (Tech Stack)
- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS (Utility-first)
- **Icons**: Lucide React (`strokeWidth` 通常为 1.5 或 2)
- **Charts**: Recharts (去网格化、极简风格)
- **Router**: React Router Dom v7 (HashRouter)

## 2. 导航与页面层级 (Navigation & Hierarchy)
本项目采用 **三级导航深度** 模式，强调 **页面独立性 (Page Independence)**：

*   **Level 1 (主导航页)**:
    *   带有底部导航栏 (`BottomNav`)。
    *   页面: `Dashboard`, `Inbox`, `Work`, `Company`。
    *   布局: `max-w-md mx-auto`。

*   **Level 2 (模块看板/列表页)**:
    *   **独立性原则**: 每个 Level 2 页面（如 `Payroll.tsx`）被视为一个独立的“微应用”。
    *   **状态管理**: 页面内部自我管理 `selectedItem` 状态，不依赖全局路由参数来控制 Level 3 的显示。
    *   入口: `/work/:id`。

*   **Level 3 (详情/详情页)**:
    *   **实现方式**: **Overlay Pattern**。在 Level 2 组件内部条件渲染，覆盖整个视口。
    *   **组件规范**: 必须使用 `DetailLayout` 组件。
    *   **交互**: 必须包含明确的 `onBack` 回调以清理 Level 2 的状态。

## 3. UI/UX 设计规范 (Design Standards)

### 3.1 布局与容器
- **移动端优先**: 容器宽度限制 `max-w-md`。
- **圆角**: `rounded-xl` (常规), `rounded-[20px]` (大卡片)。
- **阴影**: 
    - 基础: `shadow-sm`.
    - 浮起: `shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]`.
- **背景**: 全局使用 `bg-[#F8F9FB]` 营造清爽现代感。

### 3.2 色彩语义 (Semantic Colors)
- **Brand**: `indigo-600` / `blue-600`。
- **Success**: `emerald-600` / `bg-emerald-50`。
- **Warning**: `orange-600` / `bg-orange-50`。
- **Error**: `rose-600` / `bg-rose-50`。
- **Neutral**: `slate-900` (Title), `slate-500` (Body), `slate-400` (Muted).

### 3.3 排版 (Typography)
- **数据字体**: 金额、日期、ID 使用 `font-mono`。
- **Header Style**: Sticky header 配合 `backdrop-blur` 效果。

## 4. 组件开发习惯 (Coding Habits)

### 4.1 通用组件 `DetailLayout`
```tsx
<DetailLayout
    title="页面标题"
    onBack={() => setSelectedItem(null)} // 核心：关闭 Overlay
    tag={{ label: '状态', color: 'text-x', bg: 'bg-x' }}
    actions={<button>Action</button>}
>
    {/* Content */}
</DetailLayout>
```

### 4.2 文件结构与独立性
- **Mock Data**: 定义在组件文件内部，不跨文件共享（除非是全局枚举）。
- **Sub-Components**: 简单的 Level 3 组件可直接定义在同一个 `.tsx` 文件中。

## 5. 业务模块 ID 映射 (Business Modules)
(保持不变)

## 6. 文档维护指南 (Documentation Guide)
记录 `docs/` 目录下核心文档的作用及维护时机。

- **`docs/PRD.md` (产品需求文档)**
    - **作用**: 定义项目愿景、核心目标、用户角色及模块优先级 (P0-P2)。
    - **读取时机**: 启动新模块开发前，确认功能定位与优先级。
    - **更新时机**: 业务目标变更或新增重大模块时。

- **`docs/DesignStandards.md` (设计规范)**
    - **作用**: 定义色彩系统、排版层级、组件样式（圆角、阴影）及交互模式（如 Overlay）。
    - **读取时机**: 编写 UI 组件或页面布局前，确保视觉一致性。
    - **更新时机**: 引入新的 UI 模式或调整全局视觉风格时。

- **`docs/FeatureList.md` (功能清单)**
    - **作用**: 细粒度的功能点验收列表，追踪开发进度。
    - **读取时机**: 每日开发开始前，确认当天待开发的功能点。
    - **更新时机**: 完成功能开发后，将对应项标记为 `[x]`；或拆解出新需求时添加新项。

## 7. 最近更新记录 (Recent Updates)
- **Documentation**: 完善了 `docs/` 目录文件的维护指南。
- **UI Upgrade**: Dashboard 视觉全面升级（Glassmorphism Header, Cleaner Cards, Enhanced Timeline）。
- **Inbox**: 新增“工资发放确认”及“入职任务聚合”。
- **GovernmentSubsidy**: 新增模块 `srv-subsidy`。
