
# 业务需求: 综合服务 (Corporate Services)

> **入口 ID**: `ot-1 ~ ot-5`
> **优先级**: P2
> **设计核心**: 服务触达 (Service Reach)、闭环反馈 (Feedback Loop)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 专属顾问直连 (Concierge Access)
*   **故事**: 当遇到复杂的劳务纠纷或税收争议，我需要直接给我的顾问 Jessica 发消息，而不是打总机。
*   **数据业务逻辑**:
    *   **人员映射**: 根据 `Company_ID` 动态拉取专属的 `Account_Manager_Object`。

### US2: 服务工单闭环 (Ticket Lifecycle)
*   **故事**: 我发起了一个“政策咨询”请求，我希望看到处理进度并对最终的解答进行打分。
*   **数据业务逻辑**:
    *   **状态映射**: `Pending` (待受理) -> `Processing` (处理中) -> `Replied` (已回复) -> `Closed` (已办结)。

## 2. 界面行为规范 (UI Behaviors)

*   **布局标准**: 
    *   服务矩阵入口采用 `2x2 Grid` 布局，容器内边距严格遵循 `p-4`。
*   **轴心锁定**: 
    *   历史记录列表的项目左侧色块对齐 20px 轴线。

## 3. 验收标准 (Acceptance Criteria)

- [x] 顶部必须清晰展示专属顾问的姓名、照片与联系方式。
- [x] 服务矩阵点击后必须能正确携带业务参数跳转至工单系统。
- [x] 历史记录必须按处理中、已办结进行分层展示。
- [x] 已回复的工单必须支持点击查看富文本形式的解决方案。

## 4. API 接口 (API Interfaces)

| 接口描述 | Method | Endpoint |
| :--- | :--- | :--- |
| 获取专属顾问信息 | `GET` | `/api/services/consultant` |
| 获取服务工单历史 | `GET` | `/api/services/tickets` |
| 创建新的服务请求 | `POST` | `/api/services/tickets` |
| 获取工单详情及回复 | `GET` | `/api/services/tickets/{id}` |
