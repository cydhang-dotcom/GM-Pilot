
# GM Pilot 设计规范 (Design Standards)

> **版本**: v2.0 (Comprehensive)
> **适用范围**: 移动端 Web App (React + Tailwind)
> **基准分辨率**: Mobile Portrait (Max Width 448px)

## 1. 核心布局体系 (Layout System)

### 1.1 页面容器 (Page Container)
*   **全局约束**: `max-w-md mx-auto` (手机模拟器宽度)，`overflow-hidden`。
*   **背景色**: `bg-[#F8F9FB]` (全局灰底，比纯白更护眼)。
*   **安全区**: 
    *   底部导航留白: `pb-20` (Bottom Nav height 64px + spacing)。
    *   详情页底部操作栏留白: `pb-24`。
*   **水平边距**: 核心内容区统一使用 `px-6` (24px) 以营造高级呼吸感，次级页面可使用 `px-5`。

### 1.2 导航栏 (Sticky Header)
*   **定位**: `sticky top-0 z-40`。
*   **背景**: `bg-[#F8F9FB]/90 backdrop-blur-xl` (高斯模糊透底)。
*   **边框**: `border-b border-slate-100/50` (极细分割线)。
*   **结构**: 
    *   **Top Label**: `text-xs font-bold text-slate-400 font-mono tracking-widest uppercase` (如 "WORKSPACE & TOOLS")。
    *   **Main Title**: `text-2xl font-bold text-slate-800 tracking-tight` (如 "事务工作台")。
    *   **Right Action**: 放置头像、菜单或筛选器。

### 1.3 轴心法则 (The 20px Axis)
*   **定义**: 在列表、Timeline、详情页中，视觉引导线（图标中心线或连接线）距左边缘 **20px**。
*   **应用**:
    *   Timeline 连接线 X 轴 = 20px。
    *   列表左侧图标 (Icon Box) 中心 X 轴 = 20px。
    *   Section Title 左对齐线 = 20px (如有图标则图标中心对齐)。

## 2. 卡片与容器 (Cards & Containers)

### 2.1 核心卡片 (L1 Cards)
*   **场景**: Dashboard 核心指标、Inbox 置顶卡片、Company 身份/资产卡。
*   **圆角**: `rounded-[32px]` (超大圆角，拟物感)。
*   **边框**: `border border-slate-100` 或 `border-transparent` (视背景而定)。
*   **阴影**: `shadow-sm` 或 `shadow-[0_8px_30px_rgba(0,0,0,0.04)]`。
*   **背景**: 通常结合**空气感渐变**使用。

### 2.2 次级卡片 (L2 Cards)
*   **场景**: 列表项、Grid Item、表单块。
*   **圆角**: `rounded-[24px]` 或 `rounded-2xl`。
*   **交互**: `active:scale-[0.99] transition-transform duration-300` (按压微缩反馈)。
*   **背景**: `bg-white`。

### 2.3 视觉质感 (Texture & Atmosphere)
*   **空气感渐变 (Airy Gradients)**:
    *   **身份/通用**: `bg-gradient-to-br from-white via-white to-indigo-50/40`。
    *   **资产/金融**: `bg-gradient-to-br from-white via-[#f8fbff] to-[#eef6ff]` (晨雾蓝)。
    *   **盈利/健康**: `bg-gradient-to-br from-white via-white to-emerald-50/30`。
    *   **告警/置顶**: `bg-gradient-to-br from-white via-white to-rose-50/30`。
*   **拟物水印 (Watermarks)**: 
    *   卡片右上角放置超大尺寸 icon (size 120-160px)，`text-indigo-900`，`opacity-[0.03]`，`pointer-events-none`，`transform rotate-12`。

## 3. 字体与排版 (Typography)

### 3.1 标题体系
*   **Page Title**: `text-2xl font-black text-slate-900 tracking-tighter`。
*   **Card Title**: `text-sm font-bold text-slate-900`。
*   **Sub Title**: `text-xs text-slate-400 font-bold`。
*   **Section Header**: `text-[10px] font-bold text-slate-400 uppercase tracking-widest`。

