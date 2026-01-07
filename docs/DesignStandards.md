# GM Pilot 设计规范 (Design Standards)

> **版本**: v1.1
> **适用范围**: 移动端 Web App

## 1. 核心原则 (Core Principles)

*   **Mobile First**: 所有界面优先适配移动端竖屏操作，交互区域便于拇指点击。
*   **Information Density**: 针对管理者设计，首屏强调关键指标（KPI），次级页面提供数据穿透。
*   **Trustworthy**: 金融级数据展示，隐私模式默认开启，色彩传达明确的风险/安全信号。

## 2. 色彩系统 (Color System)

### 2.1 状态色 (Status Colors)
用于表达业务状态、风险等级及操作反馈。

| 语义 | Tailwind 类 | 用途 |
| :--- | :--- | :--- |
| **Active / Info** | `blue-600` / `bg-blue-50` | 进行中任务、选中状态、常规信息 |
| **Success / Safe** | `emerald-600` / `bg-emerald-50` | 已完成、安全、收入、正向趋势 |
| **Warning / Risk** | `orange-600` / `bg-orange-50` | 风险预警、即将到期、需要关注 |
| **Critical / Action** | `rose-600` / `bg-rose-50` | 严重超支、驳回、负向趋势、高优待办 |
| **Neutral / Pending** | `gray-400` / `bg-gray-50` | 未开始、辅助信息、次要文本 |

### 2.2 品牌色 (Brand Colors)
*   **Primary**: Indigo (`indigo-600`) - 用于主按钮、强调卡片。
*   **Background**: Slate/Gray (`gray-50`) - 用于页面背景，保持干净清爽。

## 3. 排版与字体 (Typography)

*   **数字**: 所有涉及金额、统计数据的数字，优先使用等宽字体 (`font-mono`) 以确保对齐和易读性。
*   **字号层级**:
    *   **Page Title**: `text-xl font-bold` (20px)
    *   **Card Title**: `text-sm font-bold` (14px)
    *   **KPI Value**: `text-2xl` or `text-3xl font-bold`
    *   **Body**: `text-xs` (12px) - 移动端信息密集场景下的默认正文大小
    *   **Meta/Label**: `text-[10px]` - 辅助标签、次要时间戳

## 4. 组件规范 (Components)

### 4.1 卡片 (Cards)
*   圆角: `rounded-xl` 或 `rounded-2xl`
*   阴影: `shadow-sm` (默认), `shadow-md` (悬浮/强调)
*   边框: `border border-gray-100` (用于在白色背景上区分层级)

### 4.2 图表 (Charts)
*   **库**: Recharts
*   **风格**: 极简风格，移除不必要的网格线和轴线。
*   **交互**: 必须提供 Tooltip，点击/长按显示具体数值。
*   **配色**: 严格遵循状态色系统（如收入用绿色，支出用黑色/灰色，强调色用蓝色）。

### 4.3 导航 (Navigation)
*   **底部导航 (Bottom Nav)**: 仅在四个主一级页面显示。
*   **顶部导航 (Top Bar)**: 二级详情页必须包含“返回”按钮和页面标题。

### 4.4 页面层级与交互 (Page Layers) [New]
*   **Level 2 (列表/看板)**: 保持 Scroll 位置，内部管理状态。
*   **Level 3 (详情 Overlay)**: 
    *   **模式**: 全屏覆盖 (Fixed Position)，从右侧滑入 (`animate-slide-in-right`)。
    *   **结构**: 统一使用 `DetailLayout` 组件，包含固定 Header (Back, Title, Actions) 和可滚动内容区。
    *   **独立性**: 关闭 Overlay 时销毁详情状态，返回列表页原状。
