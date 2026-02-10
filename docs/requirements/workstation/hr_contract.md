# 业务需求: 合同管理 (Contract)

> **入口 ID**: `hr-6`
> **优先级**: P2
> **设计核心**: 法律风控 (Legal Risk Control)、期限感知 (Deadline Awareness)、看板筛选 (Stats Filter)

## 1. 用户故事 (User Stories) 与 数据逻辑

### 1.1 看板筛选逻辑 (Stats Dashboard Filter)
*   **交互故事**: GM 在查看合同时，希望能够直接点击顶部的统计方块（如“已逾期”），立即看到对应的合同名单，而不是在大列表中翻找。
*   **状态引擎**:
    *   **合同总数 (Total)**: 默认视图，展示所有合同。
    *   **生效中 (Normal)**: 筛选 `status == 'normal'` 的合同。
    *   **即将到期 (Expiring)**: 筛选 `status == 'expiring'` (到期前30天内) 的合同。
    *   **已逾期 (Overdue)**: 筛选 `status == 'overdue'` (超过到期日) 的合同。
*   **反馈标识**:
    *   选中某个统计块后，该块应呈现反色高亮（对应状态的主题色）。
    *   列表上方展示“正在查看: [筛选标签]”提示，并提供“清空筛选”快捷按钮。

### 1.2 续签风险预判 (Renewal Warning)
*   **数据业务逻辑**:
    *   **倒计时算法**: `Days_Remaining = Contract_End_Date - Today`。
    *   **触发器**: 当进入 `Expiring` 状态，自动在 `Inbox` 推送一条“合同续签待办”。

## 2. 界面行为规范 (UI Behaviors)

*   **20px 轴心锁定**: 
    *   合同列表的左侧彩色侧边条中心点锁定在 **20px** 轴线。
*   **交互逻辑**: 
    *   点击统计卡片，列表执行 `Fade-In` 平滑入场。
    *   已选中状态具备 `Shadow-lg` 和 `Scale-up` 的轻微视觉反馈。

## 3. 验收标准 (Acceptance Criteria)

- [x] 点击“即将到期”统计块，列表必须准确展示所有到期倒计时中的员工合同。
- [x] 点击“已逾期”统计块，列表必须以红色显著标识逾期天数。
- [x] 筛选状态下，列表上方必须显示正确的筛选描述及“清空”入口。
- [x] 合同详情页必须包含该员工的司龄 (Tenure) 勋章。

## 4. API 接口 (API Interfaces)

| 接口描述 | Method | Endpoint |
| :--- | :--- | :--- |
| 获取合同统计数据 | `GET` | `/api/hr/contracts/stats` |
| 获取过滤后的合同列表 | `GET` | `/api/hr/contracts?filter={type}&year={year}` |