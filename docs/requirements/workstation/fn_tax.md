
# 业务需求: 税款缴纳 (Tax)

> **入口 ID**: `fn-2`
> **优先级**: P1
> **设计核心**: 期限感知 (Deadline Awareness)、支付确认 (Payment Confirmation)

## 1. 用户故事 (User Stories) 与 数据逻辑

### US1: 申报倒计时提醒 (Deadline Tracking)
*   **故事**: 我绝对不能接受因为记错申报日期而导致税务逾期罚款。
*   **数据业务逻辑**:
    *   **倒计时算法**: `Days_Remaining = Tax_Deadline - Current_Date`。
    *   **风险触发器**: 当 `Days_Remaining < 3`，Dashboard 顶部需显示红色跑马灯预警。

### US2: 电子扣税确认 (Tax Deduction Confirm)
*   **故事**: 会计申报完后，我需要在手机上点一下确认，银行账户才允许划转大额税款。
*   **数据业务逻辑**:
    *   **安全认证**: 确认操作需绑定设备生物识别（FaceID/指纹）。

## 2. 界面行为规范 (UI Behaviors)

*   **进度轴标准**: 
    *   申报进度的 Marker 严格锁定在 20px 轴线。
*   **加载逻辑**: 
    *   切换申报所属期时，使用全屏灰度骨架屏以缓解数据加载焦虑。

## 3. 验收标准 (Acceptance Criteria)

- [x] 首页卡片必须显示具体的截止日期倒计时天数。
- [x] 已缴纳的税款必须显示电子缴款凭证预览。
- [x] 支持查看各税种（增值税、个税、附加税）的拆解明细。
- [x] 确认扣款按钮在点击后必须展示“正在通讯中”的加载动画。

## 4. API 接口 (API Interfaces)

| 接口描述 | Method | Endpoint |
| :--- | :--- | :--- |
| 获取本期纳税概览 (含倒计时) | `GET` | `/api/finance/tax/current-period` |
| 获取纳税记录列表 | `GET` | `/api/finance/tax/history` |
| 确认申报并授权扣款 | `POST` | `/api/finance/tax/{id}/authorize-payment` |
