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
- **圆角**: `rounded-xl` (常规), `rounded-2xl` (大卡片)。
- **阴影**: `shadow-sm` (默认), `shadow-lg` (浮层/强调)。

### 3.2 色彩语义 (Semantic Colors)
- **Brand**: `indigo-600` / `blue-600`。
- **Success**: `emerald-600` / `bg-emerald-50` (收入/完成)。
- **Warning**: `orange-600` / `bg-orange-50` (风险/待办)。
- **Error**: `rose-600` / `bg-rose-50` (支出/紧急)。
- **Text**: `gray-900` (标题), `gray-600` (正文), `gray-400` (辅助)。

### 3.3 排版 (Typography)
- **数据字体**: 金额、日期、ID 使用 `font-mono`。
- **字号**:
    - KPI: `text-2xl` / `text-3xl font-bold`.
    - 列表标题: `text-sm font-bold`.
    - 元数据: `text-xs` / `text-[10px]`.

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
- **Sub-Components**: 简单的 Level 3 组件可直接定义在同一个 `.tsx` 文件中（如 `PayrollDetail` 定义在 `Payroll.tsx` 内），保持文件自包含。

## 5. 业务模块 ID 映射 (Business Modules)

| 前缀 | 模块 | 示例 ID | 对应页面组件 |
| :--- | :--- | :--- | :--- |
| **hr-** | 人事管理 | `hr-1` (薪酬), `hr-emp` (员工) | `Payroll`, `Employee` |
| **fn-** | 财务运营 | `fn-rec` (对账), `fn-flow` (流水) | `Reconciliation`, `CashFlow` |
| **ot-** | 综合服务 | `ot-1` (咨询), `ot-5` (员工服务) | `ServiceRequest` |
| **srv-** | 专项服务 | `srv-subsidy` (政府补助) | `GovernmentSubsidy` |

## 6. 最近更新记录 (Recent Updates)
- **架构**: 确立了 Level 2 管理 Level 3 Overlay 的独立页面模式。
- **GovernmentSubsidy**: 新增模块 `srv-subsidy`，实现补助清单与进度追踪。
- **Refactor**: `Inbox`, `Company` 及所有 HR 模块已重构为使用 `DetailLayout` 的独立交互模式。
- **Dashboard**: 时间轴 Link 更新为指向具体的业务模块。
