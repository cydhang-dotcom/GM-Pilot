
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
    *   **技术实现**: 采用 **Gemini Streaming API** 实现实时流式输出。
    *   **展示逻辑**: 
        *   **Thinking Phase**: 显示“深度扫描中...”的脉冲动画。
        *   **Streaming Phase**: 文字逐字上屏，实时解析 `[Tag]` 格式。
        *   **Height Lock**: 容器高度锁定，防止内容流式加载时页面抖动。

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
- [x] AI 诊断必须以打字机流式效果呈现，且支持 markdown 格式解析。

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

### 4.2 获取 AI 经营诊断 (Smart Diagnosis - GenAI)
*   **交互模式**: Client-side Streaming (Serverless) via `@google/genai`
*   **模型**: `gemini-3-flash-preview`
*   **输入上下文 (Input Context Object)**:
    ```json
    {
      "month": "YYYY-MM",
      "financials": {
        "revenue": 100000.00,
        "cost": 80000.00,
        "net_profit": 20000.00,
        "bank_balance": 500000.00
      },
      "hr_data": {
        "headcount": 32,
        "prev_headcount": 30
      },
      "cost_structure": ["R&D: 50k", "Admin: 20k", ...],
      "history": [
         { "month": "YYYY-MM-1", "revenue": ..., "profit": ... },
         { "month": "YYYY-MM-2", "revenue": ..., "profit": ... }
      ]
    }
    ```
*   **提示词模板 (Prompt Template)**:
    > "You are a CFO assistant for a SME. 
    > 
    > Current Month ({month}): {Current_Data}
    > 
    > Previous 2 Months History (For Trend Analysis):
    > {History_Data_String}
    >
    > Task: Generate 4-5 concise, high-value business insights.
    > Requirement:
    > 1. **Must include specific comparative analysis** (e.g., "Compared to last month...", "Continuing the 3-month trend...").
    > 2. Strictly use the format "[Tag] Content" for each line.
    > 3. Tags must be 4 Chinese chars like: 资金安全, 趋势分析, 盈利对比, 成本控制, 经营提效.
    >
    > Language: Chinese (Simplified).
    > Tone: Professional, direct, actionable.
    > DO NOT use markdown code blocks. Just return the lines."
*   **输出流格式 (Output Stream)**:
    *   **Format**: Plain Text (Line delimited).
    *   **Parsing Logic**: Frontend uses Regex `/^\[(.*?)\](.*)/` to extract Tag and Content.
    *   **Example Stream**:
        ```text
        [盈利对比] 净利润环比增长 15%，主要得益于技术服务收入的稳步提升。
        [趋势分析] 连续 3 个月研发成本占比上升，需评估产出效率。
        [资金安全] 余额充足，本月净流入 ¥37w，预计可覆盖未来 4 个月运营开支。
        ```
