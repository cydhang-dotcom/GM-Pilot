# 业务需求: 对账中心 (Reconciliation)

> **入口 ID**: `fn-rec`
> **优先级**: P0
> **设计核心**: 差异透明 (Discrepancy Visibility)、高效沟通 (Chat-Sync)、健康预警 (Health Monitoring)

## 1. 用户故事 与 数据逻辑

### US1: 对账健康度监控 (Health Score)
*   **算法**: `Health_Score = 100 - (Urgent_Diff_Count * 10) - (Warning_Diff_Count * 2)`。
*   **视觉表现**: 采用 L2 看板形式，背景使用 `Indigo-900` 科技感渐变。
*   **同步逻辑**: 显示“最后同步时间”（如：TODAY 10:30 AM），支持手动触发 `RefreshCw`。

### US2: 异常分类处理 (Action List)
*   **逻辑**: 自动聚合“流水未解释”、“发票待归属”等异常项。
*   **Marker**: 紧急事项（Urgent）必须带红色感叹号且右上角显示气泡计数。

### US3: 协同处理 (Contextual Communication)
*   **故事**: GM 在处理“流水未解释”时，需直接看到会计的留言并回复。
*   **上下文数据**: 对话界面顶部必须固定该笔异常流水的快照（金额、时间、对手）。

## 2. 界面行为规范 (UI Behaviors)

*   **20px 轴心**: 异常列表项的图标中心严格锁定在 **20px** 轴线。
*   **交互**: “处理”按钮点击后，通过 `DetailLayout` 平滑推入处理详情。

## 3. 验收标准

- [x] 健康度数字低于 80% 时，必须有明显的视觉警示。
- [x] 差异列表必须支持根据“紧急程度”自动排序。
- [x] 沟通对话流必须支持 GM 侧实时回复。
- [x] 必须提供“最后同步时间”的实时反馈。

## 4. API 接口

| 接口描述 | Endpoint |
| :--- | :--- |
| 获取对账健康概览 | `/api/finance/reconciliation/summary` |
| 获取差异沟通记录 | `/api/finance/reconciliation/items/{id}/chat` |