# 业务需求: 综合服务 (Services)

## 1. 核心元数据
*   **入口 ID**: `ot-1` ~ `ot-5`
*   **优先级**: P2
*   **设计核心**: 服务触达 (Service Reach), 闭环反馈 (Feedback Loop)

## 2. 用户故事 (User Story)
*   **故事**: 有政策不懂或数据不对，我要直接找专属顾问，发起个工单盯着他解决。

## 3. 详细业务逻辑 (Business Logic)

### 3.1 顾问映射
*   `GetConsultant(CompanyId)` -> `{ Name, Photo, Phone }`。

### 3.2 工单流转
*   `SUBMITTED` -> `PROCESSING` -> `REPLIED` (待评价) -> `CLOSED`.

## 4. UI/UX 视觉规范 (UI Specifications)

### 4.1 顾问名片
*   顶部展示顾问信息卡片，包含头像和“一键拨号”按钮。

### 4.2 服务矩阵
*   **Grid**: 2x2 或 2x3 布局，展示“政策咨询”、“异常处理”等入口。
*   **Icon**: 使用彩色图标增强识别度。

## 5. 验收标准 (Acceptance Criteria)

*   **Then** 点击“发起服务”应跳转至工单提交表单。
*   **Then** 工单状态变更（如“已回复”）应有通知提醒。
