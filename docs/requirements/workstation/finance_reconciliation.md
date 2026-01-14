# 业务需求: 对账中心 (Reconciliation)

> **入口 ID**: `fn-rec`
> **优先级**: P0
> **设计核心**: 差异透明 (Discrepancy Visibility)、高效沟通 (Chat-Sync)、健康预警 (Health Monitoring)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 对账健康度监控 (Health Score)
*   **故事**: 我需要一个量化的指标告诉我这个月的账目是否整齐，哪里需要我处理。
*   **数据业务逻辑**:
    *   **健康度算法**: `Health_Score = 100 - (Urgent_Diff_Count * 10) - (Warning_Diff_Count * 2)`。
    *   **状态触发器**: 当 `Health_Score < 60`，Dashboard AI 诊断区必须强制置顶显示“账务异常预警”。

### US2: 代理会计零距离沟通 (Collaborative Resolution)
*   **故事**: 面对看不懂的流水差异，我需要直接给外包会计留言说明，并看到她的即时回复。
*   **数据业务逻辑**:
    *   **沟通状态机**: `Open` (未解释) -> `In_Progress` (已说明/待审核) -> `Resolved` (已匹配)。
    *   **上下文关联**: 聊天窗口顶部必须固化显示对应的“异常数据条目”，防止脱离上下文沟通。

## 2. 界面行为规范 (UI Behaviors)

*   **20px 轴心锁定**: 
    *   差异列表的警示图标中心点必须锁定在 **20px** 垂直轴。
*   **交互动效**: 
    *   健康度数字在进入页面时执行 `Number-Rolling` 动画。
    *   点击“处理”按钮，列表项需具备 `Expand-to-Fill` 的视觉过渡。

## 3. 验收标准 (Acceptance Criteria)

- [x] 健康度评分必须根据待处理事项的数量动态实时计算。
- [x] 紧急差异（Urgent）在列表中必须以红色高亮显示。
- [x] 沟通详情页必须能够显示关联的流水快照（金额、时间、对手）。
- [x] 回复消息后，该条差异的状态需从“未处理”自动变更为“处理中”。