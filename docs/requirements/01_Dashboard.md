
# 模块需求: 经营总览 (Dashboard)

> **优先级**: P0
> **设计核心**: 盈亏视角 (P&L Perspective)、风险驱动 (Risk-Driven)、隐私保护 (Privacy First)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 盈利掌控 (Profit & Loss Control)
*   **故事**: 作为总经理，我需要一进 App 就看到本月是赚是亏，以及利润率水平。
*   **数据业务逻辑**:
    *   **核心算法**: 
        *   `Net_Profit = Revenue - Expenditure`
        *   `Net_Profit_Margin = (Net_Profit / Revenue) * 100`。
    *   **状态触发器**: 
        *   当 `Net_Profit < 0`：UI 切换至 `Rose` 主题，Hero Card 呈现警告背景。
        *   当 `Net_Profit_Margin < 10%`：利润率组件显示橙色感叹号提示“利润承压”。

### US2: 智能洞察 (Smart AI Diagnosis)
*   **故事**: 我需要 AI 直接指出账目背后的风险。
*   **数据业务逻辑**:
    *   **展示逻辑**: 支持 `Typewriter_Effect` (打字机特效)，容器必须具备 `Height_Lock` (高度锁定) 属性，防止 AI 思考过程中页面布局跳动。

### US3: 隐私敏感度管理
*   **故事**: 在公开场合，我不希望别人看到我的银行余额。
*   **数据业务逻辑**:
    *   **算法**: `Display_Value = (Privacy_State == TRUE) ? blur(Balance) : Balance`。
    *   **隐私策略**: API 返回时必须标记为 `Sensitive`，前端默认应用高斯模糊。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉对齐 (Axis Lock)**: 支出列表的进度条起点必须与下方回款条目的图标左边缘严格锁定在 **20px** 轴线上。
*   **加载逻辑**: 先展示 Hero Card 骨架屏，AI 诊断模块随后平滑入场。

## 3. 验收标准 (Acceptance Criteria)

- [x] 净利润为负时，Hero Card 必须呈现红色视觉警告。
- [x] 银行余额在初次进入页面时必须处于不可见（打码）状态。
- [x] AI 诊断文字加载时，下方组件位置不得发生上下位移抖动。

## 4. API 接口 (API Interfaces)

### 4.1 获取经营概览数据 (Dashboard Overview)
*   **Endpoint**: `GET /api/dashboard/overview`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `month` | 查询月份 | String | Required, Format: YYYY-MM | 默认为当前自然月 |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `revenue` | 总营收 | Decimal | 保留2位小数 |
| `cost` | 总支出 | Decimal | 保留2位小数 |
| `net_profit` | 净利润 | Decimal | 可为负数 |
| `profit_margin` | 净利率 | Decimal | 百分比数值 |
| `headcount` | 在职人数 | Integer | - |
| `headcount_delta` | 人数环比变动 | Integer | 正负整数 |
| `bank_balance` | 银行总余额 | Decimal | 敏感字段 |

### 4.2 获取 AI 经营诊断 (AI Diagnosis)
*   **Endpoint**: `GET /api/dashboard/diagnosis/smart-report`
*   **输入参数 (Request)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 验证要求 (Validation) | 备注 (Notes) |
| :--- | :--- | :--- | :--- | :--- |
| `month` | 查询月份 | String | Required, Format: YYYY-MM | - |

*   **输出参数 (Response)**:

| 字段名 (Field) | 中文名 (Label) | 格式 (Type) | 备注 (Notes) |
| :--- | :--- | :--- | :--- |
| `report_text` | 诊断文本 | String | 包含 Markdown 格式标签 |
| `risk_level` | 风险等级 | Enum | 'Normal', 'Warning', 'Danger' |
| `tags` | 关键标签 | Array<String> | 如 ['资金安全', '合规风险'] |