### 3.2 数值呈现
*   **原则**: 涉及金额、日期、ID 必须使用 `font-mono`。
*   **巨型数值**: `text-3xl` 或 `text-4xl font-black tracking-tighter` (Dashboard/Detail Header)。
*   **隐私模式**: `blur(8px)` (高斯模糊) + `select-none` + `opacity-40`。

### 3.3 标签与说明
*   **Micro Label**: `text-[10px] font-bold`。
*   **Badge (Capsule)**: `px-2 py-0.5 rounded-md` (如 `bg-blue-50 text-blue-600`)。

## 4. 色彩语义 (Color Semantics)

| 语义 | Tailwind Class (Text/Bg) | 场景 |
| :--- | :--- | :--- |
| **主品牌 (Primary)** | `indigo-600` / `bg-indigo-50` | 按钮、选中态、链接、科技感元素 |
| **盈利/成功 (Gain)** | `emerald-600` / `bg-emerald-50` | 收入、已完结、正增长、健康、通过 |
| **亏损/警告 (Loss)** | `rose-600` / `bg-rose-50` | 支出、负增长、离职、紧急异常、驳回 |
| **待办/关注 (Warn)** | `orange-600` / `bg-orange-50` | 待解释、即将到期、待确认、催办 |
| **过程/状态 (Info)** | `blue-600` / `bg-blue-50` | 进行中、审核中、普通状态 |
| **中性/辅助 (Neutral)**| `slate-400` / `bg-slate-50` | 次要文字、未激活、背景填充 |

*   **彩色阴影**: 使用同色系阴影增强通透感 (e.g., `shadow-indigo-200`, `shadow-rose-200`, `shadow-emerald-200`)。

## 5. 交互组件规范 (Components)

### 5.1 按钮 (Buttons)
*   **主操作 (Primary)**: `w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all`。
*   **次操作 (Secondary)**: `bg-white border border-gray-200 text-slate-700 font-bold active:bg-gray-50`。
*   **幽灵按钮 (Ghost)**: `bg-indigo-50 text-indigo-600` (用于次级高亮)。

### 5.2 输入框 (Inputs)
*   **搜索/表单**: `h-12 bg-white border border-slate-200 rounded-2xl px-4 text-base focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50/50 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)]`.
*   **字号强制**: `text-base` (防止 iOS 输入自动缩放)。

### 5.3 事务工作台图标 (Workstation Grid)
*   **容器**: `w-[64px] h-[64px] rounded-[26px] bg-white border shadow-sm`.
*   **图标**: `size={28} strokeWidth={1.5}`.
*   **角标**: `absolute -top-1.5 -right-3`。

## 6. 动效与反馈 (Motion)

*   **页面进入**: `animate-fade-in` (整体淡入) 或 `animate-slide-in-right` (详情页滑入)。
*   **AI 打字机**: 逐字显示，光标闪烁 `animate-pulse`，容器高度锁定防止抖动。
*   **脉冲提醒**: 关键待办状态使用 `animate-pulse` (如 Timeline 中的 Active 节点)。
*   **加载状态**: 按钮内嵌 `Loader2` 旋转。

## 7. 模态与浮层 (Overlays)

*   **Level 3 Detail (Full Screen)**: 
    *   `fixed inset-0 z-[60]`。
    *   白色或浅灰背景。
    *   结构: `Header (Back/Title/Action)` -> `Scrollable Content` -> `Sticky Footer (Actions)`。
*   **Center Modal (Alert/Confirm)**: 
    *   `fixed inset-0 z-[100]`。
    *   背景: `bg-slate-900/60 backdrop-blur-sm`。
    *   容器: `w-full max-w-sm bg-white rounded-[32px] p-6 shadow-2xl animate-scale-up`。
