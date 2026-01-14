# 业务需求: 政府补助 (Subsidy)

## 1. 核心元数据
*   **入口 ID**: `srv-subsidy`
*   **优先级**: P2
*   **设计核心**: 节点驱动 (Milestone Driven), 收益透明 (Benefit Visibility)

## 2. 用户故事 (User Story)
*   **故事**: 申请的稳岗补贴到哪一步了？今年一共拿了多少钱？

## 3. 详细业务逻辑 (Business Logic)

### 3.1 进度节点
*   `SUBMIT` (提交) -> `REVIEW` (审核) -> `PUBLICITY` (公示) -> `PAYMENT` (拨付) -> `RECEIVED` (到账).

### 3.2 累计收益
*   `Total_Received = Sum(Subsidies.filter(status == 'RECEIVED').amount)`

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 收益卡片
*   大字展示“累计已获批/已到账金额”。
*   背景使用 `bg-indigo-600` 或金色渐变。

### 4.2 进度时间轴
*   垂直时间轴，已完成节点点亮，当前节点高亮，未完成节点灰色。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 只有状态为“已到账”的金额才会计入“累计已到账”总额。
*   **Then** 详情页应显示当前处于哪个审核阶段。
