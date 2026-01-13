# GM Pilot 设计规范 (Design Standards)

> **版本**: v1.5 (Consolidated)
> **适用范围**: 移动端 Web App

## 1. 核心原则 (Core Principles)

*   **Mobile First**: 所有界面优先适配移动端竖屏操作，交互区域便于拇指点击。容器宽度限制 `max-w-md`。
*   **Immersive & Clean**: 使用毛玻璃 (`backdrop-blur`)、大圆角与柔和阴影，减少分割线，营造现代感。
*   **Data Driven**: 核心数据（金额、人数）使用高辨识度的等宽字体，图表去噪（无网格、无轴线）。

## 2. 布局与容器 (Layout & Visuals)

*   **Global Background**: `bg-[#F8F9FB]` (冷灰白，营造通透感)。
*   **Card Style**: `bg-white` + `shadow-sm` + `border-slate-100`。
*   **Glass Effect**: `bg-white/90` + `backdrop-blur-md` (用于 Sticky Header)。
*   **圆角 (Border Radius)**:
    *   常规: `rounded-xl`
    *   大卡片: `rounded-[20px]`
*   **阴影 (Shadows)**:
    *   基础: `shadow-sm`
    *   浮起: `shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]`

## 3. 色彩系统 (Color System)

### 3.1 状态色 (Status Colors)
用于表达业务状态、风险等级及操作反馈。

| 语义 | Tailwind 类 | 用途 |
| :--- | :--- | :--- |
| **Active / Info** | `blue-600` / `bg-blue-50` | 进行中任务、选中状态、常规信息 |
| **Success / Safe** | `emerald-600` / `bg-emerald-50` | 已完成、安全、收入、正向趋势 |
| **Warning / Risk** | `orange-600` / `bg-orange-50` | 风险预警、即将到期、需要关注 |
| **Critical / Action** | `rose-600` / `bg-rose-50` | 严重超支、驳回、负向趋势、高优待办 |
| **Brand** | `indigo-600` | 核心行动按钮、品牌卡片背景 |
| **Neutral** | `slate-900` / `slate-500` / `slate-400` | 标题 / 正文 / 辅助文本 |

## 4. 排版与图标 (Typography & Iconography)

*   **数字**: 金额、日期、ID 必须使用 `font-mono`。
*   **图标**: Lucide React，统一使用 `strokeWidth={1.5}` (大图标) 或 `{2}` (小图标)。
*   **字号层级**:
    *   **KPI Big**: `text-3xl font-bold tracking-tight`
    *   **Page Title**: `text-xl font-bold`
    *   **Card Title**: `text-sm font-bold`
    *   **Body**: `text-xs` (移动端标准正文)
    *   **Meta**: `text-[10px]` (标签、时间戳)

## 5. 交互模式 (Interaction Patterns)

### 5.1 页面层级 (Page Layers)
*   **Level 1 (App Shell)**: Dashboard, Inbox, Work, Company (带底部导航)。
*   **Level 2 (List/Board)**: 模块主页，自行管理滚动状态。
*   **Level 3+ (Overlay)**: 详情页模式。
    *   **实现**: 全屏 `fixed` 定位，覆盖 Level 2。
    *   **结构**: 统一使用 `DetailLayout`，包含顶部导航与底部固定操作栏。

### 5.2 特定场景交互 (Specific Patterns)
*   **File Download Pattern (文件下载)**:
    *   **禁止直接下载**: 列表项点击后不能直接触发下载。
    *   **中间页原则**: 必须先进入一个概览页 (Preview Overlay)，展示文件元数据（大小、时间、预览图）后，再提供明确的下载按钮。
*   **Communication UI (沟通记录)**:
    *   使用对话式气泡布局 (Chat Bubble Layout) 替代静态文本块，区分“我”与“代理/系统”的角色，增强互动感。

### 5.3 动效规范 (Motion)
*   **Fade In**: `animate-fade-in` (用于页面加载)。
*   **Slide In**: `animate-slide-in-right` (用于进入详情页)。
*   **Pulse**: `animate-pulse` (用于“处理中”或“紧急”状态标记)。

### 5.4 图表规范 (Charts)
*   **库**: Recharts
*   **风格**: 极简 (Minimalist)。
    *   隐藏 Axis Line 和 Tick Line。
    *   隐藏 CartesianGrid (或使用极淡的虚线)。
    *   必须提供 `Tooltip` 交互。
    *   颜色严格对应状态色（如：支出=Slate, 收入=Emerald）。