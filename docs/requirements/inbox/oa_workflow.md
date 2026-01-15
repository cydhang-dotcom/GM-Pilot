# 业务需求: OA 审批工作流 (OA Workflow)

> **所属模块**: Inbox
> **优先级**: P1
> **设计核心**: 极简审批 (Minimalist Approval)、上下文感知 (Context Aware)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 决策闪电化 (Flash Decision)
*   **故事**: 面对普通员工的请假或日常报销，我需要一眼看到事由、天数/金额并快速点击同意。
*   **数据业务逻辑**:
    *   **字段映射**: 强制提取 `Initiator`, `Type`, `Amount/Duration`, `Reason` 四个核心字段。
    *   **状态同步**: 审批完成后，实时调用 `OA_API` 并将该任务从 `Inbox` 移除。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉对齐**: 
    *   审批人头像在列表中需对齐 **20px 轴线**。
*   **底部固定栏**: 
    *   详情 Overlay 底部固定“驳回”与“同意”操作区，使用 `backdrop-filter` 磨砂效果。

## 3. 验收标准 (Acceptance Criteria)

- [x] 详情页必须显示完整的审批事由说明。
- [x] 审批按钮点击后需具备“防抖处理”，防止重复提交。
- [x] 审批通过后的任务在 Timeline 中需标记为“已办结”。