# 业务需求: 政府补助 (Government Subsidy)

> **入口 ID**: `srv-subsidy`
> **优先级**: P2
> **设计核心**: 节点驱动 (Milestone Driven)、收益感知 (Benefit Visibility)

## 1. 用户故事 与 数据逻辑

### US1: 年度补助看板 (ROI Visibility)
*   **故事**: 作为总经理，我需要知道今年一共从政府拿到了多少钱。
*   **数据逻辑**: 聚合展示“已到账”总额与“审核中”预计总额。

### US2: 申请进度全链路 (Timeline)
*   **逻辑**: 展示 `Submitted -> Reviewing -> Received` 的垂直时间轴。
*   **状态映射**:
    - `Status == '已到账'`: 绿色 CheckCircle 图标。
    - `Status == '审核中'`: 蓝色 Clock 图标。
    - `Status == '待申请'`: 灰色 Alert 图标。

## 2. 界面行为规范 (UI Behaviors)

*   **视觉标准**: 
    - 首页采用 `Indigo-600` 品牌色实色背景，建立“收益感”。
    - 列表卡片左侧头像中心对齐 **20px 轴线**。
*   **交互**: 点击记录进入 `DetailLayout` 三级页，展示详细的政策原文下载入口。

## 3. 验收标准

- [x] 首页大字必须展示年度累计获批总额。
- [x] 每一笔补助记录必须清晰标注其类型（就业补贴/资质认定）。
- [x] 已到账的补助条目必须具备“已入账”的视觉标签。

## 4. API 接口

| 接口描述 | Endpoint |
| :--- | :--- |
| 获取政府补助汇总及明细 | `/api/services/subsidies/all` |