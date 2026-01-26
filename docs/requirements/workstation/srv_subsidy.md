
# 业务需求: 政府补助 (Government Subsidy)

> **入口 ID**: `srv-subsidy`
> **优先级**: P2
> **设计核心**: 节点驱动 (Milestone Driven)、收益透明 (Benefit Visibility)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 补助进度追踪 (Milestone Tracking)
*   **故事**: 作为总经理，我想知道稳岗补贴到底卡在“公示”阶段还是“拨付”阶段了。
*   **数据业务逻辑**:
    *   **节点定义**: `Submitted -> Reviewing -> Public_Notifying -> Disbursing -> Received`。
    *   **同步逻辑**: 每日凌晨同步政府公开平台的申报状态。

### US2: 收益感知 (ROI Awareness)
*   **故事**: 我想知道今年一共从政府拿到了多少钱，抵消了多少社保成本。
*   **数据业务逻辑**:
    *   **计算字段**: `Annual_Total = SUM(Received_Subsidies_Current_Year)`。

## 2. 界面行为规范 (UI Behaviors)

*   **进度轴标准**: 
    *   垂直时间轴 Marker 中心点对齐 20px 轴线。
*   **颜色语义**: 
    *   已到账状态统一使用 `Emerald-500`，审核中统一使用 `Blue-500`。

## 3. 验收标准 (Acceptance Criteria)

- [x] 首页汇总卡片必须实时累加所有已到账补助。
- [x] 每个补助项目必须具备独立的状态进度条。
- [x] 点击政策说明必须能查看完整的 PDF 政策原文。
- [x] 状态变更为“已到账”时，自动关联对应的“银行流水”条目。

## 4. API 接口 (API Interfaces)

| 接口描述 | Method | Endpoint |
| :--- | :--- | :--- |
| 获取年度补助汇总数据 | `GET` | `/api/services/subsidies/summary` |
| 获取补助申请记录列表 | `GET` | `/api/services/subsidies/list` |
| 获取补助申请进度节点 | `GET` | `/api/services/subsidies/{id}/timeline` |
