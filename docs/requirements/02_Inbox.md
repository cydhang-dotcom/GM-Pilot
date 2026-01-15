# 模块需求: 智能待办 (Inbox)

> **优先级**: P0
> **设计核心**: 决策高效 (Efficiency)、进度透明 (Transparency)、轴心锁定 (Axis Alignment)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 履约透明化 (Oversight)
*   **故事**: 我需要实时掌握外包服务商的交付进度，确保关键节点不延误。
*   **数据业务逻辑**:
    *   **核心算法**: 若 `Actual_Finish_Date` 为空且 `Today > Deadline`，标记节点为 `Overdue`。
    *   **状态触发器**: 节点进入 `Active` 状态时，Timeline Marker 触发脉冲动效。

### US2: 任务噪音过滤 (Task Grouping)
*   **故事**: 我不想被琐碎的任务刷屏，我需要分类聚合后的极简视图。
*   **数据业务逻辑**:
    *   **聚合逻辑**: 同一 `Group_ID` 的任务在首页仅显示一个聚合卡片，显示 `Count` 和 `Latest_Summary`。

## 2. 界面行为规范 (UI Behaviors)

*   **20px 轴心锁定**: 
    *   交付进度轴的 Marker 中心点必须严格锁定在左侧 **20px** 垂直轴。
    *   列表卡片的图标左边缘必须与该轴线对齐。
*   **加载逻辑**: 列表加载采用 Stagger 动画，每个卡片入场间隔 50ms。

## 3. 验收标准 (Acceptance Criteria)

- [x] 时间轴中轴线与屏幕左边缘距离必须精确为 20px。
- [x] 未支付的置顶账单卡片必须锁定在 Timeline 下方的首位。
- [x] 入职确认和 OA 审批必须以聚合卡片形式展现，不得平铺。