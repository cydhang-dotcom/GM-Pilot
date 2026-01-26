
# 业务需求: 合同管理 (Contract)

> **入口 ID**: `hr-6`
> **优先级**: P2
> **设计核心**: 法律风控 (Legal Risk Control)、期限感知 (Deadline Awareness)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 续签风险预判 (Renewal Warning)
*   **故事**: 作为总经理，我希望在合同到期前 30 天收到强提醒，防止因忘记续签而产生法律赔偿风险。
*   **数据业务逻辑**:
    *   **倒计时算法**: `Days_Remaining = Contract_End_Date - Today`。
    *   **状态机映射**: 
        *   `Safe`: `Days_Remaining > 30` (蓝色)。
        *   `Expiring`: `30 >= Days_Remaining > 0` (橙色 + 呼吸动效)。
        *   `Expired`: `Days_Remaining <= 0` (红色)。
    *   **触发器**: 当进入 `Expiring` 状态，自动在 `Inbox` 推送一条“合同续签待办”。

### US2: 决策快速闭环 (Actionable Decision)
*   **故事**: 查看合同到期提醒后，我需要能一键选择“发起续签”或“不再续签”。
*   **数据业务逻辑**:
    *   **操作下发**: 触发 API `POST /contract/action`，同步通知外包 HR 处理法律文书。

## 2. 界面行为规范 (UI Behaviors)

*   **20px 轴心锁定**: 
    *   合同列表的左侧彩色侧边条（Indicator Bar）宽度设为 4px，中心点锁定在 **20px** 轴线。
*   **视觉引导**: 
    *   `Expiring` 状态的卡片需具备 `Pulse` 阴影，频率 2000ms。

## 3. 验收标准 (Acceptance Criteria)

- [x] 即将到期的合同必须准确显示剩余天数。
- [x] 详情页必须包含该员工的入职日期与历史签约次数参考。
- [x] 点击“发起续签”必须弹出二次确认确认框。
- [x] 历史合同清单必须按生效日期降序排列。

## 4. API 接口 (API Interfaces)

| 接口描述 | Method | Endpoint |
| :--- | :--- | :--- |
| 获取合同列表 (含到期预警) | `GET` | `/api/hr/contracts?filter=expiring` |
| 提交续签/终止决策 | `POST` | `/api/hr/contracts/{id}/decision` |
| 获取合同详细条款 | `GET` | `/api/hr/contracts/{id}` |
