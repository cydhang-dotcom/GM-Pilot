# GM Pilot Project Memory

> **核心决策备忘录**: 记录关键技术选型与核心组件逻辑。具体需求请查阅 `docs/`。

## 1. 核心导航与架构 (Architecture)
- **三级导航架构**:
  - **Level 1**: App Shell (Dashboard/Inbox/Work/Company)。
  - **Level 2**: 业务模块列表页 (如 Payroll, CashFlow)，独立管理内部状态。
  - **Level 3 (Overlay)**: **覆盖层模式** 呈现详情。必须包含 `onBack` 回调以清理父级选中状态。
- **布局约束**: 全局容器限制 `max-w-md mx-auto`，针对移动端拇指操作优化。

## 2. 关键组件逻辑 (Core Components)

### AI 智能诊断聊天 (SmartDiagnosisChat)
- **对话式 UI**: 采用“头像 + 聊天气泡”布局，取代笨重的卡片容器。
- **打字机特效**: 40ms/char 逐字渲染。
- **正在输入状态**: 使用跳动的省略号 (`animate-bounce`) 代替传统的 Loading 旋转器，增强即时通讯感。
- **紧凑性**: 移除标题和多余装饰，聚焦内容，高度降低约 40%。

### 经营结构化列表 (Unified Structural Lists)
- **完全扁平化**: 移除所有圆形图表（如 Pie Chart），统一采用“线性进度条列表”展示结构。
- **布局像素级对齐 (Pixel-Perfect Alignment)**: “成本结构”与“收入构成”模块采用完全一致的行间距 (`space-y-5`)、布局结构与进度条规格 (`h-1.5`)。
- **视觉暗示方案**:
    - **成本 (Cost)**: 左侧使用纯色圆点，配色采用 Indigo/Purple/Amber。
    - **收入 (Revenue)**: 左侧使用状态图标 (CheckCircle/Clock)，配色采用 Emerald/Sky/Teal。

### 对账中心 (Reconciliation)
- **同步健康度**: 以百分比形式量化银行流水与系统账务的匹配程度。
- **差异沟通 (Chat UI)**: 使用气泡对话模式处理异常记录，区分“我”与“代理会计”。

## 3. 开发习惯与工程化 (Engineering)
- **配置文件锁定**: **严禁修改 `vite.config.ts`**。
- **组件独立性**: Mock Data 必须闭环在组件文件内部。
- **版本号维护**: 每次部署需递增 `pages/Company.tsx` 底部版本号。

## 4. 业务 ID 映射
| ID | 模块 | ID | 模块 |
| :--- | :--- | :--- | :--- |
| `hr-1` | 薪酬管理 | `fn-rec` | 对账中心 |
| `hr-emp` | 员工管理 | `fn-flow` | 资金流水 |
| `hr-4` | 五险一金 | `fn-4` | 发票管理 |
| `fn-5` | 财税报表 | `fn-reim` | 费用报销 |